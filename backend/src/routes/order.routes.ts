import express from "express";
import { OrderController } from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/my-orders", authMiddleware, OrderController.getOrders);
router.get("/:id", authMiddleware, OrderController.getOrderById);

export default router;
