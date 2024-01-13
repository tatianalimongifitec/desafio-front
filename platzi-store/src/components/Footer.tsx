import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FITec from './FITec.png';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © FITec Store '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '40vh',
        }}
      >

        <Box
          component="footer"
          sx={{
            position: 'auto',
            bottom: 0,
            width: '100%',
            py: 3,
            px: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={FITec} alt="FITec Logo" style={{ maxWidth: '30%', height: 'auto' }} />
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
