import escpos from "escpos";
import Network from "escpos-network";
import { Types } from "mongoose";
import { Branch } from "../models/branch.models";
import { Order } from "../models/order.models";

interface PrinterConfig {
  ip: string;
  port: number;
}

export class PrinterService {
  // Get printer config dynamically from Branch
  private static async getPrinterConfig(
    branchId: Types.ObjectId
  ): Promise<PrinterConfig> {
    const branch = await Branch.findById(branchId).lean();
    if (!branch || !branch.printerIp) {
      throw new Error(`No printer configured for branch ${branchId}`);
    }

    return {
      ip: branch.printerIp,
      port: branch.printerPort || 9100,
    };
  }

  // Print order receipt
  static async printOrderReceipt(orderId: string): Promise<void> {
    const order = await Order.findById(orderId)
      .populate("branchId")
      .populate({
        path: "items.productId",
        select: "_id name",
      })
      .populate({
        path: "userId",
        select: "_id name email",
      })
      .lean();

    if (!order) throw new Error(`Order ${orderId} not found`);

    const branch = order.branchId as any;
    const printerConfig = {
      ip: branch.printerIp,
      port: branch.printerPort || 9100,
    };

    return new Promise((resolve, reject) => {
      const device = new Network(printerConfig.ip, printerConfig.port);

      // Timeout safeguard (5s)
      const timeout = setTimeout(() => {
        device.close();
        reject(new Error("Printer connection timeout"));
      }, 5000);

      device.open((err?: Error) => {
        clearTimeout(timeout);
        if (err) {
          console.error("Printer connection error:", err);
          reject(err);
          return;
        }

        try {
          const printer = new escpos.Printer(device as any, {
            encoding: "UTF-8",
          });

          printer
            .font("A")
            .align("CT")
            .style("BU")
            .size(2, 2)
            .text(branch.name || "Restaurant")
            .size(1, 1)
            .style("NORMAL")
            .text(branch.address || "")
            .text("--------------------------------")
            .text(`Order #${order.orderId}`)
            .text(new Date(order.createdAt).toLocaleString())
            .text("--------------------------------")
            .feed(1);

          if (order.userId) {
            const user = order.userId as any;
            printer
              .align("LT")
              .style("B")
              .text("CUSTOMER DETAILS:")
              .style("NORMAL");

            if (user?.name) printer.text(`Name: ${user.name}`);

            if (user?.email) printer.text(`Email: ${user.email}`);

            printer.text("--------------------------------").feed(1);
          }

          printer.align("LT").style("B").text("ITEMS:").style("NORMAL");

          order.items.forEach((item: any) => {
            printer.tableCustom([
              {
                text: `${item.quantity}x ${item.productId?.name || "Item"}`,
                align: "LEFT",
                width: 0.6,
              },
              {
                text: `$${item.subtotal.toFixed(2)}`,
                align: "RIGHT",
                width: 0.4,
              },
            ] as any);

            if (item.price !== item.discountedPrice) {
              printer.text(
                `   Original: $${item.price.toFixed(
                  2
                )} | Discounted: $${item.discountedPrice.toFixed(2)}`
              );
            }

            if (item.customizations?.length) {
              item.customizations.forEach((custom: any) => {
                printer.text(`   ${custom.groupName}:`);
                custom.selectedOptions.forEach((option: any) => {
                  const mod =
                    option.priceModifier > 0
                      ? ` (+$${option.priceModifier.toFixed(2)})`
                      : "";
                  printer.text(`     - ${option.name}${mod}`);
                });
              });
            }

            printer.feed(1);
          });

          if (order.specialInstructions) {
            printer
              .text("--------------------------------")
              .style("B")
              .text("SPECIAL INSTRUCTIONS:")
              .style("NORMAL")
              .text(order.specialInstructions)
              .feed(1);
          }

          printer
            .text("--------------------------------")
            .align("RT")
            .style("BU")
            .size(2, 2)
            .text(`TOTAL: $${order.totalAmount.toFixed(2)}`)
            .size(1, 1)
            .style("NORMAL")
            .feed(1);

          printer
            .align("CT")
            .text("--------------------------------")
            .text("Thank you for your order!")
            .text("================================")
            .feed(2)
            .cut()
            .close(() => {
              console.log(`✅ Receipt printed for order ${order.orderId}`);
              resolve();
            });
        } catch (printErr) {
          console.error("Print error:", printErr);
          try {
            device.close();
          } catch {}
          reject(printErr);
        }
      });
    });
  }

  // Test printer connection for a branch
  static async testPrinter(branchId: Types.ObjectId): Promise<boolean> {
    const printerConfig = await this.getPrinterConfig(branchId);
    return new Promise((resolve) => {
      const device = new Network(printerConfig.ip, printerConfig.port);
      device.open((err?: Error) => {
        if (err) {
          console.error("Printer test failed:", err);
          resolve(false);
          return;
        }
        const printer = new escpos.Printer(device as any);
        printer
          .text("Printer connection test successful!")
          .feed(2)
          .cut()
          .close(() => {
            console.log(`✅ Printer test successful for branch ${branchId}`);
            resolve(true);
          });
      });
    });
  }
}
