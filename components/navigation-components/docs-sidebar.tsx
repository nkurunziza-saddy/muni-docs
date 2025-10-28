"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import muniConfig from "@/muni.config";
import { NavSection } from "./nav-section";
import { useState } from "react";

export function DocsSidebar() {
  const initialOpenState = muniConfig.navigation.reduce((acc, item) => {
    if (item.items && item.items.length > 0) {
      acc[item.slug] = true;
    }
    return acc;
  }, {} as Record<string, boolean>);

  const [openSections, setOpenSections] = useState(initialOpenState);

  const toggleSection = (slug: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="sticky py-0 top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center md:px-6 lg:px-8">
          {muniConfig.title ?? "Muni"}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        <SidebarMenu className="space-y-1">
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
