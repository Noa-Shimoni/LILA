import { waitlistNotifyEmail } from "@/content/site";
import { isFormSubmitAccepted } from "@/lib/formsubmit";
import {
  isAllowedWaitlistOrigin,
  parseWaitlistJsonSize,
  validateWaitlistPayload,
} from "@/lib/waitlist-validation";
import { NextResponse } from "next/server";

const inbox = process.env.WAITLIST_NOTIFY_EMAIL?.trim() || waitlistNotifyEmail;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ ok: false, field: "form" }, { status: 415 });
  }

  const requestUrl = new URL(request.url);
  if (!isAllowedWaitlistOrigin(request.headers.get("origin"), requestUrl)) {
    return NextResponse.json({ ok: false, field: "form" }, { status: 403 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ ok: false, field: "form" }, { status: 400 });
  }

  if (!parseWaitlistJsonSize(request.headers.get("content-length"), rawBody)) {
    return NextResponse.json({ ok: false, field: "form" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ ok: false, field: "form" }, { status: 400 });
  }

  const parsed = validateWaitlistPayload(body, requestUrl);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, field: parsed.field }, { status: 400 });
  }

  if (parsed.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const { email, name, phone, pageUrl } = parsed.values;

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: requestUrl.origin,
          Referer: pageUrl,
          "User-Agent": "Mozilla/5.0 (compatible; LILA-waitlist)",
        },
        body: JSON.stringify({
          _subject: "LILA — הרשמה לערכה",
          _template: "table",
          _captcha: "false",
          _url: pageUrl,
          _replyto: email,
          email,
          name: name || "לא צוין",
          phone: phone || "לא צוין",
        }),
      },
    );

    const result = await response.json().catch(() => null);
    if (isFormSubmitAccepted(result)) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, field: "form" }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, field: "form" }, { status: 502 });
  }
}
