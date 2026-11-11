"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track, getConsent } from "@/components/analytics/track";
import { Button } from "@/components/ui/Button";
import {
  daughterAges,
  workshopInterests,
  workshopSuccessMessage,
} from "@/content/workshops";
import { readUtm } from "@/lib/utm";
import { workshopFieldErrors, type WorkshopField } from "@/lib/workshop-validation";

type Status = "idle" | "submitting" | "sent" | "error";

const messages: Record<WorkshopField, string> = {
  name: "נשמח לשם של ההורה. אותיות, רווחים ומקף.",
  phone: "מספר הנייד לא נראה תקין. לדוגמה: 0501234567.",
  email: "כתובת המייל לא תקינה.",
  age: "בחרי את גיל הבת.",
  city: "כתבי את העיר באותיות.",
  interest: "בחרי איזו סדנה מעניינת אותך.",
  comments: "ההערה ארוכה מדי, או שיש בה תווים שאי אפשר לשמור.",
  privacy: "כדי לשלוח, צריך לאשר את מדיניות הפרטיות.",
  marketing: "לא הצלחנו לקרוא את בחירת העדכונים. נסי שוב.",
  form: "לא הצלחנו לשלוח את הפרטים. נסי שוב בעוד רגע.",
  pageUrl: "לא הצלחנו לשלוח את הפרטים. נסי שוב בעוד רגע.",
};

const focusId: Record<WorkshopField, string> = {
  name: "lead-name",
  phone: "lead-phone",
  email: "lead-email",
  age: "lead-age",
  city: "lead-city",
  interest: "lead-interest-mother-daughter",
  comments: "lead-comments",
  privacy: "lead-privacy",
  marketing: "lead-marketing",
  form: "lead-submit",
  pageUrl: "lead-submit",
};

