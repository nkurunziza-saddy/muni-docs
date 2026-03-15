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
          "flex items-center gap-2 py-1.5 px-3 transition-all duration-200 group/nav ui-nav-link",
          isActive
            ? "ui-nav-link-active text-primary"
            : "",
        )}
      >
        <span
          className={cn(
            "ui-nav-bullet",
            isActive
              ? "bg-primary"
              : "opacity-0 group-hover/nav:opacity-60",
          )}
        />
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
            "flex items-center gap-2 py-2 px-3 transition-all duration-200 group/nav ui-nav-link",
            isActive
              ? "ui-nav-link-active text-primary"
              : "",
          )}
        >
          <span
            className={cn(
              "ui-nav-bullet",
              isActive
                ? "bg-primary"
                : "opacity-0 group-hover/nav:opacity-60",
            )}
          />
          {item.title.toLowerCase()}
        </Link>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem className="pb-8 mb-8 border-b border-border/10 last:border-0 last:pb-0 last:mb-0">
      <div className="space-y-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-between w-full py-2 px-3 hover:bg-muted/30 transition-all group/section ui-section-title"
        >
          <span className="opacity-60 group-hover/section:opacity-100 group-hover/section:text-primary transition-all">
            {item.title.toLowerCase()}
          </span>
          <div className="flex items-center gap-2">
            <div className="h-px w-4 bg-border/20 group-hover/section:w-6 group-hover/section:bg-primary/40 transition-all" />
            {isOpen ? (
                <RiArrowDownSLine className="size-3.5 opacity-30 group-hover/section:text-primary group-hover/section:opacity-100" />
            ) : (
                <RiArrowRightSLine className="size-3.5 opacity-30 group-hover/section:text-primary group-hover/section:opacity-100" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="relative ml-3 mt-1">
            <div className="absolute left-0 top-0 bottom-3 w-px bg-border/10" />
            
            <ul className="space-y-1 relative z-10">
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
