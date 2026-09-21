import type { Metadata } from "next";
import { ParentEntry } from "@/components/journey/ParentEntry";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "להורים",
  description: "איך להיות שם בשביל הבת בלי לקחת ממנה את העצמאות.",
};

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
