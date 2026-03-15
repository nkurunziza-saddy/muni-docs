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
      // Find all headings within the content area
      const headingElements = Array.from(
        document.querySelectorAll(".mdx-content h2, .mdx-content h3, .mdx-content h4"),
      );

      const headings = headingElements
        .map((heading) => {
          // If ID is missing (shouldn't happen with our Heading component), skip it
          if (!heading.id) return null;
          
          return {
            id: heading.id,
            text: (heading as HTMLElement).innerText || heading.textContent || "",
            level: Number.parseInt(heading.tagName.charAt(1), 10),
          };
        })
        .filter((h): h is TocItem => h !== null && h.text.trim().length > 0);

      setToc(headings);

      // Setup Intersection Observer for active heading tracking
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
            // Sort by top position to find the "current" heading
            const sorted = Array.from(visibleHeadings.keys()).sort((a, b) => {
              const elA = document.getElementById(a);
              const elB = document.getElementById(b);
              if (!elA || !elB) return 0;
              return elA.getBoundingClientRect().top - elB.getBoundingClientRect().top;
            });
            
            if (sorted[0]) setActiveId(sorted[0]);
          }
        },
        {
          rootMargin: "-80px 0% -70% 0%",
          threshold: [0, 1],
        },
      );

      headingElements.forEach((el) => observer.observe(el));
      observerRef.current = observer;
    };

    // Use a small delay to ensure React has finished rendering the MDX content
    const timer = setTimeout(extractHeadings, 300);

    // Also use a MutationObserver to catch late-rendering elements if any
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(timer);
      extractHeadings();
    });

    const contentElement = document.querySelector(".mdx-content");
    if (contentElement) {
      mutationObserver.observe(contentElement, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timer);
      mutationObserver.disconnect();
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]);

  // Scroll active TOC item into view
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
