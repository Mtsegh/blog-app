import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const mailTransporter = {
  sendMail: async ({ from, to, subject, html, replyTo }) => {
    const msg = {
      from,
      to,
      subject,
      html,
      replyTo,
    };

    await sgMail.send(msg);
  },
};

export const sender = {
  name: process.env.MAIL_FROM_NAME || "MyApp",
  email: process.env.MAIL_USER, 
};
