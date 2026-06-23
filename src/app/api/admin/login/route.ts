import { NextResponse } from 'next/server';
import { verifyPassword, encryptSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const storedHash = process.env.ADMIN_PASSWORD_HASH?.trim().replace(/^["']|["']$/g, '');
    const sessionSecret = process.env.SESSION_SECRET?.trim().replace(/^["']|["']$/g, '');

    if (!storedHash || !sessionSecret) {
      return NextResponse.json({ error: 'Authentication is not configured on the server.' }, { status: 500 });
    }

    const isValid = verifyPassword(password, storedHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    const token = encryptSession(JSON.stringify({ loggedIn: true }), sessionSecret);

    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      // No maxAge = session cookie: deleted when browser is closed
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
