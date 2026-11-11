import { kitItems, kitPromise } from "@/content/kit";
import { learningCards, workshopHero } from "@/content/workshops";

export type CampaignForm = "workshop" | "waitlist";
export type CampaignStatus = "live" | "draft";

export type Campaign = {
  slug: string;
  status: CampaignStatus;
  eyebrow: string;
  headline: string;
  lead: string;
  cta: string;
  benefits: { title: string; text: string }[];
  form: CampaignForm;
  seoTitle: string;
  seoDescription: string;
};

const underwear = kitItems.find((item) => item.slug === "underwear");

/**
 * Live campaigns are published at /lp/[slug] and kept out of the sitemap.
 * Draft campaigns stay in this file until their copy is approved.
 */
export const campaigns: Campaign[] = [
  {
    slug: "workshops",
    status: "live",
    eyebrow: "סדנאות LILA",
    headline: workshopHero.title,
    lead: "מפגש לאם ולבת: להכיר את הגוף, להבין את המחזור, ולהיות מוכנות יותר לווסת הראשונה. בלי תאריך עדיין. משאירות פרטים ומעדכנות כשנפתחת הרשמה.",
    cta: workshopHero.cta,
    benefits: learningCards.map((card) => ({ title: card.title, text: card.text })),
    form: "workshop",
    seoTitle: "סדנאות LILA | גדלות יחד",
    seoDescription:
      "עמוד לקמפיין הסדנאות של LILA. אמא ובת לומדות יחד על הגוף ועל הווסת הראשונה, ומשאירות פרטים לעדכון.",
  },
  {
    slug: "starter-kit",
    status: "draft",
    eyebrow: "ערכת היכרות",
    headline: "המחזור הראשון יכול לפגוש אותה מוכנה יותר.",
    lead: "ערכת LILA: תחבושות, תחתוני וסת, מכתב לילדה ונרתיק צבעוני. הרכישה עדיין לא פתוחה. העמוד הזה ממתין לאישור נוסח לפני פרסום.",
    cta: "לעדכון כשהערכה תיפתח",
    benefits: [
      ...kitItems.map((item) => ({ title: item.name, text: item.short })),
      { title: "ההבטחה", text: kitPromise.join(" · ") },
    ],
    form: "waitlist",
    seoTitle: "ערכת ההיכרות של LILA",
    seoDescription: "טיוטת עמוד קמפיין לערכת ההיכרות. לא מפורסמת עד לאישור התוכן.",
  },
  {
    slug: "period-underwear",
    status: "draft",
    eyebrow: "תחתוני וסת",
    headline: underwear?.name ?? "תחתוני וסת",
    lead:
      underwear?.summary ??
      "תחתוני וסת של LILA. טיוטה לעמוד קמפיין, בלי מחיר ובלי רכישה נפרדת עד שזה יאושר.",
    cta: "לעדכון על הערכה",
    benefits: [
      { title: "איך זה מרגיש", text: underwear?.short ?? "" },
      { title: "איך משתמשים", text: underwear?.how ?? "" },
    ],
    form: "waitlist",
    seoTitle: "תחתוני וסת | LILA",
    seoDescription: "טיוטת עמוד קמפיין לתחתוני הווסת. לא מפורסמת עד לאישור התוכן.",
  },
];

export function getCampaign(slug: string) {
  return campaigns.find((campaign) => campaign.slug === slug);
}

export function liveCampaigns() {
  return campaigns.filter((campaign) => campaign.status === "live");
}
