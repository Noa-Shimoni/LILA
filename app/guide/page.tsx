import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { girlFaqs, timeline } from "@/content/guide";

export const metadata: Metadata = {
  title: "מדריך למחזור הראשון",
  description: "מה קורה כשמקבלים מחזור, מה עושים עכשיו, ותשובות לשאלות שילדות באמת שואלות.",
};

export default function GuidePage() {
  return (
    <>
      <PageHero
        eyebrow="מדריך"
        title="אז… קיבלתי מחזור. מה עכשיו?"
        lead="את לא אמורה לדעת הכול כבר בפעם הראשונה. בשביל זה לומדים. המדריך הזה מדבר אלייך בגובה העיניים."
      />
      <Container className="py-14">
        <ol className="grid gap-5 md:grid-cols-2">
          {timeline.map((step) => (
            <li key={step.step} className="rounded-3xl bg-peach/40 p-6">
              <span className="font-serif text-4xl text-rose/40">{step.step}</span>
              <h2 className="mt-2 text-2xl font-medium">{step.title}</h2>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <h2 className="mt-16 font-serif text-3xl">מותר לשאול הכול. באמת הכול.</h2>
        <div className="mt-6">
          <Accordion items={girlFaqs} />
        </div>
        <p className="mt-8 max-w-2xl text-muted">
          אם משהו מרגיש לך לא תקין או מדאיג — כאב חזק, דימום שנמשך הרבה מעבר לרגיל, או סתם תחושה שמשהו לא בסדר — דברי עם מבוגר או עם רופא/ה.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/kit">לגלות את הערכה</Button>
          <Button href="/mothers" variant="secondary">
            מדריך לאמהות
          </Button>
        </div>
      </Container>
    </>
  );
}
