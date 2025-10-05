import { Radio as RadioPrimitive } from "@base-ui-components/react/radio";
import { cn } from "@/lib/utils";

function Radio({
  className,
  ...props
}: React.ComponentProps<typeof RadioPrimitive.Root>) {
  return (
    <RadioPrimitive.Root
      className={cn(
        "flex size-4 items-center justify-center rounded-full border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[checked]:bg-primary data-[checked]:border-primary",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator className="flex data-[unchecked]:hidden before:size-1.5 before:rounded-full before:bg-primary-foreground" />
    </RadioPrimitive.Root>
  );
}

export { Radio };
