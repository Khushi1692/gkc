import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    sessionId: { type: String },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        customizations: [
          {
            groupName: { type: String, required: true },
            selectedOptions: [
              {
                name: { type: String, required: true },
                priceModifier: { type: Number, required: true, min: 0 },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

cartSchema.index({ userId: 1 });
cartSchema.index({ sessionId: 1 });

export const Cart = model("Cart", cartSchema);
