import { Request, Response } from "express";
import { Product } from "../models/product.models";
import { Category } from "../models/category.models";

export class ProductController {
  // Add new product
  static async addProduct(req: Request, res: Response) {
    try {
      const {
        name,
        description,
        categoryId,
        image,
        basePrice,
        isVegetarian,
        isActive,
        customizations,
      } = req.body;

      if (!name || !categoryId || !basePrice) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Validate category
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found" });
      }

      const product = await Product.create({
        name,
        description,
        categoryId,
        image,
        basePrice,
        isVegetarian,
        isActive,
        customizations,
      });

      res.status(201).json({ message: "Product added", product });
    } catch (error) {
      console.error("Add Product Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
