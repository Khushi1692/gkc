import express, { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { config } from "../config/config";
import { Order } from "../models/order.models";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: "2025-09-30.clover",
});

const endpointSecret = config.stripe.webhookSecret;

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
    } catch (err: any) {
      console.error(`Webhook signature failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const order = await Order.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          { paymentStatus: "paid" }
        );
        if (order) console.log(`✅ Order ${order.orderId} paid successfully`);
        break;

      case "payment_intent.payment_failed":
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        await Order.findOneAndUpdate(
          { paymentIntentId: failedIntent.id },
          { paymentStatus: "failed" }
        );
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

export default router;
