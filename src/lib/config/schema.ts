export type Theme = "light" | "dark" | "mono" | "mono-dark";

export interface NavigationItem {
  title: string;
  slug: string;
  items?: NavigationItem[];
}

export interface HeadingLink {
  title: string;
  href: string;
}

export interface MuniConfig {
  title: string;
  version?: string;
  defaultTheme?: Theme;
  showFrontmatterMeta?: boolean;
  headingLinks?: HeadingLink[];
  navigation: NavigationItem[];
  githubRepo?: string;
}

export const defaultMuniConfig: MuniConfig = {
  title: "Documentation",
  version: "1.0.0",
  defaultTheme: "light",
  showFrontmatterMeta: true,
  headingLinks: [],
  navigation: [],
};

