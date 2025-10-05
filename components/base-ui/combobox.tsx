import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui-components/react/combobox";
import { cn } from "@/lib/utils";
import { Check, X, ChevronDown, Search } from "lucide-react";

function Combobox({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Root>) {
  return <ComboboxPrimitive.Root data-slot="combobox" {...props} />;
}

function ComboboxPortal({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Portal>) {
  return <ComboboxPrimitive.Portal data-slot="combobox-portal" {...props} />;
}

function ComboboxList({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.List>) {
  return <ComboboxPrimitive.List data-slot="combobox-list" {...props} />;
}

function ComboboxItemIndicator({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ItemIndicator>) {
  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      {...props}
    />
  );
}

function ComboboxInput({
  className,
  children,
  showSearchIcon = false,
  hideAddons = false,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Input> & {
  showSearchIcon?: boolean;
  hideAddons?: boolean;
}) {
  return (
    <div className="relative ">
      {showSearchIcon && (
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <ComboboxPrimitive.Input
        className={cn(
          "flex w-full rounded-md border border-input text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
          showSearchIcon && "ml-10",
          "h-10 text-base px-3.5",
          className
        )}
        {...props}
      >
        {children}
      </ComboboxPrimitive.Input>
      {!hideAddons && (
        <div className="absolute right-2 bottom-0 flex h-10 items-center justify-center text-muted-foreground">
          <ComboboxClear />
          <ComboboxTrigger />
        </div>
      )}
    </div>
  );
}

function ComboboxClear({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Clear>) {
  return (
    <ComboboxPrimitive.Clear
      className={cn(
        "flex items-center justify-center rounded bg-transparent p-0 text-muted-foreground hover:text-foreground transition-colors duration-200",
        "h-10 w-6",
        className
      )}
      {...props}
    >
      <X className="size-4" />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxTrigger({
  className,

  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Trigger>) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn(
        "flex items-center justify-center rounded bg-transparent text-muted-foreground hover:text-foreground transition-colors duration-200",
        "h-10 w-6",
        className
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxPositioner({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Positioner>) {
  return (
    <ComboboxPrimitive.Positioner
      className={cn("outline-none", className)}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function ComboboxContent({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Popup>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPositioner>
        <ComboboxPrimitive.Popup
          className={cn(
            "w-[var(--anchor-width)] max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)] origin-[var(--transform-origin)] overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain rounded-md bg-popover text-popover-foreground shadow-lg border outline-none transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
            "text-base",
            className
          )}
          {...props}
        />
      </ComboboxPositioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxItem({
  className,
  children,
  showIndicator = true,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Item> & {
  showIndicator?: boolean;
}) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 outline-none transition-colors duration-150 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "py-2 pr-8 pl-4 text-base",
        className
      )}
      {...props}
    >
      {showIndicator && (
        <ComboboxPrimitive.ItemIndicator className="flex h-4 w-4 items-center justify-center">
          <Check className="h-3 w-3" />
        </ComboboxPrimitive.ItemIndicator>
      )}
      <span className="flex-1 truncate">{children}</span>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxEmpty({
  className,
  children,
}: React.ComponentProps<typeof ComboboxPrimitive.Empty>) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        "text-muted-foreground empty:m-0 empty:p-0",
        "py-2 px-4 text-base",
        className
      )}
    >
      {children}
    </ComboboxPrimitive.Empty>
  );
}

function ComboboxGroup({
  className,
  children,
}: React.ComponentProps<typeof ComboboxPrimitive.Group>) {
  return (
    <ComboboxPrimitive.Group className={cn("py-1.5", className)}>
      {children}
    </ComboboxPrimitive.Group>
  );
}

function ComboboxGroupLabel({
  className,
  children,
}: React.ComponentProps<typeof ComboboxPrimitive.GroupLabel>) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn(
        "text-muted-foreground",
        "px-4 py-2 text-sm font-medium",
        className
      )}
    >
      {children}
    </ComboboxPrimitive.GroupLabel>
  );
}

function ComboboxSeparator({
  className,
}: React.ComponentProps<typeof ComboboxPrimitive.Separator>) {
  return (
    <ComboboxPrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
    />
  );
}

export {
  Combobox,
  ComboboxInput,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxSeparator,
  ComboboxClear,
  ComboboxTrigger,
  ComboboxItemIndicator,
};
