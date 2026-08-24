import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const styles = {
  primary:
    "bg-rose-deep text-white hover:bg-rose shadow-card",
  secondary:
    "bg-white/80 text-ink ring-1 ring-ink/10 hover:bg-white",
  ghost:
    "bg-transparent text-rose-deep underline-offset-4 hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  const cls = `inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-6 py-2.5 text-base font-medium transition duration-200 ease-lila disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
