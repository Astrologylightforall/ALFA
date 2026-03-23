import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendAdminNotification } from '@/lib/email';

const DATA_DIR = path.join(process.cwd(), 'content', 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Initialize logic
const ensureDataStore = () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(LEADS_FILE)) fs.writeFileSync(LEADS_FILE, JSON.stringify([]), 'utf8');
};

export async function GET() {
  try {
    ensureDataStore();
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    return NextResponse.json({ success: true, leads: JSON.parse(data) });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server reading error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    ensureDataStore();
    const payload = await request.json();
    
    // Add unique metadata
    const newLead = {
      id: `LD-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString(),
      ...payload
    };

    const currentData = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    currentData.unshift(newLead); // Add to beginning
    fs.writeFileSync(LEADS_FILE, JSON.stringify(currentData, null, 2), 'utf8');

    // Generate Admin Email Notification
    const sourceString = newLead.source === "free_analysis" ? "Free Analysis Request" : "Contact Form Inquiry";
    const emailBody = `
      <h2>New ${sourceString} Received</h2>
      <p><strong>Name:</strong> ${newLead.name || newLead.fullName || 'N/A'}</p>
      <p><strong>Email:</strong> ${newLead.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${newLead.phone || 'N/A'}</p>
      <p><strong>Time:</strong> ${newLead.timestamp}</p>
      <hr />
      <h3>Details:</h3>
      <pre style="background:#f4f4f4; padding: 15px;">${JSON.stringify(payload, null, 2)}</pre>
      <br />
      <a href="http://astrologylightforall.vercel.app/admin">View Dashboard</a>
    `;

    // Asynchronously dispatch the email without blocking the immediate client response
    sendAdminNotification(`New Alert: ${sourceString} from ${newLead.name || 'Client'}`, emailBody).catch(console.error);

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server writing error' }, { status: 500 });
  }
}

