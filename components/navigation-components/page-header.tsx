import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { SearchComp } from "../search-component";
import muniConfig from "@/muni.config";

export function PageHeader() {
  return (
    <header className="border-b border-dashed">
      <div className="cpx container flex h-14 items-center justify-between py-2">
        <div className="flex items-center">
          <Link className="cursor-pointer rounded-md p-2" href="/">
            <span className="">Site</span>
          </Link>
        </div>

        <div className="-mr-2 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <SearchComp />
            <div className="flex items-center space-x-3 px-2 h-8 border border-dashed bg-muted/90 rounded-md">
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

              {muniConfig.headingLinks &&
                muniConfig.headingLinks.length > 0 && (
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
                  </div>
                )}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
