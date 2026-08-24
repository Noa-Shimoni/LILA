import { Container } from "@/components/ui/Section";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="border-b border-ink/5 pb-12 pt-10 sm:pt-14">
      <Container>
        {eyebrow ? <p className="text-sm font-medium text-rose">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-medium leading-snug tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>
      </Container>
    </div>
  );
}
