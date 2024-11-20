import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const allowedOrigins = ['https://task-tracker-x10o.onrender.com'];
  const origin = request.headers.get('Origin') || '';

  const response = NextResponse.next();

  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  } else {
    return NextResponse.json({ error: 'CORS Not Allowed' }, { status: 403 });
  }

  if (request.method === 'OPTIONS') {
    return response;
  }

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
  matcher: ['/api/v1/:path*', '/v1/:path*'],
};
