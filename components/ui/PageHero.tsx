import { Character, type CharacterName } from "@/components/illustrations/Characters";
import { Flower } from "@/components/illustrations/Motifs";
import { Container } from "@/components/ui/Section";

export function PageHero({
  eyebrow,
  title,
  lead,
  art,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  art?: CharacterName;
}) {
  return (
    <div className="relative overflow-hidden border-b border-ink/5 pb-12 pt-10 sm:pt-14">
      <Flower className="pointer-events-none absolute -left-2 top-4 hidden h-24 w-24 sm:block" />
      <Container className="relative grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          {eyebrow ? <p className="text-sm font-medium text-rose">{eyebrow}</p> : null}
          <h1 className="mt-3 max-w-3xl text-balance font-serif text-4xl font-medium leading-snug tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>
        </div>
        {art ? <Character name={art} className="mx-auto h-40 w-auto sm:h-56" /> : null}
      </Container>
    </div>
  );
}
