import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import os from "node:os";

const pptxMod = await import(
  pathToFileURL(
    path.join(os.tmpdir(), "lila-pptx-gen", "node_modules", "pptxgenjs", "dist", "pptxgen.es.js"),
  ).href
);
const PptxGenJS = pptxMod.default;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outFile = path.join(root, "Lila_pitch_deck_investors_hebrew.pptx");
const logo = path.join(root, "logo.png");
const kit = path.join(root, "full kit.png");

const C = {
  cream: "F8F1F5",
  peach: "F3D4E4",
  blush: "EBC0D6",
  lilac: "D8C4EE",
  sage: "E4D0EA",
  rose: "8A4A76",
  deep: "6B355C",
  ink: "2E2432",
  muted: "6A5564",
  white: "FFFFFF",
};

const FONT = "Arial";
const TOTAL = 17;

const pres = new PptxGenJS();
pres.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
pres.layout = "WIDE";
pres.title = "LILA — מצגת למשקיעים";
pres.author = "נעה חקאק";
pres.subject = "ערכת היכרות למחזור הראשון";
pres.rtlMode = true;

function footer(slide, n) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 7.22,
    w: 13.333,
    h: 0.28,
    fill: { color: C.deep },
    line: { color: C.deep },
  });
  slide.addText("LILA  ·  לגדול זה מסע", {
    x: 0.4,
    y: 7.22,
    w: 9,
    h: 0.28,
    fontFace: FONT,
    fontSize: 11,
    color: C.white,
    align: "right",
    valign: "middle",
    rtlMode: true,
  });
  slide.addText(`${n} / ${TOTAL}`, {
    x: 11.4,
    y: 7.22,
    w: 1.5,
    h: 0.28,
    fontFace: FONT,
    fontSize: 11,
    color: C.white,
    align: "left",
    valign: "middle",
  });
}

function kicker(slide, text) {
  slide.addText(text, {
    x: 0.5,
    y: 0.22,
    w: 12.3,
    h: 0.32,
    fontFace: FONT,
    fontSize: 12,
    color: C.rose,
    bold: true,
    align: "right",
    rtlMode: true,
  });
}

function title(slide, text, y = 0.5) {
  slide.addText(text, {
    x: 0.5,
    y,
    w: 12.3,
    h: 0.9,
    fontFace: FONT,
    fontSize: 28,
    color: C.deep,
    bold: true,
    align: "right",
    rtlMode: true,
    valign: "top",
  });
}

function bullets(slide, items, y = 1.55) {
  slide.addText(
    items.map((t) => ({
      text: t,
      options: { bullet: false, breakLine: true, rtlMode: true },
    })),
    {
      x: 0.55,
      y,
      w: 12.2,
      h: 5.3,
      fontFace: FONT,
      fontSize: 18,
      color: C.ink,
      align: "right",
      rtlMode: true,
      paraSpaceAfter: 10,
      valign: "top",
    },
  );
}

function card(slide, { x, y, w, h, fill, head, body }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    rectRadius: 0.1,
    line: { color: fill },
  });
  slide.addText(head, {
    x: x + 0.12,
    y: y + 0.12,
    w: w - 0.24,
    h: 0.4,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: C.deep,
    align: "right",
    rtlMode: true,
  });
  slide.addText(body, {
    x: x + 0.12,
    y: y + 0.52,
    w: w - 0.24,
    h: h - 0.7,
    fontFace: FONT,
    fontSize: 14,
    color: C.ink,
    align: "right",
    rtlMode: true,
    valign: "top",
  });
}

function numberedCard(slide, { x, y, w, h, n, head, body, fill }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    rectRadius: 0.1,
  });
  slide.addText(String(n), {
    x: x + w - 0.7,
    y: y + 0.12,
    w: 0.5,
    h: 0.38,
    fontFace: FONT,
    fontSize: 18,
    bold: true,
    color: C.rose,
    align: "center",
  });
  slide.addText(head, {
    x: x + 0.12,
    y: y + 0.5,
    w: w - 0.24,
    h: 0.7,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: C.deep,
    align: "right",
    rtlMode: true,
  });
  slide.addText(body, {
    x: x + 0.12,
    y: y + 1.22,
    w: w - 0.24,
    h: h - 1.4,
    fontFace: FONT,
    fontSize: 13,
    color: C.ink,
    align: "right",
    rtlMode: true,
  });
}

