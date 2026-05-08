import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const data = await request.formData();

  const firstName = data.get("firstName");
  const lastName  = data.get("lastName");
  const email     = data.get("email");
  const service   = data.get("service");
  const message   = data.get("message");

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "contact@trueorbitanalytics.com",
      subject: `New Inquiry - ${service}`,
      html: `
        <h2>New Contact Form Submission — True Orbit Analytics</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Interest:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
