"use client";

import { RiMenuLine } from "@remixicon/react";
import muniConfig from "@/muni.config";
import { SearchComp } from "../search-component";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "../theme-toggle";
import { useIsMobile } from "@/lib/hooks/use-mobile";

export function DocsHeader() {
  const isMobile = useIsMobile();
  const { features, version, headingLinks } = muniConfig;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dashed border-border/40 bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-4 md:gap-8 justify-between w-full">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden opacity-60" />
            <div className="md:hidden flex items-center mr-2">
                <div className="flex items-center font-mono text-primary font-bold">
                    <span className="opacity-40 text-[10px]">[</span>
                    <div className="relative size-1.5 mx-0.5">
                        <div className="absolute inset-0 bg-primary/20 rotate-45" />
                        <div className="absolute inset-0 bg-primary animate-pulse" />
                    </div>
                    <span className="opacity-40 text-[10px]">]</span>
                </div>
            </div>
            {features?.search !== false && <SearchComp />}
          </div>

          <div className="flex items-center gap-6">
            {!isMobile && (
              <div className="flex items-center gap-6">
                {headingLinks && headingLinks.length > 0 && (
                  <nav className="flex items-center gap-8">
                    {headingLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] opacity-50 hover:opacity-100 hover:text-primary transition-all relative group/link"
                      >
                        <span>{link.title.toLowerCase()}</span>
                        <span className="absolute -bottom-4 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
                      </a>
                    ))}
                  </nav>

                )}
                
                {(version || features?.themeToggle !== false) && (
                  <div className="flex items-center gap-4 border-l border-border/40 pl-6 h-8">
                    {version && (
                      <span className="text-[10px] font-mono opacity-40">
                        v{version}
                      </span>
                    )}
                    {features?.themeToggle !== false && <ThemeToggle />}
                  </div>
                )}
              </div>
            )}

            {isMobile && (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon-sm" className="size-9 opacity-60">
                    <RiMenuLine className="size-4" />
                    <span className="sr-only">open menu</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="sr-only">menu</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-6 space-y-6">
                    {version && (
                      <div className="text-[10px] font-mono opacity-40">
                        version {version}
                      </div>
                    )}

                    {headingLinks && headingLinks.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-50">
                          links
                        </div>
                        <div className="flex flex-col gap-2">
                          {headingLinks.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs hover:text-primary transition-colors lowercase"
                            >
                              {link.title.toLowerCase()}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {features?.themeToggle !== false && (
                      <div className="space-y-3">
                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-50">
                          theme
                        </div>
                        <ThemeToggle />
                      </div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
