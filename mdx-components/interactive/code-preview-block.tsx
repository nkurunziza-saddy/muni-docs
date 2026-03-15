"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactElement } from "react";
import { IsInCodeBlockContext, IsTabContentContext } from "@/lib/hooks/use-in-code";
import { cn } from "@/lib/utils";

export interface CodePreviewBlockProps {
  children: ReactElement<{ className?: string; children?: ReactElement }>[];
  className?: string;
  "aria-label"?: string;
}

export function CodePreviewBlock({
  children,
  className,
  "aria-label": ariaLabel = "Code preview",
}: CodePreviewBlockProps) {
  if (!Array.isArray(children)) return null;

  const previewChild = children[0];
  const codeChild = children[1];

  return (
    <TabsPrimitive.Root
      className={cn(
        "not-prose w-full my-8 border border-border/30 rounded-xl overflow-hidden shadow-none",
        className,
      )}
      defaultValue="preview"
      orientation="horizontal"
    >
      <TabsPrimitive.List
        className={cn(
          "bg-muted/10 border-b border-border/30 flex px-3"
        )}
        aria-label={ariaLabel}
        role="tablist"
      >
        <TabsPrimitive.Trigger
          value="preview"
          className={cn(
            "border-b-2 border-transparent text-muted-foreground/70 text-[11px] font-mono font-semibold uppercase tracking-[0.18em] px-4 py-2.5 transition-all hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none"
          )}
        >
          Preview
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger
          value="code"
          className={cn(
            "border-b-2 border-transparent text-muted-foreground/70 text-[11px] font-mono font-semibold uppercase tracking-[0.18em] px-4 py-2.5 transition-all hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none"
          )}
        >
          Code
        </TabsPrimitive.Trigger>
      </TabsPrimitive.List>
      <TabsPrimitive.Content
        value="preview"
        className="p-6 focus:outline-none bg-background/50 flex justify-center"
        role="tabpanel"
        tabIndex={0}
      >
        <div className="w-full max-w-full overflow-auto">
          {previewChild}
        </div>
      </TabsPrimitive.Content>
      <TabsPrimitive.Content
        value="code"
        className="focus:outline-none !m-0 bg-[#121212]"
        role="tabpanel"
        tabIndex={0}
      >
        <IsInCodeBlockContext.Provider value={true}>
          <IsTabContentContext.Provider value={true}>
            {codeChild}
          </IsTabContentContext.Provider>
        </IsInCodeBlockContext.Provider>
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
}
