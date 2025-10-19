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
  groupName: string;
  selectedOptions: {
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
  extends Omit<ICartItem, "_id" | "productId">,
    Document {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
}

export interface ICartDocument
  extends Omit<ICart, "_id" | "userId" | "items">,
    Document {
  _id: Types.ObjectId;
  userId?: Types.ObjectId;
  items: Types.DocumentArray<ICartItemSubDocument>;
}
