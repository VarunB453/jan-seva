import React from 'react';
import { Box, Skeleton } from '@mui/material';

export default function DataLoadingSkeleton({ label = 'Loading results', rows = 4, columns = 4 }) {
  return (
    <Box
      role="status"
      aria-label={label}
      aria-busy="true"
      sx={{ width: '100%', p: 2 }}
    >
      <Box
        aria-hidden="true"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: `repeat(${columns}, minmax(0, 1fr))`,
          },
          gap: 1.5,
        }}
      >
        {Array.from({ length: rows }, (_, row) => (
          <React.Fragment key={row}>
            {Array.from({ length: columns }, (_, column) => (
              <Skeleton key={column} variant="rounded" height={36} />
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
