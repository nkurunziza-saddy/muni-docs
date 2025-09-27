const muniConfig = {
  title: "Muni",
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
      title: "Guide",
      slug: "/guide/index",
      items: [
        { title: "Installation", slug: "guide/installation" },
        { title: "Components", slug: "guide/components" },
        { title: "Code Snippets", slug: "guide/code-snippets" },
        { title: "Code Block", slug: "guide/code-block" },
      ],
    },
    {
      title: "API",
      slug: "/api/index",
      items: [
        { title: "Config", slug: "api/config" },
        { title: "Frontmatter", slug: "api/frontmatter" },
      ],
    },
  ],
};

export default muniConfig;
