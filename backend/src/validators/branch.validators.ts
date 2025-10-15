import { z } from "zod";

const operatingHourSchema = z.object({
  day: z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
  open: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
    .optional(),
  close: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)")
    .optional(),
  isClosed: z.boolean().default(false),
});

const menuSchema = z.object({
  categoryId: z.string().min(1, "Category ID is required"),
  products: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        price: z.number().positive("Price must be positive").optional(),
        isAvailable: z.boolean().default(true),
      })
    )
    .min(1, "Each category must have at least one product"),
});

export const addBranchSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  email: z.email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z
      .tuple([
        z.number().min(-180).max(180), // longitude
        z.number().min(-90).max(90), // latitude
      ])
      .refine((val) => val.length === 2, {
        message: "Coordinates must be [longitude, latitude]",
      }),
  }),
  operatingHours: z.array(operatingHourSchema).optional(),
  menu: z.array(menuSchema).optional(),
  isActive: z.boolean().default(true),
});

export type AddBranchInput = z.infer<typeof addBranchSchema>;
