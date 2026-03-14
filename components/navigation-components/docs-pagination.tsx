"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import muniConfig from "@/muni.config";

interface NavigationItem {
  title: string;
  slug: string;
  items?: NavigationItem[];
}

function _createDocHref(slug: string): string {
  if (slug === "index") {
    return "/docs";
  }
  const cleanSlug = slug.startsWith("/") ? slug.slice(1) : slug;
  return `/docs/${cleanSlug}`;
}

function flattenNavigation(items: NavigationItem[]): NavigationItem[] {
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

export function DocsPagination() {
  const pathname = usePathname();

  const currentSlug =
    pathname === "/docs" ? "index" : pathname.replace("/docs/", "");

  const allPages = flattenNavigation(muniConfig.navigation);
  const currentIndex = allPages.findIndex((page) => page.slug === currentSlug);

  if (currentIndex === -1) {
    return null;
  }

  const previousPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  if (!previousPage && !nextPage) {
    return null;
  }

  return (
    <div className="flex items-center justify-between pt-6">
      <div>
        {previousPage && (
          <Link
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-all group/prev"
            href={`/docs/${
              previousPage.slug === "index" ? "" : previousPage.slug
            }`}
          >
            <RiArrowLeftSLine className="size-4 group-hover/prev:text-primary transition-colors" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">previous</span>
              <span className="font-medium text-sm group-hover/prev:text-primary transition-colors">{previousPage.title}</span>
            </div>
          </Link>
        )}
      </div>
      <div>
        {nextPage && (
          <Link
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-all text-end group/next"
            href={`/docs/${nextPage.slug === "index" ? "" : nextPage.slug}`}
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">next</span>
              <span className="font-medium text-sm group-hover/next:text-primary transition-colors">{nextPage.title}</span>
            </div>
            <RiArrowRightSLine className="size-4 group-hover/next:text-primary transition-colors" />
          </Link>
        )}
      </div>
    </div>
  );
}
