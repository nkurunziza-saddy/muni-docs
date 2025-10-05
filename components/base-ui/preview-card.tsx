import * as React from "react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui-components/react/preview-card";
import { cn } from "@/lib/utils";

function PreviewCard({
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Root>) {
  return <PreviewCardPrimitive.Root data-slot="preview-card" {...props} />;
}

function PreviewCardPositioner({
  className,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Positioner>) {
  return (
    <PreviewCardPrimitive.Positioner
      data-slot="preview-card-trigger"
      sideOffset={sideOffset}
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

function PreviewCardArrow({
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Arrow>) {
  return (
    <PreviewCardPrimitive.Arrow data-slot="preview-card-trigger" {...props} />
  );
}
function PreviewCardTrigger({
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Trigger>) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />
  );
}

function PreviewCardContent({
  className,
  ...props
}: React.ComponentProps<typeof PreviewCardPrimitive.Popup>) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPositioner>
        <PreviewCardPrimitive.Popup
          className={cn(
            "flex bg-popover text-popover-foreground z-50 w-64 origin-[var(--transform-origin)] flex-col gap-2 outline transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 rounded-md border p-4 shadow-md outline-none",
            className
          )}
          {...props}
        />
      </PreviewCardPositioner>
    </PreviewCardPrimitive.Portal>
  );
}

export {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardContent,
  PreviewCardArrow,
};
