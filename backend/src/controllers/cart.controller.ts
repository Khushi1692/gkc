import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { CartService } from "../services/cart.service";
import { ICartItem, ICartItemSubDocument } from "../types/cart.types";
import { isProductAvailableInBranch } from "../utils/branchUtils";
import { calculateCartTotal } from "../utils/cartUtils";
import { AddItemToCartInput } from "../validators/cart.validators";
import crypto from "crypto";

export class CartController {
  static async getCart(req: AuthRequest, res: Response) {
    try {
      const { userId, sessionId } = req;
      const { branchId } = req.params;

      const cart = await CartService.getCart(userId, sessionId);

      if (!cart) {
        res.status(200).json({ status: "success", message: "Cart not found" });
        return;
      }

      const skippedItems: ICartItem[] = [];

      if (branchId) {
        const validItems: ICartItemSubDocument[] = [];

        for (const item of cart.items) {
          const available = await isProductAvailableInBranch(
            branchId,
            item.productId.toString()
          );
          if (available) {
            validItems.push(item);
          } else {
            skippedItems.push(item.toObject() as unknown as ICartItem);
          }
        }

        // If some items are skipped, update cart
        if (skippedItems.length > 0) {
          cart.items = validItems as any;
          cart.totalAmount = calculateCartTotal(
            validItems.map((i) => i.toObject() as unknown as ICartItem)
          );
          await cart.save();
        }
      }

      await cart.populate({
        path: "items.productId",
        select: "_id name description image",
      })

      res.status(200).json({
        status: "success",
        message: "Cart fetched successfully",
        data: {
          cart: cart,
          skippedItems,
        },
      });
    } catch (error) {
      console.error("Get Cart Error:", error);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }

  static async addToCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      const productData: AddItemToCartInput = req.body;
      const { branchId } = req.params;

      if (!branchId) {
        res
          .status(400)
          .json({ status: "error", message: "Branch ID is required" });
        return;
      }

      const isAvailable = await isProductAvailableInBranch(
        branchId,
        productData.productId.toString()
      );

      if (!isAvailable) {
        res.status(400).json({
          status: "error",
          message: "Product is not available in the selected branch",
        });
        return;
      }

      let sessionId;

      if (!req.sessionId) {
        sessionId = crypto.randomBytes(32).toString("hex");

        res.cookie("sessionId", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      } else {
        sessionId = req.sessionId;
      }

      const cart = await CartService.addToCart(
        productData,
        req.userId,
        sessionId
      );

      await cart.populate({
        path: "items.productId",
        select: "_id name description image",
      });

      res.status(201).json({
        status: "success",
        message: "Item added to cart successfully",
        data: cart,
      });
    } catch (error) {
      console.error("Add to cart error", error);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }

  static async updateQuantity(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { itemId } = req.params;
      const { quantity }: { quantity: number } = req.body;

      if (!quantity || quantity < 0) {
        res.status(400).json({ status: "error", message: "Invalid quantity" });
        return;
      }

      const cart = await CartService.updateItemQuantity(
        itemId,
        quantity,
        req.userId,
        req.sessionId
      );

      await cart.populate({
        path: "items.productId",
        select: "_id name description image",
      });

      res.status(200).json({
        status: "success",
        message: "Quantity updated successfully",
        data: cart,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update cart";
      res.status(500).json({ error: errorMessage });
    }
  }

  static async removeItem(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { itemId } = req.params;

      const cart = await CartService.removeItem(
        itemId,
        req.userId,
        req.sessionId
      );

      await cart.populate({
        path: "items.productId",
        select: "_id name description image",
      });

      res.status(200).json({
        status: "success",
        message: "Item removed successfully",
        data: cart,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to remove item";
      res.status(500).json({ error: errorMessage });
    }
  }

  static async clearCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      const cart = await CartService.clearCart(req.userId, req.sessionId);

      res
        .status(200)
        .json({ status: "success", message: "Cart clear", data: cart });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to clear cart";
      res.status(500).json({ error: errorMessage });
    }
  }
}
