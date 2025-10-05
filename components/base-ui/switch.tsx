import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui-components/react/switch";
import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative flex h-6 w-10 rounded-full bg-input/80 p-px transition-[background-position,box-shadow] data-[checked]:bg-primary",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "aspect-square h-full rounded-full bg-background transition-transform duration-150 data-[checked]:translate-x-4 data-[checked]:bg-primary-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
