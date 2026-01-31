// // import React from "react";
// // import { Phone, Mail, User, CalendarCheck } from "lucide-react";

// // const leadsData = [
// //   {
// //     id: 1,
// //     name: "Rahul Sharma",
// //     company: "Sharma Traders",
// //     email: "rahul@sharmatraders.com",
// //     phone: "+91 98765 43210",
// //     status: "New",
// //     owner: "Aisha",
// //     nextFollowUp: "2026-01-10",
// //   },
// //   {
// //     id: 2,
// //     name: "Neha Verma",
// //     company: "Verma Enterprises",
// //     email: "neha@vermaent.com",
// //     phone: "+91 91234 56789",
// //     status: "In Progress",
// //     owner: "John",
// //     nextFollowUp: "2026-01-08",
// //   },
// //   {
// //     id: 3,
// //     name: "Amit Patel",
// //     company: "Patel Gems",
// //     email: "amit@patelgems.in",
// //     phone: "+91 99887 66554",
// //     status: "Converted",
// //     owner: "Rahul",
// //     nextFollowUp: "-",
// //   },
// //   {
// //     id: 4,
// //     name: "Sneha Roy",
// //     company: "Roy Jewellers",
// //     email: "sneha@royjewels.com",
// //     phone: "+91 90123 45678",
// //     status: "Lost",
// //     owner: "Neha",
// //     nextFollowUp: "-",
// //   },
// // ];

// // const statusColor = {
// //   New: "bg-blue-100 text-blue-700",
// //   "In Progress": "bg-yellow-100 text-yellow-700",
// //   Converted: "bg-emerald-100 text-emerald-700",
// //   Lost: "bg-red-100 text-red-700",
// // };

// // export default function Leads() {
// //   return (
// //     <div className="p-6 mt-10">
// //       {/* Header */}
// //       <div className="mb-6">
// //         <h1 className="text-2xl font-semibold text-black">
// //           Leads Management
// //         </h1>
// //         <p className="text-gray-600">
// //           Track potential customers and sales opportunities
// //         </p>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// //         <div className="bg-white p-4 rounded-xl shadow">
// //           <p className="text-sm text-gray-500">Total Leads</p>
// //           <h3 className="text-2xl font-bold text-black">24</h3>
// //         </div>
// //         <div className="bg-white p-4 rounded-xl shadow">
// //           <p className="text-sm text-gray-500">New</p>
// //           <h3 className="text-2xl font-bold text-blue-600">8</h3>
// //         </div>
// //         <div className="bg-white p-4 rounded-xl shadow">
// //           <p className="text-sm text-gray-500">Converted</p>
// //           <h3 className="text-2xl font-bold text-emerald-600">10</h3>
// //         </div>
// //         <div className="bg-white p-4 rounded-xl shadow">
// //           <p className="text-sm text-gray-500">Lost</p>
// //           <h3 className="text-2xl font-bold text-red-600">6</h3>
// //         </div>
// //       </div>

// //       {/* Leads Table */}
// //       <div className="bg-white rounded-xl shadow overflow-hidden">
// //         <table className="min-w-full text-sm">
// //           <thead className="bg-slate-100 text-gray-600">
// //             <tr>
// //               <th className="px-4 py-3 text-left">Lead</th>
// //               <th className="px-4 py-3 text-left">Contact</th>
// //               <th className="px-4 py-3 text-left">Status</th>
// //               <th className="px-4 py-3 text-left">Owner</th>
// //               <th className="px-4 py-3 text-left">Next Follow-up</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {leadsData.map((lead) => (
// //               <tr
// //                 key={lead.id}
// //                 className="border-t hover:bg-slate-50"
// //               >
// //                 <td className="px-4 py-3">
// //                   <p className="font-medium text-black">
// //                     {lead.name}
// //                   </p>
// //                   <p className="text-gray-500 text-xs">
// //                     {lead.company}
// //                   </p>
// //                 </td>

// //                 <td className="px-4 py-3 space-y-1">
// //                   <div className="flex items-center gap-2">
// //                     <Mail size={14} />
// //                     {lead.email}
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <Phone size={14} />
// //                     {lead.phone}
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3">
// //                   <span
// //                     className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[lead.status]}`}
// //                   >
// //                     {lead.status}
// //                   </span>
// //                 </td>

// //                 <td className="px-4 py-3 flex items-center gap-2">
// //                   <User size={14} />
// //                   {lead.owner}
// //                 </td>

// //                 <td className="px-4 py-3 flex items-center gap-2">
// //                   <CalendarCheck size={14} />
// //                   {lead.nextFollowUp}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Phone, Mail, User, CalendarCheck, Plus, X } from "lucide-react";

