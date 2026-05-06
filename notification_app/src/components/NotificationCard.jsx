// Notification card component
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const NotificationCard = ({ notification, onToggleSaved }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isViewed, setIsViewed] = useState(false);

  // Check if notification is saved or viewed
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem('savedNotifications') || '{}'
    );
    const viewed = JSON.parse(
      localStorage.getItem('viewedNotifications') || '{}'
    );

    setIsSaved(saved[notification.ID] || false);
    setIsViewed(viewed[notification.ID] || false);
  }, [notification.ID]);

  const handleToggleSaved = () => {
    const saved = JSON.parse(
      localStorage.getItem('savedNotifications') || '{}'
    );

    if (saved[notification.ID]) {
      delete saved[notification.ID];
    } else {
      saved[notification.ID] = true;
    }

    localStorage.setItem(
      'savedNotifications',
      JSON.stringify(saved)
    );
    setIsSaved(!isSaved);

    if (onToggleSaved) {
      onToggleSaved(notification.ID);
    }
  };

  const handleCardClick = () => {
    // Mark as viewed
    const viewed = JSON.parse(
      localStorage.getItem('viewedNotifications') || '{}'
    );
    viewed[notification.ID] = true;
    localStorage.setItem(
      'viewedNotifications',
      JSON.stringify(viewed)
    );
    setIsViewed(true);
  };

  // Get priority color
  const getPriorityColor = (type) => {
    switch (type) {
      case 'Placement':
        return '#d32f2f';
      case 'Result':
        return '#f57c00';
      case 'Event':
        return '#22c55e';
      default:
        return '#757575';
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        marginBottom: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: isViewed ? '#fafafa' : '#ffffff',
        borderLeft: `4px solid ${getPriorityColor(
          notification.Type
        )}`,
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Chip
                label={notification.Type}
                size="small"
                sx={{
                  backgroundColor: getPriorityColor(
                    notification.Type
                  ),
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
              {!isViewed && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                  }}
                />
              )}
            </Box>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                marginBottom: 0.5,
                color: '#333',
              }}
            >
              {notification.Message}
            </Typography>

            <Typography
              variant="caption"
              sx={{ color: '#999' }}
            >
              {new Date(
                notification.Timestamp
              ).toLocaleString()}
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleSaved();
            }}
            sx={{
              color: isSaved ? '#22c55e' : '#ccc',
              transition: 'all 0.2s ease',
            }}
          >
            {isSaved ? (
              <BookmarkIcon />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
