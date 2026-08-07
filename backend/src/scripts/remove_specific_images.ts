import mongoose from "mongoose";
import { config } from "../config/config";
import { Product } from "../models/product.models";

async function removeImages() {
  try {
    console.log("Connecting to:", config.mongodb.uri);
    await mongoose.connect(config.mongodb.uri);

    const productsToRemoveImages = [
      "Bhel Puri",
      "South Special Ragda Samosa Chaat",
      "Spicy Panner Pizza"
    ];

    const result = await Product.updateMany(
      { name: { $in: productsToRemoveImages } },
      { $unset: { image: "" } }
    );

    console.log(`Images removed. Modified ${result.modifiedCount} document(s).`);

    console.log("✅ Operation completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Failed:", err);
    process.exit(1);
  }
}

removeImages();
