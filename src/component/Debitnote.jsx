// import React, { useState } from "react";
// import {
//   FileMinus,
//   Download,
//   Printer,
//   Search,
//   Plus,
//   Eye,
//   AlertTriangle,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const Debitnote = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterReason, setFilterReason] = useState("All");
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   /* ================= SUMMARY ================= */
//   const summary = {
//     totalDebitNotes: 18,
//     totalAmount: 365000,
//     thisMonth: 98000,
//     pending: 42000,
//   };

//   /* ================= REASON DISTRIBUTION ================= */
//   const reasonData = [
//     { name: "Short Payment", value: 145000 },
//     { name: "Excess Credit Given", value: 82000 },
//     { name: "Tax Adjustment", value: 68000 },
//     { name: "Penalty / Charges", value: 70000 },
//   ];

//   /* ================= MONTHLY TREND ================= */
//   const monthlyTrend = [
//     { month: "Aug", amount: 45000 },
//     { month: "Sep", amount: 52000 },
//     { month: "Oct", amount: 61000 },
//     { month: "Nov", amount: 73000 },
//     { month: "Dec", amount: 86000 },
//     { month: "Jan", amount: 98000 },
//   ];

//   /* ================= HARD CODED DEBIT NOTES ================= */
//   const debitNotes = [
//     {
//       id: 1,
//       debitNoteNo: "DN-2026-0018",
//       date: "2026-01-06",
//       invoiceRef: "INV-2026-0152",
//       customerName: "ChemTrade Solutions",
//       customerId: "CUST-1001",
//       gstin: "27ABCDE1234F1Z5",
//       reason: "Short Payment",
//       items: [
//         {
//           description: "Outstanding balance adjustment",
//           hsn: "N/A",
//           qty: 1,
//           rate: 42000,
//           amount: 42000,
//         },
//       ],
//       subtotal: 42000,
//       tax: 7560,
//       totalAmount: 49560,
//       status: "Pending",
//       remarks: "Customer paid partial amount against invoice",
//     },
//     {
//       id: 2,
//       debitNoteNo: "DN-2026-0017",
//       date: "2026-01-04",
//       invoiceRef: "INV-2025-0148",
//       customerName: "Industrial Polymers Ltd",
//       customerId: "CUST-1002",
//       gstin: "27GHIJK5678L2M6",
//       reason: "Tax Adjustment",
//       items: [
//         {
//           description: "GST differential charged",
//           hsn: "GST",
//           qty: 1,
//           rate: 18000,
//           amount: 18000,
//         },
//       ],
//       subtotal: 18000,
//       tax: 3240,
//       totalAmount: 21240,
//       status: "Approved",
//       remarks: "Incorrect tax rate applied earlier",
//     },
//     {
//       id: 3,
//       debitNoteNo: "DN-2026-0016",
//       date: "2026-01-02",
//       invoiceRef: "INV-2025-0139",
//       customerName: "PharmaChem Industries",
//       customerId: "CUST-1003",
//       gstin: "27NOPQR9012S3T7",
//       reason: "Penalty / Charges",
//       items: [
//         {
//           description: "Late payment penalty",
//           hsn: "N/A",
//           qty: 1,
//           rate: 25000,
//           amount: 25000,
//         },
//       ],
//       subtotal: 25000,
//       tax: 4500,
//       totalAmount: 29500,
//       status: "Approved",
//       remarks: "Late payment beyond credit period",
//     },
//   ];

//   const COLORS = ["#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

//   /* ================= FILTER ================= */
//   const filteredNotes = debitNotes.filter((note) => {
//     const matchesSearch =
//       note.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       note.debitNoteNo.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesReason =
//       filterReason === "All" || note.reason === filterReason;

//     return matchesSearch && matchesReason;
//   });

//   const openModal = (note) => {
//     setSelectedNote(note);
//     setShowModal(true);
//   };
//    const [showCreateForm, setShowCreateForm] = useState(false);
  
//   const [formData, setFormData] = useState({
//     date: "",
//     customer: "",
//     invoiceRef: "",
//     reason: "",
//     amount: "",
//     status: "Pending",
//   });

