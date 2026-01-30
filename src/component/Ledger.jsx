// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Delete, Edit } from 'lucide-react';

// const emptyForm = {
//   _id: null,
//   clientName: '',
//   phone: '',
//   email: '',
//   location: '',
//   totalQuantity: '',
//   unit: '',
// };

// const Ledger = () => {
//   const [clients, setClients] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [loading, setLoading] = useState(false);
//   const [invoices, setInvoices] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [showAlerts, setShowAlerts] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format

//   /* ======================
//      Fetch clients
//   ====================== */
//   const fetchClients = async () => {
//     const res = await axios.get('https://aevix-chemical-mpbw.vercel.app/api/clients');
//     setClients(res.data);
//   };

//   /* ======================
//      Fetch invoices
//   ====================== */
//   const fetchInvoices = async () => {
//     try {
//       const res = await axios.get('https://aevix-chemical-mpbw.vercel.app/api/invoices');
//       setInvoices(res.data);
//     } catch (err) {
//       console.error('Failed to fetch invoices:', err);
//     }
//   };

//   useEffect(() => {
//     fetchClients();
//     fetchInvoices();
//   }, []);

//   // Debug: Log invoices when they change
//   useEffect(() => {
//     if (invoices.length > 0) {
//       console.log('Invoices loaded:', invoices);
//       console.log('Sample invoice:', invoices[0]);
//     }
//   }, [invoices]);

//   /* ======================
//      Handle input
//   ====================== */
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   /* ======================
//      Save / Update client
//   ====================== */
//   const handleSave = async () => {
//     if (!form.clientName || !form.phone) {
//       alert('Client name & phone required');
//       return;
//     }

//     setLoading(true);

//     try {
//       if (form._id) {
//         // UPDATE
//         await axios.put(
//           `https://aevix-chemical-mpbw.vercel.app/api/clients/${form._id}`,
//           form
//         );
//       } else {
//         // CREATE
//         await axios.post(
//           'https://aevix-chemical-mpbw.vercel.app/api/clients',
//           form
//         );
//       }

//       setShowForm(false);
//       setForm(emptyForm);
//       fetchClients();
//     } catch (err) {
//       alert('Operation failed');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ======================
//      Edit client
//   ====================== */
//   const handleEdit = (client) => {
//     setForm(client);
//     setShowForm(true);
//   };

//   /* ======================
//      Delete client
//   ====================== */
//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this client?')) return;

//     try {
//       await axios.delete(
//         `https://aevix-chemical-mpbw.vercel.app/api/clients/${id}`
//       );
//       fetchClients();
//     } catch (err) {
//       alert('Delete failed');
//       console.error(err);
//     }
//   };

//   /* ======================
//      Calculate monthly invoice quantity for a client
//   ====================== */
//   const getMonthlyInvoiceQuantity = (clientName, month) => {
//     // Filter invoices by client name and month
//     const [year, monthNum] = month.split('-');

//     const monthlyInvoices = invoices.filter(invoice => {
//       if (!invoice.date) return false;

//       // Handle both string and Date formats
//       const invoiceDate = new Date(invoice.date);
//       const invoiceYear = invoiceDate.getFullYear();
//       const invoiceMonth = String(invoiceDate.getMonth() + 1).padStart(2, '0');

//       // Match by customer name (case insensitive) and date
//       const customerMatch = invoice.customer &&
//         invoice.customer.toLowerCase().trim() === clientName.toLowerCase().trim();

//       return (
//         customerMatch &&
//         String(invoiceYear) === year &&
//         invoiceMonth === monthNum
//       );
//     });

//     // Sum up quantities
//     const totalQuantity = monthlyInvoices.reduce((sum, inv) => {
//       return sum + (parseFloat(inv.quantity) || 0);
//     }, 0);

//     return {
//       totalQuantity,
//       invoiceCount: monthlyInvoices.length,
//       invoices: monthlyInvoices
//     };
//   };

//   /* ======================
//      Check monthly invoice quantities against ledger
//   ====================== */
//   const checkMonthlyQuantities = () => {
//     const newAlerts = [];

//     clients.forEach(client => {
//       const monthlyData = getMonthlyInvoiceQuantity(client.clientName, selectedMonth);
//       const ledgerQuantity = parseFloat(client.totalQuantity) || 0;
//       const invoiceQuantity = monthlyData.totalQuantity;
//       const percentage = ledgerQuantity > 0 ? ((invoiceQuantity / ledgerQuantity) * 100).toFixed(1) : 0;

