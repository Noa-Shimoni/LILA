export function MoonMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="23" fill="#D5DEF2" />
      <path
        d="M28 10.5c-7.4 1.2-13 7.6-13 15.3 0 8.5 6.9 15.4 15.4 15.4 2.2 0 4.3-.5 6.2-1.3C33.4 42 29 44 24 44 13 44 4 35 4 24S13 4 24 4c3.2 0 6.2.7 8.8 2-1.5.7-2.9 1.9-4.8 4.5Z"
        fill="#5A5488"
      />
      <circle cx="33.5" cy="16" r="1.4" fill="#EAD4E4" />
      <circle cx="37" cy="22" r="0.9" fill="#3D3868" opacity=".45" />
    </svg>
  );
}
