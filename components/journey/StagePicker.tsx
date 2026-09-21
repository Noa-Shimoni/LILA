import Link from "next/link";
import { stageCards } from "@/content/journey";

export function StagePicker() {
  return (
    <ul className="mt-8 grid gap-3">
      {stageCards.map((card) => (
        <li key={card.id}>
          <Link
            href={`/journey/${card.id}`}
            className="flex min-h-12 items-center gap-3 rounded-3xl bg-white/70 px-5 py-4 ring-1 ring-ink/5 transition duration-200 ease-lila hover:bg-white"
          >
            <span className="text-xl" aria-hidden>
              {card.mark}
            </span>
            <span className="text-lg text-ink">{card.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
