import Link from "next/link";
import { ConsentSettingsButton } from "@/components/analytics/Analytics";
import { waitlistNotifyEmail } from "@/content/site";

export function LandingFooter() {
  return (
    <footer className="border-t border-ink/10 px-5 py-8 text-sm text-muted">
      <div className="mx-auto flex max-w-content flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>LILA · סדנאות, ידע וערכות לקראת הווסת הראשונה.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy" className="min-h-11 inline-flex items-center underline">
            פרטיות
          </Link>
          <a className="inline-flex min-h-11 items-center underline" href={`mailto:${waitlistNotifyEmail}`}>
            {waitlistNotifyEmail}
          </a>
          <ConsentSettingsButton />
        </div>
      </div>
    </footer>
  );
}