// 1 Title
{
  const s = pres.addSlide();
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.cream },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.22, h: 7.5, fill: { color: C.rose },
  });
  try {
    s.addImage({ path: logo, x: 11.35, y: 0.35, w: 1.4, h: 1.4 });
  } catch {
    s.addText("LILA", { x: 10.8, y: 0.4, w: 2, h: 0.5, fontFace: FONT, fontSize: 22, color: C.deep, bold: true, align: "right" });
  }
  s.addText("LILA", {
    x: 0.7, y: 1.7, w: 8.8, h: 0.7,
    fontFace: FONT, fontSize: 40, bold: true, color: C.deep, align: "right", rtlMode: true,
  });
  s.addText("הרגע שמפחיד הורים\nהוא שוק שעדיין לא נלקח", {
    x: 0.7, y: 2.45, w: 8.8, h: 1.5,
    fontFace: FONT, fontSize: 28, color: C.rose, align: "right", rtlMode: true,
  });
  s.addText("ערכת היכרות למחזור הראשון שצומחת לליווי לאורך ההתבגרות.\nמוצר + ידע + שיחה. בעברית. לשוק ישראלי.", {
    x: 0.7, y: 4.15, w: 8.8, h: 1.1,
    fontFace: FONT, fontSize: 16, color: C.muted, align: "right", rtlMode: true,
  });
  try {
    s.addImage({ path: kit, x: 9.55, y: 2.1, w: 3.3, h: 3.3 });
  } catch { /* optional */ }
  footer(s, 1);
}

// 2 Problem
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "הבעיה");
  title(s, "המחזור הראשון מגיע. ההכנה לא.");
  const items = [
    { head: "לבנות", body: "שאלות, מבוכה וחוסר ודאות — בלי ערכת הכנה אמיתית.", fill: C.peach },
    { head: "להורים", body: "אין תסריט: מתי לדבר, מה לקנות, ואיך לא להביך.", fill: C.blush },
    { head: "לשוק", body: "תחבושות בסופר, ידע בגוגל, שיחה נדחית לערב האחרון.", fill: C.lilac },
  ];
  items.forEach((it, i) => {
    card(s, { x: 0.5 + i * 4.2, y: 1.7, w: 3.95, h: 3.2, ...it });
  });
  s.addText("מי שקונה (הורה) ומי שמשתמשת (הבת) לא מקבלות פתרון אחד.", {
    x: 0.5, y: 5.15, w: 12.3, h: 0.55,
    fontFace: FONT, fontSize: 16, italic: true, color: C.deep, align: "right", rtlMode: true,
  });
  footer(s, 2);
}

// 3 Insight
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "התובנה");
  title(s, "לא ערכת חירום. נקודת כניסה למסע.");
  const steps = [
    { n: "1", head: "הדלת", body: "המחזור הראשון — רגע אחד, קנייה אחת." },
    { n: "2", head: "המשך", body: "מילוי, תחתוני וסת, חזייה ראשונה, סדנה." },
    { n: "3", head: "הערך", body: "LTV נבנה משלב לשלב — לא ממבצע על קופסה." },
  ];
  steps.forEach((st, i) => {
    numberedCard(s, {
      x: 0.5 + i * 4.2, y: 1.75, w: 3.95, h: 3.6,
      n: st.n, head: st.head, body: st.body, fill: i === 0 ? C.blush : C.peach,
    });
  });
  footer(s, 3);
}

