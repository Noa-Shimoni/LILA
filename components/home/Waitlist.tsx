"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";

export function Waitlist() {
  const [sent, setSent] = useState(false);

  if (sent) {
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
          className="mt-8 grid max-w-xl gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
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
          <Button type="submit">עדכנו אותי</Button>
        </form>
      </div>
    </Section>
  );
}