//   return (
//     <div className="p-6 mt-10 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* HEADER */}
//         <div>
//           <h1 className="text-3xl font-bold flex items-center gap-3">
//             <FileMinus className="text-red-600" size={36} />
//             Debit Notes
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Debit notes raised for additional charges, short payments, or tax
//             adjustments
//           </p>
//         </div>

//         {/* SUMMARY */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {[
//             { label: "Total Debit Notes", value: summary.totalDebitNotes },
//             { label: "Total Amount", value: `₹${summary.totalAmount}` },
//             { label: "This Month", value: `₹${summary.thisMonth}` },
//             { label: "Pending", value: `₹${summary.pending}` },
//           ].map((item, i) => (
//             <div key={i} className="bg-white p-5 rounded-lg shadow">
//               <p className="text-sm text-gray-600">{item.label}</p>
//               <p className="text-2xl font-bold text-red-600">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* CHARTS */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="font-semibold mb-4">Debit Note Reasons</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={reasonData}
//                   dataKey="value"
//                   outerRadius={90}
//                   label
//                 >
//                   {reasonData.map((_, i) => (
//                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="font-semibold mb-4">Monthly Debit Trend</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={monthlyTrend}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="amount" fill="#ef4444" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* SEARCH & ACTION */}
//         <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 items-center">
//           <div className="relative flex-1 min-w-[250px]">
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//             <input
//               className="w-full pl-10 pr-4 py-2 border rounded-lg"
//               placeholder="Search debit note or customer"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <button 
//           onClick={() => setShowCreateForm(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg">
//             <Plus size={18} />
//             Create Debit Note
//           </button>
//         </div>

//         {showCreateForm && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
      
//       {/* Header */}
//       <div className="p-4 bg-orange-600 text-white flex justify-between items-center">
//         <h2 className="text-xl font-bold">Create Credit Note</h2>
//         <button
//           onClick={() => setShowCreateForm(false)}
//           className="text-2xl font-bold"
//         >
//           ×
//         </button>
//       </div>

//       {/* Form */}
//       <form className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">

//         {/* Date */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Date</label>
//           <input
//             type="date"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
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
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Invoice Ref */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Invoice Ref</label>
//           <input
//             type="text"
//             placeholder="INV-2026-XXXX"
//             value={formData.invoiceRef}
//             onChange={(e) => setFormData({ ...formData, invoiceRef: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Reason */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Reason</label>
//           <select
//             value={formData.reason}
//             onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           >
//             <option value="">Select Reason</option>
//             <option value="Product Return">Product Return</option>
//             <option value="Price Adjustment">Price Adjustment</option>
//             <option value="Damaged Goods">Damaged Goods</option>
//             <option value="Discount Given">Discount Given</option>
//           </select>
//         </div>

//         {/* Amount */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Amount (₹)</label>
//           <input
//             type="number"
//             placeholder="Enter Amount"
//             value={formData.amount}
//             onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Status */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Status</label>
//           <select
//             value={formData.status}
//             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Approved">Approved</option>
//           </select>
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
//               console.log("New Credit Note:", formData);
//               alert("Credit Note Created (Mock)");
//               setShowCreateForm(false);
//             }}
//             className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}

//         {/* TABLE */}
//         <div className="bg-white rounded-lg shadow overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-red-600 text-white">
//               <tr>
//                 <th className="p-3 text-left">Debit No</th>
//                 <th className="p-3">Date</th>
//                 <th className="p-3">Customer</th>
//                 <th className="p-3">Invoice</th>
//                 <th className="p-3">Reason</th>
//                 <th className="p-3 text-right">Amount</th>
//                 <th className="p-3 text-center">Status</th>
//                 <th className="p-3 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredNotes.map((note) => (
//                 <tr key={note.id} className="border-b hover:bg-gray-50">
//                   <td className="p-3 font-mono text-red-700">
//                     {note.debitNoteNo}
//                   </td>
//                   <td className="p-3">{note.date}</td>
//                   <td className="p-3">{note.customerName}</td>
//                   <td className="p-3 text-blue-600">{note.invoiceRef}</td>
//                   <td className="p-3">{note.reason}</td>
//                   <td className="p-3 text-right font-semibold">
//                     ₹{note.totalAmount}
//                   </td>
//                   <td className="p-3 text-center">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         note.status === "Approved"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {note.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-center">
//                     <button onClick={() => openModal(note)}>
//                       <Eye size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* MODAL */}
//         {showModal && selectedNote && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg max-w-2xl w-full p-6">
//               <h2 className="text-xl font-bold mb-4">
//                 {selectedNote.debitNoteNo}
//               </h2>
//               <p className="text-sm text-gray-600 mb-2">
//                 {selectedNote.remarks}
//               </p>

