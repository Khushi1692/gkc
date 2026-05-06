import mongoose from "mongoose";
import { config } from "../config/config";
import { Product } from "../models/product.models";

const imageMap: Record<string, string> = {
  "GKC Tava Pulav":           "/products/tava_pulav.png",
  "GKC Special Tava Pulav":   "/products/tava_pulav.png",
  "Maa Anjani's Black Tava Pulav": "/products/tava_pulav.png",
  "GKC Pav Bhaji":            "/products/pav_bhaji.png",
  "Black Pav Bhaji":          "/products/pav_bhaji.png",
  "Cheese Pav Bhaji":         "/products/pav_bhaji.png",
  "Bombay Style Vadapav":     "/products/bombay_style_vadapav.png",
  "Dry Manchurian":           "/products/dry_manchurian.png",
  "Gravy Manchurian":         "/products/dry_manchurian.png",
  "Indian Style Pizza":       "/products/pizza.png",
  "Spicy Panner Pizza":       "/products/pizza.png",
  "Kids Pizza":               "/products/pizza.png",
};

async function updateImages() {
  try {
    console.log("Connecting to:", config.mongodb.uri);
    await mongoose.connect(config.mongodb.uri);

    for (const [name, image] of Object.entries(imageMap)) {
      const result = await Product.updateMany({ name }, { $set: { image } });
      console.log(`Updated "${name}": ${result.modifiedCount} doc(s)`);
    }

    console.log("✅ Product images updated successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Failed:", err);
    process.exit(1);
  }
}

updateImages();
