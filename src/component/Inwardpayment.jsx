// import React, { useState } from 'react';
// import { ArrowDownCircle, DollarSign, CreditCard, Building, Search, Filter, Calendar, Download, Plus, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
// import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const Inwardpayment = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterMode, setFilterMode] = useState('All');
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Summary data
//   const summary = {
//     totalReceived: 8456000,
//     thisMonth: 2340000,
//     pending: 1614000,
//     overdueReceivables: 385000
//   };

//   // Payment mode distribution
//   const paymentModeData = [
//     { name: 'Bank Transfer', value: 4500000, count: 45 },
//     { name: 'Cheque', value: 2100000, count: 28 },
//     { name: 'Cash', value: 856000, count: 15 },
//     { name: 'RTGS/NEFT', value: 1000000, count: 12 }
//   ];

//   // Monthly trend
//   const monthlyTrend = [
//     { month: 'Aug', amount: 1200000 },
//     { month: 'Sep', amount: 1450000 },
//     { month: 'Oct', amount: 1680000 },
//     { month: 'Nov', amount: 1820000 },
//     { month: 'Dec', amount: 2100000 },
//     { month: 'Jan', amount: 2340000 }
//   ];

//   // Hardcoded inward payments data
//   const payments = [
//     {
//       id: 1,
//       receiptNo: 'RCP-2026-0158',
//       date: '2026-01-05',
//       customerName: 'ChemTrade Solutions',
//       customerId: 'CUST-1001',
//       invoiceNo: 'INV-2026-0158',
//       amount: 336300,
//       paymentMode: 'Bank Transfer',
//       referenceNo: 'NEFT2026010512345',
//       bankName: 'State Bank of India',
//       bankAccount: 'SBI-1234567890',
//       receivedIn: 'Current Account',
//       status: 'Cleared',
//       clearedDate: '2026-01-05',
//       remarks: 'Payment for HCL and H2SO4 supply',
//       receivedBy: 'Ramesh Gupta'
//     },
//     {
//       id: 2,
//       receiptNo: 'RCP-2026-0157',
//       date: '2026-01-04',
//       customerName: 'Industrial Polymers Ltd',
//       customerId: 'CUST-1002',
//       invoiceNo: 'INV-2026-0157',
//       amount: 100000,
//       paymentMode: 'Cheque',
//       referenceNo: 'CHQ-456789',
//       bankName: 'HDFC Bank',
//       bankAccount: 'HDFC-9876543210',
//       receivedIn: 'Current Account',
//       status: 'Cleared',
//       clearedDate: '2026-01-06',
//       remarks: 'Partial payment - Balance pending',
//       receivedBy: 'Suresh Patil'
//     },
//     {
//       id: 3,
//       receiptNo: 'RCP-2026-0156',
//       date: '2026-01-03',
//       customerName: 'PharmaChem Industries',
//       customerId: 'CUST-1003',
//       invoiceNo: 'INV-2026-0156',
//       amount: 205320,
//       paymentMode: 'RTGS',
//       referenceNo: 'RTGS2026010398765',
//       bankName: 'ICICI Bank',
//       bankAccount: 'ICICI-5555666677',
//       receivedIn: 'Current Account',
//       status: 'Cleared',
//       clearedDate: '2026-01-03',
//       remarks: 'Full payment received',
//       receivedBy: 'Ramesh Gupta'
//     },
//     {
//       id: 4,
//       receiptNo: 'RCP-2026-0155',
//       date: '2026-01-02',
//       customerName: 'TechChem Solutions',
//       customerId: 'CUST-1004',
//       invoiceNo: 'INV-2026-0155',
//       amount: 177000,
//       paymentMode: 'Bank Transfer',
//       referenceNo: 'NEFT2026010267890',
//       bankName: 'Axis Bank',
//       bankAccount: 'AXIS-3333444455',
//       receivedIn: 'Current Account',
//       status: 'Cleared',
//       clearedDate: '2026-01-02',
//       remarks: 'Regular monthly payment',
//       receivedBy: 'Vijay Mehta'
//     },
//     {
//       id: 5,
//       receiptNo: 'RCP-2026-0154',
//       date: '2026-01-02',
//       customerName: 'Green Chemicals Ltd',
//       customerId: 'CUST-1008',
//       invoiceNo: 'INV-2025-0151',
//       amount: 136408,
//       paymentMode: 'NEFT',
//       referenceNo: 'NEFT2026010298712',
//       bankName: 'Bank of Baroda',
//       bankAccount: 'BOB-7777888899',
//       receivedIn: 'Current Account',
//       status: 'Cleared',
//       clearedDate: '2026-01-02',
//       remarks: 'Payment on time',
//       receivedBy: 'Suresh Patil'
//     },
//     {
//       id: 6,
//       receiptNo: 'RCP-2026-0153',
//       date: '2025-12-30',
//       customerName: 'Apex Chemical Works',
//       customerId: 'CUST-1009',
//       invoiceNo: 'INV-2025-0150',
//       amount: 175171,
//       paymentMode: 'Bank Transfer',
//       referenceNo: 'NEFT2025123056789',
//       bankName: 'Punjab National Bank',
//       bankAccount: 'PNB-1111222233',
//       receivedIn: 'Current Account',
//       status: 'Cleared',
//       clearedDate: '2025-12-30',
//       remarks: 'Advance payment customer',
//       receivedBy: 'Ramesh Gupta'
//     },
//     {
//       id: 7,
//       receiptNo: 'RCP-2026-0152',
//       date: '2025-12-28',
//       customerName: 'United Chemicals Corp',
//       customerId: 'CUST-1011',
//       invoiceNo: 'INV-2025-0148',
//       amount: 50000,
//       paymentMode: 'Cheque',
//       referenceNo: 'CHQ-789012',
//       bankName: 'HDFC Bank',
//       bankAccount: 'HDFC-9876543210',
//       receivedIn: 'Current Account',
//       status: 'Pending',
//       clearedDate: null,
//       remarks: 'Partial payment - Cheque under clearing',
//       receivedBy: 'Vijay Mehta'
//     },
//     {
//       id: 8,
//       receiptNo: 'RCP-2026-0151',
//       date: '2025-12-28',
//       customerName: 'Synergy Chemicals',
//       customerId: 'CUST-1014',
//       invoiceNo: 'INV-2025-0145',
//       amount: 182900,
//       paymentMode: 'RTGS',
//       referenceNo: 'RTGS2025122887654',
//       bankName: 'State Bank of India',
//       bankAccount: 'SBI-1234567890',
//       receivedIn: 'Current Account',
//       status: 'Cleared',
//       clearedDate: '2025-12-28',
//       remarks: 'Prompt payment with discount',
//       receivedBy: 'Ramesh Gupta'
//     },
//     {
//       id: 9,
//       receiptNo: 'RCP-2026-0150',
//       date: '2025-12-22',
//       customerName: 'Global Reagents Inc',
//       customerId: 'CUST-1016',
//       invoiceNo: 'INV-2025-0143',
//       amount: 94990,
//       paymentMode: 'Bank Transfer',
//       referenceNo: 'NEFT2025122245678',
//       bankName: 'ICICI Bank',
//       bankAccount: 'ICICI-5555666677',
//       receivedIn: 'Current Account',
//       status: 'Cleared',
//       clearedDate: '2025-12-22',
//       remarks: 'Regular monthly supply payment',
//       receivedBy: 'Suresh Patil'
//     },
//     {
//       id: 10,
//       receiptNo: 'RCP-2026-0149',
//       date: '2025-12-20',
//       customerName: 'Metro Paints & Coatings',
//       customerId: 'CUST-1012',
//       invoiceNo: 'INV-2025-0147',
//       amount: 237180,
//       paymentMode: 'Cheque',
//       referenceNo: 'CHQ-345678',
//       bankName: 'Axis Bank',
//       bankAccount: 'AXIS-3333444455',
//       receivedIn: 'Current Account',
//       status: 'Cleared',
//       clearedDate: '2025-12-23',
//       remarks: 'Long-term customer',
//       receivedBy: 'Ramesh Gupta'
//     },
//     {
//       id: 11,
//       receiptNo: 'RCP-2026-0148',
//       date: '2025-12-15',
//       customerName: 'ChemTrade Solutions',
//       customerId: 'CUST-1001',
//       invoiceNo: 'INV-2025-0140',
//       amount: 285000,
//       paymentMode: 'Cash',
//       referenceNo: 'CASH-2025-015',
//       bankName: 'N/A',
//       bankAccount: 'Cash Counter',
//       receivedIn: 'Cash Account',
//       status: 'Cleared',
//       clearedDate: '2025-12-15',
//       remarks: 'Cash payment - Deposited same day',
//       receivedBy: 'Vijay Mehta'
//     },
//     {
//       id: 12,
//       receiptNo: 'RCP-2026-0147',
//       date: '2025-12-10',
//       customerName: 'BioTech Research Ltd',
//       customerId: 'CUST-1005',
//       invoiceNo: 'INV-2025-0135',
//       amount: 125000,
//       paymentMode: 'Bank Transfer',
//       referenceNo: 'NEFT2025121034567',
//       bankName: 'Bank of India',
//       bankAccount: 'BOI-4444555566',
//       receivedIn: 'Current Account',
//       status: 'Bounced',
//       clearedDate: null,
//       remarks: 'Payment returned - Insufficient funds',
//       receivedBy: 'Suresh Patil'
//     }
//   ];

