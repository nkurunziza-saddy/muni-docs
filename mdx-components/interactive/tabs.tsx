"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

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
    <TabsPrimitive.Root
      className={cn("not-prose w-full my-6 border border-border/30 rounded-lg shadow-none")}
      defaultValue={defaultValue}
    >
      <TabsPrimitive.List
        className={cn(
          "bg-muted/10 border-b border-border/30 flex px-3"
        )}
      >
        {children.map((child) => {
          const c = child as ReactElement<TabsItemProps>;
          if (!c?.props?.value) return null;
          return (
            <TabsPrimitive.Trigger
              key={c.props.value}
              value={c.props.value}
              className={cn(
                "border-b-2 border-transparent text-muted-foreground/70 text-[11px] font-mono font-semibold uppercase tracking-[0.18em] px-4 py-2.5 transition-all hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none"
              )}
            >
              {c.props.value.toLowerCase()}
            </TabsPrimitive.Trigger>
          );
        })}
      </TabsPrimitive.List>

      {children.map((child) => {
        const c = child as ReactElement<TabsItemProps>;
        if (!c?.props?.value) return null;
        return (
          <TabsPrimitive.Content
            key={c.props.value}
            value={c.props.value}
            className="p-4 focus:outline-none bg-background/50"
            role="tabpanel"
            aria-labelledby={`tab-${c.props.value}`}
            tabIndex={0}
          >
            {c.props.children}
          </TabsPrimitive.Content>
        );
      })}
    </TabsPrimitive.Root>
  );
}

export function TabsItem({ children }: TabsItemProps) {
  return <div className="prose">{children}</div>;
}
