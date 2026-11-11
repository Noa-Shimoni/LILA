import { Education } from "@/components/home/Education";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Products } from "@/components/home/Products";
import { Waitlist } from "@/components/home/Waitlist";
import { WorkshopsIntro } from "@/components/home/WorkshopsIntro";
import { World } from "@/components/home/World";
import { pageSeo } from "@/content/seo";

export const metadata = pageSeo.home;

export default function HomePage() {
  return (
    <>
      <Hero />
      <World />
      <Products />
      <WorkshopsIntro />
      <Education />
      <FinalCta />
      <Waitlist />
    </>
  );
}
