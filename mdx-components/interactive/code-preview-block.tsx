"use client";

import type { ReactElement } from "react";
import { IsInCodeBlockContext, IsTabContentContext } from "@/lib/hooks/use-in-code";
import { cn } from "@/lib/utils";
import { 
  Tabs as TabsRoot, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";

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
    <TabsRoot
      className={cn(
        "not-prose w-full my-8 border border-border/30 rounded-xl overflow-hidden shadow-none",
        className,
      )}
      defaultValue="preview"
    >
      <TabsList
        className={cn(
          "bg-muted/10 border-b border-border/30 flex px-2 h-auto"
        )}
        aria-label={ariaLabel}
      >
        <TabsTrigger
          value="preview"
          className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-3 data-active:bg-background/50 data-active:border-b-2 data-active:border-primary"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] px-4 py-3 data-active:bg-background/50 data-active:border-b-2 data-active:border-primary"
        >
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="p-6 focus:outline-none bg-background/30 flex justify-center"
      >
        <div className="w-full max-w-full overflow-auto">
          {previewChild}
        </div>
      </TabsContent>
      <TabsContent
        value="code"
        className="focus:outline-none !m-0 bg-[#121212]"
      >
        <IsInCodeBlockContext.Provider value={true}>
          <IsTabContentContext.Provider value={true}>
            {codeChild}
          </IsTabContentContext.Provider>
        </IsInCodeBlockContext.Provider>
      </TabsContent>
    </TabsRoot>
  );
}
