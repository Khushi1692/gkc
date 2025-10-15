import { Request, Response } from "express";
import { Branch } from "../models/branch.models";
import { Product } from "../models/product.models";
import { Category } from "../models/category.models";

/**
 * MenuController
 * Handles operations related to branch menus, including:
 * - Fetching categories available in a branch
 * - Fetching products by category for a branch
 */
export class MenuController {
  /**
   * Get all categories that have available products in a branch menu.
   *
   * @param {string} branchId - ID of the branch
   * @returns {Array} List of active categories sorted by sortOrder
   */
  static async getMenuCategoriesByBranch(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { branchId } = req.params;

      // Fetch branch menu
      const branch = await Branch.findById(branchId).select("menu").lean();
      if (!branch) {
        res.status(404).json({ status: "error", message: "Branch not found" });
        return;
      }

      // Extract unique category IDs from available menu items
      const categoryIds = [
        ...new Set(
          branch.menu
            .filter((m) => m.isAvailable)
            .map((m) => m.categoryId.toString())
        ),
      ];

      // Fetch active categories from DB and sort
      const categories = await Category.find({
        _id: { $in: categoryIds },
        isActive: true,
      })
        .sort({ sortOrder: 1 })
        .lean();

      res.json({ status: "success", categories });
    } catch (error) {
      console.error("Get menu categories error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  /**
   * Get products for a particular category in a branch menu.
   * Merges branch-specific price if available, otherwise uses basePrice.
   *
   * @param {string} branchId - ID of the branch
   * @param {string} categoryId - ID of the category
   * @returns {Array} List of active products with branch-specific prices
   */
  static async getMenuProductsByCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { branchId, categoryId } = req.params;

      // Fetch branch menu
      const branch = await Branch.findById(branchId).select("menu").lean();
      if (!branch) {
        res.status(404).json({ status: "error", message: "Branch not found" });
        return;
      }

      // Filter menu items by category and availability
      const menuItems = branch.menu.filter(
        (m) => m.isAvailable && m.categoryId.toString() === categoryId
      );

      // Fetch product details from DB
      const productIds = menuItems.map((m) => m.productId);
      const products = await Product.find({
        _id: { $in: productIds },
        isActive: true,
      }).lean();

      // Merge branch-specific price with product details
      const productMap = new Map(products.map((p) => [p._id.toString(), p]));
      const result = menuItems.map((item) => ({
        ...productMap.get(item.productId.toString()),
        price:
          item.price ?? productMap.get(item.productId.toString())?.basePrice,
      }));

      res.json({ status: "success", products: result });
    } catch (error) {
      console.error("Get menu products error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
