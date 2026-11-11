import Link from "next/link";
import { Character, Garland } from "@/components/illustrations/Characters";
import { Daisy, Flower, Spark, Sprig } from "@/components/illustrations/Motifs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { WorkshopLeadForm } from "@/components/workshops/WorkshopLeadForm";
import { pageSeo } from "@/content/seo";
import { activities, learningCards, workshopFacts, workshopHero } from "@/content/workshops";
import { getSiteUrl } from "@/lib/seo";

export const metadata = pageSeo.workshops;

const tones: Record<string, string> = {
  blush: "bg-blush/75",
  lilac: "bg-lilac/75",
  mint: "bg-sage/80",
  butter: "bg-peach/80",
};

const learningIcons = [Flower, Spark, Daisy, Sprig];

export default function WorkshopsPage() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "הסדנאות של LILA – גדלות יחד",
    description: workshopHero.lead,
    inLanguage: "he-IL",
    url: `${siteUrl}/workshops`,
    isPartOf: {
      "@type": "WebSite",
      name: "LILA",
      url: siteUrl,
    },
    about: "סדנאות חינוכיות להורים ולילדות לקראת הווסת הראשונה",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden pb-12 pt-10 sm:pt-16">
        <Flower className="pointer-events-none absolute -left-6 top-6 hidden h-28 w-28 sm:block" />
        <Container className="relative grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
          <p className="text-sm text-rose">
            <Link href="/" className="underline-offset-4 hover:underline">
              דף הבית
            </Link>
            <span aria-hidden> / </span>
            סדנאות
          </p>
          <h1 className="mt-4 text-balance font-serif text-4xl font-medium leading-snug tracking-tight sm:text-5xl">
            {workshopHero.title}
          </h1>
          <p className="mt-5 text-lg text-muted">{workshopHero.lead}</p>
          <div className="mt-8">
            <Button href="#register" trackId="workshop-hero" className="w-full sm:w-auto">
              {workshopHero.cta}
            </Button>
          </div>
          </div>
          <Character name="together" priority className="mx-auto h-72 w-auto sm:h-96" />
        </Container>
      </section>
      <Garland />

      <section id="learn" className="scroll-mt-24 bg-white/40 py-16 sm:py-24">
        <Container>
          <h2 className="max-w-3xl font-serif text-3xl font-medium leading-snug sm:text-4xl">מה נלמד?</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {learningCards.map((card, index) => {
              const Icon = learningIcons[index] ?? Flower;
              return (
                <li key={card.title} className={`rounded-[1.75rem] p-6 ring-1 ring-ink/10 ${tones[card.tone]}`}>
                  <Icon className="h-14 w-14" />
                  <h3 className="mt-4 font-serif text-2xl">{card.title}</h3>
                  <p className="mt-2 text-muted">{card.text}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Character name="bouquet" decorative className="mb-4 h-28 w-auto" />
          <h2 className="max-w-3xl font-serif text-3xl font-medium leading-snug sm:text-4xl">איך זה מרגיש</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            זו סדנה חווייתית, לא הרצאה. בין הדברים שאפשר לפגוש במפגש:
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity) => (
              <li key={activity.title} className="rounded-[1.75rem] bg-powder/70 p-5 ring-1 ring-ink/10">
                <h3 className="font-serif text-xl">{activity.title}</h3>
                <p className="mt-2 text-sm text-muted">{activity.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-peach/40 py-16 sm:py-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="lila-card">
            <Character name="hug" className="mb-4 h-44 w-auto" />
            <h2 className="font-serif text-3xl">למי זה מתאים</h2>
            <div className="mt-4 space-y-4 text-muted">
              <p>הסדנה הראשונה מיועדת לילדות בערך בגילאי 9–11, יחד עם הורה שמלווה אותן.</p>
              <p>
                לא כל הילדות מתפתחות באותו גיל, ולא כולן צריכות את אותה הכנה באותו רגע. אם הגיל קצת
                אחר והשיחה כבר רלוונטית, אפשר לכתוב את הגיל בטופס.
              </p>
              <p>בהמשך יכולים להתפתח גם מפגשים לקבוצות של ילדות בלבד, וסדנאות למסגרות חינוכיות.</p>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-3xl">הפרטים</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {workshopFacts.map((fact) => (
                <div key={fact.label} className="rounded-[1.5rem] bg-white/75 p-5 ring-1 ring-ink/10">
                  <dt className="text-sm font-medium text-rose">{fact.label}</dt>
                  <dd className="mt-1 font-serif text-2xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-muted">מועדי הסדנאות יפורסמו כשיהיו.</p>
          </div>
        </Container>
      </section>

      <section id="register" className="scroll-mt-24 py-16 sm:py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Character name="girl-book" decorative className="mb-4 h-40 w-auto" />
            <h2 className="text-balance font-serif text-3xl font-medium leading-snug sm:text-4xl">
              רוצות לגדול יחד עם LILA?
            </h2>
            <p className="mt-4 text-lg text-muted">
              השאירי פרטים ונעדכן אותך על מועדי הסדנאות הקרובים, אפשרויות ההשתתפות וכל מה שצריך לדעת.
            </p>
            <ul className="mt-6 space-y-3 text-muted">
              <li>אין חיוב, ואין שמירת מקום למועד שעוד לא פורסם.</li>
              <li>נחזור בעניין הסדנאות. עדכונים נוספים נשלחים רק אם סימנת זאת בנפרד.</li>
              <li>אפשר לבקש מחיקה של הפרטים דרך המייל שמופיע במדיניות הפרטיות.</li>
            </ul>
          </div>
          <WorkshopLeadForm source="workshops" />
        </Container>
      </section>
    </>
  );
}
