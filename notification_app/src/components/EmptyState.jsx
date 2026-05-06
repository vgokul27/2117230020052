import React from 'react';
import { Box, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const EmptyState = ({
  message = 'No notifications found',
  subMessage = 'Check back later for updates',
}) => {
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
      <NotificationsNoneIcon
        sx={{ fontSize: 64, color: '#ddd' }}
      />
      <Typography
        variant="h6"
        sx={{ color: '#666', textAlign: 'center' }}
      >
        {message}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: '#999', textAlign: 'center' }}
      >
        {subMessage}
      </Typography>
    </Box>
  );
};

export default EmptyState;
