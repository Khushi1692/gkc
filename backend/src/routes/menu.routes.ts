import { Router } from "express";
import { MenuController } from "../controllers/menu.controller";

const router = Router();

/**
 * @route   GET /menu/:branchId/categories
 * @desc    Get all categories with available products for a branch
 * @access  Public
 */
router.get(
  "/:branchId/categories",
  MenuController.getMenuCategoriesByBranch
);

/**
 * @route   GET /menu/:branchId/products/:categoryId
 * @desc    Get products by category for a branch, with branch-specific prices
 * @access  Public
 */
router.get(
  "/:branchId/products/:categoryId",
  MenuController.getMenuProductsByCategory
);

export default router;
