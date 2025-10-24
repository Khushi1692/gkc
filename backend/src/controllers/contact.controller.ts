import { Request, Response } from "express";
import { EmailService } from "../services/email.service";
import { ContactUsInput } from "../validators/contact.validators";

export class ContactController {
  static async sendMessage(req: Request, res: Response) {
    try {
      const { name, email, subject, message }: ContactUsInput = req.body;

      const isEmailServiceWorking = await EmailService.verifyConnection();
      if (!isEmailServiceWorking) {
        res.status(500).json({
          status: "error",
          message: "Email service is not available. Please try again later.",
        });
        return;
      }

      await EmailService.sendContactEmail(email, name, subject, message);

      res.status(200).json({
        status: "success",
        message: "Your message has been sent successfully!",
      });
    } catch (error) {}
  }
}
