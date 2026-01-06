import React, { useState } from 'react';
import { ArrowUpCircle, DollarSign, CreditCard, Building, Search, Filter, Calendar, Download, Plus, Eye, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Outwardpayment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Summary data
  const summary = {
    totalPaid: 6245000,
    thisMonth: 1850000,
    pendingPayments: 892000,
    overduePayables: 245000
  };

  // Payment category distribution
  const paymentCategoryData = [
    { name: 'Raw Materials', value: 3200000, count: 35 },
    { name: 'Utilities', value: 1100000, count: 18 },
    { name: 'Salaries', value: 950000, count: 45 },
    { name: 'Rent & Lease', value: 600000, count: 8 },
    { name: 'Others', value: 395000, count: 12 }
  ];

  // Monthly trend
  const monthlyTrend = [
    { month: 'Aug', amount: 980000 },
    { month: 'Sep', amount: 1120000 },
    { month: 'Oct', amount: 1350000 },
    { month: 'Nov', amount: 1480000 },
    { month: 'Dec', amount: 1650000 },
    { month: 'Jan', amount: 1850000 }
  ];

  // Hardcoded outward payments data
  const payments = [
    {
      id: 1,
      paymentNo: 'PMT-OUT-2026-0145',
      date: '2026-01-05',
      vendorName: 'Gujarat Chemical Suppliers',
      vendorId: 'VEN-2001',
      invoiceNo: 'GSC-INV-8765',
      category: 'Raw Materials',
      amount: 425000,
      paymentMode: 'RTGS',
      referenceNo: 'RTGS2026010598765',
      bankName: 'State Bank of India',
      fromAccount: 'SBI-1234567890',
      toBankAccount: 'AXIS-VEN-2001-5566',
      status: 'Completed',
      processedDate: '2026-01-05',
      remarks: 'Payment for Sodium Carbonate bulk order',
      approvedBy: 'Ramesh Gupta',
      processedBy: 'Vijay Mehta'
    },
    {
      id: 2,
      paymentNo: 'PMT-OUT-2026-0144',
      date: '2026-01-04',
      vendorName: 'Maharashtra Electricity Board',
      vendorId: 'VEN-3005',
      invoiceNo: 'MSEB-DEC-2025',
      category: 'Utilities',
      amount: 185000,
      paymentMode: 'Online Payment',
      referenceNo: 'MSEB-TXN-456789',
      bankName: 'HDFC Bank',
      fromAccount: 'HDFC-9876543210',
      toBankAccount: 'MSEB-UTILITY-001',
      status: 'Completed',
      processedDate: '2026-01-04',
      remarks: 'December 2025 electricity bill',
      approvedBy: 'Vijay Mehta',
      processedBy: 'Suresh Patil'
    },
    {
      id: 3,
      paymentNo: 'PMT-OUT-2026-0143',
      date: '2026-01-03',
      vendorName: 'TechPack Solutions',
      vendorId: 'VEN-1024',
      invoiceNo: 'TPS-2026-0089',
      category: 'Raw Materials',
      amount: 156000,
      paymentMode: 'Cheque',
      referenceNo: 'CHQ-112233',
      bankName: 'State Bank of India',
      fromAccount: 'SBI-1234567890',
      toBankAccount: 'ICICI-TPS-7788',
      status: 'Pending',
      processedDate: null,
      remarks: 'Payment for HDPE drums - Cheque issued',
      approvedBy: 'Ramesh Gupta',
      processedBy: 'Vijay Mehta'
    },
    {
      id: 4,
      paymentNo: 'PMT-OUT-2026-0142',
      date: '2026-01-02',
      vendorName: 'Mumbai Industrial Park',
      vendorId: 'VEN-5001',
      invoiceNo: 'MIP-RENT-JAN2026',
      category: 'Rent & Lease',
      amount: 200000,
      paymentMode: 'NEFT',
      referenceNo: 'NEFT2026010234567',
      bankName: 'ICICI Bank',
      fromAccount: 'ICICI-5555666677',
      toBankAccount: 'SBI-MIP-RENT-001',
      status: 'Completed',
      processedDate: '2026-01-02',
      remarks: 'January 2026 factory rent',
      approvedBy: 'Vijay Mehta',
      processedBy: 'Suresh Patil'
    },
    {
      id: 5,
      paymentNo: 'PMT-OUT-2026-0141',
      date: '2026-01-02',
      vendorName: 'Employee Salary - January 2026',
      vendorId: 'SAL-JAN-2026',
      invoiceNo: 'SAL-2026-01',
      category: 'Salaries',
      amount: 650000,
      paymentMode: 'Bulk Transfer',
      referenceNo: 'BULK-SAL-010226',
      bankName: 'State Bank of India',
      fromAccount: 'SBI-1234567890',
      toBankAccount: 'Multiple Accounts',
      status: 'Completed',
      processedDate: '2026-01-02',
      remarks: 'January 2026 salary disbursement - 45 employees',
      approvedBy: 'Ramesh Gupta',
      processedBy: 'HR Department'
    },
    {
      id: 6,
      paymentNo: 'PMT-OUT-2025-0140',
      date: '2025-12-30',
      vendorName: 'Rajasthan Minerals Ltd',
      vendorId: 'VEN-2015',
      invoiceNo: 'RML-INV-6543',
      category: 'Raw Materials',
      amount: 385000,
      paymentMode: 'RTGS',
      referenceNo: 'RTGS2025123087654',
      bankName: 'Punjab National Bank',
      fromAccount: 'PNB-1111222233',
      toBankAccount: 'BOB-RML-9988',
      status: 'Completed',
      processedDate: '2025-12-30',
      remarks: 'Payment for Calcium Carbonate 50MT',
      approvedBy: 'Vijay Mehta',
      processedBy: 'Suresh Patil'
    },
    {
      id: 7,
      paymentNo: 'PMT-OUT-2025-0139',
      date: '2025-12-28',
      vendorName: 'TransLogistics Services',
      vendorId: 'VEN-4012',
      invoiceNo: 'TLS-DEC-2025',
      category: 'Others',
      amount: 125000,
      paymentMode: 'Bank Transfer',
      referenceNo: 'NEFT2025122865432',
      bankName: 'Axis Bank',
      fromAccount: 'AXIS-3333444455',
      toBankAccount: 'HDFC-TLS-3344',
      status: 'Completed',
      processedDate: '2025-12-28',
      remarks: 'Transportation charges - December 2025',
      approvedBy: 'Ramesh Gupta',
      processedBy: 'Vijay Mehta'
    },
    {
      id: 8,
      paymentNo: 'PMT-OUT-2025-0138',
      date: '2025-12-26',
      vendorName: 'Industrial Gas Corporation',
      vendorId: 'VEN-2030',
      invoiceNo: 'IGC-2025-1245',
      category: 'Raw Materials',
      amount: 95000,
      paymentMode: 'Cheque',
      referenceNo: 'CHQ-998877',
      bankName: 'State Bank of India',
      fromAccount: 'SBI-1234567890',
      toBankAccount: 'SBI-IGC-5599',
      status: 'Cancelled',
      processedDate: null,
      remarks: 'Payment cancelled - Vendor invoice disputed',
      approvedBy: 'Ramesh Gupta',
      processedBy: 'Vijay Mehta'
    },
    {
      id: 9,
      paymentNo: 'PMT-OUT-2025-0137',
      date: '2025-12-24',
      vendorName: 'Mahanagar Gas Limited',
      vendorId: 'VEN-3008',
      invoiceNo: 'MGL-NOV-2025',
      category: 'Utilities',
      amount: 78000,
      paymentMode: 'Online Payment',
      referenceNo: 'MGL-TXN-778899',
      bankName: 'HDFC Bank',
      fromAccount: 'HDFC-9876543210',
      toBankAccount: 'MGL-UTILITY-002',
      status: 'Completed',
      processedDate: '2025-12-24',
      remarks: 'November 2025 gas bill',
      approvedBy: 'Vijay Mehta',
      processedBy: 'Suresh Patil'
    },
    {
      id: 10,
      paymentNo: 'PMT-OUT-2025-0136',
      date: '2025-12-20',
      vendorName: 'Chemical Testing Laboratory',
      vendorId: 'VEN-6001',
      invoiceNo: 'CTL-2025-445',
      category: 'Others',
      amount: 42000,
      paymentMode: 'NEFT',
      referenceNo: 'NEFT2025122034567',
      bankName: 'ICICI Bank',
      fromAccount: 'ICICI-5555666677',
      toBankAccount: 'AXIS-CTL-2233',
      status: 'Completed',
      processedDate: '2025-12-20',
      remarks: 'Quality testing charges - Q4 2025',
      approvedBy: 'Ramesh Gupta',
      processedBy: 'Vijay Mehta'
    },
    {
      id: 11,
      paymentNo: 'PMT-OUT-2025-0135',
      date: '2025-12-18',
      vendorName: 'Delhi Chemical Traders',
      vendorId: 'VEN-2008',
      invoiceNo: 'DCT-INV-9876',
      category: 'Raw Materials',
      amount: 520000,
      paymentMode: 'RTGS',
      referenceNo: 'RTGS2025121887654',
      bankName: 'State Bank of India',
      fromAccount: 'SBI-1234567890',
      toBankAccount: 'PNB-DCT-6677',
      status: 'Completed',
      processedDate: '2025-12-18',
      remarks: 'Payment for Acetic Acid 40MT',
      approvedBy: 'Vijay Mehta',
      processedBy: 'Suresh Patil'
    },
    {
      id: 12,
      paymentNo: 'PMT-OUT-2025-0134',
      date: '2025-12-15',
      vendorName: 'Office Supplies Inc',
      vendorId: 'VEN-7005',
      invoiceNo: 'OSI-DEC-2025',
      category: 'Others',
      amount: 25000,
      paymentMode: 'Credit Card',
      referenceNo: 'CC-TXN-556677',
      bankName: 'HDFC Bank',
      fromAccount: 'HDFC-CC-9999',
      toBankAccount: 'OSI-MERCHANT',
      status: 'Pending',
      processedDate: null,
      remarks: 'Office stationery and supplies - Pending settlement',
      approvedBy: 'Suresh Patil',
      processedBy: 'Admin Department'
    }
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6', '#10b981'];

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.paymentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMode === 'All' || payment.status === filterMode;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };
  const [showCreateForm, setShowCreateForm] = useState(false);

const [formData, setFormData] = useState({
  date: "",
  customer: "",
  invoiceNo: "",
  amount: "",
  paymentMode: "",
  reference: "",
});


  return (
    <div className="p-6 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <ArrowUpCircle className="text-red-600" size={36} />
            Outward Payments
          </h1>
          <p className="text-gray-600 mt-1">Track and manage all outgoing payments to vendors and expenses</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Paid (YTD)</p>
                <p className="text-2xl font-bold text-gray-800">₹{(summary.totalPaid / 100000).toFixed(2)}L</p>
              </div>
              <DollarSign className="text-red-600" size={40} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-blue-600">₹{(summary.thisMonth / 100000).toFixed(2)}L</p>
              </div>
              <Calendar className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">₹{(summary.pendingPayments / 100000).toFixed(2)}L</p>
              </div>
              <Clock className="text-yellow-600" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue Payables</p>
                <p className="text-2xl font-bold text-red-600">₹{(summary.overduePayables / 100000).toFixed(2)}L</p>
              </div>
              <AlertCircle className="text-red-600" size={40} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Payment Category Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Payment Category Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paymentCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Monthly Payment Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)}L`} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#ef4444" strokeWidth={2} name="Amount Paid" />
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
                  placeholder="Search by vendor, payment no, or invoice..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterMode('All')}
                className={`px-4 py-2 rounded-lg font-medium ${filterMode === 'All' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode('Completed')}
                className={`px-4 py-2 rounded-lg font-medium ${filterMode === 'Completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilterMode('Pending')}
                className={`px-4 py-2 rounded-lg font-medium ${filterMode === 'Pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterMode('Cancelled')}
                className={`px-4 py-2 rounded-lg font-medium ${filterMode === 'Cancelled' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Cancelled
              </button>
            </div>

            <button 
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <Plus size={20} />
              Make Payment
            </button>
          </div>
        </div>
        {showCreateForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">

      {/* Header */}
      <div className="p-4 bg-red-600 text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">Make Outward Payment</h2>
        <button
          onClick={() => setShowCreateForm(false)}
          className="text-2xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Form (Scrollable) */}
      <form className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-gray-600">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Customer / Vendor */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Customer / Vendor
          </label>
          <input
            type="text"
            placeholder="Vendor Name"
            value={formData.customer}
            onChange={(e) =>
              setFormData({ ...formData, customer: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Invoice No */}
        <div>
          <label className="text-sm font-medium text-gray-600">Invoice No</label>
          <input
            type="text"
            placeholder="INV-XXXX"
            value={formData.invoiceNo}
            onChange={(e) =>
              setFormData({ ...formData, invoiceNo: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-gray-600">Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Payment Mode */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Payment Mode
          </label>
          <select
            value={formData.paymentMode}
            onChange={(e) =>
              setFormData({ ...formData, paymentMode: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Mode</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="NEFT">NEFT</option>
            <option value="RTGS">RTGS</option>
            <option value="Cheque">Cheque</option>
            <option value="Cash">Cash</option>
            <option value="Online Payment">Online Payment</option>
          </select>
        </div>

        {/* Reference */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Reference
          </label>
          <input
            type="text"
            placeholder="Transaction / Cheque No"
            value={formData.reference}
            onChange={(e) =>
              setFormData({ ...formData, reference: e.target.value })
            }
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowCreateForm(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              console.log("New Outward Payment:", formData);
              alert("Outward Payment Created (Mock)");
              setShowCreateForm(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Save Payment
          </button>
        </div>
      </form>
    </div>
  </div>
)}


        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="p-3 text-left">Payment No</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Vendor</th>
                  <th className="p-3 text-left">Invoice No</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-left">Payment Mode</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm font-semibold text-blue-700">{payment.paymentNo}</td>
                    <td className="p-3 text-sm">{payment.date}</td>
                    <td className="p-3">
                      <div className="font-medium">{payment.vendorName}</div>
                      <div className="text-xs text-gray-500">{payment.vendorId}</div>
                    </td>
                    <td className="p-3 text-sm font-mono">{payment.invoiceNo}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{payment.category}</span>
                    </td>
                    <td className="p-3 text-right font-semibold text-red-700">₹{payment.amount.toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-gray-400" />
                        <span className="text-sm">{payment.paymentMode}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1 ${
                        payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {payment.status === 'Completed' && <CheckCircle size={12} />}
                        {payment.status === 'Pending' && <Clock size={12} />}
                        {payment.status === 'Cancelled' && <XCircle size={12} />}
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleViewDetails(payment)}
                        className="text-blue-600 hover:text-blue-800"
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

        {/* Payment Details Modal */}
        {showModal && selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b bg-red-600 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">Payment Voucher</h2>
                    <p className="text-red-100">{selectedPayment.paymentNo}</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-gray-200"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Payment Date</label>
                    <p className="font-semibold">{selectedPayment.date}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <p className={`font-semibold ${
                      selectedPayment.status === 'Completed' ? 'text-green-600' :
                      selectedPayment.status === 'Pending' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`}>{selectedPayment.status}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Vendor Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Vendor Name</label>
                      <p className="font-medium">{selectedPayment.vendorName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Vendor ID</label>
                      <p className="font-medium">{selectedPayment.vendorId}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Payment Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Invoice Number</label>
                      <p className="font-medium">{selectedPayment.invoiceNo}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Category</label>
                      <p className="font-medium">{selectedPayment.category}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Amount Paid</label>
                      <p className="font-semibold text-red-700 text-lg">₹{selectedPayment.amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Payment Mode</label>
                      <p className="font-medium">{selectedPayment.paymentMode}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Reference Number</label>
                      <p className="font-medium font-mono text-sm">{selectedPayment.referenceNo}</p>
                    </div>
                    {selectedPayment.processedDate && (
                      <div>
                        <label className="text-sm text-gray-600">Processed Date</label>
                        <p className="font-medium">{selectedPayment.processedDate}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Bank Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">From Bank</label>
                      <p className="font-medium">{selectedPayment.bankName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">From Account</label>
                      <p className="font-medium">{selectedPayment.fromAccount}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">To Account</label>
                      <p className="font-medium">{selectedPayment.toBankAccount}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="text-sm text-gray-600">Remarks</label>
                  <p className="font-medium">{selectedPayment.remarks}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Approved By</label>
                      <p className="font-medium">{selectedPayment.approvedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Processed By</label>
                      <p className="font-medium">{selectedPayment.processedBy}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Download size={18} />
                  Download Voucher
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

export default Outwardpayment;