//   const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

//   // Filter payments
//   const filteredPayments = payments.filter(payment => {
//     const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          payment.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterMode === 'All' || payment.status === filterMode;
//     return matchesSearch && matchesFilter;
//   });

//   const handleViewDetails = (payment) => {
//     setSelectedPayment(payment);
//     setShowModal(true);
//   };
//   const [showCreateForm, setShowCreateForm] = useState(false);

// const [formData, setFormData] = useState({
//   date: "",
//   customer: "",
//   invoiceNo: "",
//   amount: "",
//   paymentMode: "",
//   reference: ""
// });


//   return (
//     <div className="p-6 mt-10 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
//             <ArrowDownCircle className="text-green-600" size={36} />
//             Inward Payments
//           </h1>
//           <p className="text-gray-600 mt-1">Track and manage all incoming payments from customers</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Received (YTD)</p>
//                 <p className="text-2xl font-bold text-gray-800">₹{(summary.totalReceived / 100000).toFixed(2)}L</p>
//               </div>
//               <DollarSign className="text-green-600" size={40} />
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">This Month</p>
//                 <p className="text-2xl font-bold text-blue-600">₹{(summary.thisMonth / 100000).toFixed(2)}L</p>
//               </div>
//               <Calendar className="text-blue-600" size={40} />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Pending Receipts</p>
//                 <p className="text-2xl font-bold text-yellow-600">₹{(summary.pending / 100000).toFixed(2)}L</p>
//               </div>
//               <Clock className="text-yellow-600" size={40} />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Overdue Receivables</p>
//                 <p className="text-2xl font-bold text-red-600">₹{(summary.overdueReceivables / 100000).toFixed(2)}L</p>
//               </div>
//               <AlertCircle className="text-red-600" size={40} />
//             </div>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Payment Mode Distribution */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Payment Mode Distribution</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={paymentModeData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {paymentModeData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Monthly Trend */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Monthly Collection Trend</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={monthlyTrend}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)}L`} />
//                 <Legend />
//                 <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} name="Amount Received" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white p-4 rounded-lg shadow mb-6">
//           <div className="flex flex-wrap gap-4 items-center">
//             <div className="flex-1 min-w-[250px]">
//               <div className="relative">
//                 <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search by customer, receipt no, or invoice..."
//                   className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setFilterMode('All')}
//                 className={`px-4 py-2 rounded-lg font-medium ${filterMode === 'All' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setFilterMode('Cleared')}
//                 className={`px-4 py-2 rounded-lg font-medium ${filterMode === 'Cleared' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//               >
//                 Cleared
//               </button>
//               <button
//                 onClick={() => setFilterMode('Pending')}
//                 className={`px-4 py-2 rounded-lg font-medium ${filterMode === 'Pending' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//               >
//                 Pending
//               </button>
//               <button
//                 onClick={() => setFilterMode('Bounced')}
//                 className={`px-4 py-2 rounded-lg font-medium ${filterMode === 'Bounced' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//               >
//                 Bounced
//               </button>
//             </div>

