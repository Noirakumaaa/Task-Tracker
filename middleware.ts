import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (request.url.includes('/api/login')) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    return response;
  }

  const token = request.cookies.get('token');
  const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const { payload } = await jwtVerify(token.value, secretKey);
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    response.headers.set('x-user', JSON.stringify(payload));
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token', details: error }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/v1/:path*', '/v1/:path*', '/api/login'],
};
