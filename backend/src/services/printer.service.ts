import mqtt from "mqtt";
import { Types } from "mongoose";
import { Branch } from "../models/branch.models";
import { Order } from "../models/order.models";

interface PrinterConfig {
  ip: string;
  port: number;
}

interface MqttPrinterConfig {
  brokerUrl: string;
  username: string;
  password?: string;
  topic: string;
}

export class PrinterService {
  // Get printer config dynamically from Branch
  private static getPrinterConfig(): MqttPrinterConfig {
    return {
      brokerUrl: "mqtt://mqtt1.foodship.com.au:1883",
      username: "rajat",
      topic: "Prn3F1C1A3916353310000013091A1FC0BF",
    };
  }

  // Print order receipt
  static async printOrderReceipt(orderId: string): Promise<void> {
    const order = await Order.findById(orderId)
      .populate("branchId")
      .populate("items.productId", "name")
      .populate("userId", "name email")
      .lean();

    if (!order) throw new Error(`Order ${orderId} not found`);

    const branch = order.branchId as any;
    const user = order.userId as any;

    const receipt = this.buildReceipt(order, branch, user);

    const config = this.getPrinterConfig();

    return new Promise((resolve, reject) => {
      const client = mqtt.connect(config.brokerUrl, {
        clientId: `backend-${Date.now()}`, // MUST match printer ClientID
        username: config.username, // "rajat"
        keepalive: 30,
        clean: true,
        reconnectPeriod: 0,
      });

      client.on("connect", () => {
        console.log("✅ MQTT connected to printer broker");

        client.publish(config.topic, receipt, { qos: 1 }, (err) => {
          if (err) {
            client.end();
            return reject(err);
          }

          console.log("🖨️ Receipt sent to cloud printer");
          client.end();
          resolve();
        });
      });

      client.on("error", (err) => {
        console.error("❌ MQTT error:", err);
        client.end();
        reject(err);
      });
    });
  }

  private static buildReceipt(order: any, branch: any, user: any): string {
    let text = "";

    text += `${branch.name || "Restaurant"}\n`;
    text += `${branch.address || ""}\n`;
    text += "--------------------------------\n";
    text += `Order #${order.orderId}\n`;
    text += `${new Date(order.createdAt).toLocaleString()}\n`;
    text += "--------------------------------\n";

    if (user) {
      text += "CUSTOMER DETAILS:\n";
      if (user.name) text += `Name: ${user.name}\n`;
      if (user.email) text += `Email: ${user.email}\n`;
      text += "--------------------------------\n";
    }

    text += "ITEMS:\n";

    order.items.forEach((item: any) => {
      text += `${item.quantity}x ${
        item.productId?.name || "Item"
      }  $${item.subtotal.toFixed(2)}\n`;
    });

    if (order.specialInstructions) {
      text += "--------------------------------\n";
      text += "SPECIAL INSTRUCTIONS:\n";
      text += `${order.specialInstructions}\n`;
    }

    text += "--------------------------------\n";
    text += `TOTAL: $${order.totalAmount.toFixed(2)}\n`;
    text += "================================\n";
    text += "Thank you for your order!\n\n\n";

    return text;
  }
}
