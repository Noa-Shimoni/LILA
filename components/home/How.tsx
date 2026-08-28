"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Eyebrow, Lead, Section, Title } from "@/components/ui/Section";
import { absorbencyMethods, type KitItem } from "@/content/kit";
import { cta } from "@/content/site";

export function How() {
  const [item, setItem] = useState<KitItem | null>(null);

  return (
    <Section id="how">
      <Eyebrow>אמצעי ספיגה</Eyebrow>
      <Title>אין דרך אחת נכונה. יש מה שמתאים לך.</Title>
      <Lead>
        כל אחת יכולה למצוא מה שנוח לה. בערכה תמצאי תחבושות ותחתוני וסת. טמפונים
        מוסברים כאן כדי להכיר — הם לא כלולים בערכה, ולא חובה להשתמש בהם.
      </Lead>
      <ul className="mt-10 grid gap-4 lg:grid-cols-3">
        {absorbencyMethods.map((row) => (
          <li key={row.slug} className="rounded-3xl bg-white/70 p-6 ring-1 ring-ink/5">
            <h3 className="font-serif text-2xl">{row.name}</h3>
            <p className="mt-2 text-muted">{row.how}</p>
            <button
              type="button"
              className="mt-4 min-h-11 text-rose underline-offset-4 hover:underline"
              onClick={() => setItem(row)}
            >
              {cta.more}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button href="/how-it-works" variant="secondary">
          למדריך השימוש המלא
        </Button>
      </div>
      <Modal open={Boolean(item)} title={item?.name ?? ""} onClose={() => setItem(null)}>
        <p>{item?.summary}</p>
        <p>{item?.how}</p>
        <p>{item?.extra}</p>
        {item ? (
          <Button
            href={item.slug === "tampons" ? "/how-it-works#tampons" : `/kit/${item.slug}`}
            className="mt-2"
          >
            לקרוא עוד
          </Button>
        ) : null}
      </Modal>
    </Section>
  );
}