//       if (monthlyData.invoiceCount > 0 || ledgerQuantity > 0) {
//         if (invoiceQuantity > ledgerQuantity) {
//           // Exceeded ledger quantity
//           newAlerts.push({
//             type: 'exceeded',
//             client: client.clientName,
//             ledgerQuantity,
//             invoiceQuantity,
//             difference: invoiceQuantity - ledgerQuantity,
//             percentage,
//             unit: client.unit || '',
//             invoiceCount: monthlyData.invoiceCount,
//             month: selectedMonth
//           });
//         } else if (invoiceQuantity > 0) {
//           // Within ledger quantity
//           newAlerts.push({
//             type: 'safe',
//             client: client.clientName,
//             ledgerQuantity,
//             invoiceQuantity,
//             remaining: ledgerQuantity - invoiceQuantity,
//             percentage,
//             unit: client.unit || '',
//             invoiceCount: monthlyData.invoiceCount,
//             month: selectedMonth
//           });
//         }
//       }
//     });

//     setAlerts(newAlerts);
//     setShowAlerts(true);
//   };

//   /* ======================
//      Get status for display in table
//   ====================== */
//   const getClientMonthlyStatus = (client) => {
//     const monthlyData = getMonthlyInvoiceQuantity(client.clientName, selectedMonth);
//     const ledgerQuantity = parseFloat(client.totalQuantity) || 0;
//     const invoiceQuantity = monthlyData.totalQuantity;

//     if (monthlyData.invoiceCount === 0) {
//       return {
//         type: 'none',
//         text: 'No invoices',
//         invoiceQuantity: 0,
//         ledgerQuantity,
//         percentage: 0
//       };
//     }

//     // Calculate percentage based on ledger quantity (monthly target)
//     const percentage = ledgerQuantity > 0
//       ? ((invoiceQuantity / ledgerQuantity) * 100).toFixed(1)
//       : 0;

//     if (invoiceQuantity > ledgerQuantity) {
//       return {
//         type: 'exceeded',
//         text: `${percentage}% (Over by ${(invoiceQuantity - ledgerQuantity).toFixed(2)})`,
//         percentage,
//         invoiceQuantity,
//         ledgerQuantity,
//         exceeded: invoiceQuantity - ledgerQuantity
//       };
//     } else {
//       return {
//         type: 'safe',
//         text: `${percentage}% used`,
//         percentage,
//         invoiceQuantity,
//         ledgerQuantity,
//         remaining: ledgerQuantity - invoiceQuantity
//       };
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen mt-15">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Client Ledger</h1>

//         <div className="flex gap-3 items-center">
//           <div className="flex items-center gap-2">
//             <label className="text-sm font-medium">Month:</label>
//             <input
//               type="month"
//               value={selectedMonth}
//               onChange={(e) => setSelectedMonth(e.target.value)}
//               className="border px-3 py-2 rounded-lg"
//             />
//           </div>
//           <button
//             onClick={checkMonthlyQuantities}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Monthly Status
//           </button>
//           <button
//             onClick={() => {
//               setForm(emptyForm);
//               setShowForm(true);
//             }}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             + Add Client
//           </button>
//         </div>
//       </div>

//       {/* ALERTS MODAL */}
//       {showAlerts && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-3xl relative max-h-[85vh] overflow-y-auto">
//             <button
//               onClick={() => setShowAlerts(false)}
//               className="absolute top-3 right-3 text-red-500 text-xl font-bold hover:text-red-700"
//             >
//               ✕
//             </button>

//             <h2 className="text-xl font-semibold mb-2">Monthly Quantity Report</h2>
//             <p className="text-sm text-gray-600 mb-4">
//               Comparing invoice quantities vs ledger quantities for {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//             </p>

//             {alerts.length === 0 ? (
//               <p className="text-center p-8 text-gray-500">No invoices found for this month.</p>
//             ) : (
//               <div className="space-y-3">
//                 {alerts.map((alert, idx) => (
//                   <div
//                     key={idx}
//                     className={`p-4 rounded-lg border-l-4 ${
//                       alert.type === 'exceeded'
//                         ? 'bg-red-50 border-red-500'
//                         : 'bg-green-50 border-green-500'
//                     }`}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-800 text-lg">{alert.client}</h3>
//                         <div className="mt-2 space-y-1 text-sm">
//                           <p className="text-gray-700">
//                             <strong>Ledger Quantity (Monthly Target):</strong> {alert.ledgerQuantity} {alert.unit}
//                           </p>
//                           <p className="text-gray-700">
//                             <strong>Invoice Quantity (This Month):</strong> {alert.invoiceQuantity.toFixed(2)} {alert.unit}
//                           </p>
//                           <p className="text-gray-700">
//                             <strong>Total Invoices:</strong> {alert.invoiceCount}
//                           </p>
//                           <p className="text-gray-700">
//                             <strong>Usage Percentage:</strong> {alert.percentage}%
//                           </p>

