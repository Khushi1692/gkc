import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import menuRoutes from "./routes/menu.routes";
import branchRoutes from "./routes/branch.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import cartRoutes from "./routes/cart.routes";

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow sending cookies/auth headers
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export default app;