// // const statusColor = {
// //   New: "bg-blue-100 text-blue-700",
// //   "In Progress": "bg-yellow-100 text-yellow-700",
// //   Converted: "bg-emerald-100 text-emerald-700",
// //   Lost: "bg-red-100 text-red-700",
// // };

// // export default function Leads() {
// //   const [leads, setLeads] = useState([]);
// //   const [showModal, setShowModal] = useState(false);

// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     status: "New",
// //     owner: "",
// //     followUpDate: "",
// //   });

// //   /* FETCH LEADS */
// //   const fetchLeads = async () => {
// //     const res = await axios.get("https://aevix-chemical-mpbw.vercel.app/api/leads");
// //     setLeads(res.data);
// //   };

// //   useEffect(() => {
// //     fetchLeads();
// //   }, []);

// //   /* HANDLE FORM */
// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await axios.post("https://aevix-chemical-mpbw.vercel.app/api/leads", form);
// //     setShowModal(false);
// //     setForm({
// //       name: "",
// //       email: "",
// //       phone: "",
// //       status: "New",
// //       owner: "",
// //       followUpDate: "",
// //     });
// //     fetchLeads();
// //   };

// //   return (
// //     <div className="p-6 mt-10">
// //       {/* HEADER */}
// //       <div className="flex justify-between items-center mb-6">
// //         <div>
// //           <h1 className="text-2xl font-semibold text-black">
// //             Leads Management
// //           </h1>
// //           <p className="text-gray-600">
// //             Track potential customers and sales opportunities
// //           </p>
// //         </div>

// //         <button
// //           onClick={() => setShowModal(true)}
// //           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
// //         >
// //           <Plus size={16} />
// //           Add Lead
// //         </button>
// //       </div>

// //       {/* LEADS TABLE */}
// //       <div className="bg-white rounded-xl shadow overflow-hidden">
// //         <table className="min-w-full text-sm">
// //           <thead className="bg-slate-100 text-gray-600">
// //             <tr>
// //               <th className="px-4 py-3 text-left">Lead</th>
// //               <th className="px-4 py-3 text-left">Contact</th>
// //               <th className="px-4 py-3 text-left">Status</th>
// //               <th className="px-4 py-3 text-left">Owner</th>
// //               <th className="px-4 py-3 text-left">Next Follow-up</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {leads.map((lead) => (
// //               <tr key={lead._id} className="border-t hover:bg-slate-50">
// //                 <td className="px-4 py-3">
// //                   <p className="font-medium text-black">{lead.name}</p>
// //                 </td>

// //                 <td className="px-4 py-3 space-y-1">
// //                   <div className="flex items-center gap-2">
// //                     <Mail size={14} />
// //                     {lead.email}
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <Phone size={14} />
// //                     {lead.phone}
// //                   </div>
// //                 </td>

// //                 <td className="px-4 py-3">
// //                   <span
// //                     className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[lead.status]}`}
// //                   >
// //                     {lead.status}
// //                   </span>
// //                 </td>

// //                 <td className="px-4 py-3 flex items-center gap-2">
// //                   <User size={14} />
// //                   {lead.owner}
// //                 </td>

// //                 <td className="px-4 py-3 flex items-center gap-2">
// //                   <CalendarCheck size={14} />
// //                   {lead.followUpDate
// //                     ? new Date(lead.followUpDate).toLocaleDateString()
// //                     : "-"}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* MODAL */}
// //       {showModal && (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
// //           <div className="bg-white w-full max-w-md p-6 rounded-xl relative">
// //             <X
// //               className="absolute right-4 top-4 cursor-pointer"
// //               onClick={() => setShowModal(false)}
// //             />

// //             <h2 className="text-xl font-bold mb-4">Add Lead</h2>

// //             <form onSubmit={handleSubmit} className="space-y-3">
// //               <input
// //                 name="name"
// //                 placeholder="Lead Name"
// //                 className="w-full border px-3 py-2 rounded"
// //                 onChange={handleChange}
// //                 required
// //               />

// //               <input
// //                 name="email"
// //                 placeholder="Email"
// //                 className="w-full border px-3 py-2 rounded"
// //                 onChange={handleChange}
// //                 required
// //               />

// //               <input
// //                 name="phone"
// //                 placeholder="Phone"
// //                 className="w-full border px-3 py-2 rounded"
// //                 onChange={handleChange}
// //                 required
// //               />

// //               <select
// //                 name="status"
// //                 className="w-full border px-3 py-2 rounded"
// //                 onChange={handleChange}
// //               >
// //                 <option>New</option>
// //                 <option>In Progress</option>
// //                 <option>Converted</option>
// //                 <option>Lost</option>
// //               </select>

// //               <input
// //                 name="owner"
// //                 placeholder="Owner"
// //                 className="w-full border px-3 py-2 rounded"
// //                 onChange={handleChange}
// //                 required
// //               />

