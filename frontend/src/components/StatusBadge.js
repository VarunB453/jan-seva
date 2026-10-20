import React from 'react';
import { Chip } from '@mui/material';

function getStatusPalette(status) {
  const value = String(status || '').toLowerCase();

  if (/reject|fail|expired|revoked|suspend|denied|inactive|refused/.test(value)) {
    return { color: '#B91C1C', background: '#FEF2F2', border: '#FECACA' };
  }
  if (/pending|review|awaiting|queued|submitted/.test(value)) {
    return { color: '#B45309', background: '#FFFBEB', border: '#FDE68A' };
  }
  if (/progress|processing|assigned|testing|under inspection/.test(value)) {
    return { color: '#1D4ED8', background: '#EFF6FF', border: '#BFDBFE' };
  }
  if (/approved|complete|active|verified|passed|valid|endorsed|issued/.test(value)) {
    return { color: '#15803D', background: '#F0FDF4', border: '#BBF7D0' };
  }

  return { color: '#334155', background: '#F8FAFC', border: '#CBD5E1' };
}

export default function StatusBadge({ status, label, sx, ...props }) {
  const palette = getStatusPalette(status ?? label);

  return (
    <Chip
      {...props}
      label={label ?? status}
      sx={{
        ...sx,
        bgcolor: palette.background,
        color: palette.color,
        border: `1px solid ${palette.border}`,
        borderRadius: '999px',
        fontWeight: 700,
      }}
    />
  );
}
