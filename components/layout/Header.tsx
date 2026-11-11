"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/illustrations/BrandLogo";
import { brand, navLinks } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onWorkshops = pathname.startsWith("/workshops");
  const ctaHref = onWorkshops ? "#register" : "/workshops";
  const ctaLabel = onWorkshops ? "להשאיר פרטים" : "לסדנאות";

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center" aria-label={`${brand.name} — דף הבית`}>
          <BrandLogo decorative priority />
        </Link>

        <nav className="hidden items-center gap-4 xl:gap-7 lg:flex" aria-label="ראשי">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}
              className="text-[0.95rem] text-ink/80 transition hover:text-rose aria-[current=page]:font-medium aria-[current=page]:text-rose"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={ctaHref} trackId="header-workshops">
              {ctaLabel}
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full ring-1 ring-ink/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "סגירת תפריט" : "פתיחת תפריט"}</span>
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-ink/5 bg-cream px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="נייד">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}
                className="min-h-12 rounded-xl px-3 py-3 text-ink hover:bg-peach/50 aria-[current=page]:font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-rose-deep px-4 py-3 text-center text-white"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
