import { z } from "zod";

// Frontmatter schema for validation
export const frontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  author: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional().default(true),
  lastModified: z.string().optional(),
  version: z.string().optional(),
  category: z.string().optional(),
  order: z.number().optional(),
  hidden: z.boolean().optional().default(false),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

// Validation function
export function validateFrontmatter(data: unknown): Frontmatter {
  try {
    return frontmatterSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Frontmatter validation failed:", error.errors);
      throw new Error(
        `Invalid frontmatter: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw error;
  }
}

// Helper function to get frontmatter with defaults
export function getFrontmatterWithDefaults(data: unknown): Frontmatter {
  try {
    return frontmatterSchema.parse(data);
  } catch {
    // Return defaults if validation fails
    return {
      title: "Untitled",
      published: true,
      hidden: false,
    };
  }
}
