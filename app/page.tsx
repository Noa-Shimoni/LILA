import { FinalCta } from "@/components/home/FinalCta";
import { GirlQuestions } from "@/components/home/GirlQuestions";
import { Hero } from "@/components/home/Hero";
import { How } from "@/components/home/How";
import { KitPreview } from "@/components/home/KitPreview";
import { Mothers } from "@/components/home/Mothers";
import { Positioning } from "@/components/home/Positioning";
import { ShopFaq } from "@/components/home/ShopFaq";
import { Timeline } from "@/components/home/Timeline";
import { Waitlist } from "@/components/home/Waitlist";
import { Why } from "@/components/home/Why";
import { pageSeo } from "@/content/seo";

export const metadata = pageSeo.home;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Why />
      <KitPreview />
      <How />
      <Timeline />
      <GirlQuestions />
      <Mothers />
      <Positioning />
      <ShopFaq />
      <Waitlist />
      <FinalCta />
    </>
  );
}
