'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setShortUrl(null);

    try {
      setLoading(true);
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error ?? 'Unable to shorten URL');
      }

      setShortUrl(result.shortUrl);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Card elevation={0} sx={{ maxWidth: 520, width: '100%', border: '1px solid #e5e7eb' }}>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                URL Shortener
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Paste a long link and get a clean, shareable short link powered by Postgres.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2} direction="column">
                <TextField
                  label="Long URL"
                  placeholder="https://example.com/your/long/url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  fullWidth
                  required
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!url || loading}
                  startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
                >
                  {loading ? 'Creating link...' : 'Shorten URL'}
                </Button>
              </Stack>
            </Box>

            {shortUrl && (
              <Box sx={{ p: 2, backgroundColor: '#f1f5f9', borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Short link
                </Typography>
                <Link href={shortUrl} underline="hover" fontWeight={600} target="_blank" rel="noreferrer">
                  {shortUrl}
                </Link>
              </Box>
            )}

            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </main>
  );
}
