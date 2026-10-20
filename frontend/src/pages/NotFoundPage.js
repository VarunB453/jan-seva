import React from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PublicPageLayout from '../components/PublicPageLayout';

export default function NotFoundPage() {
  return (
    <PublicPageLayout>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 9 } }}>
        <Paper
          component="section"
          aria-labelledby="not-found-title"
          sx={{ p: { xs: 3, sm: 5 }, borderTop: '6px solid #0F2C59 !important' }}
        >
          <Typography component="p" sx={{ color: '#475569', fontWeight: 700, mb: 1 }}>
            ERROR 404
          </Typography>
          <Typography
            id="not-found-title"
            component="h1"
            variant="h3"
            sx={{ color: '#0F2C59', fontWeight: 700, mb: 2 }}
          >
            Page Not Found (404)
          </Typography>
          <Typography sx={{ color: '#334155', mb: 3 }}>
            The page you are looking for may have moved or may no longer be available.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Button component={Link} to="/" variant="contained">
              Go to Homepage
            </Button>
            <Button component={Link} to="/public" variant="outlined">
              Track Status
            </Button>
          </Box>
        </Paper>
      </Container>
    </PublicPageLayout>
  );
}
