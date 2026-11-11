"use client";

import Link from "next/link";
import { track } from "@/components/analytics/track";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  trackId?: string;
  id?: string;
};

const styles = {
  primary: "bg-rose-deep text-white hover:bg-rose shadow-card",
  secondary: "bg-white/85 text-ink ring-1 ring-ink/10 hover:bg-white",
  ghost: "bg-transparent text-rose-deep underline-offset-4 hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  trackId,
  id,
}: ButtonProps) {
  const cls = `inline-flex min-h-12 min-w-12 items-center justify-center rounded-full px-6 py-3 text-base font-medium transition duration-200 ease-lila disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;

  function handleClick() {
    if (trackId) {
      track("cta_click", { id: trackId, href: href ?? "" });
    }
    onClick?.();
  }

  if (href) {
    return (
      <Link id={id} href={href} className={cls} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button id={id} type={type} onClick={handleClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