//                           {alert.type === 'exceeded' ? (
//                             <p className="text-red-700 font-semibold mt-2">
//                               ⚠️ EXCEEDED LEDGER by {alert.difference.toFixed(2)} {alert.unit}
//                             </p>
//                           ) : (
//                             <p className="text-green-700 font-semibold mt-2">
//                               ✓ Within limit. Remaining: {alert.remaining.toFixed(2)} {alert.unit}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-bold ${
//                           alert.type === 'exceeded'
//                             ? 'bg-red-200 text-red-800'
//                             : 'bg-green-200 text-green-800'
//                         }`}
//                       >
//                         {alert.type === 'exceeded' ? 'EXCEEDED' : 'SAFE'}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={() => setShowAlerts(false)}
//                 className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* FORM MODAL */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute top-3 right-3 text-red-500 text-xl"
//             >
//               ✕
//             </button>

//             <h2 className="text-lg font-semibold mb-4">
//               {form._id ? 'Edit Client' : 'Add Client'}
//             </h2>

//             <div className="grid grid-cols-1 gap-3">
//               <input name="clientName" placeholder="Client Name" className="input border-2 rounded px-2 py-2" value={form.clientName} onChange={handleChange} />
//               <input name="phone" placeholder="Phone" className="input border-2 rounded px-2 py-2" value={form.phone} onChange={handleChange} />
//               <input name="email" placeholder="Email" className="input border-2 rounded px-2 py-2" value={form.email} onChange={handleChange} />
//               <input name="location" placeholder="Location" className="input border-2 rounded px-2 py-2" value={form.location} onChange={handleChange} />

//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   name="totalQuantity"
//                   placeholder="Ledger Quantity (Monthly Target)"
//                   className="input border-2 rounded px-2 py-2 w-full"
//                   value={form.totalQuantity}
//                   onChange={handleChange}
//                 />

//                 <select name="unit" className="input border-2 rounded px-2 py-2 w-full" value={form.unit} onChange={handleChange}>
//                   <option value="">Unit</option>
//                   <option>Kg</option>
//                   <option>Litre</option>
//                   <option>Ton</option>
//                   <option>Pieces</option>
//                 </select>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">This quantity serves as the monthly target for this client</p>
//             </div>

//             <div className="flex justify-end gap-2 mt-6">
//               <button onClick={() => setShowForm(false)} className="border px-4 py-2 rounded">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={loading}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 {loading ? 'Saving...' : 'Save'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CLIENT TABLE */}
//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 border">Client</th>
//               <th className="p-2 border">Phone</th>
//               <th className="p-2 border">Email</th>
//               <th className="p-2 border">Location</th>
//               <th className="p-2 border">Ledger Qty (Target)</th>
//               <th className="p-2 border">Monthly Invoice Qty</th>
//               <th className="p-2 border">Status (% Used)</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {clients.map((c) => {
//               const status = getClientMonthlyStatus(c);
//               return (
//                 <tr
//                   key={c._id}
//                   className={status.type === 'exceeded' ? 'bg-red-50' : status.type === 'safe' ? 'bg-green-50' : ''}
//                 >
//                   <td className="p-2 border font-medium">{c.clientName}</td>
//                   <td className="p-2 border">{c.phone}</td>
//                   <td className="p-2 border">{c.email}</td>
//                   <td className="p-2 border">{c.location}</td>
//                   <td className="p-2 border font-semibold text-blue-700">
//                     {c.totalQuantity} {c.unit}
//                   </td>
//                   <td className="p-2 border font-medium">
//                     {status.type !== 'none' ? (
//                       <span className="font-medium">
//                         {status.invoiceQuantity?.toFixed(2) || '0.00'} {c.unit}
//                       </span>
//                     ) : (
//                       <span className="text-gray-400">-</span>
//                     )}
//                   </td>
//                   <td className="p-2 border w-10">
//                     {status.type === 'exceeded' && (
//                       <span className="px-1 py-1 rounded-full text-xs font-bold bg-red-200 text-red-800">
//                         ⚠️ {status.text}
//                       </span>
//                     )}
//                     {status.type === 'safe' && (
//                       <span className="px-1 py-1 rounded-full text-xs font-bold bg-green-200 text-green-800">
//                         ✓ {status.text}
//                       </span>
//                     )}
//                     {status.type === 'none' && (
//                       <span className="text-gray-400 text-xs">{status.text}</span>
//                     )}
//                   </td>
//                   <td className="p-2 border">
//                     <div className="flex gap-2 justify-center">
//                       <button
//                         onClick={() => handleEdit(c)}
//                         className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
//                       >
//                         <Edit/>
//                       </button>
//                       <button
//                         onClick={() => handleDelete(c._id)}
//                         className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
//                       >
//                         <Delete/>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {clients.length === 0 && (
//           <p className="text-center p-6 text-gray-500">
//             No clients added yet.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Ledger;

