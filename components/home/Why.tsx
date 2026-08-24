import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { whyCards } from "@/content/why";

const tones = ["bg-peach/60", "bg-blush/50", "bg-lilac/50", "bg-sage/60"];

export function Why() {
  return (
    <Section id="why">
      <Eyebrow>למה בכלל צריך ערכת מחזור ראשון?</Eyebrow>
      <Title>כי הפעם הראשונה לא צריכה לתפוס אותה לא מוכנה.</Title>
      <Lead>
        ילדות רבות מקבלות מחזור בלי לדעת בדיוק למה לצפות. לפעמים הן בבית, בבית
        הספר, בטיול או אצל חברה. המטרה של הערכה היא לא רק לתת מוצרים, אלא לתת
        ידע, היכרות, אפשרות להתנסות, תחושת שליטה וביטחון.
      </Lead>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {whyCards.map((card, i) => (
          <li
            key={card.title}
            className={`rounded-3xl p-6 ${tones[i]} ring-1 ring-ink/5`}
          >
            <h3 className="font-serif text-2xl">{card.title}</h3>
            <p className="mt-2 text-muted">{card.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
