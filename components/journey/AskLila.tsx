"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function AskLila({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-[2rem] bg-white/80 p-6 ring-1 ring-ink/5 sm:p-10">
      <p className="text-xs font-medium tracking-wide text-rose">
        Prototype — this feature is not active yet.
      </p>
      {sent ? (
        <div className="mt-6">
          <p className="font-serif text-2xl font-medium leading-snug text-ink">
            תודה ששאלת.
          </p>
          <p className="mt-4 max-w-xl text-lg text-muted">
            בגרסה העתידית של Lila, השאלות ייענו על ידי צוות מומחים ותוכן אמין
            ומותאם לגיל. כרגע זו הדגמה בלבד — השאלה לא נשלחה ולא נשמרה.
          </p>
          <div className="mt-8">
            <Button type="button" onClick={onClose} variant="secondary">
              חזרה למסע
            </Button>
          </div>
        </div>
      ) : (
        <form
          className="mt-6 grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <h2 className="font-serif text-3xl font-medium leading-snug">
              יש שאלה שלא נעים לשאול?
            </h2>
            <p className="mt-3 max-w-xl text-lg text-muted">
              אין שאלות מביכות. אפשר לשאול כאן בצורה אנונימית.
            </p>
          </div>
          <label htmlFor="ask-lila" className="font-medium">
            השאלה שלך
          </label>
          <textarea
            id="ask-lila"
            name="question"
            rows={5}
            placeholder="כתבי כאן את השאלה שלך..."
            className="min-h-32 w-full rounded-2xl bg-cream px-4 py-3 ring-1 ring-ink/10"
          />
          <div className="flex flex-wrap gap-3">
            <Button type="submit">שלחי ל-Lila</Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              ביטול
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
