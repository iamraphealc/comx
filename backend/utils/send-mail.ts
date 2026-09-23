import { Resend } from "resend";

type SendMail = {
  to: string;
  subject: string;
  html: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({
  to,
  subject,
  html,
}: SendMail) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Email sending failed:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email sent:", data?.id);
    return data;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Email sending failed");
  }
};
