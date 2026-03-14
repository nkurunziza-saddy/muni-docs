"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
    const extractHeadings = () => {
      const headingElements = Array.from(
        document.querySelectorAll(".mdx-content h2, .mdx-content h3, .mdx-content h4"),
      );

      const headings = headingElements
        .filter((heading) => heading.id)
        .map((heading) => ({
          id: heading.id,
          text: (heading as HTMLElement).innerText || heading.textContent || "",
          level: Number.parseInt(heading.tagName.charAt(1), 10),
        }));

      setToc(headings);

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const visibleHeadings = new Map<string, number>();

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visibleHeadings.set(entry.target.id, entry.intersectionRatio);
            } else {
              visibleHeadings.delete(entry.target.id);
            }
          }

          if (visibleHeadings.size > 0) {
            const sorted = Array.from(visibleHeadings.keys()).sort((a, b) => {
              const elA = document.getElementById(a);
              const elB = document.getElementById(b);
              if (!elA || !elB) return 0;
              return elA.getBoundingClientRect().top - elB.getBoundingClientRect().top;
            });
            
            setActiveId(sorted[0]);
          }
        },
        {
          rootMargin: "-60px 0% -70% 0%",
          threshold: [0, 1],
        },
      );

      headingElements.forEach((el) => observer.observe(el));
      observerRef.current = observer;
    };

    const timer = setTimeout(() => {
      extractHeadings();
      
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "instant" });
          setActiveId(id);
        }
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (activeId) {
      const tocElement = document.getElementById(`toc-${activeId}`);
      const tocContainer = document.getElementById("toc-container");
      
      if (tocElement && tocContainer) {
        const containerRect = tocContainer.getBoundingClientRect();
        const elementRect = tocElement.getBoundingClientRect();
        
        if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
          tocElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }
    }
  }, [activeId]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return {
    toc,
    activeId,
    handleClick,
  };
}
