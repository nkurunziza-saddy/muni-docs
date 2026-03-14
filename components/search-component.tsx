"use client";

import {
  RiArrowUpDownLine,
  RiCornerDownLeftLine,
  RiSearchLine,
  RiCloseLine,
} from "@remixicon/react";
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
      "gi",
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
      <div className="flex items-center border-b border-border/20 px-6 py-2 bg-muted/5">
        <div className="flex items-center gap-2 mr-4 opacity-40">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest">cmd</span>
            <span className="text-[10px] font-mono opacity-50">&gt;</span>
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="query documentation index..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-0 focus-visible:ring-0 shadow-none px-0 h-14 text-lg bg-transparent! font-sans tracking-tight"
        />
        <div className="flex items-center gap-4">
          {query && (
            <Button 
              size="icon-xs" 
              onClick={() => setQuery("")} 
              variant="ghost"
              className="opacity-30 hover:opacity-100 transition-opacity"
            >
              <RiCloseLine className="size-4" />
            </Button>
          )}
          <div className="hidden sm:flex items-center gap-2 px-2 py-1 border border-border/20 bg-background/50">
            <span className="text-[9px] font-mono opacity-40 uppercase tracking-[0.2em] font-bold">exit</span>
            <kbd className="text-[9px] font-mono opacity-60">ESC</kbd>
          </div>
        </div>
      </div>

      <ScrollArea className="max-h-[70vh]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="relative size-8">
                <div className="absolute inset-0 border border-primary/10 animate-[spin_4s_linear_infinite]" />
                <div className="absolute inset-1.5 border-t border-primary/40 animate-[spin_1.5s_ease-in-out_infinite]" />
                <div className="absolute inset-3 bg-primary/20 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground tracking-[0.4em] uppercase opacity-40">
              parsing_index
            </span>
          </div>
        ) : results.length > 0 ? (
          <div className="py-6">
            {groupSearchResults(results).map((group) => (
              <div
                key={group.page.id}
                className="mb-8 last:mb-0"
              >
                <div className="px-6 mb-2">
                    <button
                    type="button"
                    onClick={() => handleResultClick(group.page.url)}
                    className="w-full text-left group/page relative flex flex-col"
                    >
                        <div className="flex items-center gap-4">
                            <h3 className="font-bold text-foreground text-base tracking-tighter group-hover/page:text-primary transition-colors flex items-center">
                                <span className="opacity-20 mr-3 text-xs font-mono font-normal">#</span>
                                {highlightMatch(group.page.title, query)}
                            </h3>
                            <div className="h-px flex-1 bg-border/5" />
                            {group.page.category && (
                            <span className="text-[9px] font-mono font-bold text-primary/40 uppercase tracking-[0.3em] border border-primary/10 px-2 py-0.5 bg-primary/5">
                                {group.page.category}
                            </span>
                            )}
                        </div>
                        <div className="pl-7 mt-1">
                            <p className="text-sm text-muted-foreground line-clamp-1 opacity-60 leading-relaxed">
                                {highlightMatch(
                                group.page.content.slice(0, 180) +
                                    (group.page.content.length > 180 ? "..." : ""),
                                query,
                                )}
                            </p>
                        </div>
                    </button>
                </div>

                {group.sections.length > 0 && (
                  <div className="px-6 grid grid-cols-1 gap-1">
                    {group.sections.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleResultClick(section.url)}
                        className="w-full cursor-pointer text-left px-4 py-3 hover:bg-muted/30 transition-all group flex items-start gap-4 border-l-2 border-border/10 hover:border-primary ml-7 relative"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground text-xs uppercase tracking-wide group-hover:text-primary transition-colors">
                              {highlightMatch(section.title, query)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-1 opacity-50 font-mono italic">
                            {highlightMatch(
                              section.content.slice(0, 120) +
                                (section.content.length > 120 ? "..." : ""),
                              query,
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                            <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">go</span>
                            <RiCornerDownLeftLine className="size-3.5 text-primary" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : query.trim() ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="size-14 border border-border/10 flex items-center justify-center relative">
                <div className="absolute inset-0 border border-primary/5 opacity-20" />
                <RiSearchLine className="size-6 text-muted-foreground opacity-20" />
            </div>
            <div className="text-center font-mono uppercase tracking-[0.3em]">
              <p className="text-muted-foreground text-[10px] font-bold">
                0_results_found
              </p>
              <p className="text-muted-foreground/30 text-[9px] mt-2">
                check syntax and retry
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div className="size-14 border border-border/10 flex items-center justify-center relative">
                <div className="absolute inset-0 border border-primary/5 opacity-20" />
                <RiSearchLine className="size-6 text-muted-foreground opacity-20" />
            </div>
            <div className="text-center font-mono uppercase tracking-[0.3em]">
              <p className="text-muted-foreground text-[10px] font-bold">
                index_ready
              </p>
              <p className="text-muted-foreground/30 text-[9px] mt-2">
                awaiting_input_stream
              </p>
            </div>
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-border/20 px-6 py-4 bg-muted/10 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] font-bold opacity-40">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="size-1 bg-border/40" />
              <span>navigate</span>
              <span className="opacity-30 ml-1">[&uarr;&darr;]</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-1 bg-border/40" />
              <span>select</span>
              <span className="opacity-30 ml-1">[enter]</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
                <span className="text-[9px] opacity-50">engine::v1.0.0</span>
                <div className="size-1.5 bg-primary/40 rounded-full animate-pulse" />
            </div>
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
          !isMobile &&
            "w-32 sm:w-64 justify-start px-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100",
          className,
        )}
      >
        <RiSearchLine className="size-4 mr-2 group-hover/search:scale-110 transition-transform" />
        {!isMobile && <span>search docs</span>}
      </Button>

      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="max-h-[80vh] rounded-none">
            <DrawerHeader>
              <DrawerTitle className="sr-only">search documentation</DrawerTitle>
            </DrawerHeader>
            {searchContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent
            className="p-0 max-w-5xl top-[10vh] translate-y-0 rounded-none border-border/20 shadow-2xl bg-background/95 backdrop-blur-xl"
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
