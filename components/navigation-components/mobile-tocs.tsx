"use client";

import { RiArrowDownSLine, RiCloseLine } from "@remixicon/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTableOfContents } from "@/lib/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";

export function MobileTableOfContents() {
  const [isOpen, setIsOpen] = useState(false);
  const { toc, activeId } = useTableOfContents();

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* trigger button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full justify-between border-dashed text-muted-foreground min-w-0 h-9"
      >
        <span className="text-xs font-semibold truncate uppercase tracking-widest opacity-70">on this page</span>
        <RiArrowDownSLine
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      {/* dropdown positioned directly below trigger */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border shadow-lg animate-in slide-in-from-top-2 duration-200">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <h3 className="text-xs font-semibold uppercase tracking-widest opacity-70">on this page</h3>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setIsOpen(false)}
            >
              <RiCloseLine />
              <span className="sr-only">close</span>
            </Button>
          </div>

          {/* navigation */}
          <nav className="px-4 py-2 max-h-[60vh] overflow-y-auto">
            <ul className="space-y-1">
              {toc.map((item) => (
                <li
                  key={item.id}
                  className={cn({
                    "ml-4": item.level === 3,
                    "ml-6": item.level === 4,
                    "ml-8": item.level === 5,
                  })}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-xs transition-colors block py-2 px-2 border border-transparent",
                      activeId === item.id
                        ? "bg-muted border-border text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.text.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* backdrop for mobile */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="close table of contents"
        />
      )}
    </div>
  );
}
