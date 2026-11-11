export const brand = {
  name: "LILA",
  nameEn: "LILA",
  tagline: "גדלות יחד",
  description:
    "LILA מלווה ילדות והורים במסע ההתבגרות, עם מוצרים, ידע וסדנאות שמעניקים ביטחון לקראת הווסת הראשונה ולאורך הדרך.",
};

/**
 * Public contact address, rendered on the server and in the browser.
 * Keep this a literal so both sides always match.
 * WAITLIST_NOTIFY_EMAIL overrides only the private FormSubmit inbox in the API routes.
 */
export const waitlistNotifyEmail = "lila@lilakit.com";

export const navLinks = [
  { href: "/kit", label: "הערכות" },
  { href: "/workshops", label: "סדנאות" },
  { href: "/journey", label: "מסע ההתבגרות" },
  { href: "/guide", label: "ידע" },
  { href: "/parents", label: "להורים" },
] as const;

export const footerLinks = {
  explore: [
    { href: "/about", label: "עלינו" },
    { href: "/workshops", label: "הסדנאות" },
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
  workshops: "להכיר את הסדנאות",
  kit: "לגלות מה יש בערכה",
  guide: "ללמוד על המחזור הראשון",
  mothers: "מדריך קצר לאמהות",
  more: "לקרוא עוד",
};
