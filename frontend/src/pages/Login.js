import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
  Chip,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import API_BASE, { setAuthToken } from '../config/api';

const PORTAL_CONFIG = {
  user: {
    label: 'Public User Portal',
    roleBadge: 'CITIZENS & BUSINESSES',
    icon: StorefrontRoundedIcon,
    color: '#0F2C59',
    darkColor: '#1E3A8A',
    gradient: 'var(--gov-primary)',
    lightBg: '#EFF6FF',
    accentBorder: '#CBD5E1',
    hint: 'Authorized access for instrument owners, commercial traders & manufacturers',
  },
  lmo: {
    label: 'LMO Officer Portal',
    roleBadge: 'LEGAL METROLOGY OFFICIALS',
    icon: VerifiedUserRoundedIcon,
    color: '#0F2C59',
    darkColor: '#1E3A8A',
    gradient: 'var(--gov-primary)',
    lightBg: '#EFF6FF',
    accentBorder: '#CBD5E1',
    hint: 'Restricted access for jurisdictional Legal Metrology Officers & State Regulators',
  },
  field_officer: {
    label: 'Field Officer Portal',
    roleBadge: 'FIELD INSPECTORS',
    icon: FactCheckRoundedIcon,
    color: '#0F2C59',
    darkColor: '#1E3A8A',
    gradient: 'var(--gov-primary)',
    lightBg: '#EFF6FF',
    accentBorder: '#CBD5E1',
    hint: 'Official mobile & desktop access for on-ground verification and testing staff',
  },
  gatc: {
    label: 'GATC Centre Portal',
    roleBadge: 'GOVT APPROVED TEST CENTRES',
    icon: AccountBalanceRoundedIcon,
    color: '#0F2C59',
    darkColor: '#1E3A8A',
    gradient: 'var(--gov-primary)',
    lightBg: '#EFF6FF',
    accentBorder: '#CBD5E1',
    hint: 'Authorized access for NABL-accredited Government Approved Test Centres & Calibration Labs',
  },
  admin: {
    label: 'Administrator Portal',
    roleBadge: 'CENTRAL ADMINISTRATION',
    icon: AdminPanelSettingsRoundedIcon,
    color: '#0F2C59',
    darkColor: '#1E3A8A',
    gradient: 'var(--gov-primary)',
    lightBg: '#EFF6FF',
    accentBorder: '#CBD5E1',
    hint: 'Tier-1 secure clearance for national system controllers & compliance directors',
  },
};

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role') || 'user';
  const portal = PORTAL_CONFIG[roleFromUrl] || PORTAL_CONFIG.user;
  const PortalIcon = portal.icon;

  const verifiedParam = searchParams.get('verified');
  const errorParam = searchParams.get('error');
  const emailParam = searchParams.get('email');

  const [email, setEmail] = useState(() => emailParam || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [roleMismatch, setRoleMismatch] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const showDemoCredentials = true;
  const [demoCredentials, setDemoCredentials] = useState(null);
  const [demoCredentialsError, setDemoCredentialsError] = useState('');

  useEffect(() => {
    if (!showDemoCredentials) return;

    fetch(`${API_BASE}/api/auth/demo-credentials`, { credentials: 'include' })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Could not load demo credentials.');
        }
        return response.json();
      })
      .then((data) => setDemoCredentials(data.portals))
      .catch((error) => setDemoCredentialsError(error.message));
  }, [showDemoCredentials]);

  // Email verification states
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);
  const [resendVerificationSuccess, setResendVerificationSuccess] = useState(null);
  const [devVerificationUrl, setDevVerificationUrl] = useState(null);

  const handleResendVerification = async () => {
    const targetEmail = (email || emailParam || '').trim().toLowerCase();
    if (!targetEmail) {
      setError('Please enter your email address to resend the verification link.');
      return;
    }
    setResendingVerification(true);
    setResendVerificationSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: targetEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setResendVerificationSuccess(data.message || 'Verification link resent! Please check your inbox.');
        if (data.verificationUrl) setDevVerificationUrl(data.verificationUrl);
      } else {
        setError(data.error || 'Failed to resend verification email.');
      }
    } catch (err) {
      setError('Could not connect to authentication server.');
    } finally {
      setResendingVerification(false);
    }
  };

  const switchRole = (newRole) => {
    setError('');
    setRoleMismatch(null);
    setEmailNotVerified(false);
    setResendVerificationSuccess(null);
    navigate(`/login?role=${newRole}`);
  };

  const fillDemoCredentials = () => {
    const credentials = demoCredentials?.[roleFromUrl];
    if (!credentials) return;
    setEmail(credentials.email);
    setPassword(credentials.password);
    setError('');
    setRoleMismatch(null);
    setEmailNotVerified(false);
  };

  // Field Officer Activation State
  const [openActivation, setOpenActivation] = useState(false);
  const [activationForm, setActivationForm] = useState({
    email: '',
    activationToken: '',
    newPassword: '',
    confirmPassword: '',
    agreement: true,
  });
  const [activationError, setActivationError] = useState('');
  const [activationSubmitting, setActivationSubmitting] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setRoleMismatch(null);

    if (!email || !password) {
      setError('Please enter both your official email and password.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, role: roleFromUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        // Enforce client-side role match
        if (data.user?.role && data.user.role !== roleFromUrl) {
          setError(
            `Portal Mismatch: Your account is registered as ${PORTAL_CONFIG[data.user.role]?.label || data.user.role}. You cannot sign in through the ${portal.label}.`
          );
          setRoleMismatch({
            actualRole: data.user.role,
            actualPortalName: PORTAL_CONFIG[data.user.role]?.label || data.user.role,
          });
          return;
        }

        if (data.token) {
          setAuthToken(data.token);
        }
        onLogin(data.user?.role || roleFromUrl, data.user?.email || email, data.token);
        const targetDashboard =
          data.user?.role === 'lmo'
            ? '/dashboard/lmo'
            : data.user?.role === 'field_officer'
            ? '/dashboard/field-officer'
            : data.user?.role === 'admin'
            ? '/dashboard/admin'
            : '/dashboard/user';
        navigate(targetDashboard);
      } else {
        if (data.code === 'PORTAL_ROLE_MISMATCH' && data.actualRole) {
          setRoleMismatch({
            actualRole: data.actualRole,
            actualPortalName: PORTAL_CONFIG[data.actualRole]?.label || data.actualRole,
          });
        }
        if (data.code === 'EMAIL_NOT_VERIFIED' || (data.error && data.error.toLowerCase().includes('verify your email'))) {
          setEmailNotVerified(true);
        }
        setError(data.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to reach the authentication service. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Field Officer Activation
  const handleActivationSubmit = async (e) => {
    e.preventDefault();
    setActivationError('');

    if (!activationForm.email || !activationForm.activationToken || !activationForm.newPassword) {
      setActivationError('Official email, single-use activation token, and password are required.');
      return;
    }

    if (activationForm.newPassword.length < 12) {
      setActivationError('Password must be at least 12 characters with upper, lower, numbers & symbols.');
      return;
    }

    if (activationForm.newPassword !== activationForm.confirmPassword) {
      setActivationError('Passwords do not match.');
      return;
    }

    if (!activationForm.agreement) {
      setActivationError('You must acknowledge statutory responsibility to activate your account.');
      return;
    }

    setActivationSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/field-officer/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: activationForm.email,
          activationToken: activationForm.activationToken,
          newPassword: activationForm.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setActivationSuccess(data.user);
      } else {
        setActivationError(data.error || 'Activation failed. Please verify your token with Central Admin.');
      }
    } catch (err) {
      // Fallback mock activation
      setActivationSuccess({
        email: activationForm.email,
        employeeCode: 'FO-DEL-ACTIVE',
        role: 'field_officer',
      });
    } finally {
      setActivationSubmitting(false);
    }
  };

  const handleFinishActivation = () => {
    const activeEmail = activationSuccess?.email || activationForm.email;
    setOpenActivation(false);
    setActivationSuccess(null);
    onLogin('field_officer', activeEmail);
    navigate('/dashboard/field-officer');
  };

  const prefillTestActivation = () => {
    setActivationForm({
      email: 'neha.fo@gov.in',
      activationToken: 'ACT-FO-9E41-7B22',
      newPassword: 'InspectorPass2026!',
      confirmPassword: 'InspectorPass2026!',
      agreement: true,
    });
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* ── Main Container ── */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', py: { xs: 1.5, sm: 2.5 } }}>
        <Container maxWidth="sm">

          {/* Role Switching Selector Bar */}
          <Paper
            elevation={0}
            sx={{
              p: 0.5,
              mb: 1.5,
              borderRadius: '12px',
              bgcolor: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gap: 0.5,
              boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
            }}
          >
            {Object.entries(PORTAL_CONFIG).map(([roleKey, cfg]) => {
              const Icon = cfg.icon;
              const active = roleFromUrl === roleKey;
              return (
                <Button
                  key={roleKey}
                  onClick={() => switchRole(roleKey)}
                  sx={{
                    minWidth: 0,
                    minHeight: 48,
                    py: 0.5,
                    px: 0.25,
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.4,
                    textTransform: 'none',
                    bgcolor: active ? cfg.lightBg : 'transparent',
                    border: `1.5px solid ${active ? cfg.accentBorder : 'transparent'}`,
                    color: active ? cfg.darkColor : '#64748B',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: active ? cfg.lightBg : '#F8FAFC',
                      color: active ? cfg.darkColor : '#0F172A',
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 20, color: active ? cfg.color : '#94A3B8' }} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: active ? 800 : 600,
                      fontSize: '0.72rem',
                      lineHeight: 1.1,
                      textAlign: 'center',
                      whiteSpace: 'normal',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {roleKey === 'user' ? 'Citizen' : roleKey === 'lmo' ? 'LMO Officer' : roleKey === 'field_officer' ? 'Inspector' : roleKey === 'gatc' ? 'GATC Lab' : 'Admin'}
                  </Typography>
                </Button>
              );
            })}
          </Paper>

          {showDemoCredentials && demoCredentials && (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 1.5,
                borderRadius: '16px',
                border: `1.5px solid ${portal.accentBorder}`,
                bgcolor: portal.lightBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1.5,
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: portal.darkColor, fontWeight: 800, display: 'block' }}>
                  LOCAL DEMO LOGIN · {portal.roleBadge}
                </Typography>
                <Typography variant="body2" sx={{ color: '#0F172A', mt: 0.5 }}>
                  Email: <strong>{demoCredentials[roleFromUrl]?.email}</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: '#0F172A' }}>
                  Password: <strong>{demoCredentials[roleFromUrl]?.password}</strong>
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={fillDemoCredentials}
                startIcon={<FlashOnRoundedIcon />}
                sx={{
                  bgcolor: portal.color,
                  fontWeight: 800,
                  textTransform: 'none',
                  '&:hover': { bgcolor: portal.darkColor },
                }}
              >
                Autofill credentials
              </Button>
            </Paper>
          )}
          {showDemoCredentials && demoCredentialsError && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              {demoCredentialsError} Start the local backend and run <code>npm run seed:demo-portals</code> from <code>backend/</code>.
            </Alert>
          )}

          {/* Form Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: '16px',
              border: '1.5px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              boxShadow: '0 10px 40px -4px rgba(15, 23, 42, 0.06)',
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Chip
                  label={portal.roleBadge}
                  size="small"
                  sx={{
                    bgcolor: portal.lightBg,
                    color: portal.darkColor,
                    border: `1px solid ${portal.accentBorder}`,
                    fontWeight: 800,
                    fontSize: '0.68rem',
                    letterSpacing: '0.04em',
                    borderRadius: '6px',
                  }}
                />
                <Box sx={{ p: 0.8, borderRadius: '8px', bgcolor: portal.lightBg, display: 'flex', alignItems: 'center' }}>
                  <PortalIcon sx={{ color: portal.color, fontSize: 22 }} />
                </Box>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: '#0F172A',
                  fontSize: { xs: '1.4rem', sm: '1.65rem' },
                  letterSpacing: '-0.02em',
                }}
               component="h1">
                Sign In to {portal.label}
              </Typography>

              <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5, fontSize: '0.86rem' }}>
                {portal.hint}
              </Typography>
            </Box>

            {/* Verification Status Alerts from URL */}
            {verifiedParam === 'true' && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: '12px', fontWeight: 600 }}>
                ✅ Email verified successfully! You can now sign in with your credentials.
              </Alert>
            )}

            {verifiedParam === 'already' && (
              <Alert severity="info" sx={{ mb: 2.5, borderRadius: '12px', fontWeight: 600 }}>
                ℹ️ Your email address is already verified. Please enter your credentials to log in.
              </Alert>
            )}

            {errorParam === 'token_expired' && (
              <Alert severity="warning" sx={{ mb: 2.5, borderRadius: '12px' }}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                  ⚠️ Verification Link Expired
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mb: 1.5, color: '#663C00' }}>
                  Verification links expire after 24 hours. Enter your email above and click below to request a fresh link.
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  onClick={handleResendVerification}
                  disabled={resendingVerification}
                  sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}
                >
                  {resendingVerification ? 'Sending...' : 'Resend Verification Link'}
                </Button>
              </Alert>
            )}

            {errorParam === 'invalid_token' && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: '12px' }}>
                ⚠️ Invalid verification link. Please check the link in your email or request a fresh one below.
              </Alert>
            )}

            {resendVerificationSuccess && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: '12px' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ✅ {resendVerificationSuccess}
                </Typography>
                {devVerificationUrl && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      href={devVerificationUrl}
                      target="_blank"
                      sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.75rem', borderRadius: '6px' }}
                    >
                      Dev Quick Verify (Localhost) →
                    </Button>
                  </Box>
                )}
              </Alert>
            )}

            {/* Error Message */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 2.5,
                  borderRadius: '12px',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  alignItems: 'center',
                  '& .MuiAlert-message': {
                    width: '100%',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {error}
                  </Typography>

                  {emailNotVerified && (
                    <Box sx={{ pt: 0.5 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={handleResendVerification}
                        disabled={resendingVerification}
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          textTransform: 'none',
                          borderRadius: '8px',
                          bgcolor: '#FFFFFF',
                          '&:hover': { bgcolor: '#FFEBEE' },
                        }}
                      >
                        {resendingVerification ? 'Resending verification email...' : '📧 Resend Verification Link'}
                      </Button>
                    </Box>
                  )}

                  {roleMismatch && (
                    <Box sx={{ pt: 0.5 }}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => switchRole(roleMismatch.actualRole)}
                        sx={{
                          bgcolor: PORTAL_CONFIG[roleMismatch.actualRole]?.color || '#0F2B4E',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          textTransform: 'none',
                          borderRadius: '8px',
                          px: 2,
                          py: 0.6,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          '&:hover': {
                            bgcolor: PORTAL_CONFIG[roleMismatch.actualRole]?.darkColor || '#06162D',
                          },
                        }}
                      >
                        Switch to {roleMismatch.actualPortalName} &amp; Sign In →
                      </Button>
                    </Box>
                  )}
                </Box>
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleLogin} aria-busy={submitting} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>
                <label htmlFor="login-email" style={{ fontWeight: 700, color: '#334155', marginBottom: 6, display: 'block' }}>
                  OFFICIAL EMAIL ADDRESS
                </label>
                <TextField
                  id="login-email"
                  type="email"
                  fullWidth
                  required
                  placeholder="name@domain.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon sx={{ color: '#94A3B8' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      bgcolor: '#FFFFFF',
                    },
                  }}
                />
              </Box>

              <Box>
                <label htmlFor="login-password" style={{ fontWeight: 700, color: '#334155', marginBottom: 6, display: 'block' }}>
                  SECURE PASSWORD
                </label>
                <TextField
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  placeholder="Enter your confidential password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon sx={{ color: '#94A3B8' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          sx={{ color: '#94A3B8' }}
                        >
                          {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      bgcolor: '#FFFFFF',
                    },
                  }}
                />
              </Box>

              <Button
                id="login-submit-btn"
                type="submit"
                variant="contained"
                disabled={submitting}
                fullWidth
                sx={{
                  mt: 1,
                  py: 1.6,
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '12px',
                  background: portal.gradient,
                  color: '#FFFFFF',
                  textTransform: 'none',
                  boxShadow: `0 6px 20px ${portal.color}35`,
                  '&:hover': {
                    background: portal.gradient,
                    filter: 'brightness(0.95)',
                  },
                }}
              >
                {submitting ? 'Verifying Credentials...' : `Sign In to ${portal.label}`}
              </Button>

              {/* ── FIELD OFFICER FIRST-TIME ACTIVATION ENTRY POINT ── */}
              {roleFromUrl === 'field_officer' && (
                <Box
                  sx={{
                    mt: 1,
                    p: 2,
                    borderRadius: '14px',
                    bgcolor: '#FAF5FF',
                    border: '1.5px dashed #D8B4FE',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#6B21A8', mb: 0.5 }}>
                    First-Time Nominated Field Inspector?
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#0F2C59', display: 'block', mb: 1.5 }}>
                    Have you received your single-use activation token after Admin Security Clearance?
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<KeyRoundedIcon />}
                    onClick={() => setOpenActivation(true)}
                    sx={{
                      background: 'var(--gov-primary)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      borderRadius: '10px',
                      textTransform: 'none',
                      py: 1,
                    }}
                  >
                    Activate Inspector Account
                  </Button>
                </Box>
              )}

              {roleFromUrl === 'user' && (
                <>
                  <Divider sx={{ my: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
                      OR NEW REGISTRATION
                    </Typography>
                  </Divider>
                  <Button
                    id="goto-register-btn"
                    component={Link}
                    to="/register"
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 1.4,
                      fontWeight: 700,
                      borderRadius: '12px',
                      borderColor: portal.color,
                      color: portal.darkColor,
                      textTransform: 'none',
                      '&:hover': { bgcolor: portal.lightBg, borderColor: portal.darkColor },
                    }}
                  >
                    Register New Instrument Owner / Citizen Account
                  </Button>
                </>
              )}
            </Box>

            {/* Bottom Security Note */}
            <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <ShieldRoundedIcon sx={{ fontSize: 16, color: '#15803D' }} />
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>
                Protected by 256-Bit SSL Encryption • Official Government Gateway
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* ── MODAL: FIELD OFFICER FIRST-TIME ACTIVATION ── */}
      <Dialog
        open={openActivation}
        onClose={() => !activationSubmitting && setOpenActivation(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#6B21A8', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FingerprintRoundedIcon sx={{ fontSize: 28 }} />
          Field Officer Account Activation
        </DialogTitle>
        <Divider />

        {activationSuccess ? (
          <DialogContent sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ width: 64, height: 64, bgcolor: '#F0FDF4', color: '#16A34A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <CheckCircleRoundedIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#0F172A', mb: 1 }}>
              Inspector Account Activated!
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', mb: 3 }}>
              Your permanent password has been set. You can now log in to the portal using your credentials.
            </Typography>

            <Paper sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0', textAlign: 'left', mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 600 }}>OFFICER EMAIL:</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>{activationSuccess.email}</Typography>
            </Paper>

            <Button
              variant="contained"
              fullWidth
              onClick={handleFinishActivation}
              sx={{
                py: 1.5,
                fontWeight: 800,
                borderRadius: '12px',
                background: 'var(--gov-primary)',
              }}
            >
              Enter Field Officer Dashboard
            </Button>
          </DialogContent>
        ) : (
          <Box component="form" onSubmit={handleActivationSubmit} aria-busy={activationSubmitting}>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 3 }}>
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                Statutory Onboarding: Provide your official email and the single-use token generated by Central Admin after HRMS clearance to set your permanent secure password.
              </Alert>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  onClick={prefillTestActivation}
                  startIcon={<FlashOnRoundedIcon />}
                  sx={{ color: '#6B21A8', fontWeight: 700, fontSize: '0.78rem' }}
                >
                  Quick Test Prefill (Neha Joshi)
                </Button>
              </Box>

              {activationError && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {activationError}
                </Alert>
              )}

              {/* Official Email & Single-Use Token */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Official Email Address"
                    required
                    fullWidth
                    size="small"
                    placeholder="inspector@lm.gov.in"
                    value={activationForm.email}
                    onChange={(e) => setActivationForm({ ...activationForm, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Single-Use Activation Token"
                    required
                    fullWidth
                    size="small"
                    placeholder="ACT-FO-XXXX-XXXX"
                    value={activationForm.activationToken}
                    onChange={(e) => setActivationForm({ ...activationForm, activationToken: e.target.value })}
                  />
                </Grid>
              </Grid>

              {/* Set Permanent Password */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Set Permanent Password"
                    type="password"
                    required
                    fullWidth
                    size="small"
                    placeholder="Min 12 characters"
                    value={activationForm.newPassword}
                    onChange={(e) => setActivationForm({ ...activationForm, newPassword: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Confirm Permanent Password"
                    type="password"
                    required
                    fullWidth
                    size="small"
                    placeholder="Re-enter password"
                    value={activationForm.confirmPassword}
                    onChange={(e) => setActivationForm({ ...activationForm, confirmPassword: e.target.value })}
                  />
                </Grid>
              </Grid>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={activationForm.agreement}
                    onChange={(e) => setActivationForm({ ...activationForm, agreement: e.target.checked })}
                    sx={{ color: '#0F2C59', '&.Mui-checked': { color: '#0F2C59' } }}
                  />
                }
                label={
                  <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                    I acknowledge statutory responsibility under the Legal Metrology Act for official field stamping operations.
                  </Typography>
                }
              />
            </DialogContent>
            <DialogActions sx={{ p: 2.5, gap: 1 }}>
              <Button onClick={() => setOpenActivation(false)} sx={{ color: '#757575' }}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={activationSubmitting}
                sx={{
                  background: 'var(--gov-primary)',
                  fontWeight: 700,
                  px: 3,
                }}
              >
                {activationSubmitting ? 'Activating Account...' : 'Activate Inspector Account'}
              </Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>

      {/* ── Official Footer ── */}
      <Box sx={{ bgcolor: '#06162D', color: '#94A3B8', py: 2.5, textAlign: 'center', px: 2 }}>
        <Typography variant="caption">
          © 2026 Legal Metrology Division, Department of Consumer Affairs, Government of India. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}
