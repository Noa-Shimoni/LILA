import { createHash } from "crypto";

type LeadEvent = {
  eventId: string;
  email: string;
  phone: string;
  pageUrl: string;
  source: string;
  interest: string;
  clientIp: string;
  userAgent: string;
};

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function hashEmail(email: string) {
  return sha256(email.trim().toLowerCase());
}

function hashPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `972${digits.slice(1)}` : digits;
  return sha256(normalized);
}

function pixelId() {
  return process.env.META_PIXEL_ID?.trim() || process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";
}

export async function sendMetaLead(event: LeadEvent) {
  const id = pixelId();
  const token = process.env.META_CAPI_ACCESS_TOKEN?.trim() || "";
  if (!/^\d{8,20}$/.test(id) || !token) {
    return false;
  }

  const testCode = process.env.META_TEST_EVENT_CODE?.trim() || "";
  const body: {
    data: unknown[];
    test_event_code?: string;
  } = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: "website",
        event_source_url: event.pageUrl,
        user_data: {
          em: [hashEmail(event.email)],
          ph: [hashPhone(event.phone)],
          client_ip_address: event.clientIp || undefined,
          client_user_agent: event.userAgent || undefined,
        },
        custom_data: {
          content_name: event.source,
          content_category: event.interest,
        },
      },
    ],
  };

  if (/^[A-Za-z0-9_-]{4,32}$/.test(testCode)) {
    body.test_event_code = testCode;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${id}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
}
