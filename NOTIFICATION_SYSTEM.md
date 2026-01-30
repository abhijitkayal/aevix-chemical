# Low Stock Notification System

## Overview
This notification system automatically monitors stock levels and displays real-time notifications in the header when items fall below their reorder levels.

## Features

### 1. **Dynamic Notification Count**
- Shows actual count of unread notifications instead of hardcoded "4"
- Badge only appears when there are unread notifications
- Auto-updates every 5 minutes

### 2. **Low Stock Alerts**
- Monitors stock items from the database
- Creates notifications for items with status "Low" or "Critical"
- Displays severity levels:
  - **Critical**: Stock ≤ 50% of reorder level (Red alert)
  - **Low**: Stock ≤ reorder level (Yellow alert)

### 3. **Smart Read/Unread Management**
- Click on any notification to mark it as read
- "Mark all as read" button for bulk actions
- Read notifications are visually distinct (grayed out)
- Auto-removes read notifications when stock levels improve

### 4. **Notification Details**
Each notification includes:
- Alert type (Critical/Low Stock)
- Item name and current stock level
- Timestamp
- Visual severity indicator

### 5. **User Actions**
- **Mark as Read**: Click on individual notification
- **Mark All as Read**: Button at top of popup
- **Clear All Read**: Remove all read notifications at once

## Implementation Details

### Files Modified

1. **`src/context/NotificationContext.jsx`** (NEW)
   - React Context for global notification state
   - Fetches stock data from API
   - Auto-refreshes every 5 minutes
   - Manages read/unread states

2. **`src/component/Header.jsx`**
   - Integrated notification context
   - Dynamic badge count
   - Enhanced notification popup with categorized lists
   - Read/unread sections

3. **`src/App.jsx`**
   - Wrapped app with `NotificationProvider`

### API Requirements

The system expects the Stock API endpoint:
```
GET https://aevix-chemical-mpbw.vercel.app/api/stock
```

Response should include:
```json
[
  {
    "_id": "...",
    "itemName": "Product Name",
    "currentStock": 45,
    "reorderLevel": 100,
    "unit": "Liters",
    "status": "Critical" // or "Low" or "Good"
  }
]
```

### Stock Status Calculation

The backend automatically sets status based on:
- **Critical**: `currentStock ≤ reorderLevel * 0.5`
- **Low**: `currentStock ≤ reorderLevel`
- **Good**: Above reorder level

## Usage

### For Users
1. Look at the bell icon in the header
2. If there's a red badge, you have unread notifications
3. Click the bell to see all notifications
4. Click any notification to mark it as read
5. Use "Clear all" to remove read notifications

### For Developers

**Access notification functions anywhere:**
```jsx
import { useNotifications } from '../context/NotificationContext';

function MyComponent() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead,
    addNotification,
    refreshNotifications 
  } = useNotifications();
  
  // Use as needed
}
```

**Add custom notifications:**
```jsx
addNotification({
  type: 'custom',
  title: 'New Order',
  message: 'Order #123 received',
  severity: 'info'
});
```

## Customization

### Change Refresh Interval
In `NotificationContext.jsx`, modify:
```javascript
const interval = setInterval(fetchLowStockNotifications, 5 * 60 * 1000);
// Change to: 2 * 60 * 1000 for 2 minutes
```

### Add More Notification Types
Extend the `fetchLowStockNotifications` function or use `addNotification` for custom alerts.

### Modify Severity Colors
In `Header.jsx`, update the className conditions:
```jsx
notification.severity === 'critical'
  ? 'bg-red-50 border-red-500 hover:bg-red-100'
  : 'bg-yellow-50 border-yellow-500 hover:bg-yellow-100'
```

## Benefits

1. **Real-time Awareness**: Never miss critical stock levels
2. **Automatic Updates**: No manual checking required
3. **Clean Interface**: Read items auto-clear when stock improves
4. **User-Friendly**: Simple click-to-read interaction
5. **Scalable**: Easy to add more notification types

## Future Enhancements

- Push notifications for critical alerts
- Email notifications for severe low stock
- Custom notification preferences per user
- Sound alerts for critical items
- Notification history page
- Filter notifications by severity or type
