import {
  CartItemCustomization,
  ICartItem
} from "../types/cart.types";
export const calculateItemSubtotal = (item: ICartItem): number => {
  let subtotal = item.price * item.quantity;

  // Add customization price modifiers
  if (item.customizations && item.customizations.length > 0) {
    item.customizations.forEach((custom: CartItemCustomization) => {
      custom.selectedOptions.forEach((option) => {
        subtotal += (option.priceModifier || 0) * item.quantity;
      });
    });
  }

  return subtotal;
};

export const calculateCartTotal = (items: ICartItem[]): number => {
  let totalAmount = 0;

  items.forEach((item) => {
    totalAmount += calculateItemSubtotal(item);
  });
  return totalAmount;
};

export const itemsAreEqual = (item1: ICartItem, item2: ICartItem): boolean => {
  if (item1.productId.toString() !== item2.productId.toString()) {
    return false;
  }

  // Compare customizations
  const customs1 = JSON.stringify(item1.customizations || []);
  const customs2 = JSON.stringify(item2.customizations || []);

  return customs1 === customs2;
};
