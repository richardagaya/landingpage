import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { answers } = req.body;

  // Create email content
  const emailBody = `
    <h2>User Quiz Results</h2>
    <p>Here are the answers selected by the user:</p>
    <ul>
      ${answers.map((answer: string, index: number) => `<li>Q${index + 1}: ${answer}</li>`).join("")}
    </ul>
  `;

  try {
    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password (if using Gmail)
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "richardagaya278@gmail.com", // Change this to your email
      subject: "New Quiz Results",
      html: emailBody,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
