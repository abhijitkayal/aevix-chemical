import React, { useState } from 'react';
import { BookOpen, TrendingUp, TrendingDown, DollarSign, Search, Filter, Calendar, Download, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Summary data
  const summary = {
    totalEntries: 45,
    totalDebit: 8750000,
    totalCredit: 8750000,
    thisMonth: 15
  };

  // Entry type distribution
  const entryTypeData = [
    { name: 'Sales', value: 2850000, count: 12 },
    { name: 'Purchase', value: 2450000, count: 10 },
    { name: 'Payment', value: 1850000, count: 8 },
    { name: 'Receipt', value: 1100000, count: 7 },
    { name: 'Adjustment', value: 500000, count: 8 }
  ];

  // Monthly trend
  const monthlyTrend = [
    { month: 'Aug', debit: 1250000, credit: 1250000 },
    { month: 'Sep', debit: 1380000, credit: 1380000 },
    { month: 'Oct', debit: 1520000, credit: 1520000 },
    { month: 'Nov', debit: 1450000, credit: 1450000 },
    { month: 'Dec', debit: 1680000, credit: 1680000 },
    { month: 'Jan', debit: 1470000, credit: 1470000 }
  ];

  // Hardcoded journal entries
  const journalEntries = [
    {
      id: 1,
      entryNo: 'JE-2026-001',
      date: '2026-01-05',
      type: 'Sales',
      description: 'Sales Invoice - ChemTrade Solutions',
      referenceNo: 'INV-2026-0158',
      transactions: [
        { account: 'Accounts Receivable - ChemTrade Solutions', debit: 336300, credit: 0 },
        { account: 'Sales Revenue - Specialty Chemicals', debit: 0, credit: 285000 },
        { account: 'CGST Output @ 9%', debit: 0, credit: 25650 },
        { account: 'SGST Output @ 9%', debit: 0, credit: 25650 }
      ],
      totalDebit: 336300,
      totalCredit: 336300,
      postedBy: 'Rajesh Kumar',
      status: 'Posted',
      remarks: 'Sale of Hydrogen Peroxide 50% - 1000L'
    },
    {
      id: 2,
      entryNo: 'JE-2026-002',
      date: '2026-01-05',
      type: 'Payment',
      description: 'Payment to Gujarat Chemical Hub',
      referenceNo: 'PMT-2026-0042',
      transactions: [
        { account: 'Accounts Payable - Gujarat Chemical Hub', debit: 245000, credit: 0 },
        { account: 'Bank - HDFC Current A/c', debit: 0, credit: 245000 }
      ],
      totalDebit: 245000,
      totalCredit: 245000,
      postedBy: 'Amit Sharma',
      status: 'Posted',
      remarks: 'Payment for raw material purchase - Invoice INV-GCH-2025-458'
    },
    {
      id: 3,
      entryNo: 'JE-2026-003',
      date: '2026-01-04',
      type: 'Receipt',
      description: 'Payment Received from Industrial Polymers Ltd',
      referenceNo: 'RCP-2026-0035',
      transactions: [
        { account: 'Bank - ICICI Current A/c', debit: 205320, credit: 0 },
        { account: 'Accounts Receivable - Industrial Polymers Ltd', debit: 0, credit: 205320 }
      ],
      totalDebit: 205320,
      totalCredit: 205320,
      postedBy: 'Priya Desai',
      status: 'Posted',
      remarks: 'Payment against Invoice INV-2026-0157 via NEFT'
    },
    {
      id: 4,
      entryNo: 'JE-2026-004',
      date: '2026-01-04',
      type: 'Purchase',
      description: 'Purchase of Raw Materials from Rajasthan Minerals',
      referenceNo: 'PINV-2026-0128',
      transactions: [
        { account: 'Raw Material Inventory - Sodium Hydroxide', debit: 295000, credit: 0 },
        { account: 'CGST Input @ 9%', debit: 26550, credit: 0 },
        { account: 'SGST Input @ 9%', debit: 26550, credit: 0 },
        { account: 'Accounts Payable - Rajasthan Minerals', debit: 0, credit: 348100 }
      ],
      totalDebit: 348100,
      totalCredit: 348100,
      postedBy: 'Vijay Patel',
      status: 'Posted',
      remarks: 'Purchase of 5000 kg Sodium Hydroxide Flakes'
    },
    {
      id: 5,
      entryNo: 'JE-2026-005',
      date: '2026-01-03',
      type: 'Sales',
      description: 'Sales Invoice - PharmaChem Industries',
      referenceNo: 'INV-2026-0156',
      transactions: [
        { account: 'Accounts Receivable - PharmaChem Industries', debit: 205320, credit: 0 },
        { account: 'Sales Revenue - Pharmaceutical Grade', debit: 0, credit: 174000 },
        { account: 'CGST Output @ 9%', debit: 0, credit: 15660 },
        { account: 'SGST Output @ 9%', debit: 0, credit: 15660 }
      ],
      totalDebit: 205320,
      totalCredit: 205320,
      postedBy: 'Sneha Kulkarni',
      status: 'Posted',
      remarks: 'Sale of Isopropyl Alcohol 99.9% - 800L'
    },
    {
      id: 6,
      entryNo: 'JE-2026-006',
      date: '2026-01-03',
      type: 'Adjustment',
      description: 'Stock Adjustment - Damaged Goods',
      referenceNo: 'ADJ-2026-0012',
      transactions: [
        { account: 'Loss on Damaged Goods', debit: 45000, credit: 0 },
        { account: 'Raw Material Inventory - Acetone', debit: 0, credit: 45000 }
      ],
      totalDebit: 45000,
      totalCredit: 45000,
      postedBy: 'Arun Singh',
      status: 'Posted',
      remarks: 'Write-off damaged acetone inventory due to container leak'
    },
    {
      id: 7,
      entryNo: 'JE-2026-007',
      date: '2026-01-02',
      type: 'Payment',
      description: 'Salary Payment - December 2025',
      referenceNo: 'SAL-2025-12',
      transactions: [
        { account: 'Salary Expense', debit: 485000, credit: 0 },
        { account: 'TDS Payable', debit: 0, credit: 35000 },
        { account: 'PF Payable', debit: 0, credit: 28000 },
        { account: 'Bank - HDFC Salary A/c', debit: 0, credit: 422000 }
      ],
      totalDebit: 485000,
      totalCredit: 485000,
      postedBy: 'Neha Reddy',
      status: 'Posted',
      remarks: 'December 2025 salary disbursement for all employees'
    },
    {
      id: 8,
      entryNo: 'JE-2026-008',
      date: '2026-01-02',
      type: 'Receipt',
      description: 'Payment Received from TechChem Solutions',
      referenceNo: 'RCP-2026-0034',
      transactions: [
        { account: 'Bank - SBI Current A/c', debit: 177000, credit: 0 },
        { account: 'Accounts Receivable - TechChem Solutions', debit: 0, credit: 177000 }
      ],
      totalDebit: 177000,
      totalCredit: 177000,
      postedBy: 'Karan Mehta',
      status: 'Posted',
      remarks: 'Payment against Invoice INV-2026-0155 via RTGS'
    },
    {
      id: 9,
      entryNo: 'JE-2025-999',
      date: '2025-12-31',
      type: 'Adjustment',
      description: 'Year-End Depreciation',
      referenceNo: 'DEP-2025-12',
      transactions: [
        { account: 'Depreciation Expense - Plant & Machinery', debit: 125000, credit: 0 },
        { account: 'Depreciation Expense - Vehicles', debit: 35000, credit: 0 },
        { account: 'Accumulated Depreciation - Plant & Machinery', debit: 0, credit: 125000 },
        { account: 'Accumulated Depreciation - Vehicles', debit: 0, credit: 35000 }
      ],
      totalDebit: 160000,
      totalCredit: 160000,
      postedBy: 'Rajesh Kumar',
      status: 'Posted',
      remarks: 'December 2025 depreciation entries'
    },
    {
      id: 10,
      entryNo: 'JE-2025-998',
      date: '2025-12-30',
      type: 'Sales',
      description: 'Sales Invoice - Green Chemicals Ltd',
      referenceNo: 'INV-2025-0151',
      transactions: [
        { account: 'Accounts Receivable - Green Chemicals Ltd', debit: 136408, credit: 0 },
        { account: 'Sales Revenue - Industrial Grade', debit: 0, credit: 115600 },
        { account: 'CGST Output @ 9%', debit: 0, credit: 10404 },
        { account: 'SGST Output @ 9%', debit: 0, credit: 10404 }
      ],
      totalDebit: 136408,
      totalCredit: 136408,
      postedBy: 'Amit Sharma',
      status: 'Posted',
      remarks: 'Sale of Methanol 99% - 600L'
    },
    {
      id: 11,
      entryNo: 'JE-2025-997',
      date: '2025-12-28',
      type: 'Payment',
      description: 'Utility Bills Payment - December 2025',
      referenceNo: 'UTL-2025-12',
      transactions: [
        { account: 'Electricity Expense', debit: 85000, credit: 0 },
        { account: 'Water Expense', debit: 12000, credit: 0 },
        { account: 'Bank - HDFC Current A/c', debit: 0, credit: 97000 }
      ],
      totalDebit: 97000,
      totalCredit: 97000,
      postedBy: 'Priya Desai',
      status: 'Posted',
      remarks: 'December utility bills settlement'
    },
    {
      id: 12,
      entryNo: 'JE-2025-996',
      date: '2025-12-27',
      type: 'Purchase',
      description: 'Purchase of Packaging Materials',
      referenceNo: 'PINV-2026-0125',
      transactions: [
        { account: 'Packaging Material Inventory', debit: 125000, credit: 0 },
        { account: 'CGST Input @ 9%', debit: 11250, credit: 0 },
        { account: 'SGST Input @ 9%', debit: 11250, credit: 0 },
        { account: 'Accounts Payable - PackRight Suppliers', debit: 0, credit: 147500 }
      ],
      totalDebit: 147500,
      totalCredit: 147500,
      postedBy: 'Vijay Patel',
      status: 'Posted',
      remarks: 'Purchase of HDPE drums and labels'
    }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  // Filter entries
  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.entryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.referenceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || entry.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (entry) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };

  return (
    <div className="p-6 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <BookOpen className="text-blue-600" size={36} />
            Journal Entries
          </h1>
          <p className="text-gray-600 mt-1">Record and manage all financial transactions in the general journal</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-800">{summary.totalEntries}</p>
              </div>
              <BookOpen className="text-blue-600" size={40} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Debit</p>
                <p className="text-2xl font-bold text-green-600">₹{(summary.totalDebit / 100000).toFixed(2)}L</p>
              </div>
              <TrendingUp className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Credit</p>
                <p className="text-2xl font-bold text-red-600">₹{(summary.totalCredit / 100000).toFixed(2)}L</p>
              </div>
              <TrendingDown className="text-red-600" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-blue-600">{summary.thisMonth}</p>
              </div>
              <Calendar className="text-blue-600" size={40} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Entry Type Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Entry Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={entryTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {entryTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Debit/Credit Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Monthly Debit/Credit Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)}L`} />
                <Legend />
                <Line type="monotone" dataKey="debit" stroke="#10b981" strokeWidth={2} name="Debit" />
                <Line type="monotone" dataKey="credit" stroke="#ef4444" strokeWidth={2} name="Credit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by entry no, description, or reference..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('All')}
                className={`px-4 py-2 rounded-lg font-medium ${filterType === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('Sales')}
                className={`px-4 py-2 rounded-lg font-medium ${filterType === 'Sales' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Sales
              </button>
              <button
                onClick={() => setFilterType('Purchase')}
                className={`px-4 py-2 rounded-lg font-medium ${filterType === 'Purchase' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Purchase
              </button>
              <button
                onClick={() => setFilterType('Payment')}
                className={`px-4 py-2 rounded-lg font-medium ${filterType === 'Payment' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Payment
              </button>
              <button
                onClick={() => setFilterType('Receipt')}
                className={`px-4 py-2 rounded-lg font-medium ${filterType === 'Receipt' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Receipt
              </button>
            </div>

            {/* <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus size={20} />
              New Entry
            </button> */}
          </div>
        </div>

        {/* Journal Entries Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Entry No</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Reference</th>
                  <th className="p-3 text-right">Debit</th>
                  <th className="p-3 text-right">Credit</th>
                  <th className="p-3 text-left">Posted By</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm font-semibold text-blue-700">{entry.entryNo}</td>
                    <td className="p-3 text-sm">{entry.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        entry.type === 'Sales' ? 'bg-green-100 text-green-800' :
                        entry.type === 'Purchase' ? 'bg-purple-100 text-purple-800' :
                        entry.type === 'Payment' ? 'bg-red-100 text-red-800' :
                        entry.type === 'Receipt' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {entry.type}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{entry.description}</td>
                    <td className="p-3 font-mono text-xs text-gray-600">{entry.referenceNo}</td>
                    <td className="p-3 text-right font-semibold text-green-700">₹{entry.totalDebit.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-semibold text-red-700">₹{entry.totalCredit.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-sm">{entry.postedBy}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleViewDetails(entry)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Entry Details Modal */}
        {showModal && selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b bg-blue-600 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">Journal Entry Details</h2>
                    <p className="text-blue-100">{selectedEntry.entryNo} - {selectedEntry.date}</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-gray-200"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Entry Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm text-gray-600">Entry Number</label>
                    <p className="font-semibold text-lg">{selectedEntry.entryNo}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Date</label>
                    <p className="font-semibold">{selectedEntry.date}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Type</label>
                    <p className="font-semibold">
                      <span className={`px-3 py-1 rounded text-sm ${
                        selectedEntry.type === 'Sales' ? 'bg-green-100 text-green-800' :
                        selectedEntry.type === 'Purchase' ? 'bg-purple-100 text-purple-800' :
                        selectedEntry.type === 'Payment' ? 'bg-red-100 text-red-800' :
                        selectedEntry.type === 'Receipt' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {selectedEntry.type}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Reference Number</label>
                    <p className="font-semibold font-mono">{selectedEntry.referenceNo}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm text-gray-600">Description</label>
                    <p className="font-medium">{selectedEntry.description}</p>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="border-t pt-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Transaction Details</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 text-left border">Account</th>
                          <th className="p-3 text-right border">Debit (Dr)</th>
                          <th className="p-3 text-right border">Credit (Cr)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEntry.transactions.map((txn, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-3 border">
                              {txn.debit > 0 ? (
                                <span className="font-medium">{txn.account}</span>
                              ) : (
                                <span className="font-medium pl-8">{txn.account}</span>
                              )}
                            </td>
                            <td className="p-3 text-right border font-semibold text-green-700">
                              {txn.debit > 0 ? `₹${txn.debit.toLocaleString('en-IN')}` : '-'}
                            </td>
                            <td className="p-3 text-right border font-semibold text-red-700">
                              {txn.credit > 0 ? `₹${txn.credit.toLocaleString('en-IN')}` : '-'}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-blue-50 font-bold">
                          <td className="p-3 border">Total</td>
                          <td className="p-3 text-right border text-green-700">₹{selectedEntry.totalDebit.toLocaleString('en-IN')}</td>
                          <td className="p-3 text-right border text-red-700">₹{selectedEntry.totalCredit.toLocaleString('en-IN')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Balance Check */}
                  <div className={`mt-3 p-3 rounded ${
                    selectedEntry.totalDebit === selectedEntry.totalCredit 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`font-semibold ${
                      selectedEntry.totalDebit === selectedEntry.totalCredit 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                      {selectedEntry.totalDebit === selectedEntry.totalCredit 
                        ? '✓ Entry is balanced (Debit = Credit)' 
                        : '✗ Entry is not balanced'}
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Posted By</label>
                      <p className="font-semibold">{selectedEntry.postedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Status</label>
                      <p className="font-semibold text-green-600">{selectedEntry.status}</p>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                {selectedEntry.remarks && (
                  <div className="border-t pt-4 mt-4">
                    <label className="text-sm text-gray-600">Remarks</label>
                    <p className="font-medium bg-blue-50 p-3 rounded border-l-4 border-blue-400">{selectedEntry.remarks}</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Download size={18} />
                  Download
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                  <Edit size={18} />
                  Edit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
