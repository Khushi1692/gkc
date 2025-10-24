// routes/contact.ts
import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { validateRequest } from "../middleware/validate";
import { contactUsSchema } from "../validators/contact.validators";

const router = Router();

// POST /api/contact
router.post(
  "/",
  validateRequest(contactUsSchema),
  ContactController.sendMessage
);

export default router;
