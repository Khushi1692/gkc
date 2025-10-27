import { Order } from "../models/order.models";

export async function generateOrderId(): Promise<string> {
  const today = new Date();
  const datePart = today.toISOString().slice(0, 10).replace(/-/g, ""); // e.g. 20251024
  const timePart = today.toISOString().slice(11, 19).replace(/:/g, "");

  // Count today's orders to create sequence
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const count = await Order.countDocuments({
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  const sequence = String(count + 1).padStart(4, "0"); // e.g. 0001
  return `ORD-${datePart}-${timePart}-${sequence}`;
}
