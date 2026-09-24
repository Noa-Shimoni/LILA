import type { MetadataRoute } from "next";
import { kitItems } from "@/content/kit";
import { stageDetails } from "@/content/journey";
import { getSiteUrl } from "@/lib/seo";

const staticPaths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] =
  [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/kit", changeFrequency: "weekly", priority: 0.9 },
    { path: "/journey", changeFrequency: "weekly", priority: 0.9 },
    { path: "/guide", changeFrequency: "monthly", priority: 0.9 },
    { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
    { path: "/mothers", changeFrequency: "monthly", priority: 0.8 },
    { path: "/parents", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/shipping", changeFrequency: "yearly", priority: 0.4 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const pages = staticPaths.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const kitPages = kitItems.map((item) => ({
    url: `${base}/kit/${item.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const journeyPages = Object.keys(stageDetails).map((stage) => ({
    url: `${base}/journey/${stage}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...kitPages, ...journeyPages];
}
