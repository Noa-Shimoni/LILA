import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { girlFaqs } from "@/content/guide";

export function GirlQuestions() {
  return (
    <Section id="girl-faq">
      <Eyebrow>שאלות שילדות באמת שואלות</Eyebrow>
      <Title>מותר לשאול הכול. באמת הכול.</Title>
      <Lead>אין שאלות מוזרות. אפשר ללמוד תוך כדי. את לא צריכה לדעת הכול מההתחלה.</Lead>
      <div className="mt-8">
        <Accordion items={girlFaqs} />
      </div>
      <p className="mt-6 text-sm text-muted">
        אם משהו מרגיש לא תקין או מדאיג, תמיד אפשר לדבר עם מבוגר או עם רופא/ה.{" "}
        <Link href="/guide" className="text-rose">
          למדריך המלא
        </Link>
      </p>
    </Section>
  );
}
