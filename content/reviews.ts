export type Review = {
  id: string;
  quote: string;
  name: string;
  role: string;
  sample: true;
};

/** Placeholder copy for layout only — not real customer quotes. */
export const sampleReviews: Review[] = [
  {
    id: "sample-1",
    quote:
      "כאן תופיע המלצה אמיתית של אמא: איך הערכה עזרה לפתוח שיחה, בלי דרמה ובלי מבוכה.",
    name: "שם פרטי",
    role: "אמא לילדה בת 11 · דוגמה לעיצוב",
    sample: true,
  },
  {
    id: "sample-2",
    quote:
      "כאן תופיע המלצה על המתנה: פשוטה, שימושית, ומכבדת גם את הילדה וגם את מי שקונה.",
    name: "שם פרטי",
    role: "דודה / מתנה · דוגמה לעיצוב",
    sample: true,
  },
  {
    id: "sample-3",
    quote:
      "כאן תופיע המלצה על החוויה באתר ובערכה: ברור מה מקבלים, ונעים לקרוא ביחד.",
    name: "שם פרטי",
    role: "אמא · דוגמה לעיצוב",
    sample: true,
  },
];
