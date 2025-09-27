"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const pathname = usePathname();
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
  }, [pathname]);

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
    <div className="py-4">
      <h4 className="text-sm pb-3 font-semibold text-foreground">
        On This Page
      </h4>
      <nav className="space-y-2">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(item.id);
            }}
            className={cn(
              "block w-full text-left text-sm transition-colors hover:text-foreground duration-200",
              {
                "pl-2": item.level === 3,
                "pl-4": item.level === 4,
                "pl-6": item.level === 5,
                "pl-8": item.level === 6,
              },
              activeId === item.id
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
