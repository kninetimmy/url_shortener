import { NextResponse } from 'next/server';
import { createShortUrl } from '@/lib/urlService';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inputUrl = body?.url;

    if (!inputUrl || typeof inputUrl !== 'string') {
      return NextResponse.json({ error: 'A valid URL is required.' }, { status: 400 });
    }

    let normalizedUrl: string;
    try {
      const parsed = new URL(inputUrl);
      normalizedUrl = parsed.toString();
    } catch (error) {
      return NextResponse.json({ error: 'Please provide a valid URL.' }, { status: 400 });
    }

    const code = await createShortUrl(normalizedUrl);
    const requestUrl = new URL(request.url);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? `${requestUrl.protocol}//${requestUrl.host}`;
    const shortUrl = `${baseUrl}/${code}`;

    return NextResponse.json({ shortUrl });
  } catch (error) {
    console.error('Error shortening URL', error);
    return NextResponse.json({ error: 'Unexpected error creating short link.' }, { status: 500 });
  }
}
