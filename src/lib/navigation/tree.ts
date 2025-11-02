import type { MuniConfig, NavigationItem } from "../config/schema";

/**
 * Build navigation tree from config
 */
export function buildNavigationTree(config: MuniConfig): NavigationItem[] {
  return config.navigation;
}

/**
 * Get all slugs from navigation tree recursively
 */
export function getAllSlugs(items: NavigationItem[] | undefined | null): string[] {
  if (!items || !Array.isArray(items)) {
    return [];
  }

  const slugs: string[] = [];

  for (const item of items) {
    if (item?.slug) {
      slugs.push(item.slug);
    }
    if (item?.items && Array.isArray(item.items)) {
      slugs.push(...getAllSlugs(item.items));
    }
  }

  return slugs;
}

/**
 * Flatten navigation tree into a linear array
 */
export function flattenNavigation(items: NavigationItem[]): NavigationItem[] {
  const flat: NavigationItem[] = [];

  for (const item of items) {
    flat.push(item);
    if (item.items) {
      flat.push(...flattenNavigation(item.items));
    }
  }

  return flat;
}

