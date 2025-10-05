import * as React from "react";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui-components/react/checkbox-group";
import { cn } from "@/lib/utils";

function CheckboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxGroupPrimitive>) {
  return (
    <CheckboxGroupPrimitive
      className={cn("flex flex-col items-start gap-2", className)}
      {...props}
    />
  );
}

export { CheckboxGroup };
