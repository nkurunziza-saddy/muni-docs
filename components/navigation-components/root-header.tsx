import muniConfig from "@/muni.config";
import { SearchComp } from "../search-component";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";

export function RootHeader() {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 flex h-16 border-b border-border/40 z-50 shrink-0 items-center gap-4 px-6">
      <div className="flex items-center gap-2">
        <Link href="/docs" className="text-lg font-semibold">
          {muniConfig.title}
        </Link>
      </div>

      <div className="flex-grow" />

      <div className="flex items-center gap-4">
        <SearchComp />
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 px-2 py-1 bg-muted/50 rounded-md">
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
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
