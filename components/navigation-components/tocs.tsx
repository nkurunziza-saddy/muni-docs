"use client";

import { cn } from "@/lib/utils";
import { useTableOfContents } from "@/lib/hooks/use-table-of-contents";

export function TableOfContents() {
  const { toc, activeId, handleClick } = useTableOfContents();

  if (toc.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block no-scrollbar w-64 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-l border-border">
      <div className="py-6">
        <h4 className="px-6 text-xs font-semibold uppercase tracking-wide border-b border-border mb-4 pb-3">
          On This Page
        </h4>
        <nav className="px-6">
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
                  className={cn(
                    "text-xs transition-colors block py-1 border-l-2 pl-3 rounded-none",
                    activeId === item.id
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                >
                  <span className="line-clamp-1 text-ellipsis overflow-hidden">
                    {item.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
