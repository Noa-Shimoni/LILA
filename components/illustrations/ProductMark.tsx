export function ProductMark({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  if (slug === "pads") {
    return (
      <svg viewBox="0 0 120 88" className={className} aria-hidden>
        <rect x="18" y="18" width="84" height="52" rx="26" fill="#FDF4F8" stroke="#8A4A76" />
        <rect x="36" y="32" width="48" height="10" rx="5" fill="#E8B7D0" />
        <rect x="36" y="48" width="32" height="8" rx="4" fill="#D4CEEE" />
      </svg>
    );
  }
  if (slug === "underwear") {
    return (
      <svg viewBox="0 0 120 88" className={className} aria-hidden>
        <path d="M24 28h72c4 18 8 44-10 48-14 2-22-14-26-14s-12 16-26 14c-18-4-14-30-10-48Z" fill="#8A4A76" />
        <path d="M40 36c8 10 14 10 20 0" fill="none" stroke="#F3D4E4" strokeWidth="3" />
      </svg>
    );
  }
  if (slug === "tampons") {
    return (
      <svg viewBox="0 0 120 88" className={className} aria-hidden>
        <rect x="50" y="10" width="20" height="56" rx="10" fill="#E8B7D0" />
        <rect x="54" y="16" width="12" height="36" rx="6" fill="#FDF4F8" />
        <path d="M60 66v12" stroke="#8A4A76" strokeWidth="2" />
      </svg>
    );
  }
  if (slug === "letter") {
    return (
      <svg viewBox="0 0 120 88" className={className} aria-hidden>
        <rect x="18" y="24" width="84" height="48" rx="8" fill="#FDF4F8" stroke="#8A4A76" />
        <path d="M22 28 L60 52 L98 28" fill="none" stroke="#8A4A76" strokeWidth="2" />
      </svg>
    );
  }
  if (slug === "guide") {
    return (
      <svg viewBox="0 0 120 88" className={className} aria-hidden>
        <rect x="28" y="14" width="64" height="60" rx="6" fill="#8A4A76" />
        <rect x="36" y="26" width="40" height="6" rx="3" fill="#F3D4E4" />
        <rect x="36" y="38" width="28" height="5" rx="2" fill="#EAD4E4" />
        <rect x="36" y="50" width="34" height="5" rx="2" fill="#D4CEEE" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 88" className={className} aria-hidden>
      <rect x="34" y="20" width="52" height="48" rx="6" fill="#6B355C" />
      <rect x="42" y="30" width="36" height="6" rx="3" fill="#F3D4E4" />
      <rect x="42" y="42" width="24" height="5" rx="2" fill="#E8B7D0" />
    </svg>
  );
}
