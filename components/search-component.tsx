"use client";

import { RiArrowUpDownLine, RiCornerDownLeftLine, RiSearchLine, RiCloseLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { type SearchResult, searchService } from "@/lib/actions/search-service";
import { cn } from "@/lib/utils";

interface SearchProps {
  className?: string;
}

interface GroupedSearchResult {
  page: SearchResult;
  sections: SearchResult[];
}

function groupSearchResults(results: SearchResult[]): GroupedSearchResult[] {
  const pageMap = new Map<string, GroupedSearchResult>();

  for (const result of results) {
    if (result.sectionType === "page") {
      if (!pageMap.has(result.id)) {
        pageMap.set(result.id, {
          page: result,
          sections: [],
        });
      }
    } else {
      const pageId = result.id.split("/")[0];
      const existingGroup = pageMap.get(pageId);
      if (existingGroup) {
        existingGroup.sections.push(result);
      } else {
        const pageUrl = result.url.split("#")[0];
        const pageResult: SearchResult = {
          id: pageId,
          title: result.parentPage || "Untitled",
          content: "",
          url: pageUrl,
          category: result.category,
          tags: result.tags,
          sectionType: "page",
        };
        pageMap.set(pageId, {
          page: pageResult,
          sections: [result],
        });
      }
    }
  }

  return Array.from(pageMap.values());
}

export function SearchComp({ className }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await searchService.search(query, 15);
        setResults(searchResults);
      } catch (error) {
        console.error("search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleResultClick = (url: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(url);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isMatch = regex.test(part);
      regex.lastIndex = 0;
      return isMatch ? (
        <span key={index} className="text-warning-foreground font-medium">
          {part}
        </span>
      ) : (
        part
      );
    });
  };

  const searchContent = (
    <>
      <div className="flex items-center border-b border-border/40 px-4">
        <RiSearchLine className="size-4 text-muted-foreground mr-3" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-0 focus-visible:ring-0 shadow-none px-0 h-14 text-sm bg-transparent"
        />
        {query && (
          <Button
            size="icon-xs"
            onClick={() => setQuery("")}
            variant="ghost"
          >
            <RiCloseLine />
          </Button>
        )}
      </div>

      <ScrollArea className="max-h-[500px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="animate-spin size-5 border-2 border-primary border-t-transparent rounded-full" />
            <span className="text-xs text-muted-foreground tracking-widest uppercase opacity-70">searching...</span>
          </div>
        ) : results.length > 0 ? (
          <div className="py-2">
            {groupSearchResults(results).map((group) => (
              <div
                key={group.page.id}
                className="border-b border-border/20 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => handleResultClick(group.page.url)}
                  className="w-full text-left px-5 py-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-foreground text-sm">
                      {highlightMatch(group.page.title, query)}
                    </h3>
                    {group.page.category && (
                      <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-primary/10 text-primary uppercase tracking-wider">
                        {group.page.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 opacity-80">
                    {highlightMatch(
                      group.page.content.slice(0, 100) +
                        (group.page.content.length > 100 ? "..." : ""),
                      query
                    )}
                  </p>
                </button>

                {group.sections.length > 0 && (
                  <div className="pl-5 pb-3 pt-1">
                    <div className="text-[9px] text-muted-foreground mb-2 px-2 font-semibold opacity-60 uppercase tracking-widest">
                      {group.sections.length} section{group.sections.length > 1 ? "s" : ""}
                    </div>
                    {group.sections.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleResultClick(section.url)}
                        className="w-full cursor-pointer text-left px-3 py-2.5 hover:bg-muted/30 rounded-md transition-all group flex items-start gap-3"
                      >
                        <div className="w-1 h-1 bg-primary/40 rounded-full flex-shrink-0 mt-2" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground text-xs group-hover:text-primary transition-colors">
                              {highlightMatch(section.title, query)}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-1 opacity-70">
                            {highlightMatch(
                              section.content.slice(0, 80) +
                                (section.content.length > 80 ? "..." : ""),
                              query
                            )}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : query.trim() ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="size-12 bg-muted/50 rounded-full flex items-center justify-center">
              <RiSearchLine className="size-5 text-muted-foreground opacity-50" />
            </div>
            <div className="text-center font-mono uppercase tracking-widest">
                <p className="text-muted-foreground text-[10px] font-bold">no results found</p>
                <p className="text-muted-foreground/60 text-[9px] mt-1">try different keywords</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
             <div className="size-12 bg-muted/50 rounded-full flex items-center justify-center">
              <RiSearchLine className="size-5 text-muted-foreground opacity-50" />
            </div>
            <div className="text-center font-mono uppercase tracking-widest">
                <p className="text-muted-foreground text-[10px] font-bold">start typing to search</p>
                <p className="text-muted-foreground/60 text-[9px] mt-1">find docs, guides, and more</p>
            </div>
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-border/40 px-4 py-3 bg-muted/10">
        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold opacity-60">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <RiArrowUpDownLine className="size-3.5" />
              <span>navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RiCornerDownLeftLine className="size-3.5" />
              <span>select</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-background border border-border/60 text-[9px] font-mono min-w-[2rem] text-center rounded-sm shadow-sm">
              ESC
            </kbd>
            <span>close</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={cn("w-auto", className)}>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        size={isMobile ? "icon-sm" : "sm"}
        className={cn(
          "text-muted-foreground hover:text-primary transition-all h-9 group/search",
          !isMobile && "w-32 sm:w-64 justify-start px-0 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100",
          className
        )}
      >
        <RiSearchLine className="size-4 mr-2 group-hover/search:scale-110 transition-transform" />
        {!isMobile && <span>search docs</span>}
      </Button>

      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>search documentation</DrawerTitle>
            </DrawerHeader>
            {searchContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent
            className="p-0 max-w-2xl top-[10vh] translate-y-0"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">search documentation</DialogTitle>
            {searchContent}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
