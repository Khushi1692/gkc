/**
 * Test script: generates a receipt PDF from dummy order data and saves it locally.
 * Run with: npx ts-node src/scripts/test_receipt.ts
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { generateReceiptBase64 } from "../utils/escpos.js";
import { PrintableOrder } from "../types/order.types.js";
import { Types } from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dummyOrder: PrintableOrder = {
  _id: new Types.ObjectId(),
  orderId: "GKC-00123",
  userId: {
    _id: new Types.ObjectId(),
    name: "Rahul Sharma",
    email: "rahul@example.com",
  },
  customerEmail: "rahul@example.com",
  customerPhone: "+61 412 345 678",
  branchId: {
    _id: new Types.ObjectId(),
    name: "Gopi Ka Chatka - Clayton",
    address: "Shop 5, 123 Clayton Rd, Clayton VIC 3168",
    phone: "(03) 9000 0000",
    printer: {
      enabled: true,
      mqtt: {
        cmdTopic: "test/printer/cmd",
      },
    },
  },
  items: [
    {
      productId: { _id: new Types.ObjectId(), name: "Pani Puri (6 pcs)" },
      quantity: 2,
      price: 10.0,
      discountPercentage: 0,
      discountedPrice: 10.0,
      subtotal: 20.0,
      customizations: [
        {
          groupName: "Spice Level",
          selectedOptions: [{ name: "Extra Spicy", priceModifier: 0 }],
        },
      ],
    },
    {
      productId: { _id: new Types.ObjectId(), name: "Masala Chai" },
      quantity: 1,
      price: 4.5,
      discountPercentage: 10,
      discountedPrice: 4.05,
      subtotal: 4.05,
      customizations: [],
    },
    {
      productId: { _id: new Types.ObjectId(), name: "Vada Pav Burger" },
      quantity: 1,
      price: 12.0,
      discountPercentage: 0,
      discountedPrice: 12.0,
      subtotal: 14.5,
      customizations: [
        {
          groupName: "Add-ons",
          selectedOptions: [
            { name: "Extra Chutney", priceModifier: 0.5 },
            { name: "Cheese Slice", priceModifier: 2.0 },
          ],
        },
      ],
    },
  ],
  totalAmount: 38.55,
  specialInstructions: "Please make it less oily. No onions on the Vada Pav.",
  paymentIntentId: "pi_test_abc123xyz",
  paymentStatus: "paid",
  printStatus: "pending",
  printAttempts: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

async function main() {
  console.log("🖨️  Generating receipt PDF...");

  const base64 = await generateReceiptBase64(dummyOrder);
  const pdfBuffer = Buffer.from(base64, "base64");

  const outputPath = path.join(__dirname, "test_receipt_output.pdf");
  fs.writeFileSync(outputPath, pdfBuffer);

  console.log(`✅ Receipt saved to: ${outputPath}`);
  console.log(`   Open the file to preview the receipt.`);
}

main().catch((err) => {
  console.error("❌ Error generating receipt:", err);
  process.exit(1);
});