//               <div className="flex justify-end gap-3 mt-6">
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
//                   <Printer size={16} /> Print
//                 </button>
//                 <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
//                   <Download size={16} /> Download
//                 </button>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="bg-gray-200 px-4 py-2 rounded"
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

// export default Debitnote;



// import React, { useState } from 'react';
// import { FileText, Download, Printer, RefreshCw, Search, Filter, Calendar, Plus, Eye, AlertCircle } from 'lucide-react';
// import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const Creditnote = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterReason, setFilterReason] = useState('All');
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Summary data
//   const summary = {
//     totalCreditNotes: 28,
//     totalAmount: 485000,
//     thisMonth: 125000,
//     pending: 45000
//   };

//   // Credit note reasons distribution
//   const reasonData = [
//     { name: 'Product Return', value: 185000, count: 12 },
//     { name: 'Price Adjustment', value: 120000, count: 8 },
//     { name: 'Damaged Goods', value: 95000, count: 5 },
//     { name: 'Discount Given', value: 85000, count: 3 }
//   ];

//   // Monthly trend
//   const monthlyTrend = [
//     { month: 'Aug', amount: 65000 },
//     { month: 'Sep', amount: 78000 },
//     { month: 'Oct', amount: 92000 },
//     { month: 'Nov', amount: 115000 },
//     { month: 'Dec', amount: 108000 },
//     { month: 'Jan', amount: 125000 }
//   ];

