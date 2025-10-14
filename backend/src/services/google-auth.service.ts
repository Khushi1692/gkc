import { OAuth2Client } from "google-auth-library";
import { config } from "../config/config.js";

export class GoogleAuthService {
  private static client = new OAuth2Client(config.google.clientId);

  /**
   * Verify Google ID token and extract user information
   * @param token - Google ID token from frontend
   * @returns User payload with email, name, picture, sub (Google ID)
   */
  static async verifyToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: config.google.clientId,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error("Invalid token payload");
      }

      return {
        googleId: payload.sub,
        email: payload.email!,
        name: payload.name!,
        avatar: payload.picture,
        emailVerified: payload.email_verified,
      };
    } catch (error) {
      console.error("Google token verification failed:", error);
      throw new Error("Invalid Google token");
    }
  }
}