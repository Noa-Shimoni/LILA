import { Button } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { motherTips } from "@/content/mothers";
import { cta } from "@/content/site";

export function Mothers() {
  return (
    <Section id="mothers" className="bg-lilac/25">
      <Eyebrow>לאמהות</Eyebrow>
      <Title>לפעמים השיחה הכי חשובה מתחילה דווקא לפני שהמחזור מגיע.</Title>
      <Lead>
        המטרה היא לא להושיב את הילדה לשיחה גדולה ומביכה. המטרה היא ליצור פתיחות
        לאורך זמן: כמה משפטים פשוטים, מקום לשאלות, ותחושה שאפשר לדבר על הגוף בלי
        דרמה.
      </Lead>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {motherTips.map((tip) => (
          <li key={tip.title} className="rounded-3xl bg-cream/80 p-5 ring-1 ring-ink/5">
            <h3 className="font-medium">{tip.title}</h3>
            <p className="mt-2 text-muted">{tip.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button href="/mothers">{cta.mothers}</Button>
      </div>
    </Section>
  );
}
