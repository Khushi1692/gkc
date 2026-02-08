import { Order } from "../models/order.models";
import { PrintableOrder } from "../types/order.types";
import { generateReceiptBase64 } from "../utils/escpos";
import { getMqttClient } from "./mqtt.client";
import { printJobs } from "./print.jobs";

const MAX_RETRIES = 3;
const ACK_TIMEOUT = 50000;

export class PrinterService {
  static async printOrderReceipt(orderId: string): Promise<void> {
    const order = (await Order.findById(orderId)
      .populate("branchId")
      .populate("items.productId")
      .populate("userId", "name")) as PrintableOrder | null;

    console.log(order);

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

    const base64 = await generateReceiptBase64(order);

    // 2. Build payload
    const payload = {
      ticket_id: order.orderId,
      data_type: "pdf",
      data_base64: base64,
      paper_type: 1,
      paper_width_mm: 72,
      paper_height_mm: 0,
      cut_paper: 1,
    };

    // 2️⃣ Build HS-830 Binary Packet
    const flag = Buffer.from([0x03]); // Need Reply
    const replyTopic = Buffer.from([0x00]); // Default reply topic
    const ticketId = Buffer.concat([
      Buffer.from(jobId, "utf-8"),
      Buffer.from([0x00]), // Null terminator
    ]);

    // const payload = Buffer.concat([flag, replyTopic, ticketId, receiptBuffer]);

    return new Promise((resolve, reject) => {
      const send = () => {
        const existingJob = printJobs.get(jobId);
        const retries = existingJob ? existingJob.retries : 0;

        // Use the cmdTopic from DB (e.g. Prn3F1C...)
        client.publish(printer.mqtt.cmdTopic, JSON.stringify(payload), {
          qos: 1,
        });

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
}
