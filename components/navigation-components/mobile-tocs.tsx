"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTableOfContents } from "@/lib/hooks/use-table-of-contents";

export function MobileTableOfContents() {
  const [isOpen, setIsOpen] = useState(false);
  const { toc, activeId, handleClick } = useTableOfContents();

  if (toc.length === 0) {
    return null;
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border border-border rounded-none"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors">
        <span>On This Page</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            {toc.map((item) => (
              <li
                key={item.id}
                className={cn({
                  "ml-6": item.level === 3,
                  "ml-8": item.level === 4,
                  "ml-10": item.level === 5,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.id);
                }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm transition-colors block py-1.5 border-l-2 pl-3 rounded-none",
                    activeId === item.id
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
}
