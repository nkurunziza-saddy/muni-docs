"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import type { ReactNode, ReactElement } from "react";

type TabsItemProps = {
  label: string;
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
      className={cn("not-prose w-full mb-6")}
      defaultValue={defaultValue}
    >
      <TabsPrimitive.List
        className={cn(
          "bg-background backdrop-blur-3xl mb-2 border-b flex px-2"
        )}
      >
        {children.map((child) => {
          const c = child as ReactElement<TabsItemProps>;
          return (
            <TabsPrimitive.Trigger
              key={c.props.value}
              value={c.props.value}
              className={cn(
                "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-2 py-1.5 transition-colors hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground"
              )}
            >
              {c.props.label}
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
            className="p-0 mt-2"
          >
            {c.props.children}
          </TabsPrimitive.Content>
        );
      })}
    </TabsPrimitive.Root>
  );
}

export function TabsItem({ children }: TabsItemProps) {
  return <>{children}</>;
}
