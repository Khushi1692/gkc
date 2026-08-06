import { Order } from "../models/order.models";
import { PrintableOrder } from "../types/order.types";
import { generateReceiptBase64 } from "../utils/escpos";
import { getMqttClient } from "./mqtt.client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const isDev = process.env.NODE_ENV !== "production";

// const MAX_RETRIES = 3;
// const ACK_TIMEOUT = 50000;

export class PrinterService {
  static async printOrderReceipt(orderId: string): Promise<void> {
    const order = (await Order.findById(orderId)
      .populate("branchId")
      .populate("items.productId")
      .populate("userId", "name email")) as PrintableOrder | null;

    console.log(order);

    if (!order) throw new Error("Order not found");
    if (order.printedAt) {
      console.log("⚠️ Order already printed");
      return;
    }

    const printer = order.branchId.printer;

    // In production, skip if printer is disabled
    if (!isDev && !printer?.enabled) {
      console.log("⚠️ Printer disabled for this branch");
      return;
    }

    // 1️⃣ Generate receipt PDF
    const base64 = await generateReceiptBase64(order);

    // 🧪 DEV MODE: Save receipt PDF to disk for easy inspection
    if (isDev) {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const outputDir = path.join(__dirname, "../../receipts");
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
      const filePath = path.join(outputDir, `receipt_${order.orderId}.pdf`);
      fs.writeFileSync(filePath, Buffer.from(base64, "base64"));
      console.log(`📄 [DEV] Receipt PDF saved to: ${filePath}`);
    }

    // 2️⃣ PRODUCTION: Publish to MQTT printer
    if (!isDev && printer?.enabled) {
      const payload = {
        ticket_id: order.orderId,
        data_type: "pdf",
        data_base64: base64,
        paper_type: 1,
        paper_width_mm: 72,
        paper_height_mm: 0,
        cut_paper: 1,
      };
      const client = getMqttClient();
      client.publish(printer.mqtt.cmdTopic, JSON.stringify(payload), { qos: 0 });
      console.log("🖨 Print command sent via MQTT");
    }

    // Mark as printed
    await Order.findByIdAndUpdate(order._id, {
      printedAt: new Date(),
      printStatus: "printed",
      $inc: { printAttempts: 1 },
    });

    // const payload = Buffer.concat([flag, replyTopic, ticketId, receiptBuffer]);

    // return new Promise((resolve, reject) => {
    //   const send = () => {
    //     const existingJob = printJobs.get(jobId);
    //     const retries = existingJob ? existingJob.retries : 0;

    //     // Use the cmdTopic from DB (e.g. Prn3F1C...)
    //     client.publish(printer.mqtt.cmdTopic, JSON.stringify(payload), {
    //       qos: 1,
    //     });

    //     const timeout = setTimeout(async () => {
    //       const job = printJobs.get(jobId);
    //       if (!job) return;

    //       if (job.retries >= MAX_RETRIES) {
    //         printJobs.delete(jobId);
    //         await Order.findByIdAndUpdate(order._id, {
    //           printStatus: "failed",
    //           $inc: { printAttempts: 1 },
    //         });
    //         reject(new Error("Print ACK timeout"));
    //         return;
    //       }

    //       job.retries++;
    //       await Order.findByIdAndUpdate(order._id, {
    //         $inc: { printAttempts: 1 },
    //       });
    //       send();
    //     }, ACK_TIMEOUT);

    //     printJobs.set(jobId, {
    //       retries,
    //       timeout,
    //       printerId: printer.mqtt.cmdTopic,
    //       resolve: async () => {
    //         clearTimeout(timeout);
    //         printJobs.delete(jobId);
    //         await Order.findByIdAndUpdate(order._id, {
    //           printedAt: new Date(),
    //           printStatus: "printed",
    //         });
    //         resolve();
    //       },
    //       reject,
    //     });
    //   };
    //   send();
    // });
  }
}
