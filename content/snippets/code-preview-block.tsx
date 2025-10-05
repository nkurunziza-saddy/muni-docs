"use client";

import type { ReactElement } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { IsInCodeBlockContext } from "@/lib/hooks/use-in-code";
import { Pre } from "@/mdx-components/pre";

export function CodePreviewBlock({
  children,
}: {
  children: ReactElement<any>[];
}) {
  if (!Array.isArray(children)) return null;

  const previewChild = children[0];
  const codeChild = children[1] as any;

  const props = codeChild?.props?.children?.props ?? codeChild?.props;
  const className = codeChild?.props?.className;
  const isShiki = String(className ?? "").includes("shiki");

  return (
    <TabsPrimitive.Root
      className={cn("not-prose border w-full flex-1 border-input rounded mb-6")}
      defaultValue="preview"
    >
      <TabsPrimitive.TabsList
        className={cn(
          "bg-muted/40 backdrop-blur-3xl border-b flex px-2 sm:px-2"
        )}
        aria-label="Code group"
      >
        <TabsPrimitive.TabsTrigger
          value="preview"
          className={cn(
            "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-2 py-1.5 transition-colors duration-100 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
          )}
        >
          Preview
        </TabsPrimitive.TabsTrigger>
        <TabsPrimitive.TabsTrigger
          value={"code"}
          className={cn(
            "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-2 py-1.5 transition-colors duration-100 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
          )}
        >
          Code
        </TabsPrimitive.TabsTrigger>
      </TabsPrimitive.TabsList>
      <TabsPrimitive.Content value="preview" className="border-0">
        <div className="w-full my-8 p-8 rounded-lg flex justify-center">
          {previewChild}
        </div>
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value={"code"} data-shiki={isShiki}>
        <IsInCodeBlockContext.Provider value={true}>
          <Pre isTabContent className={className} {...(props as any)} />
        </IsInCodeBlockContext.Provider>
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
}
