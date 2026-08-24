"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";

type Status = "idle" | "submitting" | "sent" | "error";

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

            try {
              const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: data.get("email"),
                  name: data.get("name"),
                  phone: data.get("phone"),
                  company: data.get("company"),
                }),
              });

              if (!response.ok) {
                throw new Error("send failed");
              }

              setStatus("sent");
            } catch {
              setStatus("error");
            }
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
              לא הצלחנו לשלוח את ההרשמה. נסי שוב בעוד רגע.
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
