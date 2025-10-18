import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();
    
    // Find verification record
    const verification = await prisma.adminVerification.findFirst({
      where: {
        email,
        code,
        used: false,
        expires: {
          gt: new Date(), // Not expired
        },
      },
    });
    
    if (!verification) {
      return NextResponse.json(
        { error: 'Invalid or expired code' },
        { status: 400 }
      );
    }
    
    // Mark as used
    await prisma.adminVerification.update({
      where: { id: verification.id },
      data: { used: true },
    });
    
    // Update user to admin
    await prisma.user.update({
      where: { email },
      data: { isAdmin: true },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Verify code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}