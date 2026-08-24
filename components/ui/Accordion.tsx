"use client";

import { useId, useState } from "react";

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 overflow-hidden rounded-3xl bg-white/70 ring-1 ring-ink/5">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-right text-lg text-ink"
                aria-expanded={expanded}
                aria-controls={`${base}-${i}`}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span>{item.q}</span>
                <span aria-hidden className="text-rose">
                  {expanded ? "–" : "+"}
                </span>
              </button>
            </h3>
            {expanded ? (
              <p id={`${base}-${i}`} className="px-5 pb-5 text-muted">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
