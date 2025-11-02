import { ClassValue } from 'clsx';
import { M as MuniConfig, N as NavigationItem } from './schema-BvqUSQr0.js';
export { H as HeadingLink, T as Theme } from './schema-BvqUSQr0.js';

declare function cn(...inputs: ClassValue[]): string;

/**
 * Load muni.config.ts from the consumer's project root
 * Falls back to default config if not found
 * Uses dynamic import which works with Next.js TypeScript compilation
 */
declare function loadMuniConfigAsync(configPath?: string): Promise<MuniConfig>;
/**
 * Synchronous version that uses cached config or defaults
 * Use this in contexts where async is not possible (like generateStaticParams)
 * Note: For best results, the config should be loaded first with loadMuniConfigAsync
 * in an async context, which will populate the cache.
 */
declare function loadMuniConfig(configPath?: string): MuniConfig;
/**
 * Get the default configuration
 */
declare function getDefaultConfig(): MuniConfig;

/**
 * Get raw content from an MDX file
 * @param slug - The slug of the page (e.g., "getting-started" or "guide/intro")
 * @param contentDir - The content directory (defaults to "content/pages")
 */
declare function getDocsContent(slug: string, contentDir?: string): Promise<string>;
/**
 * Load an MDX page dynamically using Next.js import
 * Note: This is legacy - consumers should use DocsPage component directly
 * @param slug - The slug of the page
 * @param contentDir - The content directory path from project root
 */
declare function loadMDXPage(slug: string, contentDir?: string): Promise<{
    default: any;
    frontmatter: any;
}>;

/**
 * Get all MDX file paths from a directory recursively
 */
declare function getAllMDXFiles(dir: string): string[];
/**
 * Get all document paths from content directory
 * @param contentDir - The content directory (defaults to "content/pages")
 * @returns Array of slugs
 */
declare function getAllDocsPaths(contentDir?: string): string[];
/**
 * Convert file paths to Next.js static params format
 */
declare function pathsToParams(paths: string[]): Array<{
    slug: string[];
}>;

/**
 * Build navigation tree from config
 */
declare function buildNavigationTree(config: MuniConfig): NavigationItem[];
/**
 * Get all slugs from navigation tree recursively
 */
declare function getAllSlugs(items: NavigationItem[] | undefined | null): string[];
/**
 * Flatten navigation tree into a linear array
 */
declare function flattenNavigation(items: NavigationItem[]): NavigationItem[];

/**
 * Find a page in the navigation tree by slug
 */
declare function findPageInNav(items: NavigationItem[], targetSlug: string): NavigationItem | null;
/**
 * Get the parent of a page in navigation
 */
declare function findParentPage(items: NavigationItem[], targetSlug: string, parent?: NavigationItem | null): NavigationItem | null;

interface PrevNextLinks {
    prev: NavigationItem | null;
    next: NavigationItem | null;
}
/**
 * Get previous and next navigation links for a given slug
 */
declare function getPrevNextLinks(slug: string, config: MuniConfig): PrevNextLinks;

interface SearchItem {
    id: string;
    title: string;
    content: string;
    url: string;
    category?: string;
    tags?: string[];
    parentPage?: string;
    sectionType?: "page" | "h2" | "h3" | "h4";
}
interface SearchGeneratorOptions {
    contentDir?: string;
    outputPath?: string;
    baseUrl?: string;
}
/**
 * Generate search data from MDX files
 */
declare function generateSearchData(options?: SearchGeneratorOptions): void;

/**
 * Get Next.js MDX configuration with all plugins
 * Consumer uses this in their next.config.ts with createMDX()
 */
declare function getNextMDXConfig(): any;

export { MuniConfig, NavigationItem, type PrevNextLinks, type SearchGeneratorOptions, type SearchItem, buildNavigationTree, cn, findPageInNav, findParentPage, flattenNavigation, generateSearchData, getAllDocsPaths, getAllMDXFiles, getAllSlugs, getDefaultConfig, getDocsContent, getNextMDXConfig, getPrevNextLinks, loadMDXPage, loadMuniConfig, loadMuniConfigAsync, pathsToParams };
