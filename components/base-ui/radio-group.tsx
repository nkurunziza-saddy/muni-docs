import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui-components/react/radio-group";
import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive>) {
  return (
    <RadioGroupPrimitive
      className={cn("flex flex-col items-start gap-1", className)}
      {...props}
    />
  );
}

export { RadioGroup };
