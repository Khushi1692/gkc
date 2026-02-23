import { model, Schema, Types } from "mongoose";
import { IBranch } from "../types/branch.types";
import { Product } from "./product.models";

/**
 * Branch Schema
 */
const branchSchema = new Schema<IBranch>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },

    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9-]+$/,
    },

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

    printer: {
      enabled: { type: Boolean, default: false },
      mqtt: {
        cmdTopic: { type: String, required: true },
        statusTopic: { type: String, required: true },
        heartbeatTopic: { type: String, required: true },
      },
      lastSeenAt: { type: Date },
      isOnline: { type: Boolean, default: false },
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
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
            "basePrice",
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

  const formatter = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "long",
  });

  const parts = formatter.formatToParts(now);

  const currentDay = parts
    .find((p) => p.type === "weekday")
    ?.value.toLowerCase();
  const hour = Number.parseInt(
    parts.find((p) => p.type === "hour")?.value || "0",
  );
  const minute = Number.parseInt(
    parts.find((p) => p.type === "minute")?.value || "0",
  );

  const hours = this.operatingHours.find((h: any) => h.day === currentDay);
  if (!hours || hours.isClosed) return false;

  const [openHour, openMinute] = hours.open.split(":").map(Number);
  const [closeHour, closeMinute] = hours.close.split(":").map(Number);

  const currentTotal = hour * 60 + minute;
  const openTotal = openHour * 60 + openMinute;
  const closeTotal = closeHour * 60 + closeMinute;

  if (openTotal <= closeTotal) {
    // Normal same-day closing
    return currentTotal >= openTotal && currentTotal <= closeTotal;
  } else {
    // Overnight case (e.g., 18:00 - 02:00)
    return currentTotal >= openTotal || currentTotal <= closeTotal;
  }
};

export const Branch = model("Branch", branchSchema);
