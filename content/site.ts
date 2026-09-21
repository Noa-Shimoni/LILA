export const brand = {
  name: "LILA",
  nameEn: "LILA",
  tagline: "ערכת היכרות למחזור הראשון",
  description:
    "ערכת הכנה נעימה, שימושית ומרגיעה שמלווה ילדות ונערות לקראת המחזור הראשון — עם ידע, התנסות ותחושת מוכנות.",
};

/** Inbox for waitlist signups. Override with WAITLIST_NOTIFY_EMAIL in production if needed. */
export const waitlistNotifyEmail = "noashimoni@gmail.com";

export const navLinks = [
  { href: "/kit", label: "מה יש בערכה?" },
  { href: "/journey", label: "מסע ההתבגרות" },
  { href: "/parents", label: "להורים" },
  { href: "/guide", label: "מדריך למחזור הראשון" },
  { href: "/#waitlist", label: "הרשמה לערכה" },
] as const;

export const footerLinks = {
  explore: [
    { href: "/about", label: "עלינו" },
    { href: "/kit", label: "מה יש בערכה" },
    { href: "/journey", label: "מסע ההתבגרות" },
    { href: "/how-it-works", label: "איך זה עובד" },
    { href: "/guide", label: "מדריך למחזור הראשון" },
    { href: "/mothers", label: "מדריך לאמהות" },
    { href: "/parents", label: "להורים" },
  ],
  help: [
    { href: "/faq", label: "שאלות נפוצות" },
    { href: "/contact", label: "יצירת קשר" },
    { href: "/shipping", label: "משלוחים והחזרות" },
    { href: "/privacy", label: "פרטיות" },
  ],
} as const;

export const cta = {
  primary: "לגלות את הערכה",
  kit: "לגלות מה יש בערכה",
  guide: "ללמוד על המחזור הראשון",
  mothers: "מדריך קצר לאמהות",
  more: "לקרוא עוד",
};
