const muniConfig = {
  title: "Muni",
  version: "1.0.0",
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
      title: "Project Structure",
      slug: "project-structure",
    },
    {
      title: "Guides",
      slug: "guide/index",
      items: [
        { title: "Writing Content", slug: "guide/writing-content" },
        { title: "Advanced Code Blocks", slug: "guide/code-blocks" },
        { title: "Using Components", slug: "guide/using-components" },
        { title: "Creating Plugins", slug: "guide/creating-plugins" },
      ],
    },
    {
      title: "API Reference",
      slug: "api/index",
      items: [
        { title: "Configuration", slug: "api/configuration" },
        { title: "Frontmatter", slug: "api/frontmatter" },
        { title: "Built-in Components", slug: "api/built-in-components" },
      ],
    },
  ],
};

export default muniConfig;
