const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "lila-utm";

function limit(key: UtmKey) {
  return key === "fbclid" ? 200 : 120;
}

export function captureUtm() {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const found: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (!value || /[<>"'`]/.test(value)) {
      continue;
    }
    found[key] = value.slice(0, limit(key));
  }

  if (Object.keys(found).length === 0) {
    return;
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Storage can be blocked. The URL still travels with the form pageUrl.
  }
}

export function readUtm(): UtmParams {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const record = parsed as Record<string, unknown>;
    const clean: UtmParams = {};
    for (const key of UTM_KEYS) {
      const value = record[key];
      if (typeof value !== "string") {
        continue;
      }
      const trimmed = value.trim();
      if (!trimmed || /[<>"'`]/.test(trimmed)) {
        continue;
      }
      clean[key] = trimmed.slice(0, limit(key));
    }
    return clean;
  } catch {
    return {};
  }
}
