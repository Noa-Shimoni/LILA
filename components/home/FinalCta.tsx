import Link from "next/link";
import { Character } from "@/components/illustrations/Characters";
import { BrandLogo } from "@/components/illustrations/BrandLogo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export function FinalCta() {
  return (
    <section className="pb-8">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-rose-deep px-6 py-12 text-cream shadow-soft sm:px-12 sm:py-14">
          <Character
            name="hug"
            decorative
            className="pointer-events-none absolute -bottom-8 end-0 hidden h-80 w-auto lg:block"
          />
          <div className="relative max-w-2xl">
            <BrandLogo className="h-12 brightness-0 invert sm:h-14" />
            <h2 className="mt-5 max-w-2xl text-balance font-serif text-3xl font-medium leading-snug sm:text-4xl">
              אפשר להתחיל מהערכה, מהידע, או מהסדנה.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-cream/90">
              LILA כאן כדי שגדלות עם יותר ביטחון ופחות מבוכה. המועדים והרכישה ייפתחו כשיהיו מוכנים.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/workshops" variant="secondary" trackId="final-workshops" className="w-full sm:w-auto">
                להכיר את הסדנאות
              </Button>
              <Button href="/kit" variant="secondary" trackId="final-kit" className="w-full sm:w-auto">
                לגלות את הערכה
              </Button>
              <Link
                href="/#waitlist"
                className="inline-flex min-h-12 items-center justify-center px-2 text-cream underline"
              >
                לעדכון כשהערכה תיפתח
              </Link>
            </div>
          </div>
          <Character name="hug" decorative className="mx-auto mt-8 h-56 w-auto lg:hidden" />
        </div>
      </Container>
    </section>
  );
}
