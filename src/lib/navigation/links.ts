import type { MuniConfig, NavigationItem } from "../config/schema";
import { flattenNavigation } from "./tree";

export interface PrevNextLinks {
  prev: NavigationItem | null;
  next: NavigationItem | null;
}

/**
 * Get previous and next navigation links for a given slug
 */
export function getPrevNextLinks(
  slug: string,
  config: MuniConfig,
): PrevNextLinks {
  const flatNav = flattenNavigation(config.navigation);
  const currentIndex = flatNav.findIndex((item) => item.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? flatNav[currentIndex - 1] : null,
    next: currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null,
  };
}

