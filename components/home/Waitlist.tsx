"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { waitlistNotifyEmail } from "@/content/site";
import {
  validateWaitlistEmail,
  validateWaitlistName,
  validateWaitlistPhone,
  type WaitlistField,
} from "@/lib/waitlist-validation";

type Status = "idle" | "submitting" | "sent" | "error";

const fieldMessages: Record<WaitlistField, string> = {
  email: "כתובת המייל לא תקינה.",
  name: "השם יכול להכיל אותיות, רווחים ומקף בלבד.",
  phone: "מספר הטלפון לא תקין. אפשר להשאיר ריק, או למלא מספר ישראלי.",
  pageUrl: "לא הצלחנו לשלוח את ההרשמה. נסי שוב בעוד רגע.",
  form: "לא הצלחנו לשלוח את ההרשמה. נסי שוב בעוד רגע.",
};

function readField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function Waitlist() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState<WaitlistField | null>(null);

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
          noValidate
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const data = new FormData(form);
            const email = readField(data.get("email"));
            const name = readField(data.get("name"));
            const phone = readField(data.get("phone"));
            const company = readField(data.get("company"));

            if (!validateWaitlistEmail(email)) {
              setFieldError("email");
              setStatus("error");
              return;
            }
            if (validateWaitlistName(name) === null) {
              setFieldError("name");
              setStatus("error");
              return;
            }
            if (validateWaitlistPhone(phone) === null) {
              setFieldError("phone");
              setStatus("error");
              return;
            }

            setStatus("submitting");
            setFieldError(null);

            try {
              const apiResponse = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  name,
                  phone,
                  company,
                  pageUrl: window.location.href,
                }),
              });

              const apiResult = (await apiResponse.json().catch(() => null)) as
                | { ok?: boolean; field?: WaitlistField }
                | null;

              if (!apiResponse.ok || !apiResult?.ok) {
                setFieldError(apiResult?.field ?? "form");
                setStatus("error");
                return;
              }

              setStatus("sent");
            } catch {
              setFieldError("form");
              setStatus("error");
            }
          }}
        >
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="waitlist-company">חברה</label>
            <input
              id="waitlist-company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              maxLength={80}
            />
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
              maxLength={254}
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              aria-invalid={fieldError === "email"}
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
              maxLength={80}
              aria-invalid={fieldError === "name"}
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
              maxLength={20}
              inputMode="tel"
              aria-invalid={fieldError === "phone"}
              className="min-h-11 w-full rounded-2xl bg-white px-4 py-2 ring-1 ring-ink/10"
            />
          </div>
          {status === "error" && fieldError ? (
            <p className="text-rose-deep" role="alert">
              {fieldMessages[fieldError]}
              {fieldError === "form" || fieldError === "pageUrl" ? (
                <>
                  {" "}
                  או כתבי ישירות אל{" "}
                  <a className="underline" href={`mailto:${waitlistNotifyEmail}`}>
                    {waitlistNotifyEmail}
                  </a>
                  .
                </>
              ) : null}
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
