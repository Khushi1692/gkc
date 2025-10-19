import { Router } from "express";
import { optionalAuth } from "../middleware/auth";
import { validateRequest } from "../middleware/validate";
import { addItemToCartSchema } from "../validators/cart.validators";
import { CartController } from "../controllers/cart.controller";

const router = Router();

router.get("/:branchId", optionalAuth, CartController.getCart);
router.post(
  "/:branchId/add",
  validateRequest(addItemToCartSchema),
  optionalAuth,
  CartController.addToCart
);

router.patch(
  "/:branchId/item/:itemId",
  optionalAuth,
  CartController.updateQuantity
);

router.delete(
  "/:branchId/item/:itemId",
  optionalAuth,
  CartController.removeItem
);

router.delete("/clear", optionalAuth, CartController.clearCart);

export default router;
