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
          "block text-xs font-mono py-1.5 px-3 transition-all duration-200",
          isActive
            ? "bg-foreground text-background font-bold"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
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
            "block text-sm font-mono py-2 px-3 transition-all duration-200",
            isActive
              ? "bg-foreground text-background font-bold"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          )}
        >
          {item.title.toLowerCase()}
        </Link>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem className="pb-6 mb-6 border-b border-border/20 last:border-0 last:pb-0 last:mb-0">
      <div className="space-y-1">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-between w-full text-[11px] font-mono font-bold py-2 px-3 hover:bg-muted/30 transition-colors uppercase tracking-[0.2em] group/section"
        >
          <span className="opacity-50 group-hover/section:opacity-100 group-hover/section:text-primary transition-all">{item.title.toLowerCase()}</span>
          {isOpen ? (
            <RiArrowDownSLine className="size-3.5 opacity-40 group-hover/section:text-primary group-hover/section:opacity-100" />
          ) : (
            <RiArrowRightSLine className="size-3.5 opacity-40 group-hover/section:text-primary group-hover/section:opacity-100" />
          )}
        </button>

        {isOpen && (
          <div className="relative ml-3">
            {/* vertical connection line */}
            <div className="absolute left-0 top-0 bottom-2 w-px bg-border/20" />
            
            <ul className="space-y-0.5 relative z-10">
              {item.items?.map((subItem) => (
                <NavLink key={subItem.slug} item={subItem} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </SidebarMenuItem>
  );
}
