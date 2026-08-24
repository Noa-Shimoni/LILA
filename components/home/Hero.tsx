import { KitUnbox } from "@/components/illustrations/KitUnbox";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { cta } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-10 sm:pt-16">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-rose">ערכת היכרות למחזור הראשון</p>
          <h1 className="mt-4 max-w-xl font-serif text-[2.15rem] font-medium leading-[1.2] tracking-tight text-ink sm:text-5xl">
            המחזור הראשון שלה יכול להיות הרבה פחות מלחיץ.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted">
            ערכת הכנה נעימה, שימושית ומרגיעה שתעזור להכיר את הגוף, להבין מה קורה
            ולהרגיש מוכנה לרגע שבו המחזור הראשון יגיע.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/kit">{cta.kit}</Button>
            <Button href="/guide" variant="secondary">
              {cta.guide}
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            להיות מוכנה זה לא אומר לפחד. בדיוק להפך.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-lilac/50 blur-2xl" />
          <div className="absolute -right-4 bottom-10 h-32 w-32 rounded-full bg-peach/70 blur-2xl" />
          <div className="relative rounded-[2rem] bg-white/50 p-4 shadow-soft ring-1 ring-ink/5">
            <KitUnbox className="h-auto w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
