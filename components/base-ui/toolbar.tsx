import * as React from "react";
import { cn } from "@/lib/utils";
import { Toolbar as ToolbarPrimitive } from "@base-ui-components/react/toolbar";
import { Toggle as TogglePrimitive } from "@base-ui-components/react/toggle";
import { Select as SelectPrimitive } from "@base-ui-components/react/select";
import { buttonVariants } from "./button";
import { toggleVariants } from "./toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const Toolbar = ToolbarPrimitive.Root;

function ToolbarButton({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Button>) {
  return (
    <ToolbarPrimitive.Button
      className={buttonVariants({
        variant: "ghost",
      })}
      {...props}
    />
  );
}

function ToolbarToggleButton({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive>) {
  return <TogglePrimitive className={toggleVariants()} {...props} />;
}

function ToolbarGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Group>) {
  return (
    <ToolbarPrimitive.Group
      className={cn("flex gap-1", className)}
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Separator>) {
  return (
    <ToolbarPrimitive.Separator
      className={cn("m-1 h-4 w-px bg-border", className)}
      {...props}
    />
  );
}

function ToolbarLink({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Link>) {
  return (
    <ToolbarPrimitive.Link
      className={cn(
        "mr-[0.875rem] ml-auto flex-none self-center text-sm text-muted-foreground no-underline hover:text-primary",
        className
      )}
      {...props}
    />
  );
}

function ToolbarSelect({
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-[180px] bg-none border-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}

function ToolbarSelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return <SelectItem {...props} />;
}

export {
  Toolbar,
  ToolbarButton,
  ToolbarToggleButton,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarLink,
  ToolbarSelect,
  ToolbarSelectItem,
};
