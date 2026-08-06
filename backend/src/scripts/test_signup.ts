import mongoose from "mongoose";
import { config } from "../config/config";
import { UserController } from "../controllers/user.controller";
import { Request, Response } from "express";

async function testSignup() {
  try {
    console.log("Connecting to:", config.mongodb.uri);
    await mongoose.connect(config.mongodb.uri);

    // Mock Express Request and Response
    const req = {
      body: {
        name: "Test Local User",
        email: `testuser_${Date.now()}@example.com`,
        password: "securepassword123"
      }
    } as unknown as Request;

    const res = {
      status(code: number) {
        console.log("Response status called with code:", code);
        return this;
      },
      json(data: any) {
        console.log("Response json called with data:", JSON.stringify(data, null, 2));
        return this;
      }
    } as unknown as Response;

    console.log("Calling UserController.signup...");
    await UserController.signup(req, res);

    console.log("Signup call finished. Checking if user was stored...");
    const { User } = await import("../models/user.models");
    const found = await User.findOne({ email: req.body.email });
    if (found) {
      console.log("SUCCESS! User was found in database:", found);
    } else {
      console.log("FAILED! User was NOT found in database.");
    }

    process.exit(0);
  } catch (err) {
    console.error("Test signup failed with error:", err);
    process.exit(1);
  }
}

testSignup();
