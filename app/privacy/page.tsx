import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { pageSeo } from "@/content/seo";
import { waitlistNotifyEmail } from "@/content/site";

export const metadata = pageSeo.privacy;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="פרטיות"
        title="אנחנו מתייחסות למידע בזהירות."
        lead="כאן כתוב איזה פרטים נאספים בטפסים, למה, ואיך אפשר לבקש למחוק אותם."
      />
      <Container className="max-w-2xl space-y-6 py-14 text-muted">
        <p>
          LILA אוספת פרטים רק כשמישהי שולחת טופס. אין באתר חנות ואין סליקה. המידע באתר הוא הסבר
          כללי, והוא לא תחליף לייעוץ רפואי.
        </p>
        <h2 className="font-serif text-2xl text-ink">טופס הסדנאות</h2>
        <p>
          נשמרים שם ההורה, נייד, אימייל, גיל הבת, עיר, סוג הסדנה שמעניין, והערה אם נכתבה. אישור
          מדיניות הפרטיות הוא חובה. הסכמה לקבל עדכונים שיווקיים היא שאלה נפרדת, והיא לא מסומנת
          מראש.
        </p>
        <h2 className="font-serif text-2xl text-ink">עדכון על הערכה</h2>
        <p>בטופס שבעמוד הבית נשמרת כתובת מייל, ואם מולאו גם שם וטלפון, כדי לעדכן כשאפשר יהיה להזמין.</p>
        <h2 className="font-serif text-2xl text-ink">לאן זה מגיע</h2>
        <p>
          הפניות נשלחות אל {waitlistNotifyEmail} דרך השירות FormSubmit, כדי שנוכל לחזור. אנחנו לא
          מוכרות את הפרטים. טופס יצירת הקשר עדיין לא שולח פנייה.
        </p>
        <h2 className="font-serif text-2xl text-ink">מדידה ועוגיות</h2>
        <p>
          בלי אישור, לא נטען Meta Pixel ולא נשלח אירוע המרה אל Meta, וגם לא נטען Google Tag Manager
          או Google Analytics. אחרי אישור, Google Tag Manager נטען וממנו נשלחת מדידה אל Google
          Analytics. שמות, כתובות מייל ומספרי טלפון לא נשלחים אל Google Analytics. גם אחרי אישור,
          הפיקסל נטען רק אם הוגדר מזהה אמיתי בהגדרות האתר. אין באתר מזהה פיקסל לדוגמה. אפשר לשנות את
          הבחירה בכפתור הגדרות העוגיות שבתחתית האתר.
        </p>
        <h2 className="font-serif text-2xl text-ink">מחיקה</h2>
        <p>
          אפשר לבקש מחיקה או תיקון של הפרטים בכתובת{" "}
          <a className="text-rose underline" href={`mailto:${waitlistNotifyEmail}`}>
            {waitlistNotifyEmail}
          </a>
          .
        </p>
      </Container>
    </>
  );
}
