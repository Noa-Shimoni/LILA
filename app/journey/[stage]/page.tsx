import { notFound, redirect } from "next/navigation";
import { JourneyExperience } from "@/components/journey/JourneyExperience";
import { Container } from "@/components/ui/Section";
import { pageSeo } from "@/content/seo";
import { isJourneyStageId, stageDetails } from "@/content/journey";

type Props = { params: Promise<{ stage: string }> };

export function generateStaticParams() {
  return [...Object.keys(stageDetails), "bra"].map((stage) => ({ stage }));
}

export async function generateMetadata({ params }: Props) {
  const { stage } = await params;
  if (stage === "bra") {
    return pageSeo.journeyStage.changes;
  }
  if (stage in pageSeo.journeyStage) {
    return pageSeo.journeyStage[stage as keyof typeof pageSeo.journeyStage];
  }
  return pageSeo.journey;
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
