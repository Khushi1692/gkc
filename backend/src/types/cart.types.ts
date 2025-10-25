import { Document } from "mongoose";
import { Types } from "mongoose";

export interface ICartItem {
  _id: string | Types.ObjectId;
  productId: string | Types.ObjectId;
  quantity: number;
  customizations?: CartItemCustomization[];

  // Computed properties (not stored in DB)
  price?: number; // branch price
  discountPercentage?: number;
  discountedPrice?: number;
  subtotal?: number; // (discountedPrice + customization modifiers) * quantity
  isAvailable?: boolean;
}

export interface CartItemResponse {
  _id: string | Types.ObjectId;
  productId: string | Types.ObjectId;
  quantity: number;
  customizations?: CartItemCustomization[];
  price: number; // branch price
  discountPercentage: number;
  discountedPrice: number;
  subtotal: number; // (discountedPrice + customization modifiers) * quantity
}

export interface CartResponse {
  _id: string | Types.ObjectId;
  userId?: string;
  sessionId?: string;
  items: ICartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItemCustomization {
  _id: string | Types.ObjectId;
  groupName: string;
  selectedOptions: {
    _id: string | Types.ObjectId;
    name: string;
    priceModifier: number;
  }[];
}

export interface ICart {
  _id: string;
  userId?: string;
  sessionId?: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItemSubDocument
  extends Omit<ICartItem, "_id" | "productId" | "customizations">,
    Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  customizations: {
    _id: Types.ObjectId;
    groupName: string;
    selectedOptions: {
      _id: Types.ObjectId;
      name: string;
      priceModifier: number;
    }[];
  }[];
}

export interface ICartDocument
  extends Omit<ICart, "_id" | "userId" | "items">,
    Document {
  _id: Types.ObjectId;
  userId?: Types.ObjectId;
  items: Types.DocumentArray<ICartItemSubDocument>;
}

export interface IPopulatedProduct {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  image?: string;
}

export interface ICartItemPopulated extends Omit<ICartItem, "productId"> {
  productId: IPopulatedProduct;
}
