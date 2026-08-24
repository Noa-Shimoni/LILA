import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { motherTips } from "@/content/mothers";

export const metadata: Metadata = {
  title: "מדריך לאמהות",
  description: "איך לפתוח שיחה על המחזור הראשון בלי מבוכה, בלי דרמה ובלי להפוך את זה לבעיה.",
};

export default function MothersPage() {
  return (
    <>
      <PageHero
        eyebrow="לאמהות"
        title="לפעמים השיחה הכי חשובה מתחילה דווקא לפני שהמחזור מגיע."
        lead="לא צריך נאום גדול. צריך כמה מילים פשוטות, מקום לשאלות, ותחושה שאפשר לדבר על הגוף בלי מבוכה."
      />
      <Container className="py-14">
        <ul className="grid gap-5 md:grid-cols-2">
          {motherTips.map((tip) => (
            <li key={tip.title} className="rounded-3xl bg-lilac/30 p-6">
              <h2 className="text-xl font-medium">{tip.title}</h2>
              <p className="mt-2 text-muted">{tip.text}</p>
            </li>
          ))}
        </ul>
        <blockquote className="mt-12 max-w-2xl font-serif text-2xl leading-snug">
          להיות מוכנה זה לא אומר לפחד. בדיוק להפך.
        </blockquote>
        <div className="mt-8">
          <Button href="/kit">לגלות את הערכה</Button>
        </div>
      </Container>
    </>
  );
}
