import { ParentEntry } from "@/components/journey/ParentEntry";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

import { pageSeo } from "@/content/seo";

export const metadata = pageSeo.parents;

export default function ParentsPage() {
  return (
    <Container className="max-w-2xl py-12 sm:py-16">
      <ParentEntry />
      <p className="mt-10">
        <Button href="/mothers" variant="ghost" className="px-0">
          למדריך הארוך יותר לאמהות
        </Button>
      </p>
    </Container>
  );
}
