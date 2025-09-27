import type { NextConfig } from "next";

import createMDX from "@next/mdx";

// Essential remark plugins
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

// Essential rehype plugins
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";

// Shiki transformers
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRemoveNotationEscape,
} from "@shikijs/transformers";

import { transformerNotationInclude } from "./lib/plugins/transformers/transformer-include";
import { transformerTitle } from "./lib/plugins/transformers/transformer-title";
import path from "path";
import { remarkCode } from "./lib/plugins/remark/code";
import { remarkCodeGroup } from "./lib/plugins/remark/code-group";
import { remarkCallout } from "./lib/plugins/remark/callout";
import { remarkSteps } from "./lib/plugins/remark/steps";
import { remarkSubheading } from "./lib/plugins/remark/subheading";
import { remarkFilename } from "./lib/plugins/remark/filename";
import { remarkStrongBlock } from "./lib/plugins/remark/strong-block";
import { transformerLineNumbers } from "./lib/plugins/transformers/transformer-line-numbers";
import { transformerTagline } from "./lib/plugins/transformers/transformer-tagline";
import { rehypeInlineShiki } from "./lib/plugins/rehype/inline-shiki";
import { rehypeShikiDisplayNotation } from "./lib/plugins/rehype/display-shiki-notation";
import { rehypePreLineNumbers } from "./lib/plugins/rehype/rehype-pre-line-numbers";
import { remarkSpace } from "./lib/plugins/remark/space";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Other Next.js config options
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkDirective,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      // Custom
      remarkCode,
      remarkCodeGroup,
      remarkCallout,
      remarkSteps,
      remarkSubheading,
      remarkFilename,
      remarkSpace,
      remarkStrongBlock,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: () => [
            {
              type: "element",
              tagName: "div",
              properties: { "data-autolink-icon": true },
              children: [],
            },
          ],
        },
      ],
      [
        rehypeShiki,
        {
          themes: {
            dark: "vitesse-dark",
            light: "vitesse-light",
          },
          defaultColor: "light",
          transformers: [
            transformerRemoveNotationEscape(),
            transformerNotationDiff({ matchAlgorithm: "v3" }),
            transformerNotationFocus({ matchAlgorithm: "v3" }),
            transformerNotationHighlight({ matchAlgorithm: "v3" }),
            transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
            transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
            // Custom
            transformerNotationInclude({
              rootDir: path.resolve(
                __dirname,
                process.env.MUNI_DOCS_ROOT || "."
              ),
            }),
            transformerLineNumbers(),
            transformerTitle(),
            transformerTagline(),
          ].filter(Boolean),
        },
      ],
      [
        rehypeInlineShiki,
        {
          themes: {
            dark: "vitesse-dark",
            light: "vitesse-light",
          },
          defaultColor: "light",
        },
      ],
      rehypeShikiDisplayNotation,
      rehypePreLineNumbers,
    ],
  },
});

export default withMDX(nextConfig);
