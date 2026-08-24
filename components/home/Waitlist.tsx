"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { waitlistNotifyEmail } from "@/content/site";
import { isFormSubmitAccepted } from "@/lib/formsubmit";

type Status = "idle" | "submitting" | "sent" | "error";

async function submitWaitlist(fields: {
  email: string;
  name: string;
  phone: string;
  company: string;
}) {
  if (fields.company) {
    return true;
  }

  const payload = {
    _subject: "LILA — הרשמה לערכה",
    _template: "table",
    _captcha: "false",
    _url: window.location.href,
    _replyto: fields.email,
    email: fields.email,
    name: fields.name || "לא צוין",
    phone: fields.phone || "לא צוין",
  };

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(waitlistNotifyEmail)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );
    const result: unknown = await response.json();
    if (isFormSubmitAccepted(result)) {
      return true;
    }
  } catch {
    // Fall through to the app API if the browser cannot reach FormSubmit.
  }

  const apiResponse = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: fields.email,
      name: fields.name,
      phone: fields.phone,
      company: fields.company,
      pageUrl: window.location.href,
    }),
  });

  if (!apiResponse.ok) {
    return false;
  }

  const apiResult = (await apiResponse.json()) as { ok?: boolean };
  return apiResult.ok === true;
}

export function Waitlist() {
  const [status, setStatus] = useState<Status>("idle");

  if (status === "sent") {
    return (
      <Section id="waitlist">
        <div className="rounded-[2rem] bg-blush/50 p-8 ring-1 ring-ink/5 sm:p-12">
          <p className="text-lg" role="status">
            נרשמת. נעדכן אותך כשהערכה תהיה מוכנה לרכישה.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="waitlist">
      <div className="rounded-[2rem] bg-blush/40 p-8 ring-1 ring-ink/5 sm:p-12">
        <Eyebrow>הרשמה מוקדמת</Eyebrow>
        <Title>רוצה שנעדכן אותך כשהערכה תהיה מוכנה?</Title>
        <Lead>
          משאירות כאן מייל, ואנחנו מודיעות כשאפשר יהיה להזמין. שם וטלפון הם
          אופציונליים.
        </Lead>
        <form
          className="relative mt-8 grid max-w-xl gap-5"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const data = new FormData(form);
            setStatus("submitting");

            const sent = await submitWaitlist({
              email: String(data.get("email") ?? "").trim(),
              name: String(data.get("name") ?? "").trim(),
              phone: String(data.get("phone") ?? "").trim(),
              company: String(data.get("company") ?? "").trim(),
            });

            setStatus(sent ? "sent" : "error");
          }}
        >
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="waitlist-company">חברה</label>
            <input id="waitlist-company" name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="waitlist-email" className="mb-1 block font-medium">
              כתובת מייל <span className="text-rose">*</span>
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="min-h-11 w-full rounded-2xl bg-white px-4 py-2 ring-1 ring-ink/10"
            />
          </div>
          <div>
            <label htmlFor="waitlist-name" className="mb-1 block font-medium">
              שם <span className="font-normal text-muted">(אופציונלי)</span>
            </label>
            <input
              id="waitlist-name"
              name="name"
              autoComplete="name"
              className="min-h-11 w-full rounded-2xl bg-white px-4 py-2 ring-1 ring-ink/10"
            />
          </div>
          <div>
            <label htmlFor="waitlist-phone" className="mb-1 block font-medium">
              טלפון <span className="font-normal text-muted">(אופציונלי)</span>
            </label>
            <input
              id="waitlist-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className="min-h-11 w-full rounded-2xl bg-white px-4 py-2 ring-1 ring-ink/10"
            />
          </div>
          {status === "error" ? (
            <p className="text-rose-deep" role="alert">
              לא הצלחנו לשלוח את ההרשמה. נסי שוב בעוד רגע, או כתבי ישירות אל{" "}
              <a className="underline" href={`mailto:${waitlistNotifyEmail}`}>
                {waitlistNotifyEmail}
              </a>
              .
            </p>
          ) : null}
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "שולחות…" : "עדכנו אותי"}
          </Button>
        </form>
      </div>
    </Section>
  );
}
