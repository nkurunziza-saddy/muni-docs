"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import type { ReactNode, ReactElement } from "react";

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

  const defaultValue = children[0].props.value;

  return (
    <TabsPrimitive.Root
      className={cn("not-prose w-full mb-6 border border-input rounded-lg")}
      defaultValue={defaultValue}
    >
      <TabsPrimitive.List
        className={cn(
          "bg-muted/40 backdrop-blur-3xl border-b flex px-2 rounded-t-lg"
        )}
      >
        {children.map((child) => {
          const c = child as ReactElement<TabsItemProps>;
          return (
            <TabsPrimitive.Trigger
              key={c.props.value}
              value={c.props.value}
              className={cn(
                "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-3 py-2 transition-colors hover:text-foreground hover:bg-muted/60 data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none"
              )}
            >
              {c.props.value}
            </TabsPrimitive.Trigger>
          );
        })}
      </TabsPrimitive.List>

      {children.map((child) => {
        const c = child as ReactElement<TabsItemProps>;
        return (
          <TabsPrimitive.Content
            key={c.props.value}
            value={c.props.value}
            className="p-6 focus:outline-none"
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
  return <div className="prose max-w-none">{children}</div>;
}
