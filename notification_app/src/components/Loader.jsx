// Loading spinner component
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        gap: 2,
      }}
    >
      <CircularProgress size={50} />
      <p style={{ color: '#666', margin: 0 }}>{message}</p>
    </Box>
  );
};

export default Loader;