// 4 Solution
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "הפתרון");
  title(s, "שלוש שכבות. חוויה אחת.");
  card(s, { x: 0.5, y: 1.7, w: 3.95, h: 3.4, fill: C.peach, head: "מוצר", body: "ערכה לבנות: תחבושות, תחתוני וסת, מכתב ונרתיק." });
  card(s, { x: 4.7, y: 1.7, w: 3.95, h: 3.4, fill: C.blush, head: "ידע", body: "הסברים בגובה העיניים. בלי טון רפואי ובלי מבוכה." });
  card(s, { x: 8.9, y: 1.7, w: 3.95, h: 3.4, fill: C.lilac, head: "שיחה", body: "כלים להורה לפתוח את הנושא — בלי לקחת לבת את העצמאות." });
  s.addText("במקום לאסוף חלקים — לקבל מסלול.", {
    x: 0.5, y: 5.3, w: 12.3, h: 0.45,
    fontFace: FONT, fontSize: 18, bold: true, color: C.deep, align: "right", rtlMode: true,
  });
  footer(s, 4);
}

// 5 Product journey
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "המוצר");
  title(s, "מתחילים בערכה. נשארים במסע.");
  const cols = [
    { tag: "עכשיו", head: "LILA Starter", body: "ערכת היכרות למחזור הראשון." },
    { tag: "מיד", head: "מילוי + תחתונים", body: "תחבושות ותחתוני וסת לחזרה." },
    { tag: "השלב הבא", head: "חזייה ראשונה", body: "אירוע בדרך — לא קטגוריה נפרדת." },
    { tag: "הרחבה", head: "סדנה וליווי", body: "סדנאות הורה־בת, ואחר כך דיגיטל לפי שלב." },
  ];
  cols.forEach((c, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4 + i * 3.2, y: 1.7, w: 3.05, h: 4.3,
      fill: { color: i === 0 ? C.blush : C.peach }, rectRadius: 0.1,
    });
    s.addText(c.tag, {
      x: 0.52 + i * 3.2, y: 1.85, w: 2.8, h: 0.35,
      fontFace: FONT, fontSize: 12, color: C.rose, bold: true, align: "right", rtlMode: true,
    });
    s.addText(c.head, {
      x: 0.52 + i * 3.2, y: 2.3, w: 2.8, h: 0.9,
      fontFace: FONT, fontSize: 18, color: C.deep, bold: true, align: "right", rtlMode: true,
    });
    s.addText(c.body, {
      x: 0.52 + i * 3.2, y: 3.3, w: 2.8, h: 2.2,
      fontFace: FONT, fontSize: 14, color: C.ink, align: "right", rtlMode: true,
    });
  });
  footer(s, 5);
}

// 6 Experience
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "החוויה");
  title(s, "ארבע שאלות. מסלול אחד.");
  const qs = [
    { n: "01", q: "איפה אני עכשיו?" },
    { n: "02", q: "מה קורה בגוף שלי?" },
    { n: "03", q: "מה אני צריכה היום?" },
    { n: "04", q: "מה יכול לבוא אחר כך?" },
  ];
  qs.forEach((q, i) => {
    numberedCard(s, {
      x: 0.45 + i * 3.2, y: 1.7, w: 3.05, h: 3.5,
      n: q.n.replace("0", ""), head: q.q, body: "", fill: C.peach,
    });
  });
  s.addText("הכוונה לפי שלב — לא ספריית תוכן כללית.", {
    x: 0.5, y: 5.45, w: 12.3, h: 0.4,
    fontFace: FONT, fontSize: 16, italic: true, color: C.deep, align: "right", rtlMode: true,
  });
  footer(s, 6);
}

// 7 Audience
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "הקהל");
  title(s, "הבת משתמשת. ההורה קונה.\nשתיהן חייבות להרגיש בבית.");
  card(s, {
    x: 0.5, y: 2.35, w: 6.0, h: 3.4, fill: C.peach,
    head: "הבת  ·  משתמשת",
    body: "גיל 8–12+. רוצה להבין בלי מבוכה, ולבחור בקצב שלה. כאן נבנית הנאמנות.",
  });
  card(s, {
    x: 6.8, y: 2.35, w: 6.0, h: 3.4, fill: C.lilac,
    head: "ההורה  ·  קונה",
    body: "רוצה הכנה איכותית בלי להפוך את זה לדרמה. כאן מתקבלת החלטת הקנייה.",
  });
  footer(s, 7);
}

