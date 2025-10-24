export type AddItemToCartInput = {
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
  customizations?: {
    _id: string;
    groupName: string;
    selectedOptions: {
      _id: string;
      name: string;
      priceModifier: number;
    }[];
  }[];
};

export interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    description?: string;
    image?: string;
  };
  quantity: number;
  price: number;
  subtotal: number;
  customizations?: {
    _id: string;
    groupName: string;
    selectedOptions: {
      name: string;
      priceModifier: number;
      _id: string;
    }[];
  }[];
}

export interface GetCartResponse {
  cart: Cart;
  skippedItems: CartItem[];
}

export interface Cart {
  _id: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutPayload {
  branchId: string;
  specialInstructions: string;
  paymentMethodId: string; // obtained from Stripe CardElement
}