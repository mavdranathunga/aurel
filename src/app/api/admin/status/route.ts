import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptSession } from '@/lib/auth';

export async function GET() {
  const sessionSecret = process.env.SESSION_SECRET?.trim().replace(/^["']|["']$/g, '');
  if (!sessionSecret) {
    return NextResponse.json({ authenticated: false, error: 'Auth not configured' });
  }
  
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  
  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false });
  }
  
  const decrypted = decryptSession(sessionCookie.value, sessionSecret);
  if (!decrypted) {
    return NextResponse.json({ authenticated: false });
  }
  
  try {
    const session = JSON.parse(decrypted);
    if (!session.loggedIn) {
      return NextResponse.json({ authenticated: false });
    }
    return NextResponse.json({ authenticated: true });
  } catch (e) {
    return NextResponse.json({ authenticated: false });
  }
}
export const dynamic = 'force-dynamic';
