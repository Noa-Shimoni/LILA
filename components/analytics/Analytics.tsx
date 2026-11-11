"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { applyConsent, ensureConsentDefault, installGtm } from "@/components/analytics/gtm";
import { captureUtm } from "@/lib/utm";
import {
  beginPageView,
  getConsent,
  openConsent,
  pixelId,
  setConsent,
  track,
} from "@/components/analytics/track";

function installPixel(id: string) {
  if (typeof window.fbq === "function") {
    return;
  }

  const queue: unknown[][] = [];
  const fbq = (...args: unknown[]) => {
    const queued = window.fbq as ((...inner: unknown[]) => void) & {
      callMethod?: (...inner: unknown[]) => void;
    };
    if (queued?.callMethod) {
      queued.callMethod(...args);
    } else {
      queue.push(args);
    }
  };

  const stub = Object.assign(fbq, {
    queue,
    loaded: true,
    version: "2.0",
    push: fbq,
    callMethod: undefined as ((...inner: unknown[]) => void) | undefined,
  });
  window.fbq = stub;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  window.fbq("init", id);
}

function enableMeasurement(id: string, path: string) {
  applyConsent(true);
  installGtm();
  if (id && !window.__lilaPixelDisabled) {
    installPixel(id);
  }
  if (window.__lilaPageViewQueuedFor !== path) {
    track("page_view", { path });
    return;
  }
  if (!id || window.__lilaPixelDisabled || window.__lilaPixelPageViewFor === path) {
    return;
  }
  if (typeof window.fbq !== "function") {
    return;
  }
  window.fbq("track", "PageView");
  window.__lilaPixelPageViewFor = path;
}

export function Analytics() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const id = pixelId();

  useEffect(() => {
    ensureConsentDefault();
    captureUtm();
    if (getConsent() === "granted") {
      applyConsent(true);
      installGtm();
      if (id && !window.__lilaPixelDisabled) {
        installPixel(id);
      }
    }
    if (!beginPageView(pathname)) {
      return;
    }
    track("page_view", { path: pathname });
  }, [pathname, id]);

  useEffect(() => {
    const sync = () => {
      const consent = getConsent();
      setOpen(consent === null);
      if (consent === "granted") {
        enableMeasurement(id, pathname);
        return;
      }
      if (consent === "denied") {
        applyConsent(false);
      }
    };
    const force = () => setOpen(true);
    sync();
    window.addEventListener("lila-consent", sync);
    window.addEventListener("lila-consent-open", force);
    return () => {
      window.removeEventListener("lila-consent", sync);
      window.removeEventListener("lila-consent-open", force);
    };
  }, [id, pathname]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-[1.5rem] bg-paper p-4 shadow-soft ring-1 ring-ink/10">
      <p className="text-sm leading-relaxed text-ink">
        מדידה של ביקורים ופניות רק אחרי אישור.{" "}
        <Link href="/privacy" className="underline">
          מדיניות הפרטיות
        </Link>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="min-h-12 rounded-full bg-rose-deep px-5 text-white"
          onClick={() => {
            setConsent("granted");
            setOpen(false);
          }}
        >
          מאשרת מדידה
        </button>
        <button
          type="button"
          className="min-h-12 rounded-full bg-white px-5 text-ink ring-1 ring-ink/10"
          onClick={() => {
            setConsent("denied");
            setOpen(false);
          }}
        >
          רק מה שהכרחי
        </button>
      </div>
    </div>
  );
}

export function ConsentSettingsButton() {
  return (
    <button type="button" className="underline" onClick={() => openConsent()}>
      הגדרות עוגיות
    </button>
  );
}
