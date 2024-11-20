import prisma from '@/prisma/client';  
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);


    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);  
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
}
  }

