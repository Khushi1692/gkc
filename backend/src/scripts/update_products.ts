import mongoose from "mongoose";
import { config } from "../config/config";
import { Product } from "../models/product.models";

const authenticKathiyawadi = [
  {
    name: "Surti Undhiyu",
    description: "The crown jewel of Gujarati cuisine. Slow-cooked winter vegetables with fenugreek dumplings.",
  },
  {
    name: "Vagharelo Rotlo",
    description: "Hearty pearl millet flatbread, crumbled and tempered with buttermilk and garlic-green chili paste.",
  },
  {
    name: "Ringan No Oro",
    description: "Smoky charcoal-roasted eggplant mash, finished with fresh ginger and mustard seeds.",
  },
  {
    name: "Sev Tomato Nu Shaak",
    description: "A tangy-sweet tomato curry topped with crispy gram flour noodles (sev). Pure soul food.",
  },
  {
    name: "Kaju Lasan",
    description: "Creamy whole cashews simmered in a rich garlic-onion sauce. Luxurious and warming.",
  },
  {
    name: "Lasaniya Bateta",
    description: "Baby potatoes sautéed in a fiery red garlic chutney. Bold and addictive.",
  },
  {
    name: "Kathiyawadi Kadhi-Khichdi",
    description: "Spicy and tangy yogurt curry served with comforting lentil-rice mishmash.",
  },
  {
    name: "Bajra No Rotlo with Gud & Ghee",
    description: "Rustic millet bread served with traditional jaggery and a dollop of pure white butter.",
  },
  {
    name: "Masala Chaas (Smoked)",
    description: "Traditional buttermilk infused with roasted cumin and smoked with a charcoal ember.",
  },
  {
    name: "Gopi Special Rabdi",
    description: "Slow-reduced creamy milk with cardamom, saffron, and a hint of Gopi's secret touch.",
  },
];

async function updateProducts() {
  try {
    console.log("Connecting to:", config.mongodb.uri);
    await mongoose.connect(config.mongodb.uri);
    
    // Get all current products
    const currentProducts = await Product.find({});
    console.log("Current products count:", currentProducts.length);

    for (let i = 0; i < currentProducts.length; i++) {
        if (authenticKathiyawadi[i]) {
            const product = currentProducts[i];
            const originalName = product.name;
            product.name = authenticKathiyawadi[i].name;
            product.description = authenticKathiyawadi[i].description;
            await product.save();
            console.log(`Updated "${originalName}" -> "${product.name}"`);
        }
    }

    console.log("Database update complete.");
    process.exit(0);
  } catch (err) {
    console.error("Error updating database:", err);
    process.exit(1);
  }
}

updateProducts();
