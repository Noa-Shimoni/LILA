import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { timeline } from "@/content/guide";

export function Timeline() {
  return (
    <Section id="first-period" className="bg-white/35">
      <Eyebrow>מה קורה כשמקבלים מחזור?</Eyebrow>
      <Title>אז… קיבלתי מחזור. מה עכשיו?</Title>
      <Lead>
        את לא אמורה לדעת הכול כבר בפעם הראשונה. בשביל זה לומדים. הצעדים האלה הם
        כיוון רגוע, לא רשימת מטלות.
      </Lead>
      <ol className="mt-12 grid gap-6 md:grid-cols-4">
        {timeline.map((step) => (
          <li key={step.step} className="relative rounded-3xl bg-cream p-5 ring-1 ring-ink/5">
            <span className="font-serif text-4xl text-rose/50">{step.step}</span>
            <h3 className="mt-2 text-xl font-medium">{step.title}</h3>
            <p className="mt-2 text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-2xl font-serif text-2xl text-ink">
        את לא אמורה לדעת הכול כבר בפעם הראשונה. בשביל זה לומדים.
      </p>
    </Section>
  );
}