// //               <input
// //                 type="date"
// //                 name="followUpDate"
// //                 className="w-full border px-3 py-2 rounded"
// //                 onChange={handleChange}
// //               />

// //               <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
// //                 Save Lead
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Phone,
//   User,
//   MapPin,
//   Plus,
//   X,
//   CreditCard,
//   Pencil,
//   Trash2,
// } from "lucide-react";
// import { API_URL } from "../config/api";

// export default function Leads() {
//   const [leads, setLeads] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState({
//     customerName: "",
//     customerId: "",
//     phone: "",
//     address: "",
//     state: "",
//     gstin: "",
//     pan: "",
//     placeOfSupply: "",
//   });

//   /* ================= FETCH LEADS ================= */

//   const fetchLeads = async () => {
//     const res = await axios.get(`${API_URL}/api/leads`);
//     setLeads(res.data);
//   };

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   /* ================= FORM HANDLING ================= */

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const resetForm = () => {
//     setForm({
//       customerName: "",
//       customerId: "",
//       phone: "",
//       address: "",
//       state: "",
//       gstin: "",
//       pan: "",
//       placeOfSupply: "",
//     });
//     setEditingId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingId) {
//       // UPDATE
//       await axios.put(
//         `${API_URL}/api/leads/${editingId}`,
//         form
//       );
//     } else {
//       // CREATE
//       await axios.post("${API_URL}/api/leads", form);
//     }

//     setShowModal(false);
//     resetForm();
//     fetchLeads();
//   };

//   /* ================= EDIT ================= */

//   const handleEdit = (lead) => {
//     setForm({
//       customerName: lead.customerName || "",
//       customerId: lead.customerId || "",
//       phone: lead.phone || "",
//       address: lead.address || "",
//       state: lead.state || "",
//       gstin: lead.gstin || "",
//       pan: lead.pan || "",
//       placeOfSupply: lead.placeOfSupply || "",
//     });

//     setEditingId(lead._id);
//     setShowModal(true);
//   };

//   /* ================= DELETE ================= */

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this customer?")) return;

//     await axios.delete(`${API_URL}/api/leads/${id}`);
//     fetchLeads();
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="p-6 mt-10">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold text-black">
//             Customer Leads
//           </h1>
//           <p className="text-gray-600">
//             Manage customer and tax-related information
//           </p>
//         </div>

//         <button
//           onClick={() => {
//             resetForm();
//             setShowModal(true);
//           }}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           <Plus size={16} />
//           Add Customer
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
//   <div className="overflow-x-auto">
//     <table className="min-w-full text-sm text-gray-700">
//       {/* TABLE HEAD */}
//       <thead className="bg-indigo-600 sticky top-0 z-10 text-white">
//         <tr className="text-xs uppercase tracking-wide text-white">
//           <th className="px-4 py-3 text-left">Customer</th>
//           <th className="px-4 py-3 text-left">Customer ID</th>
//           <th className="px-4 py-3 text-left">Phone</th>
//           <th className="px-4 py-3 text-left">Address</th>
//           <th className="px-4 py-3 text-left">State</th>
//           <th className="px-4 py-3 text-left">GSTIN</th>
//           <th className="px-4 py-3 text-left">PAN</th>
//           <th className="px-4 py-3 text-left">Place of Supply</th>
//           <th className="px-4 py-3 text-right">Actions</th>
//         </tr>
//       </thead>

//       {/* TABLE BODY */}
//       <tbody className="divide-y">
//         {leads.map((lead, index) => (
//           <tr
//             key={lead._id}
//             className={`transition ${
//               index % 2 === 0 ? "bg-white" : "bg-slate-50"
//             } hover:bg-blue-50`}
//           >
//             {/* CUSTOMER */}
//             <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
//               <User size={14} className="text-blue-600" />
//               {lead.customerName}
//             </td>

//             <td className="px-4 py-3 font-mono text-xs">
//               {lead.customerId}
//             </td>

//             <td className="px-4 py-3 flex items-center gap-2">
//               <Phone size={14} className="text-green-600" />
//               {lead.phone}
//             </td>

//             <td className="px-4 py-3 max-w-[200px] truncate">
//               {lead.address || "-"}
//             </td>

//             <td className="px-4 py-3">
//               {lead.state || "-"}
//             </td>

//             <td className="px-4 py-3 flex items-center gap-2">
//               <CreditCard size={14} className="text-purple-600" />
//               {lead.gstin || "-"}
//             </td>

//             <td className="px-4 py-3">
//               {lead.pan || "-"}
//             </td>

//             <td className="px-4 py-3 flex items-center gap-2">
//               <MapPin size={14} className="text-orange-600" />
//               {lead.placeOfSupply}
//             </td>

//             {/* ACTIONS */}
//             <td className="px-4 py-3 text-right">
//               <div className="flex justify-end gap-2">
//                 <button
//                   onClick={() => handleEdit(lead)}
//                   className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition"
//                   title="Edit"
//                 >
//                   <Pencil size={16} />
//                 </button>

//                 <button
//                   onClick={() => handleDelete(lead._id)}
//                   className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
//                   title="Delete"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))}

//         {/* EMPTY STATE */}
//         {leads.length === 0 && (
//           <tr>
//             <td
//               colSpan="9"
//               className="text-center py-10 text-gray-400"
//             >
//               No customers found
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>

//       {/* ================= MODAL ================= */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-md p-6 rounded-xl relative">
//             <X
//               className="absolute right-4 top-4 cursor-pointer"
//               onClick={() => setShowModal(false)}
//             />

//             <h2 className="text-xl font-bold mb-4">
//               {editingId ? "Edit Customer" : "Add Customer"}
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 name="customerName"
//                 placeholder="Customer Name"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.customerName}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 name="customerId"
//                 placeholder="Customer ID"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.customerId}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 name="phone"
//                 placeholder="Phone"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.phone}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 name="address"
//                 placeholder="Address"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.address}
//                 onChange={handleChange}
//               />

//               <input
//                 name="state"
//                 placeholder="State"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.state}
//                 onChange={handleChange}
//               />

//               <input
//                 name="gstin"
//                 placeholder="GSTIN"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.gstin}
//                 onChange={handleChange}
//               />

//               <input
//                 name="pan"
//                 placeholder="PAN"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.pan}
//                 onChange={handleChange}
//               />

//               <input
//                 name="placeOfSupply"
//                 placeholder="Place of Supply"
//                 className="w-full border px-3 py-2 rounded"
//                 value={form.placeOfSupply}
//                 onChange={handleChange}
//                 required
//               />

//               <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
//                 {editingId ? "Update Customer" : "Save Customer"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const API = "https://aevix-chemical-mpbw.vercel.app/api/leads";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    customerName: "",
    customerId: "",
    phone: "",
    address: "",
    state: "",
    gstin: "",
    pan: "",
    placeOfSupply: "",
    reminderDate: "",
    reminderNote: "",
  });

  /* ================= FETCH ================= */
  const fetchLeads = async () => {
    const res = await axios.get(API);
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({
      customerName: "",
      customerId: "",
      phone: "",
      address: "",
      state: "",
      gstin: "",
      pan: "",
      placeOfSupply: "",
      reminderDate: "",
      reminderNote: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${API}/${editingId}`, form);
    } else {
      await axios.post(API, form);
    }

    setShowModal(false);
    resetForm();
    fetchLeads();
  };

  /* ================= EDIT ================= */
  const handleEdit = (lead) => {
    setForm({
      customerName: lead.customerName || "",
      customerId: lead.customerId || "",
      phone: lead.phone || "",
      address: lead.address || "",
      state: lead.state || "",
      gstin: lead.gstin || "",
      pan: lead.pan || "",
      placeOfSupply: lead.placeOfSupply || "",
      reminderDate: lead.reminderDate ? lead.reminderDate.substring(0, 10) : "",
      reminderNote: lead.reminderNote || "",
    });

    setEditingId(lead._id);
    setShowModal(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await axios.delete(`${API}/${id}`);
    fetchLeads();
  };

  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Leads</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={18} /> Add Lead
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">ID</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Place of Supply</th>
              <th className="p-3">Address</th>
              <th className="p-3">Reminder Date</th>
              <th className="p-3">Reminder Note</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{lead.customerName}</td>
                <td className="p-3">{lead.customerId}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.placeOfSupply}</td>
                <td className="p-3">{lead.address || "-"}</td>
                <td className="p-3">
                  {lead.reminderDate
                    ? new Date(lead.reminderDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3">{lead.reminderNote || "-"}</td>

                <td className="p-3 text-right flex gap-3 justify-end">
                  <button
                    onClick={() => handleEdit(lead)}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}

            {leads.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-3"
          >
            <h3 className="text-lg font-bold mb-2">
              {editingId ? "Edit Lead" : "Add Lead"}
            </h3>

            <input
              className="border p-2 w-full rounded"
              name="customerName"
              placeholder="Customer Name"
              value={form.customerName}
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 w-full rounded"
              name="customerId"
              placeholder="Customer ID"
              value={form.customerId}
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 w-full rounded"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 w-full rounded"
              name="placeOfSupply"
              placeholder="Place of Supply"
              value={form.placeOfSupply}
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 w-full rounded"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
            <input
              type="date"
              className="border p-2 w-full rounded"
              name="reminderDate"
              value={form.reminderDate}
              onChange={handleChange}
            />

            {form.reminderDate && (
              <textarea
                className="border p-2 w-full rounded"
                name="reminderNote"
                placeholder="Reminder note"
                value={form.reminderNote}
                onChange={handleChange}
                required
              />
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
