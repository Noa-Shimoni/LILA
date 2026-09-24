import { StagePicker } from "@/components/journey/StagePicker";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

import { pageSeo } from "@/content/seo";

export const metadata = pageSeo.journey;

export default function JourneyLandingPage() {
  return (
    <Container className="py-12 sm:py-16">
      <p className="text-sm font-medium tracking-wide text-rose">מסע ההתבגרות</p>
      <h1 className="mt-4 max-w-3xl font-serif text-[2.15rem] font-medium leading-[1.2] tracking-tight text-ink sm:text-5xl">
        כל אחת גדלה בקצב שלה.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">
        Lila כאן כדי לעזור לך להבין מה קורה בגוף, מה צפוי בהמשך, ואיך לעבור את
        הדרך הזו בביטחון.
      </p>

      <section className="mt-14 max-w-xl">
        <h2 className="font-serif text-3xl font-medium">איפה את עכשיו?</h2>
        <StagePicker />
        <p className="mt-6">
          <Button href="/journey/unsure" variant="ghost" className="px-0 text-base">
            לא בטוחה? Lila תעזור לי להבין
          </Button>
        </p>
      </section>
    </Container>
  );
}
