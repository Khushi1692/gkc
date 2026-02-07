import { Order } from "../models/order.models";
import { getMqttClient } from "./mqtt.client";
import { printJobs } from "./print.jobs";
import { PrintableOrder } from "../types/order.types";
import { EscPosBuilder } from "../utils/escpos";

const MAX_RETRIES = 3;
const ACK_TIMEOUT = 50000;

export class PrinterService {
  static async printOrderReceipt(orderId: string): Promise<void> {
    const order = (await Order.findById(orderId)
      .populate("branchId")
      .lean()) as PrintableOrder | null;

    if (!order) throw new Error("Order not found");
    if (order.printedAt) {
      console.log("⚠️ Order already printed");
      return;
    }

    const printer = order.branchId.printer;
    if (!printer?.enabled) {
      console.log("⚠️ Printer disabled for this branch");
      return;
    }

    // Use a simplified unique ID for the print job
    const jobId = `job_${order._id}`;
    const client = getMqttClient();

    // 1️⃣ Generate Professional ESC/POS Receipt
    const receiptBuffer = this.buildReceipt(order);

    // 2️⃣ Build HS-830 Binary Packet
    const flag = Buffer.from([0x03]); // Need Reply
    const replyTopic = Buffer.from([0x00]); // Default reply topic
    const ticketId = Buffer.concat([
      Buffer.from(jobId, "utf-8"),
      Buffer.from([0x00]), // Null terminator
    ]);

    const payload = Buffer.concat([flag, replyTopic, ticketId, receiptBuffer]);

    return new Promise((resolve, reject) => {
      const send = () => {
        const existingJob = printJobs.get(jobId);
        const retries = existingJob ? existingJob.retries : 0;

        // Use the cmdTopic from DB (e.g. Prn3F1C...)
        client.publish(printer.mqtt.cmdTopic, payload, { qos: 1 });

        const timeout = setTimeout(async () => {
          const job = printJobs.get(jobId);
          if (!job) return;

          if (job.retries >= MAX_RETRIES) {
            printJobs.delete(jobId);
            await Order.findByIdAndUpdate(order._id, {
              printStatus: "failed",
              $inc: { printAttempts: 1 },
            });
            reject(new Error("Print ACK timeout"));
            return;
          }

          job.retries++;
          await Order.findByIdAndUpdate(order._id, {
            $inc: { printAttempts: 1 },
          });
          send();
        }, ACK_TIMEOUT);

        printJobs.set(jobId, {
          retries,
          timeout,
          printerId: printer.mqtt.cmdTopic,
          resolve: async () => {
            clearTimeout(timeout);
            printJobs.delete(jobId);
            await Order.findByIdAndUpdate(order._id, {
              printedAt: new Date(),
              printStatus: "printed",
            });
            resolve();
          },
          reject,
        });
      };
      send();
    });
  }

  // 🖨️ PROFESSIONAL RECEIPT DESIGN
  private static buildReceipt(order: PrintableOrder): Buffer {
    const b = new EscPosBuilder();

    // 1. Header Section
    b.init()
      .alignCenter()
      .setSize(2, 2) // Double Width & Height
      .bold(true)
      .text(order.branchId.name) // Restaurant Name
      .bold(false)
      .setSize(1, 1) // Reset size
      .newLine();

    b.newLine()
      .text("------------------------------------------------")
      .newLine();

    // 2. Order Meta Data
    // Clean up Order ID (Take last 6 chars if it's too long)
    const shortOrderId =
      order.orderId.length > 10
        ? "..." + order.orderId.slice(-6)
        : order.orderId;

    const dateStr = new Date(order.createdAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    b.alignLeft()
      .text(`Order #: ${shortOrderId}`)
      .alignRight()
      .text(dateStr) // Print Date on right (requires calc, simplified here)
      .newLine()
      .alignLeft()
      .text("------------------------------------------------")
      .newLine();

    // 3. Items Header
    b.bold(true)
      .row("Qty Item", "Price") // Custom row helper
      .bold(false)
      .newLine();

    // 4. Items List
    let calculatedTotal = 0;
    order.items.forEach((item) => {
      const productName = item.productId?.name ?? "Unknown Item";
      const qty = `${item.quantity}x`;

      // Fix Price Decimals (e.g. 11.691 -> 11.69)
      const price = parseFloat(item.subtotal?.toString() || "0").toFixed(2);
      calculatedTotal += parseFloat(price);

      // Print: "1x  Burger                $10.00"
      b.row(`${qty} ${productName}`, `$${price}`);
    });

    // 5. Totals Section
    b.newLine()
      .text("------------------------------------------------")
      .newLine();

    // Total (Large & Bold)
    const total = (order.totalAmount || calculatedTotal).toFixed(2);

    b.alignRight()
      .setSize(2, 2)
      .bold(true)
      .text(`TOTAL: $${total}`)
      .setSize(1, 1)
      .bold(false)
      .newLine(2);

    // 6. Footer
    b.alignCenter().text("Thank you for dining with us!").newLine(4).cut();

    return b.build();
  }
}
