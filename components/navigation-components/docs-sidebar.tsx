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
    <Sidebar className="border-r-0 bg-muted/20">
      <SidebarHeader className="sticky py-0 top-0 z-50 w-full bg-transparent">
        <div className="flex h-14 items-center px-4 md:px-6 lg:px-8 font-mono font-bold text-[11px] uppercase tracking-[0.3em] group/logo">
          <div className="relative size-4 mr-3 flex items-center justify-center">
            <div className="absolute inset-0 border border-border/40 rotate-45 transition-transform group-hover/logo:rotate-90 duration-500" />
            <div className="absolute inset-0.5 border border-primary/30 group-hover/logo:scale-110 transition-transform duration-500" />
            <div className="size-1 bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
          </div>
          <span className="text-foreground transition-colors group-hover/logo:text-primary">{muniConfig.title?.toLowerCase() ?? "muni"}</span>
          <span className="ml-1 text-primary opacity-50">_</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-6">
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
