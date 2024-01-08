import * as z from "zod";

export const eventFormSchema = z.object({
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(100, "Description must be less than 100 characters"),
  categoryId: z.string(),
});
