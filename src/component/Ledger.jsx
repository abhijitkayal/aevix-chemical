import React, { useState } from 'react';
import { FileText, DollarSign, TrendingUp, TrendingDown, User, Calendar, Search, Filter, Download, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Ledger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('All');
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [dateRange, setDateRange] = useState('This Month');

  // Summary data
  const summary = {
    totalCustomers: 45,
    totalReceivables: 2456000,
    totalPayables: 385000,
    overdueAmount: 385000,
    creditBalance: 125000
  };

  // Customer ledger accounts
  const ledgers = [
    {
      id: 'LEDG-1001',
      customerId: 'CUST-1001',
      customerName: 'ChemTrade Solutions',
      openingBalance: 150000,
      totalInvoices: 2850000,
      totalPayments: 2700000,
      closingBalance: 300000,
      creditLimit: 500000,
      creditDays: 30,
      status: 'Active',
      lastTransaction: '2026-01-05',
      agingAnalysis: {
        current: 200000,
        days30: 80000,
        days60: 20000,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2026-01-05', type: 'Invoice', refNo: 'INV-2026-0158', debit: 336300, credit: 0, balance: 300000, narration: 'Hydrochloric Acid & Sulfuric Acid' },
        { date: '2026-01-03', type: 'Payment', refNo: 'PAY-2026-0052', debit: 0, credit: 250000, balance: -36300, narration: 'Bank Transfer - NEFT' },
        { date: '2025-12-28', type: 'Invoice', refNo: 'INV-2025-0145', debit: 285000, credit: 0, balance: 213700, narration: 'Monthly chemical supply' },
        { date: '2025-12-20', type: 'Payment', refNo: 'PAY-2025-0248', debit: 0, credit: 200000, balance: -71300, narration: 'Cheque Payment' },
        { date: '2025-12-15', type: 'Invoice', refNo: 'INV-2025-0132', debit: 320000, credit: 0, balance: 128700, narration: 'Bulk order - Industrial chemicals' }
      ]
    },
    {
      id: 'LEDG-1002',
      customerId: 'CUST-1002',
      customerName: 'Industrial Polymers Ltd',
      openingBalance: 85000,
      totalInvoices: 2150000,
      totalPayments: 1980000,
      closingBalance: 255000,
      creditLimit: 400000,
      creditDays: 30,
      status: 'Active',
      lastTransaction: '2026-01-04',
      agingAnalysis: {
        current: 105320,
        days30: 120000,
        days60: 29680,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2026-01-04', type: 'Invoice', refNo: 'INV-2026-0157', debit: 205320, credit: 0, balance: 255000, narration: 'Ethanol & Acetic Acid' },
        { date: '2025-12-30', type: 'Payment', refNo: 'PAY-2026-0048', debit: 0, credit: 150000, balance: 49680, narration: 'Bank Transfer' },
        { date: '2025-12-22', type: 'Invoice', refNo: 'INV-2025-0140', debit: 178000, credit: 0, balance: 199680, narration: 'Polymer raw materials' },
        { date: '2025-12-15', type: 'Payment', refNo: 'PAY-2025-0242', debit: 0, credit: 180000, balance: 21680, narration: 'NEFT Payment' },
        { date: '2025-12-10', type: 'Invoice', refNo: 'INV-2025-0125', debit: 195000, credit: 0, balance: 201680, narration: 'Monthly supply order' }
      ]
    },
    {
      id: 'LEDG-1003',
      customerId: 'CUST-1003',
      customerName: 'PharmaChem Industries',
      openingBalance: 95000,
      totalInvoices: 1920000,
      totalPayments: 1950000,
      closingBalance: 65000,
      creditLimit: 350000,
      creditDays: 45,
      status: 'Active',
      lastTransaction: '2026-01-03',
      agingAnalysis: {
        current: 65000,
        days30: 0,
        days60: 0,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2026-01-03', type: 'Invoice', refNo: 'INV-2026-0156', debit: 205320, credit: 0, balance: 65000, narration: 'Isopropyl Alcohol & H2O2' },
        { date: '2025-12-28', type: 'Payment', refNo: 'PAY-2026-0045', debit: 0, credit: 225000, balance: -140320, narration: 'Cheque - Cleared' },
        { date: '2025-12-20', type: 'Invoice', refNo: 'INV-2025-0138', debit: 185000, credit: 0, balance: 84680, narration: 'Pharmaceutical grade chemicals' },
        { date: '2025-12-12', type: 'Payment', refNo: 'PAY-2025-0238', debit: 0, credit: 165000, balance: -100320, narration: 'Bank Transfer' },
        { date: '2025-12-05', type: 'Invoice', refNo: 'INV-2025-0118', debit: 172000, credit: 0, balance: 64680, narration: 'Regular supply order' }
      ]
    },
    {
      id: 'LEDG-1004',
      customerId: 'CUST-1004',
      customerName: 'TechChem Solutions',
      openingBalance: 45000,
      totalInvoices: 1680000,
      totalPayments: 1650000,
      closingBalance: 75000,
      creditLimit: 300000,
      creditDays: 30,
      status: 'Active',
      lastTransaction: '2026-01-02',
      agingAnalysis: {
        current: 75000,
        days30: 0,
        days60: 0,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2026-01-02', type: 'Invoice', refNo: 'INV-2026-0155', debit: 177000, credit: 0, balance: 75000, narration: 'Ammonia & Caustic Soda' },
        { date: '2025-12-26', type: 'Payment', refNo: 'PAY-2026-0042', debit: 0, credit: 168000, balance: -102000, narration: 'RTGS Payment' },
        { date: '2025-12-18', type: 'Invoice', refNo: 'INV-2025-0135', debit: 158000, credit: 0, balance: 66000, narration: 'Chemical supplies' },
        { date: '2025-12-10', type: 'Payment', refNo: 'PAY-2025-0235', debit: 0, credit: 145000, balance: -92000, narration: 'Bank Transfer' },
        { date: '2025-12-03', type: 'Invoice', refNo: 'INV-2025-0115', debit: 149000, credit: 0, balance: 53000, narration: 'Monthly order' }
      ]
    },
    {
      id: 'LEDG-1005',
      customerId: 'CUST-1005',
      customerName: 'BioTech Research Ltd',
      openingBalance: 120000,
      totalInvoices: 980000,
      totalPayments: 850000,
      closingBalance: 250000,
      creditLimit: 400000,
      creditDays: 45,
      status: 'Active',
      lastTransaction: '2026-01-01',
      agingAnalysis: {
        current: 162840,
        days30: 87160,
        days60: 0,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2026-01-01', type: 'Invoice', refNo: 'INV-2026-0154', debit: 162840, credit: 0, balance: 250000, narration: 'TiO2 Pigment & Iron Oxide' },
        { date: '2025-12-24', type: 'Payment', refNo: 'PAY-2026-0038', debit: 0, credit: 95000, balance: 87160, narration: 'Partial Payment - NEFT' },
        { date: '2025-12-16', type: 'Invoice', refNo: 'INV-2025-0133', debit: 142000, credit: 0, balance: 182160, narration: 'Research grade chemicals' },
        { date: '2025-12-08', type: 'Payment', refNo: 'PAY-2025-0228', debit: 0, credit: 128000, balance: 40160, narration: 'Bank Transfer' },
        { date: '2025-12-01', type: 'Invoice', refNo: 'INV-2025-0110', debit: 168160, credit: 0, balance: 168160, narration: 'Special order - Laboratory supplies' }
      ]
    },
    {
      id: 'LEDG-1006',
      customerId: 'CUST-1006',
      customerName: 'ChemCore Industries',
      openingBalance: 65000,
      totalInvoices: 1250000,
      totalPayments: 1140000,
      closingBalance: 175000,
      creditLimit: 300000,
      creditDays: 30,
      status: 'Overdue',
      lastTransaction: '2025-12-28',
      agingAnalysis: {
        current: 0,
        days30: 74110,
        days60: 100890,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2025-12-28', type: 'Invoice', refNo: 'INV-2025-0153', debit: 100890, credit: 0, balance: 175000, narration: 'Sodium Bicarbonate & CaCO3' },
        { date: '2025-12-20', type: 'Payment', refNo: 'PAY-2025-0250', debit: 0, credit: 85000, balance: 74110, narration: 'Cheque Payment' },
        { date: '2025-12-12', type: 'Invoice', refNo: 'INV-2025-0127', debit: 132000, credit: 0, balance: 159110, narration: 'Industrial chemicals' },
        { date: '2025-12-05', type: 'Payment', refNo: 'PAY-2025-0222', debit: 0, credit: 115000, balance: 27110, narration: 'Bank Transfer' },
        { date: '2025-11-28', type: 'Invoice', refNo: 'INV-2025-0098', debit: 142110, credit: 0, balance: 142110, narration: 'Monthly supply' }
      ]
    },
    {
      id: 'LEDG-1007',
      customerId: 'CUST-1007',
      customerName: 'Polymer Solutions Inc',
      openingBalance: 88000,
      totalInvoices: 1450000,
      totalPayments: 1280000,
      closingBalance: 258000,
      creditLimit: 350000,
      creditDays: 30,
      status: 'Overdue',
      lastTransaction: '2025-12-26',
      agingAnalysis: {
        current: 0,
        days30: 136165,
        days60: 121835,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2025-12-26', type: 'Invoice', refNo: 'INV-2025-0152', debit: 121835, credit: 0, balance: 258000, narration: 'Formaldehyde & Methanol' },
        { date: '2025-12-18', type: 'Payment', refNo: 'PAY-2025-0245', debit: 0, credit: 98000, balance: 136165, narration: 'Partial - Bank Transfer' },
        { date: '2025-12-10', type: 'Invoice', refNo: 'INV-2025-0124', debit: 145000, credit: 0, balance: 234165, narration: 'Polymer chemicals' },
        { date: '2025-12-02', type: 'Payment', refNo: 'PAY-2025-0218', debit: 0, credit: 135000, balance: 89165, narration: 'NEFT Payment' },
        { date: '2025-11-25', type: 'Invoice', refNo: 'INV-2025-0095', debit: 224165, credit: 0, balance: 224165, narration: 'Bulk order' }
      ]
    },
    {
      id: 'LEDG-1008',
      customerId: 'CUST-1008',
      customerName: 'Green Chemicals Ltd',
      openingBalance: 42000,
      totalInvoices: 1180000,
      totalPayments: 1195000,
      closingBalance: 27000,
      creditLimit: 250000,
      creditDays: 30,
      status: 'Active',
      lastTransaction: '2026-01-05',
      agingAnalysis: {
        current: 27000,
        days30: 0,
        days60: 0,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2026-01-05', type: 'Payment', refNo: 'PAY-2026-0055', debit: 0, credit: 136408, balance: 27000, narration: 'NEFT - Full Payment' },
        { date: '2025-12-24', type: 'Invoice', refNo: 'INV-2025-0151', debit: 136408, credit: 0, balance: 163408, narration: 'Citric Acid & Tartaric Acid' },
        { date: '2025-12-16', type: 'Payment', refNo: 'PAY-2025-0243', debit: 0, credit: 125000, balance: 27000, narration: 'Bank Transfer' },
        { date: '2025-12-08', type: 'Invoice', refNo: 'INV-2025-0120', debit: 118000, credit: 0, balance: 152000, narration: 'Green chemicals supply' },
        { date: '2025-11-30', type: 'Payment', refNo: 'PAY-2025-0210', debit: 0, credit: 98000, balance: 34000, narration: 'Cheque Payment' }
      ]
    },
    {
      id: 'LEDG-1009',
      customerId: 'CUST-1009',
      customerName: 'Apex Chemical Works',
      openingBalance: 58000,
      totalInvoices: 1380000,
      totalPayments: 1385000,
      closingBalance: 53000,
      creditLimit: 300000,
      creditDays: 45,
      status: 'Active',
      lastTransaction: '2025-12-30',
      agingAnalysis: {
        current: 53000,
        days30: 0,
        days60: 0,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2025-12-30', type: 'Payment', refNo: 'PAY-2026-0046', debit: 0, credit: 175171, balance: 53000, narration: 'Bank Transfer - Prompt payment' },
        { date: '2025-12-22', type: 'Invoice', refNo: 'INV-2025-0150', debit: 175171, credit: 0, balance: 228171, narration: 'Glycerol & Propylene Glycol' },
        { date: '2025-12-14', type: 'Payment', refNo: 'PAY-2025-0240', debit: 0, credit: 148000, balance: 53000, narration: 'RTGS Payment' },
        { date: '2025-12-06', type: 'Invoice', refNo: 'INV-2025-0116', debit: 142000, credit: 0, balance: 201000, narration: 'Chemical supplies' },
        { date: '2025-11-28', type: 'Payment', refNo: 'PAY-2025-0206', debit: 0, credit: 132000, balance: 59000, narration: 'Bank Transfer' }
      ]
    },
    {
      id: 'LEDG-1010',
      customerId: 'CUST-1010',
      customerName: 'Crystal Pharma Ltd',
      openingBalance: 95000,
      totalInvoices: 1550000,
      totalPayments: 1420000,
      closingBalance: 225000,
      creditLimit: 400000,
      creditDays: 30,
      status: 'Active',
      lastTransaction: '2025-12-20',
      agingAnalysis: {
        current: 145848,
        days30: 79152,
        days60: 0,
        days90: 0,
        days90Plus: 0
      },
      transactions: [
        { date: '2025-12-20', type: 'Invoice', refNo: 'INV-2025-0149', debit: 145848, credit: 0, balance: 225000, narration: 'Benzyl Alcohol & Phenol' },
        { date: '2025-12-12', type: 'Payment', refNo: 'PAY-2025-0237', debit: 0, credit: 155000, balance: 79152, narration: 'Bank Transfer' },
        { date: '2025-12-04', type: 'Invoice', refNo: 'INV-2025-0112', debit: 168000, credit: 0, balance: 234152, narration: 'Pharma grade chemicals' },
        { date: '2025-11-26', type: 'Payment', refNo: 'PAY-2025-0202', debit: 0, credit: 162000, balance: 66152, narration: 'NEFT Payment' },
        { date: '2025-11-18', type: 'Invoice', refNo: 'INV-2025-0088', debit: 228152, credit: 0, balance: 228152, narration: 'Special pharmaceutical order' }
      ]
    }
  ];

  // Monthly ledger trend
  const monthlyTrend = [
    { month: 'Jul', receivables: 1850000, payables: 280000, collections: 1620000 },
    { month: 'Aug', receivables: 1950000, payables: 320000, collections: 1780000 },
    { month: 'Sep', receivables: 2050000, payables: 295000, collections: 1850000 },
    { month: 'Oct', receivables: 2180000, payables: 315000, collections: 1920000 },
    { month: 'Nov', receivables: 2280000, payables: 340000, collections: 2050000 },
    { month: 'Dec', receivables: 2350000, payables: 365000, collections: 2180000 },
    { month: 'Jan', receivables: 2456000, payables: 385000, collections: 2280000 }
  ];

  // Aging analysis summary
  const agingSummary = [
    { category: 'Current', amount: 1280000, count: 28 },
    { category: '1-30 Days', amount: 820000, count: 12 },
    { category: '31-60 Days', amount: 285000, count: 4 },
    { category: '61-90 Days', amount: 71000, count: 1 },
    { category: '90+ Days', amount: 0, count: 0 }
  ];

  // Top debtors
  const topDebtors = [
    { customer: 'ChemTrade Solutions', amount: 300000, overdue: 0 },
    { customer: 'Industrial Polymers Ltd', amount: 255000, overdue: 29680 },
    { customer: 'Polymer Solutions Inc', amount: 258000, overdue: 121835 },
    { customer: 'BioTech Research Ltd', amount: 250000, overdue: 0 },
    { customer: 'Crystal Pharma Ltd', amount: 225000, overdue: 0 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Filter ledgers
  const filteredLedgers = ledgers.filter(ledger => {
    const matchesSearch = ledger.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ledger.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCustomer = selectedCustomer === 'All' || ledger.customerName === selectedCustomer;
    
    return matchesSearch && matchesCustomer;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const getCreditUtilization = (balance, limit) => {
    return ((balance / limit) * 100).toFixed(1);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">Customer Ledger Management</h1>
        <p className="text-gray-600">Track customer accounts, receivables, and payment history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Customers</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.totalCustomers}</p>
            </div>
            <User className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Receivables</p>
              <p className="text-2xl font-bold text-black mt-1">{formatCurrency(summary.totalReceivables)}</p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Payables</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{formatCurrency(summary.totalPayables)}</p>
            </div>
            <TrendingDown className="text-orange-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Overdue Amount</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(summary.overdueAmount)}</p>
            </div>
            <AlertCircle className="text-red-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Credit Balance</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{formatCurrency(summary.creditBalance)}</p>
            </div>
            <CheckCircle className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Ledger Trend */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Monthly Ledger Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(0)}L`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="receivables" stroke="#10b981" strokeWidth={2} name="Receivables" />
              <Line type="monotone" dataKey="collections" stroke="#3b82f6" strokeWidth={2} name="Collections" />
              <Line type="monotone" dataKey="payables" stroke="#ef4444" strokeWidth={2} name="Payables" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Aging Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Aging Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agingSummary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="amount" name="Amount">
                {agingSummary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Debtors */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-black mb-4">Top Debtors</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topDebtors} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
            <YAxis dataKey="customer" type="category" width={180} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="amount" fill="#8b5cf6" name="Outstanding" />
            <Bar dataKey="overdue" fill="#ef4444" name="Overdue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Search Customer</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by customer name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Filter by Customer</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Customers</option>
              {ledgers.map(ledger => (
                <option key={ledger.id} value={ledger.customerName}>{ledger.customerName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ledger Accounts List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">Customer Accounts ({filteredLedgers.length} customers)</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Opening</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Invoices</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payments</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Closing</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Credit Limit</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLedgers.map((ledger) => (
                <tr key={ledger.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-black">{ledger.customerName}</p>
                      <p className="text-xs text-gray-500">{ledger.customerId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatCurrency(ledger.openingBalance)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatCurrency(ledger.totalInvoices)}</td>
                  <td className="px-6 py-4 text-sm text-green-600">{formatCurrency(ledger.totalPayments)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-black">{formatCurrency(ledger.closingBalance)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatCurrency(ledger.creditLimit)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              parseFloat(getCreditUtilization(ledger.closingBalance, ledger.creditLimit)) > 80
                                ? 'bg-red-500'
                                : parseFloat(getCreditUtilization(ledger.closingBalance, ledger.creditLimit)) > 60
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${getCreditUtilization(ledger.closingBalance, ledger.creditLimit)}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-2 text-xs text-gray-600">{getCreditUtilization(ledger.closingBalance, ledger.creditLimit)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ledger.status)}`}>
                      {ledger.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedLedger(ledger)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Ledger"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="Download Statement">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ledger Details Modal */}
      {selectedLedger && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-black">{selectedLedger.customerName}</h2>
                  <p className="text-sm text-gray-600">Account ID: {selectedLedger.customerId}</p>
                </div>
                <button
                  onClick={() => setSelectedLedger(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <AlertCircle size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Account Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 mb-1">Credit Limit</p>
                  <p className="text-xl font-bold text-blue-900">{formatCurrency(selectedLedger.creditLimit)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 mb-1">Credit Days</p>
                  <p className="text-xl font-bold text-green-900">{selectedLedger.creditDays} days</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 mb-1">Last Transaction</p>
                  <p className="text-xl font-bold text-purple-900">{selectedLedger.lastTransaction}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-600 mb-1">Status</p>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedLedger.status)}`}>
                    {selectedLedger.status}
                  </span>
                </div>
              </div>

              {/* Balance Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Opening Balance</p>
                    <p className="text-lg font-semibold text-black">{formatCurrency(selectedLedger.openingBalance)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Invoices</p>
                    <p className="text-lg font-semibold text-black">{formatCurrency(selectedLedger.totalInvoices)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Payments</p>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(selectedLedger.totalPayments)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Closing Balance</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(selectedLedger.closingBalance)}</p>
                  </div>
                </div>
              </div>

              {/* Aging Analysis */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-black mb-3">Aging Analysis</h3>
                <div className="grid grid-cols-5 gap-2">
                  <div className="bg-green-50 p-3 rounded text-center">
                    <p className="text-xs text-green-600 mb-1">Current</p>
                    <p className="text-sm font-bold text-green-900">{formatCurrency(selectedLedger.agingAnalysis.current)}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded text-center">
                    <p className="text-xs text-blue-600 mb-1">1-30 Days</p>
                    <p className="text-sm font-bold text-blue-900">{formatCurrency(selectedLedger.agingAnalysis.days30)}</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded text-center">
                    <p className="text-xs text-yellow-600 mb-1">31-60 Days</p>
                    <p className="text-sm font-bold text-yellow-900">{formatCurrency(selectedLedger.agingAnalysis.days60)}</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded text-center">
                    <p className="text-xs text-orange-600 mb-1">61-90 Days</p>
                    <p className="text-sm font-bold text-orange-900">{formatCurrency(selectedLedger.agingAnalysis.days90)}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded text-center">
                    <p className="text-xs text-red-600 mb-1">90+ Days</p>
                    <p className="text-sm font-bold text-red-900">{formatCurrency(selectedLedger.agingAnalysis.days90Plus)}</p>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-3">Transaction History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 border-b">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 border-b">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 border-b">Reference</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 border-b">Narration</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Debit</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Credit</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLedger.transactions.map((txn, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm text-gray-700">{txn.date}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 text-xs font-semibold rounded ${
                              txn.type === 'Invoice' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {txn.type}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm font-medium text-black">{txn.refNo}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{txn.narration}</td>
                          <td className="px-4 py-2 text-sm text-red-600 text-right">
                            {txn.debit > 0 ? formatCurrency(txn.debit) : '-'}
                          </td>
                          <td className="px-4 py-2 text-sm text-green-600 text-right">
                            {txn.credit > 0 ? formatCurrency(txn.credit) : '-'}
                          </td>
                          <td className="px-4 py-2 text-sm font-semibold text-black text-right">
                            {formatCurrency(txn.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                  <Download size={18} className="mr-2" />
                  Download Statement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {filteredLedgers.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
          <FileText className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No ledger accounts found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Ledger;
