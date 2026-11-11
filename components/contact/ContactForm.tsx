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
          className="lila-field"
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
          className="lila-field"
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
          className="lila-field min-h-32"
        />
      </div>
      <Button type="submit">שליחה</Button>
    </form>
  );
}
