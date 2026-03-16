import type { MDXComponents } from "mdx/types";
import { MDXErrorBoundary } from "@/components/shared/navigation/mdx-error-boundary";
import { cn } from "@/lib/utils";
import { Anchor } from "./anchor";
import * as Base from "./base";
import * as Code from "./code";
import * as Interactive from "./interactive";
import * as Layout from "./layout";

export const mdxComponents: MDXComponents = {
  h1: Base.H1,
  h2: Base.H2,
  h3: Base.H3,
  h4: Base.H4,
  h5: Base.H5,
  h6: Base.H6,
  p: Base.Paragraph,
  ul: (props) => <Base.List {...props} ordered={false} />,
  ol: (props) => <Base.List {...props} ordered={true} />,
  li: Base.ListItem,
  table: Base.Table,
  a: Anchor,
  section: Layout.Section,
  pre: Code.Pre,
  code: Code.Code,
  img: ({ className, alt, ...props }) => (
    <img
      {...props}
      className={cn("rounded-lg border border-border/40 my-8", className)}
      alt={alt || ""}
    />
  ),

  // Layout Components
  Callout: Layout.Callout,
  InfoBox: Layout.InfoBox,
  Steps: Layout.Steps,
  Step: Layout.Step,
  Section: Layout.Section,
  Aside: Layout.Aside,
  Details: Layout.Details,
  Summary: Layout.Summary,
  Command: Layout.Command,

  // Interactive Components
  CodePreviewBlock: Interactive.CodePreviewBlock,
  Tabs: Interactive.Tabs,
  TabsItem: Interactive.TabsItem,

  // Semantic Aliases
  Info: Layout.InfoBox,
  Warning: (props) => <Layout.Callout {...props} type="warning" />,
  Danger: (props) => <Layout.Callout {...props} type="danger" />,
  Note: (props) => <Layout.Callout {...props} type="note" />,
  Tip: (props) => <Layout.Callout {...props} type="tip" />,
  Success: (props) => <Layout.Callout {...props} type="success" />,

  // Space helper
  Space: ({ size = "md", className }: { size?: "sm" | "md" | "lg" | "xl" | "2xl", className?: string }) => {
    const spacingMap = {
      sm: "my-2", md: "my-4", lg: "my-6", xl: "my-8", "2xl": "my-12"
    };
    return (
      <div 
        className={cn(spacingMap[size] || spacingMap.md, className)}
        data-component="space"
        data-spacing={size}
      />
    );
  },

  // Wrapper for error boundary and animation
  wrapper: ({ children }) => (
    <MDXErrorBoundary>
      <div className="mdx-wrapper animate-in fade-in duration-500">
        {children}
      </div>
    </MDXErrorBoundary>
  ),
};

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
