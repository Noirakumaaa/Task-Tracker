import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));

  }

  try {
    const { payload } = await jwtVerify(token.value, secretKey);
    console.log("Verified Payload:", payload);
    const response = NextResponse.next();
    response.headers.set('x-user', JSON.stringify(payload));
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token', details: error }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/v1/:path*', '/v1/:path*'],
};
