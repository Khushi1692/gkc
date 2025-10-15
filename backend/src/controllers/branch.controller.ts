import { Request, Response } from "express";
import { Branch } from "../models/branch.models";
import { Product } from "../models/product.models";
import { Category } from "../models/category.models";

/**
 * BranchController
 * Handles branch-related operations such as fetching nearest branch,
 * all branches sorted by distance, and branch status (open/closed).
 */
export class BranchController {
  /**
   * Get the nearest branch to the provided coordinates.
   * Used for header display / default branch selection.
   *
   * @query {string} lat - Latitude of the user
   * @query {string} lng - Longitude of the user
   * @returns {object} Nearest branch with distance in km
   */
  static async getNearestBranch(req: Request, res: Response): Promise<void> {
    try {
      const { lat, lng } = req.query;

      const coords = validateCoordinates(lat as string, lng as string);
      if (!coords) {
        res.status(400).json({
          status: "error",
          message: "Invalid latitude or longitude values",
        });
        return;
      }
      const { latitude, longitude } = coords;

      const branches = await Branch.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [longitude, latitude] },
            distanceField: "distance",
            spherical: true,
            query: { isActive: true },
          },
        },
        { $limit: 1 }, // only the nearest branch
        {
          $project: {
            name: 1,
            address: 1,
            phone: 1,
            email: 1,
            location: 1,
            distance: { $divide: ["$distance", 1000] }, // convert meters → km
          },
        },
      ]);

      if (!branches.length) {
        res.status(404).json({
          status: "error",
          message: "No active branches found nearby",
        });
        return;
      }

      res.json({ status: "success", branch: branches[0] });
    } catch (error) {
      console.error("Get nearest branches error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  /**
   * Get all branches sorted by nearest distance to the provided coordinates.
   * Used when a user wants to change/select a different branch.
   *
   * @query {string} lat - Latitude of the user
   * @query {string} lng - Longitude of the user
   * @returns {Array} List of branches with distance in km
   */
  static async getAllBranchesNearest(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { lat, lng } = req.query;

      const coords = validateCoordinates(lat as string, lng as string);
      if (!coords) {
        res.status(400).json({
          status: "error",
          message: "Invalid latitude or longitude values",
        });
        return;
      }
      const { latitude, longitude } = coords;

      const branches = await Branch.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [longitude, latitude] },
            distanceField: "distance",
            spherical: true,
            query: { isActive: true },
          },
        },
        { $sort: { distance: 1 } },
        {
          $project: {
            name: 1,
            address: 1,
            phone: 1,
            email: 1,
            location: 1,
            distance: { $divide: ["$distance", 1000] }, // meters → km
          },
        },
      ]);

      res.json({ status: "success", branches });
    } catch (error) {
      console.error("Get all branches error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  /**
   * Check if a specific branch is currently open and its operating hours.
   *
   * @param {string} branchId - ID of the branch
   * @returns {object} Branch status with isOpen, currentTime, and today’s hours
   */
  static async checkBranchStatus(req: Request, res: Response): Promise<void> {
    try {
      const { branchId } = req.params;

      const branch = await Branch.findOne({
        _id: branchId,
        isActive: true,
      }).select("name operatingHours");

      if (!branch) {
        res.status(404).json({
          status: "error",
          message: "Branch not found",
        });
        return;
      }

      const isOpen = (branch as any).isOpenNow();
      const now = new Date();
      const currentDay = now
        .toLocaleString("en-US", { weekday: "long" })
        .toLowerCase();
      const todayHours = branch.operatingHours.find(
        (h: any) => h.day === currentDay
      );

      res.json({
        status: "success",
        data: {
          branchId: branch._id,
          branchName: branch.name,
          isOpen,
          currentTime: now.toTimeString().slice(0, 5),
          todayHours: todayHours || null,
        },
      });
    } catch (error) {
      console.error("Check branch status error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  /**
   * @route   POST /branches
   * @desc    Create a new branch
   * @access  Admin
   */
  static async createBranch(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        email,
        phone,
        address,
        location,
        operatingHours,
        menu,
        isActive,
      } = req.body;

      // ✅ Validate referenced category & product IDs exist
      for (const menuCategory of menu) {
        const categoryExists = await Category.exists({
          _id: menuCategory.categoryId,
        });
        if (!categoryExists) {
          res.status(400).json({
            status: "error",
            message: `Category not found: ${menuCategory.categoryId}`,
          });
          return;
        }

        for (const product of menuCategory.products) {
          const productExists = await Product.exists({
            _id: product.productId,
          });
          if (!productExists) {
            res.status(400).json({
              status: "error",
              message: `Product not found: ${product.productId}`,
            });
            return;
          }
        }
      }

      // ✅ Create and save branch
      const branch = new Branch({
        name,
        email,
        phone,
        address,
        location,
        operatingHours,
        menu,
        isActive,
      });

      await branch.save();

      res.status(201).json({
        status: "success",
        message: "Branch created successfully",
        branch,
      });
    } catch (error) {
      console.error("Create Branch Error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

/**
 * Helper function to validate latitude and longitude.
 * Returns parsed numbers if valid, otherwise false.
 */
const validateCoordinates = (lat?: string, lng?: string) => {
  if (!lat || !lng) return false;
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);
  if (
    isNaN(latitude) ||
    isNaN(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  )
    return false;
  return { latitude, longitude };
};
