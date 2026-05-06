import { fetchNotifications } from "./notificationService.js";
import { Log } from "../logging_middleware/logger.js";

const priorityOrder = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function sortNotifications(notifications) {

  return notifications.sort((a, b) => {

    const priorityA =
      priorityOrder[a.Type] || 0;

    const priorityB =
      priorityOrder[b.Type] || 0;

    // Sort by priority first
    if (priorityB !== priorityA) {
      return priorityB - priorityA;
    }

    // Sort by newest timestamp
    return (
      new Date(b.Timestamp) -
      new Date(a.Timestamp)
    );
  });
}

function getTop10Notifications(notifications) {

  return sortNotifications(notifications)
    .slice(0, 10);
}

async function main() {

  try {

    await Log(
      "frontend",
      "info",
      "api",
      "Stage 1 started"
    );

    const notifications =
      await fetchNotifications();

    if (!notifications.length) {

      await Log(
        "frontend",
        "warn",
        "api",
        "No notifications"
      );

      return;
    }

    const topNotifications =
      getTop10Notifications(notifications);

    await Log(
      "frontend",
      "info",
      "api",
      "Top 10 generated"
    );

    console.table(
      topNotifications.map((item) => ({
        ID: item.ID,
        Type: item.Type,
        Message: item.Message,
        Timestamp: item.Timestamp,
      }))
    );

    await Log(
      "frontend",
      "info",
      "api",
      "Stage 1 completed"
    );

  } catch (error) {

    await Log(
      "frontend",
      "fatal",
      "api",
      "Stage 1 crashed",
    );
  }
}

main();