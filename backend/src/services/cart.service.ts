import { Types } from "mongoose";
import { Cart } from "../models/cart.models";
import {
  ICartDocument,
  ICartItem,
  ICartItemSubDocument,
} from "../types/cart.types";
import {
  calculateCartTotal,
  calculateItemSubtotal,
  itemsAreEqual,
} from "../utils/cartUtils";
import { AddItemToCartInput } from "../validators/cart.validators";

export class CartService {
  static async mergeGuestCartWithUserCart(
    userId: string,
    sessionId: string
  ): Promise<ICartDocument | null> {
    try {
      const guestCart = await Cart.findOne({ sessionId });

      if (!guestCart || guestCart.items.length === 0) {
        return null;
      }

      let userCart = await Cart.findOne({ userId: new Types.ObjectId(userId) });

      if (!userCart) {
        guestCart.userId = new Types.ObjectId(userId);
        guestCart.sessionId = undefined;
        await guestCart.save();
        return guestCart as unknown as ICartDocument;
      }

      guestCart.items.forEach((guestItem) => {
        const existingItemIndex = userCart!.items.findIndex((item) =>
          itemsAreEqual(
            item.toObject() as unknown as ICartItem,
            guestItem.toObject() as unknown as ICartItem
          )
        );

        if (existingItemIndex !== -1) {
          userCart!.items[existingItemIndex].quantity += guestItem.quantity;
          userCart!.items[existingItemIndex].subtotal = calculateItemSubtotal(
            userCart!.items[
              existingItemIndex
            ].toObject() as unknown as ICartItem
          );
        } else {
          userCart!.items.push(guestItem);
        }
      });

      userCart.totalAmount = calculateCartTotal(
        userCart.items.map((item) => item.toObject() as unknown as ICartItem)
      );

      await userCart.save();
      await Cart.deleteOne({ sessionId });

      return userCart as unknown as ICartDocument;
    } catch (error) {
      throw new Error("Error merging carts: " + error);
    }
  }

  static async getCart(userId?: string, sessionId?: string) {
    if (userId) {
      return await Cart.findOne({
        userId: new Types.ObjectId(userId),
      });
    } else if (sessionId) {
      return await Cart.findOne({ sessionId });
    }
    return null;
  }

  static async addToCart(
    productData: AddItemToCartInput,
    userId?: string,
    sessionId?: string
  ): Promise<ICartDocument> {
    let cart = await this.getCart(userId, sessionId);

    if (!cart) {
      cart = new Cart({
        userId: userId ? new Types.ObjectId(userId) : undefined,
        sessionId: !userId ? sessionId : undefined,
        items: [],
        totalAmount: 0,
      });
    }

    const subtotal = calculateItemSubtotal(productData as ICartItem);

    const newItem: Partial<ICartItem> = {
      ...productData,
      subtotal,
      _id: new Types.ObjectId().toString(),
    };

    const existingItemIndex = cart.items.findIndex((item) =>
      itemsAreEqual(
        item.toObject() as unknown as ICartItem,
        newItem as ICartItem
      )
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += newItem.quantity!;
      cart.items[existingItemIndex].subtotal = calculateItemSubtotal(
        cart.items[existingItemIndex].toObject() as unknown as ICartItem
      );
    } else {
      cart.items.push(newItem as unknown as ICartItemSubDocument);
    }

    cart.totalAmount = calculateCartTotal(
      cart.items.map((item) => item.toObject() as unknown as ICartItem)
    );

    await cart.save();
    return cart as unknown as ICartDocument;
  }

  static async updateItemQuantity(
    itemId: string,
    quantity: number,
    userId?: string,
    sessionId?: string
  ): Promise<ICartDocument> {
    const cart = await this.getCart(userId, sessionId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const item = cart.items.id(itemId);
    if (!item) {
      throw new Error("Item not found in cart");
    }

    if (quantity <= 0) {
      cart.items.pull(itemId);
    } else {
      item.quantity = quantity;
      item.subtotal = calculateItemSubtotal(
        item.toObject() as unknown as ICartItem
      );
    }

    cart.totalAmount = calculateCartTotal(
      cart.items.map((item) => item.toObject() as unknown as ICartItem)
    );

    await cart.save();
    return cart as unknown as ICartDocument;
  }

  static async removeItem(
    itemId: string,
    userId?: string,
    sessionId?: string
  ): Promise<ICartDocument> {
    const cart = await this.getCart(userId, sessionId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items.pull(itemId);

    cart.totalAmount = calculateCartTotal(
      cart.items.map((item) => item.toObject() as unknown as ICartItem)
    );

    await cart.save();
    return cart as unknown as ICartDocument;
  }

  static async clearCart(
    userId?: string,
    sessionId?: string
  ): Promise<ICartDocument> {
    const cart = await this.getCart(userId, sessionId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = [] as any;
    cart.totalAmount = 0;

    await cart.save();
    return cart as unknown as ICartDocument;
  }
}