// 8 Market
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "השוק");
  title(s, "כל חודש נכנסות אלפי בנות לשוק.\nכמעט בלי מותג שמדבר אליהן.");
  const funnel = [
    { y: 2.45, w: 11.2, label: "TAM", num: "7,000", desc: "בנות בישראל מגיעות לגיל המחזור הראשון בכל חודש" },
    { y: 3.55, w: 8.6, label: "SAM", num: "4,410", desc: "משפחות עם נכונות לשלם על הכנה איכותית — לא רק סופר" },
    { y: 4.65, w: 6.2, label: "SOM", num: "~400", desc: "שנה 1: נתח בר־השגה בדיגיטל ובסדנאות, בחודש" },
  ];
  funnel.forEach((f) => {
    const x = (13.333 - f.w) / 2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: f.y, w: f.w, h: 0.95, fill: { color: C.blush }, rectRadius: 0.08,
    });
    s.addText(`${f.label}   ${f.num} / חודש`, {
      x: x + 0.2, y: f.y + 0.08, w: f.w - 0.4, h: 0.38,
      fontFace: FONT, fontSize: 16, bold: true, color: C.deep, align: "right", rtlMode: true,
    });
    s.addText(f.desc, {
      x: x + 0.2, y: f.y + 0.46, w: f.w - 0.4, h: 0.4,
      fontFace: FONT, fontSize: 12, color: C.ink, align: "right", rtlMode: true,
    });
  });
  s.addText("המספרים מהמצגת המקורית. יש לצרף מקור/הנחה לפני פגישת משקיעים.", {
    x: 0.5, y: 5.75, w: 12.3, h: 0.35,
    fontFace: FONT, fontSize: 12, color: C.muted, align: "right", rtlMode: true,
  });
  footer(s, 8);
}

// 9 Competition
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "בידול");
  title(s, "אחרות מוכרות קופסה. LILA מוכרת ליווי.");
  const comps = [
    { head: "סופר / היגיינה", body: "מוצר. בלי שיחה." },
    { head: "ערכות מתנה", body: "Besti, Etsy — קופסה. בלי מסע." },
    { head: "תחתוני וסת", body: "Modibodi, WUKA — פריט אחד חזק." },
    { head: "מרכז רותם", body: "חינוך נגיש. בלי מותג מוצר." },
  ];
  comps.forEach((c, i) => {
    card(s, { x: 0.4 + (i % 2) * 4.15, y: 1.7 + Math.floor(i / 2) * 2.15, w: 3.95, h: 2.0, fill: C.peach, ...c });
  });
  card(s, {
    x: 8.7, y: 1.7, w: 4.15, h: 4.3, fill: C.blush,
    head: "LILA",
    body: "מוצר + ידע + שיחה.\nבעברית. עם נתיב הרחבה לאורך גיל ההתבגרות.",
  });
  footer(s, 9);
}

// 10 Model
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "המודל");
  title(s, "שלושה מנועים. אחד מושך את השני.");
  card(s, { x: 0.5, y: 1.75, w: 3.95, h: 3.6, fill: C.peach, head: "עכשיו · אתר", body: "מכירה ישירה: ערכות ומילוי." });
  card(s, { x: 4.7, y: 1.75, w: 3.95, h: 3.6, fill: C.blush, head: "מקביל · סדנאות", body: "הורה־בת: הכנסה ורכישת אמון." });
  card(s, { x: 8.9, y: 1.75, w: 3.95, h: 3.6, fill: C.lilac, head: "בהמשך · ליווי", body: "תוכן לפי שלב. רק אחרי הוכחת ביקוש." });
  s.addText("כל ערוץ נבחן על ביקוש ורווחיות לפני הרחבה.", {
    x: 0.5, y: 5.55, w: 12.3, h: 0.4,
    fontFace: FONT, fontSize: 16, italic: true, color: C.deep, align: "right", rtlMode: true,
  });
  footer(s, 10);
}

