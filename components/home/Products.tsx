import Image from "next/image";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ProductMark } from "@/components/illustrations/ProductMark";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { kitItems } from "@/content/kit";

export function Products() {
  return (
    <Section id="products">
      <Eyebrow>הערכות</Eyebrow>
      <Title>מה שיש היום בערכת ההיכרות.</Title>
      <Lead>
        אלה הפריטים שכבר מתוארים באתר. אין עדיין מחיר ואין רכישה. אפשר להכיר כל פריט, ולהירשם
        לעדכון כשהערכה תיפתח.
      </Lead>
      <div className="mt-10 grid gap-5 lg:grid-cols-5">
        <TrackedLink
          href="/kit"
          trackId="product-kit"
          className="lila-card flex flex-col justify-between lg:col-span-2"
        >
          <Image
            src="/full-kit.jpg"
            alt="ערכת LILA בקופסה לילך: תחתוני מחזור, תחבושות, נרתיק, ומכתב עם איור של ילדה"
            width={1400}
            height={1003}
            sizes="(min-width: 1024px) 28vw, 92vw"
            className="h-auto w-full rounded-[1.25rem] bg-white object-contain"
          />
          <div className="mt-4">
            <h3 className="font-serif text-2xl">ערכת ההיכרות</h3>
            <p className="mt-2 text-muted">תחבושות, תחתוני וסת, מכתב לילדה ונרתיק צבעוני.</p>
          </div>
        </TrackedLink>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          {kitItems.map((item) => (
            <li key={item.slug}>
              <TrackedLink
                href={`/kit/${item.slug}`}
                trackId={`product-${item.slug}`}
                className="flex h-full flex-col rounded-[1.75rem] bg-white/75 p-4 ring-1 ring-ink/10"
              >
                <ProductMark slug={item.slug} />
                <h3 className="font-serif text-2xl">{item.name}</h3>
                <p className="mt-2 text-muted">{item.short}</p>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/kit" trackId="products-kit" className="w-full sm:w-auto">
          להכיר את הערכות שלנו
        </Button>
        <Button href="/#waitlist" variant="secondary" trackId="products-waitlist" className="w-full sm:w-auto">
          לעדכון כשאפשר יהיה להזמין
        </Button>
      </div>
    </Section>
  );
}
