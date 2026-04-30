import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
};

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Protect Account Routes
  if (path.startsWith('/account')) {
    const token = req.cookies.get('superspec_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL(`/login?returnUrl=${encodeURIComponent(path)}`, req.url));
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL(`/login?returnUrl=${encodeURIComponent(path)}`, req.url));
    }
    return NextResponse.next();
  }

  // Protect Admin Routes — JWT role check
  if (path.startsWith('/admin')) {
    const token = req.cookies.get('superspec_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL(`/login?returnUrl=${encodeURIComponent(path)}`, req.url));
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL(`/login?returnUrl=${encodeURIComponent(path)}`, req.url));
    }
    // Require admin role
    if (payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
