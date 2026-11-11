import { waitlistNotifyEmail } from "@/content/site";
import { isFormSubmitAccepted } from "@/lib/formsubmit";
import { sendMetaLead } from "@/lib/meta";
import { isAllowedWaitlistOrigin } from "@/lib/waitlist-validation";
import {
  parseWorkshopJsonSize,
  validateWorkshopPayload,
} from "@/lib/workshop-validation";
import { NextResponse } from "next/server";

const inbox = process.env.WAITLIST_NOTIFY_EMAIL?.trim() || waitlistNotifyEmail;
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 8) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ ok: false, field: "form" }, { status: 415 });
  }

  const requestUrl = new URL(request.url);
  if (!isAllowedWaitlistOrigin(request.headers.get("origin"), requestUrl)) {
    return NextResponse.json({ ok: false, field: "form" }, { status: 403 });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ ok: false, field: "form" }, { status: 429 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ ok: false, field: "form" }, { status: 400 });
  }

  if (!parseWorkshopJsonSize(request.headers.get("content-length"), rawBody)) {
    return NextResponse.json({ ok: false, field: "form" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ ok: false, field: "form" }, { status: 400 });
  }

  const parsed = validateWorkshopPayload(body, requestUrl);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, field: parsed.field }, { status: 400 });
  }
  if (parsed.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const lead = parsed.values;
  const utmLines = Object.entries(lead.utm)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: requestUrl.origin,
        Referer: lead.pageUrl,
        "User-Agent": "Mozilla/5.0 (compatible; LILA-workshops)",
      },
      body: JSON.stringify({
        _subject: "LILA — עניין בסדנה",
        _template: "table",
        _captcha: "false",
        _url: lead.pageUrl,
        _replyto: lead.email,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        daughter_age: lead.ageLabel,
        city: lead.city,
        interest: lead.interestLabel,
        comments: lead.comments || "לא צוין",
        marketing_consent: lead.marketing ? "כן" : "לא",
        source: lead.source,
        utm: utmLines || "לא צוין",
        referrer: lead.referrer || "לא צוין",
      }),
    });

    const result = await response.json().catch(() => null);
    if (!isFormSubmitAccepted(result)) {
      console.error("workshop lead delivery failed");
      return NextResponse.json({ ok: false, field: "form" }, { status: 502 });
    }
  } catch {
    console.error("workshop lead delivery failed");
    return NextResponse.json({ ok: false, field: "form" }, { status: 502 });
  }

  if (lead.analyticsConsent) {
    await sendMetaLead({
      eventId: lead.eventId,
      email: lead.email,
      phone: lead.phone,
      pageUrl: lead.pageUrl,
      source: lead.source,
      interest: lead.interest,
      clientIp: clientIp(request),
      userAgent: request.headers.get("user-agent") ?? "",
    });
  }

  return NextResponse.json({ ok: true });
}
