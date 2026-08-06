import mongoose from "mongoose";
import { config } from "../config/config";
import { Branch } from "../models/branch.models";

async function updateBranchPhone() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(config.mongodb.uri);
    const result = await Branch.updateMany({}, { $set: { phone: "+61 415 974 125" } });
    console.log(`Successfully updated phone number for ${result.modifiedCount} branch(es).`);
    process.exit(0);
  } catch (err) {
    console.error("Failed to update branch phone number:", err);
    process.exit(1);
  }
}

updateBranchPhone();
