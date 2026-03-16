"use client";

import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IsTabContentContext } from "@/lib/hooks/use-in-code";
import {
  Tabs as TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

type TabsItemProps = {
  value: string;
  children: ReactNode;
};

export function Tabs({
  children,
}: {
  children: ReactElement<TabsItemProps>[];
}) {
  if (!Array.isArray(children) || !children.length) return null;

  const defaultValue = children[0]?.props?.value;

  return (
    <TabsRoot
      className={cn(
        "not-prose w-full my-8 border border-border/30 rounded-xl overflow-hidden bg-muted/5 shadow-none",
      )}
      defaultValue={defaultValue}
    >
      <TabsList
        variant="line"
        className="bg-muted/10 border-b border-border/30 flex px-2 h-11 gap-0"
      >
        {children.map((child) => {
          const c = child as ReactElement<TabsItemProps>;
          if (!c?.props?.value) return null;
          return (
            <TabsTrigger
              key={c.props.value}
              value={c.props.value}
              className={cn(
                "h-full px-4 py-0 rounded-none border-0",
                "text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-all",
                "data-active:bg-background/40 data-active:text-primary",
                "after:bottom-0 after:h-0.5 after:bg-primary", // indicator position
              )}
            >
              {c.props.value.toLowerCase()}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {children.map((child) => {
        const c = child as ReactElement<TabsItemProps>;
        if (!c?.props?.value) return null;
        return (
          <TabsContent
            key={c.props.value}
            value={c.props.value}
            className="p-6 focus:outline-none bg-transparent"
          >
            <IsTabContentContext.Provider value={true}>
              {c.props.children}
            </IsTabContentContext.Provider>
          </TabsContent>
        );
      })}
    </TabsRoot>
  );
}

export function TabsItem({ children }: TabsItemProps) {
  return <div className="prose dark:prose-invert max-w-none">{children}</div>;
}
