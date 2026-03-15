import type { MDXComponents } from "mdx/types";
import { MDXErrorBoundary } from "@/components/mdx-error-boundary";
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
  ul: function UnorderedList(props) { return <Base.List {...props} ordered={false} /> },
  ol: function OrderedList(props) { return <Base.List {...props} ordered={true} /> },
  li: Base.ListItem,
  table: Base.Table,
  a: Anchor,
  section: Layout.Section,
  pre: Code.Pre,
  code: Code.Code,
  img: function MdxImage(props) {
    return (
      <img
        {...props}
        className={cn("rounded-lg border border-border/40 my-8", props.className)}
        alt={props.alt || ""}
      />
    )
  },

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

  // Utilities
  StepItem: Layout.Step,
  
  // Wrapper for error boundary
  wrapper: function MdxWrapper({ children }) {
    return (
      <MDXErrorBoundary>
        <div className="mdx-wrapper animate-in fade-in duration-500">
          {children}
        </div>
      </MDXErrorBoundary>
    )
  },

  // Custom components (Aliases)
  Info: Layout.InfoBox,
  Warning: function MdxWarning(props) { return <Layout.Callout {...props} type="warning" /> },
  Danger: function MdxDanger(props) { return <Layout.Callout {...props} type="danger" /> },
  Note: function MdxNote(props) { return <Layout.Callout {...props} type="note" /> },
  Tip: function MdxTip(props) { return <Layout.Callout {...props} type="tip" /> },
  Success: function MdxSuccess(props) { return <Layout.Callout {...props} type="success" /> },

  // Space helper
  Space: function MdxSpace({ size = "md", className }: { size?: "sm" | "md" | "lg" | "xl" | "2xl", className?: string }) {
    return (
      <div 
        className={cn(
          size === "sm" && "my-2",
          size === "md" && "my-4",
          size === "lg" && "my-6",
          size === "xl" && "my-8",
          size === "2xl" && "my-12",
          className,
        )}
        data-component="space"
        data-spacing={size}
      />
    )
  },
};

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
