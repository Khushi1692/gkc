import { Router } from "express";
import { BranchController } from "../controllers/branch.controller";
import { validateRequest } from "../middleware/validate";
import { addBranchSchema } from "../validators/branch.validators";

const router = Router();

/**
 * @route   GET /branches/nearest
 * @desc    Get the nearest branch (for header selection)
 * @query   lat {number} - User's latitude (required)
 * @query   lng {number} - User's longitude (required)
 * @access  Public
 */
router.get("/nearest", BranchController.getNearestBranch);

/**
 * @route   GET /branches
 * @desc    Get all branches sorted by nearest first (for branch switch)
 * @query   lat {number} - User's latitude (required)
 * @query   lng {number} - User's longitude (required)
 * @access  Public
 */
router.get("/", BranchController.getAllBranchesNearest);

/**
 * @route   GET /branches/:branchId/status
 * @desc    Check if a branch is open now and its operating hours
 * @param   branchId {string} - ID of the branch
 * @access  Public
 */
router.get("/:branchId/status", BranchController.checkBranchStatus);

router.post(
  "/",
  validateRequest(addBranchSchema),
  BranchController.createBranch
);

router.get("/:branchId", BranchController.getBranchById);

export default router;