//   // Hardcoded credit notes data
//   const creditNotes = [
//     {
//       id: 1,
//       creditNoteNo: 'CN-2026-0028',
//       date: '2026-01-05',
//       invoiceRef: 'INV-2026-0145',
//       invoiceDate: '2025-12-28',
//       customerName: 'ChemTrade Solutions',
//       customerId: 'CUST-1001',
//       gstin: '27ABCDE1234F1Z5',
//       reason: 'Product Return',
//       items: [
//         {
//           id: 1,
//           description: 'Hydrochloric Acid 35% (Returned)',
//           hsn: '2806',
//           qty: 100,
//           unit: 'Liters',
//           rate: 450,
//           amount: 45000
//         }
//       ],
//       subtotal: 45000,
//       tax: 8100,
//       totalAmount: 53100,
//       status: 'Approved',
//       approvedBy: 'Ramesh Gupta',
//       remarks: 'Product returned due to quality issues - Batch HCL-2025-042'
//     },
//     {
//       id: 2,
//       creditNoteNo: 'CN-2026-0027',
//       date: '2026-01-04',
//       invoiceRef: 'INV-2026-0138',
//       invoiceDate: '2025-12-22',
//       customerName: 'Industrial Polymers Ltd',
//       customerId: 'CUST-1002',
//       gstin: '27GHIJK5678L2M6',
//       reason: 'Price Adjustment',
//       items: [
//         {
//           id: 1,
//           description: 'Ethanol 95% - Price Correction',
//           hsn: '2207',
//           qty: 500,
//           unit: 'Liters',
//           rate: 30,
//           amount: 15000
//         }
//       ],
//       subtotal: 15000,
//       tax: 2700,
//       totalAmount: 17700,
//       status: 'Approved',
//       approvedBy: 'Vijay Mehta',
//       remarks: 'Price adjustment as per negotiated contract terms'
//     },
//     {
//       id: 3,
//       creditNoteNo: 'CN-2026-0026',
//       date: '2026-01-03',
//       invoiceRef: 'INV-2025-0152',
//       invoiceDate: '2025-12-20',
//       customerName: 'PharmaChem Industries',
//       customerId: 'CUST-1003',
//       gstin: '27NOPQR9012S3T7',
//       reason: 'Damaged Goods',
//       items: [
//         {
//           id: 1,
//           description: 'Isopropyl Alcohol 99% (Damaged drums)',
//           hsn: '2905',
//           qty: 150,
//           unit: 'Liters',
//           rate: 220,
//           amount: 33000
//         }
//       ],
//       subtotal: 33000,
//       tax: 5940,
//       totalAmount: 38940,
//       status: 'Approved',
//       approvedBy: 'Ramesh Gupta',
//       remarks: 'Damaged during transit - Insurance claim filed'
//     },
//     {
//       id: 4,
//       creditNoteNo: 'CN-2026-0025',
//       date: '2026-01-02',
//       invoiceRef: 'INV-2025-0148',
//       invoiceDate: '2025-12-18',
//       customerName: 'TechChem Solutions',
//       customerId: 'CUST-1004',
//       gstin: '27UVWXY3456Z4A8',
//       reason: 'Discount Given',
//       items: [
//         {
//           id: 1,
//           description: 'Year-end discount - Bulk purchase',
//           hsn: 'N/A',
//           qty: 1,
//           unit: 'LS',
//           rate: 25000,
//           amount: 25000
//         }
//       ],
//       subtotal: 25000,
//       tax: 4500,
//       totalAmount: 29500,
//       status: 'Approved',
//       approvedBy: 'Vijay Mehta',
//       remarks: 'Special year-end discount for bulk annual purchase'
//     },
//     {
//       id: 5,
//       creditNoteNo: 'CN-2025-0024',
//       date: '2025-12-30',
//       invoiceRef: 'INV-2025-0142',
//       invoiceDate: '2025-12-15',
//       customerName: 'BioTech Research Ltd',
//       customerId: 'CUST-1005',
//       gstin: '27BCDEF7890G5H9',
//       reason: 'Product Return',
//       items: [
//         {
//           id: 1,
//           description: 'Titanium Dioxide Pigment (Wrong grade)',
//           hsn: '3206',
//           qty: 50,
//           unit: 'Kilograms',
//           rate: 680,
//           amount: 34000
//         }
//       ],
//       subtotal: 34000,
//       tax: 6120,
//       totalAmount: 40120,
//       status: 'Approved',
//       approvedBy: 'Ramesh Gupta',
//       remarks: 'Wrong grade supplied - Anatase instead of Rutile'
//     },
//     {
//       id: 6,
//       creditNoteNo: 'CN-2025-0023',
//       date: '2025-12-28',
//       invoiceRef: 'INV-2025-0135',
//       invoiceDate: '2025-12-10',
//       customerName: 'Green Chemicals Ltd',
//       customerId: 'CUST-1008',
//       gstin: '27IJKLM1234N6O0',
//       reason: 'Price Adjustment',
//       items: [
//         {
//           id: 1,
//           description: 'Citric Acid - Pricing error correction',
//           hsn: '2918',
//           qty: 100,
//           unit: 'Kilograms',
//           rate: 50,
//           amount: 5000
//         }
//       ],
//       subtotal: 5000,
//       tax: 900,
//       totalAmount: 5900,
//       status: 'Approved',
//       approvedBy: 'Vijay Mehta',
//       remarks: 'Billing error - Charged premium price instead of standard'
//     },
//     {
//       id: 7,
//       creditNoteNo: 'CN-2025-0022',
//       date: '2025-12-26',
//       invoiceRef: 'INV-2025-0130',
//       invoiceDate: '2025-12-08',
//       customerName: 'Apex Chemical Works',
//       customerId: 'CUST-1009',
//       gstin: '27PQRST5678U7V1',
//       reason: 'Damaged Goods',
//       items: [
//         {
//           id: 1,
//           description: 'Glycerol 99% (Leakage)',
//           hsn: '2905',
//           qty: 80,
//           unit: 'Liters',
//           rate: 385,
//           amount: 30800
//         }
//       ],
//       subtotal: 30800,
//       tax: 5544,
//       totalAmount: 36344,
//       status: 'Approved',
//       approvedBy: 'Ramesh Gupta',
//       remarks: 'Container leakage during storage - 80L affected'
//     },
//     {
//       id: 8,
//       creditNoteNo: 'CN-2025-0021',
//       date: '2025-12-24',
//       invoiceRef: 'INV-2025-0128',
//       invoiceDate: '2025-12-05',
//       customerName: 'Metro Paints & Coatings',
//       customerId: 'CUST-1012',
//       gstin: '27WXYZ9012A8B2',
//       reason: 'Product Return',
//       items: [
//         {
//           id: 1,
//           description: 'Carbon Black (Specification mismatch)',
//           hsn: '2803',
//           qty: 60,
//           unit: 'Kilograms',
//           rate: 380,
//           amount: 22800
//         }
//       ],
//       subtotal: 22800,
//       tax: 4104,
//       totalAmount: 26904,
//       status: 'Pending',
//       approvedBy: null,
//       remarks: 'Awaiting quality test report for final approval'
//     },
//     {
//       id: 9,
//       creditNoteNo: 'CN-2025-0020',
//       date: '2025-12-22',
//       invoiceRef: 'INV-2025-0125',
//       invoiceDate: '2025-12-03',
//       customerName: 'Synergy Chemicals',
//       customerId: 'CUST-1014',
//       gstin: '27CDEFG3456H9I3',
//       reason: 'Discount Given',
//       items: [
//         {
//           id: 1,
//           description: 'Prompt payment discount - 2%',
//           hsn: 'N/A',
//           qty: 1,
//           unit: 'LS',
//           rate: 18290,
//           amount: 18290
//         }
//       ],
//       subtotal: 18290,
//       tax: 3292,
//       totalAmount: 21582,
//       status: 'Approved',
//       approvedBy: 'Vijay Mehta',
//       remarks: '2% prompt payment discount as per terms'
//     },
//     {
//       id: 10,
//       creditNoteNo: 'CN-2025-0019',
//       date: '2025-12-20',
//       invoiceRef: 'INV-2025-0120',
//       invoiceDate: '2025-11-28',
//       customerName: 'United Chemicals Corp',
//       customerId: 'CUST-1011',
//       gstin: '27JKLMN7890O0P4',
//       reason: 'Price Adjustment',
//       items: [
//         {
//           id: 1,
//           description: 'Toluene 99% - Volume discount',
//           hsn: '2902',
//           qty: 200,
//           unit: 'Liters',
//           rate: 25,
//           amount: 5000
//         }
//       ],
//       subtotal: 5000,
//       tax: 900,
//       totalAmount: 5900,
//       status: 'Approved',
//       approvedBy: 'Ramesh Gupta',
//       remarks: 'Volume discount applied retrospectively'
//     }
//   ];

