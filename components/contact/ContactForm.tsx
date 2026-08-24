"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="rounded-3xl bg-sage/40 p-6 text-lg" role="status">
        תודה. זהו טופס דמו — בהמשך הוא יתחבר למייל או ל־CMS. בינתיים קיבלנו את הכוונה.
      </p>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label htmlFor="name" className="mb-1 block font-medium">
          שם
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="min-h-11 w-full rounded-2xl bg-white px-4 py-2 ring-1 ring-ink/10"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block font-medium">
          אימייל
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="min-h-11 w-full rounded-2xl bg-white px-4 py-2 ring-1 ring-ink/10"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block font-medium">
          הודעה
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-2xl bg-white px-4 py-3 ring-1 ring-ink/10"
        />
      </div>
      <Button type="submit">שליחה</Button>
    </form>
  );
}
