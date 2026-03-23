import nodemailer from 'nodemailer';

// Generate a 16-character App Password from Google Account Security: https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'astrologylightforall@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD, 
  },
});

export async function sendAdminNotification(subject: string, htmlContent: string) {
  if (!process.env.GMAIL_APP_PASSWORD || !process.env.GMAIL_USER) {
    console.warn("Email warning: GMAIL_APP_PASSWORD or GMAIL_USER is not configured in .env.local.");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: `"ALFA Portal System" <${process.env.GMAIL_USER}>`, // Sender address
      to: "astrologylightforall@gmail.com", // Send alert exclusively to Admin
      subject: `ALFA Alert: ${subject}`, 
      html: htmlContent, 
    });
    console.log("Admin Notification Dispatched: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Critical failure pushing Admin Notification via NodeMailer:", error);
    return false;
  }
}

export async function sendClientNotification(toEmail: string, subject: string, htmlContent: string) {
  if (!process.env.GMAIL_APP_PASSWORD || !process.env.GMAIL_USER) {
    console.warn("Email warning: GMAIL_APP_PASSWORD configured required for Client emails.");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: `"ALFA Virtual Portal" <${process.env.GMAIL_USER}>`,
      to: toEmail, 
      subject: subject, 
      html: htmlContent, 
    });
    console.log("Client Notification Dispatched: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Critical failure pushing Client Notification via NodeMailer:", error);
    return false;
  }
}