//   const COLORS = ['#ef4444', '#f59e0b', '#8b5cf6', '#3b82f6'];

//   // Filter credit notes
//   const filteredNotes = creditNotes.filter(note => {
//     const matchesSearch = note.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          note.creditNoteNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          note.invoiceRef.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterReason === 'All' || note.reason === filterReason;
//     return matchesSearch && matchesFilter;
//   });

//   const handleViewDetails = (note) => {
//     setSelectedNote(note);
//     setShowModal(true);
//   };

//   const [showCreateForm, setShowCreateForm] = useState(false);

// const [formData, setFormData] = useState({
//   date: "",
//   customer: "",
//   invoiceRef: "",
//   reason: "",
//   amount: "",
//   status: "Pending",
// });


//   return (
//     <div className="p-6 mt-10 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
//             <RefreshCw className="text-orange-600" size={36} />
//             Credit Notes
//           </h1>
//           <p className="text-gray-600 mt-1">Manage credit notes issued to customers for returns, adjustments, and discounts</p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Credit Notes</p>
//                 <p className="text-2xl font-bold text-gray-800">{summary.totalCreditNotes}</p>
//               </div>
//               <FileText className="text-orange-600" size={40} />
//             </div>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Amount</p>
//                 <p className="text-2xl font-bold text-orange-600">₹{(summary.totalAmount / 100000).toFixed(2)}L</p>
//               </div>
//               <AlertCircle className="text-orange-600" size={40} />
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
//                 <p className="text-sm text-gray-600">Pending Approval</p>
//                 <p className="text-2xl font-bold text-yellow-600">₹{(summary.pending / 100000).toFixed(2)}L</p>
//               </div>
//               <AlertCircle className="text-yellow-600" size={40} />
//             </div>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           {/* Reason Distribution */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Credit Note Reasons</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={reasonData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {reasonData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Monthly Trend */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Monthly Credit Note Trend</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={monthlyTrend}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
//                 <Legend />
//                 <Bar dataKey="amount" fill="#f97316" name="Credit Amount" />
//               </BarChart>
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
//                   placeholder="Search by customer, credit note no, or invoice..."
//                   className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => setFilterReason('All')}
//                 className={`px-4 py-2 rounded-lg font-medium ${filterReason === 'All' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => setFilterReason('Product Return')}
//                 className={`px-4 py-2 rounded-lg font-medium text-sm ${filterReason === 'Product Return' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//               >
//                 Returns
//               </button>
//               <button
//                 onClick={() => setFilterReason('Price Adjustment')}
//                 className={`px-4 py-2 rounded-lg font-medium text-sm ${filterReason === 'Price Adjustment' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//               >
//                 Adjustments
//               </button>
//               <button
//                 onClick={() => setFilterReason('Damaged Goods')}
//                 className={`px-4 py-2 rounded-lg font-medium text-sm ${filterReason === 'Damaged Goods' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//               >
//                 Damaged
//               </button>
//               <button
//                 onClick={() => setFilterReason('Discount Given')}
//                 className={`px-4 py-2 rounded-lg font-medium text-sm ${filterReason === 'Discount Given' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//               >
//                 Discounts
//               </button>
//             </div>

