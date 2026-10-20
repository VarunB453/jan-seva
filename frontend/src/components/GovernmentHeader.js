import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link, useLocation } from 'react-router-dom';

const FONT_SIZES = [90, 100, 115];

export default function GovernmentHeader({ links = [], onSignIn, roleTitle }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [language, setLanguage] = useState(() => (
    document.documentElement.lang.startsWith('hi') ? 'hi' : 'en'
  ));

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen]);

  const toggleLanguage = () => {
    const nextLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage === 'hi' ? 'hi-IN' : 'en-IN';
  };

  const renderLink = (item, mobile = false) => {
    const active = item.to ? location.pathname === item.to : location.hash === item.href;
    const sx = {
      minWidth: 44,
      minHeight: 44,
      px: 1.25,
      color: active ? '#0F2C59' : '#334155',
      fontWeight: active ? 700 : 600,
      textDecoration: 'none',
      borderBottom: active ? '3px solid #0F2C59' : '3px solid transparent',
      borderRadius: 0,
      justifyContent: mobile ? 'flex-start' : 'center',
      '&:hover': { bgcolor: '#EFF6FF', color: '#0F2C59' },
    };
    return mobile ? (
      <ListItem key={item.label} disablePadding>
        <ListItemButton
          component={item.to ? Link : 'a'}
          to={item.to || undefined}
          href={item.href || undefined}
          onClick={() => setMobileOpen(false)}
          aria-current={active ? 'page' : undefined}
          sx={sx}
        >
          <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: active ? 700 : 600 }} />
        </ListItemButton>
      </ListItem>
    ) : (
      <Button
        key={item.label}
        component={item.to ? Link : 'a'}
        to={item.to || undefined}
        href={item.href || undefined}
        aria-current={active ? 'page' : undefined}
        sx={sx}
      >
        {item.label}
      </Button>
    );
  };

  return (
    <header>
      <Box sx={{ minHeight: 44, bgcolor: '#0F172A', color: '#FFFFFF', px: { xs: 1.5, md: 3 } }}>
        <Box sx={{ maxWidth: 1280, minHeight: 44, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography component="span" sx={{ color: '#FFFFFF', fontSize: '0.78rem', fontWeight: 700 }}>
              भारत सरकार | GOVERNMENT OF INDIA
            </Typography>
            <Typography component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 1.5, color: '#FFFFFF', fontSize: '0.75rem' }}>
              {roleTitle || 'Legal Metrology Verification and Certification Portal'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 0.5 }}>
            <Button component="a" href="#main-content" sx={{ minWidth: 44, minHeight: 44, px: 1, color: '#FFFFFF', fontSize: '0.75rem', textDecoration: 'underline', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}>
              Skip to Main Content
            </Button>
            {FONT_SIZES.map((size) => (
              <Button
                key={size}
                onClick={() => setFontSize(size)}
                aria-label={`Set text size to ${size}%`}
                aria-pressed={fontSize === size}
                sx={{ minWidth: 44, minHeight: 44, color: '#FFFFFF', px: 0.75, fontWeight: fontSize === size ? 800 : 500, textDecoration: fontSize === size ? 'underline' : 'none' }}
              >
                {size === 90 ? 'A-' : size === 115 ? 'A+' : 'A'}
              </Button>
            ))}
            <Button onClick={toggleLanguage} aria-label="Change language" sx={{ minWidth: 72, minHeight: 44, color: '#FFFFFF', px: 1, fontWeight: 700 }}>
              {language === 'en' ? 'English' : 'हिन्दी'}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #CBD5E1' }}>
        <Box sx={{ maxWidth: 1280, minHeight: 76, mx: 'auto', px: { xs: 1.5, md: 3 }, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box component={Link} to="/" sx={{ minHeight: 44, display: 'flex', alignItems: 'center', gap: 1.5, color: '#0F2C59', textDecoration: 'none' }}>
            <Box aria-hidden="true" sx={{ width: 44, height: 44, flexShrink: 0, border: '1px solid #CBD5E1', borderRadius: 1, display: 'grid', placeItems: 'center', color: '#0F2C59' }}>
              <AccountBalanceRoundedIcon />
            </Box>
            <Box>
              <Typography component="span" sx={{ display: 'block', color: '#0F2C59', fontWeight: 800, fontSize: { xs: '0.9rem', sm: '1.1rem' }, lineHeight: 1.3 }}>
                National Public Service Portal
              </Typography>
              <Typography component="span" sx={{ display: { xs: 'none', sm: 'block' }, color: '#475569', fontSize: '0.75rem', lineHeight: 1.4 }}>
                Legal Metrology Verification and Certification • SIH-26036
              </Typography>
            </Box>
          </Box>

          <Box component="nav" aria-label="Primary Navigation" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.25 }}>
            {links.map((item) => renderLink(item))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {onSignIn && (
              <Button onClick={onSignIn} variant="contained" sx={{ minWidth: 44, minHeight: 44, bgcolor: '#0F2C59', '&:hover': { bgcolor: '#1E3A8A' } }}>
                Sign in
              </Button>
            )}
            {links.length > 0 && (
              <IconButton
                aria-label="Open primary navigation"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: 'inline-flex', md: 'none' }, width: 44, height: 44, border: '1px solid #CBD5E1', color: '#0F2C59' }}
              >
                <MenuRoundedIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { width: { xs: 'min(88vw, 360px)', sm: 360 }, p: 2 } }}>
        <Box onKeyDown={(event) => event.key === 'Escape' && setMobileOpen(false)} role="presentation">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" component="h2" sx={{ color: '#0F2C59', fontWeight: 700 }}>Primary Navigation</Typography>
            <IconButton aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} sx={{ width: 44, height: 44 }}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <nav aria-label="Mobile Primary Navigation">
            <List>{links.map((item) => renderLink(item, true))}</List>
            {onSignIn && <Button fullWidth variant="contained" onClick={() => { setMobileOpen(false); onSignIn(); }} sx={{ minHeight: 44, mt: 1 }}>Sign in</Button>}
          </nav>
        </Box>
      </Drawer>
    </header>
  );
}
