import { Types } from "mongoose";
import { BranchPrinterConfig } from "./branch.types";

export interface OrderItem {
  quantity: number;
  subtotal: number;
  productId?: {
    name: string;
  };
}

export interface PrintableOrder {
  _id: Types.ObjectId;
  orderId: string;
  userId?: {
    _id: Types.ObjectId;
    name?: string;
    email?: string;
  };
  customerEmail?: string;
  customerPhone?: string;
  branchId: {
    _id: Types.ObjectId;
    name: string;
    address?: string;
    phone?: string;
    printer: {
      enabled: boolean;
      mqtt: {
        cmdTopic: string; // e.g., "Prn3F1C..."
      };
    };
  };
  items: Array<{
    productId?: {
      _id: Types.ObjectId;
      name: string;
    };
    quantity: number;
    price: number;
    discountPercentage?: number;
    discountedPrice: number;
    subtotal: number;
    customizations?: Array<{
      groupName: string;
      selectedOptions: Array<{
        name: string;
        priceModifier: number;
      }>;
    }>;
  }>;
  totalAmount: number;
  specialInstructions?: string;
  paymentIntentId?: string;
  paymentStatus: "pending" | "paid" | "failed";
  printStatus: "pending" | "printed" | "failed";
  printedAt?: Date;
  printAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}
