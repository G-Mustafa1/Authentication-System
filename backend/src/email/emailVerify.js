import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const emailVerify = async (token, email) => {
  try {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, "template.hbs"),
      "utf-8"
    );

    const template = handlebars.compile(emailTemplateSource);

    const html = template({
      token,
      frontendURL: process.env.BACKEND_URL, 
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailConfig = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",
      html,
    };

    const info = await transporter.sendMail(mailConfig);

    console.log("✅ Email sent successfully to:", email);
    console.log("MessageId:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error(error.message);
  }
};