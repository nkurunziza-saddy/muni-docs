"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function useTableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

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
  }, [pathname]); // This is the key - re-run when pathname changes

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

  return {
    toc,
    activeId,
    handleClick,
  };
}
