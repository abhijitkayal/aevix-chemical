import React, { useState } from 'react';
import { FileText, DollarSign, TrendingUp, Download, Calendar, Filter, BarChart3, PieChart as PieChartIcon, Eye, RefreshCw } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Report = () => {
  const [selectedReportType, setSelectedReportType] = useState('Sales Summary');
  const [dateRange, setDateRange] = useState('This Month');
  const [selectedReport, setSelectedReport] = useState(null);

  // Summary metrics
  const summary = {
    totalRevenue: 84560000,
    totalInvoices: 245,
    totalCollection: 68420000,
    outstandingAmount: 16140000,
    taxCollected: 12685200,
    profitMargin: 22.5
  };

  // Monthly sales report
  const monthlySales = [
    { month: 'Jan 2025', revenue: 6850000, invoices: 32, collection: 5280000, outstanding: 1570000, cost: 5312500, profit: 1537500 },
    { month: 'Feb 2025', revenue: 7120000, invoices: 35, collection: 5896000, outstanding: 1224000, cost: 5523400, profit: 1596600 },
    { month: 'Mar 2025', revenue: 6980000, invoices: 34, collection: 5585000, outstanding: 1395000, cost: 5415100, profit: 1564900 },
    { month: 'Apr 2025', revenue: 7450000, invoices: 38, collection: 6215000, outstanding: 1235000, cost: 5781500, profit: 1668500 },
    { month: 'May 2025', revenue: 7280000, invoices: 36, collection: 5824000, outstanding: 1456000, cost: 5647200, profit: 1632800 },
    { month: 'Jun 2025', revenue: 7650000, invoices: 39, collection: 6426000, outstanding: 1224000, cost: 5933500, profit: 1716500 },
    { month: 'Jul 2025', revenue: 7890000, invoices: 42, collection: 6549000, outstanding: 1341000, cost: 6119700, profit: 1770300 },
    { month: 'Aug 2025', revenue: 8120000, invoices: 44, collection: 6740000, outstanding: 1380000, cost: 6293000, profit: 1827000 },
    { month: 'Sep 2025', revenue: 7920000, invoices: 41, collection: 6534000, outstanding: 1386000, cost: 6143400, profit: 1776600 },
    { month: 'Oct 2025', revenue: 8350000, invoices: 45, collection: 7014000, outstanding: 1336000, cost: 6471500, profit: 1878500 },
    { month: 'Nov 2025', revenue: 8450000, invoices: 46, collection: 7098000, outstanding: 1352000, cost: 6549000, profit: 1901000 },
    { month: 'Dec 2025', revenue: 8560000, invoices: 48, collection: 7259000, outstanding: 1301000, cost: 6634000, profit: 1926000 }
  ];

  // Customer-wise revenue
  const customerRevenue = [
    { customer: 'ChemTrade Solutions', revenue: 8560000, invoices: 24, outstanding: 1240000, percentage: 10.1 },
    { customer: 'Industrial Polymers Ltd', revenue: 7850000, invoices: 22, outstanding: 980000, percentage: 9.3 },
    { customer: 'PharmaChem Industries', revenue: 6420000, invoices: 18, outstanding: 650000, percentage: 7.6 },
    { customer: 'TechChem Solutions', revenue: 5680000, invoices: 16, outstanding: 420000, percentage: 6.7 },
    { customer: 'BioTech Research Ltd', revenue: 4890000, invoices: 14, outstanding: 580000, percentage: 5.8 },
    { customer: 'Metro Paints & Coatings', revenue: 4560000, invoices: 13, outstanding: 320000, percentage: 5.4 },
    { customer: 'Green Chemicals Ltd', revenue: 4120000, invoices: 12, outstanding: 480000, percentage: 4.9 },
    { customer: 'Polymer Solutions Inc', revenue: 3850000, invoices: 11, outstanding: 290000, percentage: 4.6 },
    { customer: 'Apex Chemical Works', revenue: 3650000, invoices: 10, outstanding: 380000, percentage: 4.3 },
    { customer: 'Crystal Pharma Ltd', revenue: 3420000, invoices: 9, outstanding: 250000, percentage: 4.0 },
    { customer: 'Others', revenue: 31560000, invoices: 96, outstanding: 10550000, percentage: 37.3 }
  ];

  // Product-wise revenue
  const productRevenue = [
    { product: 'Ethanol 95%', revenue: 12850000, quantity: '68,500 L', margin: 24.5 },
    { product: 'Hydrochloric Acid 35%', revenue: 10240000, quantity: '22,800 L', margin: 28.2 },
    { product: 'Sulfuric Acid 98%', revenue: 8650000, quantity: '43,250 L', margin: 22.8 },
    { product: 'Acetic Acid 99%', revenue: 7420000, quantity: '49,500 L', margin: 26.3 },
    { product: 'Titanium Dioxide Pigment', revenue: 6890000, quantity: '10,200 kg', margin: 31.5 },
    { product: 'Ammonia Solution 25%', revenue: 5680000, quantity: '34,400 L', margin: 19.7 },
    { product: 'Isopropyl Alcohol 99%', revenue: 5120000, quantity: '23,250 L', margin: 23.4 },
    { product: 'Caustic Soda Pellets', revenue: 4850000, quantity: '11,550 kg', margin: 21.6 },
    { product: 'Methanol 99%', revenue: 4560000, quantity: '26,050 L', margin: 20.8 },
    { product: 'Others', revenue: 18300000, quantity: 'Various', margin: 22.1 }
  ];

  // Tax summary
  const taxSummary = [
    { taxRate: '18%', taxableAmount: 58650000, taxAmount: 10557000, invoices: 156 },
    { taxRate: '12%', taxableAmount: 15420000, taxAmount: 1850400, invoices: 48 },
    { taxRate: '5%', taxableAmount: 8950000, taxAmount: 447500, invoices: 32 },
    { taxRate: '0%', taxableAmount: 1540000, taxAmount: 0, invoices: 9 }
  ];

  // Payment method distribution
  const paymentMethods = [
    { method: 'Bank Transfer', amount: 42680000, transactions: 145, percentage: 62.4 },
    { method: 'Cheque', amount: 15240000, transactions: 58, percentage: 22.3 },
    { method: 'UPI/Digital', amount: 6850000, transactions: 42, percentage: 10.0 },
    { method: 'Cash', amount: 3650000, transactions: 28, percentage: 5.3 }
  ];

  // Aging analysis
  const agingAnalysis = [
    { category: 'Current (0-30 days)', amount: 8650000, percentage: 53.6, invoices: 85 },
    { category: '31-60 days', amount: 4280000, percentage: 26.5, invoices: 42 },
    { category: '61-90 days', amount: 2150000, percentage: 13.3, invoices: 18 },
    { category: '90+ days', amount: 1060000, percentage: 6.6, invoices: 12 }
  ];

  // Quarterly comparison
  const quarterlyComparison = [
    { quarter: 'Q1 2025', revenue: 20950000, invoices: 101, collection: 16761000, profit: 4699000 },
    { quarter: 'Q2 2025', revenue: 22380000, invoices: 113, collection: 18465000, profit: 5017800 },
    { quarter: 'Q3 2025', revenue: 23930000, invoices: 127, collection: 19823000, profit: 5373900 },
    { quarter: 'Q4 2025', revenue: 24360000, invoices: 139, collection: 20371000, profit: 5705500 }
  ];

  // Profit margin by category
  const profitByCategory = [
    { category: 'Solvents', revenue: 28560000, cost: 21850000, profit: 6710000, margin: 23.5 },
    { category: 'Acids & Bases', revenue: 24850000, cost: 18950000, profit: 5900000, margin: 23.7 },
    { category: 'Pigments & Dyes', revenue: 15420000, cost: 11250000, profit: 4170000, margin: 27.0 },
    { category: 'Specialty Chemicals', revenue: 12680000, cost: 9560000, profit: 3120000, margin: 24.6 },
    { category: 'Others', revenue: 3050000, cost: 2430000, profit: 620000, margin: 20.3 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    } else {
      return `₹${value.toLocaleString('en-IN')}`;
    }
  };

  const reportTypes = [
    'Sales Summary',
    'Customer Analysis',
    'Product Analysis',
    'Tax Report',
    'Payment Analysis',
    'Aging Analysis',
    'Profit Margin',
    'Quarterly Comparison'
  ];

  return (
    <div className="p-6 min-h-screen mt-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">Billing & Accounting Reports</h1>
        <p className="text-gray-600">Comprehensive financial reports and analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(summary.totalRevenue)}</p>
            </div>
            <DollarSign size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Invoices</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.totalInvoices}</p>
            </div>
            <FileText className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Collection</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(summary.totalCollection)}</p>
            </div>
            <TrendingUp size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Outstanding</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(summary.outstandingAmount)}</p>
            </div>
            <BarChart3 size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tax Collected</p>
              <p className="text-2xl font-bold text-black mt-1">{formatCurrency(summary.taxCollected)}</p>
            </div>
            <PieChartIcon className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Profit Margin</p>
              <p className="text-2xl font-bold mt-1">{summary.profitMargin}%</p>
            </div>
            <TrendingUp size={32} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Report Type</label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
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
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Quarter">This Quarter</option>
              <option value="This Year">This Year</option>
              <option value="Custom Range">Custom Range</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
              <RefreshCw size={18} className="mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Sales Summary Report */}
      {selectedReportType === 'Sales Summary' && (
        <>
          {/* Monthly Sales Trend */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-black">Monthly Sales Trend</h2>
              <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center text-sm">
                <Download size={16} className="mr-1" />
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlySales}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCollection" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                <Area type="monotone" dataKey="collection" stroke="#10b981" fillOpacity={1} fill="url(#colorCollection)" name="Collection" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue vs Profit */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-black mb-4">Revenue vs Profit Analysis</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="cost" fill="#ef4444" name="Cost" />
                <Bar dataKey="profit" fill="#10b981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Customer Analysis Report */}
      {selectedReportType === 'Customer Analysis' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Customer Revenue Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Top 10 Customers by Revenue</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={customerRevenue.slice(0, 10)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="customer" type="category" width={150} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="#3b82f6">
                    {customerRevenue.slice(0, 10).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Customer Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Revenue Distribution by Customer</h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={customerRevenue}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ customer, percentage }) => `${customer.split(' ')[0]}: ${percentage}%`}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {customerRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Details Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Customer Revenue Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Invoices</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Outstanding</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">% Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customerRevenue.map((customer, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-black">{customer.customer}</td>
                      <td className="px-6 py-4 text-sm text-black text-right font-semibold">{formatCurrency(customer.revenue)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{customer.invoices}</td>
                      <td className="px-6 py-4 text-sm text-orange-600 text-right font-medium">{formatCurrency(customer.outstanding)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{customer.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Product Analysis Report */}
      {selectedReportType === 'Product Analysis' && (
        <>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-black mb-4">Product Revenue Analysis</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={productRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" angle={-45} textAnchor="end" height={120} />
                <YAxis />
                <Tooltip formatter={(value, name) => name === 'revenue' ? formatCurrency(value) : `${value}%`} />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="margin" fill="#10b981" name="Margin %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product Details Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Product Performance Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Quantity Sold</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Profit Margin</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productRevenue.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-black">{product.product}</td>
                      <td className="px-6 py-4 text-sm text-black text-right font-semibold">{formatCurrency(product.revenue)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{product.quantity}</td>
                      <td className="px-6 py-4 text-sm text-green-600 text-right font-medium">{product.margin}%</td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${Math.min(product.margin * 3, 100)}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Tax Report */}
      {selectedReportType === 'Tax Report' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Tax Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Tax Collection Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taxSummary}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ taxRate, taxAmount }) => `${taxRate}: ${formatCurrency(taxAmount)}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="taxAmount"
                  >
                    {taxSummary.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Tax by Rate */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Taxable Amount vs Tax Collected</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taxSummary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="taxRate" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="taxableAmount" fill="#3b82f6" name="Taxable Amount" />
                  <Bar dataKey="taxAmount" fill="#10b981" name="Tax Collected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tax Details Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Tax Summary Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tax Rate</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Taxable Amount</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Tax Collected</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">No. of Invoices</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {taxSummary.map((tax, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-semibold text-black">{tax.taxRate}</td>
                      <td className="px-6 py-4 text-sm text-black text-right font-medium">{formatCurrency(tax.taxableAmount)}</td>
                      <td className="px-6 py-4 text-sm text-green-600 text-right font-semibold">{formatCurrency(tax.taxAmount)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{tax.invoices}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="px-6 py-4 text-sm text-black">Total</td>
                    <td className="px-6 py-4 text-sm text-black text-right">
                      {formatCurrency(taxSummary.reduce((sum, t) => sum + t.taxableAmount, 0))}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-600 text-right">
                      {formatCurrency(taxSummary.reduce((sum, t) => sum + t.taxAmount, 0))}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right">
                      {taxSummary.reduce((sum, t) => sum + t.invoices, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Payment Analysis Report */}
      {selectedReportType === 'Payment Analysis' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Payment Method Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Payment Method Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ method, percentage }) => `${method}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Payment Method Comparison */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Payment Amount by Method</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={paymentMethods}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="method" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="amount" fill="#3b82f6">
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Payment Method Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment Method</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Transactions</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paymentMethods.map((method, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-black">{method.method}</td>
                      <td className="px-6 py-4 text-sm text-black text-right font-semibold">{formatCurrency(method.amount)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{method.transactions}</td>
                      <td className="px-6 py-4 text-sm text-blue-600 text-right font-medium">{method.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Aging Analysis Report */}
      {selectedReportType === 'Aging Analysis' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Aging Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Outstanding Aging Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={agingAnalysis}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {agingAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Aging Bars */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Aging Amount Analysis</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={agingAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-15} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="amount" fill="#3b82f6">
                    {agingAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Aging Details */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Aging Analysis Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Invoices</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {agingAnalysis.map((aging, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-black">{aging.category}</td>
                      <td className="px-6 py-4 text-sm text-black text-right font-semibold">{formatCurrency(aging.amount)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{aging.invoices}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{aging.percentage}%</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          index === 0 ? 'bg-green-100 text-green-800' :
                          index === 1 ? 'bg-yellow-100 text-yellow-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {index === 0 ? 'Low' : index === 1 ? 'Medium' : index === 2 ? 'High' : 'Critical'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Profit Margin Report */}
      {selectedReportType === 'Profit Margin' && (
        <>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-black mb-4">Profit Margin by Category</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={profitByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="cost" fill="#ef4444" name="Cost" />
                <Bar dataKey="profit" fill="#10b981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Profit Details Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Profit Margin Details by Category</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Cost</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Profit</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Margin %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {profitByCategory.map((category, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-black">{category.category}</td>
                      <td className="px-6 py-4 text-sm text-black text-right font-semibold">{formatCurrency(category.revenue)}</td>
                      <td className="px-6 py-4 text-sm text-red-600 text-right font-medium">{formatCurrency(category.cost)}</td>
                      <td className="px-6 py-4 text-sm text-green-600 text-right font-semibold">{formatCurrency(category.profit)}</td>
                      <td className="px-6 py-4 text-sm text-purple-600 text-right font-bold">{category.margin}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Quarterly Comparison Report */}
      {selectedReportType === 'Quarterly Comparison' && (
        <>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-black mb-4">Quarterly Performance Comparison</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={quarterlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="Revenue" />
                <Line type="monotone" dataKey="collection" stroke="#10b981" strokeWidth={3} name="Collection" />
                <Line type="monotone" dataKey="profit" stroke="#8b5cf6" strokeWidth={3} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quarterly Details Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Quarterly Performance Details</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quarter</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Invoices</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Collection</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Profit</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {quarterlyComparison.map((quarter, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-semibold text-black">{quarter.quarter}</td>
                      <td className="px-6 py-4 text-sm text-black text-right font-semibold">{formatCurrency(quarter.revenue)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 text-right">{quarter.invoices}</td>
                      <td className="px-6 py-4 text-sm text-green-600 text-right font-medium">{formatCurrency(quarter.collection)}</td>
                      <td className="px-6 py-4 text-sm text-purple-600 text-right font-semibold">{formatCurrency(quarter.profit)}</td>
                      <td className="px-6 py-4 text-sm text-right">
                        {index > 0 && (
                          <span className={`font-medium ${
                            quarter.revenue > quarterlyComparison[index-1].revenue ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {((quarter.revenue - quarterlyComparison[index-1].revenue) / quarterlyComparison[index-1].revenue * 100).toFixed(1)}%
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Export All Reports Button */}
      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center font-semibold">
          <Download size={20} className="mr-2" />
          Export All Reports to PDF
        </button>
      </div>
    </div>
  );
};

export default Report;
