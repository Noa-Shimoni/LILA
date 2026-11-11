"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LandingHeader } from "@/components/layout/LandingHeader";
import { LandingFooter } from "@/components/layout/LandingFooter";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const landing = pathname.startsWith("/lp/");

  return (
    <>
      {landing ? <LandingHeader /> : <Header />}
      <main id="main">{children}</main>
      {landing ? <LandingFooter /> : <Footer />}
    </>
  );
}
