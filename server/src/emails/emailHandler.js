import { mailTransporter, sender } from "../lib/mailer.js";
import {
  createResetPasswordTemplate,
  createUserVerificationTemplate,
  createEmailTemplate
} from "./emailTemlate.js";

import dotenv from "dotenv";
dotenv.config();

const url = process.env.CLIENT_URL || "http://localhost:3000";

export const sendAuthEmail = async (email, name, clientURL) => {
  try {
    await mailTransporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html: createUserVerificationTemplate(name, clientURL),
      replyTo: sender.email,
    });

    console.log("✅ Verification email sent:", email);
  } catch (error) {
    console.error("❌ Auth email error:", error.message);
    throw new Error("Failed to send verification email");
  }
};

export const sendPasswordResetEmail = async (email, name, clientURL) => {
  const resetURL = `${url}/reset-password/${clientURL}`;
  try {
    await mailTransporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Reset your password",
      html: createResetPasswordTemplate(name, resetURL),
      replyTo: sender.email,
    });

    // console.log("✅ Password reset email sent:", email);
  } catch (error) {
    console.error("❌ Reset email error:", error.message);
    throw new Error("Failed to send reset email");
  }
};

export const sendEmailsToSubscribers = async (emails, blog) => {
  for (const email of emails) {
    try {
      await mailTransporter.sendMail({
        from: `"${sender.name}" <${sender.email}>`,
        to: email,
        subject: `New blog post: ${blog.title}`,
        html: createEmailTemplate(blog),
        replyTo: sender.email,
      });

      console.log(`✅ Sent to ${email}`);
      await new Promise(r => setTimeout(r, 800)); // throttle
    } catch (err) {
      console.error(`❌ Failed for ${email}:`, err.message);
    }
  }
};
