import type { Metadata } from "next";
import { ProductMark } from "@/components/illustrations/ProductMark";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { absorbencyMethods } from "@/content/kit";

export const metadata: Metadata = {
  title: "איך זה עובד",
  description: "הסברים רגועים על תחבושות, תחתוני וסת וטמפונים — בלי לחץ ובלי דרך אחת נכונה.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="שימוש"
        title="אין דרך אחת נכונה. יש מה שמתאים לך."
        lead="אפשר לקרוא, להתנסות בבית, לשאול שאלות, ולבחור אחר כך. אף אחת לא חייבת להשתמש בהכול."
      />
      <Container className="space-y-8 py-14">
        {absorbencyMethods.map((item) => (
          <article
            key={item.slug}
            id={item.slug}
            className="grid scroll-mt-24 gap-6 rounded-3xl bg-white/70 p-6 ring-1 ring-ink/5 md:grid-cols-[140px_1fr]"
          >
            <ProductMark slug={item.slug} className="h-20 w-28" />
            <div>
              <h2 className="font-serif text-3xl">{item.name}</h2>
              <p className="mt-2 text-muted">{item.short}</p>
              <p className="mt-4 text-muted">{item.how}</p>
              <p className="mt-3 text-muted">{item.extra}</p>
              {item.slug !== "tampons" ? (
                <Button href={`/kit/${item.slug}`} variant="ghost" className="mt-4 px-0">
                  לקרוא עוד
                </Button>
              ) : null}
            </div>
          </article>
        ))}
      </Container>
    </>
  );
}
