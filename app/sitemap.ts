import type { MetadataRoute } from "next";
import muniConfig from "@/muni.config";

interface NavigationItem {
  title: string;
  slug: string;
  items?: NavigationItem[];
}

function getAllSlugs(items: NavigationItem[]): string[] {
  const slugs: string[] = [];
  for (const item of items) {
    slugs.push(item.slug);
    if (item.items) {
      slugs.push(...getAllSlugs(item.items));
    }
  }
  return slugs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const allDocsSlugs = getAllSlugs(muniConfig.navigation);

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
