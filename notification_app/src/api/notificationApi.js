
const MOCK_NOTIFICATIONS = [
  ...Array.from({ length: 88 }, (_, i) => {
    const types = ['Placement', 'Result', 'Event'];
    const type = types[i % 3];
    const daysAgo = Math.floor(i / 3);
    return {
      ID: String(i + 1),
      Message: `${type} notification #${i + 1}`,
      Type: type,
      Timestamp: new Date(
        Date.now() - daysAgo * 86400000
      ).toISOString(),
    };
  }),
];

/**
 * Fetch notifications with pagination and filtering
 * @param {number} page - Page number (starts at 1)
 * @param {number} limit - Items per page (default 8)
 * @param {string} notificationType - Filter by type
 * @returns {Promise<Object>} Notifications and metadata
 */
export const fetchNotifications = async (
  page = 1,
  limit = 8,
  notificationType = null
) => {
  try {
    let filtered = MOCK_NOTIFICATIONS;
    if (notificationType && notificationType !== 'All') {
      filtered = filtered.filter(
        (n) => n.Type === notificationType
      );
    }

    // Calculate pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    const paginated = filtered.slice(startIdx, endIdx);

    return {
      notifications: paginated,
      total: total,
      totalPages: totalPages,
      page: page,
      limit: limit,
    };
  } catch (error) {
    return {
      notifications: [],
      total: 0,
      totalPages: 0,
      page: page,
      limit: limit,
    };
  }
};
