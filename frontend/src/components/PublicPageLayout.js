import React from 'react';
import { Box } from '@mui/material';
import GovernmentHeader from './GovernmentHeader';
import PortalFooter from './PortalFooter';

const PUBLIC_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Public Status', to: '/public' },
  { label: 'Sign In', to: '/login' },
  { label: 'Create Account', to: '/register' },
];

export default function PublicPageLayout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC' }}>
      <GovernmentHeader links={PUBLIC_LINKS} />
      <Box component="main" id="main-content" tabIndex={-1} sx={{ flex: 1 }}>
        {children}
      </Box>
      <PortalFooter />
    </Box>
  );
}
