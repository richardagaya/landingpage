import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, answers } = req.body;

  if (!name || !email || !answers) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Create email content
  const emailBody = `
    <h2>New Quiz Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <h3>Quiz Answers:</h3>
    <ul>
      ${answers.map((answer: string, index: number) => `<li><strong>Q${index + 1}:</strong> ${answer}</li>`).join("")}
    </ul>
  `;

  try {
    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use SMTP settings
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (if using Gmail)
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "richardagaya278@gmail.com", // Replace with your email
      subject: "New Quiz Results",
      html: emailBody,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
