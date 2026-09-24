import type { Metadata } from "next";

const OG_IMAGE = "/full-kit.png";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export function pageMeta(
  title: string,
  description: string,
  path?: string,
): Metadata {
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      locale: "he_IL",
      type: "website",
      siteName: "LILA",
      ...(path ? { url: path } : {}),
      images: [{ url: OG_IMAGE, alt: "ערכת ההיכרות של LILA" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    ...(path ? { alternates: { canonical: path } } : {}),
  };
}
