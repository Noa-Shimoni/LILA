export const workshopHero = {
  title: "גדלות יחד. לומדות להכיר את הגוף. מתכוננות לשינויים.",
  lead: "סדנאות LILA מזמינות אמהות וילדות לצאת יחד למסע של היכרות עם הגוף, ההתבגרות והווסת הראשונה. במרחב נעים, פתוח וחווייתי, נלמד, נשאל שאלות ונקבל כלים שיעזרו לנו להרגיש בטוחות ומוכנות יותר.",
  cta: "אני רוצה לשמוע על הסדנאות",
};

export const learningCards = [
  {
    title: "מכירות את הגוף",
    text: "היכרות רגועה עם מערכת הרבייה ועם השינויים הגופניים של גיל ההתבגרות. בגובה העיניים, בלי להבהיל ובלי מבוכה.",
    tone: "blush",
  },
  {
    title: "The LILA Cycle",
    text: "הסבר פשוט וברור על המחזור החודשי ועל ארבעת השלבים שלו, כדי שיהיה קל יותר להבין מה הגוף עושה.",
    tone: "lilac",
  },
  {
    title: "מתכוננות לווסת הראשונה",
    text: "היכרות עם תחבושות, תחתוני וסת ומוצרי היגיינה לווסת. אין חובה להשתמש בהכול, ויש מקום לבחור מה שנוח.",
    tone: "mint",
  },
  {
    title: "מוכנות למצבים חדשים",
    text: "הכנה מעשית למקרה שהווסת הראשונה מגיעה בבית הספר, מחוץ לבית, או ברגע שלא תכננו.",
    tone: "butter",
  },
] as const;

export const activities = [
  {
    title: "איורים לימודיים",
    text: "מסתכלות יחד על איורים ברורים, בלי תמונות רפואיות.",
  },
  {
    title: "הנפשה קצרה",
    text: "הסבר קצר וחזותי, בשפה פשוטה.",
  },
  {
    title: "פעילויות על המחזור",
    text: "תרגילים קצרים שמסדרים את השלבים בצורה שקל לזכור.",
  },
  {
    title: "מסע הביצית",
    text: "סיפור חזותי של הדרך, בקצב רגוע.",
  },
  {
    title: "מיתוס ועובדה",
    text: "מה נכון, מה לא, ומה פשוט שמענו בדרך.",
  },
  {
    title: "שאלות אנונימיות",
    text: "אפשר לשאול בלי להגיד את השם.",
  },
  {
    title: "הדגמת מוצרים",
    text: "רואות איך תחבושת ותחתוני וסת עובדים, לפני שצריך אותם.",
  },
  {
    title: "ערכת חירום אישית",
    text: "מכינות משהו קטן לתיק, לרגע שבו זה קורה בחוץ.",
  },
] as const;

export const workshopFacts = [
  { label: "משך", value: "כ־90 דקות" },
  { label: "פורמט", value: "קבוצה קטנה" },
  { label: "משתתפות", value: "ילדה והורה מלווה" },
  { label: "תוכן", value: "ביולוגיה, הכנה מעשית ושיחה פתוחה" },
] as const;

export const daughterAges = [
  { value: "under-8", label: "מתחת לגיל 8" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14-plus", label: "14 ומעלה" },
] as const;

export const workshopInterests = [
  { value: "mother-daughter", label: "סדנה לאם ולבת" },
  { value: "girls-only", label: "סדנה לילדות בלבד" },
  { value: "institution", label: "סדנה למסגרת חינוכית או לקבוצה" },
  { value: "unsure", label: "עוד לא בטוחה" },
] as const;

export type DaughterAge = (typeof daughterAges)[number]["value"];
export type WorkshopInterest = (typeof workshopInterests)[number]["value"];

export const workshopSuccessMessage =
  "איזה כיף! קיבלנו את הפרטים שלך ונשמח לעדכן אותך כשהסדנאות ייפתחו להרשמה.";
