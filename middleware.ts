import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('alfa_admin_session')?.value;
  
  // Exclude the login page from checking if logged in, but redirect if already logged in
  if (request.nextUrl.pathname === '/admin/login') {
    if (session === 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }
  
  // Protect all other /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (session !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
