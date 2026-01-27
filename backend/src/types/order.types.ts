import { BranchPrinterConfig } from "./branch.types";

export interface OrderItem {
  quantity: number;
  subtotal: number;
  productId?: {
    name: string;
  };
}

export interface PrintableOrder {
  _id: string;
  orderId: string;
  totalAmount: number;
  createdAt: Date;
  printedAt?: Date;
  items: OrderItem[];
  branchId: {
    _id: string;
    name: string;
    printer: BranchPrinterConfig;
  };
}
