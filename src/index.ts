// Utilities
export { cn } from "../lib/utils";

// Note: useMDXComponents is exported from 'nkurunziza-docs/components'
// to avoid pulling in Next.js dependencies when importing config/utilities

// Config System
export { loadMuniConfig, loadMuniConfigAsync, getDefaultConfig } from "./lib/config/loader";
export type { MuniConfig, NavigationItem, HeadingLink, Theme } from "./lib/config/schema";

// Content Loader
export { getDocsContent, loadMDXPage } from "./lib/content/loader";
export { getAllDocsPaths, getAllMDXFiles, pathsToParams } from "./lib/content/paths";

// Navigation
export { buildNavigationTree, getAllSlugs, flattenNavigation } from "./lib/navigation/tree";
export { findPageInNav, findParentPage } from "./lib/navigation/finder";
export { getPrevNextLinks } from "./lib/navigation/links";
export type { PrevNextLinks } from "./lib/navigation/links";

// Search
export { generateSearchData } from "./lib/search/generator";
export type { SearchItem, SearchGeneratorOptions } from "./lib/search/generator";

// MDX Processing
export { getNextMDXConfig } from "./lib/mdx/get-next-config";

// Note: DocsPage and related components are exported from 'nkurunziza-docs/components'
// to avoid pulling in Next.js dependencies when importing config/utilities

