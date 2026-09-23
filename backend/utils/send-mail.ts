
import nodemailer from "nodemailer";
import dns from "node:dns";

// Prefer IPv4 when resolving SMTP server addresses.
dns.setDefaultResultOrder("ipv4first");

type SendMail = {
  to: string;
  subject: string;
  html: string;
};

export const sendMail = async ({ to, subject, html }: SendMail) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 15000,
  });

  try {
    const info = await transport.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Email sending failed");
  } finally {
    transport.close();
  }
};
