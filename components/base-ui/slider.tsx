import * as React from "react";
import { cn } from "@/lib/utils";
import { Slider as SliderPrimitive } from "@base-ui-components/react/slider";

function Slider({
  className,
  children,
  defaultValue = 25,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      data-slot="slider"
      defaultValue={defaultValue}
      className={cn(className)}
      {...props}
    >
      <SliderPrimitive.Control
        className={cn("flex w-56 touch-none items-center py-3 select-none")}
      >
        <SliderPrimitive.Track className="h-1 w-full rounded bg-accent select-none">
          <SliderPrimitive.Indicator className="rounded bg-accent-foreground select-none" />
          <SliderPrimitive.Thumb className="size-4 rounded-full bg-accent-foreground border outline-none select-none" />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
