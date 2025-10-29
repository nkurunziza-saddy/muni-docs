import FlexSearch, { type Index } from "flexsearch";

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
    });
  }

  async initialize() {
    if (this.initialized) return;

    try {
      const response = await fetch("/search-data.json");
      if (!response.ok) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "Could not load search data. Please ensure `search-data.json` is available."
          );
        }
        throw new Error("Failed to load search data");
      }

      const searchData: SearchItem[] = await response.json();

      for (const item of searchData) {
        this.documents.set(item.id, item);

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
    } catch (error) {
      console.error("Failed to initialize search:", error);
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
      console.error("Search error:", error);
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

export const searchService = new SearchService();
