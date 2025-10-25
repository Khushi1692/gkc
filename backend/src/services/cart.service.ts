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
  ): Promise<void> {
    try {
      const guestCart = await Cart.findOne({ sessionId });

      if (!guestCart || guestCart.items.length === 0) {
        return;
      }

      let userCart = await Cart.findOne({ userId: new Types.ObjectId(userId) });

      if (!userCart) {
        guestCart.userId = new Types.ObjectId(userId);
        guestCart.sessionId = undefined;
        await guestCart.save();
        return;
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
        } else {
          userCart!.items.push(guestItem);
        }
      });

      await userCart.save();
      await Cart.deleteOne({ sessionId });
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
  ): Promise<void> {
    let cart = await this.getCart(userId, sessionId);

    if (!cart) {
      cart = new Cart({
        userId: userId ? new Types.ObjectId(userId) : undefined,
        sessionId: !userId ? sessionId : undefined,
        items: [],
      });
    }

    const newItem: Partial<ICartItem> = {
      ...productData,
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
    } else {
      cart.items.push(newItem as unknown as ICartItemSubDocument);
    }

    await cart.save();
  }

  static async updateItemQuantity(
    itemId: string,
    quantity: number,
    userId?: string,
    sessionId?: string
  ): Promise<void> {
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
    }

    await cart.save();
  }

  static async removeItem(
    itemId: string,
    userId?: string,
    sessionId?: string
  ): Promise<void> {
    const cart = await this.getCart(userId, sessionId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items.pull(itemId);

    await cart.save();
  }

  static async clearCart(userId?: string, sessionId?: string): Promise<void> {
    const cart = await this.getCart(userId, sessionId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = [] as any;

    await cart.save();
  }
}
