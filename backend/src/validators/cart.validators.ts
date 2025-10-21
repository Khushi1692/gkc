import z from "zod";

export const addItemToCartSchema = z.object({
  productId: z.string().min(1, { message: "Product ID is required" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  price: z.number().min(0, { message: "Price must be at least 0" }),
  subtotal: z.number().min(0, { message: "Subtotal must be at least 0" }),
  customizations: z
    .array(
      z.object({
        _id: z.string().min(1, { message: "Group Id is required" }),
        groupName: z.string().min(1, { message: "Group name is required" }),
        selectedOptions: z.array(
          z.object({
            _id: z.string().min(1, { message: "Option Id is required" }),
            name: z.string().min(1, { message: "Option name is required" }),
            priceModifier: z
              .number()
              .min(0, { message: "Price modifier must be at least 0" }),
          })
        ),
      })
    )
    .optional(),
});

export type AddItemToCartInput = z.infer<typeof addItemToCartSchema>;
