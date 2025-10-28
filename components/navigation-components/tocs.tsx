"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

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
            for (const entry of entries) {
              if (entry.isIntersecting) {
                setActiveId(entry.target.id);
              }
            }
          },
          {
            rootMargin: "0% 0% -80% 0%",
            threshold: 1.0,
          }
        );

        headings.forEach((heading) => {
          const element = document.getElementById(heading.id);
          if (element) observer.observe(element);
        });

        observerRef.current = observer;
      }
    };

    setToc([]);
    setActiveId("");

    const timer = setTimeout(extractHeadings, 300);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

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
