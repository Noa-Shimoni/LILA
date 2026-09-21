const MAX_JSON_BYTES = 4_096;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 80;
const MAX_PHONE_LENGTH = 20;
const MAX_URL_LENGTH = 300;

const ALLOWED_KEYS = new Set(["email", "name", "phone", "company", "pageUrl"]);

const CONTROL_CHARS = /[\u0000-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g;
const HTML_META = /[<>`"\\]/g;
const EMAIL_PATTERN =
  /^[a-z0-9](?:[a-z0-9._%+\-]*[a-z0-9])?@[a-z0-9](?:[a-z0-9.\-]*[a-z0-9])?\.[a-z]{2,24}$/;
const NAME_PATTERN = /^[\p{L}\p{M}]+(?:[ '\u05F3\u05F4\u2019\-][\p{L}\p{M}]+)*$/u;
const PHONE_PATTERN = /^(?:\+972|972|0)(?:[1-9]\d{7,8})$/;

export type WaitlistField = "email" | "name" | "phone" | "pageUrl" | "form";

export type WaitlistValidation =
  | { ok: true; honeypot: true }
  | {
      ok: true;
      honeypot: false;
      values: { email: string; name: string; phone: string; pageUrl: string };
    }
  | { ok: false; field: WaitlistField };

export function escapeForEmail(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readString(value: unknown, maxLength: number) {
  if (value == null) {
    return "";
  }
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value
    .normalize("NFKC")
    .replace(CONTROL_CHARS, "")
    .replace(HTML_META, "")
    .trim();

  if (cleaned.length > maxLength) {
    return null;
  }

  return cleaned;
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function validateWaitlistEmail(value: string) {
  const email = value.toLowerCase();
  if (!email || email.length > MAX_EMAIL_LENGTH) {
    return null;
  }
  if (email.includes("..") || email.includes("@.") || email.includes(".@")) {
    return null;
  }
  if (!EMAIL_PATTERN.test(email)) {
    return null;
  }
  return email;
}

export function validateWaitlistName(value: string) {
  if (!value) {
    return "";
  }
  if (value.length > MAX_NAME_LENGTH || !NAME_PATTERN.test(value)) {
    return null;
  }
  return value;
}

export function validateWaitlistPhone(value: string) {
  if (!value) {
    return "";
  }
  const compact = value.replace(/[\s\-()]/g, "");
  if (compact.length > MAX_PHONE_LENGTH) {
    return null;
  }
  if (!PHONE_PATTERN.test(compact)) {
    return null;
  }

  const digits = digitsOnly(compact);
  if (digits.length < 9 || digits.length > 12) {
    return null;
  }

  return compact;
}

function validatePageUrl(value: string, requestUrl: URL) {
  if (!value) {
    return `${requestUrl.origin}/#waitlist`;
  }
  if (value.length > MAX_URL_LENGTH) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(value, requestUrl.origin);
  } catch {
    return null;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return null;
  }
  if (parsed.username || parsed.password) {
    return null;
  }
  if (parsed.host !== requestUrl.host) {
    return null;
  }

  return parsed.toString();
}

export function parseWaitlistJsonSize(contentLength: string | null, rawBody: string) {
  if (rawBody.length > MAX_JSON_BYTES) {
    return false;
  }
  if (contentLength) {
    const size = Number.parseInt(contentLength, 10);
    if (Number.isFinite(size) && size > MAX_JSON_BYTES) {
      return false;
    }
  }
  return true;
}

export function validateWaitlistPayload(
  body: unknown,
  requestUrl: URL,
): WaitlistValidation {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, field: "form" };
  }

  const record = body as Record<string, unknown>;
  const keys = Object.keys(record);

  if (keys.length === 0 || keys.length > ALLOWED_KEYS.size) {
    return { ok: false, field: "form" };
  }
  if (keys.some((key) => !ALLOWED_KEYS.has(key))) {
    return { ok: false, field: "form" };
  }

  const honey = readString(record.company, 80);
  if (honey === null) {
    return { ok: false, field: "form" };
  }
  if (honey) {
    return { ok: true, honeypot: true };
  }

  const emailRaw = readString(record.email, MAX_EMAIL_LENGTH);
  const nameRaw = readString(record.name, MAX_NAME_LENGTH);
  const phoneRaw = readString(record.phone, MAX_PHONE_LENGTH);
  const pageRaw = readString(record.pageUrl, MAX_URL_LENGTH);

  if (emailRaw === null) {
    return { ok: false, field: "email" };
  }
  if (nameRaw === null) {
    return { ok: false, field: "name" };
  }
  if (phoneRaw === null) {
    return { ok: false, field: "phone" };
  }
  if (pageRaw === null) {
    return { ok: false, field: "pageUrl" };
  }

  const email = validateWaitlistEmail(emailRaw);
  if (!email) {
    return { ok: false, field: "email" };
  }

  const name = validateWaitlistName(nameRaw);
  if (name === null) {
    return { ok: false, field: "name" };
  }

  const phone = validateWaitlistPhone(phoneRaw);
  if (phone === null) {
    return { ok: false, field: "phone" };
  }

  const pageUrl = validatePageUrl(pageRaw, requestUrl);
  if (!pageUrl) {
    return { ok: false, field: "pageUrl" };
  }

  return {
    ok: true,
    honeypot: false,
    values: {
      email: escapeForEmail(email),
      name: escapeForEmail(name),
      phone: escapeForEmail(phone),
      pageUrl,
    },
  };
}

export function isAllowedWaitlistOrigin(originHeader: string | null, requestUrl: URL) {
  if (!originHeader) {
    return true;
  }

  try {
    const origin = new URL(originHeader);
    return origin.protocol === requestUrl.protocol && origin.host === requestUrl.host;
  } catch {
    return false;
  }
}
