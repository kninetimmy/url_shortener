import { notFound, redirect } from 'next/navigation';
import { findOriginalUrl } from '@/lib/urlService';

export const dynamic = 'force-dynamic';

export default async function RedirectPage({ params }: { params: { code: string } }) {
  const originalUrl = await findOriginalUrl(params.code);

  if (!originalUrl) {
    notFound();
  }

  redirect(originalUrl);
}
