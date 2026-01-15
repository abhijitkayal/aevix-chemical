// import React, { useState } from 'react';
// import { FileText, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle, XCircle, Search, Filter, Download, Eye, Send, Calendar, Plus, X } from 'lucide-react';
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const Invoice = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All');
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({
//     customer: '',
//     customerId: '',
//     date: '',
//     dueDate: '',
//     product: '',
//     quantity: '',
//     rate: '',
//     notes: ''
//   });

//   // Summary data
//   const summary = {
//     totalInvoices: 158,
//     totalAmount: 8456000,
//     paidAmount: 6842000,
//     pendingAmount: 1614000,
//     overdueAmount: 385000
//   };

//   // Invoice data
//   const invoices = [
//     {
//       id: 'INV-2026-0158',
//       invoiceNo: 'INV-2026-0158',
//       date: '2026-01-05',
//       dueDate: '2026-02-04',
//       customer: 'ChemTrade Solutions',
//       customerId: 'CUST-1001',
//       items: [
//         { product: 'Hydrochloric Acid 35%', quantity: '500 L', rate: 450, amount: 225000 },
//         { product: 'Sulfuric Acid 98%', quantity: '300 L', rate: 200, amount: 60000 }
//       ],
//       subtotal: 285000,
//       tax: 51300,
//       totalAmount: 336300,
//       paidAmount: 336300,
//       balanceAmount: 0,
//       status: 'Sent',
//       paymentStatus: 'Paid',
//       paymentDate: '2026-01-10',
//       paymentMethod: 'Bank Transfer',
//       notes: 'Regular customer - Priority delivery'
//     },
//     {
//       id: 'INV-2026-0157',
//       invoiceNo: 'INV-2026-0157',
//       date: '2026-01-04',
//       dueDate: '2026-02-03',
//       customer: 'Industrial Polymers Ltd',
//       customerId: 'CUST-1002',
//       items: [
//         { product: 'Ethanol 95%', quantity: '800 L', rate: 180, amount: 144000 },
//         { product: 'Acetic Acid 99%', quantity: '200 L', rate: 150, amount: 30000 }
//       ],
//       subtotal: 174000,
//       tax: 31320,
//       totalAmount: 205320,
//       paidAmount: 100000,
//       balanceAmount: 105320,
//       status: 'Sent',
//       paymentStatus: 'Partial',
//       paymentDate: '2026-01-08',
//       paymentMethod: 'Bank Transfer',
//       notes: 'Partial payment received'
//     },
//     {
//       id: 'INV-2026-0156',
//       invoiceNo: 'INV-2026-0156',
//       date: '2026-01-03',
//       dueDate: '2026-02-02',
//       customer: 'PharmaChem Industries',
//       customerId: 'CUST-1003',
//       items: [
//         { product: 'Isopropyl Alcohol 99%', quantity: '600 L', rate: 220, amount: 132000 },
//         { product: 'Hydrogen Peroxide 35%', quantity: '150 L', rate: 280, amount: 42000 }
//       ],
//       subtotal: 174000,
//       tax: 31320,
//       totalAmount: 205320,
//       paidAmount: 205320,
//       balanceAmount: 0,
//       status: 'Sent',
//       paymentStatus: 'Paid',
//       paymentDate: '2026-01-12',
//       paymentMethod: 'Cheque',
//       notes: 'Payment received via cheque'
//     },
//     {
//       id: 'INV-2026-0155',
//       invoiceNo: 'INV-2026-0155',
//       date: '2026-01-02',
//       dueDate: '2026-02-01',
//       customer: 'TechChem Solutions',
//       customerId: 'CUST-1004',
//       items: [
//         { product: 'Ammonia Solution 25%', quantity: '400 L', rate: 165, amount: 66000 },
//         { product: 'Caustic Soda Pellets', quantity: '200 kg', rate: 420, amount: 84000 }
//       ],
//       subtotal: 150000,
//       tax: 27000,
//       totalAmount: 177000,
//       paidAmount: 177000,
//       balanceAmount: 0,
//       status: 'Sent',
//       paymentStatus: 'Paid',
//       paymentDate: '2026-01-15',
//       paymentMethod: 'Bank Transfer',
//       notes: 'Regular monthly order'
//     },
//     {
//       id: 'INV-2026-0154',
//       invoiceNo: 'INV-2026-0154',
//       date: '2026-01-01',
//       dueDate: '2026-01-31',
//       customer: 'BioTech Research Ltd',
//       customerId: 'CUST-1005',
//       items: [
//         { product: 'Titanium Dioxide Pigment', quantity: '150 kg', rate: 680, amount: 102000 },
//         { product: 'Iron Oxide Red', quantity: '80 kg', rate: 450, amount: 36000 }
//       ],
//       subtotal: 138000,
//       tax: 24840,
//       totalAmount: 162840,
//       paidAmount: 0,
//       balanceAmount: 162840,
//       status: 'Sent',
//       paymentStatus: 'Pending',
//       paymentDate: null,
//       paymentMethod: null,
//       notes: 'Payment pending'
//     },
//     {
//       id: 'INV-2025-0153',
//       invoiceNo: 'INV-2025-0153',
//       date: '2025-12-28',
//       dueDate: '2025-12-28',
//       customer: 'ChemCore Industries',
//       customerId: 'CUST-1006',
//       items: [
//         { product: 'Sodium Bicarbonate', quantity: '300 kg', rate: 185, amount: 55500 },
//         { product: 'Calcium Carbonate', quantity: '250 kg', rate: 120, amount: 30000 }
//       ],
//       subtotal: 85500,
//       tax: 15390,
//       totalAmount: 100890,
//       paidAmount: 0,
//       balanceAmount: 100890,
//       status: 'Sent',
//       paymentStatus: 'Overdue',
//       paymentDate: null,
//       paymentMethod: null,
//       notes: 'Payment overdue - Follow up required'
//     },
//     {
//       id: 'INV-2025-0152',
//       invoiceNo: 'INV-2025-0152',
//       date: '2025-12-26',
//       dueDate: '2025-12-26',
//       customer: 'Polymer Solutions Inc',
//       customerId: 'CUST-1007',
//       items: [
//         { product: 'Formaldehyde 37%', quantity: '350 L', rate: 195, amount: 68250 },
//         { product: 'Methanol 99%', quantity: '200 L', rate: 175, amount: 35000 }
//       ],
//       subtotal: 103250,
//       tax: 18585,
//       totalAmount: 121835,
//       paidAmount: 0,
//       balanceAmount: 121835,
//       status: 'Sent',
//       paymentStatus: 'Overdue',
//       paymentDate: null,
//       paymentMethod: null,
//       notes: 'Payment overdue - Legal notice sent'
//     },
//     {
//       id: 'INV-2025-0151',
//       invoiceNo: 'INV-2025-0151',
//       date: '2025-12-24',
//       dueDate: '2026-01-23',
//       customer: 'Green Chemicals Ltd',
//       customerId: 'CUST-1008',
//       items: [
//         { product: 'Citric Acid Anhydrous', quantity: '180 kg', rate: 320, amount: 57600 },
//         { product: 'Tartaric Acid', quantity: '100 kg', rate: 580, amount: 58000 }
//       ],
//       subtotal: 115600,
//       tax: 20808,
//       totalAmount: 136408,
//       paidAmount: 136408,
//       balanceAmount: 0,
//       status: 'Sent',
//       paymentStatus: 'Paid',
//       paymentDate: '2026-01-05',
//       paymentMethod: 'NEFT',
//       notes: 'Payment received on time'
//     },
//     {
//       id: 'INV-2025-0150',
//       invoiceNo: 'INV-2025-0150',
//       date: '2025-12-22',
//       dueDate: '2026-01-21',
//       customer: 'Apex Chemical Works',
//       customerId: 'CUST-1009',
//       items: [
//         { product: 'Glycerol 99%', quantity: '250 L', rate: 385, amount: 96250 },
//         { product: 'Propylene Glycol', quantity: '180 L', rate: 290, amount: 52200 }
//       ],
//       subtotal: 148450,
//       tax: 26721,
//       totalAmount: 175171,
//       paidAmount: 175171,
//       balanceAmount: 0,
//       status: 'Sent',
//       paymentStatus: 'Paid',
//       paymentDate: '2025-12-30',
//       paymentMethod: 'Bank Transfer',
//       notes: 'Advance payment customer'
//     },
//     {
//       id: 'INV-2025-0149',
//       invoiceNo: 'INV-2025-0149',
//       date: '2025-12-20',
//       dueDate: '2026-01-19',
//       customer: 'Crystal Pharma Ltd',
//       customerId: 'CUST-1010',
//       items: [
//         { product: 'Benzyl Alcohol', quantity: '120 L', rate: 520, amount: 62400 },
//         { product: 'Phenol 99%', quantity: '90 kg', rate: 680, amount: 61200 }
//       ],
//       subtotal: 123600,
//       tax: 22248,
//       totalAmount: 145848,
//       paidAmount: 0,
//       balanceAmount: 145848,
//       status: 'Sent',
//       paymentStatus: 'Pending',
//       paymentDate: null,
//       paymentMethod: null,
//       notes: 'Payment expected by 15th Jan'
//     },
//     {
//       id: 'INV-2025-0148',
//       invoiceNo: 'INV-2025-0148',
//       date: '2025-12-18',
//       dueDate: '2026-01-17',
//       customer: 'United Chemicals Corp',
//       customerId: 'CUST-1011',
//       items: [
//         { product: 'Toluene 99%', quantity: '400 L', rate: 245, amount: 98000 },
//         { product: 'Xylene Mixed Isomers', quantity: '300 L', rate: 265, amount: 79500 }
//       ],
//       subtotal: 177500,
//       tax: 31950,
//       totalAmount: 209450,
//       paidAmount: 50000,
//       balanceAmount: 159450,
//       status: 'Sent',
//       paymentStatus: 'Partial',
//       paymentDate: '2025-12-28',
//       paymentMethod: 'Bank Transfer',
//       notes: 'Partial payment - Balance pending'
//     },
//     {
//       id: 'INV-2025-0147',
//       invoiceNo: 'INV-2025-0147',
//       date: '2025-12-16',
//       dueDate: '2026-01-15',
//       customer: 'Metro Paints & Coatings',
//       customerId: 'CUST-1012',
//       items: [
//         { product: 'Titanium Dioxide Anatase', quantity: '200 kg', rate: 720, amount: 144000 },
//         { product: 'Carbon Black', quantity: '150 kg', rate: 380, amount: 57000 }
//       ],
//       subtotal: 201000,
//       tax: 36180,
//       totalAmount: 237180,
//       paidAmount: 237180,
//       balanceAmount: 0,
//       status: 'Sent',
//       paymentStatus: 'Paid',
//       paymentDate: '2026-01-02',
//       paymentMethod: 'Cheque',
//       notes: 'Long-term customer'
//     },
//     {
//       id: 'INV-2025-0146',
//       invoiceNo: 'INV-2025-0146',
//       date: '2025-12-14',
//       dueDate: '2026-01-13',
//       customer: 'Prime Solvents Ltd',
//       customerId: 'CUST-1013',
//       items: [
//         { product: 'Acetone 99%', quantity: '500 L', rate: 195, amount: 97500 },
//         { product: 'MEK (Methyl Ethyl Ketone)', quantity: '350 L', rate: 225, amount: 78750 }
//       ],
//       subtotal: 176250,
//       tax: 31725,
//       totalAmount: 207975,
//       paidAmount: 0,
//       balanceAmount: 207975,
//       status: 'Sent',
//       paymentStatus: 'Pending',
//       paymentDate: null,
//       paymentMethod: null,
//       notes: 'New customer - Credit approved'
//     },
//     {
//       id: 'INV-2025-0145',
//       invoiceNo: 'INV-2025-0145',
//       date: '2025-12-12',
//       dueDate: '2026-01-11',
//       customer: 'Synergy Chemicals',
//       customerId: 'CUST-1014',
//       items: [
//         { product: 'Sodium Hydroxide 50%', quantity: '600 L', rate: 165, amount: 99000 },
//         { product: 'Potassium Hydroxide 45%', quantity: '200 L', rate: 280, amount: 56000 }
//       ],
//       subtotal: 155000,
//       tax: 27900,
//       totalAmount: 182900,
//       paidAmount: 182900,
//       balanceAmount: 0,
//       status: 'Sent',
//       paymentStatus: 'Paid',
//       paymentDate: '2025-12-28',
//       paymentMethod: 'RTGS',
//       notes: 'Prompt payment - Discount applied'
//     },
//     {
//       id: 'INV-2025-0144',
//       invoiceNo: 'INV-2025-0144',
//       date: '2025-12-10',
//       dueDate: '2025-12-10',
//       customer: 'Spectrum Dyes & Pigments',
//       customerId: 'CUST-1015',
//       items: [
//         { product: 'Phthalocyanine Blue', quantity: '50 kg', rate: 1280, amount: 64000 },
//         { product: 'Phthalocyanine Green', quantity: '40 kg', rate: 1350, amount: 54000 }
//       ],
//       subtotal: 118000,
//       tax: 21240,
//       totalAmount: 139240,
//       paidAmount: 0,
//       balanceAmount: 139240,
//       status: 'Sent',
//       paymentStatus: 'Overdue',
//       paymentDate: null,
//       paymentMethod: null,
//       notes: 'Payment overdue - Second reminder sent'
//     },
//     {
//       id: 'INV-2025-0143',
//       invoiceNo: 'INV-2025-0143',
//       date: '2025-12-08',
//       dueDate: '2026-01-07',
//       customer: 'Global Reagents Inc',
//       customerId: 'CUST-1016',
//       items: [
//         { product: 'Sodium Chloride AR Grade', quantity: '300 kg', rate: 145, amount: 43500 },
//         { product: 'Potassium Chloride AR', quantity: '200 kg', rate: 185, amount: 37000 }
//       ],
//       subtotal: 80500,
//       tax: 14490,
//       totalAmount: 94990,
//       paidAmount: 94990,
//       balanceAmount: 0,
//       status: 'Sent',
//       paymentStatus: 'Paid',
//       paymentDate: '2025-12-22',
//       paymentMethod: 'Bank Transfer',
//       notes: 'Regular monthly supply'
//     },
//     {
//       id: 'DRAFT-2026-005',
//       invoiceNo: 'DRAFT-2026-005',
//       date: '2026-01-05',
//       dueDate: '2026-02-04',
//       customer: 'Nova Chemicals Ltd',
//       customerId: 'CUST-1017',
//       items: [
//         { product: 'Nitric Acid 68%', quantity: '250 L', rate: 285, amount: 71250 },
//         { product: 'Phosphoric Acid 85%', quantity: '180 L', rate: 195, amount: 35100 }
//       ],
//       subtotal: 106350,
//       tax: 19143,
//       totalAmount: 125493,
//       paidAmount: 0,
//       balanceAmount: 125493,
//       status: 'Draft',
//       paymentStatus: 'Unpaid',
//       paymentDate: null,
//       paymentMethod: null,
//       notes: 'Draft - Pending approval'
//     },
//     {
//       id: 'DRAFT-2026-004',
//       invoiceNo: 'DRAFT-2026-004',
//       date: '2026-01-05',
//       dueDate: '2026-02-04',
//       customer: 'Catalyst Solutions',
//       customerId: 'CUST-1018',
//       items: [
//         { product: 'Alumina Catalyst Support', quantity: '100 kg', rate: 890, amount: 89000 },
//         { product: 'Silica Gel Grade A', quantity: '150 kg', rate: 420, amount: 63000 }
//       ],
//       subtotal: 152000,
//       tax: 27360,
//       totalAmount: 179360,
//       paidAmount: 0,
//       balanceAmount: 179360,
//       status: 'Draft',
//       paymentStatus: 'Unpaid',
//       paymentDate: null,
//       paymentMethod: null,
//       notes: 'Quotation under negotiation'
//     },
//     {
//       id: 'INV-2025-0142',
//       invoiceNo: 'INV-2025-0142',
//       date: '2025-12-06',
//       dueDate: '2026-01-05',
//       customer: 'Sterling Chemicals',
//       customerId: 'CUST-1019',
//       items: [
//         { product: 'Diethylene Glycol', quantity: '400 L', rate: 245, amount: 98000 },
//         { product: 'Triethylene Glycol', quantity: '200 L', rate: 285, amount: 57000 }
//       ],
//       subtotal: 155000,
//       tax: 27900,
//       totalAmount: 182900,
//       paidAmount: 182900,
//       balanceAmount: 0,
//       status: 'Sent',
//       paymentStatus: 'Paid',
//       paymentDate: '2025-12-20',
//       paymentMethod: 'Bank Transfer',
//       notes: 'Early payment - Thank you'
//     },
//     {
//       id: 'INV-2025-0141',
//       invoiceNo: 'INV-2025-0141',
//       date: '2025-12-04',
//       dueDate: '2026-01-03',
//       customer: 'Diamond Specialty Chemicals',
//       customerId: 'CUST-1020',
//       items: [
//         { product: 'EDTA Disodium Salt', quantity: '120 kg', rate: 580, amount: 69600 },
//         { product: 'Sodium Thiosulfate', quantity: '200 kg', rate: 165, amount: 33000 }
//       ],
//       subtotal: 102600,
//       tax: 18468,
//       totalAmount: 121068,
//       paidAmount: 60000,
//       balanceAmount: 61068,
//       status: 'Sent',
//       paymentStatus: 'Partial',
//       paymentDate: '2025-12-18',
//       paymentMethod: 'Cheque',
//       notes: 'Partial payment received'
//     }
//   ];

//   // Monthly invoice trend
//   const monthlyInvoiceTrend = [
//     { month: 'Jul', invoices: 132, amount: 6200000 },
//     { month: 'Aug', invoices: 145, amount: 6850000 },
//     { month: 'Sep', invoices: 138, amount: 6500000 },
//     { month: 'Oct', invoices: 152, amount: 7150000 },
//     { month: 'Nov', invoices: 148, amount: 7420000 },
//     { month: 'Dec', invoices: 155, amount: 7890000 },
//     { month: 'Jan', invoices: 158, amount: 8456000 }
//   ];

//   // Payment status distribution
//   const paymentDistribution = [
//     { status: 'Paid', count: 98, amount: 6842000 },
//     { status: 'Pending', count: 35, amount: 1229000 },
//     { status: 'Partial', count: 15, amount: 385000 },
//     { status: 'Overdue', count: 10, amount: 385000 }
//   ];

//   // Top customers by revenue
//   const topCustomers = [
//     { customer: 'ChemTrade Solutions', invoices: 24, amount: 2850000 },
//     { customer: 'Industrial Polymers Ltd', invoices: 18, amount: 2150000 },
//     { customer: 'PharmaChem Industries', invoices: 16, amount: 1920000 },
//     { customer: 'TechChem Solutions', invoices: 14, amount: 1680000 },
//     { customer: 'Metro Paints & Coatings', invoices: 12, amount: 1450000 }
//   ];

//   const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

//   // Filter invoices
//   const filteredInvoices = invoices.filter(invoice => {
//     const matchesSearch = invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          invoice.customer.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = selectedStatus === 'All' || invoice.status === selectedStatus;
//     const matchesPayment = selectedPaymentStatus === 'All' || invoice.paymentStatus === selectedPaymentStatus;

//     return matchesSearch && matchesStatus && matchesPayment;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Sent': return 'bg-blue-100 text-blue-800';
//       case 'Draft': return 'bg-gray-100 text-gray-800';
//       case 'Cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPaymentStatusColor = (status) => {
//     switch (status) {
//       case 'Paid': return 'bg-green-100 text-green-800';
//       case 'Pending': return 'bg-yellow-100 text-yellow-800';
//       case 'Partial': return 'bg-orange-100 text-orange-800';
//       case 'Overdue': return 'bg-red-100 text-red-800';
//       case 'Unpaid': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatCurrency = (value) => {
//     return `₹${value.toLocaleString('en-IN')}`;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     console.log('Invoice data submitted:', form);
//     // Add your submission logic here
//     setForm({
//       customer: '',
//       customerId: '',
//       date: '',
//       dueDate: '',
//       product: '',
//       quantity: '',
//       rate: '',
//       notes: ''
//     });
//     setShowModal(false);
//   };

//   return (
//     <div className="p-6 min-h-screen mt-10">
//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-black mb-2">Invoice Management</h1>
//           <p className="text-gray-600">Track and manage all customer invoices and payments</p>
//         </div>
//         <p
//           onClick={() => setShowModal(true)}
//           className=" flex border-2  p-2 mt-0.5 bg-black text-white cursor-pointer"
//         >
//           <Plus size={20} className='mt-0.5'/>
//           Create Invoice
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Invoices</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.totalInvoices}</p>
//             </div>
//             <FileText className="text-blue-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Amount</p>
//               <p className="text-2xl font-bold text-black mt-1">{formatCurrency(summary.totalAmount)}</p>
//             </div>
//             <DollarSign className="text-purple-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Paid Amount</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(summary.paidAmount)}</p>
//             </div>
//             <CheckCircle className="text-green-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Pending Amount</p>
//               <p className="text-2xl font-bold text-orange-600 mt-1">{formatCurrency(summary.pendingAmount)}</p>
//             </div>
//             <Clock className="text-orange-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Overdue Amount</p>
//               <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(summary.overdueAmount)}</p>
//             </div>
//             <AlertCircle className="text-red-500" size={32} />
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Monthly Invoice Trend */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Monthly Invoice Trend</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={monthlyInvoiceTrend}>
//               <defs>
//                 <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis yAxisId="left" />
//               <YAxis yAxisId="right" orientation="right" />
//               <Tooltip formatter={(value) => formatCurrency(value)} />
//               <Legend />
//               <Area yAxisId="right" type="monotone" dataKey="amount" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAmount)" name="Revenue" />
//               <Line yAxisId="left" type="monotone" dataKey="invoices" stroke="#10b981" strokeWidth={2} name="Invoices" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Payment Status Distribution */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Payment Status Distribution</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={paymentDistribution}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ status, count }) => `${status}: ${count}`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="count"
//               >
//                 {paymentDistribution.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Top Customers */}
//       <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold text-black mb-4">Top Customers by Revenue</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={topCustomers} layout="horizontal">
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis type="number" tickFormatter={formatCurrency} />
//             <YAxis dataKey="customer" type="category" width={180} />
//             <Tooltip formatter={(value) => formatCurrency(value)} />
//             <Legend />
//             <Bar dataKey="amount" fill="#8b5cf6" name="Revenue" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Filters */}
//       <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-black mb-2">Search Invoice</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search by invoice no or customer..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-black mb-2">Filter by Status</label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="All">All Status</option>
//               <option value="Draft">Draft</option>
//               <option value="Sent">Sent</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-black mb-2">Filter by Payment</label>
//             <select
//               value={selectedPaymentStatus}
//               onChange={(e) => setSelectedPaymentStatus(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="All">All Payment Status</option>
//               <option value="Paid">Paid</option>
//               <option value="Pending">Pending</option>
//               <option value="Partial">Partial</option>
//               <option value="Overdue">Overdue</option>
//               <option value="Unpaid">Unpaid</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Invoices List */}
//       <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//         <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-black">Invoice List ({filteredInvoices.length} invoices)</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-100 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Invoice No</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Paid</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Balance</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredInvoices.map((invoice) => (
//                 <tr key={invoice.id} className="hover:bg-gray-100">
//                   <td className="px-6 py-4 text-sm font-semibold text-black">{invoice.invoiceNo}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{invoice.date}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{invoice.customer}</td>
//                   <td className="px-6 py-4 text-sm font-medium text-black">{formatCurrency(invoice.totalAmount)}</td>
//                   <td className="px-6 py-4 text-sm text-green-600">{formatCurrency(invoice.paidAmount)}</td>
//                   <td className="px-6 py-4 text-sm text-orange-600">{formatCurrency(invoice.balanceAmount)}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
//                       {invoice.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(invoice.paymentStatus)}`}>
//                       {invoice.paymentStatus}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => setSelectedInvoice(invoice)}
//                         className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                         title="View Details"
//                       >
//                         <Eye size={18} />
//                       </button>
//                       <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="Download PDF">
//                         <Download size={18} />
//                       </button>
//                       <button className="p-1 text-purple-600 hover:bg-purple-50 rounded" title="Send Invoice">
//                         <Send size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Invoice Details Modal */}
//       {selectedInvoice && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold text-black">Invoice Details</h2>
//                 <button
//                   onClick={() => setSelectedInvoice(null)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <XCircle size={24} />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               {/* Invoice Header */}
//               <div className="grid grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-black mb-2">Invoice Information</h3>
//                   <p className="text-sm text-gray-600">Invoice No: <span className="font-semibold text-black">{selectedInvoice.invoiceNo}</span></p>
//                   <p className="text-sm text-gray-600">Date: <span className="font-semibold text-black">{selectedInvoice.date}</span></p>
//                   <p className="text-sm text-gray-600">Due Date: <span className="font-semibold text-black">{selectedInvoice.dueDate}</span></p>
//                   <p className="text-sm text-gray-600 mt-2">
//                     Status: <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedInvoice.status)}`}>{selectedInvoice.status}</span>
//                   </p>
//                   <p className="text-sm text-gray-600 mt-2">
//                     Payment: <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedInvoice.paymentStatus)}`}>{selectedInvoice.paymentStatus}</span>
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-black mb-2">Customer Information</h3>
//                   <p className="text-sm text-gray-600">Name: <span className="font-semibold text-black">{selectedInvoice.customer}</span></p>
//                   <p className="text-sm text-gray-600">Customer ID: <span className="font-semibold text-black">{selectedInvoice.customerId}</span></p>
//                   {selectedInvoice.paymentDate && (
//                     <>
//                       <p className="text-sm text-gray-600 mt-2">Payment Date: <span className="font-semibold text-black">{selectedInvoice.paymentDate}</span></p>
//                       <p className="text-sm text-gray-600">Payment Method: <span className="font-semibold text-black">{selectedInvoice.paymentMethod}</span></p>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Invoice Items */}
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-black mb-3">Items</h3>
//                 <table className="w-full border border-gray-200">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 border-b">Product</th>
//                       <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Quantity</th>
//                       <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Rate</th>
//                       <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedInvoice.items.map((item, index) => (
//                       <tr key={index} className="border-b">
//                         <td className="px-4 py-2 text-sm text-black">{item.product}</td>
//                         <td className="px-4 py-2 text-sm text-gray-700 text-right">{item.quantity}</td>
//                         <td className="px-4 py-2 text-sm text-gray-700 text-right">{formatCurrency(item.rate)}</td>
//                         <td className="px-4 py-2 text-sm font-medium text-black text-right">{formatCurrency(item.amount)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Invoice Summary */}
//               <div className="bg-gray-100 p-4 rounded-lg mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Subtotal:</span>
//                   <span className="text-sm font-medium text-black">{formatCurrency(selectedInvoice.subtotal)}</span>
//                 </div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Tax (18%):</span>
//                   <span className="text-sm font-medium text-black">{formatCurrency(selectedInvoice.tax)}</span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-t border-gray-300">
//                   <span className="text-lg font-semibold text-black">Total Amount:</span>
//                   <span className="text-lg font-bold text-black">{formatCurrency(selectedInvoice.totalAmount)}</span>
//                 </div>
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-sm text-green-600">Paid Amount:</span>
//                   <span className="text-sm font-semibold text-green-600">{formatCurrency(selectedInvoice.paidAmount)}</span>
//                 </div>
//                 <div className="flex justify-between items-center mt-1">
//                   <span className="text-sm text-orange-600">Balance Amount:</span>
//                   <span className="text-sm font-semibold text-orange-600">{formatCurrency(selectedInvoice.balanceAmount)}</span>
//                 </div>
//               </div>

//               {/* Notes */}
//               {selectedInvoice.notes && (
//                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                   <h4 className="text-sm font-semibold text-blue-900 mb-1">Notes:</h4>
//                   <p className="text-sm text-blue-700">{selectedInvoice.notes}</p>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
//                   <Download size={18} className="mr-2" />
//                   Download PDF
//                 </button>
//                 <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
//                   <Send size={18} className="mr-2" />
//                   Send to Customer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* No Results Message */}
//       {filteredInvoices.length === 0 && (
//         <div className="text-center py-12 bg-white border border-gray-200 rounded-lg mt-6">
//           <FileText className="mx-auto text-gray-400 mb-4" size={48} />
//           <p className="text-gray-600">No invoices found matching your criteria</p>
//         </div>
//       )}

//       {/* Create Invoice Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X size={24} />
//             </button>

//             <h3 className="text-2xl font-bold mb-6 text-gray-900">
//               Create New Invoice
//             </h3>

//     <div className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Customer Name *
//           </label>
//           <input
//             name="customer"
//             placeholder="Enter customer name"
//             className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             onChange={handleChange}
//             value={form.customer}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Customer ID *
//           </label>
//           <input
//             name="customerId"
//             placeholder="e.g., CUST-1001"
//             className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             onChange={handleChange}
//             value={form.customerId}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Invoice Date *
//           </label>
//           <input
//             name="date"
//             type="date"
//             className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             onChange={handleChange}
//             value={form.date}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Due Date *
//           </label>
//           <input
//             name="dueDate"
//             type="date"
//             className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             onChange={handleChange}
//             value={form.dueDate}
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Product/Service *
//         </label>
//         <input
//           name="product"
//           placeholder="Enter product or service name"
//           className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//           onChange={handleChange}
//           value={form.product}
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Quantity *
//           </label>
//           <input
//             name="quantity"
//             placeholder="e.g., 500 L"
//             className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             onChange={handleChange}
//             value={form.quantity}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Rate (₹) *
//           </label>
//           <input
//             name="rate"
//             type="number"
//             placeholder="Enter rate per unit"
//             className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//             onChange={handleChange}
//             value={form.rate}
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Notes
//         </label>
//         <textarea
//           name="notes"
//           placeholder="Add any additional notes..."
//           rows={3}
//           className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//           onChange={handleChange}
//           value={form.notes}
//         />
//       </div>
//     </div>

//     <div className="flex gap-3 mt-6">
//       <p
//         onClick={handleSubmit}
//         className=" flex border-2 px-10 py-2 mt-0.5 bg-black text-white cursor-pointer">
//         Create Invoice
//       </p>
//       <p
//         onClick={() => setShowModal(false)}
//         className="px-6 cursor-pointer bg-gray-200 text-gray-700 py-2.5 rounded-lg hover:bg-gray-300 font-medium transition-colors"
//       >
//         Cancel
//       </p>
//     </div>
//   </div>
// </div>
//       )}
//     </div>
//   );
// };

// export default Invoice;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus, X } from "lucide-react";

// const Invoice = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [warehouses, setWarehouses] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const [form, setForm] = useState({
//     customer: "",
//     customerId: "",
//     warehouse: "",
//     date: "",
//     dueDate: "",
//     product: "",
//     quantity: "",
//     rate: "",
//     notes: "",
//   });

//   /* ---------------- FETCH DATA ---------------- */

//   const fetchInvoices = async () => {
//     const res = await axios.get("http://localhost:5000/api/invoices");
//     setInvoices(res.data);
//   };

//   const fetchWarehouses = async () => {
//     const res = await axios.get("http://localhost:5000/api/warehouses");
//     setWarehouses(res.data);
//   };

//   useEffect(() => {
//     fetchInvoices();
//     fetchWarehouses();
//   }, []);

//   /* ---------------- FORM HANDLING ---------------- */

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

// const handleSubmit = async () => {
//   try {
//     await axios.post("http://localhost:5000/api/invoices", {
//       customer: form.customer,
//       customerId: form.customerId,
//       warehouseId: form.warehouse,
//       productName: form.product,
//       quantity: Number(form.quantity),
//       rate: Number(form.rate),
//       date: form.date,
//       dueDate: form.dueDate,
//       notes: form.notes,
//     });

//     setShowModal(false);
//     setForm({
//       customer: "",
//       customerId: "",
//       warehouse: "",
//       date: "",
//       dueDate: "",
//       product: "",
//       quantity: "",
//       rate: "",
//       notes: "",
//     });

//     fetchInvoices();
//   } catch (error) {
//     alert(error.response?.data?.message || "Invoice creation failed");
//     console.error(error);
//   }
// };

//   /* ---------------- UI ---------------- */

//   return (
//     <div className="p-6 min-h-screen mt-10">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Invoice Management</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
//         >
//           <Plus size={18} /> Add Invoice
//         </button>
//       </div>

//       {/* INVOICE TABLE */}
//       <div className="bg-white rounded-lg border overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Invoice Date</th>
//               <th className="p-3 text-left">Customer</th>
//               <th className="p-3 text-left">Warehouse</th>
//               <th className="p-3 text-left">Product</th>
//               <th className="p-3 text-right">Rate</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((inv) => (
//               <tr key={inv._id} className="border-b hover:bg-gray-100">
//                 <td className="p-3">{inv.date}</td>
//                 <td className="p-3">{inv.customer}</td>
//                 <td className="p-3">{inv.warehouseId?.warehouse}</td>

//                 <td className="p-3">{inv.productName}</td>
//                 <td className="p-3 text-right">₹{inv.rate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {invoices.length === 0 && (
//           <p className="text-center p-6 text-gray-500">
//             No invoices found
//           </p>
//         )}
//       </div>

//       {/* ADD INVOICE MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-2xl p-6 rounded-xl relative">

//             <X
//               className="absolute right-4 top-4 cursor-pointer"
//               onClick={() => setShowModal(false)}
//             />

//             <h2 className="text-2xl font-bold mb-4">
//               Create Invoice
//             </h2>
// {/*
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 name="customer"
//                 placeholder="Customer Name"
//                 className="input"
//                 onChange={handleChange}
//                 value={form.customer}
//               />

//               <input
//                 name="customerId"
//                 placeholder="Customer ID"
//                 className="input"
//                 onChange={handleChange}
//                 value={form.customerId}
//               />

//               <select
//                 name="warehouse"
//                 className="input col-span-2"
//                 onChange={handleChange}
//                 value={form.warehouse}
//               >
//                 <option value="">Select Warehouse</option>
//                 {warehouses.map((w) => (
//                   <option key={w._id} value={w.warehouse}>
//                     {w.warehouse}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="date"
//                 name="date"
//                 className="input"
//                 onChange={handleChange}
//                 value={form.date}
//               />

//               <input
//                 type="date"
//                 name="dueDate"
//                 className="input"
//                 onChange={handleChange}
//                 value={form.dueDate}
//               />

//               <input
//                 name="product"
//                 placeholder="Product"
//                 className="input col-span-2"
//                 onChange={handleChange}
//                 value={form.product}
//               />

//               <input
//                 name="quantity"
//                 placeholder="Quantity"
//                 className="input"
//                 onChange={handleChange}
//                 value={form.quantity}
//               />

//               <input
//                 name="rate"
//                 type="number"
//                 placeholder="Rate"
//                 className="input"
//                 onChange={handleChange}
//                 value={form.rate}
//               />

//               <textarea
//                 name="notes"
//                 placeholder="Notes"
//                 rows={3}
//                 className="input col-span-2"
//                 onChange={handleChange}
//                 value={form.notes}
//               />
//             </div> */}

//              <div className="space-y-4 overflow-y-auto max-h-[60vh]">

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Customer Name *
//                   </label>
//                   <input
//                     name="customer"
//                     placeholder="Enter customer name"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.customer}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Customer ID *
//                   </label>
//                   <input
//                     name="customerId"
//                     placeholder="e.g., CUST-1001"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.customerId}
//                   />
//                 </div>
//               </div>
//                <select
//   name="warehouse"
//   onChange={handleChange}
//   value={form.warehouse}
//   className="w-full border p-2.5 rounded-lg"
// >
//   <option value="">Select Warehouse</option>
//   {warehouses.map((w) => (
//     <option key={w._id} value={w._id}>
//       {w.warehouse}
//     </option>
//   ))}
// </select>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Invoice Date *
//                   </label>
//                   <input
//                     name="date"
//                     type="date"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.date}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Due Date *
//                   </label>
//                   <input
//                     name="dueDate"
//                     type="date"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.dueDate}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Product/Service *
//                 </label>
//                 <input
//                   name="product"
//                   placeholder="Enter product or service name"
//                   className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                   onChange={handleChange}
//                   value={form.product}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Quantity *
//                   </label>
//                   <input
//                     name="quantity"
//                     placeholder="e.g., 500 L"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.quantity}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Rate (₹) *
//                   </label>
//                   <input
//                     name="rate"
//                     type="number"
//                     placeholder="Enter rate per unit"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.rate}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notes
//                 </label>
//                 <textarea
//                   name="notes"
//                   placeholder="Add any additional notes..."
//                   rows={3}
//                   className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                   onChange={handleChange}
//                   value={form.notes}
//                 />
//               </div>
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="mt-5 w-full bg-black text-white py-2 rounded"
//             >
//               Save Invoice
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Invoice;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    customer: "",
    customerId: "",
    phone: "",
    address: "",
    gstin: "",
    pan: "",
    state: "",
    placeOfSupply: "",

    bankName: "",
    bankAccount: "",
    ifsc: "",

    warehouse: "",
    date: "",
    dueDate: "",
    product: "",
    quantity: "",
    rate: "",
    notes: "",
    shippingDetails: {
  shippingDate: "",
  grossWeight: "",
  netWeight: "",
  additionalNote: "",
},

  });

  /* ================= FETCH DATA ================= */

  const fetchInvoices = async () => {
    const res = await axios.get("http://localhost:5000/api/invoices");
    setInvoices(res.data);
  };

  const fetchWarehouses = async () => {
    const res = await axios.get("http://localhost:5000/api/warehouses");
    setWarehouses(res.data);
  };

  useEffect(() => {
    fetchInvoices();
    fetchWarehouses();
  }, []);

  /* ================= FORM HANDLING ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/invoices", {
        customer: form.customer,
        customerId: form.customerId,
        phone: form.phone,
        address: form.address,
        gstin: form.gstin,
        pan: form.pan,
        state: form.state,
        placeOfSupply: form.placeOfSupply,

        bankDetails: {
          bankName: form.bankName,
          accountNo: form.bankAccount,
          ifsc: form.ifsc,
        },

        warehouseId: form.warehouse,
        productName: form.product,
        quantity: Number(form.quantity),
        unit: form.unit,
        rate: Number(form.rate),
        date: form.date,
        dueDate: form.dueDate,
        notes: form.notes,
        shippingDetails: {
          shippingDate: form.shippingDetails.shippingDate,
          grossWeight: form.grossWeight,
          netWeight: form.netWeight,
          additionalNote: form.additionalNote,
        },  
      });

      setShowModal(false);
      setForm({
        customer: "",
        customerId: "",
        phone: "",
        address: "",
        gstin: "",
        pan: "",
        state: "",
        placeOfSupply: "",
        bankName: "",
        bankAccount: "",
        ifsc: "",
        warehouse: "",
        date: "",
        dueDate: "",
        product: "",
        quantity: "",
        unit: "",
        rate: "",
        notes: "",
      });

      fetchInvoices();
    } catch (error) {
      alert(error.response?.data?.message || "Invoice creation failed");
      console.error(error);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 min-h-screen mt-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Invoice Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          <Plus size={18} /> Add Invoice
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Warehouse</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-right">Bank Details(Name,Acc,IFSC)</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{inv.date?.slice(0, 10)}</td>
                <td className="p-3">{inv.customer}</td>
                <td className="p-3">{inv.warehouseId?.warehouse}</td>
                <td className="p-3">{inv.productName}</td>
                
                <td className="p-3 text-right font-semibold">
                  ₹{inv.totalAmount}
                </td>
                {/* <th className="flex fext-col"> */}
                  <td className="p-3 text-center">{inv.bankDetails?.bankName},{inv.bankDetails?.accountNo},{inv.bankDetails?.ifsc}</td>
                  {/* <td className="p-3 text-center">{inv.bankDetails?.accountNo},</td>
                  <td className="p-3 text-center">{inv.bankDetails?.ifsc}</td> */}
                {/* </th> */}
               
                
                <td className="p-3 text-right">
                  <button
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/api/invoices/${inv._id}/download`,
                        "_blank"
                      )
                    }
                    className="text-blue-600 underline"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoices.length === 0 && (
          <p className="text-center p-6 text-gray-500">No invoices found</p>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-xl relative overflow-y-auto max-h-[90vh]">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            />

            <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>

            {/* CUSTOMER DETAILS */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="customer"
                placeholder="Customer Name *"
                className="input border-2 rounded py-2 px-2"
                onChange={handleChange}
                value={form.customer}
              />
              <input
                name="customerId"
                placeholder="Customer ID *"
                className="input border-2 rounded-xl px-2 py-2"
                onChange={handleChange}
                value={form.customerId}
              />
              <input
                name="phone"
                placeholder="Phone"
                className="input border-2 rounded py-2 px-2"
                onChange={handleChange}
                value={form.phone}
              />
              <input
                name="state"
                placeholder="State"
                className="input border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.state}
              />
              <input
                name="gstin"
                placeholder="GSTIN"
                className="input border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.gstin}
              />
              <input
                name="pan"
                placeholder="PAN"
                className="input border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.pan}
              />
            </div>
          <div className="gap-3 grid grid-cols-2 ">
            <input
              name="address"
              placeholder="Address"
              className="input border-2 rounded mt-3 px-2 py-2"
              onChange={handleChange}
              value={form.address}
            />
            <input
              name="placeOfSupply"
              placeholder="Place of Supply"
              className="input mt-3 border-2 rounded px-2 py-2"
              onChange={handleChange}
              value={form.placeOfSupply}
            />
          </div>

            {/* BANK */}
            <div className="grid grid-cols-3 gap-4 mt-3">
              <input
                name="bankName"
                placeholder="Bank Name"
                className="input border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.bankName}
              />
              <input
                name="bankAccount"
                placeholder="Account No"
                className="input border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.bankAccount}
              />
              <input
                name="ifsc"
                placeholder="IFSC"
                className="input border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.ifsc}
              />
            </div>

            {/* INVOICE */}
            <select
              name="warehouse"
              className="input border-2 rounded mt-3 px-2 py-2 w-176"
              onChange={handleChange}
              value={form.warehouse}
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.warehouse}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <input
                type="date"
                name="date"
                className="input border-2 rounded px-2 "
                onChange={handleChange}
                value={form.date}
              />
              
               <input
              name="product"
              placeholder="Product Name"
              className="input mt-3 border-2 rounded px-2 py-2"
              onChange={handleChange}
              value={form.product}
            />
            </div>

           

            <div className="grid grid-cols-3 gap-4 mt-3">
              <input
                name="quantity"
                placeholder="Quantity"
                className="input border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.quantity}
              />
              <input
                name="unit"
                placeholder="Unit"
                className="input border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.unit}
              />
              <input
                name="rate"
                type="number"
                placeholder="Rate"
                className="input border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.rate}
              />
            </div>

            <textarea
              name="notes"
              placeholder="Notes"
              rows={3}
              className="input mt-3 border-2 rounded px-2 py-2 w-176"
              onChange={handleChange}
              value={form.notes}
            />
            {/* SHIPPING DETAILS */}
<div className="mt-6 border rounded-lg p-4">
  <h3 className="text-lg font-semibold mb-3">Shipping Details</h3>

  <div className="grid grid-cols-3 gap-4">
    <input
      type="date"
      name="shippingDetails.shippingDate"
      className="border px-3 py-2 rounded"
      onChange={handleChange}
      value={form.shippingDetails.shippingDate}
    />

    <input
      name="shippingDetails.grossWeight"
      placeholder="Gross Weight"
      className="border px-3 py-2 rounded"
      onChange={handleChange}
      value={form.shippingDetails.grossWeight}
    />

    <input
      name="shippingDetails.netWeight"
      placeholder="Net Weight"
      className="border px-3 py-2 rounded"
      onChange={handleChange}
      value={form.shippingDetails.netWeight}
    />
  </div>

  <textarea
    name="shippingDetails.additionalNote"
    placeholder="Additional Shipping Note"
    rows={3}
    className="border px-3 py-2 rounded w-full mt-4"
    onChange={handleChange}
    value={form.shippingDetails.additionalNote}
  />
</div>


            <button
              onClick={handleSubmit}
              className="mt-5 w-full bg-black text-white py-2 rounded"
            >
              Save Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
