import express from "express";
import { PaymentController } from "../controllers/payment.controller";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/create-intent", authMiddleware, PaymentController.createPaymentIntent);
router.post("/confirm-payment", authMiddleware, PaymentController.confirmPayment);

export default router;
