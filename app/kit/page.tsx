import type { Metadata } from "next";
import Link from "next/link";
import { ProductMark } from "@/components/illustrations/ProductMark";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { kitItems, kitPromise } from "@/content/kit";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "מה יש בערכה",
  description: "היכרות עם תחבושות, תחתוני וסת, מכתב לילדה ונרתיק צבעוני — בקצב שלה, בלי חובה להשתמש בהכול.",
};

const tones: Record<string, string> = {
  peach: "bg-peach/45",
  blush: "bg-blush/40",
  lilac: "bg-lilac/45",
  sage: "bg-sage/50",
};

export default function KitPage() {
  return (
    <>
      <PageHero
        eyebrow="הערכה"
        title="כל מה שצריך כדי להכיר, להבין ולהרגיש מוכנה."
        lead="זאת לא ערכת חירום. זאת ערכת היכרות: תחבושות, תחתוני וסת, מכתב לילדה ונרתיק צבעוני — ומקום להתנסות בלי לחץ."
      />
      <Container className="py-14">
        <ul className="flex flex-wrap gap-3">
          {kitPromise.map((item) => (
            <li key={item} className="rounded-full bg-white/70 px-4 py-2 ring-1 ring-ink/5">
              {item}
            </li>
          ))}
        </ul>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {kitItems.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/kit/${item.slug}`}
                className={`block h-full rounded-3xl p-7 ring-1 ring-ink/5 ${tones[item.tone]}`}
              >
                <ProductMark slug={item.slug} className="h-16 w-24" />
                <h2 className="mt-3 font-serif text-3xl">{item.name}</h2>
                <p className="mt-3 text-muted">{item.summary}</p>
                <p className="mt-5 font-medium text-rose">{cta.more}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-muted">
          הרכב מדויק של כמויות ומותגים יעודכן כאן לפני ההשקה. בינתיים אפשר להבין את הרעיון ואת מה שבפנים.
        </p>
        <div className="mt-8">
          <Button href="/#waitlist">להרשמה כשהערכה תהיה מוכנה</Button>
        </div>
      </Container>
    </>
  );
}
