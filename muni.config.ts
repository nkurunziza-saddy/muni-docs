export type Theme = "minimal" | "minimal-dark" | "mono";

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

const muniConfig: MuniConfig = {
  title: "Muni",
  version: "1.0.0",
  defaultTheme: "minimal",
  showFrontmatterMeta: true,
  headingLinks: [
    { title: "GitHub", href: "https://github.com/nkurunziza-saddy/muni-docs" },
    { title: "Twitter", href: "https://twitter.com/nk_saddy" },
  ],
  navigation: [
    {
      title: "Introduction",
      slug: "index",
    },
    {
      title: "Getting Started",
      slug: "getting-started",
    },
    {
      title: "Configuration",
      slug: "configuration",
    },
    {
      title: "Themes",
      slug: "themes",
    },
    {
      title: "Markdown",
      slug: "markdown",
    },
    {
      title: "Components Showcase",
      slug: "components-showcase",
    },
    {
      title: "Tabs Test",
      slug: "tabs-test",
    },
    {
      title: "Deployment",
      slug: "deployment",
    },
    {
      title: "Project Structure",
      slug: "project-structure",
    },
  ],
  githubRepo: "https://github.com/nkurunziza-saddy/muni-docs",
};

export default muniConfig;
