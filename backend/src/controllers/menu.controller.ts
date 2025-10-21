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

      const branch = await Branch.findById(branchId).select("menu").lean();
      if (!branch) {
        res.status(404).json({ status: "error", message: "Branch not found" });
        return;
      }

      // Extract categoryIds that have at least one available product
      const categoryIds = branch.menu
        .filter((cat) => cat.products.some((p) => p.isAvailable))
        .map((cat) => cat.categoryId.toString());

      const categories = await Category.find({
        _id: { $in: categoryIds },
        isActive: true,
      })
        .sort({ sortOrder: 1 })
        .lean();

      res.json({
        status: "success",
        message: "Categories fetched successfully",
        data: categories,
      });
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

      const branch = await Branch.findById(branchId).select("menu").lean();
      if (!branch) {
        res.status(404).json({ status: "error", message: "Branch not found" });
        return;
      }

      // Find the category block in the menu
      const categoryBlock = branch.menu.find(
        (c) => c.categoryId.toString() === categoryId
      );

      if (!categoryBlock) {
        res
          .status(404)
          .json({ status: "error", message: "Category not found in menu" });
        return;
      }

      // Filter available products
      const menuItems = categoryBlock.products.filter((p) => p.isAvailable);
      const productIds = menuItems.map((p) => p.productId);

      const products = await Product.find({
        _id: { $in: productIds },
        isActive: true,
      }).lean();

      // Merge price
      const productMap = new Map(products.map((p) => [p._id.toString(), p]));
      const result = menuItems.map((item) => ({
        ...productMap.get(item.productId.toString()),
        price:
          item.price ?? productMap.get(item.productId.toString())?.basePrice,
      }));

      res.json({
        status: "success",
        message: "Products fetched successfully",
        data: result,
      });
    } catch (error) {
      console.error("Get menu products error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
