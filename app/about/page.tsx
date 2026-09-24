import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";

import { pageSeo } from "@/content/seo";

export const metadata = pageSeo.about;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="LILA"
        title="מותג ישראלי להיכרות רגועה עם המחזור הראשון."
        lead="LILA נולדה מהרצון להחליף בהלה בהכנה, ומבוכה בשיחה פשוטה. לא ערכת חירום. ערכת היכרות."
      />
      <Container className="max-w-3xl space-y-6 py-14 text-lg text-muted">
        <p>
          אנחנו מאמינות שמחזור הוא חלק טבעי מהגוף ומההתבגרות. הכנה מראש יכולה להפוך את הפעם הראשונה להרבה פחות מלחיצה — בלי להפוך אותה לדרמה.
        </p>
        <p>
          הערכה מיועדת לאמהות שרוצות לתת לבת שלהן מידע וביטחון, לילדות ונערות שמתחילות את הדרך, ולבני משפחה שמחפשים מתנה שימושית ומעצימה.
        </p>
        <p>
          הטון שלנו חם, בגובה העיניים, ולא ילדותי מדי. אנחנו לא מדברות על המחזור כמשהו מלוכלך, מפחיד או מביך. פשוט חדש. ואפשר ללמוד.
        </p>
        <Button href="/kit">לגלות את הערכה</Button>
      </Container>
    </>
  );
}