//             <button 
//             onClick={() => setShowCreateForm(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
//               <Plus size={20} />
//               Create Credit Note
//             </button>
//           </div>
//         </div>
//         {showCreateForm && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
      
//       {/* Header */}
//       <div className="p-4 bg-orange-600 text-white flex justify-between items-center">
//         <h2 className="text-xl font-bold">Create Credit Note</h2>
//         <button
//           onClick={() => setShowCreateForm(false)}
//           className="text-2xl font-bold"
//         >
//           ×
//         </button>
//       </div>

//       {/* Form */}
//       <form className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">

//         {/* Date */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Date</label>
//           <input
//             type="date"
//             value={formData.date}
//             onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
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
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Invoice Ref */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Invoice Ref</label>
//           <input
//             type="text"
//             placeholder="INV-2026-XXXX"
//             value={formData.invoiceRef}
//             onChange={(e) => setFormData({ ...formData, invoiceRef: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Reason */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Reason</label>
//           <select
//             value={formData.reason}
//             onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           >
//             <option value="">Select Reason</option>
//             <option value="Product Return">Product Return</option>
//             <option value="Price Adjustment">Price Adjustment</option>
//             <option value="Damaged Goods">Damaged Goods</option>
//             <option value="Discount Given">Discount Given</option>
//           </select>
//         </div>

//         {/* Amount */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Amount (₹)</label>
//           <input
//             type="number"
//             placeholder="Enter Amount"
//             value={formData.amount}
//             onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Status */}
//         <div>
//           <label className="text-sm font-medium text-gray-600">Status</label>
//           <select
//             value={formData.status}
//             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Approved">Approved</option>
//           </select>
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
//               console.log("New Credit Note:", formData);
//               alert("Credit Note Created (Mock)");
//               setShowCreateForm(false);
//             }}
//             className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}


