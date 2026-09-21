"use client";

import { useState } from "react";
import { AskLila } from "@/components/journey/AskLila";
import { ExpandableCards } from "@/components/journey/ExpandableCards";
import { FeedbackPrompt } from "@/components/journey/FeedbackPrompt";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { Button } from "@/components/ui/Button";
import { braEventCards, stageDetails, type JourneyStageId } from "@/content/journey";

function WhatsNext({
  now,
  soon,
  later,
}: {
  now: string;
  soon: string;
  later: string;
}) {
  return (
    <section className="mt-14 max-w-lg">
      <h2 className="font-serif text-2xl font-medium">מה צפוי בהמשך?</h2>
      <ol className="mt-6 space-y-5">
        <li>
          <p className="text-sm text-rose">עכשיו</p>
          <p className="mt-1 text-lg font-medium text-ink">{now}</p>
        </li>
        <li>
          <p className="text-sm text-muted">אולי בקרוב</p>
          <p className="mt-1 text-ink">{soon}</p>
        </li>
        <li>
          <p className="text-sm text-muted">בהמשך</p>
          <p className="mt-1 text-ink">{later}</p>
        </li>
      </ol>
    </section>
  );
}

export function JourneyExperience({ stageId }: { stageId: JourneyStageId }) {
  const stage = stageDetails[stageId];
  const [askOpen, setAskOpen] = useState(false);

  if (askOpen) {
    return <AskLila onClose={() => setAskOpen(false)} />;
  }

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium tracking-wide text-rose">המסע שלך</p>
      <h1 className="mt-3 font-serif text-4xl font-medium leading-snug tracking-tight">
        זה השלב שלך עכשיו
      </h1>
      <p className="mt-3 text-xl text-ink">{stage.nowTitle}</p>

      <JourneyTimeline currentIndex={stage.pathIndex} />

      <section className="mt-2">
        <h2 className="font-serif text-2xl font-medium">מה קורה עכשיו?</h2>
        <p className="mt-4 text-lg text-muted">{stage.intro}</p>
        <ExpandableCards items={stage.cards} />
      </section>

      <WhatsNext {...stage.whatsNext} />

      {stage.showBra ? (
        <section className="mt-14 rounded-3xl bg-white/60 px-5 py-6 ring-1 ring-ink/5">
          <p className="font-medium text-ink">אולי הגיע הזמן לחזייה ראשונה?</p>
          <p className="mt-2 text-sm text-muted">
            זה לא שלב במסע — רק רגע שיכול להופיע בדרך, כשנעים יותר עם תמיכה קלה.
          </p>
          <ExpandableCards items={braEventCards} />
        </section>
      ) : null}

      {stage.showKit ? (
        <section className="mt-14">
          <p className="font-medium text-ink">מתכוננות למחזור הראשון?</p>
          <p className="mt-3 max-w-xl text-muted">
            לא צריך לדעת הכול מראש. כמה דברים פשוטים יכולים לעזור לך להרגיש מוכנה.
          </p>
          <p className="mt-4">
            <Button href="/kit" variant="ghost" className="px-0">
              להכיר את ערכת Lila
            </Button>
          </p>
        </section>
      ) : null}

      <section className="mt-14">
        <h2 className="font-serif text-2xl font-medium">3 דברים שכדאי לדעת עכשיו</h2>
        <ul className="mt-5 space-y-4 text-lg text-ink">
          {stage.knowNow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl font-medium">ומה אם יש לי שאלה?</h2>
        <div className="mt-5">
          <Button type="button" onClick={() => setAskOpen(true)}>
            יש משהו שאת מתביישת לשאול?
          </Button>
        </div>
      </section>

      <FeedbackPrompt />

      <p className="mt-10">
        <Button href="/journey" variant="ghost" className="px-0">
          לבחור מקום אחר במסע
        </Button>
      </p>
    </div>
  );
}
