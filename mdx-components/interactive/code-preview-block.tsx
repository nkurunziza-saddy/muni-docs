"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactElement } from "react";
import { IsInCodeBlockContext } from "@/lib/hooks/use-in-code";
import { cn } from "@/lib/utils";
import { Pre } from "../code/pre";

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
  const codeChild = children[1] as ReactElement<{
    className?: string;
    children?: ReactElement;
  }>;

  const props = codeChild?.props?.children?.props ?? codeChild?.props;
  const codeClassName = codeChild?.props?.className;
  const isShiki = String(codeClassName ?? "").includes("shiki");

  return (
    <TabsPrimitive.Root
      className={cn(
        "not-prose border w-full flex-1 border-input rounded-lg mb-6 overflow-hidden",
        className,
      )}
      defaultValue="preview"
      orientation="horizontal"
    >
      <TabsPrimitive.TabsList
        className={cn(
          "bg-muted/40 backdrop-blur-3xl border-b flex px-2 rounded-t-lg",
        )}
        aria-label={ariaLabel}
        role="tablist"
      >
        <TabsPrimitive.TabsTrigger
          value="preview"
          className={cn(
            "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-3 py-2 transition-colors duration-100 hover:text-foreground hover:bg-muted/60 data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none ",
          )}
          aria-selected={true}
          tabIndex={0}
        >
          Preview
        </TabsPrimitive.TabsTrigger>
        <TabsPrimitive.TabsTrigger
          value="code"
          className={cn(
            "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-3 py-2 transition-colors duration-100 hover:text-foreground hover:bg-muted/60 data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none ",
          )}
          aria-selected={false}
          tabIndex={-1}
        >
          Code
        </TabsPrimitive.TabsTrigger>
      </TabsPrimitive.TabsList>
      <TabsPrimitive.Content
        value="preview"
        className="focus:outline-none"
        role="tabpanel"
        aria-labelledby="tab-preview"
        tabIndex={0}
      >
        <div className="w-full p-6 bg-muted/20 rounded-b-lg not-prose">
          {previewChild}
        </div>
      </TabsPrimitive.Content>
      <TabsPrimitive.Content
        value="code"
        data-shiki={isShiki}
        className="focus:outline-none"
        role="tabpanel"
        aria-labelledby="tab-code"
        tabIndex={0}
      >
        <IsInCodeBlockContext.Provider value={true}>
          <Pre isTabContent className={codeClassName} {...props} />
        </IsInCodeBlockContext.Provider>
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
}
