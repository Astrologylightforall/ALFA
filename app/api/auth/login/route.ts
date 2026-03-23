import { NextResponse } from 'next/server';

// Default secure credentials if no .env variables are provided
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "alfa2026";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
      
      response.cookies.set({
        name: 'alfa_admin_session',
        value: 'authenticated',
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week duration globally
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      
      return response;
    }
    
    return NextResponse.json({ success: false, message: 'Invalid credentials provided. Access denied.' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
