import type { Metadata } from "next";
import { Heebo, IBM_Plex_Sans_Hebrew } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { pageSeo } from "@/content/seo";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${sans.variable} ${heading.variable}`}>
      <body className="paper-bg font-sans font-light antialiased">
        <div className="grain min-h-screen">
          <SkipLink />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
