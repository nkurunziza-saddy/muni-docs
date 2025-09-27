"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowUpDown,
  CornerDownLeft,
  Search,
  SearchIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { type SearchResult, searchService } from "@/lib/search-service";
import { cn } from "@/lib/utils";

interface SearchProps {
  className?: string;
}

export function SearchComp({ className }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();

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
        const searchResults = await searchService.search(query, 8);
        setResults(searchResults);
      } catch (error) {
        console.error("Search failed:", error);
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

  return (
    <div className={cn("w-auto", className)}>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className={cn(
          "h-9 w-40 justify-start rounded-md px-3 text-sm text-muted-foreground sm:w-64",
          className
        )}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-auto hidden sm:flex items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          ⌘K
        </kbd>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 max-w-2xl lg:max-w-3xl top-[10vh] translate-y-0" showCloseButton={false}>
          <DialogTitle className="sr-only">Search Documentation</DialogTitle>
          <div className="flex items-center border-b border-border px-3">
            <Search className="h-5 w-5 text-muted-foreground mr-3" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 py-4 px-1 text-foreground placeholder-muted-foreground bg-inherit dark:bg-inherit border-0 outline-none text-base focus-visible:border-0 focus-visible:ring-0"
            />
            {query && (
              <div className="py-1">
                <Button
                  size={"icon"}
                  onClick={() => setQuery("")}
                  variant={"ghost"}
                >
                  <X className="size-3.5 text-muted-foreground" />
                </Button>
              </div>
            )}
          </div>

          <ScrollArea className="max-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                <span className="ml-3 text-muted-foreground">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    ref={(el) => {
                      resultsRef.current[index] = el;
                    }}
                    onClick={() => handleResultClick(result.url)}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      index === selectedIndex
                        ? "bg-accent border-r-2 border-primary"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-1">
                          {highlightMatch(result.title, query)}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {highlightMatch(
                            result.content.slice(0, 120) +
                              (result.content.length > 120 ? "..." : ""),
                            query
                          )}
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded font-mono">
                            {result.url}
                          </code>
                          {result.category && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {result.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  No results found
                </p>
                <p className="text-muted-foreground/60 text-xs">
                  Try different keywords
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Start typing to search
                </p>
                <p className="text-muted-foreground/60 text-xs">
                  Find docs, guides, and more
                </p>
              </div>
            )}
          </ScrollArea>

          <div className="border-t border-border px-4 py-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ArrowUpDown className="h-3 w-3" />
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" />
                  <span>Select</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted border border-border rounded text-xs">
                  ESC
                </kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
