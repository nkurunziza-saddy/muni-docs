import * as React from "react";
import { Fieldset as FieldsetPrimitives } from "@base-ui-components/react/fieldset";
import { cn } from "@/lib/utils";

function Fieldset({
  className,
  ...props
}: React.ComponentProps<typeof FieldsetPrimitives.Root>) {
  return (
    <FieldsetPrimitives.Root
      data-slot="fieldset"
      className={cn("flex w-full max-w-64 flex-col gap-4", className)}
      {...props}
    />
  );
}

function FieldsetLegend({
  className,
  ...props
}: React.ComponentProps<typeof FieldsetPrimitives.Legend>) {
  return (
    <FieldsetPrimitives.Legend
      data-slot="fieldset-legend"
      className={cn("border-b pb-3 text-lg font-medium", className)}
      {...props}
    />
  );
}

export { Fieldset, FieldsetLegend };

// usage
{
  /* <Fieldset>
      <FieldsetLegend>
        Billing details
      </FieldsetLegend>

      <Field>
        <FieldLabel>Company</FieldLabel>
        <FieldControl
          placeholder="Enter company name"
        />
      </Field>

      <Field>
        <FieldLabel >Tax ID</FieldLabel>
        <FieldControl
          placeholder="Enter fiscal number"
        />
      </Field>
    </Fieldset> */
}
