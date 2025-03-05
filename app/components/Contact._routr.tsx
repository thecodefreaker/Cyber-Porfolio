// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Extract form data from the request body
    const { name, email, message } = await request.json();

    // Create a transporter using SMTP details from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // Set to true if using port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Craft the email details
    const mailOptions = {
      from: email, // Use the sender's email from the form (optional: you can also hardcode this)
      to: process.env.RECEIVER_EMAIL, // Your email to receive the message
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from your portfolio website contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
