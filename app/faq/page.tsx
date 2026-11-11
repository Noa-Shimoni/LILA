import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { pageSeo } from "@/content/seo";
import { girlFaqs, shopFaqs } from "@/content/guide";

export const metadata = pageSeo.faq;

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="שאלות"
        title="שאלות נפוצות"
        lead="גם שאלות על הערכה וגם שאלות על המחזור עצמו. בלי מבוכה, ובלי מידע רפואי מוחלט מדי."
      />
      <Container className="space-y-12 py-14">
        <div>
          <h2 className="mb-4 font-serif text-3xl">על הערכה</h2>
          <Accordion items={shopFaqs} />
        </div>
        <div>
          <h2 className="mb-4 font-serif text-3xl">שאלות שילדות שואלות</h2>
          <Accordion items={girlFaqs} />
        </div>
      </Container>
    </>
  );
}
