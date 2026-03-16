import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";
import muniConfig from "@/muni.config";
import { SearchComp } from "./search-component";
import { Separator } from "@/components/ui/separator";

export function PageHeader() {
  return (
    <header className="border-b border-dashed">
      <div className="container flex h-14 items-center justify-between py-2 px-4 md:px-6 lg:px-8">
        <div className="flex items-center">
          <Link className="cursor-pointer flex items-center group/logo select-none" href="/">
            <div className="flex items-center font-mono text-primary font-bold">
                <span className="opacity-40">[</span>
                <div className="relative size-2 mx-1">
                    <div className="absolute inset-0 bg-primary/20 rotate-45" />
                    <div className="absolute inset-0.5 bg-primary animate-pulse" />
                </div>
                <span className="opacity-40">]</span>
            </div>
            <div className="flex flex-col ml-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-foreground leading-none">
                    {muniConfig.title?.toLowerCase() ?? "muni"}
                </span>
            </div>
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
