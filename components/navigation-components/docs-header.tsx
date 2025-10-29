"use client";

import muniConfig from "@/muni.config";
import { SearchComp } from "../search-component";
import { ThemeToggle } from "../theme-toggle";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-4 md:gap-8 justify-between w-full">
          <SearchComp />

          <div className="flex items-center gap-2">
            {muniConfig.version && (
              <span className="text-sm font-semibold">
                v{muniConfig.version}
              </span>
            )}

            {muniConfig.version &&
              muniConfig.headingLinks &&
              muniConfig.headingLinks.length > 0 && (
                <div className="h-4 w-px bg-border/60" />
              )}

            {muniConfig.headingLinks && muniConfig.headingLinks.length > 0 && (
              <div className="flex items-center space-x-3">
                {muniConfig.headingLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                  >
                    {link.title}
                  </a>
                ))}
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
