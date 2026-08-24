export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-content px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm font-medium tracking-wide text-rose">{children}</p>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-3xl font-serif text-3xl font-medium leading-snug tracking-tight text-ink sm:text-4xl md:text-[2.55rem]">
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-2xl text-lg text-muted">{children}</p>;
}