// 11 Traction
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "טראקשן");
  title(s, "מה כבר קיים. מה עדיין חייב מספר.");
  card(s, {
    x: 0.5, y: 1.75, w: 6.05, h: 4.2, fill: C.peach,
    head: "הוכח",
    body: "אתר חי · נוכחות מותג · בדיקות מוצר ראשונות (נוחות, ספיגה, התאמת גיל).",
  });
  card(s, {
    x: 6.8, y: 1.75, w: 6.05, h: 4.2, fill: C.lilac,
    head: "יימדד ב־90 הימים הקרובים",
    body: "ראיונות · המרות · CAC · רכישה חוזרת.\nמטלות תפעול (שילוח, SKU נוסף) אינן טראקשן.",
  });
  footer(s, 11);
}

// 12 GTM
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "כניסה לשוק");
  title(s, "נכנסים דרך ההורה. נשארים בזכות הבת.");
  const gtm = [
    { n: "1", head: "תוכן + המתנה", body: "אינסטגרם וחיפוש להורים. דף נחיתה לרשימה." },
    { n: "2", head: "סדנה כמוכרת", body: "ערוץ אמון ומכירה — לא אירוע צד." },
    { n: "3", head: "שותפויות", body: "חינוך ובריאות — רק אחרי מוצר ומשוב." },
  ];
  gtm.forEach((g, i) => {
    numberedCard(s, { x: 0.5 + i * 4.2, y: 1.75, w: 3.95, h: 3.7, n: g.n, head: g.head, body: g.body, fill: C.peach });
  });
  footer(s, 12);
}

// 13 Roadmap
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "12 חודשים");
  title(s, "להוכיח שהדלת נפתחת שוב.");
  const road = [
    { t: "0–3 חודשים", b: "השקת ערכה. 50 לקוחות ראשונות. מדידת המרה." },
    { t: "3–6 חודשים", b: "סדנאות קבועות ומילוי. הוכחת רכישה שנייה." },
    { t: "6–12 חודשים", b: "SKU משלים אחד לפי ביקוש אמיתי." },
    { t: "שנה 2", b: "ליווי דיגיטלי — רק אם שיעור החזרה מצדיק." },
  ];
  road.forEach((r, i) => {
    numberedCard(s, {
      x: 0.4 + i * 3.2, y: 1.75, w: 3.05, h: 4.2,
      n: String(i + 1), head: r.t, body: r.b,
      fill: i === 3 ? C.lilac : C.peach,
    });
  });
  footer(s, 13);
}

// 14 Economics
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "כלכלה · תרחיש שמרני");
  title(s, "שנת הוכחה — לא תמונת היציאה.");
  s.addTable(
    [
      [
        { text: "סעיף", options: { fill: { color: C.deep }, color: C.white, bold: true, align: "right" } },
        { text: "הנחה", options: { fill: { color: C.deep }, color: C.white, bold: true, align: "right" } },
        { text: "חודשי", options: { fill: { color: C.deep }, color: C.white, bold: true, align: "right" } },
      ],
      ["ערכות LILA", "50 × 129 ₪", "6,450 ₪"],
      ["סדנאות הורה־בת", "2 × 8 זוגות × 150 ₪", "2,400 ₪"],
      ["סה״כ הכנסות", "", "8,850 ₪"],
      ["סה״כ הוצאות", "שיווק, עלות, סליקה, תפעול", "7,600 ₪"],
      ["יתרה חודשית", "תרחיש בסיס — לא יעד", "~1,250 ₪"],
    ],
    {
      x: 0.5, y: 1.65, w: 12.3, h: 3.6,
      colW: [3.6, 5.2, 3.5],
      border: [{ pt: 0 }, { pt: 0 }, { pt: 0 }, { pt: 0 }],
      fontFace: FONT,
      fontSize: 14,
      color: C.ink,
      align: "right",
      valign: "middle",
      rtlMode: true,
    },
  );
  s.addText("יחידת כלכלה: ערכה 129 ₪ · סדנה 150 ₪ לזוג. שנתי בבסיס זה ~106 אלף הכנסה מול ~91 אלף הוצאה. הגיוס נועד למלאי, שיווק, שילוח ומדידה — הסכום יושלם.", {
    x: 0.5, y: 5.45, w: 12.3, h: 0.7,
    fontFace: FONT, fontSize: 13, color: C.muted, align: "right", rtlMode: true,
  });
  footer(s, 14);
}

