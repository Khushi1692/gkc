import { Router } from "express";
import { BranchController } from "../controllers/branch.controller";

const router = Router();

/**
 * @route   GET /branches/nearest-header
 * @desc    Get the nearest branch (for header selection)
 * @query   lat {number} - User's latitude (required)
 * @query   lng {number} - User's longitude (required)
 * @access  Public
 */
router.get("/nearest-header", BranchController.getNearestBranch);

/**
 * @route   GET /branches/nearest
 * @desc    Get all branches sorted by nearest first (for branch switch)
 * @query   lat {number} - User's latitude (required)
 * @query   lng {number} - User's longitude (required)
 * @access  Public
 */
router.get("/nearest", BranchController.getAllBranchesNearest);

/**
 * @route   GET /branches/:branchId/status
 * @desc    Check if a branch is open now and its operating hours
 * @param   branchId {string} - ID of the branch
 * @access  Public
 */
router.get("/:branchId/status", BranchController.checkBranchStatus);

export default router;
