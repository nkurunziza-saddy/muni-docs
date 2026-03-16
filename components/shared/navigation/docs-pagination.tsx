"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import muniConfig from "@/muni.config";
import { flattenNavigation } from "@/lib/docs";

export function DocsPagination() {
  const pathname = usePathname();
  const currentSlug = pathname === "/docs" ? "index" : pathname.replace("/docs/", "");

  const allPages = flattenNavigation(muniConfig.navigation);
  const currentIndex = allPages.findIndex((page) => page.slug === currentSlug);

  if (currentIndex === -1) return null;

  const previousPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  if (!previousPage && !nextPage) return null;

  const getHref = (slug: string) => `/docs/${slug === "index" ? "" : slug}`;

  return (
    <div className="flex items-center justify-between pt-6">
      <div>
        {previousPage && (
          <Link
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-all group/prev"
            href={getHref(previousPage.slug)}
          >
            <RiArrowLeftSLine className="size-4 group-hover/prev:text-primary transition-colors" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">previous</span>
              <span className="font-medium text-sm group-hover/prev:text-primary transition-colors">
                {previousPage.title.toLowerCase()}
              </span>
            </div>
          </Link>
        )}
      </div>
      <div>
        {nextPage && (
          <Link
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-all text-end group/next"
            href={getHref(nextPage.slug)}
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">next</span>
              <span className="font-medium text-sm group-hover/next:text-primary transition-colors">
                {nextPage.title.toLowerCase()}
              </span>
            </div>
            <RiArrowRightSLine className="size-4 group-hover/next:text-primary transition-colors" />
          </Link>
        )}
      </div>
    </div>
  );
}
