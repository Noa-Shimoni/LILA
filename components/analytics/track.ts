"use client";

import { readUtm } from "@/lib/utm";

export type AnalyticsEvent = "page_view" | "cta_click" | "form_start" | "form_error" | "lead";

const CONSENT_KEY = "lila-consent";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

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
  if (value === "denied") {
    window.__lilaPixelDisabled = true;
  }
  window.dispatchEvent(new Event("lila-consent"));
}

export function openConsent() {
  window.dispatchEvent(new Event("lila-consent-open"));
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    __lilaPixelDisabled?: boolean;
  }
}

export function track(event: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    event,
    ...params,
    ...readUtm(),
  };

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
    return;
  }
  if (event === "lead") {
    window.fbq("track", "Lead", { content_name: params.source ?? "workshops" }, {
      eventID: params.eventId,
    });
    return;
  }

  const custom: Record<AnalyticsEvent, string> = {
    page_view: "PageView",
    cta_click: "CTAClick",
    form_start: "FormStart",
    form_error: "FormError",
    lead: "Lead",
  };
  window.fbq("trackCustom", custom[event], params);
}
