import * as React from "react";
import { Form as FormPrimitives } from "@base-ui-components/react/form";
import { cn } from "@/lib/utils";

type FormProps = {
  className?: string;
  errors?: Record<string, string | string[]>;
  onClearErrors?: (errors: Record<string, string | string[]>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
} & Omit<React.ComponentProps<"form">, "onSubmit">;

function Form({ 
  className, 
  errors = {}, 
  onClearErrors, 
  onSubmit,
  children,
  ...props 
}: FormProps) {
  return (
    <FormPrimitives
      data-slot="form"
      className={cn("space-y-6", className)}
      errors={errors}
      onClearErrors={onClearErrors}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </FormPrimitives>
  );
}

export { Form };
