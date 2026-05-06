import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Notifications from './pages/Notifications.jsx';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#22c55e',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f0fdf4',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
        }}
      >
        <Notifications />
      </Box>
    </ThemeProvider>
  );
}

export default App;
