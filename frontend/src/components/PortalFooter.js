import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Public Status', to: '/public' },
  { label: 'Sign In', to: '/login' },
  { label: 'Create Account', to: '/register' },
];

const POLICY_LINKS = [
  ['Privacy Policy', 'Privacy Policy'],
  ['Terms of Use', 'Terms of Use'],
  ['Accessibility Statement', 'Accessibility Statement'],
];

export default function PortalFooter() {
  const updatedDate = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <Box component="footer" sx={{ borderTop: '1px solid #CBD5E1', bgcolor: '#FFFFFF', color: '#334155', px: { xs: 2, md: 3 }, py: 3 }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr 1.5fr' }, gap: 3 }}>
        <Box>
          <Typography component="h2" variant="subtitle1" sx={{ color: '#0F2C59', fontWeight: 700, mb: 1 }}>Quick Links</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {QUICK_LINKS.map((item) => <Link key={item.label} component={RouterLink} to={item.to} sx={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', color: '#0F2C59' }}>{item.label}</Link>)}
          </Box>
        </Box>
        <Box>
          <Typography component="h2" variant="subtitle1" sx={{ color: '#0F2C59', fontWeight: 700, mb: 1 }}>Helpdesk / Nodal Officer</Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>Legal Metrology Portal Helpdesk</Typography>
          <Link href="mailto:support-metrology@gov.in" sx={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', color: '#0F2C59' }}>support-metrology@gov.in</Link>
          <Typography variant="caption" sx={{ display: 'block', color: '#475569' }}>National Consumer Helpline: 1915 / 1800-11-4000</Typography>
        </Box>
        <Box>
          <Typography component="h2" variant="subtitle1" sx={{ color: '#0F2C59', fontWeight: 700, mb: 1 }}>Policies and Accessibility</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {POLICY_LINKS.map(([label, subject]) => (
              <Link key={label} href={`mailto:support-metrology@gov.in?subject=${encodeURIComponent(subject)}`} sx={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', color: '#0F2C59' }}>{label}</Link>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ maxWidth: 1280, mx: 'auto', mt: 2, pt: 2, borderTop: '1px solid #CBD5E1', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1 }}>
        <Typography variant="caption" sx={{ color: '#475569' }}>Last Updated: {updatedDate}</Typography>
        <Typography variant="caption" sx={{ color: '#475569' }}>
          SIH-26036 initiative. This project prototype is not an official Government of India website or communication.
        </Typography>
      </Box>
    </Box>
  );
}