// import React, { useState } from "react";
// import axios from "axios";

// const Ledger = () => {
//   const [customer, setCustomer] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [ledgerData, setLedgerData] = useState([]);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ================= RECOMMENDED CUSTOMER ================= */
//   const fetchCustomers = async (q) => {
//     if (q.length < 2) {
//       setSuggestions([]);
//       return;
//     }

//     const res = await axios.get(
//       `https://aevix-chemical-mpbw.vercel.app/api/leads?search=${q}`
//     );
//     setSuggestions(res.data);
//   };

//   /* ================= SEARCH ================= */
//   const fetchLedger = async () => {
//     if (!customer) return alert("Select customer");

//     setLoading(true);
//     try {
//       const res = await axios.get(
//         "https://aevix-chemical-mpbw.vercel.app/api/invoices/ledger",
//         {
//           params: {
//             customer,
//             ...(from && { from }),
//             ...(to && { to }),
//           },
//         }
//       );
//       setLedgerData(res.data);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Ledger fetch failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= RUNNING BALANCE ================= */
//   let runningBalance = 0;

//   return (
//     <div className="p-6 mt-10">
//       <h1 className="text-3xl font-bold mb-6">Customer Ledger</h1>

//       {/* SEARCH + FILTER BAR */}
//       <div className="flex flex-wrap gap-4 mb-6 items-end">
//         {/* CUSTOMER SEARCH */}
//         <div className="relative w-72">
//           <label className="text-sm font-medium">Customer</label>
//           <input
//             value={customer}
//             onChange={(e) => {
//               setCustomer(e.target.value);
//               fetchCustomers(e.target.value);
//             }}
//             placeholder="Customer Name"
//             className="border px-3 py-2 rounded w-full"
//           />

//           {suggestions.length > 0 && (
//             <div className="absolute bg-white border w-full z-50 max-h-48 overflow-y-auto">
//               {suggestions.map((c) => (
//                 <div
//                   key={c._id}
//                   onClick={() => {
//                     setCustomer(c.customerName);
//                     setSuggestions([]);
//                   }}
//                   className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//                 >
//                   <p className="font-medium">{c.customerName}</p>
//                   <p className="text-xs text-gray-500">
//                     {c.customerId} • {c.phone}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* FROM DATE */}
//         <div>
//           <label className="text-sm font-medium">From</label>
//           <input
//             type="date"
//             value={from}
//             onChange={(e) => setFrom(e.target.value)}
//             className="border px-3 py-2 rounded"
//           />
//         </div>

//         {/* TO DATE */}
//         <div>
//           <label className="text-sm font-medium">To</label>
//           <input
//             type="date"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="border px-3 py-2 rounded"
//           />
//         </div>

//         {/* SEARCH */}
//         <button
//           onClick={fetchLedger}
//           className="bg-black text-white px-6 py-2 rounded"
//         >
//           Search
//         </button>

//         {/* CLEAR */}
//         <button
//           onClick={() => {
//             setCustomer("");
//             setFrom("");
//             setTo("");
//             setLedgerData([]);
//             setSuggestions([]);
//           }}
//           className="bg-gray-200 px-4 py-2 rounded"
//         >
//           Clear
//         </button>
//       </div>

//       {/* LEDGER TABLE */}
//       <div className="border rounded overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="p-3">Invoice Date</th>
//               <th className="p-3">Invoice No</th>
//               <th className="p-3 text-right">Total</th>
//               <th className="p-3 text-right">Paid</th>
//               <th className="p-3 text-right">Balance</th>
//               <th className="p-3">Payment Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {ledgerData.map((inv) => {
//               const paid = inv.payment?.paidAmount || 0;
//               const remaining = inv.totalAmount - paid;
//               runningBalance += remaining;

