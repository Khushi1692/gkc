import mongoose from "mongoose";
import { config } from "../config/config";
import { Branch } from "../models/branch.models";

async function updateBranchInfo() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(config.mongodb.uri);
    const result = await Branch.updateMany({}, {
      $set: {
        phone: "+61 412 658 983",
        address: "23 Meriton Pl, Clayton South VIC 3169, Australia",
        operatingHours: [
          { day: "monday", open: "17:00", close: "23:00", isClosed: false },
          { day: "tuesday", open: "17:00", close: "23:00", isClosed: false },
          { day: "wednesday", open: "17:00", close: "23:00", isClosed: false },
          { day: "thursday", open: "17:00", close: "23:00", isClosed: false },
          { day: "friday", open: "17:30", close: "00:00", isClosed: false },
          { day: "saturday", open: "17:30", close: "00:00", isClosed: false },
          { day: "sunday", open: "17:00", close: "23:00", isClosed: false },
        ]
      },
      $unset: { email: "" }
    });
    console.log(`Successfully updated info for ${result.modifiedCount} branch(es).`);
    process.exit(0);
  } catch (err) {
    console.error("Failed to update branch info:", err);
    process.exit(1);
  }
}

updateBranchInfo();
