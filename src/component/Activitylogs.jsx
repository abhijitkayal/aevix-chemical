import React, { useState } from 'react';
import { Activity, User, Settings, Database, FileText, Package, TrendingUp, AlertCircle, Clock, Filter, Search, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Activitylogs = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedUser, setSelectedUser] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('Today');

  // Summary data
  const summary = {
    totalActivities: 156,
    todayActivities: 42,
    activeUsers: 18,
    systemEvents: 12
  };

  // Activity logs data
  const activityLogs = [
    {
      id: 'LOG001',
      timestamp: '2026-01-05 10:45:32',
      user: 'Rajesh Kumar',
      userId: 'USR001',
      action: 'Created',
      module: 'Production',
      entity: 'Work Order',
      entityId: 'WO-2026-015',
      details: 'Created new work order for Hydrochloric Acid 35%',
      ipAddress: '192.168.1.101',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG002',
      timestamp: '2026-01-05 10:42:18',
      user: 'Priya Sharma',
      userId: 'USR002',
      action: 'Updated',
      module: 'Inventory',
      entity: 'Stock',
      entityId: 'STK-TIO2-001',
      details: 'Adjusted stock quantity for Titanium Dioxide Pigment from 450kg to 480kg',
      ipAddress: '192.168.1.105',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG003',
      timestamp: '2026-01-05 10:38:55',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Alert',
      module: 'Inventory',
      entity: 'Low Stock',
      entityId: 'STK-NAOH-001',
      details: 'Low stock alert generated for Caustic Soda Pellets - Current: 580kg, Required: 600kg',
      ipAddress: 'INTERNAL',
      status: 'Warning',
      type: 'System Event'
    },
    {
      id: 'LOG004',
      timestamp: '2026-01-05 10:35:22',
      user: 'Amit Patel',
      userId: 'USR003',
      action: 'Created',
      module: 'Inventory',
      entity: 'Movement',
      entityId: 'MOV-2026-089',
      details: 'Stock transfer from Main Warehouse to Production Unit - 200L Sulfuric Acid',
      ipAddress: '192.168.1.112',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG005',
      timestamp: '2026-01-05 10:30:45',
      user: 'Sunita Reddy',
      userId: 'USR004',
      action: 'Created',
      module: 'Billing',
      entity: 'Invoice',
      entityId: 'INV-2026-0158',
      details: 'Generated invoice for customer ChemTrade Solutions - Amount: ₹285,000',
      ipAddress: '192.168.1.108',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG006',
      timestamp: '2026-01-05 10:25:33',
      user: 'Vikram Singh',
      userId: 'USR005',
      action: 'Updated',
      module: 'CRM',
      entity: 'Lead',
      entityId: 'LEAD-2026-042',
      details: 'Updated lead status from "Contacted" to "Negotiation" for Industrial Polymers Ltd',
      ipAddress: '192.168.1.115',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG007',
      timestamp: '2026-01-05 10:20:11',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Backup',
      module: 'System',
      entity: 'Database',
      entityId: 'DB-BACKUP-2026-01-05',
      details: 'Automated database backup completed successfully - Size: 2.4GB',
      ipAddress: 'INTERNAL',
      status: 'Success',
      type: 'System Event'
    },
    {
      id: 'LOG008',
      timestamp: '2026-01-05 10:15:47',
      user: 'Meena Gupta',
      userId: 'USR006',
      action: 'Updated',
      module: 'Production',
      entity: 'Variance',
      entityId: 'VAR-BATCH-2026-006',
      details: 'Updated variance report for Batch PRD-B-2026-006 - Status: Unfavorable',
      ipAddress: '192.168.1.120',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG009',
      timestamp: '2026-01-05 10:10:28',
      user: 'Arjun Verma',
      userId: 'USR007',
      action: 'Created',
      module: 'Inventory',
      entity: 'Movement',
      entityId: 'MOV-2026-088',
      details: 'Stock received from supplier - 500kg Calcium Carbonate Powder',
      ipAddress: '192.168.1.118',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG010',
      timestamp: '2026-01-05 10:05:15',
      user: 'Kavita Desai',
      userId: 'USR008',
      action: 'Created',
      module: 'Billing',
      entity: 'Quotation',
      entityId: 'QUO-2026-0235',
      details: 'Created quotation for PharmaChem Industries - 1000L Ethanol 95%',
      ipAddress: '192.168.1.122',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG011',
      timestamp: '2026-01-05 10:00:42',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Scheduled',
      module: 'Production',
      entity: 'Planning',
      entityId: 'PLAN-AUTO-2026-01-05',
      details: 'Auto-scheduled production plan for next week based on demand forecast',
      ipAddress: 'INTERNAL',
      status: 'Success',
      type: 'System Event'
    },
    {
      id: 'LOG012',
      timestamp: '2026-01-05 09:58:20',
      user: 'Rahul Joshi',
      userId: 'USR009',
      action: 'Updated',
      module: 'Production',
      entity: 'Work Order',
      entityId: 'WO-2026-001',
      details: 'Updated work order progress from 50% to 60% for Hydrochloric Acid production',
      ipAddress: '192.168.1.125',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG013',
      timestamp: '2026-01-05 09:55:38',
      user: 'Neha Kapoor',
      userId: 'USR010',
      action: 'Created',
      module: 'Users',
      entity: 'User',
      entityId: 'USR029',
      details: 'Created new user account for Ravi Shankar - Role: Production Operator',
      ipAddress: '192.168.1.102',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG014',
      timestamp: '2026-01-05 09:50:12',
      user: 'Sanjay Mehta',
      userId: 'USR011',
      action: 'Viewed',
      module: 'Dashboard',
      entity: 'Sales Analytics',
      entityId: 'DASH-SALES',
      details: 'Accessed sales analytics dashboard and generated monthly report',
      ipAddress: '192.168.1.130',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG015',
      timestamp: '2026-01-05 09:45:55',
      user: 'Pooja Rao',
      userId: 'USR012',
      action: 'Updated',
      module: 'Users',
      entity: 'Role',
      entityId: 'ROLE008',
      details: 'Modified permissions for Sales Manager role - Added "Export Reports"',
      ipAddress: '192.168.1.135',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG016',
      timestamp: '2026-01-05 09:40:33',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Alert',
      module: 'Production',
      entity: 'Work Order',
      entityId: 'WO-2025-098',
      details: 'Work order completion alert - WO-2025-098 completed on schedule',
      ipAddress: 'INTERNAL',
      status: 'Success',
      type: 'System Event'
    },
    {
      id: 'LOG017',
      timestamp: '2026-01-05 09:35:18',
      user: 'Deepak Nair',
      userId: 'USR013',
      action: 'Viewed',
      module: 'Production',
      entity: 'BOM',
      entityId: 'BOM005',
      details: 'Viewed Bill of Materials for Acetic Acid 99%',
      ipAddress: '192.168.1.140',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG018',
      timestamp: '2026-01-05 09:30:45',
      user: 'Anjali Iyer',
      userId: 'USR014',
      action: 'Updated',
      module: 'Billing',
      entity: 'Ledger',
      entityId: 'LEDG-CUST-1025',
      details: 'Updated customer ledger for TechChem Solutions - Payment received: ₹150,000',
      ipAddress: '192.168.1.145',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG019',
      timestamp: '2026-01-05 09:25:22',
      user: 'Manish Agarwal',
      userId: 'USR015',
      action: 'Created',
      module: 'Inventory',
      entity: 'Movement',
      entityId: 'MOV-2026-087',
      details: 'Stock adjustment for Hydrogen Peroxide 35% - Damaged stock written off: 20L',
      ipAddress: '192.168.1.150',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG020',
      timestamp: '2026-01-05 09:20:08',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Error',
      module: 'System',
      entity: 'Email Service',
      entityId: 'EMAIL-FAILED-001',
      details: 'Failed to send email notification to customer - Retry scheduled',
      ipAddress: 'INTERNAL',
      status: 'Error',
      type: 'System Event'
    },
    {
      id: 'LOG021',
      timestamp: '2026-01-05 09:15:42',
      user: 'Karthik Menon',
      userId: 'USR017',
      action: 'Created',
      module: 'Production',
      entity: 'Variance',
      entityId: 'VAR-BATCH-2026-007',
      details: 'Created variance report for Batch PRD-B-2026-007 - Material variance: -₹5,200',
      ipAddress: '192.168.1.155',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG022',
      timestamp: '2026-01-05 09:10:28',
      user: 'Divya Krishnan',
      userId: 'USR018',
      action: 'Created',
      module: 'Inventory',
      entity: 'Purchase Order',
      entityId: 'PO-2026-0089',
      details: 'Created purchase order for Ilmenite Ore - Quantity: 1500kg, Supplier: Mineral Traders',
      ipAddress: '192.168.1.160',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG023',
      timestamp: '2026-01-05 09:05:15',
      user: 'Suresh Raman',
      userId: 'USR019',
      action: 'Updated',
      module: 'Production',
      entity: 'Job Work',
      entityId: 'JW-2026-003',
      details: 'Updated job work status - Repackaging 40% completed at PackMaster Solutions',
      ipAddress: '192.168.1.165',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG024',
      timestamp: '2026-01-05 09:00:33',
      user: 'Anita Bhatt',
      userId: 'USR020',
      action: 'Viewed',
      module: 'Inventory',
      entity: 'Warehouse',
      entityId: 'WH-MAIN',
      details: 'Accessed Main Warehouse inventory report - Current utilization: 85%',
      ipAddress: '192.168.1.170',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG025',
      timestamp: '2026-01-05 08:55:48',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Maintenance',
      module: 'System',
      entity: 'Cache',
      entityId: 'CACHE-CLEAR-2026-01-05',
      details: 'System cache cleared automatically - Performance optimization completed',
      ipAddress: 'INTERNAL',
      status: 'Success',
      type: 'System Event'
    },
    {
      id: 'LOG026',
      timestamp: '2026-01-05 08:50:22',
      user: 'Ramesh Kulkarni',
      userId: 'USR021',
      action: 'Updated',
      module: 'System',
      entity: 'Settings',
      entityId: 'SYS-CONFIG-001',
      details: 'Updated system configuration - Modified email notification settings',
      ipAddress: '192.168.1.103',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG027',
      timestamp: '2026-01-05 08:45:10',
      user: 'Ganesh Naidu',
      userId: 'USR023',
      action: 'Created',
      module: 'Production',
      entity: 'Planning',
      entityId: 'WO-2026-016',
      details: 'Scheduled production for Ammonia Solution 25% - Start: 2026-01-09',
      ipAddress: '192.168.1.175',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG028',
      timestamp: '2026-01-05 08:40:35',
      user: 'Rekha Shah',
      userId: 'USR024',
      action: 'Viewed',
      module: 'Billing',
      entity: 'Reports',
      entityId: 'REP-MONTHLY-DEC2025',
      details: 'Generated and viewed monthly financial report for December 2025',
      ipAddress: '192.168.1.180',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG029',
      timestamp: '2026-01-05 08:35:18',
      user: 'Shweta Mishra',
      userId: 'USR026',
      action: 'Updated',
      module: 'Production',
      entity: 'Variance',
      entityId: 'VAR-BATCH-2026-005',
      details: 'Approved variance report for Batch PRD-B-2026-005 - Quality check passed',
      ipAddress: '192.168.1.185',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG030',
      timestamp: '2026-01-05 08:30:42',
      user: 'Manoj Tiwari',
      userId: 'USR027',
      action: 'Created',
      module: 'Inventory',
      entity: 'Purchase Order',
      entityId: 'PO-2026-0090',
      details: 'Created purchase order for Iron Oxide - Quantity: 280kg, Supplier: Oxide Materials',
      ipAddress: '192.168.1.190',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG031',
      timestamp: '2026-01-05 08:25:15',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Alert',
      module: 'Production',
      entity: 'Planning',
      entityId: 'WO-2026-003',
      details: 'Material availability alert - Ilmenite ore pending for Work Order WO-2026-003',
      ipAddress: 'INTERNAL',
      status: 'Warning',
      type: 'System Event'
    },
    {
      id: 'LOG032',
      timestamp: '2026-01-05 08:20:38',
      user: 'Rajesh Kumar',
      userId: 'USR001',
      action: 'Updated',
      module: 'Production',
      entity: 'BOM',
      entityId: 'BOM012',
      details: 'Updated Bill of Materials for Ethanol 95% - Modified denaturant quantity',
      ipAddress: '192.168.1.101',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG033',
      timestamp: '2026-01-05 08:15:22',
      user: 'Priya Sharma',
      userId: 'USR002',
      action: 'Viewed',
      module: 'Production',
      entity: 'Planning',
      entityId: 'PLAN-WEEKLY-W02',
      details: 'Reviewed weekly production plan for Week 2',
      ipAddress: '192.168.1.105',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG034',
      timestamp: '2026-01-05 08:10:45',
      user: 'Amit Patel',
      userId: 'USR003',
      action: 'Created',
      module: 'Inventory',
      entity: 'Stock Adjustment',
      entityId: 'ADJ-2026-015',
      details: 'Physical stock verification - Adjusted Acetic Acid 99% quantity +10L',
      ipAddress: '192.168.1.112',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG035',
      timestamp: '2026-01-05 08:05:12',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Sync',
      module: 'System',
      entity: 'Data Sync',
      entityId: 'SYNC-2026-01-05-08',
      details: 'Hourly data synchronization completed - All modules synchronized',
      ipAddress: 'INTERNAL',
      status: 'Success',
      type: 'System Event'
    },
    {
      id: 'LOG036',
      timestamp: '2026-01-05 08:00:28',
      user: 'Sunita Reddy',
      userId: 'USR004',
      action: 'Updated',
      module: 'Billing',
      entity: 'Invoice',
      entityId: 'INV-2026-0157',
      details: 'Updated invoice payment status - Partial payment received: ₹100,000',
      ipAddress: '192.168.1.108',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG037',
      timestamp: '2026-01-05 07:55:40',
      user: 'Vikram Singh',
      userId: 'USR005',
      action: 'Created',
      module: 'CRM',
      entity: 'Lead',
      entityId: 'LEAD-2026-043',
      details: 'Added new lead - Company: BioTech Research Ltd, Contact: Dr. Sharma',
      ipAddress: '192.168.1.115',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG038',
      timestamp: '2026-01-05 07:50:15',
      user: 'Meena Gupta',
      userId: 'USR006',
      action: 'Viewed',
      module: 'Production',
      entity: 'Variance',
      entityId: 'VAR-MONTHLY-DEC2025',
      details: 'Accessed monthly variance report for December 2025',
      ipAddress: '192.168.1.120',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG039',
      timestamp: '2026-01-05 07:45:33',
      user: 'Arjun Verma',
      userId: 'USR007',
      action: 'Updated',
      module: 'Inventory',
      entity: 'Warehouse',
      entityId: 'WH-PROD',
      details: 'Updated Production Warehouse layout - Reorganized storage sections',
      ipAddress: '192.168.1.118',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG040',
      timestamp: '2026-01-05 07:40:18',
      user: 'System',
      userId: 'SYSTEM',
      action: 'Report',
      module: 'System',
      entity: 'Usage Report',
      entityId: 'USAGE-2026-01-05',
      details: 'Daily usage report generated - Active users: 18, Total sessions: 42',
      ipAddress: 'INTERNAL',
      status: 'Success',
      type: 'System Event'
    },
    {
      id: 'LOG041',
      timestamp: '2026-01-05 07:35:22',
      user: 'Kavita Desai',
      userId: 'USR008',
      action: 'Updated',
      module: 'Billing',
      entity: 'Quotation',
      entityId: 'QUO-2026-0234',
      details: 'Modified quotation pricing - Updated discount from 5% to 7%',
      ipAddress: '192.168.1.122',
      status: 'Success',
      type: 'User Action'
    },
    {
      id: 'LOG042',
      timestamp: '2026-01-05 07:30:45',
      user: 'Rahul Joshi',
      userId: 'USR009',
      action: 'Viewed',
      module: 'Production',
      entity: 'Job Work',
      entityId: 'JW-2026-001',
      details: 'Checked job work status for Granulation process at ChemProcess Industries',
      ipAddress: '192.168.1.125',
      status: 'Success',
      type: 'User Action'
    }
  ];

  // Activity by module
  const moduleActivity = [
    { module: 'Production', count: 38 },
    { module: 'Inventory', count: 42 },
    { module: 'Billing', count: 28 },
    { module: 'CRM', count: 15 },
    { module: 'Users', count: 12 },
    { module: 'System', count: 21 }
  ];

  // Activity by type
  const typeActivity = [
    { type: 'User Action', count: 132 },
    { type: 'System Event', count: 24 }
  ];

  // Hourly activity trend
  const hourlyActivity = [
    { hour: '06:00', activities: 8 },
    { hour: '07:00', activities: 12 },
    { hour: '08:00', activities: 18 },
    { hour: '09:00', activities: 24 },
    { hour: '10:00', activities: 32 },
    { hour: '11:00', activities: 28 }
  ];

  // Top active users
  const topUsers = [
    { user: 'Rajesh Kumar', activities: 15 },
    { user: 'Priya Sharma', activities: 12 },
    { user: 'Amit Patel', activities: 11 },
    { user: 'Sunita Reddy', activities: 9 },
    { user: 'System', activities: 24 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Filter activity logs
  const filteredLogs = activityLogs.filter(log => {
    const matchesType = selectedType === 'All' || log.type === selectedType;
    const matchesUser = selectedUser === 'All' || log.user === selectedUser;
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date filtering
    let matchesDate = true;
    if (dateFilter === 'Today') {
      matchesDate = log.timestamp.startsWith('2026-01-05');
    }
    
    return matchesType && matchesUser && matchesSearch && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'Created': return <FileText className="text-green-500" size={16} />;
      case 'Updated': return <TrendingUp className="text-blue-500" size={16} />;
      case 'Deleted': return <AlertCircle className="text-red-500" size={16} />;
      case 'Viewed': return <Package className="text-purple-500" size={16} />;
      case 'Alert': return <AlertCircle className="text-orange-500" size={16} />;
      case 'Error': return <AlertCircle className="text-red-500" size={16} />;
      default: return <Activity className="text-gray-500" size={16} />;
    }
  };

  const getTypeColor = (type) => {
    return type === 'User Action' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="p-6 min-h-screen mt-10 mt-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">Activity Logs</h1>
        <p className="text-gray-600">Monitor system activities and user actions in real-time</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Activities</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.totalActivities}</p>
            </div>
            <Activity className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Activities</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.todayActivities}</p>
            </div>
            <Clock className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.activeUsers}</p>
            </div>
            <User className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">System Events</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.systemEvents}</p>
            </div>
            <Settings className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Activity by Module */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Activity by Module</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moduleActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="module" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Activities" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity by Type */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Activity by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeActivity}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, count }) => `${type}: ${count}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {typeActivity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hourly Activity & Top Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Hourly Activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Hourly Activity Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={hourlyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="activities" stroke="#10b981" strokeWidth={2} name="Activities" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Active Users */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Top Active Users</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topUsers} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="user" type="category" width={120} />
              <Tooltip />
              <Legend />
              <Bar dataKey="activities" fill="#8b5cf6" name="Activities" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Search Activity</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Filter by Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="User Action">User Action</option>
              <option value="System Event">System Event</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Filter by User</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Users</option>
              <option value="Rajesh Kumar">Rajesh Kumar</option>
              <option value="Priya Sharma">Priya Sharma</option>
              <option value="Amit Patel">Amit Patel</option>
              <option value="Sunita Reddy">Sunita Reddy</option>
              <option value="System">System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Today">Today</option>
              <option value="All">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">Activity Timeline ({filteredLogs.length} records)</h2>
        </div>

        <div className="divide-y divide-gray-200 max-h-[800px] overflow-y-auto">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="mt-1">
                    {getActionIcon(log.action)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-black">{log.user}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getTypeColor(log.type)}`}>
                        {log.type}
                      </span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-600 text-sm">{log.module}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">
                      <span className="font-medium">{log.action}</span> {log.entity} 
                      <span className="text-gray-500"> ({log.entityId})</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="mr-1" size={12} />
                        {log.timestamp}
                      </span>
                      <span>IP: {log.ipAddress}</span>
                      <span>User ID: {log.userId}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No Results Message */}
      {filteredLogs.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg mt-6">
          <Activity className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No activity logs found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Activitylogs;
