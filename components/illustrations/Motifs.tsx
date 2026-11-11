type MotifProps = {
  className?: string;
};

export function Flower({ className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <g fill="#E8D0D6" stroke="#C48B9A" strokeWidth="1.4">
        <ellipse cx="40" cy="16" rx="8" ry="13" />
        <ellipse cx="40" cy="16" rx="8" ry="13" transform="rotate(72 40 40)" />
        <ellipse cx="40" cy="16" rx="8" ry="13" transform="rotate(144 40 40)" />
        <ellipse cx="40" cy="16" rx="8" ry="13" transform="rotate(216 40 40)" />
        <ellipse cx="40" cy="16" rx="8" ry="13" transform="rotate(288 40 40)" />
      </g>
      <circle cx="40" cy="40" r="7" fill="#F3E6C4" stroke="#C4A15A" strokeWidth="1.4" />
    </svg>
  );
}

export function Daisy({ className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <g fill="#FBF8F4" stroke="#E0C8BE" strokeWidth="1.3">
        <ellipse cx="40" cy="14" rx="7" ry="12" />
        <ellipse cx="40" cy="14" rx="7" ry="12" transform="rotate(45 40 40)" />
        <ellipse cx="40" cy="14" rx="7" ry="12" transform="rotate(90 40 40)" />
        <ellipse cx="40" cy="14" rx="7" ry="12" transform="rotate(135 40 40)" />
        <ellipse cx="40" cy="14" rx="7" ry="12" transform="rotate(180 40 40)" />
        <ellipse cx="40" cy="14" rx="7" ry="12" transform="rotate(225 40 40)" />
        <ellipse cx="40" cy="14" rx="7" ry="12" transform="rotate(270 40 40)" />
        <ellipse cx="40" cy="14" rx="7" ry="12" transform="rotate(315 40 40)" />
      </g>
      <circle cx="40" cy="40" r="8" fill="#F3E6C4" stroke="#C4A15A" strokeWidth="1.3" />
    </svg>
  );
}

export function Spark({ className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path
        d="M32 6c1.2 10 6 16 16 18-10 2-14.8 8-16 18-1.2-10-6-16-16-18 10-2 14.8-8 16-18z"
        fill="#F3E6C4"
        stroke="#C4A15A"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sprig({ className = "" }: MotifProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <path
        d="M18 64c16-8 28-24 34-46"
        fill="none"
        stroke="#7E9E90"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="34" cy="42" rx="8" ry="4.5" transform="rotate(-30 34 42)" fill="#C9DDD4" stroke="#7E9E90" strokeWidth="1.2" />
      <ellipse cx="46" cy="30" rx="8" ry="4.5" transform="rotate(24 46 30)" fill="#E8D0D6" stroke="#C48B9A" strokeWidth="1.2" />
      <ellipse cx="40" cy="18" rx="7" ry="4" transform="rotate(-18 40 18)" fill="#D9D1EA" stroke="#9B90B8" strokeWidth="1.2" />
    </svg>
  );
}

export function Blob({
  className = "",
  color = "#E8D0D6",
}: MotifProps & { color?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <path
        fill={color}
        d="M46 78c8-38 62-58 104-38 32 16 48 58 30 92-18 34-68 52-108 34C32 150 34 112 46 78z"
      />
    </svg>
  );
}
