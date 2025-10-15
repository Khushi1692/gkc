import { Schema, model } from "mongoose";
import { ICategory } from "../types/category.types";

/**
 * Category Schema
 */
const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index for sorting
categorySchema.index({ sortOrder: 1 });

export const Category = model("Category", categorySchema);
