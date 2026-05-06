# Campus Notification System

A modern, responsive notification management web application built with React, Vite, and Material UI. Displays campus-wide notifications with categorization, filtering, and pagination.

## 📋 Project Structure

```
campus-notification-system/
├── notification_app/          # Main React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── EmptyState.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── NotificationCard.jsx
│   │   │   └── PaginationBar.jsx
│   │   ├── pages/
│   │   │   └── Notifications.jsx    # Main inbox page
│   │   ├── api/
│   │   │   └── notificationApi.js   # Notification data service
│   │   ├── utils/
│   │   │   ├── auth.js              # Authentication utilities
│   │   │   └── logger.js            # Logging service (disabled)
│   │   ├── App.jsx            # Root component
│   │   ├── App.css            # App styling
│   │   ├── index.css          # Global styles
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── stage1/                    # Backend mock server (Stage 1)
```

## 🎨 Features

### Core Features
- **Notification Inbox**: Display all campus notifications in a clean, card-based layout
- **Category Filtering**: Filter notifications by type (All, Placement, Result, Event)
- **Status Filtering**: Filter by read status (All, Unread, Read)
- **Search Functionality**: Real-time search across notification messages and types
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Pagination**: Smooth pagination with 8 notifications per page, supporting 11+ pages

### UI/UX Features
- **Green Gradient Background**: Light green (#f0fdf4) to light blue (#e0f2fe) gradient
- **Notification Cards**: Each notification displays:
  - Type badge (Placement, Result, Event) with color coding
  - Message content
  - Timestamp
  - Unread indicator (green dot for unread notifications)
- **Loading States**: Smooth spinner while fetching notifications
- **Empty States**: User-friendly message when no notifications found
- **Pagination Controls**: Previous/Next buttons with page indicator
- **Hover Effects**: Interactive feedback on cards and buttons

### Theme & Styling
- **Primary Color**: Emerald Green (#22c55e)
- **Secondary Color**: Dark Green (#059669)
- **Material UI Components**: Professional, accessible UI elements
- **Custom CSS Variables**: Organized color and spacing system

## 🚀 Getting Started

### Prerequisites
- Node.js v22.12.0 or higher
- npm 10.9.0 or higher

### Installation

1. Navigate to the notification app folder:
```bash
cd "C:\My Projects\campus-notification-system\notification_app"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🔧 Technologies Used

### Frontend Framework
- **React 18.x**: UI library with hooks (useState, useEffect)
- **Vite 8.x**: Fast build tool and dev server
- **Material UI (MUI)**: Component library with theming
  - `@mui/material`: Core components
  - `@mui/icons-material`: Icon library
  - `@emotion/react`, `@emotion/styled`: Styling solution

### Development
- **ES Modules**: JavaScript module system with .js extensions
- **CSS Variables**: Custom properties for theming
- **localStorage**: Client-side persistence for viewed notifications

## 📱 Responsive Breakpoints

- **Desktop**: Full width layout with side-by-side content
- **Tablet**: Optimized grid for 768px+ screens
- **Mobile**: Single column layout for screens under 768px

## 🎯 Notification Types & Colors

| Type      | Color    | Use Case                    |
|-----------|----------|------------------------------|
| Placement | Red      | Recruitment and job drives  |
| Result    | Orange   | Academic results and grades |
| Event     | Green    | Campus events and programs  |

## 🔄 Pagination Details

- **Default Page Size**: 8 notifications per page
- **Total Mock Data**: 88 notifications (11 pages)
- **Navigation**: Previous/Next buttons with smart disable states
- **Page Indicator**: Shows current page and total pages (e.g., "Page 1 of 11")

## 🎛️ Features in Action

### Filtering
1. Click category buttons (All, Placement, Result, Event) to filter by type
2. Click status tabs (All, Unread, Read) to filter by read status
3. Combine filters for refined results

### Search
- Type in the search box to find notifications by message or type
- Search works across currently displayed page

### Marking as Read
- Click any notification card to mark it as read
- Read status is persisted in localStorage
- Unread notifications show a green indicator dot

### Pagination
- Use Previous/Next buttons to navigate pages
- Page counter shows current position
- Buttons disable at boundaries (page 1 and last page)

## 🌐 API Integration

### Mock Data Service
Currently using mock notification data generated in `src/api/notificationApi.js`:
- 88 pre-generated notifications
- Supports filtering by type and pagination
- Returns consistent structure with real API

### Future Backend Integration
When backend API is ready, update the fetch endpoint in `src/api/notificationApi.js`:
```javascript
const API_URL = 'http://your-api-endpoint/notifications';
```

## 🔐 Authentication (Disabled)

The authentication utility (`src/utils/auth.js`) is available but currently unused:
- Designed for token-based authentication
- 5-minute token caching to reduce API calls
- Ready to integrate with production backend

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ⚙️ Build & Deployment

### Development Build
```bash
npm run dev
```
Starts local dev server with hot module replacement on port 3000.

### Production Build
```bash
npm run build
```
Creates optimized production bundle in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

## 🐛 Known Issues & Notes

- **CORS Issue**: Backend logging service has conflicting CORS headers - logging is disabled to prevent console errors
- **Mock Data**: Using local mock notifications instead of backend API
- **Backend Status**: Waiting for backend API fixes before production deployment

## 📝 Component Documentation

### Notifications.jsx (Main Page)
- Manages notification state and pagination
- Handles filtering, searching, and read status
- Renders notification cards with metadata
- Controls pagination UI

### NotificationCard.jsx
- Displays individual notification
- Shows type badge with color coding
- Displays unread indicator
- Handles click to mark as read

### FilterBar.jsx
- Dropdown for category selection
- Styled with Material UI Select component

### PaginationBar.jsx
- Previous/Next navigation buttons
- Page counter display
- Disable states at boundaries

### Loader.jsx & EmptyState.jsx
- Loading spinner component
- No-results state component

## 🚀 Performance Features

- **Code Splitting**: Vite automatic chunk splitting
- **Hot Module Replacement**: Instant dev updates
- **localStorage Persistence**: Offline read status
- **Optimized Rendering**: React hooks for minimal re-renders

## 🎓 Lessons & Best Practices

- Component composition with reusable pieces
- State management with React hooks
- Responsive design with Material UI sx prop
- Error handling and graceful degradation
- Mock data for development
- Clean folder structure for scalability

