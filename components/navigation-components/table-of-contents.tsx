"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  console.log({ activeId });
  useEffect(() => {
    const extractHeadings = () => {
      const headings = Array.from(
        document.querySelectorAll("h2, h3, h4, h5, h6")
      )
        .filter((heading) => heading.id)
        .map((heading) => ({
          id: heading.id,
          text: heading.textContent || "",
          level: Number.parseInt(heading.tagName.charAt(1)),
        }));

      setToc(headings);

      if (headings.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            const visibleEntries = entries.filter(
              (entry) => entry.isIntersecting
            );
            if (visibleEntries.length > 0) {
              const topEntry = visibleEntries.reduce((top, entry) =>
                entry.boundingClientRect.top < top.boundingClientRect.top
                  ? entry
                  : top
              );
              setActiveId(topEntry.target.id);
            }
          },
          {
            rootMargin: "-20% 0% -35% 0%",
            threshold: [0, 0.25, 0.5, 0.75, 1],
          }
        );

        headings.forEach((heading) => {
          const element = document.getElementById(heading.id);
          if (element) observer.observe(element);
        });

        return () => observer.disconnect();
      }
    };

    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className="py-4">
      <h4 className="text-sm pb-3 font-semibold text-foreground">
        On This Page
      </h4>
      <nav className="space-y-2">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={cn(
              "block w-full text-left text-sm transition-colors hover:text-foreground duration-200",
              item.level === 1 && "font-medium",
              item.level === 2 && "pl-2",
              item.level === 3 && "pl-4",
              item.level === 4 && "pl-6",
              item.level === 5 && "pl-8",
              item.level === 6 && "pl-10",
              activeId === item.id
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
