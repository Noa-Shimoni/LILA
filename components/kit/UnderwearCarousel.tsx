"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";

const slides = [
  { src: "/under1.png", alt: "תחתוני וסת של LILA, תמונה 1" },
  { src: "/under2.png", alt: "תחתוני וסת של LILA, תמונה 2" },
  { src: "/under3.png", alt: "תחתוני וסת של LILA, תמונה 3" },
] as const;

export function UnderwearCarousel() {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    const total = slides.length;
    setIndex(((next % total) + total) % total);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || motion.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      role="region"
      aria-roledescription="קרוסלה"
      aria-labelledby={labelId}
      className="relative overflow-hidden rounded-[1.5rem] bg-white/70 shadow-soft ring-1 ring-ink/5 sm:rounded-[2rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <p id={labelId} className="sr-only">
        תמונות של תחתוני הוסת
      </p>
      <div className="relative aspect-square w-full max-h-[min(70vh,32rem)]">
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1254}
            height={1254}
            sizes="(min-width: 1024px) 36vw, 90vw"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-lila ${
              slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            priority={slideIndex === 0}
          />
        ))}
      </div>
      <button
        type="button"
        className="absolute start-3 top-1/2 z-10 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card ring-1 ring-ink/10"
        aria-label="התמונה הקודמת"
        onClick={() => goTo(index - 1)}
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        className="absolute end-3 top-1/2 z-10 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card ring-1 ring-ink/10"
        aria-label="התמונה הבאה"
        onClick={() => goTo(index + 1)}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center"
            aria-label={`תמונה ${slideIndex + 1} מתוך ${slides.length}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => goTo(slideIndex)}
          >
            <span
              className={`block h-2.5 w-2.5 rounded-full ${
                slideIndex === index ? "bg-rose-deep" : "bg-white/80 ring-1 ring-ink/20"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
