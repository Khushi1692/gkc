import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.types";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.authProvider === "local";
      },
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    avatar: String,
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1, authProvider: 1 });

export const User = mongoose.model<IUser>("User", userSchema);
