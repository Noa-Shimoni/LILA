"use client";

import Link from "next/link";
import { track } from "@/components/analytics/track";

export function TrackedLink({
  href,
  trackId,
  className,
  children,
}: {
  href: string;
  trackId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track("cta_click", { id: trackId, href })}
    >
      {children}
    </Link>
  );
}
