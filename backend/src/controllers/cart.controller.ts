import crypto from "crypto";
import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Branch } from "../models/branch.models";
import { CartService } from "../services/cart.service";
import { CartItemResponse, ICartItemSubDocument } from "../types/cart.types";
import { isProductAvailableInBranch } from "../utils/branchUtils";
import { AddItemToCartInput } from "../validators/cart.validators";

export class CartController {
  static async getCart(req: AuthRequest, res: Response) {
    try {
      const { userId, sessionId } = req;
      const { branchId } = req.params;

      if (!branchId) {
        return res
          .status(400)
          .json({ status: "error", message: "Branch ID is required" });
      }

      let cart = await CartService.getCart(userId, sessionId);

      if (!cart) {
        return res.status(200).json({
          status: "success",
          message: "Cart not found",
          data: { cart: null, skippedItems: [] },
        });
      }

      const branch = await Branch.findById(branchId).lean();
      if (!branch) {
        return res
          .status(404)
          .json({ status: "error", message: "Branch not found" });
      }

      // Populate product details before any computation
      await cart.populate({
        path: "items.productId",
        select: "_id name description image",
      });

      // Build a map of productId => branch product details for fast lookup
      const branchProductMap = new Map<string, any>();
      branch.menu.forEach((category: any) => {
        category.products.forEach((p: any) => {
          branchProductMap.set(p.productId.toString(), {
            price: p.price,
            discountPercentage: p.discountPercentage ?? 0,
            isAvailable: p.isAvailable,
          });
        });
      });

      const updatedItems: CartItemResponse[] = [];
      const skippedItems: ICartItemSubDocument[] = [];

      cart.items.forEach((item) => {
        const branchProduct = branchProductMap.get(
          item.productId._id.toString()
        );

        if (!branchProduct || !branchProduct.isAvailable) {
          skippedItems.push(item);
          return;
        }

        const price = branchProduct.price;
        const discountPercentage = branchProduct.discountPercentage;
        const discountedPrice = price - (price * discountPercentage) / 100;

        const customizationTotal =
          item.customizations?.reduce(
            (sum, c) =>
              sum +
              c.selectedOptions.reduce((s, o) => s + (o.priceModifier || 0), 0),
            0
          ) ?? 0;

        const subtotal =
          discountedPrice * item.quantity + customizationTotal * item.quantity;

        updatedItems.push({
          ...item.toObject(),
          productId: item.productId,
          price,
          discountPercentage,
          discountedPrice,
          subtotal,
        });
      });

      if (skippedItems.length > 0) {
        skippedItems.forEach((item) => cart.items.pull({ _id: item._id }));
        await cart.save();
      }

      const totalAmount = updatedItems.reduce((sum, i) => sum + i.subtotal, 0);

      return res.status(200).json({
        status: "success",
        message: "Cart fetched successfully",
        data: {
          cart: {
            ...cart.toObject(),
            items: updatedItems,
            totalAmount,
          },
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

      await CartService.addToCart(productData, req.userId, sessionId);

      res.status(201).json({
        status: "success",
        message: "Item added to cart successfully",
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

      await CartService.updateItemQuantity(
        itemId,
        quantity,
        req.userId,
        req.sessionId
      );

      res.status(200).json({
        status: "success",
        message: "Quantity updated successfully",
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

      await CartService.removeItem(itemId, req.userId, req.sessionId);

      res.status(200).json({
        status: "success",
        message: "Item removed successfully",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to remove item";
      res.status(500).json({ error: errorMessage });
    }
  }

  static async clearCart(req: AuthRequest, res: Response): Promise<void> {
    try {
      await CartService.clearCart(req.userId, req.sessionId);

      res.status(200).json({ status: "success", message: "Cart clear" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to clear cart";
      res.status(500).json({ error: errorMessage });
    }
  }
}
