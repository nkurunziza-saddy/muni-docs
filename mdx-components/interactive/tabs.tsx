"use client";

import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IsTabContentContext } from "@/lib/hooks/use-in-code";
import { 
  Tabs as TabsRoot, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
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
      className={cn("not-prose w-full my-8 border border-border/30 rounded-xl overflow-hidden shadow-none bg-muted/5")}
      defaultValue={defaultValue}
    >
      <TabsList className="bg-muted/10 border-b border-border/30 flex px-2 h-auto">
        {children.map((child) => {
          const c = child as ReactElement<TabsItemProps>;
          if (!c?.props?.value) return null;
          return (
            <TabsTrigger
              key={c.props.value}
              value={c.props.value}
              className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-3 data-active:bg-background/50 data-active:border-b-2 data-active:border-primary"
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
            className="p-6 focus:outline-none bg-background/30"
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
