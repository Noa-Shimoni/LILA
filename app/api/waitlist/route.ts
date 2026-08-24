import { waitlistNotifyEmail } from "@/content/site";
import { isFormSubmitAccepted } from "@/lib/formsubmit";
import { NextResponse } from "next/server";

const inbox = process.env.WAITLIST_NOTIFY_EMAIL?.trim() || waitlistNotifyEmail;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (asString(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const email = asString(body.email);
  const name = asString(body.name);
  const phone = asString(body.phone);
  const pageUrl = asString(body.pageUrl) || request.headers.get("referer") || "https://lila.local/waitlist";

  if (!email.includes("@") || email.length < 5) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const origin = request.headers.get("origin") || new URL(request.url).origin;

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: origin,
          Referer: pageUrl,
          "User-Agent":
            request.headers.get("user-agent") ||
            "Mozilla/5.0 (compatible; LILA-waitlist)",
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

    return NextResponse.json({ ok: false }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
