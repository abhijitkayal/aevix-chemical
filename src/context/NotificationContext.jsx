import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const STORAGE_KEY = 'readNotifications';

  // Load read notification IDs from localStorage
  const getReadNotificationIds = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading read notifications:', error);
      return [];
    }
  };

  // Save read notification IDs to localStorage
  const saveReadNotificationIds = (ids) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error('Error saving read notifications:', error);
    }
  };

  // Fetch low stock items and create notifications
  const fetchLowStockNotifications = async () => {
    try {
      const response = await axios.get('${API_URL}/api/stock');
      const stocks = response.data;
      
      // Filter low and critical stock items
      const lowStockItems = stocks.filter(item => 
        item.status === 'Low' || item.status === 'Critical'
      );

      // Create notifications from low stock items
      const stockNotifications = lowStockItems.map(item => ({
        id: `stock-${item._id}`,
        type: 'low_stock',
        title: item.status === 'Critical' ? 'Critical Stock Alert' : 'Low Stock Alert',
        message: `${item.itemName} - Current stock: ${item.currentStock} ${item.unit}`,
        severity: item.status === 'Critical' ? 'critical' : 'warning',
        timestamp: new Date(),
        read: false,
        data: item
      }));

      return stockNotifications;
    } catch (error) {
      console.error('Error fetching stock notifications:', error);
      return [];
    }
  };

  // Fetch ledger exceeded notifications
  const fetchLedgerExceededNotifications = async () => {
    try {
      // Get current month in YYYY-MM format
      const currentMonth = new Date().toISOString().slice(0, 7);
      const [year, monthNum] = currentMonth.split('-');

      // Fetch clients and invoices
      const [clientsRes, invoicesRes] = await Promise.all([
        axios.get('https://aevix-chemical-mpbw.vercel.app/api/clients'),
        axios.get('https://aevix-chemical-mpbw.vercel.app/api/invoices')
      ]);

      const clients = clientsRes.data;
      const invoices = invoicesRes.data;

      const ledgerNotifications = [];

      // Check each client
      clients.forEach(client => {
        const ledgerQuantity = parseFloat(client.totalQuantity) || 0;
        
        // Calculate monthly invoice quantity for this client
        const monthlyInvoices = invoices.filter(invoice => {
          if (!invoice.date) return false;
          
          const invoiceDate = new Date(invoice.date);
          const invoiceYear = invoiceDate.getFullYear();
          const invoiceMonth = String(invoiceDate.getMonth() + 1).padStart(2, '0');
          
          const customerMatch = invoice.customer && 
            invoice.customer.toLowerCase().trim() === client.clientName.toLowerCase().trim();
          
          return (
            customerMatch &&
            String(invoiceYear) === year &&
            invoiceMonth === monthNum
          );
        });

        const totalMonthlyQuantity = monthlyInvoices.reduce((sum, inv) => {
          return sum + (parseFloat(inv.quantity) || 0);
        }, 0);

        // If monthly usage exceeds ledger quantity, create notification
        if (totalMonthlyQuantity > ledgerQuantity && ledgerQuantity > 0) {
          const percentage = ((totalMonthlyQuantity / ledgerQuantity) * 100).toFixed(1);
          const exceeded = totalMonthlyQuantity - ledgerQuantity;

          ledgerNotifications.push({
            id: `ledger-${client._id}-${currentMonth}`,
            type: 'ledger_exceeded',
            title: 'Ledger Limit Exceeded',
            message: `${client.clientName} exceeded monthly limit by ${exceeded.toFixed(2)} ${client.unit} (${percentage}% used)`,
            severity: 'critical',
            timestamp: new Date(),
            read: false,
            data: {
              clientName: client.clientName,
              ledgerQuantity,
              monthlyQuantity: totalMonthlyQuantity,
              exceeded,
              percentage,
              unit: client.unit,
              month: currentMonth
            }
          });
        }
      });

      return ledgerNotifications;
    } catch (error) {
      console.error('Error fetching ledger notifications:', error);
      return [];
    }
  };

  // Fetch all notifications
  const fetchAllNotifications = async () => {
    try {
      const [stockNotifications, ledgerNotifications] = await Promise.all([
        fetchLowStockNotifications(),
        fetchLedgerExceededNotifications()
      ]);

      const allNotifications = [...stockNotifications, ...ledgerNotifications];
      const readIds = getReadNotificationIds();

      // Mark notifications as read if their ID is in localStorage
      const notificationsWithReadStatus = allNotifications.map(notification => ({
        ...notification,
        read: readIds.includes(notification.id)
      }));

      setNotifications(notificationsWithReadStatus);

    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Calculate unread count
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Fetch notifications on mount and every 5 minutes
  useEffect(() => {
    fetchAllNotifications();
    const interval = setInterval(fetchAllNotifications, 5 * 60 * 1000); // 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    
    // Save to localStorage
    const readIds = getReadNotificationIds();
    if (!readIds.includes(notificationId)) {
      saveReadNotificationIds([...readIds, notificationId]);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => {
      const updatedNotifications = prev.map(notification => ({ ...notification, read: true }));
      
      // Save all notification IDs to localStorage
      const allIds = updatedNotifications.map(n => n.id);
      saveReadNotificationIds(allIds);
      
      return updatedNotifications;
    });
  };

  // Remove read notifications
  const clearReadNotifications = () => {
    setNotifications(prev => {
      const unreadNotifications = prev.filter(n => !n.read);
      
      // Update localStorage to only keep unread notification IDs
      const unreadIds = unreadNotifications.map(n => n.id);
      const readIds = getReadNotificationIds();
      const filteredReadIds = readIds.filter(id => unreadIds.includes(id));
      saveReadNotificationIds(filteredReadIds);
      
      return unreadNotifications;
    });
  };

  // Add custom notification
  const addNotification = (notification) => {
    const newNotification = {
      id: `custom-${Date.now()}`,
      timestamp: new Date(),
      read: false,
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearReadNotifications,
        addNotification,
        refreshNotifications: fetchAllNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
