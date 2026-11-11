import { Character, Garland } from "@/components/illustrations/Characters";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { pillars } from "@/content/home";

export function World() {
  return (
    <Section id="world" className="bg-white/35">
      <Eyebrow>העולם שלנו</Eyebrow>
      <Title>LILA היא יותר ממוצר אחד.</Title>
      <Lead>
        מלוות ילדות והורים לאורך ההתבגרות: עם דברים שאפשר להחזיק ביד, עם ידע שאפשר לקרוא ביחד,
        ועם מפגש שבו לומדות זו לצד זו.
      </Lead>
      <Character name="growing" className="mx-auto mt-8 h-auto w-full max-w-3xl" />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <li key={pillar.href}>
            <TrackedLink
              href={pillar.href}
              trackId={pillar.trackId}
              className={`flex h-full flex-col rounded-[1.75rem] p-6 ring-1 ring-ink/10 ${pillar.tone}`}
            >
              <h3 className="font-serif text-2xl">{pillar.title}</h3>
              <p className="mt-2 text-muted">{pillar.text}</p>
              <p className="mt-5 text-sm font-medium text-rose">להמשיך</p>
            </TrackedLink>
          </li>
        ))}
      </ul>
      <Garland className="mt-10" />
    </Section>
  );
}
