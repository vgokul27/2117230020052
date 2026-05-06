// Notifications page - Main inbox interface
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  Alert,
  CircularProgress,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { fetchNotifications } from '../api/notificationApi.js';
import Log from '../utils/logger.js';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewedNotifications, setViewedNotifications] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { value: 'All', label: 'All', count: 87 },
    { value: 'Placement', label: 'Placement', count: 25 },
    { value: 'Result', label: 'Result', count: 16 },
    { value: 'Event', label: 'Event', count: 18 },
  ];

  const statuses = [
    { value: 'All', label: 'All' },
    { value: 'Unread', label: 'Unread' },
    { value: 'Read', label: 'Read' },
  ];

  // Load viewed notifications from localStorage
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem('viewedNotifications') || '{}'
    );
    setViewedNotifications(saved);
  }, []);

  // Fetch notifications on mount and when category/page changes
  useEffect(() => {
    loadNotifications();
  }, [selectedCategory, currentPage]);

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      await Log('info', 'page', 'Loading notifications');

      const category = selectedCategory === 'All' ? null : selectedCategory;
      const data = await fetchNotifications(currentPage, 8, category);

      setNotifications(data.notifications || []);
      setTotalPages(data.totalPages || 1);

      await Log('info', 'page', 'Notifications loaded');
    } catch (err) {
      setError('Failed to load notifications');
      await Log('error', 'page', 'Failed loading notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = (id) => {
    const updated = { ...viewedNotifications, [id]: true };
    setViewedNotifications(updated);
    localStorage.setItem(
      'viewedNotifications',
      JSON.stringify(updated)
    );
  };

  // Filter notifications based on search and status
  let filteredNotifications = notifications;

  if (searchQuery) {
    filteredNotifications = filteredNotifications.filter(
      (n) =>
        n.Message.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        n.Type.toLowerCase().includes(
          searchQuery.toLowerCase()
        )
    );
  }

  if (selectedStatus === 'Unread') {
    filteredNotifications = filteredNotifications.filter(
      (n) => !viewedNotifications[n.ID]
    );
  } else if (selectedStatus === 'Read') {
    filteredNotifications = filteredNotifications.filter(
      (n) => viewedNotifications[n.ID]
    );
  }

  const unreadCount = notifications.filter(
    (n) => !viewedNotifications[n.ID]
  ).length;

  const getTypeColor = (type) => {
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

  const getTypeInitial = (type) => {
    return type.charAt(0).toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      {/* Header */}
      <Box sx={{ marginBottom: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 1,
          }}
        >
          <NotificationsIcon
            sx={{ fontSize: 40, color: '#22c55e' }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            Inbox
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: '#666',
            marginLeft: 7,
          }}
        >
          {unreadCount} unread of {notifications.length} total
        </Typography>
      </Box>

      {/* Search Box */}
      <Box sx={{ marginBottom: 3 }}>
        <TextField
          fullWidth
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: '#999' }} />,
          }}
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            },
          }}
        />
      </Box>

      {/* Category Tabs */}
      <Box sx={{ marginBottom: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <Button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            sx={{
              backgroundColor:
                selectedCategory === cat.value
                  ? '#1a1a1a'
                  : '#ffffff',
              color:
                selectedCategory === cat.value
                  ? '#ffffff'
                  : '#666',
              borderRadius: 3,
              textTransform: 'none',
              padding: '8px 16px',
              fontWeight: 600,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              '&:hover': {
                backgroundColor:
                  selectedCategory === cat.value
                    ? '#1a1a1a'
                    : '#f5f5f5',
              },
            }}
          >
            {cat.label} {cat.count && `${cat.count}`}
          </Button>
        ))}
      </Box>

      {/* Status Tabs */}
      <Box sx={{ marginBottom: 4, display: 'flex', gap: 2 }}>
        {statuses.map((status) => (
          <Button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            sx={{
              color:
                selectedStatus === status.value
                  ? '#22c55e'
                  : '#999',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: selectedStatus === status.value ? 600 : 500,
              padding: 0,
              '&:hover': {
                color: '#22c55e',
              },
            }}
          >
            {status.label}
          </Button>
        ))}
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          <CircularProgress sx={{ color: '#22c55e' }} />
        </Box>
      )}

      {/* Notifications List */}
      {!loading && filteredNotifications.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredNotifications.map((notification) => {
            const isViewed = viewedNotifications[notification.ID];

            return (
              <Card
                key={notification.ID}
                onClick={() => handleNotificationClick(notification.ID)}
                sx={{
                  backgroundColor: isViewed ? '#ffffff' : '#f9fafb',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  borderLeft: `4px solid ${getTypeColor(
                    notification.Type
                  )}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Avatar */}
                  <Avatar
                    sx={{
                      backgroundColor: getTypeColor(
                        notification.Type
                      ),
                      color: '#ffffff',
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      fontWeight: 700,
                    }}
                  >
                    {getTypeInitial(notification.Type)}
                  </Avatar>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: '#1a1a1a',
                        }}
                      >
                        {notification.Message}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#999',
                          whiteSpace: 'nowrap',
                          ml: 2,
                        }}
                      >
                        {new Date(
                          notification.Timestamp
                        ).toLocaleString()}
                      </Typography>
                    </Box>

                    {/* Type Badge */}
                    <Chip
                      label={notification.Type}
                      size="small"
                      sx={{
                        backgroundColor: getTypeColor(
                          notification.Type
                        ),
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />

                    {/* Unread Indicator */}
                    {!isViewed && (
                      <Box
                        sx={{
                          display: 'inline-block',
                          ml: 1,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: '#22c55e',
                        }}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {/* Empty State */}
      {!loading && filteredNotifications.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <NotificationsIcon
            sx={{ fontSize: 64, color: '#ddd', mb: 2 }}
          />
          <Typography
            variant="h6"
            sx={{ color: '#666', mb: 1 }}
          >
            No notifications found
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            Try adjusting your filters or check back later
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {!loading && notifications.length > 0 && totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 4,
            pt: 3,
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            disabled={currentPage === 1}
            sx={{
              color: currentPage === 1 ? '#ccc' : '#666',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'transparent',
                color: currentPage === 1 ? '#ccc' : '#22c55e',
              },
            }}
          >
            ← Prev
          </Button>
          <Typography
            sx={{
              fontSize: '0.95rem',
              color: '#666',
              fontWeight: 500,
            }}
          >
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(totalPages, p + 1)
              )
            }
            disabled={currentPage === totalPages}
            sx={{
              color: currentPage === totalPages ? '#ccc' : '#666',
              textTransform: 'none',
              fontSize: '0.95rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'transparent',
                color:
                  currentPage === totalPages
                    ? '#ccc'
                    : '#22c55e',
              },
            }}
          >
            Next →
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Notifications;
