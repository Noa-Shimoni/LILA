import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { pageSeo } from "@/content/seo";
import { waitlistNotifyEmail } from "@/content/site";

export const metadata = pageSeo.contact;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="קשר"
        title="אפשר לשאול, גם לפני שיש חנות חיה."
        lead="כאן ייכנס בהמשך טופס אמיתי. בינתיים אפשר להשאיר פנייה לדוגמה — בלי סליקה ובלי דיוור."
      />
      <Container className="max-w-xl py-14">
        <p className="mb-6 text-muted">
          הטופס כאן עדיין לא שולח פנייה. לשאלה אמיתית אפשר לכתוב אל{" "}
          <a className="text-rose underline" href={`mailto:${waitlistNotifyEmail}`}>
            {waitlistNotifyEmail}
          </a>
          . לסדנאות יש{" "}
          <a className="text-rose underline" href="/workshops#register">
            טופס פעיל
          </a>
          .
        </p>
        <ContactForm />
      </Container>
    </>
  );
}
