"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="flex items-center justify-between pt-6 ">
      <div className="">
        {previousPage && (
          <Link
            className="flex items-end gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            href={`/docs/${
              previousPage.slug === "index" ? "" : previousPage.slug
            }`}
          >
            <ChevronLeft className="h-4 w-4 mb-1" />
            <div>
              <div className="text-xs">Previous</div>
              <div>{previousPage.title}</div>
            </div>
          </Link>
        )}
      </div>
      <div className="">
        {nextPage && (
          <Link
            className="flex items-end gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            href={`/docs/${nextPage.slug === "index" ? "" : nextPage.slug}`}
          >
            <div>
              <div className="text-xs">Next</div>
              <div>{nextPage.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 mb-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
