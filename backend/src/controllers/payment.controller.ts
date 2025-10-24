import Stripe from "stripe";
import { config } from "../config/config";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { CartService } from "../services/cart.service";
import { Order } from "../models/order.models";
import { generateOrderId } from "../utils/orderUtils";

const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: "2025-09-30.clover",
});

export class PaymentController {
  static async createPaymentIntent(req: AuthRequest, res: Response) {
    try {
      const { userId, sessionId } = req;
      const { branchId, specialInstructions } = req.body;

      const cart = await CartService.getCart(userId, sessionId);

      if (!cart || cart.items.length === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "Cart is empty" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(cart.totalAmount * 100), // convert to cents
        currency: "aud",
        metadata: {
          userId: userId || "guest",
        },
      });

      const readableOrderId = await generateOrderId();

      const order = await Order.create({
        orderId: readableOrderId,
        userId,
        items: cart.items,
        totalAmount: cart.totalAmount,
        paymentIntentId: paymentIntent.id,
        paymentStatus: "pending",
        branchId,
        specialInstructions,
      });

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
