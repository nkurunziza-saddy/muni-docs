"use client";

import type { ReactElement } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import * as PreComponent from "./pre";
import { IsInCodeBlockContext } from "@/lib/hooks/use-in-code";

export function CodeGroup({ children }: { children: ReactElement<any>[] }) {
  if (!Array.isArray(children)) return null;

  const tabs = children.map((child_) => {
    const c = child_ as any;
    const child = c.props?.["data-title"] ? c : c.props?.children;
    const props = (child as any).props;
    const tabTitle = props?.["data-title"] as string;
    return { tabTitle, props };
  });

  return (
    <TabsPrimitive.Root
      className={cn("not-prose border border-input rounded mb-6")}
      defaultValue={tabs[0]?.tabTitle}
    >
      <TabsPrimitive.TabsList
        className={cn(
          "bg-muted/40 backdrop-blur-3xl border-b flex px-2 sm:px-2"
        )}
        aria-label="Code group"
      >
        {tabs.map(({ tabTitle }, i) => (
          <TabsPrimitive.TabsTrigger
            key={tabTitle + i.toString()}
            value={tabTitle}
            className={cn(
              "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-2 py-1.5 transition-colors duration-100 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
            )}
          >
            {tabTitle}
          </TabsPrimitive.TabsTrigger>
        ))}
      </TabsPrimitive.TabsList>

      {tabs.map(({ tabTitle, props }, i) => {
        const isShiki = String(props?.className ?? "").includes("shiki");

        return (
          <IsInCodeBlockContext.Provider key={tabTitle || i} value={true}>
            <TabsPrimitive.Content
              key={tabTitle || i}
              data-shiki={isShiki}
              value={tabTitle}
              className={cn("")}
            >
              <PreComponent.Pre isTabContent {...(props as any)} />
            </TabsPrimitive.Content>
          </IsInCodeBlockContext.Provider>
        );
      })}
    </TabsPrimitive.Root>
  );
}
