import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'],
};

function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin", charset="UTF-8"',
    },
  });
}

export function middleware(req: NextRequest) {
  // Protect admin routes in production. Locally, you can still set env vars to test.
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  const user = process.env.ADMIN_BASIC_USER || process.env.ADMIN_EMAIL || '';
  const pass = process.env.ADMIN_BASIC_PASSWORD || process.env.ADMIN_PASSWORD || '';

  if (!user || !pass) {
    // If you haven't configured credentials, block in prod to avoid accidentally exposing admin.
    return isProd ? unauthorized() : NextResponse.next();
  }

  const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
  const provided = req.headers.get('authorization');

  if (provided !== expected) return unauthorized();
  return NextResponse.next();
}

