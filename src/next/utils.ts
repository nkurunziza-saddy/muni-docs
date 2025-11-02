import type { MuniConfig, NavigationItem } from "../config";

/**
 * Get all slugs from navigation configuration
 */
export function getAllSlugs(items: NavigationItem[]): string[] {
  const slugs: string[] = [];

  for (const item of items) {
    slugs.push(item.slug);
    if (item.items) {
      slugs.push(...getAllSlugs(item.items));
    }
  }

  return slugs;
}

/**
 * Generate static params for Next.js pages
 */
export function generateStaticParams(
  navigation: NavigationItem[]
): Array<{ slug: string[] }> {
  const allSlugs = getAllSlugs(navigation);

  return allSlugs.map((slug) => ({
    slug: slug === "index" ? [] : slug.split("/"),
  }));
}

/**
 * Find a navigation item by slug
 */
export function findPage(
  items: NavigationItem[],
  targetSlug: string
): NavigationItem | null {
  for (const item of items) {
    if (item.slug === targetSlug) return item;
    if (item.items) {
      const found = findPage(item.items, targetSlug);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Generate metadata for a page
 */
export function generatePageMetadata(
  slug: string,
  config: MuniConfig
): {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
  };
} {
  const currentPage = findPage(config.navigation, slug);

  const pageTitle = currentPage
    ? `${currentPage.title} | ${config.title}`
    : config.title;
  const pageDescription = `Documentation for ${currentPage?.title || config.title}`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

