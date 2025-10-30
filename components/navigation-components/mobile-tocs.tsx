"use client";

import { ChevronDown, X } from "lucide-react";
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
      {/* Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full justify-between border border-dashed text-muted-foreground min-w-0"
      >
        <span className="text-sm font-semibold truncate">On This Page</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      {/* Dropdown positioned directly below trigger */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold">On This Page</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="size-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Navigation */}
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
                      "text-sm transition-colors block py-2 px-2 rounded-md",
                      activeId === item.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close table of contents"
        />
      )}
    </div>
  );
}
