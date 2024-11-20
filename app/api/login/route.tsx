import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const userLogin = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userLogin) {
    const passwordValid = await bcrypt.compare(body.password, userLogin.password);

    if (passwordValid) {
      const token = jwt.sign(
        { userId: userLogin.id, email: userLogin.email }, 
        process.env.SECRET_KEY!, 
        { expiresIn: '1h' } 
      );

      return NextResponse.json({
        Status: "Login Successfully",
        token: token ,
        role : "User"
      });
    }

    return NextResponse.json({
      Status: "Wrong Credentials"
    });
  }

  return NextResponse.json({
    Status: "User Not Found"
  });
}
