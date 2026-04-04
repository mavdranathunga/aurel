import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// The user must provide this via .env.local
const resend = new Resend(process.env.RESEND_API_KEY || 'fake-key');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, orderId, pdfBase64 } = body;

    if (!email || !pdfBase64) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Strip the data URL prefix to get raw base64 string for Resend attachment
    const base64Data = pdfBase64.split('base64,')[1];

    // Fallback to the verified owner email if the env variable is missing
    const sellerEmail = process.env.SELLER_EMAIL || 'deshan.99.ranathunga@gmail.com';

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Simulating email send for development.');
      return NextResponse.json({ success: true, simulated: true });
    }

    if (!process.env.SELLER_EMAIL) {
      console.warn('SELLER_EMAIL is not set in .env.local. Defaulting to deshan.99.ranathunga@gmail.com');
    }

    const { data, error } = await resend.emails.send({
      from: 'AUREL Store <onboarding@resend.dev>', // Resend's testing domain
      to: [sellerEmail], // Send exclusively to the seller
      subject: `New Order Received - #${orderId}`,
      text: `Hello,\n\nYou have received a new order (${orderId}) from ${name} (${email}).\n\nPlease find the generated invoice attached for their order details.\n\nBest,\nThe AUREL System`,
      attachments: [
        {
          filename: `AUREL-Invoice-${orderId}.pdf`,
          content: base64Data,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
