import { CartItemCustomization, ICartItem } from "../types/cart.types";
export const calculateItemSubtotal = (item: ICartItem): number => {
  if (!item?.price) return 0;
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
  if (!item1 || !item2) return false;

  // Compare productId first (quick exit)
  if (item1.productId.toString() !== item2.productId.toString()) {
    return false;
  }

  const customs1 = item1.customizations || [];
  const customs2 = item2.customizations || [];

  // If length differs, no need to go deeper
  if (customs1.length !== customs2.length) {
    return false;
  }

  // Normalize both customization arrays
  const normalize = (customs: CartItemCustomization[]) =>
    customs
      .map((c) => ({
        groupName: c.groupName,
        selectedOptions: [...c.selectedOptions]
          .sort((a, b) => String(a._id).localeCompare(String(b._id)))
          .map((o) => ({
            _id: o._id,
            name: o.name,
            priceModifier: o.priceModifier,
          })),
      }))
      .sort((a, b) => a.groupName.localeCompare(b.groupName));

  const normalized1 = normalize(customs1);
  const normalized2 = normalize(customs2);

  // Deep compare after normalization
  return JSON.stringify(normalized1) === JSON.stringify(normalized2);
};
