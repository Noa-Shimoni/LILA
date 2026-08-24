import Link from "next/link";
import { ProductMark } from "@/components/illustrations/ProductMark";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { kitItems } from "@/content/kit";
import { cta } from "@/content/site";

const tones: Record<string, string> = {
  peach: "bg-peach/45",
  blush: "bg-blush/40",
  lilac: "bg-lilac/45",
  sage: "bg-sage/50",
};

export function KitPreview() {
  return (
    <Section id="kit">
      <Eyebrow>מה יש בערכה?</Eyebrow>
      <Title>כל מה שצריך כדי להכיר, להבין ולהרגיש מוכנה.</Title>
      <Lead>
        הערכה כוללת תחבושות, תחתוני וסת, מכתב לילדה ומדריך קצר. אין חובה
        להשתמש בהכול. כל אחת מוצאת מה נוח לה.
      </Lead>
      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {kitItems.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/kit/${item.slug}`}
              className={`block h-full rounded-3xl p-6 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-card ${tones[item.tone]}`}
            >
              <ProductMark slug={item.slug} className="h-16 w-24" />
              <h3 className="mt-2 font-serif text-2xl">{item.name}</h3>
              <p className="mt-2 text-muted">{item.summary}</p>
              <p className="mt-4 text-sm font-medium text-rose">{cta.more}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Button href="/kit">{cta.primary}</Button>
      </div>
    </Section>
  );
}
