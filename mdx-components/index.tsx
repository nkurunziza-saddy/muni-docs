import type { MDXComponents } from "mdx/types";

// Base components
import * as Base from "./base";
// Interactive components
import * as Interactive from "./interactive";
// Layout components
import * as Layout from "./layout";
// Code components
import * as Code from "./code";

import { Anchor } from "./anchor";
import { cn } from "@/lib/utils";
import { MDXErrorBoundary } from "@/components/mdx-error-boundary";
import { Step } from "@/components/muni-components/step";

const mdxComponents: MDXComponents = {
  // Layout components
  Callout: (props) => (
    <MDXErrorBoundary>
      <Layout.Callout {...props} />
    </MDXErrorBoundary>
  ),
  Steps: (props) => (
    <MDXErrorBoundary>
      <Layout.Steps {...props} />
    </MDXErrorBoundary>
  ),
  Step: (props) => (
    <MDXErrorBoundary>
      <Step {...props} />
    </MDXErrorBoundary>
  ),
  InfoBox: (props) => (
    <MDXErrorBoundary>
      <Layout.InfoBox {...props} />
    </MDXErrorBoundary>
  ),
  Aside: Layout.Aside,
  Details: Layout.Details,
  Summary: Layout.Summary,
  Section: Layout.Section,
  Header: Layout.Header,
  Div: Layout.Div,

  // Interactive components
  CodeGroup: (props) => (
    <MDXErrorBoundary>
      <Interactive.CodeGroup {...props} />
    </MDXErrorBoundary>
  ),
  CodePreviewBlock: (props) => (
    <MDXErrorBoundary>
      <Interactive.CodePreviewBlock {...props} />
    </MDXErrorBoundary>
  ),
  Tabs: Interactive.Tabs,
  TabsItem: Interactive.TabsItem,

  // Code components
  CodeBlock: Code.CodeBlock,
  CodeTitle: Code.CodeTitle,
  Figure: Code.Figure,
  Figcaption: Code.Figcaption,

  // Base HTML elements
  a: Anchor as React.ComponentType<
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  >,
  aside: Layout.Aside,
  blockquote: Base.Blockquote,
  code: Code.Code,
  details: Layout.Details,
  div: Layout.Div,
  pre: Code.Pre,
  header: Layout.Header,
  figcaption: Code.Figcaption,
  figure: Code.Figure,
  h1: Base.H1,
  h2: Base.H2,
  h3: Base.H3,
  h4: Base.H4,
  h5: Base.H5,
  h6: Base.H6,
  hr: Base.HorizontalRule,
  kbd: Base.Kbd,
  li: Base.ListItem,
  ol: (props) => <Base.List ordered {...props} />,
  p: Base.Paragraph,
  section: Layout.Section,
  span: Base.Span,
  strong: Base.Strong,
  summary: Layout.Summary,
  table: Base.Table,
  td: Base.TableCell,
  th: Base.TableHeader,
  tr: Base.TableRow,
  ul: (props) => <Base.List ordered={false} {...props} />,

  // Custom components
  Space: ({
    size = "md",
    className,
  }: {
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    className?: string;
  }) => (
    <div
      className={cn(
        "block",
        size === "sm" && "my-2",
        size === "md" && "my-64",
        size === "lg" && "my-6",
        size === "xl" && "my-8",
        size === "2xl" && "my-12",
        className
      )}
      data-component="space"
      data-spacing={size}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
