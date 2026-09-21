"use client";

import { useState } from "react";
import { feedbackOptions } from "@/content/journey";

export function FeedbackPrompt() {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <section className="mt-16 rounded-[2rem] bg-lilac/30 p-6 sm:p-10">
      <h2 className="font-serif text-2xl font-medium">מה את חושבת על Lila?</h2>
      <p className="mt-2 text-muted">הבחירה נשארת אצלך. כרגע שום דבר לא נשלח.</p>
      <div className="mt-6 grid gap-3">
        {feedbackOptions.map((option) => {
          const selected = choice === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setChoice(option.id)}
              className={`flex min-h-14 items-center gap-3 rounded-full px-5 text-right transition duration-200 ease-lila ${
                selected
                  ? "bg-rose-deep text-white shadow-card"
                  : "bg-white/80 text-ink ring-1 ring-ink/10 hover:bg-white"
              }`}
            >
              <span aria-hidden>{option.mark}</span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
      {choice ? (
        <p className="mt-4 text-sm text-muted" role="status">
          תודה. שמרנו את התחושה הזו רק כאן, במסך.
        </p>
      ) : null}
    </section>
  );
}
