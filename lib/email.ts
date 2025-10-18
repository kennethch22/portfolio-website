import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationCode(email: string, code: string) {
  try {
    await resend.emails.send({
      from: 'Portfolio Admin <onboarding@resend.dev>',
      to: email,
      subject: 'Your Admin Verification Code',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00E5B0;">Admin Verification Code</h1>
          <p>Your verification code is:</p>
          <div style="background: #0B0F14; color: #00E5B0; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; border-radius: 8px;">
            ${code}
          </div>
          <p style="color: #666; margin-top: 20px;">This code will expire in 10 minutes.</p>
          <p style="color: #666;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}