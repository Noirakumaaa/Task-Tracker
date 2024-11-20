import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

  // Define CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins or specify a specific domain like 'http://example.com'
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allowed headers
  };

  // Handle preflight request (OPTIONS)
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
  }

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const { payload } = await jwtVerify(token.value, secretKey);
    console.log("Verified Payload:", payload);

    const response = NextResponse.next();
    response.headers.set('x-user', JSON.stringify(payload));

    // Set CORS headers on the response
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token', details: error }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/v1/:path*', '/v1/:path*'],
};
