import Link from "next/link";
import { BrandLogo } from "@/components/illustrations/BrandLogo";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex min-h-12 items-center" aria-label="LILA — דף הבית">
          <BrandLogo decorative priority />
        </Link>
        <a href="#register" className="inline-flex min-h-12 items-center rounded-full bg-rose-deep px-5 text-white">
          להשאיר פרטים
        </a>
      </div>
    </header>
  );
}
