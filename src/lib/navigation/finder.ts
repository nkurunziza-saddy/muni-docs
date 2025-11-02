import type { NavigationItem } from "../config/schema";

/**
 * Find a page in the navigation tree by slug
 */
export function findPageInNav(
  items: NavigationItem[],
  targetSlug: string,
): NavigationItem | null {
  for (const item of items) {
    if (item.slug === targetSlug) return item;
    if (item.items) {
      const found = findPageInNav(item.items, targetSlug);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Get the parent of a page in navigation
 */
export function findParentPage(
  items: NavigationItem[],
  targetSlug: string,
  parent: NavigationItem | null = null,
): NavigationItem | null {
  for (const item of items) {
    if (item.slug === targetSlug) return parent;
    if (item.items) {
      const found = findParentPage(item.items, targetSlug, item);
      if (found) return found;
    }
  }
  return null;
}

