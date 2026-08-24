"use client";

import { useEffect, useId, useRef } from "react";

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const labelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="סגירה"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className="relative z-10 max-h-[86vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream p-6 shadow-soft sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={labelId} className="font-serif text-2xl">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="min-h-11 min-w-11 rounded-full text-xl leading-none ring-1 ring-ink/10"
            onClick={onClose}
          >
            <span className="sr-only">סגירה</span>
            ×
          </button>
        </div>
        <div className="mt-4 space-y-3 text-muted">{children}</div>
      </div>
    </div>
  );
}
