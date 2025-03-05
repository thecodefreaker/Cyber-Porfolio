// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // 1. Extract data from the incoming request body (assumes JSON format)
    const { name, email, message } = await request.json();

    // 2. Create a transporter using Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,           // Should be 'smtp.gmail.com'
      port: Number(process.env.SMTP_PORT),     // Typically 587 for TLS (or 465 for SSL)
      secure: false,                           // false for port 587 (TLS), true for port 465 (SSL)
      auth: {
        user: process.env.SMTP_USER,           // Your Gmail address
        pass: process.env.SMTP_PASS,           // Your generated App Password from Gmail
      },
    });

    // 3. Define email details for the notification to you (admin email)
    const mailOptionsForAdmin = {
      from: email, // This will show the sender's email from the form
      to: process.env.RECEIVER_EMAIL, // Your email address (where you want to receive the message)
      subject: `New Contact Form Submission from ${name}`,
      text:
        `You have received a new message from your portfolio contact form.\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`,
    };

    // 4. Send the notification email to your inbox
    await transporter.sendMail(mailOptionsForAdmin);

    // 5. Define email details for an automated reply to the sender
    const mailOptionsForSender = {
      from: process.env.SMTP_USER, // Your email address appears as the sender of the reply
      to: email,                  // The email provided by the sender
      subject: `Thank you for contacting us, ${name}!`,
      text:
        `Hi ${name},\n\n` +
        `Thank you for reaching out! We have received your message and will get back to you as soon as possible.\n\n` +
        `Best regards,\n` +
        `Hardik Srivastava`,
    };

    // 6. Send the automated reply email to the sender
    await transporter.sendMail(mailOptionsForSender);

    // 7. Return a success response to the client
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the error to the server console
    console.error('Error sending email:', error);
    // Return a JSON error response with status 500 (Internal Server Error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
