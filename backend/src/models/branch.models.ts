import { Schema, model, Types } from "mongoose";
import { IBranch } from "../types/branch.types";
import { Product } from "./product.models";
import { number } from "zod";

/**
 * Branch Schema
 */
const branchSchema = new Schema<IBranch>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: (v: number[]) => v.length === 2,
          message: "Coordinates must contain exactly [longitude, latitude]",
        },
      },
    },

    operatingHours: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
          required: true,
        },
        open: {
          type: String,
          trim: true,
          validate: {
            validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
            message: "Time must be in HH:mm format",
          },
        },
        close: {
          type: String,
          trim: true,
          validate: {
            validator: (v: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
            message: "Time must be in HH:mm format",
          },
        },
        isClosed: { type: Boolean, default: true },
      },
    ],

    menu: [
      {
        categoryId: { type: Types.ObjectId, ref: "Category", required: true },
        products: [
          {
            productId: { type: Types.ObjectId, ref: "Product", required: true },
            price: { type: Number, min: 0 },
            discountPercentage: {
              type: Number, // discount percentage
              min: [0, "Discount cannot be negative"],
              max: [100, "Discount cannot exceed 100%"],
              default: 0,
            },
            isAvailable: { type: Boolean, default: true },
          },
        ],
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

branchSchema.index({ location: "2dsphere" });
branchSchema.index({ "menu.categoryId": 1 });
branchSchema.index({ "menu.productId": 1 });
branchSchema.index({ "menu.isAvailable": 1 });

branchSchema.pre("save", async function (next) {
  try {
    for (const menuItem of this.menu) {
      for (const product of menuItem.products) {
        if (!product.price && product.productId) {
          const base = await Product.findById(product.productId).select(
            "basePrice"
          );
          if (base && base.basePrice != null) {
            product.price = base.basePrice;
          }
        }
      }
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

branchSchema.methods.isOpenNow = function (): boolean {
  const now = new Date();
  const currentDay = now
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();
  const hours = this.operatingHours.find((h: any) => h.day === currentDay);
  if (!hours || hours.isClosed) return false;

  const [openHour, openMinute] = hours.open.split(":").map(Number);
  const [closeHour, closeMinute] = hours.close.split(":").map(Number);

  const openTime = new Date(now);
  openTime.setHours(openHour, openMinute, 0, 0);

  const closeTime = new Date(now);
  closeTime.setHours(closeHour, closeMinute, 0, 0);

  return now >= openTime && now <= closeTime;
};

export const Branch = model("Branch", branchSchema);
