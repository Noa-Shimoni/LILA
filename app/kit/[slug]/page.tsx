import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductMark } from "@/components/illustrations/ProductMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { kitItems } from "@/content/kit";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return kitItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = kitItems.find((i) => i.slug === slug);
  return { title: item?.name ?? "פריט בערכה" };
}

export default async function KitItemPage({ params }: Props) {
  const { slug } = await params;
  const item = kitItems.find((i) => i.slug === slug);
  if (!item) notFound();

  return (
    <Container className="py-14">
      <p className="text-sm text-rose">
        <Link href="/kit" className="hover:underline">
          חזרה לערכה
        </Link>
      </p>
      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-[2rem] bg-white/70 p-8 ring-1 ring-ink/5">
          <ProductMark slug={item.slug} className="h-28 w-40" />
        </div>
        <div>
          <h1 className="font-serif text-4xl">{item.name}</h1>
          <p className="mt-4 text-lg text-muted">{item.summary}</p>
          <h2 className="mt-8 text-xl font-medium">איך זה עובד</h2>
          <p className="mt-2 text-muted">{item.how}</p>
          <h2 className="mt-8 text-xl font-medium">במילים פשוטות</h2>
          <p className="mt-2 text-muted">{item.extra}</p>
          <p className="mt-8 text-sm text-muted">
            אין חובה להשתמש בפריט הזה. כל אחת מוצאת מה נוח לה.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/kit">לכל הערכה</Button>
            <Button href="/how-it-works" variant="secondary">
              איך משתמשים
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
