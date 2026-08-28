import { BrandLogo } from "@/components/illustrations/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { cta } from "@/content/site";

export function FinalCta() {
  return (
    <section className="pb-20">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-rose-deep px-8 py-14 text-cream shadow-soft sm:px-14">
          <BrandLogo className="h-12 sm:h-14" />
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-snug tracking-tight sm:text-4xl">
            קצת ידע, קצת הכנה, והרבה יותר ביטחון.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-peach">
            המחזור הראשון הוא חוויה חדשה. הוא לא חייב להיות מבלבל או מלחיץ.
          </p>
          <div className="mt-8">
            <Button href="/kit" variant="secondary">
              {cta.primary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
