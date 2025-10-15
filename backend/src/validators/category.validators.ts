import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().trim().min(1, { message: "Category name is required" }),
  sortOrder: z.number().optional(),
  isActive: z.boolean().optional(),
});

export type AddCategoryInput = z.infer<typeof addCategorySchema>;
