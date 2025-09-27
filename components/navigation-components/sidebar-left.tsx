"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import muniConfig from "@/muni.config";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SidebarLeft() {
  const pathname = usePathname();
  return (
    <Sidebar className="bg-sidebar backdrop-blur-sm border-r">
      <SidebarHeader className="h-16 border-b border-border/40 px-6">
        <Link href={"/"} className="my-auto font-semibold text-lg">
          {muniConfig.title ?? "Muni"}
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu className="py-4">
          {muniConfig.navigation.map((item) => {
            const [isOpen, setIsOpen] = useState(true);
            console.log(item.slug);
            const href = `/docs${item.slug === "index" ? "" : item.slug}`;
            const isActive = pathname === href;
            const hasChildren = item.items && item.items.length > 0;

            return (
              <SidebarMenuItem
                key={item.title}
                className="border-b last:border-0 py-2.5"
              >
                <div className={cn("px-3", hasChildren ? "space-y-3" : "")}>
                  <div className="w-full flex justify-between gap-4">
                    <h3 className="text-sm text-foreground/90 tracking-wider">
                      {item.title}
                    </h3>
                    <button
                      onClick={(prev) => setIsOpen(!prev)}
                      className="cursor-pointer border-none outline-0 py-0 my-0"
                    >
                      {hasChildren &&
                        (isOpen ? (
                          <ChevronDown className="size-4" />
                        ) : (
                          <ChevronRight className="size-4" />
                        ))}
                    </button>
                  </div>

                  {isOpen && (
                    <ul className="space-y-1">
                      {hasChildren &&
                        item.items.map((item: any) => (
                          <li key={item.slug}>
                            <Link
                              href={href}
                              className={cn(
                                "flex items-center text-sm  rounded-md transition-all duration-200 group",
                                isActive
                                  ? "text-muted-foreground/80 hover:text-foreground"
                                  : "text-primary"
                              )}
                            >
                              <span className="flex-1">{item.title}</span>
                              {item.hasChildren && (
                                <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                              )}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