//             <button 
//             onClick={() => setShowCreateForm(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//               <Plus size={20} />
//               Add Payment
//             </button>
//           </div>
//         </div>
//         {showCreateForm && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">

//       {/* Header */}
//       <div className="p-4 bg-green-600 text-white flex justify-between items-center">
//         <h2 className="text-xl font-bold">Add Inward Payment</h2>
//         <button
//           onClick={() => setShowCreateForm(false)}
//           className="text-2xl font-bold"
//         >
//           ×
//         </button>
//       </div>

//       {/* Form (Scrollable) */}
//       <form className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">

//         {/* Date */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Date</label>
//           <input
//             type="date"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* Customer */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Customer</label>
//           <input
//             type="text"
//             placeholder="Customer Name"
//             value={formData.customer}
//             onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* Invoice No */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Invoice No</label>
//           <input
//             type="text"
//             placeholder="INV-2026-XXXX"
//             value={formData.invoiceNo}
//             onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* Amount */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Amount (₹)</label>
//           <input
//             type="number"
//             placeholder="Enter Amount"
//             value={formData.amount}
//             onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* Payment Mode */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Payment Mode</label>
//           <select
//             value={formData.paymentMode}
//             onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//           >
//             <option value="">Select Mode</option>
//             <option value="Bank Transfer">Bank Transfer</option>
//             <option value="Cheque">Cheque</option>
//             <option value="Cash">Cash</option>
//             <option value="RTGS/NEFT">RTGS / NEFT</option>
//           </select>
//         </div>

