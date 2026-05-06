import axios from "axios";
import { Log } from "../logging_middleware/logger.js";
import { getAuthToken } from "../logging_middleware/auth.js";

const API_URL =
  "http://20.207.122.201/evaluation-service/notifications";

export const fetchNotifications = async () => {

  try {

    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications from API"
    );

    const token = await getAuthToken();

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const notifications =
      response.data.notifications || [];

    await Log(
      "frontend",
      "info",
      "api",
      `Fetched ${notifications.length} notifications`
    );

    return notifications;

  } catch (error) {

    await Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

    return [];
  }
};