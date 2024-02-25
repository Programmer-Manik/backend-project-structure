import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_DEV === "production",
    auth: {
      user: config.smtp_user,
      pass: config.smtp_password,
    },
  });

  await transporter.sendMail({
    from: config.smtp_user, // sender address
    to: to, // list of receivers
    subject: "Reset Your Password within 10 Minutes", // Subject line
    text: "", // plain text body
    html: html, // html body
  });
};
