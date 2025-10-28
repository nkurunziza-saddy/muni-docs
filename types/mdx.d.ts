import type { ReactNode } from "react";

// Custom directive types
export interface CalloutProps {
  children: ReactNode;
  type: "note" | "info" | "warning" | "danger" | "tip" | "success";
  title?: string;
  className?: string;
}

export interface CodeGroupProps {
  children: ReactNode[];
  className?: string;
}

export interface CodePreviewBlockProps {
  children: ReactNode[];
  className?: string;
}

export interface StepsProps {
  children: ReactNode[];
  className?: string;
}

export interface SpaceProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

// Extend MDX components
declare module "mdx/types" {
  interface MDXComponents {
    // Layout components
    Callout: React.ComponentType<CalloutProps>;
    Steps: React.ComponentType<StepsProps>;
    Aside: React.ComponentType<{ children: ReactNode; className?: string }>;
    Details: React.ComponentType<{ children: ReactNode; className?: string }>;
    Summary: React.ComponentType<{ children: ReactNode; className?: string }>;
    Section: React.ComponentType<{ children: ReactNode; className?: string }>;
    Header: React.ComponentType<{ children: ReactNode; className?: string }>;
    Div: React.ComponentType<{ children: ReactNode; className?: string }>;

    // Interactive components
    CodeGroup: React.ComponentType<CodeGroupProps>;
    CodePreviewBlock: React.ComponentType<CodePreviewBlockProps>;
    Tabs: React.ComponentType<{ children: ReactNode; className?: string }>;
    TabsItem: React.ComponentType<{ children: ReactNode; className?: string }>;

    // Code components
    CodeBlock: React.ComponentType<{ children: ReactNode; className?: string }>;
    CodeTitle: React.ComponentType<{ children: ReactNode; className?: string }>;
    Figure: React.ComponentType<{ children: ReactNode; className?: string }>;
    Figcaption: React.ComponentType<{
      children: ReactNode;
      className?: string;
    }>;

    // Custom components
    Space: React.ComponentType<SpaceProps>;
  }
}

// Custom directive syntax
declare global {
  namespace JSX {
    interface IntrinsicElements {
      callout: CalloutProps;
      "code-group": CodeGroupProps;
      "code-preview-block": CodePreviewBlockProps;
      steps: StepsProps;
      space: SpaceProps;
    }
  }
}
