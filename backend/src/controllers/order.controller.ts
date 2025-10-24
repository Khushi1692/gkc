import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Order } from "../models/order.models";

export class OrderController {
  static async getOrders(req: AuthRequest, res: Response) {
    try {
      const { userId } = req;
      const orders = await Order.find({ userId })
        .populate({
          path: "items.productId",
          select: "_id name image description",
        })
        .sort({ createdAt: -1 });
      res.status(200).json({ status: "success", data: orders });
    } catch (error) {
      console.error("Get Orders Error:", error);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }

  static async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) {
        res.status(404).json({ status: "error", message: "Order not found" });
        return;
      }
      res.status(200).json({ status: "success", data: order });
    } catch (error) {
      console.error("Get Order Error:", error);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }
}
