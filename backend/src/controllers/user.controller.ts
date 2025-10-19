import { Request, Response } from "express";
import { User } from "../models/user.models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { IUserInput } from "../types/user.types";
import { createCustomError } from "../utils/error";
import { EmailService } from "../services/email.service";
import crypto from "crypto";
import { GoogleAuthService } from "../services/google-auth.service";
import { AuthRequest } from "../middleware/auth";

export class UserController {
  // User signup method
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password }: IUserInput = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          status: "error",
          message: "User already exists",
        });
        return;
      }

      // Verify SMTP connection
      const isEmailServiceWorking = await EmailService.verifyConnection();
      if (!isEmailServiceWorking) {
        res.status(500).json({
          status: "error",
          message: "Email service is not available. Please try again later.",
        });
        return;
      }

      // Generate verification token and hash password
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const hashedPassword = await bcrypt.hash(
        password,
        config.bcrypt.saltRounds
      );

      // Create new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });

      try {
        // Send verification email
        await EmailService.sendVerificationEmail(
          email,
          name,
          verificationToken
        );

        res.status(201).json({
          status: "success",
          message:
            "Registration successful. Please check your email to verify your account.",
        });
      } catch (emailError) {
        // If email fails, mark user as requiring email verification retry
        console.error("Failed to send verification email:", emailError);
        await User.findByIdAndUpdate(user._id, {
          $set: {
            emailVerificationFailed: true,
          },
        });

        res.status(201).json({
          status: "warning",
          message:
            "Account created but verification email could not be sent. Please contact support.",
          data: {
            userId: user._id,
          },
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  // User login method
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email, authProvider: "local" });
      if (!user) {
        res.status(401).json({
          status: "error",
          message: "Invalid credentials",
        });
        return;
      }

      // Check if password exists (safety check for OAuth users)
      if (!user.password) {
        res.status(401).json({
          status: "error",
          message:
            "This account uses Google sign-in. Please login with Google.",
        });
        return;
      }

      // Check if user is verified
      if (user.isVerified != true) {
        res.status(401).json({
          status: "error",
          message: "Verify Email",
        });
        return;
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          status: "error",
          message: "Invalid credentials",
        });
        return;
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn as any,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({
        status: "success",
        message: "Login successful",
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  // Email verification method
  static async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Find user by verification token
      const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: new Date() },
      });

      if (!user) {
        res.status(400).json({
          status: "error",
          message: "Invalid or expired verification token",
        });
        return;
      }

      // Mark user as verified
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;
      await user.save();

      res.status(200).json({
        status: "success",
        message: "Email verified successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  // Forgot password method
  static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "No account found with that email",
        });
        return;
      }

      // Verify email service before proceeding
      const isEmailServiceWorking = await EmailService.verifyConnection();
      if (!isEmailServiceWorking) {
        res.status(500).json({
          status: "error",
          message: "Email service is not available. Please try again later.",
        });
        return;
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await user.save();

      try {
        // Send password reset email
        await EmailService.sendPasswordResetEmail(email, user.name, resetToken);

        res.json({
          status: "success",
          message: "Password reset instructions sent to your email",
        });
      } catch (emailError) {
        console.error("Failed to send password reset email:", emailError);

        // Reset the token since email failed
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(500).json({
          status: "error",
          message:
            "Failed to send password reset email. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  // Reset password method
  static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const { password } = req.body;

      // Find user by reset token
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
      });

      if (!user) {
        res.status(400).json({
          status: "error",
          message: "Invalid or expired reset token",
        });
        return;
      }

      // Hash new password and save
      const hashedPassword = await bcrypt.hash(
        password,
        config.bcrypt.saltRounds
      );
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.json({
        status: "success",
        message: "Password reset successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  /**
   * Google OAuth login/signup
   * Receives Google ID token from frontend, verifies it, and creates/logs in user
   */
  static async googleAuth(req: Request, res: Response): Promise<void> {
    try {
      const { credential } = req.body; // Google ID token from frontend

      if (!credential) {
        res.status(400).json({
          status: "error",
          message: "Google credential is required",
        });
        return;
      }

      // Verify Google token
      const googleUser = await GoogleAuthService.verifyToken(credential);

      // Check if user exists with Google ID
      let user = await User.findOne({ googleId: googleUser.googleId });

      if (user) {
        // Existing Google user - log them in
        const token = jwt.sign({ userId: user._id }, config.jwt.secret, {
          expiresIn: config.jwt.expiresIn as any,
        });

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({
          status: "success",
          message: "Login successful",
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
        });
        return;
      }

      // Check if user exists with same email (from email/password signup)
      user = await User.findOne({ email: googleUser.email });

      if (user) {
        // Link Google account to existing user
        user.googleId = googleUser.googleId;
        user.avatar = googleUser.avatar;
        user.isVerified = true; // Google emails are verified
        await user.save();

        const token = jwt.sign({ userId: user._id }, config.jwt.secret, {
          expiresIn: config.jwt.expiresIn as any,
        });

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({
          status: "success",
          message: "Google account linked successfully",
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
        });
        return;
      }

      // Create new user with Google
      user = await User.create({
        googleId: googleUser.googleId,
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.avatar,
        authProvider: "google",
        isVerified: true, // Google users are auto-verified
      });

      const token = jwt.sign({ userId: user._id }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn as any,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        status: "success",
        message: "Registration successful",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (error: any) {
      console.error("Google auth error:", error);

      if (error.message === "Invalid Google token") {
        res.status(401).json({
          status: "error",
          message: "Invalid Google authentication",
        });
        return;
      }

      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  static async getCurrentUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ status: "error", message: "Unauthorized" });
        return;
      }
      const user = await User.findById(userId).select("_id name email avatar");

      if (!user) {
        res.status(401).json({ status: "error", message: "User not found" });
        return;
      }

      res.status(200).json({
        status: "success",
        message: " User fetched successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      res.status(401).json({
        status: "error",
        message: "Invalid or expired token",
      });
    }
  }

  static logout(req: Request, res: Response): void {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  }
}
