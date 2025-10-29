"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactElement } from "react";
import { IsInCodeBlockContext } from "@/lib/hooks/use-in-code";
import { cn } from "@/lib/utils";
import * as PreComponent from "../code/pre";

export interface CodeGroupProps {
  children: ReactElement<{ "data-title"?: string; children?: ReactElement }>[];
  className?: string;
  "aria-label"?: string;
}

export function CodeGroup({
  children,
  className,
  "aria-label": ariaLabel = "Code group",
}: CodeGroupProps) {
  if (!Array.isArray(children)) return null;

  const tabs = children.map((child_) => {
    const c = child_ as ReactElement<{
      "data-title"?: string;
      children?: ReactElement;
    }>;
    const childHasTitle = typeof c.props?.["data-title"] === "string";
    const child = childHasTitle ? c : c.props?.children;
    const props =
      child && typeof child === "object" && "props" in child
        ? (child as any).props
        : {};
    const tabTitle = props?.["data-title"] as string | undefined;
    return { tabTitle, props };
  });

  return (
    <TabsPrimitive.Root
      className={cn(
        "not-prose border border-input rounded-lg mb-6 overflow-hidden",
        className,
      )}
      defaultValue={tabs[0]?.tabTitle}
      orientation="horizontal"
    >
      <TabsPrimitive.TabsList
        className={cn(
          "bg-muted/40 backdrop-blur-3xl border-b flex px-2 rounded-t-lg",
        )}
        aria-label={ariaLabel}
        role="tablist"
      >
        {tabs.map(({ tabTitle }, i) => (
          <TabsPrimitive.TabsTrigger
            key={tabTitle + i.toString()}
            value={tabTitle ?? ""}
            className={cn(
              "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-3 py-2 transition-colors duration-100 hover:text-foreground hover:bg-muted/60 data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none",
            )}
            aria-selected={i === 0}
            tabIndex={i === 0 ? 0 : -1}
          >
            {tabTitle}
          </TabsPrimitive.TabsTrigger>
        ))}
      </TabsPrimitive.TabsList>

      {tabs.map(({ tabTitle, props }, i) => {
        const isShiki = String((props as any)?.className ?? "").includes(
          "shiki",
        );

        return (
          <IsInCodeBlockContext.Provider key={tabTitle || i} value={true}>
            <TabsPrimitive.Content
              key={tabTitle || i}
              data-shiki={isShiki}
              value={tabTitle ?? ""}
              className={cn("focus:outline-none ")}
              role="tabpanel"
              aria-labelledby={`tab-${tabTitle}`}
              tabIndex={0}
            >
              <PreComponent.Pre isTabContent {...props} />
            </TabsPrimitive.Content>
          </IsInCodeBlockContext.Provider>
        );
      })}
    </TabsPrimitive.Root>
  );
}
