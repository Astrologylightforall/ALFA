import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendClientNotification } from '@/lib/email';

const DATA_DIR = path.join(process.cwd(), 'content', 'data');
const APPT_FILE = path.join(DATA_DIR, 'appointments.json');

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const data = JSON.parse(fs.readFileSync(APPT_FILE, 'utf8'));
    const appointment = data.find((a: any) => a.id === params.id);
    
    if (!appointment) return NextResponse.json({ success: false, message: 'Not Found' }, { status: 404 });
    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server reading error' }, { status: 500 });
  }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const payload = await request.json();
    const currentData = JSON.parse(fs.readFileSync(APPT_FILE, 'utf8'));
    
    const index = currentData.findIndex((a: any) => a.id === params.id);
    if (index === -1) return NextResponse.json({ success: false, message: 'Not Found' }, { status: 404 });

    const existingAppt = currentData[index];
    const updatedAppt = { ...existingAppt, ...payload };
    
    currentData[index] = updatedAppt;
    fs.writeFileSync(APPT_FILE, JSON.stringify(currentData, null, 2), 'utf8');

    // If Admin explicitly transitions status to Confirmed, dispatch Client Email
    if (payload.status === "Confirmed" && existingAppt.status !== "Confirmed" && existingAppt.email) {
      const emailBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c9a84c;">Your Virtual Consultation is Scheduled</h2>
          <p>Dear ${updatedAppt.clientName},</p>
          <p>Manjul Ji has confirmed your request for <strong>${updatedAppt.service}</strong>.</p>
          <p><strong>Scheduled Processing Time:</strong> ${updatedAppt.date}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>Your secure consultation gateway is now armed. At the exact scheduled time, please initialize your uplink via the button below:</p>
          
          <a href="http://astrologylightforall.vercel.app/consultation-room?room=${updatedAppt.id}" style="display: inline-block; background-color: #c9a84c; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; margin-top: 10px;">
            Enter ALFA Matrix
          </a>
          
          <p style="margin-top: 25px; font-size: 12px; color: #888;">Meeting Cipher Token: <code>${updatedAppt.id}</code></p>
        </div>
      `;

      sendClientNotification(existingAppt.email, "ALFA Portal: Consultation Confirmed", emailBody).catch(console.error);
    }

    return NextResponse.json({ success: true, appointment: updatedAppt });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server updating error' }, { status: 500 });
  }
}

