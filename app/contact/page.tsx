import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = { title: "יצירת קשר" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="קשר"
        title="אפשר לשאול, גם לפני שיש חנות חיה."
        lead="כאן ייכנס בהמשך טופס אמיתי. בינתיים אפשר להשאיר פנייה לדוגמה — בלי סליקה ובלי דיוור."
      />
      <Container className="max-w-xl py-14">
        <ContactForm />
      </Container>
    </>
  );
}
