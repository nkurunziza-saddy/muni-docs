import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import muniConfig from "@/muni.config";
import { SearchComp } from "../search-component";
import { Separator } from "@/components/ui/separator";

export function PageHeader() {
  return (
    <header className="border-b border-dashed">
      <div className="container flex h-14 items-center justify-between py-2 px-4 md:px-6 lg:px-8">
        <div className="flex items-center">
          <Link className="cursor-pointer flex items-center font-mono font-bold text-sm uppercase tracking-[0.3em] group/logo" href="/">
            <div className="relative size-4 mr-3 flex items-center justify-center">
              <div className="absolute inset-0 border border-border/40 rotate-45 transition-transform group-hover/logo:rotate-90 duration-500" />
              <div className="absolute inset-0.5 border border-primary/30 group-hover/logo:scale-110 transition-transform duration-500" />
              <div className="size-1 bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
            </div>
            <span className="text-foreground transition-colors group-hover/logo:text-primary">{muniConfig.title?.toLowerCase() ?? "muni"}</span>
            <span className="ml-1 text-primary opacity-50">_</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <SearchComp />
            <div className="hidden md:flex items-center space-x-3 px-3 h-8 border border-dashed bg-muted/30">
              {muniConfig.version && (
                <span className="text-[10px] font-mono font-semibold opacity-70">
                  v{muniConfig.version}
                </span>
              )}

              {muniConfig.version &&
                muniConfig.headingLinks &&
                muniConfig.headingLinks.length > 0 && (
                  <Separator orientation="vertical" className="h-3" />
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
                        className="text-xs hover:underline lowercase"
                      >
                        {link.title.toLowerCase()}
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
