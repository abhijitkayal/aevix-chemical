import React, { useState } from 'react';
import { Calendar, Layers, TrendingUp, AlertCircle, CheckCircle, Clock, Package, Factory, Search } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const Planning = () => {
  const [selectedWeek, setSelectedWeek] = useState('Week 2');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Summary data
  const summary = {
    totalWorkOrders: 24,
    scheduledProduction: 15,
    completedOrders: 6,
    delayedOrders: 3
  };

  // Work Orders Data
  const workOrders = [
    {
      id: 'WO-2026-001',
      productCode: 'PROD-HCL-001',
      productName: 'Hydrochloric Acid 35%',
      quantity: 5000,
      unit: 'Liter',
      scheduledStart: '2026-01-06',
      scheduledEnd: '2026-01-10',
      actualStart: '2026-01-06',
      actualEnd: null,
      status: 'In Progress',
      priority: 'High',
      progress: 60,
      assignedLine: 'Production Line A',
      batchSize: 1000,
      batches: 5,
      materialStatus: 'Available',
      remarks: 'On track, 3 batches completed'
    },
    {
      id: 'WO-2026-002',
      productCode: 'PROD-NAOH-001',
      productName: 'Sodium Hydroxide 50%',
      quantity: 2000,
      unit: 'Kg',
      scheduledStart: '2026-01-08',
      scheduledEnd: '2026-01-12',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Medium',
      progress: 0,
      assignedLine: 'Production Line B',
      batchSize: 500,
      batches: 4,
      materialStatus: 'Available',
      remarks: 'Materials ready, awaiting production start'
    },
    {
      id: 'WO-2026-003',
      productCode: 'PROD-TIO2-001',
      productName: 'Titanium Dioxide Pigment',
      quantity: 3000,
      unit: 'Kg',
      scheduledStart: '2026-01-10',
      scheduledEnd: '2026-01-18',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'High',
      progress: 0,
      assignedLine: 'Production Line C',
      batchSize: 1000,
      batches: 3,
      materialStatus: 'Partial',
      remarks: 'Ilmenite ore pending delivery'
    },
    {
      id: 'WO-2025-098',
      productCode: 'PROD-CACO3-001',
      productName: 'Calcium Carbonate Powder',
      quantity: 4000,
      unit: 'Kg',
      scheduledStart: '2025-12-28',
      scheduledEnd: '2026-01-05',
      actualStart: '2025-12-28',
      actualEnd: '2026-01-05',
      status: 'Completed',
      priority: 'Medium',
      progress: 100,
      assignedLine: 'Production Line A',
      batchSize: 2000,
      batches: 2,
      materialStatus: 'Available',
      remarks: 'Completed on schedule'
    },
    {
      id: 'WO-2025-099',
      productCode: 'PROD-H2SO4-001',
      productName: 'Sulfuric Acid 98%',
      quantity: 6000,
      unit: 'Liter',
      scheduledStart: '2026-01-02',
      scheduledEnd: '2026-01-08',
      actualStart: '2026-01-02',
      actualEnd: null,
      status: 'In Progress',
      priority: 'High',
      progress: 75,
      assignedLine: 'Production Line D',
      batchSize: 2000,
      batches: 3,
      materialStatus: 'Available',
      remarks: '2.25 batches completed, final batch in process'
    },
    {
      id: 'WO-2026-004',
      productCode: 'PROD-NH3-001',
      productName: 'Ammonia Solution 25%',
      quantity: 3000,
      unit: 'Liter',
      scheduledStart: '2026-01-09',
      scheduledEnd: '2026-01-13',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Medium',
      progress: 0,
      assignedLine: 'Production Line B',
      batchSize: 3000,
      batches: 1,
      materialStatus: 'Available',
      remarks: 'Single large batch planned'
    },
    {
      id: 'WO-2025-097',
      productCode: 'PROD-ACET-001',
      productName: 'Acetic Acid 99%',
      quantity: 1500,
      unit: 'Liter',
      scheduledStart: '2025-12-20',
      scheduledEnd: '2025-12-30',
      actualStart: '2025-12-21',
      actualEnd: '2026-01-02',
      status: 'Completed',
      priority: 'Low',
      progress: 100,
      assignedLine: 'Production Line C',
      batchSize: 1500,
      batches: 1,
      materialStatus: 'Available',
      remarks: 'Delayed by 3 days due to catalyst shortage'
    },
    {
      id: 'WO-2026-005',
      productCode: 'PROD-H2O2-001',
      productName: 'Hydrogen Peroxide 35%',
      quantity: 2400,
      unit: 'Liter',
      scheduledStart: '2026-01-11',
      scheduledEnd: '2026-01-16',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'High',
      progress: 0,
      assignedLine: 'Production Line A',
      batchSize: 1200,
      batches: 2,
      materialStatus: 'Available',
      remarks: 'High priority customer order'
    },
    {
      id: 'WO-2026-006',
      productCode: 'PROD-FECL3-001',
      productName: 'Ferric Chloride 40%',
      quantity: 1600,
      unit: 'Liter',
      scheduledStart: '2026-01-13',
      scheduledEnd: '2026-01-17',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Medium',
      progress: 0,
      assignedLine: 'Production Line B',
      batchSize: 800,
      batches: 2,
      materialStatus: 'Partial',
      remarks: 'Iron oxide to arrive on 2026-01-12'
    },
    {
      id: 'WO-2025-096',
      productCode: 'PROD-SILICA-001',
      productName: 'Silica Gel Desiccant',
      quantity: 1000,
      unit: 'Kg',
      scheduledStart: '2025-12-18',
      scheduledEnd: '2025-12-28',
      actualStart: '2025-12-18',
      actualEnd: '2025-12-28',
      status: 'Completed',
      priority: 'Medium',
      progress: 100,
      assignedLine: 'Production Line C',
      batchSize: 500,
      batches: 2,
      materialStatus: 'Available',
      remarks: 'Quality check passed'
    },
    {
      id: 'WO-2026-007',
      productCode: 'PROD-PHBUF-001',
      productName: 'pH Buffer Solution 7.0',
      quantity: 2000,
      unit: 'Liter',
      scheduledStart: '2026-01-14',
      scheduledEnd: '2026-01-18',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Low',
      progress: 0,
      assignedLine: 'Production Line A',
      batchSize: 1000,
      batches: 2,
      materialStatus: 'Available',
      remarks: 'Standard production run'
    },
    {
      id: 'WO-2026-008',
      productCode: 'PROD-ETOH-001',
      productName: 'Ethanol 95% Denatured',
      quantity: 4000,
      unit: 'Liter',
      scheduledStart: '2026-01-15',
      scheduledEnd: '2026-01-22',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Medium',
      progress: 0,
      assignedLine: 'Production Line D',
      batchSize: 2000,
      batches: 2,
      materialStatus: 'Available',
      remarks: 'Large order for industrial client'
    },
    {
      id: 'WO-2025-095',
      productCode: 'PROD-HCL-001',
      productName: 'Hydrochloric Acid 35%',
      quantity: 3000,
      unit: 'Liter',
      scheduledStart: '2025-12-10',
      scheduledEnd: '2025-12-18',
      actualStart: '2025-12-10',
      actualEnd: '2025-12-18',
      status: 'Completed',
      priority: 'High',
      progress: 100,
      assignedLine: 'Production Line A',
      batchSize: 1000,
      batches: 3,
      materialStatus: 'Available',
      remarks: 'Export order completed successfully'
    },
    {
      id: 'WO-2026-009',
      productCode: 'PROD-TIO2-001',
      productName: 'Titanium Dioxide Pigment',
      quantity: 2000,
      unit: 'Kg',
      scheduledStart: '2026-01-20',
      scheduledEnd: '2026-01-28',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Medium',
      progress: 0,
      assignedLine: 'Production Line C',
      batchSize: 1000,
      batches: 2,
      materialStatus: 'Not Available',
      remarks: 'Material procurement in progress'
    },
    {
      id: 'WO-2026-010',
      productCode: 'PROD-NAOH-001',
      productName: 'Sodium Hydroxide 50%',
      quantity: 1500,
      unit: 'Kg',
      scheduledStart: '2026-01-16',
      scheduledEnd: '2026-01-20',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Low',
      progress: 0,
      assignedLine: 'Production Line B',
      batchSize: 500,
      batches: 3,
      materialStatus: 'Available',
      remarks: 'Routine replenishment order'
    },
    {
      id: 'WO-2025-094',
      productCode: 'PROD-CACO3-001',
      productName: 'Calcium Carbonate Powder',
      quantity: 2000,
      unit: 'Kg',
      scheduledStart: '2025-12-05',
      scheduledEnd: '2025-12-12',
      actualStart: '2025-12-05',
      actualEnd: '2025-12-15',
      status: 'Delayed',
      priority: 'Medium',
      progress: 100,
      assignedLine: 'Production Line A',
      batchSize: 2000,
      batches: 1,
      materialStatus: 'Available',
      remarks: 'Completed but delayed by 3 days due to equipment maintenance'
    },
    {
      id: 'WO-2026-011',
      productCode: 'PROD-H2SO4-001',
      productName: 'Sulfuric Acid 98%',
      quantity: 4000,
      unit: 'Liter',
      scheduledStart: '2026-01-22',
      scheduledEnd: '2026-01-28',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'High',
      progress: 0,
      assignedLine: 'Production Line D',
      batchSize: 2000,
      batches: 2,
      materialStatus: 'Available',
      remarks: 'Back-to-back production with WO-2026-008'
    },
    {
      id: 'WO-2025-093',
      productCode: 'PROD-NH3-001',
      productName: 'Ammonia Solution 25%',
      quantity: 1500,
      unit: 'Liter',
      scheduledStart: '2025-12-01',
      scheduledEnd: '2025-12-08',
      actualStart: '2025-12-01',
      actualEnd: '2025-12-10',
      status: 'Delayed',
      priority: 'Medium',
      progress: 100,
      assignedLine: 'Production Line B',
      batchSize: 1500,
      batches: 1,
      materialStatus: 'Available',
      remarks: 'Gas supply issue caused 2-day delay'
    },
    {
      id: 'WO-2026-012',
      productCode: 'PROD-ACET-001',
      productName: 'Acetic Acid 99%',
      quantity: 3000,
      unit: 'Liter',
      scheduledStart: '2026-01-25',
      scheduledEnd: '2026-02-02',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Medium',
      progress: 0,
      assignedLine: 'Production Line C',
      batchSize: 1500,
      batches: 2,
      materialStatus: 'Partial',
      remarks: 'Catalyst order pending'
    },
    {
      id: 'WO-2026-013',
      productCode: 'PROD-H2O2-001',
      productName: 'Hydrogen Peroxide 35%',
      quantity: 1200,
      unit: 'Liter',
      scheduledStart: '2026-01-27',
      scheduledEnd: '2026-01-30',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Low',
      progress: 0,
      assignedLine: 'Production Line A',
      batchSize: 1200,
      batches: 1,
      materialStatus: 'Available',
      remarks: 'Small batch for local distributor'
    },
    {
      id: 'WO-2025-092',
      productCode: 'PROD-FECL3-001',
      productName: 'Ferric Chloride 40%',
      quantity: 800,
      unit: 'Liter',
      scheduledStart: '2025-11-25',
      scheduledEnd: '2025-12-03',
      actualStart: '2025-11-25',
      actualEnd: '2025-12-03',
      status: 'Completed',
      priority: 'Low',
      progress: 100,
      assignedLine: 'Production Line B',
      batchSize: 800,
      batches: 1,
      materialStatus: 'Available',
      remarks: 'Smooth production run'
    },
    {
      id: 'WO-2026-014',
      productCode: 'PROD-SILICA-001',
      productName: 'Silica Gel Desiccant',
      quantity: 500,
      unit: 'Kg',
      scheduledStart: '2026-01-29',
      scheduledEnd: '2026-02-05',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Medium',
      progress: 0,
      assignedLine: 'Production Line C',
      batchSize: 500,
      batches: 1,
      materialStatus: 'Available',
      remarks: 'Scheduled for late January'
    },
    {
      id: 'WO-2026-015',
      productCode: 'PROD-PHBUF-001',
      productName: 'pH Buffer Solution 7.0',
      quantity: 1000,
      unit: 'Liter',
      scheduledStart: '2026-02-01',
      scheduledEnd: '2026-02-05',
      actualStart: null,
      actualEnd: null,
      status: 'Scheduled',
      priority: 'Low',
      progress: 0,
      assignedLine: 'Production Line A',
      batchSize: 1000,
      batches: 1,
      materialStatus: 'Available',
      remarks: 'February production plan'
    },
    {
      id: 'WO-2025-091',
      productCode: 'PROD-ETOH-001',
      productName: 'Ethanol 95% Denatured',
      quantity: 2000,
      unit: 'Liter',
      scheduledStart: '2025-11-20',
      scheduledEnd: '2025-11-28',
      actualStart: '2025-11-22',
      actualEnd: '2025-12-01',
      status: 'Delayed',
      priority: 'Medium',
      progress: 100,
      assignedLine: 'Production Line D',
      batchSize: 2000,
      batches: 1,
      materialStatus: 'Available',
      remarks: 'Started late due to line scheduling conflict'
    }
  ];

  // Weekly capacity planning
  const weeklyCapacity = [
    { week: 'Week 1', planned: 85, actual: 88, capacity: 100 },
    { week: 'Week 2', planned: 92, actual: 85, capacity: 100 },
    { week: 'Week 3', planned: 78, actual: 0, capacity: 100 },
    { week: 'Week 4', planned: 95, actual: 0, capacity: 100 }
  ];

  // Production line utilization
  const lineUtilization = [
    { line: 'Line A', utilization: 88, plannedHours: 176, actualHours: 155 },
    { line: 'Line B', utilization: 75, plannedHours: 176, actualHours: 132 },
    { line: 'Line C', utilization: 82, plannedHours: 176, actualHours: 144 },
    { line: 'Line D', utilization: 90, plannedHours: 176, actualHours: 158 }
  ];

  // Material requirement planning
  const materialRequirements = [
    { material: 'Sulfuric Acid Concentrate', required: 3500, available: 4200, unit: 'Liter', status: 'Sufficient' },
    { material: 'Hydrogen Chloride Gas', required: 850, available: 1000, unit: 'Kg', status: 'Sufficient' },
    { material: 'Caustic Soda Pellets', required: 600, available: 580, unit: 'Kg', status: 'Shortage' },
    { material: 'Ilmenite Ore', required: 1500, available: 800, unit: 'Kg', status: 'Critical' },
    { material: 'Ammonia Gas', required: 750, available: 900, unit: 'Kg', status: 'Sufficient' },
    { material: 'Methanol', required: 1200, available: 1500, unit: 'Liter', status: 'Sufficient' },
    { material: 'Deionized Water', required: 5000, available: 8000, unit: 'Liter', status: 'Sufficient' },
    { material: 'Iron Oxide', required: 280, available: 150, unit: 'Kg', status: 'Shortage' },
    { material: 'H2O2 Concentrate', required: 1200, available: 1200, unit: 'Liter', status: 'Sufficient' },
    { material: 'Packaging Materials', required: 5000, available: 6500, unit: 'Units', status: 'Sufficient' }
  ];

  // Daily production forecast (next 10 days)
  const productionForecast = [
    { date: 'Jan 06', output: 5200, target: 5000 },
    { date: 'Jan 07', output: 4800, target: 5000 },
    { date: 'Jan 08', output: 5500, target: 5500 },
    { date: 'Jan 09', output: 4900, target: 5000 },
    { date: 'Jan 10', output: 5100, target: 5000 },
    { date: 'Jan 11', output: 5300, target: 5500 },
    { date: 'Jan 12', output: 5600, target: 5500 },
    { date: 'Jan 13', output: 5200, target: 5500 },
    { date: 'Jan 14', output: 4700, target: 5000 },
    { date: 'Jan 15', output: 5400, target: 5500 }
  ];

  // Filter work orders
  const filteredWorkOrders = workOrders.filter(order => {
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.productCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaterialStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-yellow-100 text-yellow-800';
      case 'Not Available': return 'bg-red-100 text-red-800';
      case 'Sufficient': return 'bg-green-100 text-green-800';
      case 'Shortage': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 min-h-screen mt-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">Production Planning</h1>
        <p className="text-gray-600">Schedule, monitor, and optimize production operations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Work Orders</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.totalWorkOrders}</p>
            </div>
            <Calendar className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Scheduled Production</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.scheduledProduction}</p>
            </div>
            <Clock className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed Orders</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.completedOrders}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Delayed Orders</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.delayedOrders}</p>
            </div>
            <AlertCircle className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Capacity Planning */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Weekly Capacity Utilization</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyCapacity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="capacity" fill="#e5e7eb" name="Capacity %" />
              <Bar dataKey="planned" fill="#3b82f6" name="Planned %" />
              <Bar dataKey="actual" fill="#10b981" name="Actual %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Production Forecast */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">10-Day Production Forecast</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={productionForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="target" stroke="#f59e0b" fill="#fef3c7" name="Target Output" />
              <Area type="monotone" dataKey="output" stroke="#10b981" fill="#d1fae5" name="Forecast Output" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Production Line Utilization */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-black mb-4">Production Line Utilization</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={lineUtilization}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="line" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="utilization" fill="#8b5cf6" name="Utilization %" />
            <Bar dataKey="actualHours" fill="#10b981" name="Actual Hours" />
            <Bar dataKey="plannedHours" fill="#3b82f6" name="Planned Hours" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Material Requirements Planning */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-black mb-4">Material Requirements (Next 2 Weeks)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Material</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Gap</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materialRequirements.map((material, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm font-medium text-black">{material.material}</td>
                  <td className="px-6 py-4 text-sm text-black">{material.required}</td>
                  <td className="px-6 py-4 text-sm text-black">{material.available}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{material.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMaterialStatusColor(material.status)}`}>
                      {material.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: material.available >= material.required ? '#10b981' : '#ef4444' }}>
                    {material.available >= material.required ? '+' : ''}{material.available - material.required}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Search Work Order</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by WO number, product name, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Work Orders Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">Work Orders Schedule</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">WO Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Production Line</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Materials</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-black">{order.id}</div>
                    <div className="text-xs text-gray-600">{order.productCode}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black max-w-xs">{order.productName}</div>
                    <div className="text-xs text-gray-600">{order.batches} batches × {order.batchSize} {order.unit}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-black">{order.quantity}</div>
                    <div className="text-xs text-gray-600">{order.unit}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-black">{order.scheduledStart}</div>
                    <div className="text-xs text-gray-600">to {order.scheduledEnd}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black">{order.assignedLine}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${order.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{order.progress}%</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMaterialStatusColor(order.materialStatus)}`}>
                      {order.materialStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results Message */}
      {filteredWorkOrders.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg mt-6">
          <Factory className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No work orders found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Planning;
