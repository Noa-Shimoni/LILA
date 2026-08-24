export function KitUnbox({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 520"
      className={className}
      role="img"
      aria-label="קופסה פתוחה של ערכת LILA עם תחבושות, תחתוני וסת, מכתב ומדריך"
    >
      <defs>
        <linearGradient id="box" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F7F6FB" />
          <stop offset="100%" stopColor="#D5DEF2" />
        </linearGradient>
      </defs>
      <ellipse cx="320" cy="470" rx="210" ry="22" fill="#D4CEEE" opacity=".4" />
      <path d="M90 210h460l-28 196H128Z" fill="url(#box)" stroke="#A8B4D8" strokeWidth="2" />
      <path d="M90 210 L70 70 h140 l20 140Z" fill="#EAD4E4" />
      <path d="M550 210 L575 78 h-148 l-20 132Z" fill="#D4CEEE" />
      <path d="M318 210 V48 h-88 l-20 162" fill="#C9D6EA" opacity=".95" />
      <path d="M322 210 V52 h92 l18 158" fill="#D5DEF2" />
      <rect x="160" y="250" width="130" height="86" rx="16" fill="#F7F6FB" stroke="#5A5488" strokeWidth="1.5" />
      <rect x="176" y="266" width="98" height="12" rx="6" fill="#EAD4E4" />
      <rect x="176" y="286" width="72" height="8" rx="4" fill="#D4CEEE" />
      <path d="M330 248c28-22 78-18 92 14 10 22-6 48-34 58-36 12-74-8-80-32-4-18 6-32 22-40Z" fill="#5A5488" opacity=".9" />
      <path d="M338 268c18-8 40-4 48 12" fill="none" stroke="#F7F6FB" strokeWidth="3" strokeLinecap="round" />
      <rect x="430" y="262" width="70" height="118" rx="35" fill="#D4CEEE" />
      <rect x="448" y="278" width="34" height="70" rx="16" fill="#F7F6FB" />
      <rect x="200" y="360" width="92" height="70" rx="8" fill="#3D3868" />
      <rect x="210" y="372" width="72" height="8" rx="4" fill="#D5DEF2" />
      <rect x="210" y="388" width="54" height="6" rx="3" fill="#EAD4E4" />
      <circle cx="168" cy="198" r="6" fill="#D4CEEE" />
      <circle cx="480" cy="188" r="4" fill="#5A5488" opacity=".4" />
      <path d="M250 96c12-22 36-22 44 2 10-16 30-14 34 6-18 6-34 4-46 18-10-10-22-12-32-8Z" fill="#C9D6EA" />
      <path d="M400 108c8-18 28-16 34 4 8-12 24-10 28 6-14 4-26 2-36 14-8-8-18-10-26-8Z" fill="#EAD4E4" />
    </svg>
  );
}
