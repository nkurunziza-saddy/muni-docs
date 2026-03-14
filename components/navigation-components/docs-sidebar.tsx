"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import muniConfig from "@/muni.config";
import { NavSection } from "./nav-section";

export function DocsSidebar() {
  const initialOpenState = muniConfig.navigation.reduce(
    (acc, item) => {
      if (item.items && item.items.length > 0) {
        acc[item.slug] = true;
      }
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const [openSections, setOpenSections] = useState(initialOpenState);

  const toggleSection = (slug: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <Sidebar className="border-r border-border/40 bg-background">
      <SidebarHeader className="sticky py-0 top-0 z-50 w-full bg-background border-b border-border/5">
        <div className="flex h-14 items-center px-6 lg:px-8 group/logo select-none">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center font-mono text-primary font-bold">
                <span className="opacity-40">[</span>
                <div className="relative size-2 mx-1">
                    <div className="absolute inset-0 bg-primary/20 rotate-45" />
                    <div className="absolute inset-0.5 bg-primary animate-pulse" />
                </div>
                <span className="opacity-40">]</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-foreground leading-none">
                    {muniConfig.title?.toLowerCase() ?? "muni"}
                </span>
                <span className="text-[9px] font-mono opacity-30 uppercase tracking-[0.1em] mt-1">docs_engine.v1</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        <SidebarMenu className="space-y-1.5">
          {muniConfig.navigation.map((item, i) => (
            <NavSection
              key={item.slug + i.toString()}
              item={item}
              isOpen={!!openSections[item.slug]}
              onToggle={() => toggleSection(item.slug)}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
