import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";

import { pageSeo } from "@/content/seo";

export const metadata = pageSeo.privacy;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="פרטיות"
        title="אנחנו מתייחסות למידע בזהירות."
        lead="מדיניות מלאה תתווסף לפני איסוף נתונים אמיתי, סליקה או דיוור."
      />
      <Container className="max-w-2xl space-y-6 py-14 text-muted">
        <p>האתר כרגע הוא דמו. אין חיבור לסליקה, ל־CMS או לגוגל אנליטיקס.</p>
        <p>כשנחבר חנות, נאסוף רק מה שצריך להזמנה ולתמיכה, ונבקש הסכמה ברורה לדיוור.</p>
        <p>שיחות על מחזור הן אישיות. לא נשתמש בטון מביך, ולא נחשוף מידע על לקוחות.</p>
      </Container>
    </>
  );
}
