import { journeyPath } from "@/content/journey";

export function JourneyTimeline({ currentIndex }: { currentIndex: number }) {
  return (
    <div className="mt-10 max-w-md">
      <p className="mb-6 text-sm font-medium text-rose">זה המקום שלי במסע.</p>
      <ol>
        {journeyPath.map((step, index) => {
          const current = index === currentIndex;
          const passed = index < currentIndex;
          return (
            <li key={step.id} className="flex gap-4">
              <div className="flex w-7 flex-col items-center">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                    current
                      ? "bg-rose-deep text-white"
                      : passed
                        ? "bg-lilac/80 text-ink"
                        : "bg-white/80 text-muted ring-1 ring-ink/10"
                  }`}
                  aria-hidden
                >
                  {step.mark}
                </span>
                {index < journeyPath.length - 1 ? (
                  <span
                    className={`my-1 h-9 w-px ${
                      passed || current ? "bg-rose/35" : "bg-ink/10"
                    }`}
                    aria-hidden
                  />
                ) : null}
              </div>
              <p className={`pb-7 pt-0.5 ${current ? "font-medium text-ink" : "text-muted"}`}>
                {step.label}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
