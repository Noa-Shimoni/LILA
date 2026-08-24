import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { sampleReviews } from "@/content/reviews";

export function Reviews() {
  return (
    <Section id="reviews">
      <Eyebrow>מה אמהות חושבות</Eyebrow>
      <Title>מקום להמלצות אמיתיות, כשיהיו.</Title>
      <Lead>
        כאן יופיעו המלצות של לקוחות. בינתיים מוצגות דוגמאות עיצוב בלבד — לא
        ציטוטים של בנות אמיתיות.
      </Lead>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {sampleReviews.map((review) => (
          <li key={review.id} className="rounded-3xl bg-white/80 p-6 ring-1 ring-ink/5">
            <p className="text-xs font-medium uppercase tracking-wide text-rose">
              דוגמה לעיצוב
            </p>
            <blockquote className="mt-3 font-serif text-xl leading-snug">
              “{review.quote}”
            </blockquote>
            <p className="mt-4 text-sm text-muted">
              {review.name} · {review.role}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
