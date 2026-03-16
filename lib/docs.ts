import muniConfig from "@/muni.config";

export interface Frontmatter {
  title?: string;
  description?: string;
  author?: string;
  date?: string;
  category?: string;
  tags?: string[];
}

export interface NavigationItem {
  title: string;
  slug: string;
  items?: NavigationItem[];
}

export function getAllSlugs(items: NavigationItem[] = muniConfig.navigation): string[] {
  const slugs: string[] = [];
  for (const item of items) {
    slugs.push(item.slug);
    if (item.items) {
      slugs.push(...getAllSlugs(item.items));
    }
  }
  return slugs;
}

export function findDocBySlug(slug: string, items: NavigationItem[] = muniConfig.navigation): NavigationItem | null {
  for (const item of items) {
    if (item.slug === slug) return item;
    if (item.items) {
      const found = findDocBySlug(slug, item.items);
      if (found) return found;
    }
  }
  return null;
}

export function flattenNavigation(items: NavigationItem[] = muniConfig.navigation): NavigationItem[] {
  const flattened: NavigationItem[] = [];
  for (const item of items) {
    if (item.items) {
      flattened.push(...flattenNavigation(item.items));
    } else {
      flattened.push(item);
    }
  }
  return flattened;
}
