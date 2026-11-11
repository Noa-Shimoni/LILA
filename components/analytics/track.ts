"use client";

import { readUtm } from "@/lib/utm";

export type AnalyticsEvent = "page_view" | "cta_click" | "form_start" | "form_error" | "lead";

const CONSENT_KEY = "lila-consent";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";
const SENSITIVE_KEYS = new Set([
  "email",
  "name",
  "phone",
  "tel",
  "comments",
  "comment",
  "firstname",
  "lastname",
  "first_name",
  "last_name",
  "fullname",
  "full_name",
]);

let lastPagePath = "";
let lastPageAt = 0;

export function pixelId() {
  return /^\d{8,20}$/.test(PIXEL_ID) ? PIXEL_ID : "";
}

export function getConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  localStorage.setItem(CONSENT_KEY, value);
  window.__lilaPixelDisabled = value === "denied";
  window.__lilaAnalyticsDisabled = value === "denied";
  window.dispatchEvent(new Event("lila-consent"));
}

export function openConsent() {
  window.dispatchEvent(new Event("lila-consent-open"));
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    __lilaPixelDisabled?: boolean;
    __lilaAnalyticsDisabled?: boolean;
    __lilaConsentDefault?: boolean;
    __lilaGtmLoaded?: boolean;
    __lilaPixelPageViewFor?: string;
    __lilaPageViewQueuedFor?: string;
  }
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function looksLikePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15 && /^[+\d][\d\s()-]+$/.test(value);
}

function cleanValue(key: string, value: string) {
  const trimmed = value.trim().slice(0, 300);
  if (!trimmed || SENSITIVE_KEYS.has(key.toLowerCase())) {
    return "";
  }
  if (trimmed.toLowerCase().startsWith("mailto:")) {
    return "mailto";
  }
  if (looksLikeEmail(trimmed) || looksLikePhone(trimmed)) {
    return "";
  }
  return trimmed;
}

function sanitizeParams(params: Record<string, string>) {
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    const cleaned = cleanValue(key, value);
    if (cleaned) {
      clean[key] = cleaned;
    }
  }
  return clean;
}

function safeLocation() {
  const url = new URL(window.location.href);
  url.hash = "";
  for (const key of [...url.searchParams.keys()]) {
    const value = url.searchParams.get(key) ?? "";
    if (!cleanValue(key, value)) {
      url.searchParams.delete(key);
    }
  }
  return url.toString();
}

export function beginPageView(path: string) {
  const now = Date.now();
  if (lastPagePath === path && now - lastPageAt < 400) {
    return false;
  }
  lastPagePath = path;
  lastPageAt = now;
  return true;
}

export function track(event: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || getConsent() === "denied" || window.__lilaAnalyticsDisabled) {
    return;
  }

  const safe = sanitizeParams(params);
  const payload: Record<string, string> = {
    event,
    ...safe,
    ...sanitizeParams(readUtm()),
  };

  if (event === "page_view") {
    payload.page_path = safe.path || window.location.pathname;
    payload.page_location = safeLocation();
    payload.page_title = document.title.slice(0, 300);
    window.__lilaPageViewQueuedFor = payload.page_path;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  if (!pixelId() || getConsent() !== "granted" || window.__lilaPixelDisabled) {
    return;
  }
  if (typeof window.fbq !== "function") {
    return;
  }

  if (event === "page_view") {
    window.fbq("track", "PageView");
    window.__lilaPixelPageViewFor = payload.page_path;
    return;
  }
  if (event === "lead") {
    window.fbq(
      "track",
      "Lead",
      { content_name: safe.source ?? safe.form ?? "workshops" },
      safe.eventId ? { eventID: safe.eventId } : undefined,
    );
    return;
  }

  const custom: Record<AnalyticsEvent, string> = {
    page_view: "PageView",
    cta_click: "CTAClick",
    form_start: "FormStart",
    form_error: "FormError",
    lead: "Lead",
  };
  window.fbq("trackCustom", custom[event], safe);
}
