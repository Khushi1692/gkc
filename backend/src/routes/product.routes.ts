import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { addProductSchema } from "../validators/product.validators";
import { validateRequest } from "../middleware/validate";

const router = Router();

router.post("/", validateRequest(addProductSchema), ProductController.addProduct);

export default router;