function readField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export function WorkshopLeadForm({ source = "workshops" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<WorkshopField[]>([]);
  const startedAt = useRef(0);
  const formStarted = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "sent") {
      successRef.current?.scrollIntoView({ block: "center" });
    }
  }, [status]);

  if (startedAt.current === 0) {
    startedAt.current = Date.now();
  }

  function markStarted() {
    if (formStarted.current) {
      return;
    }
    formStarted.current = true;
    track("form_start", { source, form: "workshops" });
  }

  if (status === "sent") {
    return (
      <div ref={successRef} className="lila-card scroll-mt-24 bg-sage/50" role="status">
        <p className="font-serif text-2xl leading-snug text-ink">{workshopSuccessMessage}</p>
      </div>
    );
  }

  return (
    <form
      className="lila-card relative grid gap-5"
      noValidate
      aria-busy={status === "submitting"}
      onFocus={markStarted}
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const eventId = crypto.randomUUID();
        const payload = {
          name: readField(data.get("name")),
          phone: readField(data.get("phone")),
          email: readField(data.get("email")),
          age: readField(data.get("age")),
          city: readField(data.get("city")),
          interest: readField(data.get("interest")),
          comments: readField(data.get("comments")),
          privacy: data.get("privacy") === "on",
          marketing: data.get("marketing") === "on",
          company: readField(data.get("company")),
          pageUrl: window.location.href,
          source,
          startedAt: startedAt.current,
          eventId,
          analyticsConsent: getConsent() === "granted",
          utm: readUtm(),
          referrer: document.referrer,
        };

        const localErrors = workshopFieldErrors({
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          age: payload.age,
          city: payload.city,
          interest: payload.interest,
          comments: payload.comments,
          privacy: payload.privacy,
        });
        if (localErrors.length > 0) {
          setErrors(localErrors);
          setStatus("error");
          track("form_error", { source, field: localErrors[0] });
          window.setTimeout(() => {
            document.getElementById(focusId[localErrors[0]])?.focus();
          }, 0);
          return;
        }

        setStatus("submitting");
        setErrors([]);

        try {
          const response = await fetch("/api/workshops", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const result = (await response.json().catch(() => null)) as
            | { ok?: boolean; field?: WorkshopField }
            | null;

          if (!response.ok || !result?.ok) {
            const field = result?.field ?? "form";
            setErrors([field]);
            setStatus("error");
            track("form_error", { source, field });
            window.setTimeout(() => {
              document.getElementById(focusId[field])?.focus();
            }, 0);
            return;
          }

          track("lead", { source, eventId, form: "workshops" });
          setStatus("sent");
        } catch {
          setErrors(["form"]);
          setStatus("error");
          track("form_error", { source, field: "form" });
        }
      }}
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${source}-company`}>חברה</label>
        <input id={`${source}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-muted">שדות עם כוכבית הם חובה.</p>

      {errors.length > 0 ? (
        <p role="alert" className="rounded-2xl bg-blush/70 px-4 py-3 text-sm font-medium text-rose-deep">
          יש שדות שצריך לתקן לפני השליחה. ההודעה מופיעה ליד השדה.
        </p>
      ) : null}

      <Field
        id="lead-name"
        name="name"
        label="שם ההורה"
        required
        autoComplete="name"
        maxLength={80}
        error={errors.includes("name") ? messages.name : ""}
      />
      <Field
        id="lead-phone"
        name="phone"
        label="נייד"
        type="tel"
        required
        autoComplete="tel"
        inputMode="tel"
        maxLength={20}
        error={errors.includes("phone") ? messages.phone : ""}
      />
      <Field
        id="lead-email"
        name="email"
        label="אימייל"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        maxLength={254}
        error={errors.includes("email") ? messages.email : ""}
      />

      <div>
        <label className="lila-label" htmlFor="lead-age">
          גיל הבת <RequiredMark />
        </label>
        <select
          id="lead-age"
          name="age"
          required
          defaultValue=""
          aria-invalid={errors.includes("age")}
          aria-describedby={errors.includes("age") ? "lead-age-error" : undefined}
          className="lila-field"
        >
          <option value="" disabled>
            בחרי גיל
          </option>
          {daughterAges.map((age) => (
            <option key={age.value} value={age.value}>
              {age.label}
            </option>
          ))}
        </select>
        {errors.includes("age") ? (
          <p id="lead-age-error" className="lila-error">
            {messages.age}
          </p>
        ) : null}
      </div>

      <Field
        id="lead-city"
        name="city"
        label="עיר"
        required
        autoComplete="address-level2"
        maxLength={40}
        error={errors.includes("city") ? messages.city : ""}
      />

      <fieldset>
        <legend className="lila-label">
          איזו סדנה מעניינת אותך? <RequiredMark />
        </legend>
        <div className="grid gap-2">
          {workshopInterests.map((option) => (
            <label
              key={option.value}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl bg-white px-4 ring-1 ring-ink/10 has-[:checked]:bg-blush/50 has-[:checked]:ring-rose"
            >
              <input
                id={`lead-interest-${option.value}`}
                type="radio"
                name="interest"
                value={option.value}
                className="size-5 accent-[var(--color-rose-deep)]"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {errors.includes("interest") ? <p className="lila-error">{messages.interest}</p> : null}
      </fieldset>

      <div>
        <label className="lila-label" htmlFor="lead-comments">
          הערות נוספות <span className="font-normal text-muted">(לא חובה)</span>
        </label>
        <textarea
          id="lead-comments"
          name="comments"
          rows={4}
          maxLength={500}
          aria-invalid={errors.includes("comments")}
          className="lila-field min-h-28"
        />
        {errors.includes("comments") ? <p className="lila-error">{messages.comments}</p> : null}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="lead-privacy"
            name="privacy"
            type="checkbox"
            required
            aria-invalid={errors.includes("privacy")}
            className="mt-1 size-5 accent-[var(--color-rose-deep)]"
          />
          <label htmlFor="lead-privacy" className="text-sm leading-relaxed">
            קראתי את מדיניות הפרטיות ואני מסכימה ש־LILA תשתמש בפרטים כדי לחזור אליי בנושא הסדנאות.
            <RequiredMark />
          </label>
        </div>
        <Link href="/privacy" className="mt-2 inline-flex min-h-11 items-center text-sm text-rose underline">
          למדיניות הפרטיות
        </Link>
        {errors.includes("privacy") ? <p className="lila-error">{messages.privacy}</p> : null}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="lead-marketing"
          name="marketing"
          type="checkbox"
          className="mt-1 size-5 accent-[var(--color-rose-deep)]"
        />
        <label htmlFor="lead-marketing" className="text-sm leading-relaxed">
          אני מאשרת לקבל עדכונים מ־LILA על סדנאות, תכנים ומוצרים. אפשר לבטל בכל רגע. זו בחירה נפרדת,
          והיא לא מסומנת מראש.
        </label>
      </div>

      {errors.includes("form") || errors.includes("pageUrl") ? (
        <p role="alert" className="lila-error">
          {messages.form}
        </p>
      ) : null}

      <Button id="lead-submit" type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "שולחות…" : "לשלוח פרטים"}
      </Button>
    </form>
  );
}

function RequiredMark() {
  return (
    <span aria-hidden className="text-rose">
      {" "}
      *
    </span>
  );
}

function Field({
  id,
  name,
  label,
  error,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  maxLength,
}: {
  id: string;
  name: string;
  label: string;
  error: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  maxLength?: number;
}) {
  return (
    <div>
      <label className="lila-label" htmlFor={id}>
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        autoCapitalize={type === "email" ? "none" : undefined}
        spellCheck={type === "email" ? false : undefined}
        className="lila-field"
      />
      {error ? (
        <p id={`${id}-error`} className="lila-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
