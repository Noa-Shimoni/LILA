import {
  daughterAges,
  workshopInterests,
  type DaughterAge,
  type WorkshopInterest,
} from "@/content/workshops";
import {
  escapeForEmail,
  validateWaitlistEmail,
  validateWaitlistName,
  validateWaitlistPhone,
} from "@/lib/waitlist-validation";

const MAX_JSON_BYTES = 8_192;
const MAX_CITY_LENGTH = 40;
const MAX_COMMENTS_LENGTH = 500;
const MAX_URL_LENGTH = 1_000;
const MAX_REFERRER_LENGTH = 400;

const CONTROL_CHARS = /[\u0000-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g;
const HTML_META = /[<>`"\\]/g;
const CITY_PATTERN = /^[\p{L}\p{M}](?:[\p{L}\p{M} '\u05F3\u2019\-]{0,38}[\p{L}\p{M}])?$/u;
const SOURCE_PATTERN = /^[a-z0-9-]{1,40}$/;
const EVENT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

const ALLOWED_KEYS = new Set([
  "email",
  "name",
  "phone",
  "company",
  "pageUrl",
  "age",
  "city",
  "interest",
  "comments",
  "privacy",
  "marketing",
  "startedAt",
  "source",
  "eventId",
  "analyticsConsent",
  "utm",
  "referrer",
]);

const ages = new Set<string>(daughterAges.map((item) => item.value));
const interests = new Set<string>(workshopInterests.map((item) => item.value));

export type WorkshopField =
  | "email"
  | "name"
  | "phone"
  | "age"
  | "city"
  | "interest"
  | "comments"
  | "privacy"
  | "marketing"
  | "form"
  | "pageUrl";

export type WorkshopLeadValues = {
  email: string;
  name: string;
  phone: string;
  age: DaughterAge;
  ageLabel: string;
  city: string;
  interest: WorkshopInterest;
  interestLabel: string;
  comments: string;
  marketing: boolean;
  pageUrl: string;
  source: string;
  eventId: string;
  analyticsConsent: boolean;
  utm: Record<string, string>;
  referrer: string;
};

export type WorkshopValidation =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; values: WorkshopLeadValues }
  | { ok: false; field: WorkshopField };

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

function cleanUtm(value: unknown) {
  if (value == null) {
    return {};
  }
  if (typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const clean: Record<string, string> = {};
  for (const key of Object.keys(record)) {
    if (!UTM_KEYS.includes(key as (typeof UTM_KEYS)[number])) {
      return null;
    }
  }

  for (const key of UTM_KEYS) {
    const raw = record[key];
    if (raw == null || raw === "") {
      continue;
    }
    const max = key === "fbclid" ? 200 : 120;
    const text = readString(raw, max);
    if (text === null) {
      return null;
    }
    if (text) {
      clean[key] = text;
    }
  }

  return clean;
}

function cleanPageUrl(value: string, requestUrl: URL) {
  const fallback = `${requestUrl.origin}/workshops`;
  if (!value) {
    return fallback;
  }

  let parsed: URL;
  try {
    parsed = new URL(value, requestUrl.origin);
  } catch {
    return fallback;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return fallback;
  }
  if (parsed.username || parsed.password || parsed.host !== requestUrl.host) {
    return fallback;
  }

  const safe = parsed.toString();
  return safe.length > MAX_URL_LENGTH ? fallback : safe;
}

function cleanReferrer(value: string) {
  if (!value) {
    return "";
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return "";
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return "";
  }
  if (parsed.username || parsed.password) {
    return "";
  }

  return parsed.toString().slice(0, MAX_REFERRER_LENGTH);
}

export function workshopFieldErrors(input: {
  name: string;
  phone: string;
  email: string;
  age: string;
  city: string;
  interest: string;
  comments: string;
  privacy: boolean;
}): WorkshopField[] {
  const errors: WorkshopField[] = [];
  if (!validateWaitlistName(input.name)) errors.push("name");
  if (!validateWaitlistPhone(input.phone)) errors.push("phone");
  if (!validateWaitlistEmail(input.email)) errors.push("email");
  if (!ages.has(input.age)) errors.push("age");
  if (!CITY_PATTERN.test(input.city)) errors.push("city");
  if (!interests.has(input.interest)) errors.push("interest");
  if (input.comments.length > MAX_COMMENTS_LENGTH) errors.push("comments");
  if (!input.privacy) errors.push("privacy");
  return errors;
}

export function parseWorkshopJsonSize(contentLength: string | null, rawBody: string) {
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

export function validateWorkshopPayload(body: unknown, requestUrl: URL): WorkshopValidation {
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

  if (typeof record.startedAt !== "number" || !Number.isFinite(record.startedAt)) {
    return { ok: false, field: "form" };
  }
  const elapsed = Date.now() - record.startedAt;
  if (elapsed < -60_000 || elapsed > 1000 * 60 * 60 * 24) {
    return { ok: false, field: "form" };
  }

  const emailRaw = readString(record.email, 254);
  const nameRaw = readString(record.name, 80);
  const phoneRaw = readString(record.phone, 20);
  const ageRaw = readString(record.age, 20);
  const cityRaw = readString(record.city, MAX_CITY_LENGTH);
  const interestRaw = readString(record.interest, 40);
  const commentsRaw = readString(record.comments, MAX_COMMENTS_LENGTH);
  const pageRaw = readString(record.pageUrl, MAX_URL_LENGTH);
  const sourceRaw = readString(record.source, 40);
  const eventRaw = readString(record.eventId, 36);
  const referrerRaw = readString(record.referrer, MAX_REFERRER_LENGTH);

  if (emailRaw === null) return { ok: false, field: "email" };
  if (nameRaw === null) return { ok: false, field: "name" };
  if (phoneRaw === null) return { ok: false, field: "phone" };
  if (ageRaw === null) return { ok: false, field: "age" };
  if (cityRaw === null) return { ok: false, field: "city" };
  if (interestRaw === null) return { ok: false, field: "interest" };
  if (commentsRaw === null) return { ok: false, field: "comments" };
  if (pageRaw === null || sourceRaw === null || eventRaw === null || referrerRaw === null) {
    return { ok: false, field: "form" };
  }

  if (record.privacy !== true) {
    return { ok: false, field: "privacy" };
  }
  if (record.marketing != null && typeof record.marketing !== "boolean") {
    return { ok: false, field: "marketing" };
  }
  if (record.analyticsConsent != null && typeof record.analyticsConsent !== "boolean") {
    return { ok: false, field: "form" };
  }

  const email = validateWaitlistEmail(emailRaw);
  if (!email) return { ok: false, field: "email" };

  const name = validateWaitlistName(nameRaw);
  if (!name) return { ok: false, field: "name" };

  const phone = validateWaitlistPhone(phoneRaw);
  if (!phone) return { ok: false, field: "phone" };

  if (!ages.has(ageRaw)) return { ok: false, field: "age" };
  if (!CITY_PATTERN.test(cityRaw)) return { ok: false, field: "city" };
  if (!interests.has(interestRaw)) return { ok: false, field: "interest" };

  const source = sourceRaw || "workshops";
  if (!SOURCE_PATTERN.test(source)) return { ok: false, field: "form" };
  if (eventRaw && !EVENT_ID_PATTERN.test(eventRaw)) return { ok: false, field: "form" };

  const utm = cleanUtm(record.utm);
  if (utm === null) return { ok: false, field: "form" };

  const age = ageRaw as DaughterAge;
  const interest = interestRaw as WorkshopInterest;

  return {
    ok: true,
    honeypot: false,
    values: {
      email: escapeForEmail(email),
      name: escapeForEmail(name),
      phone: escapeForEmail(phone),
      age,
      ageLabel: daughterAges.find((item) => item.value === age)?.label ?? age,
      city: escapeForEmail(cityRaw),
      interest,
      interestLabel: workshopInterests.find((item) => item.value === interest)?.label ?? interest,
      comments: escapeForEmail(commentsRaw),
      marketing: record.marketing === true,
      pageUrl: cleanPageUrl(pageRaw, requestUrl),
      source,
      eventId: eventRaw || crypto.randomUUID(),
      analyticsConsent: record.analyticsConsent === true,
      utm,
      referrer: cleanReferrer(referrerRaw),
    },
  };
}