//         {/* Reference */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Reference</label>
//           <input
//             type="text"
//             placeholder="Transaction / Cheque No"
//             value={formData.reference}
//             onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-3 pt-4">
//           <button
//             type="button"
//             onClick={() => setShowCreateForm(false)}
//             className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
//           >
//             Cancel
//           </button>

//           <button
//             type="button"
//             onClick={() => {
//               console.log("New Payment:", formData);
//               alert("Payment Added (Mock)");
//               setShowCreateForm(false);
//             }}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//           >
//             Save Payment
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}


//         {/* Payments Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-green-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left">Receipt No</th>
//                   <th className="p-3 text-left">Date</th>
//                   <th className="p-3 text-left">Customer</th>
//                   <th className="p-3 text-left">Invoice No</th>
//                   <th className="p-3 text-right">Amount</th>
//                   <th className="p-3 text-left">Payment Mode</th>
//                   <th className="p-3 text-left">Reference</th>
//                   <th className="p-3 text-center">Status</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPayments.map((payment) => (
//                   <tr key={payment.id} className="border-b hover:bg-gray-50">
//                     <td className="p-3 font-mono text-sm font-semibold text-blue-700">{payment.receiptNo}</td>
//                     <td className="p-3 text-sm">{payment.date}</td>
//                     <td className="p-3">
//                       <div className="font-medium">{payment.customerName}</div>
//                       <div className="text-xs text-gray-500">{payment.customerId}</div>
//                     </td>
//                     <td className="p-3 text-sm font-mono">{payment.invoiceNo}</td>
//                     <td className="p-3 text-right font-semibold text-green-700">₹{payment.amount.toLocaleString('en-IN')}</td>
//                     <td className="p-3">
//                       <div className="flex items-center gap-2">
//                         <CreditCard size={16} className="text-gray-400" />
//                         <span className="text-sm">{payment.paymentMode}</span>
//                       </div>
//                     </td>
//                     <td className="p-3 text-sm font-mono text-gray-600">{payment.referenceNo}</td>
//                     <td className="p-3 text-center">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         payment.status === 'Cleared' ? 'bg-green-100 text-green-800' :
//                         payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                         'bg-red-100 text-red-800'
//                       }`}>
//                         {payment.status}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       <button
//                         onClick={() => handleViewDetails(payment)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <Eye size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Payment Details Modal */}
//         {showModal && selectedPayment && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b bg-green-600 text-white">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-2xl font-bold">Payment Receipt</h2>
//                     <p className="text-green-100">{selectedPayment.receiptNo}</p>
//                   </div>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="text-white hover:text-gray-200"
//                   >
//                     <span className="text-2xl">×</span>
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm text-gray-600">Receipt Date</label>
//                     <p className="font-semibold">{selectedPayment.date}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600">Status</label>
//                     <p className={`font-semibold ${
//                       selectedPayment.status === 'Cleared' ? 'text-green-600' :
//                       selectedPayment.status === 'Pending' ? 'text-yellow-600' :
//                       'text-red-600'
//                     }`}>{selectedPayment.status}</p>
//                   </div>
//                 </div>

//                 <div className="border-t pt-4">
//                   <h3 className="font-semibold text-gray-800 mb-3">Customer Details</h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm text-gray-600">Customer Name</label>
//                       <p className="font-medium">{selectedPayment.customerName}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600">Customer ID</label>
//                       <p className="font-medium">{selectedPayment.customerId}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t pt-4">
//                   <h3 className="font-semibold text-gray-800 mb-3">Payment Details</h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm text-gray-600">Invoice Number</label>
//                       <p className="font-medium">{selectedPayment.invoiceNo}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600">Amount Received</label>
//                       <p className="font-semibold text-green-700 text-lg">₹{selectedPayment.amount.toLocaleString('en-IN')}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600">Payment Mode</label>
//                       <p className="font-medium">{selectedPayment.paymentMode}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600">Reference Number</label>
//                       <p className="font-medium font-mono text-sm">{selectedPayment.referenceNo}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t pt-4">
//                   <h3 className="font-semibold text-gray-800 mb-3">Bank Details</h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm text-gray-600">Bank Name</label>
//                       <p className="font-medium">{selectedPayment.bankName}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600">Bank Account</label>
//                       <p className="font-medium">{selectedPayment.bankAccount}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600">Received In</label>
//                       <p className="font-medium">{selectedPayment.receivedIn}</p>
//                     </div>
//                     {selectedPayment.clearedDate && (
//                       <div>
//                         <label className="text-sm text-gray-600">Cleared Date</label>
//                         <p className="font-medium">{selectedPayment.clearedDate}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="border-t pt-4">
//                   <label className="text-sm text-gray-600">Remarks</label>
//                   <p className="font-medium">{selectedPayment.remarks}</p>
//                 </div>

