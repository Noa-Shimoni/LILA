import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { pageSeo } from "@/content/seo";
import { absorbencyMethods } from "@/content/kit";

export const metadata = pageSeo.howItWorks;

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
            className="scroll-mt-24 rounded-3xl bg-white/70 p-6 ring-1 ring-ink/5"
          >
            <h2 className="font-serif text-3xl">{item.name}</h2>
            <p className="mt-2 text-muted">{item.short}</p>
            <p className="mt-4 text-muted">{item.how}</p>
            <p className="mt-3 text-muted">{item.extra}</p>
            {item.slug !== "tampons" ? (
              <Button href={`/kit/${item.slug}`} variant="ghost" className="mt-4 px-0">
                לקרוא עוד
              </Button>
            ) : null}
          </article>
        ))}
      </Container>
    </>
  );
}
