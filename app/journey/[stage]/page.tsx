import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JourneyExperience } from "@/components/journey/JourneyExperience";
import { Container } from "@/components/ui/Section";
import { isJourneyStageId, stageDetails } from "@/content/journey";

type Props = { params: Promise<{ stage: string }> };

export function generateStaticParams() {
  return [...Object.keys(stageDetails), "bra"].map((stage) => ({ stage }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stage } = await params;
  if (stage === "bra") {
    return { title: "להכיר את הגוף" };
  }
  if (!isJourneyStageId(stage)) {
    return { title: "מסע ההתבגרות" };
  }
  return { title: stageDetails[stage].nowTitle };
}

export default async function JourneyStagePage({ params }: Props) {
  const { stage } = await params;
  if (stage === "bra") {
    redirect("/journey/changes");
  }
  if (!isJourneyStageId(stage)) {
    notFound();
  }

  return (
    <Container className="py-12 sm:py-16">
      <JourneyExperience stageId={stage} />
    </Container>
  );
}
