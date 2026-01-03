import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <main>
      <Box textAlign="center" sx={{ maxWidth: 480 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Link not found
        </Typography>
        <Typography color="text.secondary" paragraph>
          We couldn&apos;t find a destination for this short code. Double-check the link or create a new one.
        </Typography>
        <Button component={Link} href="/" variant="contained">
          Create a short link
        </Button>
      </Box>
    </main>
  );
}
