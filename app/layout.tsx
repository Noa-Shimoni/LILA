import type { Metadata, Viewport } from "next";
import { Heebo, IBM_Plex_Sans_Hebrew } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { SiteShell } from "@/components/layout/SiteShell";
import { SkipLink } from "@/components/layout/SkipLink";
import { pageSeo } from "@/content/seo";
import { brand, waitlistNotifyEmail } from "@/content/site";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const sans = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const heading = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...pageSeo.home,
  referrer: "origin",
  icons: {
    icon: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = getSiteUrl();
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: brand.description,
    email: waitlistNotifyEmail,
    areaServed: "IL",
  };

  return (
    <html lang="he" dir="rtl" className={`${sans.variable} ${heading.variable}`}>
      <body className="paper-bg font-sans font-normal antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <div className="grain min-h-screen">
          <SkipLink />
          <SiteShell>{children}</SiteShell>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
