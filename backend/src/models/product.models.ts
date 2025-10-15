import { Schema, model, Types, Document } from "mongoose";
import { IProduct } from "../types/product.types";

/**
 * Product Schema
 */
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
    basePrice: { type: Number, required: true },
    isVegetarian: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    customizations: [
      {
        groupName: { type: String, required: true, trim: true },
        type: { type: String, enum: ["radio", "checkbox"], required: true },
        required: { type: Boolean, default: false },
        options: [
          {
            name: { type: String, required: true },
            priceModifier: { type: Number, default: 0 },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Index for category lookups
productSchema.index({ categoryId: 1 });

export const Product = model<IProduct>("Product", productSchema);
