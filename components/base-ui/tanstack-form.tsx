"use client";

import * as React from "react";
import {
  useForm,
  createFormHook,
  createFormHookContexts,
  useStore,
} from "@tanstack/react-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/base-ui/input";
import { Button } from "@/components/base-ui/button";
import { Textarea as BaseTextarea } from "@/components/base-ui/textarea";
import * as BaseSelect from "@/components/base-ui/select";
import { Slider as BaseSlider } from "@/components/base-ui/slider";
import { Switch as BaseSwitch } from "@/components/base-ui/switch";
import { Field, FieldError, FieldInput, FieldLabel } from "./field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

function ErrorMessages({
  errors,
}: {
  errors: Array<string | { message: string }>;
}) {
  return (
    <>
      {errors.map((error, index) => (
        <FieldError
          match={true}
          key={index}
          className="text-destructive text-sm mt-1"
        >
          {typeof error === "string" ? error : error.message}
        </FieldError>
      ))}
    </>
  );
}

export function TextField({
  label,
  placeholder,
  type = "text",
  className,
  ...props
}: {
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
} & React.ComponentProps<typeof Input>) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <Field className="">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <FieldInput
        id={field.name}
        name={field.name}
        type={type}
        value={field.state.value || ""}
        placeholder={placeholder}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={errors.length > 0}
        className={cn(errors.length > 0 && "border-destructive", className)}
        {...props}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </Field>
  );
}

export function NumberField({
  label,
  placeholder,
  className,
  ...props
}: {
  label: string;
  placeholder?: string;
  className?: string;
} & React.ComponentProps<typeof Input>) {
  const field = useFieldContext<number>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <Field className="">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <FieldInput
        id={field.name}
        name={field.name}
        type={"number"}
        value={field.state.value || ""}
        placeholder={placeholder}
        onBlur={field.handleBlur}
        onChange={(e) =>
          field.handleChange(Number(e.target.valueAsNumber) || 0)
        }
        aria-invalid={errors.length > 0}
        className={cn(errors.length > 0 && "border-destructive", className)}
        {...props}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </Field>
  );
}

export function TextArea({
  label,
  placeholder,
  rows = 3,
  className,
  ...props
}: {
  label: string;
  placeholder?: string;
  rows?: number;
  className?: string;
} & React.ComponentProps<typeof BaseTextarea>) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <BaseTextarea
        id={field.name}
        name={field.name}
        value={field.state.value || ""}
        placeholder={placeholder}
        rows={rows}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={errors.length > 0}
        className={cn(errors.length > 0 && "border-destructive", className)}
        {...props}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </Field>
  );
}

export function Select({
  label,
  values,
  className,
}: {
  label: string;
  values: Array<{ label: string; value: string }>;
  className?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <BaseSelect.Select
        name={field.name}
        value={field.state.value || ""}
        onValueChange={(value) => field.handleChange(value as string)}
      >
        <BaseSelect.SelectTrigger
          aria-invalid={errors.length > 0}
          className={cn(
            "w-full",
            errors.length > 0 && "border-destructive",
            className
          )}
        >
          <BaseSelect.SelectValue />
        </BaseSelect.SelectTrigger>
        <BaseSelect.SelectContent>
          <BaseSelect.SelectGroup>
            <BaseSelect.SelectGroupLabel>{label}</BaseSelect.SelectGroupLabel>
            {values.map((option) => (
              <BaseSelect.SelectItem key={option.value} value={option.value}>
                {option.label}
              </BaseSelect.SelectItem>
            ))}
          </BaseSelect.SelectGroup>
        </BaseSelect.SelectContent>
      </BaseSelect.Select>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </Field>
  );
}

export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  className,
  ...props
}: {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
} & React.ComponentProps<typeof BaseSlider>) {
  const field = useFieldContext<number>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>
        {label}: {field.state.value}
      </FieldLabel>
      <BaseSlider
        id={field.name}
        min={min}
        max={max}
        step={step}
        value={[field.state.value || 0]}
        onValueChange={(value) => field.handleChange(value as number)}
        onBlur={field.handleBlur}
        className={className}
        {...props}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </Field>
  );
}

export function Switch({
  label,
  description,
  className,
}: {
  label: string;
  description?: string;
  className?: string;
}) {
  const field = useFieldContext<boolean>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <Field className={className}>
      <div className="flex items-center space-x-2">
        <BaseSwitch
          id={field.name}
          checked={field.state.value || false}
          onCheckedChange={(checked) => field.handleChange(checked)}
          onBlur={field.handleBlur}
          aria-invalid={errors.length > 0}
        />
        <div className="grid gap-1.5 leading-none">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </Field>
  );
}

// Form components
export function SubmitButton({
  children = "Submit",
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => ({
        isSubmitting: state.isSubmitting,
        canSubmit: state.canSubmit,
      })}
    >
      {({ isSubmitting, canSubmit }) => (
        <Button
          type="submit"
          disabled={isSubmitting || !canSubmit}
          className={className}
          {...props}
        >
          {isSubmitting ? "Submitting..." : children}
        </Button>
      )}
    </form.Subscribe>
  );
}

interface FormProps extends React.ComponentProps<"form"> {
  form: any; // TODO: Add FormApi type
}

export const Form = ({
  form,
  className,
  children,
  onSubmit,
  ...props
}: FormProps) => {
  return (
    <form
      className={cn("space-y-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
        onSubmit?.(e);
      }}
      {...props}
    >
      {children}
    </form>
  );
};

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    NumberField,
    TextArea,
    Select,
    Slider,
    Switch,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export { useForm };
