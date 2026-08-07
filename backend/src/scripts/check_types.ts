import mongoose from "mongoose";
import { config } from "../config/config";
import { Product } from "../models/product.models";
import { Category } from "../models/category.models";

async function checkDb() {
  await mongoose.connect(config.mongodb.uri);
  const p = await Product.findOne({});
  const c = await Category.findOne({});
  console.log("Product:", p?.name, "categoryId type:", typeof p?.categoryId, "constructor:", p?.categoryId?.constructor.name);
  console.log("Category:", c?.name, "_id type:", typeof c?._id, "constructor:", c?._id?.constructor.name);
  process.exit(0);
}
checkDb();
