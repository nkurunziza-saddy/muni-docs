export type Theme = "light" | "dark" | "system";

export interface NavigationItem {
  title: string;
  slug: string;
  items?: NavigationItem[];
}

export interface HeadingLink {
  title: string;
  href: string;
}

export interface FeaturesConfig {
  search?: boolean;
  themeToggle?: boolean;
  toc?: boolean;
}

export interface SEOConfig {
  description?: string;
  openGraph?: {
    image?: string;
    twitterHandle?: string;
  };
}

export interface MuniConfig {
  title: string;
  version?: string;
  defaultTheme?: Theme;
  showFrontmatterMeta?: boolean;
  headingLinks?: HeadingLink[];
  navigation: NavigationItem[];
  githubRepo?: string;
  features?: FeaturesConfig;
  seo?: SEOConfig;
}

const muniConfig: MuniConfig = {
  title: "muni",
  version: "1.0.0",
  defaultTheme: "system",
  showFrontmatterMeta: true,
  features: {
    search: true,
    themeToggle: true,
    toc: true,
  },
  seo: {
    description: "A minimal documentation template built with Next.js 15, TypeScript, and Tailwind CSS 4.",
    openGraph: {
      twitterHandle: "@nk_saddy"
    }
  },
  headingLinks: [
    { title: "github", href: "https://github.com/nkurunziza-saddy/muni-docs" },
    { title: "twitter", href: "https://twitter.com/nk_saddy" },
  ],
  navigation: [
    {
      title: "introduction",
      slug: "index",
    },
    {
      title: "getting started",
      slug: "getting-started",
    },
    {
      title: "configuration",
      slug: "configuration",
    },
    {
      title: "themes",
      slug: "themes",
    },
    {
      title: "markdown",
      slug: "markdown",
    },
    {
      title: "components showcase",
      slug: "components-showcase",
    },
    {
      title: "deployment",
      slug: "deployment",
    },
    {
      title: "project structure",
      slug: "project-structure",
    },
  ],
  githubRepo: "https://github.com/nkurunziza-saddy/muni-docs",
};

export default muniConfig;
