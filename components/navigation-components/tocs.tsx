"use client";

import { useTableOfContents } from "@/lib/hooks/use-table-of-contents";
import { cn } from "@/lib/utils";
import muniConfig from "@/muni.config";
export function TableOfContents() {
  const { toc, activeId, handleClick } = useTableOfContents();

  if (muniConfig.features?.toc === false) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-64 shrink-0 relative">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] py-12 flex flex-col">
        <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-8 opacity-20 select-none">
          index
        </h4>

        {toc.length > 0 && (
          <div className="relative flex-1 overflow-hidden group/toc">
            <nav
              id="toc-container"
              className="h-full max-h-[80vh] overflow-y-auto no-scrollbar overscroll-contain border-l border-border/10 relative pl-4"
            >
              <ul className="space-y-4 py-1">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    id={`toc-${item.id}`}
                    className={cn("transition-all duration-300", {
                      "pl-0": item.level === 2,
                      "pl-2": item.level === 3,
                      "pl-4": item.level === 4,
                    })}
                  >
                    <button
                      type="button"
                      onClick={() => handleClick(item.id)}
                      className={cn(
                        "w-full text-left text-[11px] font-mono transition-all duration-300 outline-none uppercase tracking-wide cursor-pointer",
                        activeId === item.id
                          ? "text-foreground font-bold opacity-100"
                          : "text-muted-foreground opacity-40 hover:opacity-100",
                      )}
                    >
                      <span className="line-clamp-2 leading-relaxed">
                        {item.text.toLowerCase()}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none opacity-80" />
          </div>
        )}
      </div>
    </aside>
  );
}
