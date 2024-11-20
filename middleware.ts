import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins or a specific one like 'http://localhost:3000'
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allowed headers
  };

  // Handle OPTIONS preflight request (for CORS)
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Public routes (like login, sign-up) don't require token verification
  if (request.url.includes('/api/login')) {
    const response = NextResponse.next();
    // Add CORS headers to the response for login route
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    return response;
  }

  // Token verification logic for protected routes
  const token = request.cookies.get('token');
  const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token.value, secretKey);
    console.log("Verified Payload:", payload);

    const response = NextResponse.next();

    // Set the CORS headers for authenticated routes
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
  matcher: ['/api/v1/:path*', '/v1/:path*', '/api/login'], // Include /api/login in the matcher
};
