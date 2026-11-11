import { notFound } from "next/navigation";
import { Character } from "@/components/illustrations/Characters";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Waitlist } from "@/components/home/Waitlist";
import { WorkshopLeadForm } from "@/components/workshops/WorkshopLeadForm";
import { getCampaign, liveCampaigns } from "@/content/campaigns";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return liveCampaigns().map((campaign) => ({ slug: campaign.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign || campaign.status !== "live") {
    return {};
  }

  return {
    ...pageMeta(campaign.seoTitle, campaign.seoDescription, "/workshops"),
    robots: { index: false, follow: false },
  };
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign || campaign.status !== "live") {
    notFound();
  }

  return (
    <article>
      <section className="pb-6 pt-8 sm:pt-12">
        <Container className="grid max-w-5xl items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
          <p className="text-sm font-medium text-rose">{campaign.eyebrow}</p>
          <h1 className="mt-3 text-balance font-serif text-4xl font-medium leading-snug sm:text-5xl">
            {campaign.headline}
          </h1>
          <p className="mt-4 text-lg text-muted">{campaign.lead}</p>
          <div className="mt-8">
            <Button href="#register" trackId={`lp-${campaign.slug}`} className="w-full sm:w-auto">
              {campaign.cta}
            </Button>
          </div>
          </div>
          {campaign.form === "workshop" ? (
            <Character name="together" className="mx-auto h-64 w-auto sm:h-80" />
          ) : null}
        </Container>
      </section>
      <section className="py-8">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2">
            {campaign.benefits.map((benefit) => (
              <li key={benefit.title} className="rounded-[1.5rem] bg-white/75 p-5 ring-1 ring-ink/10">
                <h2 className="font-serif text-2xl">{benefit.title}</h2>
                <p className="mt-2 text-muted">{benefit.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section id="register" className="scroll-mt-24 py-8 pb-16">
        <Container className="max-w-xl">
          {campaign.form === "workshop" ? (
            <WorkshopLeadForm source={`lp-${campaign.slug}`} />
          ) : (
            <Waitlist />
          )}
        </Container>
      </section>
    </article>
  );
}
