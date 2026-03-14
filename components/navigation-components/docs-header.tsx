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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-4 md:gap-8 justify-between w-full">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <SearchComp />
          </div>

          {/* desktop header links */}
          <div className="hidden md:flex items-center gap-2">
            {muniConfig.version && (
              <span className="text-sm font-semibold">
                v{muniConfig.version}
              </span>
            )}

            {muniConfig.version &&
              muniConfig.headingLinks &&
              muniConfig.headingLinks.length > 0 && (
                <Separator orientation="vertical" className="h-4" />
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

          {/* mobile header links drawer */}
          {isMobile && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="size-11">
                  <RiMenuLine />
                  <span className="sr-only">open menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>menu</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4 space-y-4">
                  {muniConfig.version && (
                    <div className="text-sm font-semibold">
                      version {muniConfig.version}
                    </div>
                  )}

                  {muniConfig.headingLinks &&
                    muniConfig.headingLinks.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          links
                        </div>
                        {muniConfig.headingLinks.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm hover:underline py-1"
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    )}

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">
                      theme
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
    </header>
  );
}