//                 <div className="border-t pt-4">
//                   <label className="text-sm text-gray-600">Received By</label>
//                   <p className="font-medium">{selectedPayment.receivedBy}</p>
//                 </div>
//               </div>

//               <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
//                   <Download size={18} />
//                   Download Receipt
//                 </button>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Inwardpayment;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const API_URL = "http://localhost:5000/api/inward-payments";

export default function InwardPayment() {
  const [payments, setPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    receiptNo: "",
    companyName: "",
    address: "",
    paymentDate: "",
    amount: "",
    paymentType: "",
    attachment: null,
  });

  /* ================= FETCH PAYMENTS ================= */
  const fetchPayments = async () => {
    try {
      const res = await axios.get(API_URL);
      setPayments(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  /* ================= HANDLE FORM CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /* ================= SUBMIT FORM ================= */
  // const handleSubmit = async () => {
  //   try {
  //     const data = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       data.append(key, value);
  //     });

  //     await axios.post(API_URL, data, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     setShowForm(false);
  //     setFormData({
  //       receiptNo: "",
  //       companyName: "",
  //       address: "",
  //       paymentDate: "",
  //       amount: "",
  //       paymentType: "",
  //       attachment: null,
  //     });

  //     fetchPayments();
  //   } catch (err) {
  //     console.error("Submit error:", err);
  //     alert("Failed to save payment");
  //   }
  // };

  const handleSubmit = async () => {
  try {
    const data = new FormData();

    // Append only valid values
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    // Basic frontend validation
    if (
      !formData.receiptNo ||
      !formData.companyName ||
      !formData.paymentDate ||
      !formData.amount ||
      !formData.paymentType
    ) {
      alert("Please fill all required fields");
      return;
    }

    await axios.post(API_URL, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setShowForm(false);
    setFormData({
      receiptNo: "",
      companyName: "",
      address: "",
      paymentDate: "",
      amount: "",
      paymentType: "",
      attachment: null,
    });

    fetchPayments();
  } catch (err) {
    console.error(
      "Submit error:",
      err.response?.data || err.message
    );
    alert(err.response?.data?.error || "Failed to save payment");
  }
};


  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inward Payments</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus size={20} /> Add New
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">Receipt No</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Payment Date</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-left">Payment Type</th>
              <th className="p-3 text-left">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono">{p.receiptNo}</td>
                <td className="p-3">
                  <div className="font-medium">{p.companyName}</div>
                  <div className="text-xs text-gray-500">{p.address}</div>
                </td>
                <td className="p-3">
                  {new Date(p.paymentDate).toLocaleDateString()}
                </td>
                <td className="p-3 text-right font-semibold">
                  ₹{Number(p.amount).toLocaleString("en-IN")}
                </td>
                <td className="p-3">{p.paymentType}</td>
                <td className="p-3">
                  {p.attachment ? (
                    <a
                      href={`http://localhost:5000/uploads/${p.attachment}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No inward payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 space-y-4">

            <h2 className="text-xl font-bold">Add Inward Payment</h2>

            <input
              name="receiptNo"
              placeholder="Receipt No"
              className="w-full border rounded-lg p-2"
              value={formData.receiptNo}
              onChange={handleChange}
            />

            <input
              name="companyName"
              placeholder="Company Name"
              className="w-full border rounded-lg p-2"
              value={formData.companyName}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Company Address"
              className="w-full border rounded-lg p-2"
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="date"
              name="paymentDate"
              className="w-full border rounded-lg p-2"
              value={formData.paymentDate}
              onChange={handleChange}
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="w-full border rounded-lg p-2"
              value={formData.amount}
              onChange={handleChange}
            />

            <select
              name="paymentType"
              className="w-full border rounded-lg p-2"
              value={formData.paymentType}
              onChange={handleChange}
            >
              <option value="">Select Payment Type</option>
              <option>Bank Transfer</option>
              <option>Cheque</option>
              <option>Cash</option>
              <option>RTGS/NEFT</option>
              {/* <option>Online Payment</option> */}
            </select>

            <input
              type="file"
              name="attachment"
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
