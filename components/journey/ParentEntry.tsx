"use client";

import { parentCards } from "@/content/journey";
import { ExpandableCards } from "@/components/journey/ExpandableCards";

export function ParentEntry() {
  return (
    <section>
      <p className="text-sm font-medium tracking-wide text-rose">להורים</p>
      <h1 className="mt-3 font-serif text-4xl font-medium leading-snug tracking-tight">
        וגם לך, ההורה, יש מסע.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        לא תמיד קל לדעת מה להגיד, מתי לדבר, וכמה מידע לתת. Lila תעזור לך להיות
        שם בלי לקחת ממנה את העצמאות.
      </p>
      <ExpandableCards items={parentCards} />
    </section>
  );
}
