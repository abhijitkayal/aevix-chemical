import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, BarChart3, Download, Calendar, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProfitLoss = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Jan 2026');
  const [showComparison, setShowComparison] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    revenue: true,
    cogs: true,
    opex: true,
    other: true
  });

  // Hardcoded P&L data for January 2026
  const plData = {
    period: 'January 2026',
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    
    // Revenue Section
    revenue: {
      salesRevenue: 5850000,
      breakdown: [
        { category: 'Specialty Chemicals', amount: 2450000, percentage: 41.88 },
        { category: 'Industrial Grade', amount: 1850000, percentage: 31.62 },
        { category: 'Pharmaceutical Grade', amount: 1100000, percentage: 18.80 },
        { category: 'Laboratory Reagents', amount: 450000, percentage: 7.69 }
      ],
      otherIncome: 125000,
      totalRevenue: 5975000
    },

    // Cost of Goods Sold
    cogs: {
      rawMaterials: 2850000,
      directLabor: 485000,
      manufacturingOverhead: 375000,
      freight: 145000,
      packagingMaterial: 235000,
      totalCOGS: 4090000
    },

    grossProfit: 1885000,
    grossProfitMargin: 31.55,

    // Operating Expenses
    operatingExpenses: {
      salariesWages: 485000,
      rentUtilities: 185000,
      depreciation: 160000,
      marketing: 125000,
      adminExpenses: 95000,
      transportationLogistics: 175000,
      insurance: 45000,
      maintenance: 85000,
      communication: 25000,
      professionalFees: 65000,
      totalOpex: 1445000
    },

    operatingProfit: 440000,
    operatingMargin: 7.36,

    // Other Income/Expenses
    otherIncomeExpense: {
      interestIncome: 35000,
      interestExpense: -85000,
      foreignExchangeGain: 15000,
      otherExpenses: -25000,
      netOther: -60000
    },

    profitBeforeTax: 380000,
    taxExpense: 95000,
    netProfit: 285000,
    netProfitMargin: 4.77
  };

  // Comparative data (December 2025)
  const compareData = {
    period: 'December 2025',
    revenue: { totalRevenue: 5680000 },
    cogs: { totalCOGS: 3950000 },
    grossProfit: 1730000,
    operatingExpenses: { totalOpex: 1380000 },
    operatingProfit: 350000,
    netProfit: 245000
  };

  // Monthly trend data
  const monthlyTrend = [
    { month: 'Aug', revenue: 5250000, cogs: 3680000, profit: 195000 },
    { month: 'Sep', revenue: 5480000, cogs: 3820000, profit: 225000 },
    { month: 'Oct', revenue: 5620000, cogs: 3890000, profit: 238000 },
    { month: 'Nov', revenue: 5580000, cogs: 3920000, profit: 215000 },
    { month: 'Dec', revenue: 5680000, cogs: 3950000, profit: 245000 },
    { month: 'Jan', revenue: 5975000, cogs: 4090000, profit: 285000 }
  ];

  // Expense distribution
  const expenseDistribution = [
    { name: 'COGS', value: 4090000 },
    { name: 'Operating Expenses', value: 1445000 },
    { name: 'Tax', value: 95000 },
    { name: 'Net Profit', value: 285000 }
  ];

  // Revenue by category
  const revenueByCategory = plData.revenue.breakdown;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const calculateVariance = (current, previous) => {
    const variance = current - previous;
    const percentageChange = ((variance / previous) * 100).toFixed(2);
    return { variance, percentageChange };
  };

  return (
    <div className="p-6 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <BarChart3 className="text-green-600" size={36} />
            Profit & Loss Statement
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive income statement showing revenue, expenses, and profitability</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-600">₹{(plData.revenue.totalRevenue / 100000).toFixed(2)}L</p>
                <p className="text-xs text-green-600 mt-1">+5.19% vs Dec</p>
              </div>
              <TrendingUp className="text-blue-600" size={40} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gross Profit</p>
                <p className="text-2xl font-bold text-green-600">₹{(plData.grossProfit / 100000).toFixed(2)}L</p>
                <p className="text-xs text-gray-600 mt-1">{plData.grossProfitMargin.toFixed(2)}% margin</p>
              </div>
              <DollarSign className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Operating Profit</p>
                <p className="text-2xl font-bold text-yellow-600">₹{(plData.operatingProfit / 100000).toFixed(2)}L</p>
                <p className="text-xs text-gray-600 mt-1">{plData.operatingMargin.toFixed(2)}% margin</p>
              </div>
              <PieChartIcon className="text-yellow-600" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-green-700">₹{(plData.netProfit / 100000).toFixed(2)}L</p>
                <p className="text-xs text-green-600 mt-1">+16.33% vs Dec</p>
              </div>
              <TrendingUp className="text-green-700" size={40} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Profit Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">6-Month Profit Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)}L`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Net Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Category */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {revenueByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPeriod('Jan 2026')}
                className={`px-4 py-2 rounded-lg font-medium ${selectedPeriod === 'Jan 2026' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Jan 2026
              </button>
              <button
                onClick={() => setSelectedPeriod('Dec 2025')}
                className={`px-4 py-2 rounded-lg font-medium ${selectedPeriod === 'Dec 2025' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Dec 2025
              </button>
              <button
                onClick={() => setSelectedPeriod('Q4 2025')}
                className={`px-4 py-2 rounded-lg font-medium ${selectedPeriod === 'Q4 2025' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Q4 2025
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Filter size={18} />
                {showComparison ? 'Hide Comparison' : 'Show Comparison'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Download size={18} />
                Export P&L
              </button>
            </div>
          </div>
        </div>

        {/* P&L Statement */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Aevix Chemical Pvt. Ltd.</h2>
              <p className="text-gray-600">Profit & Loss Statement</p>
              <p className="text-sm text-gray-500">For the period: {plData.startDate} to {plData.endDate}</p>
            </div>

            {/* Revenue Section */}
            <div className="mb-6">
              <div 
                className="flex items-center justify-between bg-blue-50 p-3 rounded cursor-pointer"
                onClick={() => toggleSection('revenue')}
              >
                <h3 className="text-lg font-bold text-blue-900">REVENUE</h3>
                {expandedSections.revenue ? <ChevronUp /> : <ChevronDown />}
              </div>
              
              {expandedSections.revenue && (
                <div className="pl-6 mt-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Sales Revenue</span>
                    <span className="font-semibold">₹{plData.revenue.salesRevenue.toLocaleString('en-IN')}</span>
                    {showComparison && <span className="text-xs text-gray-500 w-24 text-right">Dec: ₹{(5485000).toLocaleString('en-IN')}</span>}
                  </div>
                  
                  {plData.revenue.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between py-1 pl-6 text-sm">
                      <span className="text-gray-600">{item.category}</span>
                      <span className="text-gray-700">₹{item.amount.toLocaleString('en-IN')} ({item.percentage.toFixed(2)}%)</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Other Income</span>
                    <span className="font-semibold">₹{plData.revenue.otherIncome.toLocaleString('en-IN')}</span>
                    {showComparison && <span className="text-xs text-gray-500 w-24 text-right">Dec: ₹{(195000).toLocaleString('en-IN')}</span>}
                  </div>
                  
                  <div className="flex justify-between py-3 bg-blue-100 px-3 rounded font-bold text-blue-900">
                    <span>Total Revenue</span>
                    <span>₹{plData.revenue.totalRevenue.toLocaleString('en-IN')}</span>
                    {showComparison && <span className="text-sm w-24 text-right">₹{compareData.revenue.totalRevenue.toLocaleString('en-IN')}</span>}
                  </div>
                </div>
              )}
            </div>

            {/* COGS Section */}
            <div className="mb-6">
              <div 
                className="flex items-center justify-between bg-red-50 p-3 rounded cursor-pointer"
                onClick={() => toggleSection('cogs')}
              >
                <h3 className="text-lg font-bold text-red-900">COST OF GOODS SOLD</h3>
                {expandedSections.cogs ? <ChevronUp /> : <ChevronDown />}
              </div>
              
              {expandedSections.cogs && (
                <div className="pl-6 mt-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Raw Materials</span>
                    <span className="font-semibold text-red-700">₹{plData.cogs.rawMaterials.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Direct Labor</span>
                    <span className="font-semibold text-red-700">₹{plData.cogs.directLabor.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Manufacturing Overhead</span>
                    <span className="font-semibold text-red-700">₹{plData.cogs.manufacturingOverhead.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Freight & Transportation</span>
                    <span className="font-semibold text-red-700">₹{plData.cogs.freight.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Packaging Material</span>
                    <span className="font-semibold text-red-700">₹{plData.cogs.packagingMaterial.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-red-100 px-3 rounded font-bold text-red-900">
                    <span>Total COGS</span>
                    <span>₹{plData.cogs.totalCOGS.toLocaleString('en-IN')}</span>
                    {showComparison && <span className="text-sm w-24 text-right">₹{compareData.cogs.totalCOGS.toLocaleString('en-IN')}</span>}
                  </div>
                </div>
              )}
            </div>

            {/* Gross Profit */}
            <div className="flex justify-between py-4 bg-green-50 px-4 rounded font-bold text-lg text-green-900 mb-6">
              <span>GROSS PROFIT</span>
              <div className="flex gap-8">
                <span>₹{plData.grossProfit.toLocaleString('en-IN')} ({plData.grossProfitMargin.toFixed(2)}%)</span>
                {showComparison && (
                  <span className="text-sm">₹{compareData.grossProfit.toLocaleString('en-IN')} ({((compareData.grossProfit / compareData.revenue.totalRevenue) * 100).toFixed(2)}%)</span>
                )}
              </div>
            </div>

            {/* Operating Expenses */}
            <div className="mb-6">
              <div 
                className="flex items-center justify-between bg-orange-50 p-3 rounded cursor-pointer"
                onClick={() => toggleSection('opex')}
              >
                <h3 className="text-lg font-bold text-orange-900">OPERATING EXPENSES</h3>
                {expandedSections.opex ? <ChevronUp /> : <ChevronDown />}
              </div>
              
              {expandedSections.opex && (
                <div className="pl-6 mt-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Salaries & Wages</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.salariesWages.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Rent & Utilities</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.rentUtilities.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Depreciation & Amortization</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.depreciation.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Marketing & Advertising</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.marketing.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Administrative Expenses</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.adminExpenses.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Transportation & Logistics</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.transportationLogistics.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Insurance</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.insurance.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Maintenance & Repairs</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.maintenance.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Communication</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.communication.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Professional Fees</span>
                    <span className="font-semibold text-orange-700">₹{plData.operatingExpenses.professionalFees.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-orange-100 px-3 rounded font-bold text-orange-900">
                    <span>Total Operating Expenses</span>
                    <span>₹{plData.operatingExpenses.totalOpex.toLocaleString('en-IN')}</span>
                    {showComparison && <span className="text-sm w-24 text-right">₹{compareData.operatingExpenses.totalOpex.toLocaleString('en-IN')}</span>}
                  </div>
                </div>
              )}
            </div>

            {/* Operating Profit */}
            <div className="flex justify-between py-4 bg-yellow-50 px-4 rounded font-bold text-lg text-yellow-900 mb-6">
              <span>OPERATING PROFIT (EBIT)</span>
              <div className="flex gap-8">
                <span>₹{plData.operatingProfit.toLocaleString('en-IN')} ({plData.operatingMargin.toFixed(2)}%)</span>
                {showComparison && (
                  <span className="text-sm">₹{compareData.operatingProfit.toLocaleString('en-IN')} ({((compareData.operatingProfit / compareData.revenue.totalRevenue) * 100).toFixed(2)}%)</span>
                )}
              </div>
            </div>

            {/* Other Income/Expenses */}
            <div className="mb-6">
              <div 
                className="flex items-center justify-between bg-purple-50 p-3 rounded cursor-pointer"
                onClick={() => toggleSection('other')}
              >
                <h3 className="text-lg font-bold text-purple-900">OTHER INCOME / (EXPENSES)</h3>
                {expandedSections.other ? <ChevronUp /> : <ChevronDown />}
              </div>
              
              {expandedSections.other && (
                <div className="pl-6 mt-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Interest Income</span>
                    <span className="font-semibold text-green-700">₹{plData.otherIncomeExpense.interestIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Interest Expense</span>
                    <span className="font-semibold text-red-700">(₹{Math.abs(plData.otherIncomeExpense.interestExpense).toLocaleString('en-IN')})</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Foreign Exchange Gain</span>
                    <span className="font-semibold text-green-700">₹{plData.otherIncomeExpense.foreignExchangeGain.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Other Expenses</span>
                    <span className="font-semibold text-red-700">(₹{Math.abs(plData.otherIncomeExpense.otherExpenses).toLocaleString('en-IN')})</span>
                  </div>
                  
                  <div className="flex justify-between py-3 bg-purple-100 px-3 rounded font-bold text-purple-900">
                    <span>Net Other Income/(Expense)</span>
                    <span className={plData.otherIncomeExpense.netOther >= 0 ? 'text-green-700' : 'text-red-700'}>
                      {plData.otherIncomeExpense.netOther >= 0 ? '₹' : '(₹'}
                      {Math.abs(plData.otherIncomeExpense.netOther).toLocaleString('en-IN')}
                      {plData.otherIncomeExpense.netOther < 0 && ')'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Profit Before Tax */}
            <div className="flex justify-between py-4 bg-indigo-50 px-4 rounded font-bold text-lg text-indigo-900 mb-6">
              <span>PROFIT BEFORE TAX (PBT)</span>
              <div className="flex gap-8">
                <span>₹{plData.profitBeforeTax.toLocaleString('en-IN')}</span>
                {showComparison && <span className="text-sm">₹{(340000).toLocaleString('en-IN')}</span>}
              </div>
            </div>

            {/* Tax Expense */}
            <div className="pl-6 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-700">Income Tax Expense (25%)</span>
                <span className="font-semibold text-red-700">₹{plData.taxExpense.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Net Profit */}
            <div className="flex justify-between py-5 bg-green-600 text-white px-6 rounded-lg font-bold text-xl shadow-lg">
              <span>NET PROFIT AFTER TAX (PAT)</span>
              <div className="flex gap-8">
                <span>₹{plData.netProfit.toLocaleString('en-IN')} ({plData.netProfitMargin.toFixed(2)}%)</span>
                {showComparison && (
                  <span className="text-sm">₹{compareData.netProfit.toLocaleString('en-IN')} ({((compareData.netProfit / compareData.revenue.totalRevenue) * 100).toFixed(2)}%)</span>
                )}
              </div>
            </div>

            {/* Key Ratios */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Key Financial Ratios</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Gross Margin</p>
                  <p className="text-2xl font-bold text-blue-700">{plData.grossProfitMargin.toFixed(2)}%</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Operating Margin</p>
                  <p className="text-2xl font-bold text-yellow-700">{plData.operatingMargin.toFixed(2)}%</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Net Margin</p>
                  <p className="text-2xl font-bold text-green-700">{plData.netProfitMargin.toFixed(2)}%</p>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <p className="text-sm text-gray-600">COGS Ratio</p>
                  <p className="text-2xl font-bold text-purple-700">{((plData.cogs.totalCOGS / plData.revenue.totalRevenue) * 100).toFixed(2)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
