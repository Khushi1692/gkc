import { Document } from "mongoose";
import { Types } from "mongoose";

export interface ICartItem {
  _id: string;
  productId: string | Types.ObjectId;
  quantity: number;
  price: number;
  subtotal: number;
  customizations?: CartItemCustomization[];
}

export interface CartItemCustomization {
  _id: string;
  groupName: string;
  selectedOptions: {
    _id: string;
    name: string;
    priceModifier: number;
  }[];
}

export interface ICart {
  _id: string;
  userId?: string;
  sessionId?: string;
  items: ICartItem[];
  specialInstructions?: string;
  totalAmount: number;
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
