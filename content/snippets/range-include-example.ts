//@ts-nocheck
// [!region import]
import { z } from "zod";
// [!endregion import]

// [!region schema]
const UserSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
});
// [!endregion schema]

// [!region usage]
function validateUser(data: unknown) {
  const result = UserSchema.safeParse(data);
  if (result.success) {
    console.log("Valid user:", result.data);
  } else {
    console.error("Validation errors:", result.error.errors);
  }
}

// Example usage:
validateUser({ name: "Alice", age: 30 }); // Valid
validateUser({ name: "Bob", age: -5 }); // Invalid

// [!endregion usage]
