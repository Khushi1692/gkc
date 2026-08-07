import mongoose from "mongoose";
import { config } from "../config/config";
import { Product } from "../models/product.models";
import { Category } from "../models/category.models";

async function run() {
  try {
    await mongoose.connect(config.mongodb.uri);
    const products = await Product.find({}).lean();
    const categories = await Category.find({}).lean();
    console.log("JSON_START");
    console.log(JSON.stringify({ products, categories }));
    console.log("JSON_END");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
run();
