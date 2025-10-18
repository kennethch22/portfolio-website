import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendVerificationCode, generateVerificationCode } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Check if email is admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Generate code
    const code = generateVerificationCode();
    
    // Store in database
    await prisma.adminVerification.create({
      data: {
        email,
        code,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });
    
    // Send email
    const result = await sendVerificationCode(email, code);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Request code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}