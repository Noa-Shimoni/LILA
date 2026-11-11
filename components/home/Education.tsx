import { Character } from "@/components/illustrations/Characters";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { guides } from "@/content/home";

export function Education() {
  return (
    <Section id="guides">
      <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <Eyebrow>ידע</Eyebrow>
          <Title>מדריכים שאפשר לקרוא כבר עכשיו.</Title>
          <Lead>
            אלה עמודים קיימים באתר, להורים ולילדות. עוד תכנים יצטרפו בהמשך. אין כאן מאמרים מומצאים,
            והקריאה לא מחליפה ייעוץ רפואי.
          </Lead>
        </div>
        <Character name="reading" className="mx-auto h-36 w-36 sm:h-44 sm:w-44" />
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {guides.map((guide, index) => (
          <li key={guide.href}>
            <TrackedLink href={guide.href} trackId={`guide-${guide.href}`} className="lila-card block h-full">
              {index === 0 ? (
                <Character name="girl-book" decorative className="mb-3 h-28 w-auto" />
              ) : null}
              <p className="text-sm font-medium text-rose">מדריך</p>
              <h3 className="mt-2 font-serif text-2xl">{guide.title}</h3>
              <p className="mt-2 text-muted">{guide.text}</p>
            </TrackedLink>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button href="/how-it-works" variant="secondary" trackId="guide-how">
          איך משתמשים בתחבושות ובתחתוני וסת
        </Button>
      </div>
    </Section>
  );
}