//         {/* Credit Notes Table */}
//         {/* Credit Notes Table */}
// <div className="bg-white rounded-lg shadow overflow-hidden w-full">
//   <div className="overflow-x-auto">
//     <table className="min-w-full">
//       <thead className="bg-orange-600 text-white">
//         <tr>
//           <th className="p-3 text-left whitespace-nowrap">Credit Note No</th>
//           <th className="p-3 text-left whitespace-nowrap">Date</th>
//           <th className="p-3 text-left whitespace-nowrap">Customer</th>
//           <th className="p-3 text-left whitespace-nowrap">Invoice Ref</th>
//           <th className="p-3 text-left whitespace-nowrap">Reason</th>
//           <th className="p-3 text-right whitespace-nowrap">Amount</th>
//           <th className="p-3 text-center whitespace-nowrap">Status</th>
//           <th className="p-3 text-center whitespace-nowrap">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredNotes.map((note) => (
//           <tr key={note.id} className="border-b hover:bg-gray-50">
//             <td className="p-3 font-mono font-semibold text-orange-700">
//               {note.creditNoteNo}
//             </td>
//             <td className="p-3">{note.date}</td>
//             <td className="p-3">
//               <div className="font-medium">{note.customerName}</div>
//               <div className="text-xs text-gray-500">{note.customerId}</div>
//             </td>
//             <td className="p-3 font-mono text-blue-600">{note.invoiceRef}</td>
//             <td className="p-3">{note.reason}</td>
//             <td className="p-3 text-right font-semibold">
//               ₹{note.totalAmount.toLocaleString('en-IN')}
//             </td>
//             <td className="p-3 text-center">{note.status}</td>
//             <td className="p-3 text-center">
//               <Eye className="inline text-blue-600 cursor-pointer" />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>


//         {/* Credit Note Details Modal */}
//         {showModal && selectedNote && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b bg-orange-600 text-white">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-2xl font-bold">Credit Note</h2>
//                     <p className="text-orange-100">{selectedNote.creditNoteNo}</p>
//                   </div>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="text-white hover:text-gray-200"
//                   >
//                     <span className="text-2xl">×</span>
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {/* Header Info */}
//                 <div className="grid grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label className="text-sm text-gray-600">Credit Note Date</label>
//                     <p className="font-semibold">{selectedNote.date}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600">Status</label>
//                     <p className={`font-semibold ${selectedNote.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>
//                       {selectedNote.status}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600">Original Invoice</label>
//                     <p className="font-semibold text-blue-600">{selectedNote.invoiceRef}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm text-gray-600">Invoice Date</label>
//                     <p className="font-medium">{selectedNote.invoiceDate}</p>
//                   </div>
//                 </div>

//                 {/* Customer Details */}
//                 <div className="border-t pt-4 mb-4">
//                   <h3 className="font-semibold text-gray-800 mb-3">Customer Details</h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-sm text-gray-600">Customer Name</label>
//                       <p className="font-medium">{selectedNote.customerName}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600">Customer ID</label>
//                       <p className="font-medium">{selectedNote.customerId}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600">GSTIN</label>
//                       <p className="font-medium">{selectedNote.gstin}</p>
//                     </div>
//                     <div>
//                       <label className="text-sm text-gray-600">Reason</label>
//                       <p className="font-medium text-orange-700">{selectedNote.reason}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Items */}
//                 <div className="border-t pt-4 mb-4">
//                   <h3 className="font-semibold text-gray-800 mb-3">Credit Note Items</h3>
//                   <table className="w-full text-sm">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="p-2 text-left">Description</th>
//                         <th className="p-2 text-center">HSN</th>
//                         <th className="p-2 text-right">Qty</th>
//                         <th className="p-2 text-right">Rate</th>
//                         <th className="p-2 text-right">Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedNote.items.map((item) => (
//                         <tr key={item.id} className="border-b">
//                           <td className="p-2">{item.description}</td>
//                           <td className="p-2 text-center">{item.hsn}</td>
//                           <td className="p-2 text-right">{item.qty} {item.unit}</td>
//                           <td className="p-2 text-right">₹{item.rate.toLocaleString('en-IN')}</td>
//                           <td className="p-2 text-right font-semibold">₹{item.amount.toLocaleString('en-IN')}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>

