"use client";

// [!region import]
import { Form, useAppForm } from "@/components/base-ui/tanstack-form";
// [!endregion import]
import { z } from "zod";

// [!region usage]
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email"),
  age: z.number().min(13, "Must be at least 13 years old"),
  bio: z.string(),
});

export function FormComponent() {
  const form = useAppForm({
    defaultValues: {
      name: "",
      age: 0,
      email: "",
      bio: "",
    },
    validators: {
      onChange: userSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <Form form={form} className="max-w-md mx-auto flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form.AppField
        name="name"
        children={(field) => <field.TextField label="Full Name" />}
      />
      <form.AppField
        name="email"
        children={(field) => <field.TextField label="Email" />}
      />

      <form.AppField
        name="age"
        children={(field) => <field.NumberField label="Age" />}
      />

      <form.AppField
        name="bio"
        children={(field) => <field.TextArea label="Bio" />}
      />

      {form.state.errors.length > 0 && (
        <div className="text-sm text-destructive">
          {form.state.errors.map((error, index) => (
            <div key={index}>{String(error)}</div>
          ))}
        </div>
      )}

      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </Form>
  );
}
// [!endregion usage]
