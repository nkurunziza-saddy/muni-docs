"use client";

import { lazy, Suspense, memo } from "react";
import { cn } from "@/lib/utils";

// Lazy load heavy components
const CodePreviewBlock = lazy(() =>
  import("@/mdx-components/interactive/code-preview-block").then((module) => ({
    default: module.CodePreviewBlock,
  }))
);

const CodeGroup = lazy(() =>
  import("@/mdx-components/interactive/code-group").then((module) => ({
    default: module.CodeGroup,
  }))
);

const Steps = lazy(() =>
  import("@/mdx-components/layout/steps").then((module) => ({
    default: module.Steps,
  }))
);

// Loading component
const ComponentLoader = memo(({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-muted rounded-lg p-4 my-4", className)}>
    <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
  </div>
));

ComponentLoader.displayName = "ComponentLoader";

// Wrapper components with error boundaries
export const LazyCodePreviewBlock = memo((props: any) => (
  <Suspense fallback={<ComponentLoader className="h-32" />}>
    <CodePreviewBlock {...props} />
  </Suspense>
));

export const LazyCodeGroup = memo((props: any) => (
  <Suspense fallback={<ComponentLoader className="h-24" />}>
    <CodeGroup {...props} />
  </Suspense>
));

export const LazySteps = memo((props: any) => (
  <Suspense fallback={<ComponentLoader className="h-20" />}>
    <Steps {...props} />
  </Suspense>
));

LazyCodePreviewBlock.displayName = "LazyCodePreviewBlock";
LazyCodeGroup.displayName = "LazyCodeGroup";
LazySteps.displayName = "LazySteps";
