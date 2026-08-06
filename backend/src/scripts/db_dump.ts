import mongoose from "mongoose";
import { config } from "../config/config";
import { Branch } from "../models/branch.models";
import { User } from "../models/user.models";

async function dumpDb() {
  try {
    console.log("Connecting to:", config.mongodb.uri);
    await mongoose.connect(config.mongodb.uri);
    
    const branches = await Branch.find({});
    console.log(`\n--- BRANCHES (${branches.length}) ---`);
    branches.forEach(b => {
      console.log(`ID: ${b._id}, Name: ${b.name}, Active: ${b.isActive}, Code: ${b.code}`);
    });

    const users = await User.find({});
    console.log(`\n--- USERS (${users.length}) ---`);
    users.forEach(u => {
      console.log(`ID: ${u._id}, Name: ${u.name}, Email: ${u.email}, authProvider: ${u.authProvider}, isVerified: ${u.isVerified}`);
    });

    process.exit(0);
  } catch (err) {
    console.error("Dump failed:", err);
    process.exit(1);
  }
}

dumpDb();
