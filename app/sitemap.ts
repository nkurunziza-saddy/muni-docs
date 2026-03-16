import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const allDocsSlugs = getAllSlugs();

  const docPages = allDocsSlugs.map((slug) => ({
    url: `${siteUrl}/docs/${slug === "index" ? "" : slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...docPages,
  ];
}
