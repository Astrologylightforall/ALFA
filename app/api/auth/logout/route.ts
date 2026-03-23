import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  // Expire the cookie to remove session access
  response.cookies.delete('alfa_admin_session');
  
  return response;
}
