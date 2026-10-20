import React from 'react';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unexpected application error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          component="main"
          sx={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            bgcolor: '#F8FAFC',
            px: 2,
            py: 6,
          }}
        >
          <Container maxWidth="sm">
            <Card>
              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography component="h1" variant="h4" sx={{ color: '#0F2C59', fontWeight: 700, mb: 2 }}>
                  Something went wrong while loading this section
                </Typography>
                <Typography sx={{ color: '#334155', mb: 3 }}>
                  Please reload the page and try again. If the problem continues, return to the homepage.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Button variant="contained" onClick={() => window.location.reload()}>
                    Reload Page
                  </Button>
                  <Button component={Link} to="/" variant="outlined">
                    Return to Home
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}
