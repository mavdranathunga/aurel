import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/types';
import { decryptSession } from '@/lib/auth';

const jsonFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');

async function isAuthorized() {
  const sessionSecret = process.env.SESSION_SECRET?.trim().replace(/^["']|["']$/g, '');
  if (!sessionSecret) return false;
  
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session');
  if (!sessionCookie) return false;
  
  const decrypted = decryptSession(sessionCookie.value, sessionSecret);
  if (!decrypted) return false;
  
  try {
    const session = JSON.parse(decrypted);
    return session.expires > Date.now();
  } catch (e) {
    return false;
  }
}

export async function GET() {
  try {
    const fileContent = await fs.readFile(jsonFilePath, 'utf8');
    const products = JSON.parse(fileContent);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read products data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    const updatedProducts: Product[] = await request.json();
    
    if (!Array.isArray(updatedProducts)) {
      return NextResponse.json({ error: 'Invalid data format. Expected an array of products.' }, { status: 400 });
    }
    
    await fs.writeFile(jsonFilePath, JSON.stringify(updatedProducts, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, count: updatedProducts.length });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to update products data' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
