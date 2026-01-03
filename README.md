# URL Shortener

A minimal Next.js + MUI URL shortener that stores links in Postgres.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

   If your environment uses an HTTP(S) proxy or custom certificate authority, npm can pick
   those up automatically from standard environment variables. This repository ships a
   `.npmrc` that will honor `HTTP_PROXY`, `HTTPS_PROXY`, and `SSL_CERT_FILE` if they are
   present. You can also override the registry with `NPM_CONFIG_REGISTRY` when a corporate
   mirror is required. If you still see a `403 Forbidden` error from the default npm
   registry, try exporting the proxy and registry values explicitly before installing:

   ```bash
   export HTTP_PROXY=http://proxy:8080
   export HTTPS_PROXY=http://proxy:8080
   export NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
   npm install
   ```

2. Set environment variables (copy `.env.example`):

   ```bash
   cp .env.example .env
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) and start shortening links.

### How to use

1. Start Postgres (example using Docker):

   ```bash
   docker run --name url-shortener-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=url_shortener -p 5432:5432 -d postgres:15
   ```

2. Copy the environment file and confirm `DATABASE_URL` matches your database connection (the example above already works with the default `.env.example`).

   ```bash
   cp .env.example .env
   ```

3. Run the app locally:

   ```bash
   npm run dev
   ```

4. Shorten a link:
   - Paste a full URL into the single input field on the homepage and press **Shorten**.
   - The app returns a compact URL (e.g., `http://localhost:3000/abc123`).
   - Share the short URL; visiting it will redirect to the original destination.

5. Call the API directly (optional):

   ```bash
   curl -X POST http://localhost:3000/api/shorten \
     -H 'Content-Type: application/json' \
     -d '{"url":"https://example.com"}'
   ```

   The response includes the short link under `shortUrl`.

## API

`POST /api/shorten` with a JSON body `{ "url": "https://example.com" }` returns `{ "shortUrl": "http://localhost:3000/abc123" }`.

Visiting `/abc123` redirects to the stored destination.

## Docker

Build and run the production image:

```bash
docker build -t url-shortener .
docker run -p 3000:3000 --env-file .env url-shortener
```