// 15 Founder
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "היזמת");
  title(s, "בניתי את מה שחיפשתי לבת שלי — ולא מצאתי.");
  s.addText("נעה חקאק  ·  אמא לבת מתבגרת", {
    x: 0.5, y: 1.7, w: 12.3, h: 0.45,
    fontFace: FONT, fontSize: 18, color: C.rose, bold: true, align: "right", rtlMode: true,
  });
  const tags = [
    { h: "מדע", b: "BSc בביולוגיה" },
    { h: "מכירות", b: "ניהול מכירות ציוד רפואי" },
    { h: "חינוך", b: "ניסיון בהוראה" },
  ];
  tags.forEach((t, i) => {
    card(s, { x: 0.5 + i * 4.2, y: 2.35, w: 3.95, h: 2.15, fill: C.peach, head: t.h, body: t.b });
  });
  s.addText("יודעת למכור. יודעת להסביר. חיה את הבעיה.", {
    x: 0.5, y: 4.75, w: 12.3, h: 0.5,
    fontFace: FONT, fontSize: 18, bold: true, color: C.deep, align: "right", rtlMode: true,
  });
  footer(s, 15);
}

// 16 Team
{
  const s = pres.addSlide();
  s.background = { color: C.cream };
  kicker(s, "הצוות");
  title(s, "מה כבר אצלי. מה הגיוס משלים.");
  card(s, {
    x: 0.5, y: 1.7, w: 4.0, h: 4.3, fill: C.blush,
    head: "קיים · מייסדת",
    body: "מוצר · מותג · אתר · סיפור.\nנעה במרכז.",
  });
  const seats = [
    { h: "אספקה", b: "ייצור / מותג פרטי" },
    { h: "שילוח", b: "מלאי ולוגיסטיקה" },
    { h: "מדידה", b: "תוכן שוטף ונתונים" },
  ];
  seats.forEach((t, i) => {
    card(s, { x: 4.8, y: 1.7 + i * 1.5, w: 7.95, h: 1.35, fill: C.peach, head: t.h, body: t.b });
  });
  footer(s, 16);
}

// 17 Close
{
  const s = pres.addSlide();
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.deep },
  });
  try {
    s.addImage({ path: logo, x: 11.4, y: 0.4, w: 1.3, h: 1.3 });
  } catch { /* optional */ }
  s.addText("LILA", {
    x: 0.7, y: 1.8, w: 12, h: 0.6,
    fontFace: FONT, fontSize: 36, bold: true, color: C.white, align: "right", rtlMode: true,
  });
  s.addText("להפוך את ההתבגרות למסע\nשל ידע, מוכנות וביטחון.", {
    x: 0.7, y: 2.55, w: 12, h: 1.4,
    fontFace: FONT, fontSize: 26, color: C.peach, align: "right", rtlMode: true,
  });
  s.addText("כל בת בישראל תדע שהיא לא לבד ברגע הזה.", {
    x: 0.7, y: 4.15, w: 12, h: 0.5,
    fontFace: FONT, fontSize: 16, color: C.white, align: "right", rtlMode: true,
  });
  s.addText("לשיחה על גיוס סיד או שותפות אסטרטגית\nlila@lilakit.com", {
    x: 0.7, y: 5.0, w: 12, h: 0.85,
    fontFace: FONT, fontSize: 16, color: C.blush, align: "right", rtlMode: true,
  });
}

await pres.writeFile({ fileName: outFile });
console.log(outFile);
