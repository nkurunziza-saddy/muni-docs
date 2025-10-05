import * as React from "react";
import { cn } from "@/lib/utils";
import { Popover as PopoverPrimitive } from "@base-ui-components/react/popover";
import { ChevronDown, ChevronUp } from "lucide-react";

const Popover = PopoverPrimitive.Root;

function PopoverTrigger({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger className={cn("", className)} {...props} />;
}

function PopoverPositioner({
  align = "center",
  sideOffset = 8,
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Positioner>) {
  return (
    <PopoverPrimitive.Positioner
      align={align}
      sideOffset={sideOffset}
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

function PopoverArrow({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Arrow>) {
  return (
    <PopoverPrimitive.Arrow
      className={cn(
        "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
        className
      )}
      {...props}
    />
  );
}

function PopoverContent({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Popup>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPositioner>
        <PopoverPrimitive.Popup
          className={cn(
            "origin-[var(--transform-origin)] border rounded-md bg-popover text-popover-foreground px-6 py-4 outline-none transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            className
          )}
          {...props}
        />
      </PopoverPositioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverTitle({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Title>) {
  return (
    <PopoverPrimitive.Title
      className={cn("text-base font-medium", className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Description>) {
  return (
    <PopoverPrimitive.Description
      className={cn("text-base text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverPositioner,
  PopoverArrow,
};
