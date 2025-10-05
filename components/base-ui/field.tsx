import { cn } from "@/lib/utils";
import { Field as FieldPrimitives } from "@base-ui-components/react/field";

function Field({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitives.Root>) {
  return (
    <FieldPrimitives.Root
      data-slot="field"
      className={cn(
        "flex w-full max-w-64 flex-col items-start gap-1",
        className
      )}
      {...props}
    />
  );
}

function FieldInput({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitives.Control>) {
  return (
    <FieldPrimitives.Control
      data-slot="control"
      className={cn(
        "file:text-foreground h-9 w-full text-base placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitives.Label>) {
  return (
    <FieldPrimitives.Label
      data-slot="field-label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function FieldError({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitives.Error>) {
  return (
    <FieldPrimitives.Error
      data-slot="field-error"
      match="valueMissing"
      className={cn("text-destructive", className)}
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitives.Description>) {
  return (
    <FieldPrimitives.Description
      data-slot="field-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Field, FieldLabel, FieldInput, FieldDescription, FieldError };

// usage
{
  /* <Field>
  <FieldLabel>Name</FieldLabel>
  <FieldInput required placeholder="Required" />
  <FieldError match="valueMissing">Please enter your name</FieldError>

  <FieldDescription>Visible on your profile</FieldDescription>
</Field>; */
}
