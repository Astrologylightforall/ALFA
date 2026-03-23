import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendAdminNotification } from '@/lib/email';

const DATA_DIR = path.join(process.cwd(), 'content', 'data');
const APPT_FILE = path.join(DATA_DIR, 'appointments.json');

const ensureDataStore = () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(APPT_FILE)) fs.writeFileSync(APPT_FILE, JSON.stringify([]), 'utf8');
};

export async function GET() {
  try {
    ensureDataStore();
    const data = fs.readFileSync(APPT_FILE, 'utf8');
    return NextResponse.json({ success: true, appointments: JSON.parse(data) });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server reading error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    ensureDataStore();
    const payload = await request.json();
    
    const newAppt = {
      id: payload.id || `APT-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString(),
      status: payload.status || 'Pending',
      ...payload
    };

    const currentData = JSON.parse(fs.readFileSync(APPT_FILE, 'utf8'));
    currentData.unshift(newAppt);
    fs.writeFileSync(APPT_FILE, JSON.stringify(currentData, null, 2), 'utf8');

    // Generate Admin Email Notification
    const emailBody = `
      <h2>New Consultation Booking</h2>
      <p><strong>Client Name:</strong> ${newAppt.clientName || 'N/A'}</p>
      <p><strong>Service:</strong> ${newAppt.service || 'N/A'}</p>
      <p><strong>Date/Time:</strong> ${newAppt.date || 'N/A'}</p>
      <p><strong>Gateway:</strong> ${newAppt.platform || 'N/A'}</p>
      <hr />
      <h3>Meeting Token / Reference: ${newAppt.id}</h3>
      <a href="http://astrologylightforall.vercel.app/admin/appointments">Manage Appointments</a>
    `;

    // Asynchronously dispatch
    sendAdminNotification(`New Booking: ${newAppt.clientName} - ${newAppt.service}`, emailBody).catch(console.error);

    return NextResponse.json({ success: true, appointment: newAppt });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server writing error' }, { status: 500 });
  }
}

