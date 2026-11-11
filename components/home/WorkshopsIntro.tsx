import { Character } from "@/components/illustrations/Characters";
import { Daisy, Flower } from "@/components/illustrations/Motifs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { learningCards } from "@/content/workshops";

export function WorkshopsIntro() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-lilac/55 px-6 py-10 ring-1 ring-ink/10 sm:px-10 sm:py-12">
          <Flower className="pointer-events-none absolute -left-4 -top-4 hidden h-24 w-24 sm:block" />
          <Daisy className="pointer-events-none absolute -bottom-6 end-8 hidden h-16 w-16 sm:block" />
          <div className="relative grid items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-rose">סדנאות</p>
              <h2 className="mt-3 text-balance font-serif text-3xl font-medium leading-snug sm:text-4xl">
                ידע שמעניק ביטחון. חוויה שגדלות איתה.
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-muted">
                מפגש לאם ולבת: להכיר את הגוף, לשאול בלי מבוכה, ולהתכונן לווסת הראשונה יחד. המועדים
                יפורסמו כשיהיו.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {learningCards.map((card) => (
                  <li key={card.title} className="rounded-full bg-white/75 px-4 py-2 text-sm ring-1 ring-ink/10">
                    {card.title}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/workshops" trackId="home-workshops" className="w-full sm:w-auto">
                  להכיר את הסדנאות
                </Button>
              </div>
            </div>
            <Character name="together" className="mx-auto h-72 w-auto sm:h-96 lg:h-[28rem]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
