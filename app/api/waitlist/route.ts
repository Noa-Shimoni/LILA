import { waitlistNotifyEmail } from "@/content/site";
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

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _subject: "LILA — הרשמה לערכה",
        _template: "table",
        _captcha: "false",
        _replyto: email,
        email,
        name: name || "לא צוין",
        phone: phone || "לא צוין",
      }),
    },
  );

  if (!response.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
