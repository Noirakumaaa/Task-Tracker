import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle OPTIONS preflight request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Add CORS headers for all requests
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
  response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
  response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);

  // Allow public routes like login and register to pass without token verification
  if (request.url.includes('/api/login') || request.url.includes('/api/register')) {
    return response;
  }

  // Token verification for protected routes
  const token = request.cookies.get('token');
  const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const { payload } = await jwtVerify(token.value, secretKey);
    response.headers.set('x-user', JSON.stringify(payload));
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token', details: error }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/v1/:path*', '/v1/:path*', '/api/login', '/api/register'],
};
