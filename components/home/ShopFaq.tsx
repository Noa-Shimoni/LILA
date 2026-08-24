import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow, Section, Title } from "@/components/ui/Section";
import { shopFaqs } from "@/content/guide";

export function ShopFaq() {
  return (
    <Section id="faq">
      <Eyebrow>שאלות נפוצות</Eyebrow>
      <Title>הדברים שאמהות שואלות לפני שקונות.</Title>
      <div className="mt-8">
        <Accordion items={shopFaqs} />
      </div>
    </Section>
  );
}