//               return (
//                 <tr key={inv._id} className="border-b">
//                   <td className="p-3">{inv.date?.slice(0, 10)}</td>
//                   <td className="p-3">INV-{inv._id.slice(-5)}</td>
//                   <td className="p-3 text-right">₹{inv.totalAmount}</td>
//                   <td className="p-3 text-right">₹{paid}</td>
//                   <td className="p-3 text-right font-semibold">
//                     ₹{runningBalance}
//                   </td>
//                   <td className="p-3">
//                     {inv.payment?.paymentDate
//                       ? inv.payment.paymentDate.slice(0, 10)
//                       : "-"}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {!loading && ledgerData.length === 0 && (
//           <p className="p-6 text-center text-gray-500">
//             No invoices found
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Ledger;

import React, { useState } from "react";
import axios from "axios";

const Ledger = () => {
  const [customer, setCustomer] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ledgerData, setLedgerData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= RECOMMENDED CUSTOMER ================= */
  const fetchCustomers = async (q) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await axios.get(
      `https://aevix-chemical-mpbw.vercel.app/api/leads?search=${q}`,
    );
    setSuggestions(res.data);
  };

  /* ================= SEARCH ================= */
  const fetchLedger = async () => {
    if (!customer) return alert("Select customer");

    setLoading(true);
    try {
      const res = await axios.get(
        "https://aevix-chemical-mpbw.vercel.app/api/invoices/ledger",
        {
          params: {
            customer,
            ...(from && { from }),
            ...(to && { to }),
          },
        },
      );
      setLedgerData(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Ledger fetch failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RUNNING BALANCE ================= */
  let runningBalance = 0;

  return (
    <div className="p-4 md:p-6 mt-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Customer Ledger</h1>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 items-end">
        {/* CUSTOMER */}
        <div className="relative col-span-1 sm:col-span-2">
          <label className="text-sm font-medium">Customer</label>
          <input
            value={customer}
            onChange={(e) => {
              setCustomer(e.target.value);
              fetchCustomers(e.target.value);
            }}
            placeholder="Customer Name"
            className="border px-3 py-2 rounded w-full"
          />

          {suggestions.length > 0 && (
            <div className="absolute bg-white border w-full z-50 max-h-48 overflow-y-auto">
              {suggestions.map((c) => (
                <div
                  key={c._id}
                  onClick={() => {
                    setCustomer(c.customerName);
                    setSuggestions([]);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <p className="font-medium">{c.customerName}</p>
                  <p className="text-xs text-gray-500">
                    {c.customerId} • {c.phone}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* TO */}
        <div>
          <label className="text-sm font-medium">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={fetchLedger}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Search
          </button>

          <button
            onClick={() => {
              setCustomer("");
              setFrom("");
              setTo("");
              setLedgerData([]);
              setSuggestions([]);
            }}
            className="bg-gray-200 px-4 py-2 rounded w-full"
          >
            Clear
          </button>
        </div>
      </div>

      {/* ================= LEDGER TABLE ================= */}
      <div className="border rounded overflow-x-auto">
        <table className="min-w-200 w-full text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Invoice Date</th>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-right">Paid</th>
              <th className="p-3 text-right">Balance</th>
              <th className="p-3 text-left">Payment Date</th>
            </tr>
          </thead>

          <tbody>
            {ledgerData.map((inv) => {
              const paid = inv.payment?.paidAmount || 0;
              const remaining = inv.totalAmount - paid;
              runningBalance += remaining;

              return (
                <tr key={inv._id} className="border-b">
                  <td className="p-3">{inv.date?.slice(0, 10)}</td>
                  <td className="p-3">INV-{inv._id.slice(-5)}</td>
                  <td className="p-3 text-right">₹{inv.totalAmount}</td>
                  <td className="p-3 text-right">₹{paid}</td>
                  <td className="p-3 text-right font-semibold">
                    ₹{runningBalance}
                  </td>
                  <td className="p-3">
                    {inv.payment?.paymentDate
                      ? inv.payment.paymentDate.slice(0, 10)
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!loading && ledgerData.length === 0 && (
          <p className="p-6 text-center text-gray-500">No invoices found</p>
        )}
      </div>
    </div>
  );
};

export default Ledger;
