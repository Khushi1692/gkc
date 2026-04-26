import mongoose from "mongoose";
import { config } from "../config/config";
import { Branch } from "../models/branch.models";

async function checkDb() {
  try {
    console.log("Connecting to:", config.mongodb.uri);
    await mongoose.connect(config.mongodb.uri);
    const branches = await Branch.find({});
    console.log("Branches found:", branches.length);
    branches.forEach(b => console.log("- " + b.name + " (" + b._id + ")"));

    const { Product } = await import("../models/product.models");
    const products = await Product.find({});
    console.log("\nProducts found:", products.length);
    products.forEach(p => console.log("- " + p.name + " (" + p._id + ")"));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDb();
