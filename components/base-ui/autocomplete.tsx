import * as React from "react";
import { Autocomplete as AutocompletePrimitive } from "@base-ui-components/react/autocomplete";
import { cn } from "@/lib/utils";
import { Search, X, ChevronDown } from "lucide-react";

const Autocomplete = AutocompletePrimitive.Root;
const AutocompletePortal = AutocompletePrimitive.Portal;
const AutocompleteList = AutocompletePrimitive.List;

function AutocompleteInput({
  className,
  showSearchIcon = false,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Input> & {
  showSearchIcon?: boolean;
}) {
  return (
    <div className="relative">
      {showSearchIcon && (
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <AutocompletePrimitive.Input
        className={cn(
          "flex w-full rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 ",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
          "h-10 text-base px-3.5",
          showSearchIcon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
}

function AutocompleteClear({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Clear>) {
  return (
    <AutocompletePrimitive.Clear
      className={cn(
        "flex items-center justify-center rounded bg-transparent p-0 text-muted-foreground hover:text-foreground transition-colors duration-200",
        "h-10 w-6",
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
    </AutocompletePrimitive.Clear>
  );
}

function AutocompleteTrigger({
  className,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Trigger>) {
  return (
    <AutocompletePrimitive.Trigger
      className={cn(
        "flex items-center justify-center rounded bg-transparent p-0 text-muted-foreground hover:text-foreground transition-colors duration-200",
        "h-10 w-6",
        className
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
    </AutocompletePrimitive.Trigger>
  );
}

function AutocompletePositioner({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Positioner>) {
  return (
    <AutocompletePrimitive.Positioner
      className={cn("outline-none", className)}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function AutocompleteContent({
  className,

  children,
}: React.ComponentProps<typeof AutocompletePrimitive.Popup>) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePositioner>
        <AutocompletePrimitive.Popup
          className={cn(
            "w-[var(--anchor-width)] max-h-[min(var(--available-height),23rem)] max-w-[var(--available-width)] origin-[var(--transform-origin)] overflow-y-auto scroll-pt-2 scroll-pb-2 overscroll-contain rounded-md bg-popover text-popover-foreground text-base shadow-lg border border-border outline-1 transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none",
            className
          )}
        >
          {children}
        </AutocompletePrimitive.Popup>
      </AutocompletePositioner>
    </AutocompletePrimitive.Portal>
  );
}

function AutocompleteItem({
  className,
  children,
  showIndicator = false,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Item> & {
  showIndicator?: boolean;
}) {
  return (
    <AutocompletePrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 outline-none transition-colors duration-150 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "py-2 pr-8 pl-4 text-base",
        className
      )}
      {...props}
    >
      {showIndicator && (
        <div className="flex h-4 w-4 items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-current" />
        </div>
      )}
      <span className="flex-1 truncate">{children}</span>
    </AutocompletePrimitive.Item>
  );
}

function AutocompleteEmpty({
  className,
  children,
}: React.ComponentProps<typeof AutocompletePrimitive.Empty>) {
  return (
    <AutocompletePrimitive.Empty
      className={cn(
        "text-muted-foreground empty:m-0 empty:p-0",
        "py-2 px-4 text-base",
        className
      )}
    >
      {children}
    </AutocompletePrimitive.Empty>
  );
}

function AutocompleteGroup({
  className,
  children,
}: React.ComponentProps<typeof AutocompletePrimitive.Group>) {
  return (
    <AutocompletePrimitive.Group className={cn("py-1.5", className)}>
      {children}
    </AutocompletePrimitive.Group>
  );
}

function AutocompleteGroupLabel({
  className,
  children,
}: React.ComponentProps<typeof AutocompletePrimitive.GroupLabel>) {
  return (
    <AutocompletePrimitive.GroupLabel
      className={cn(
        "text-muted-foreground",
        "px-4 py-2 text-sm font-medium",
        className
      )}
    >
      {children}
    </AutocompletePrimitive.GroupLabel>
  );
}

function AutocompleteSeparator({
  className,
}: React.ComponentProps<typeof AutocompletePrimitive.Separator>) {
  return (
    <AutocompletePrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
    />
  );
}

export {
  Autocomplete,
  AutocompleteInput,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteSeparator,
  AutocompleteEmpty,
  AutocompleteClear,
  AutocompleteTrigger,
};
