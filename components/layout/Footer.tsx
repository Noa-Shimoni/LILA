import Link from "next/link";
import { brand, footerLinks } from "@/content/site";
import { MoonMark } from "@/components/illustrations/MoonMark";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-ink/10 bg-white/40">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <MoonMark className="h-8 w-8" />
            <span className="text-[1.05rem] font-medium tracking-[0.22em]">{brand.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-muted">
            ערכת היכרות למחזור הראשון. חמה, ברורה, בלי מבוכה ובלי דרמה.
          </p>
          <p className="mt-6 text-sm text-muted">
            המידע באתר הוא הסבר כללי ולא תחליף לייעוץ רפואי. אם משהו מדאיג — דברו עם מבוגר או עם רופא/ה.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">לגלות</p>
          <ul className="mt-3 space-y-2">
            {footerLinks.explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-rose">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-ink">עזרה</p>
          <ul className="mt-3 space-y-2">
            {footerLinks.help.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-rose">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/5 py-5 text-center text-sm text-muted">
        © {new Date().getFullYear()} {brand.name}. אתר דמו — מוכן לחיבור חנות וסליקה.
      </div>
    </footer>
  );
}
