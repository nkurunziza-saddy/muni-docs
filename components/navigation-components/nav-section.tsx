"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function createDocHref(slug: string): string {
  if (slug === "index") {
    return "/docs";
  }
  const cleanSlug = slug.startsWith("/") ? slug.slice(1) : slug;
  return `/docs/${cleanSlug}`;
}

interface NavItem {
  title: string;
  slug: string;
  items?: NavItem[];
}

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const href = createDocHref(item.slug);
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center text-sm rounded-md transition-all duration-200 group",
          isActive
            ? "text-primary"
            : "text-muted-foreground/80 hover:text-foreground/85"
        )}
      >
        <span className="flex-1">{item.title}</span>
      </Link>
    </li>
  );
}

export function NavSection({
  item,
  isOpen,
  onToggle,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasChildren = item.items && item.items.length > 0;

  if (!hasChildren) {
    const pathname = usePathname();
    const href = createDocHref(item.slug);
    const isActive = pathname === href;
    return (
      <SidebarMenuItem className="px-3">
        <Link
          href={href}
          className={cn(
            "text-sm tracking-wider",
            isActive ? "font-semibold text-foreground" : "text-foreground/90"
          )}
        >
          {item.title}
        </Link>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem className="border-b first:border-t first:pt-1.5 last:border-0 pb-3">
      <div className="px-3 space-y-3">
        <div className="w-full flex justify-between gap-4">
          <h3 className="text-sm text-foreground/90 tracking-wider">
            {item.title}
          </h3>
          <button
            onClick={onToggle}
            className="cursor-pointer border-none outline-0 py-0 my-0"
          >
            {isOpen ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        </div>

        {isOpen && (
          <ul className="space-y-1">
            {item.items?.map((subItem) => (
              <NavLink key={subItem.slug} item={subItem} />
            ))}
          </ul>
        )}
      </div>
    </SidebarMenuItem>
  );
}
