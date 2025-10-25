import { model, Schema, Types } from "mongoose";

const OrderSchema = new Schema(
  {
    orderId: { type: String, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    branchId: { type: Types.ObjectId, ref: "Branch", required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }, // base price
        discountPercentage: { type: Number, default: 0 },
        discountedPrice: { type: Number, required: true, min: 0 },
        subtotal: { type: Number, required: true, min: 0 },
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
    totalAmount: { type: Number, required: true },
    specialInstructions: { type: String },
    paymentIntentId: { type: String },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = model("Order", OrderSchema);
