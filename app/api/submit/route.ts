import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { type, ...formFields } = data;

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || 'astrologylightforall@gmail.com';

    if (!emailUser || !emailPass) {
      console.warn("Backend Email credentials are not configured in environment variables.");
      return NextResponse.json({ 
        success: false, 
        error: "Server email configuration is missing. Submissions cannot be emailed at this moment." 
      }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, 
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const subject = `[ALFA] New ${type === 'free-analysis' ? 'Free Analysis' : 'Contact'} Submission from ${formFields.name || 'User'}`;
    
    let htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #C9A84C;">New Submission on ALFA</h2>
        <p><strong>Submission Type:</strong> ${type === 'free-analysis' ? 'Free Horoscope Analysis' : 'Contact Page Message'}</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
    `;

    for (const [key, value] of Object.entries(formFields)) {
        htmlContent += `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f9f9f9; font-weight: bold; width: 150px; text-transform: capitalize;">${key}</td>
            <td style="padding: 10px; border-bottom: 1px solid #f9f9f9;">${value}</td>
          </tr>
        `;
    }

    htmlContent += `
        </table>
        <p style="font-size: 11px; color: #999; margin-top: 25px;">This is an automated notification from Astrologylightforall website server.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"ALFA Website" <${emailUser}>`,
      to: emailTo,
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: 'Submission logged and email sent.' });

  } catch (error: any) {
    console.error('Submission processing error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Unknown internal error occurred.' }, { status: 500 });
  }
}
