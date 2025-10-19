import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
  userId?: string;
  sessionId?: string;
}
/**
 * Middleware to authenticate a JWT token from the request headers.
 *
 * @param req - The request object, extended to include `userId` if authentication is successful.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A response with status 401 if no token is provided, or status 403 if the token is invalid or expired.
 *
 * @remarks
 * This middleware expects the JWT token to be provided in the `Authorization` header in the format `Bearer <token>`.
 * If the token is valid, the `userId` from the token payload is attached to the request object.
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      req.userId = decoded.userId;
    }

    // Get sessionId from header or cookie for guest users
    req.sessionId =
      (req.headers["x-session-id"] as string) || req.cookies.sessionId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const optionalAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      req.userId = decoded.userId;
    }

    req.sessionId =
      (req.headers["x-session-id"] as string) || req.cookies.sessionId;
    next();
  } catch (error) {
    req.sessionId =
      (req.headers["x-session-id"] as string) || req.cookies.sessionId;
    next();
  }
};