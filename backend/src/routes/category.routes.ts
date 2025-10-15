import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { validateRequest } from "../middleware/validate";
import { addCategorySchema } from "../validators/category.validators";

const router = Router();

router.post(
  "/",
  validateRequest(addCategorySchema),
  CategoryController.addCategory
);

export default router;
