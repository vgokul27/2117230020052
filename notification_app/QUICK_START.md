# 🚀 Quick Start Guide - Campus Notification System Stage 2

## Get Started in 30 Seconds

```bash
# Navigate to project
cd "C:\My Projects\campus-notification-system\notification_app"

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

**App is now running on**: `http://localhost:3000`

---

## 📱 Test the App

### Home Page
- **URL**: http://localhost:3000
- **What to see**: Hero section, 3 feature cards, CTA buttons
- **Test**: Click "View All Notifications" button

### Notifications Page
- **URL**: http://localhost:3000/notifications
- **What to see**: Filter dropdown, loading spinner, notification list
- **Note**: If API calls fail, error message appears (backend CORS issue)

---

## 📁 Key Files Location

```
C:\My Projects\campus-notification-system\notification_app\src\

Components:
  ✓ components/Navbar.jsx              (Navigation bar)
  ✓ components/NotificationCard.jsx    (Notification display)
  ✓ components/FilterBar.jsx           (Type filter)
  ✓ components/PaginationBar.jsx       (Page navigation)
  ✓ components/Loader.jsx              (Loading spinner)
  ✓ components/EmptyState.jsx          (No results)

Pages:
  ✓ pages/Home.jsx                     (Home/landing)
  ✓ pages/Notifications.jsx            (Main page)

Services:
  ✓ api/notificationApi.js             (API calls)
  ✓ utils/logger.js                    (Logging)
  ✓ utils/auth.js                      (Authentication)

Core:
  ✓ App.jsx                            (Main app + routing)
  ✓ main.jsx                           (Entry point)
  ✓ App.css                            (Styles)
  ✓ index.css                          (Global styles)

Docs:
  ✓ STAGE2_README.md                   (Full documentation)
  ✓ COMPLETION_SUMMARY.md              (This file's sibling)
```

---

## 🎮 Features to Test

### 1. Navigation
- Click navbar links to switch between Home and Notifications
- Verify responsive design on mobile (F12 → Device Toolbar)

### 2. Filtering
- Open Notifications page
- Select different types from dropdown: All, Placement, Result, Event
- See list update (or error message if backend CORS not fixed)

### 3. Pagination
- On Notifications page (if data loads)
- Click "Next" button to go to page 2
- Click "Previous" to go back
- Buttons auto-disable at start/end

### 4. Viewed Notifications
- Click on any notification card (once data loads)
- localStorage is updated
- Blue dot disappears (notification marked as viewed)

### 5. Saved Notifications
- Click bookmark icon on any notification
- Icon fills with color (saved)
- Click again to unsave
- Data persists in localStorage

### 6. Responsive Design
- Open DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test on: Mobile (375px), Tablet (768px), Desktop (1024px)
- Everything should reflow nicely

### 7. Error Handling
- Notification page shows error alert if API fails
- Error message is user-friendly
- Doesn't block the UI

---

## 🔧 Useful NPM Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build            # Create optimized build
npm run preview          # Preview production build

# Linting (if added)
npm run lint             # Check code quality

# This is Vite project, not Create React App
# No eject or other CRA commands available
```

---

## 🌐 API Endpoints Used

```javascript
// Authentication
POST http://20.207.122.201/evaluation-service/auth
Request: { email, name, rollNo, accessCode, clientID, clientSecret }
Response: { access_token: "..." }

// Notifications
GET http://20.207.122.201/evaluation-service/notifications
Query Params: ?page=1&limit=10&notification_type=Placement
Response: { 
  notifications: [...],
  total: 100,
  page: 1,
  limit: 10
}
```

---

## 💾 Local Storage Data

```javascript
// Viewed notifications (set to true when clicked)
localStorage['viewedNotifications']
// Example: {"id1": true, "id2": true, "id3": true}

// Saved notifications (set to true when bookmarked)
localStorage['savedNotifications']
// Example: {"id1": true, "id5": true}

// Clear all data:
localStorage.clear()
```

---

## 🐛 Debugging Tips

### Check Console Errors
- Press F12 to open DevTools
- Go to "Console" tab
- CORS errors from logger are non-critical
- React warnings can be ignored

### Check Network Requests
- Open DevTools → Network tab
- Look for API calls to `evaluation-service/*`
- Check response status (should be 200)
- If CORS error, backend needs fixing

### Check localStorage
- DevTools → Application → Local Storage
- Select `http://localhost:3000`
- View saved notification IDs

### Test Specific Pages
- Home: http://localhost:3000
- Notifications: http://localhost:3000/notifications
- Invalid URL: http://localhost:3000/invalid (shows nothing)

---

## 📦 Dependencies Installed

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "@mui/material": "^5.x",
  "@mui/icons-material": "^5.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x"
}
```

No need to install more - everything you need is here!

---

## 🎨 Customization Guide

### Change Colors
**File**: `src/index.css` and `src/App.jsx`
```css
/* In index.css */
:root {
  --primary: #1976d2;        /* Change this to your color */
  --text-primary: #333;
  /* ... more colors ... */
}
```

### Change Items Per Page
**File**: `src/pages/Notifications.jsx`
```javascript
const ITEMS_PER_PAGE = 10;    // Change to 20, 50, etc
```

### Change Notification Types
**File**: `src/components/FilterBar.jsx`
```javascript
const notificationTypes = [
  { value: 'YourType', label: 'Your Label' },
  // Add more here
];
```

### Change Logo/Title
**File**: `src/components/Navbar.jsx`
```jsx
<Typography variant="h6">
  Your Custom Title Here    {/* Change this */}
</Typography>
```

---

## 🚀 Production Deployment

### 1. Build the Project
```bash
npm run build
```
This creates a `dist/` folder with optimized files.

### 2. Deploy dist/ Folder
- Upload `dist/` contents to your web server
- Or use: Vercel, Netlify, GitHub Pages, AWS S3, etc.

### 3. Update API URLs
Before deployment, update API base URLs to production domain:
- Change `http://20.207.122.201/...` to your production API URL
- Or use environment variables (.env file)

### 4. Fix Backend CORS
- Ensure backend allows your production domain
- Remove duplicate `Access-Control-Allow-Origin` headers
- Add your domain to allowed origins

---

## ❓ Common Issues & Fixes

| Issue | Solution |
|---|---|
| "Cannot find module" error | Run `npm install` again |
| Port 3000 already in use | Kill process or use `npm run dev -- --port 3001` |
| Blank page | Check console (F12) for JavaScript errors |
| API returns error | Backend CORS needs fixing |
| Components not showing | Verify import paths are correct |
| Styles not applied | Check Material UI is installed correctly |

---

## 📚 Learn More

### React
- https://react.dev

### Vite
- https://vitejs.dev

### Material UI
- https://mui.com

### React Router
- https://reactrouter.com

---

## 🎯 Assignment Checklist

Before submitting, verify:
- [ ] App runs on localhost:3000
- [ ] Home page displays
- [ ] Notifications page loads (with error or data)
- [ ] Filter dropdown works
- [ ] Pagination buttons appear
- [ ] Responsive on mobile (DevTools)
- [ ] All 6 components exist
- [ ] Code is clean (no console.log)
- [ ] No TypeScript files
- [ ] Folder structure matches requirements

---

## ✅ You're All Set!

Your Campus Notification System Stage 2 is complete and ready to use or submit!

**Questions?** Check the `STAGE2_README.md` for more detailed documentation.

Happy coding! 🚀
