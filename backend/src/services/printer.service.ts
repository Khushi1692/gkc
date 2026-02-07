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

    const jobId = `order_${order.orderId}_${Date.now()}`;
    const client = getMqttClient();

    // 1️⃣ Generate ESC/POS Binary Data (Receipt Design)
    const receiptBuffer = this.buildReceipt(order);

    // 2️⃣ Build HS-830 Specific Binary Packet
    // Protocol Source: Manual Page 17, Section 8.1.4

    // [Flag]: 0x03 -> (0x01 "Need Reply" | 0x02 "Has Ticket ID")
    const flag = Buffer.from([0x03]);

    // [ReplyTopic]: 0x00 -> Use default "TicketReplay" topic from Printer Tool
    const replyTopic = Buffer.from([0x00]);

    // [TicketID]: Unique ID ending with NULL byte (0x00)
    const ticketId = Buffer.concat([
      Buffer.from(jobId, "utf-8"),
      Buffer.from([0x00]),
    ]);

    // Combine into final Payload
    const payload = Buffer.concat([flag, replyTopic, ticketId, receiptBuffer]);

    return new Promise((resolve, reject) => {
      const send = () => {
        const existingJob = printJobs.get(jobId);
        const retries = existingJob ? existingJob.retries : 0;

        // PUBLISH BINARY PAYLOAD (Not JSON)
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

  // 🖨️ ESC/POS RECEIPT (BINARY)
  private static buildReceipt(order: PrintableOrder): Buffer {
    const b = new EscPosBuilder();

    b.init()
      .alignCenter()
      .bold(true)
      .text(order.branchId.name)
      .bold(false)
      .newLine(2)
      .text(`Order #${order.orderId}`)
      .newLine()
      .text(new Date(order.createdAt).toLocaleString())
      .newLine(2)
      .alignLeft()
      .text("--------------------------------")
      .newLine();

    order.items.forEach((item) => {
      b.text(
        `${item.quantity}x ${item.productId?.name ?? "Item"}  $${item.subtotal}`,
      ).newLine();
    });

    b.text("--------------------------------")
      .newLine()
      .bold(true)
      .text(`TOTAL: $${order.totalAmount}`)
      .bold(false)
      .newLine(3)
      .cut();

    return b.build();
  }
}
