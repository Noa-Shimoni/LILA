import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = { title: "משלוחים והחזרות" };

export default function ShippingPage() {
  return (
    <>
      <PageHero
        eyebrow="משלוחים"
        title="משלוחים והחזרות"
        lead="מדיניות מדויקת תתעדכן עם ההשקה. בינתיים אלה עקרונות המותג."
      />
      <Container className="max-w-2xl space-y-6 py-14 text-muted">
        <p>משלוחים ייעשו ברחבי הארץ באריזה נעימה וצנועה, בלי כיתוב מביך על החבילה.</p>
        <p>החזרות יינתנו לפי מדיניות שקופה שתפורסם לפני המכירה. מוצרים שנפתחו מסיבות היגיינה עשויים להיות מוגבלים להחזרה.</p>
        <p>אפשר לקנות את הערכה כמתנה. נשאיר אפשרות להוסיף פתק קצר בהמשך.</p>
      </Container>
    </>
  );
}
