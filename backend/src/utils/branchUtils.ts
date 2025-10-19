import { Types } from "mongoose";
import { Branch } from "../models/branch.models";

export const isProductAvailableInBranch = async (
  branchId: string,
  productId: string
): Promise<boolean> => {
  const branch = await Branch.findOne({
    _id: new Types.ObjectId(branchId),
    "menu.products.productId": new Types.ObjectId(productId),
  });

  if (!branch) return false;

  // Find if product is available in branch menu
  const category = branch.menu.find((c: any) =>
    c.products.some(
      (p: any) => p.productId.toString() === productId && p.isAvailable === true
    )
  );

  return !!category;
};
