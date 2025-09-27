"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import muniConfig from "@/muni.config";
import Link from "next/link";
import React, { useState } from "react";
import { NavSection } from "./nav-section";

export function SidebarLeft() {
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
    <Sidebar className="bg-sidebar backdrop-blur-sm border-r">
      <SidebarHeader className="h-16 border-b border-border/40 px-6">
        <Link href={"/"} className="my-auto font-semibold text-lg">
          {muniConfig.title ?? "Muni"}
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu className="py-4 flex flex-col gap-2.5">
          {muniConfig.navigation.map((item) => (
            <NavSection
              key={item.slug}
              item={item}
              isOpen={!!openSections[item.slug]}
              onToggle={() => toggleSection(item.slug)}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
