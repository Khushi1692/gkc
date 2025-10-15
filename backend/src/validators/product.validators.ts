import { z } from "zod";

const customizationOptionSchema = z.object({
  name: z.string().min(1, { message: "Option name is required" }),
  priceModifier: z.number().default(0.00),
});

const customizationGroupSchema = z.object({
  groupName: z.string().min(1, { message: "Group name is required" }),
  type: z.enum(["radio", "checkbox"]),
  required: z.boolean().default(false),
  options: z.array(customizationOptionSchema),
});

export const addProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().optional(),
  categoryId: z.string().min(1, { message: "categoryId is required" }),
  image: z.url().optional(),
  basePrice: z.number().min(0, { message: "Base price is required" }),
  isVegetarian: z.boolean().default(true),
  isActive: z.boolean().default(true),
  customizations: z.array(customizationGroupSchema).optional(),
});

export type AddProductInput = z.infer<typeof addProductSchema>;
