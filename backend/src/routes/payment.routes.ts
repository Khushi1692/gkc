import express from "express";
import { PaymentController } from "../controllers/payment.controller";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/create-intent", authMiddleware, PaymentController.createPaymentIntent);

export default router;
