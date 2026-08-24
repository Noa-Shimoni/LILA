import { kitPromise } from "@/content/kit";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";

export function Positioning() {
  return (
    <Section id="about-kit">
      <Eyebrow>על הערכה</Eyebrow>
      <Title>לא עוד &quot;ערכת חירום&quot;. ערכת היכרות.</Title>
      <Lead>
        הרעיון הוא לא לחכות לרגע שבו היא נתקעת בלי תחבושת. הרעיון הוא לתת לה
        אפשרות להכיר את האפשרויות מראש. להיות מוכנה זה לא אומר לפחד. בדיוק להפך.
      </Lead>
      <ul className="mt-8 flex flex-wrap gap-3">
        {kitPromise.map((item) => (
          <li
            key={item}
            className="rounded-full bg-peach/60 px-4 py-2 text-ink ring-1 ring-ink/5"
          >
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
