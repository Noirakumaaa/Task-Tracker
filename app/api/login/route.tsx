import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserLoginData {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const body: UserLoginData = await request.json();

  const userLogin = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!userLogin) {
    return NextResponse.json({
      Status: "User Not Found",
    }, { status: 404 });
  }

  const passwordValid = await bcrypt.compare(body.password, userLogin.password);

  if (!passwordValid) {
    return NextResponse.json({
      Status: "Wrong Credentials",
    }, { status: 401 });
  }

  if (!process.env.SECRET_KEY) {
    return NextResponse.json({
      Status: "Internal Server Error, Missing Secret Key"
    }, { status: 500 });
  }

  const token = jwt.sign(
    { userId: userLogin.id, email: userLogin.email },
    process.env.SECRET_KEY!,
  );

  return NextResponse.json({
    Status: "Login Successfully",
    token: token,
    role: "User",
    id: userLogin.id
  });
}
