import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "@base-ui-components/react/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

function Collapsible({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      className={cn("flex min-h-36 w-56 flex-col justify-center", className)}
      {...props}
    />
  );
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn(
        "group flex items-center gap-2 rounded-sm bg-primary-foreground px-2 py-1 text-sm font-medium hover:bg-primary-foreground/80 focus-visible:ring-2 focus-visible:ring-ring active:bg-primary-foreground/70",
        className
      )}
      {...props}
    >
      <ChevronRight className="size-3 transition-all ease-out group-data-[panel-open]:rotate-90" />
      {children}
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsiblePanel({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Panel>) {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        "flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden text-sm transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
        className
      )}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsiblePanel };
