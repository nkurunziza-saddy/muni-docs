"use client";

import { RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarMenuItem } from "../ui/sidebar";

function createDocHref(slug: string): string {
  if (slug === "index") return "/docs";
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
          "block text-xs py-2 px-3 border",
          isActive
            ? "border-border bg-muted text-foreground font-medium"
            : "border-transparent hover:border-border hover:bg-muted/50 text-muted-foreground",
        )}
      >
        {item.title.toLowerCase()}
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
  const pathname = usePathname();
  const hasChildren = item.items && item.items.length > 0;

  if (!hasChildren) {
    const href = createDocHref(item.slug);
    const isActive = pathname === href;

    return (
      <SidebarMenuItem>
        <Link
          href={href}
          className={cn(
            "block text-sm py-2 px-3 border",
            isActive
              ? "border-border bg-muted text-foreground font-medium"
              : "border-transparent hover:border-border hover:bg-muted/50",
          )}
        >
          {item.title.toLowerCase()}
        </Link>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem className="border-b border-border pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
      <div className="space-y-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-between w-full text-xs font-medium py-2 px-3 hover:bg-muted/50 transition-colors"
        >
          <span className="uppercase tracking-widest opacity-70">{item.title.toLowerCase()}</span>
          {isOpen ? (
            <RiArrowDownSLine className="size-3.5" />
          ) : (
            <RiArrowRightSLine className="size-3.5" />
          )}
        </button>

        {isOpen && (
          <ul className="space-y-1 pl-3 border-l border-border/50">
            {item.items?.map((subItem) => (
              <NavLink key={subItem.slug} item={subItem} />
            ))}
          </ul>
        )}
      </div>
    </SidebarMenuItem>
  );
}
