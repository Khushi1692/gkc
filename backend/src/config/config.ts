// src/config/config.ts
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  adminEmail: process.env.ADMIN_EMAIL,
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/pop101",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "default-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },
  bcrypt: {
    saltRounds: parseInt(process.env.SALT_ROUNDS || "10", 10),
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  frontend: {
    url: process.env.FRONTEND_URL,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  },
} as const;