//                   {/* Totals */}
//                   <div className="mt-4 flex justify-end">
//                     <div className="w-80">
//                       <div className="flex justify-between py-2 text-sm border-b">
//                         <span className="text-gray-700">Subtotal</span>
//                         <span className="font-semibold">₹{selectedNote.subtotal.toLocaleString('en-IN')}</span>
//                       </div>
//                       <div className="flex justify-between py-2 text-sm border-b">
//                         <span className="text-gray-700">GST (18%)</span>
//                         <span className="font-semibold">₹{selectedNote.tax.toLocaleString('en-IN')}</span>
//                       </div>
//                       <div className="flex justify-between py-3 text-lg font-bold bg-orange-50 px-3 rounded mt-2">
//                         <span className="text-orange-900">Total Credit Amount</span>
//                         <span className="text-orange-900">₹{selectedNote.totalAmount.toLocaleString('en-IN')}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Remarks */}
//                 <div className="border-t pt-4 mb-4">
//                   <label className="text-sm text-gray-600">Remarks</label>
//                   <p className="font-medium bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">{selectedNote.remarks}</p>
//                 </div>

//                 {/* Approval */}
//                 {selectedNote.approvedBy && (
//                   <div className="border-t pt-4">
//                     <label className="text-sm text-gray-600">Approved By</label>
//                     <p className="font-medium">{selectedNote.approvedBy}</p>
//                   </div>
//                 )}

//                 {/* Declaration */}
//                 <div className="border-t pt-4 mt-4">
//                   <p className="text-xs text-gray-600 italic">
//                     This credit note is issued as per the reason stated above. The amount will be adjusted against future invoices or refunded as per customer preference.
//                   </p>
//                 </div>
//               </div>

//               <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
//                   <Printer size={18} />
//                   Print
//                 </button>
//                 <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
//                   <Download size={18} />
//                   Download
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

// export default Creditnote;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const API = "http://localhost:5000/api/debit-notes";

export default function CreditNote() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    ms: "",
    address: "",
    contactPerson: "",
    phone: "",
    gstin: "",
    placeOfSupply: "",
    docType: "",
    dnType: "",
    dnNo: "",
    dnDate: "",
    invoiceNo: "",
    invoiceDate: "",
    challanNo: "",
    challanDate: "",
    lrNo: "",
    eWayNo: "",
    deliveryMode: "",
    amount: "",
  });

  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.ms || !form.dnNo || !form.invoiceNo || !form.amount) {
      alert("Required fields missing");
      return;
    }
    await axios.post(API, form);
    setShowForm(false);
    setForm({});
    fetchNotes();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Debit Notes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg flex gap-2"
        >
          <Plus /> Add Note
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3 text-left">DN No</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((n) => (
              <tr key={n._id} className="border-b">
                <td className="p-3 font-mono">{n.dnNo}</td>
                <td className="p-3">{n.ms}</td>
                <td className="p-3">{n.invoiceNo}</td>
                <td className="p-3 text-right">₹{n.amount}</td>
                <td className="p-3">{n.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl">

            <h2 className="text-xl font-bold mb-4">Create Debit Note</h2>

            <div className="grid grid-cols-2 gap-4">
              <input name="ms" placeholder="M/S *" onChange={handleChange} className="border p-2" />
              <input name="dnNo" placeholder="D.N. No *" onChange={handleChange} className="border p-2" />
              <input type="date" name="dnDate" onChange={handleChange} className="border p-2" />
              <input name="invoiceNo" placeholder="Invoice No *" onChange={handleChange} className="border p-2" />
              <input type="date" name="invoiceDate" onChange={handleChange} className="border p-2" />
              <input name="placeOfSupply" placeholder="Place of Supply *" onChange={handleChange} className="border p-2" />
              <input name="amount" placeholder="Amount *" onChange={handleChange} className="border p-2" />
              <input name="deliveryMode" placeholder="Delivery Mode" onChange={handleChange} className="border p-2" />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-orange-600 text-white rounded">
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
