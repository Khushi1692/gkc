import Stripe from "stripe";
import { config } from "../config/config";
import { Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { Order } from "../models/order.models";
import { generateOrderId } from "../utils/orderUtils";
import { Branch } from "../models/branch.models";
import { PrinterService } from "../services/printer.service";

const stripe = new Stripe(config.stripe.secretKey || "sk_test_placeholder", {
  apiVersion: "2025-09-30.clover" as any,
});

export class PaymentController {
  static async createPaymentIntent(req: Request, res: Response) {
    try {
      const { userId, sessionId } = req;
      const { branchId, specialInstructions, customerPhone, customerEmail } = req.body;

      if (!branchId) {
        return res
          .status(400)
          .json({ status: "error", message: "Branch ID is required" });
      }

      const cart = await CartService.getCart(userId, sessionId);

      if (!cart || cart.items.length === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "Cart is empty" });
      }

      // Fetch branch and build product map
      const branch = await Branch.findById(branchId).lean();
      if (!branch) {
        return res
          .status(404)
          .json({ status: "error", message: "Branch not found" });
      }

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

      // Compute totalAmount & valid items
      let totalAmount = 0;
      const validItems = [];

      for (const item of cart.items) {
        const branchProduct = branchProductMap.get(item.productId.toString());

        if (!branchProduct?.isAvailable) {
          continue; // skip unavailable items
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

        const subtotal = (discountedPrice + customizationTotal) * item.quantity;
        totalAmount += subtotal;

        validItems.push({
          ...item.toObject(),
          price,
          discountPercentage,
          discountedPrice,
          subtotal,
        });
      }

      if (validItems.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "No valid items in cart for this branch",
        });
      }

      // Create or update Stripe payment intent and order
      let paymentIntent;
      let order;

      let existingOrder = null;
      if (userId) {
        existingOrder = await Order.findOne({ userId, branchId, paymentStatus: "pending" });
      }

      if (existingOrder) {
        try {
          // Attempt to update existing Stripe PaymentIntent
          paymentIntent = await stripe.paymentIntents.update(existingOrder.paymentIntentId as string, {
            amount: Math.round(totalAmount * 100),
            metadata: { userId: userId || "guest" },
          });
        } catch (err) {
          // If the intent cannot be updated (e.g. it was canceled), create a new one
          paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // cents
            currency: "aud",
            metadata: { userId: userId || "guest" },
          });
        }

        // Update the existing order in the database
        existingOrder.set("items", validItems);
        existingOrder.totalAmount = totalAmount;
        existingOrder.specialInstructions = specialInstructions;
        existingOrder.paymentIntentId = paymentIntent.id;
        await existingOrder.save();
        
        order = existingOrder;
      } else {
        // No existing pending order found, create a new intent and order
        paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(totalAmount * 100), // cents
          currency: "aud",
          metadata: { userId: userId || "guest" },
        });

        const readableOrderId = await generateOrderId();

        order = await Order.create({
          orderId: readableOrderId,
          userId,
          items: validItems,
          totalAmount,
          paymentIntentId: paymentIntent.id,
          paymentStatus: "pending",
          branchId,
          specialInstructions,
          customerPhone,
          customerEmail,
        });
      }

      res.status(200).json({
        status: "success",
        clientSecret: paymentIntent.client_secret,
        orderId: order.orderId,
        mongoId: order._id,
      });
    } catch (error) {
      console.error("Stripe PaymentIntent Error:", error);
      res
        .status(500)
        .json({ status: "error", message: "Payment creation failed" });
    }
  }

}
