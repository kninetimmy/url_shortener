import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Please add it to your environment.');
}

const pool = new Pool({ connectionString });

const tableReady = pool.query(`
  CREATE TABLE IF NOT EXISTS shortened_urls (
    id SERIAL PRIMARY KEY,
    code VARCHAR(32) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`);

export async function query<T>(text: string, params?: unknown[]) {
  await tableReady;
  return pool.query<T>(text, params);
}

export default pool;
