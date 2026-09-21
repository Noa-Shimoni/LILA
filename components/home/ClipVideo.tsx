"use client";

import { useEffect, useRef } from "react";

export function ClipVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      if (motion.matches) {
        video.pause();
        return;
      }
      void video.play().catch(() => {
        // Autoplay can be blocked until the clip is muted and inline.
      });
    };

    syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => motion.removeEventListener("change", syncMotion);
  }, []);

  return (
    <div
      className={`overflow-hidden rounded-[1.5rem] bg-blush/30 shadow-soft ring-1 ring-ink/5 sm:rounded-[2rem] ${className}`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        preload="metadata"
        aria-label="סרטון קצר של ערכת LILA"
        className="aspect-[4/5] h-auto w-full max-h-[min(70vh,32rem)] object-cover object-center sm:aspect-video sm:max-h-[min(72vh,36rem)]"
      >
        <source src="/clip2.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
