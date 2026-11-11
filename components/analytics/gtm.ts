"use client";

/**
 * Public Google Tag Manager container.
 * The GA4 measurement ID stays inside the published GTM container.
 * This file must not load gtag.js or a hardcoded GA4 config.
 */
const GTM_CONTAINER_ID = "GTM-M6LHDKR9";

type ConsentChoice = "granted" | "denied";

function containerId() {
  return /^GTM-[A-Z0-9]+$/.test(GTM_CONTAINER_ID) ? GTM_CONTAINER_ID : "";
}

function consentState(choice: ConsentChoice) {
  return {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  };
}

function pushGtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(arguments);
}

export function ensureConsentDefault() {
  if (typeof window === "undefined" || window.__lilaConsentDefault) {
    return;
  }
  window.__lilaConsentDefault = true;
  pushGtag("consent", "default", {
    ...consentState("denied"),
    wait_for_update: 500,
  });
}

export function applyConsent(granted: boolean) {
  if (typeof window === "undefined") {
    return;
  }
  ensureConsentDefault();
  pushGtag("consent", "update", consentState(granted ? "granted" : "denied"));
}

export function installGtm() {
  if (typeof window === "undefined" || window.__lilaAnalyticsDisabled || window.__lilaGtmLoaded) {
    return;
  }
  const id = containerId();
  if (!id) {
    return;
  }

  window.__lilaGtmLoaded = true;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.id = "lila-gtm";
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(script);
}
