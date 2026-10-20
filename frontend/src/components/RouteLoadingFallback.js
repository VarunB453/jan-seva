import React from 'react';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';

export default function RouteLoadingFallback() {
  return (
    <Box
      role="status"
      aria-label="Loading page"
      aria-busy="true"
      sx={{ minHeight: '100vh', bgcolor: '#F8FAFC', px: 2, py: { xs: 4, md: 8 } }}
    >
      <Card sx={{ maxWidth: 960, mx: 'auto', overflow: 'hidden' }}>
        <Box sx={{ height: 8, bgcolor: '#0F2C59' }} />
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Typography component="span" sx={{ display: 'block', color: '#475569', fontSize: '0.875rem', mb: 1 }}>
            National Public Service Portal
          </Typography>
          <Skeleton variant="text" width="48%" height={48} />
          <Skeleton variant="text" width="72%" height={28} sx={{ mb: 3 }} />
          <Skeleton variant="rounded" height={150} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" width={180} height={44} />
        </CardContent>
      </Card>
    </Box>
  );
}
