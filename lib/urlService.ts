import { customAlphabet } from 'nanoid';
import { query } from './db';

type UrlRow = {
  id: number;
  code: string;
  original_url: string;
};

const generateCode = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);

export async function createShortUrl(originalUrl: string) {
  // Try multiple times in case of a rare code collision.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const code = generateCode();
    const result = await query<UrlRow>(
      'INSERT INTO shortened_urls (code, original_url) VALUES ($1, $2) ON CONFLICT (code) DO NOTHING RETURNING code',
      [code, originalUrl]
    );

    if (result.rowCount === 1) {
      return result.rows[0].code;
    }
  }

  throw new Error('Failed to generate a unique short code. Please try again.');
}

export async function findOriginalUrl(code: string) {
  const result = await query<UrlRow>('SELECT * FROM shortened_urls WHERE code = $1 LIMIT 1', [code]);
  return result.rows[0]?.original_url ?? null;
}
