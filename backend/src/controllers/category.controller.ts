import { Request, Response } from "express";
import { Category } from "../models/category.models";

export class CategoryController {
  // Add new category
  static async addCategory(req: Request, res: Response) {
    try {
      const { name, sortOrder, isActive } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }

      const existing = await Category.findOne({ name });
      if (existing) {
        return res.status(400).json({ message: "Category already exists" });
      }

      const category = await Category.create({ name, sortOrder, isActive });
      return res.status(201).json({ message: "Category added", category });
    } catch (error) {
      console.error("Add Category Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
