"use client";

import { useState } from "react";
import type { JourneyCard } from "@/content/journey";

export function ExpandableCards({ items }: { items: JourneyCard[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="mt-6 grid gap-3">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <li key={item.title}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
              className="w-full rounded-3xl bg-white/70 px-5 py-4 text-right ring-1 ring-ink/5 transition duration-200 ease-lila"
            >
              <span className="block font-medium text-ink">{item.title}</span>
              {expanded ? <span className="mt-2 block text-muted">{item.body}</span> : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
