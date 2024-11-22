import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  console.log(`Request received at: ${request.url}`); // Log the URL of the request

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  if (request.method === "OPTIONS") {
    console.log("CORS preflight request"); // Log preflight requests
    return NextResponse.json(null, { status: 200, headers: corsHeaders });
  }
  if (["/api/login", "/api/register"].some((path) => request.url.includes(path))) {

    const response = NextResponse.next();
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }
  const userToken = request.cookies.get("token");
  if (!userToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log("6")
  try {
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(userToken.value, secretKey);
    const response = NextResponse.next();
    response.headers.set("x-user", JSON.stringify(payload));
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Invalid token", details: error }, { status: 401 });
  }
}

export const config = {
  matcher: ["/v1/:path*"],
};
