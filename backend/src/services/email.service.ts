import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { config } from "../config/config";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class EmailService {
  // Create a transporter object using the default SMTP transport
  private static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });

  // Read and return the email template content from the specified file
  private static async getTemplate(templateName: string): Promise<string> {
    const templatePath = path.join(
      __dirname,
      "templates",
      `${templateName}.html`
    );
    return await fs.readFile(templatePath, "utf-8");
  }

  // Replace variables in the template with actual values
  private static replaceTemplateVariables(
    template: string,
    variables: Record<string, string>
  ): string {
    return Object.entries(variables).reduce(
      (acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, "g"), value),
      template
    );
  }

  // Verify the SMTP connection
  static async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log("SMTP connection verified successfully");
      return true;
    } catch (error) {
      console.error("SMTP connection verification failed:", error);
      return false;
    }
  }

  // Send a verification email to the specified recipient
  static async sendVerificationEmail(
    to: string,
    name: string,
    verificationToken: string
  ): Promise<void> {
    try {
      const template = await this.getTemplate("verifyEmail");
      const verificationLink = `${config.frontend.url}/verify-email/${verificationToken}`;

      const html = this.replaceTemplateVariables(template, {
        name,
        verificationLink,
      });

      const mailOptions = {
        from: `"POP101" <${config.email.user}>`,
        to,
        subject: "Verify Your Email",
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully:", info.messageId);
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw new Error("Failed to send verification email");
    }
  }

  // inside EmailService class
  static async sendContactEmail(
    to: string,
    name: string,
    subject: string,
    message: string
  ): Promise<void> {
    try {
      // Load the contact email template
      const template = await this.getTemplate("contactUs");

      // Replace variables
      const html = this.replaceTemplateVariables(template, {
        name,
        email: to,
        subject,
        message,
      });

      const mailOptions = {
        from: `"POP101" <${config.email.user}>`, // Verified sender
        replyTo: to, // User email
        to: config.adminEmail,
        subject: `[Contact Us] ${subject}`,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Contact email sent successfully:", info.messageId);
    } catch (error) {
      console.error("Error sending contact email:", error);
      throw new Error("Failed to send contact email");
    }
  }

  // Send a password reset email to the specified recipient
  static async sendPasswordResetEmail(
    to: string,
    name: string,
    resetToken: string
  ): Promise<void> {
    try {
      const template = await this.getTemplate("resetPassword");
      const resetLink = `${config.frontend.url}/reset-password?token=${resetToken}`;

      const html = this.replaceTemplateVariables(template, {
        name,
        resetLink,
      });

      const mailOptions = {
        from: `"POP101" <${config.email.user}>`,
        to,
        subject: "Reset Your Password",
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Password reset email sent successfully:", info.messageId);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw new Error("Failed to send password reset email");
    }
  }

  static async sendOrderConfirmationEmail(
    to: string,
    customerName: string,
    order: any,
    branchName: string,
    isOwner: boolean = false
  ): Promise<void> {
    try {
      const template = await this.getTemplate("orderConfirmation");

      // Generate table rows for order items
      const orderItemsHtml = order.items
        .map(
          (item: any) => `
        <tr>
          <td>${item.productId?.name || "Item"}</td>
          <td align="center">${item.quantity}</td>
          <td align="right">$${item.subtotal.toFixed(2)}</td>
        </tr>`
        )
        .join("");

      // Adjust text if it's for the owner
      const greeting = isOwner
        ? `Hi ${branchName} Team,`
        : `Thank you for your order, ${customerName}! 🎉`;
      const subject = isOwner
        ? `New Order Received - #${order.orderId}`
        : `Order Confirmation - #${order.orderId}`;

      const html = this.replaceTemplateVariables(template, {
        greeting,
        orderId: order.orderId,
        branchName,
        orderDate: new Date(order.createdAt).toLocaleString(),
        totalAmount: order.totalAmount.toFixed(2),
        orderItems: orderItemsHtml,
        specialInstructions: order.specialInstructions || "-",
      });

      const mailOptions = {
        from: `"POP101" <${config.email.user}>`,
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(
        `✅ ${isOwner ? "Owner" : "Customer"} order email sent:`,
        info.messageId
      );
    } catch (error) {
      console.error("❌ Error sending order confirmation email:", error);
      throw new Error("Failed to send order confirmation email");
    }
  }
}
