import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    profileImage: { type: String },
    // favorites: [
    //   {
    //     productId: { type: Types.ObjectId, ref: "Product", required: true },
    //   },
    // ],
    address: { type: String },
    // location: {
    //   type: { type: String, enum: ["Point"], default: "Point" },
    //   coordinates: { type: [Number], required: true }, // [lng, lat]
    // },
  },
  { timestamps: true }
);

const branchSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
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
        open: { type: String },
        close: { type: String },
        isClosed: { type: Boolean, default: false },
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
    actualPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true }, // automatically calculated
    discountPercentage: { type: Number, required: true },

    isVegetarian: { type: Boolean, default: true },

    // Customizations
    customizations: [
      {
        groupName: { type: String, required: true },
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

const cartSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User" }, // optional for guest
    sessionId: { type: String }, // guest identifier
    items: [
      {
        productId: { type: Types.ObjectId, ref: "Product", required: true },
        productName: { type: String, required: true },
        productImage: { type: String },
        quantity: { type: Number, required: true, min: 1 },
        actualPrice: { type: Number, required: true },
        discountedPrice: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        customizations: [
          {
            groupName: { type: String },
            selectedOptions: [
              {
                name: { type: String },
                priceModifier: { type: Number },
              },
            ],
          },
        ],
      },
    ],
    specialInstructions: { type: String },
    totalAmount: { type: Number, required: true, default: 0 },
    discountedAmount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: Types.ObjectId, ref: "User" }, // optional for guest
    branchId: { type: Types.ObjectId, ref: "Branch", required: true },
    items: [
      {
        productId: { type: Types.ObjectId, ref: "Product", required: true },
        productName: { type: String, required: true },
        productImage: { type: String },
        quantity: { type: Number, required: true, min: 1 },
        actualPrice: { type: Number, required: true },
        discountedPrice: { type: Number, required: true },
        subtotal: { type: Number, required: true },
        customizations: [
          {
            groupName: { type: String },
            selectedOptions: [
              {
                name: { type: String },
                priceModifier: { type: Number },
              },
            ],
          },
        ],
      },
    ],
    totalAmount: { type: Number, required: true, default: 0 },
    discountedAmount: { type: Number, required: true, default: 0 },

    paymentMethod: {
      type: String,
      enum: ["stripe", "cash_on_pickup"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "processing", "paid", "failed", "refunded"],
      default: "pending",
    },
    stripePaymentIntentId: { type: String },
    stripeChargeId: { type: String },
    paidAt: { type: Date },
    specialInstructions: { type: String },
  },
  { timestamps: true }
);
