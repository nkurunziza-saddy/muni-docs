import FlexSearch, { Index } from "flexsearch";

export interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
  category?: string;
  tags?: string[];
}

export interface SearchResult extends SearchItem {
  score?: number;
}

class SearchService {
  private index: Index;
  private documents: Map<string, SearchItem> = new Map();
  private initialized = false;

  constructor() {
    this.index = new FlexSearch.Index({
      tokenize: "forward",
      cache: 100,
      resolution: 9,
      //todo: find out why these don't exist
      //   optimize: true,
      //   worker: false,
      //   async: false,
    });
  }

  async initialize() {
    if (this.initialized) return;

    try {
      let searchData: SearchItem[];

      if (process.env.NODE_ENV === "production") {
        // In production, load from generated file
        const response = await fetch("/search-data.json");
        if (!response.ok) throw new Error("Failed to load search data");
        searchData = await response.json();
      } else {
        // In development, generate on the fly
        try {
          const { generateSearchData } = await import(
            "../scripts/generate-search-data"
          );
          generateSearchData();
          const response = await fetch("/search-data.json");
          if (!response.ok) throw new Error("Failed to load search data");
          searchData = await response.json();
        } catch (error) {
          console.warn(
            "[v0] Could not generate search data in development:",
            error
          );
          searchData = [];
        }
      }

      // Index all documents
      for (const item of searchData) {
        this.documents.set(item.id, item);

        // Create searchable text combining title, content, and tags
        const searchableText = [
          item.title,
          item.content,
          item.category,
          ...(item.tags || []),
        ]
          .filter(Boolean)
          .join(" ");

        this.index.add(item.id, searchableText);
      }

      this.initialized = true;
      console.log(
        `[v0] Search index initialized with ${searchData.length} documents`
      );
    } catch (error) {
      console.error("[v0] Failed to initialize search:", error);
    }
  }

  async search(query: string, limit = 10): Promise<SearchResult[]> {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!query.trim()) return [];

    try {
      const results = this.index.search(query, { limit });

      return results
        .map((id) => this.documents.get(id as string))
        .filter((item): item is SearchItem => item !== undefined)
        .slice(0, limit);
    } catch (error) {
      console.error("[v0] Search error:", error);
      return [];
    }
  }

  getDocument(id: string): SearchItem | undefined {
    return this.documents.get(id);
  }

  getAllDocuments(): SearchItem[] {
    return Array.from(this.documents.values());
  }
}

// Singleton instance
export const searchService = new SearchService();
