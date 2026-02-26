import express, { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { config } from "../config/config";
import { Order } from "../models/order.models";
import { PrinterService } from "../services/printer.service";
import { EmailService } from "../services/email.service";

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
        try {
          const order = await Order.findOneAndUpdate(
            { paymentIntentId: paymentIntent.id },
            { paymentStatus: "paid" },
            { new: true }
          )
            .populate("userId", "name email")
            .populate("branchId", "name email printerIp printerPort address")
            .populate("items.productId", "name")
            .lean();

          if (!order) {
            console.warn(
              `⚠️ No order found for paymentIntent: ${paymentIntent.id}`
            );
            break;
          }
          console.log(`✅ Order ${order.orderId} paid successfully`);

          try {
            await PrinterService.printOrderReceipt(order._id.toString());
            console.log(`🖨️ Receipt printed for order ${order.orderId}`);
          } catch (printErr) {
            console.error(`⚠️ Failed to print receipt:`, printErr);
          }

          try {
            const branch = order.branchId as any;
            const user = order.userId as any;

            if (user.email) {
              await EmailService.sendOrderConfirmationEmail(
                user.email,
                user.name,
                order,
                branch.name
              );
            }

            await EmailService.sendOrderConfirmationEmail(
              config.adminEmail,
              "Owner",
              order,
              branch.name,
              true
            );
            
            if (branch?.email) {
              await EmailService.sendOrderConfirmationEmail(
                branch.email,
                "Branch Owner",
                order,
                branch.name,
                true
              );
            }

            console.log(`📧 Order confirmation emails sent successfully`);
          } catch (emailErr) {
            console.error(`⚠️ Failed to send confirmation emails:`, emailErr);
          }
        } catch (err) {
          console.error("Failed to update order payment status:", err);
        }
        break;

      case "payment_intent.payment_failed":
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        try {
          await Order.findOneAndUpdate(
            { paymentIntentId: failedIntent.id },
            { paymentStatus: "failed" },
            { new: true }
          );
        } catch (err) {
          console.error("Failed to update order payment status:", err);
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

export default router;
