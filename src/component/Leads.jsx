// import React from "react";
// import { Phone, Mail, User, CalendarCheck } from "lucide-react";

// const leadsData = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     company: "Sharma Traders",
//     email: "rahul@sharmatraders.com",
//     phone: "+91 98765 43210",
//     status: "New",
//     owner: "Aisha",
//     nextFollowUp: "2026-01-10",
//   },
//   {
//     id: 2,
//     name: "Neha Verma",
//     company: "Verma Enterprises",
//     email: "neha@vermaent.com",
//     phone: "+91 91234 56789",
//     status: "In Progress",
//     owner: "John",
//     nextFollowUp: "2026-01-08",
//   },
//   {
//     id: 3,
//     name: "Amit Patel",
//     company: "Patel Gems",
//     email: "amit@patelgems.in",
//     phone: "+91 99887 66554",
//     status: "Converted",
//     owner: "Rahul",
//     nextFollowUp: "-",
//   },
//   {
//     id: 4,
//     name: "Sneha Roy",
//     company: "Roy Jewellers",
//     email: "sneha@royjewels.com",
//     phone: "+91 90123 45678",
//     status: "Lost",
//     owner: "Neha",
//     nextFollowUp: "-",
//   },
// ];

// const statusColor = {
//   New: "bg-blue-100 text-blue-700",
//   "In Progress": "bg-yellow-100 text-yellow-700",
//   Converted: "bg-emerald-100 text-emerald-700",
//   Lost: "bg-red-100 text-red-700",
// };

// export default function Leads() {
//   return (
//     <div className="p-6 mt-10">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-black">
//           Leads Management
//         </h1>
//         <p className="text-gray-600">
//           Track potential customers and sales opportunities
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-sm text-gray-500">Total Leads</p>
//           <h3 className="text-2xl font-bold text-black">24</h3>
//         </div>
//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-sm text-gray-500">New</p>
//           <h3 className="text-2xl font-bold text-blue-600">8</h3>
//         </div>
//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-sm text-gray-500">Converted</p>
//           <h3 className="text-2xl font-bold text-emerald-600">10</h3>
//         </div>
//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-sm text-gray-500">Lost</p>
//           <h3 className="text-2xl font-bold text-red-600">6</h3>
//         </div>
//       </div>

//       {/* Leads Table */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <table className="min-w-full text-sm">
//           <thead className="bg-slate-100 text-gray-600">
//             <tr>
//               <th className="px-4 py-3 text-left">Lead</th>
//               <th className="px-4 py-3 text-left">Contact</th>
//               <th className="px-4 py-3 text-left">Status</th>
//               <th className="px-4 py-3 text-left">Owner</th>
//               <th className="px-4 py-3 text-left">Next Follow-up</th>
//             </tr>
//           </thead>

//           <tbody>
//             {leadsData.map((lead) => (
//               <tr
//                 key={lead.id}
//                 className="border-t hover:bg-slate-50"
//               >
//                 <td className="px-4 py-3">
//                   <p className="font-medium text-black">
//                     {lead.name}
//                   </p>
//                   <p className="text-gray-500 text-xs">
//                     {lead.company}
//                   </p>
//                 </td>

//                 <td className="px-4 py-3 space-y-1">
//                   <div className="flex items-center gap-2">
//                     <Mail size={14} />
//                     {lead.email}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone size={14} />
//                     {lead.phone}
//                   </div>
//                 </td>

//                 <td className="px-4 py-3">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[lead.status]}`}
//                   >
//                     {lead.status}
//                   </span>
//                 </td>

//                 <td className="px-4 py-3 flex items-center gap-2">
//                   <User size={14} />
//                   {lead.owner}
//                 </td>

//                 <td className="px-4 py-3 flex items-center gap-2">
//                   <CalendarCheck size={14} />
//                   {lead.nextFollowUp}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Phone, Mail, User, CalendarCheck, Plus, X } from "lucide-react";

const statusColor = {
  New: "bg-blue-100 text-blue-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Converted: "bg-emerald-100 text-emerald-700",
  Lost: "bg-red-100 text-red-700",
};

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
    owner: "",
    followUpDate: "",
  });

  /* FETCH LEADS */
  const fetchLeads = async () => {
    const res = await axios.get("http://localhost:5000/api/leads");
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  /* HANDLE FORM */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/leads", form);
    setShowModal(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      status: "New",
      owner: "",
      followUpDate: "",
    });
    fetchLeads();
  };

  return (
    <div className="p-6 mt-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Leads Management
          </h1>
          <p className="text-gray-600">
            Track potential customers and sales opportunities
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} />
          Add Lead
        </button>
      </div>

      {/* LEADS TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Lead</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Owner</th>
              <th className="px-4 py-3 text-left">Next Follow-up</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-black">{lead.name}</p>
                </td>

                <td className="px-4 py-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    {lead.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    {lead.phone}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-4 py-3 flex items-center gap-2">
                  <User size={14} />
                  {lead.owner}
                </td>

                <td className="px-4 py-3 flex items-center gap-2">
                  <CalendarCheck size={14} />
                  {lead.followUpDate
                    ? new Date(lead.followUpDate).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl relative">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            />

            <h2 className="text-xl font-bold mb-4">Add Lead</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Lead Name"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
                required
              />

              <input
                name="email"
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
                required
              />

              <select
                name="status"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
              >
                <option>New</option>
                <option>In Progress</option>
                <option>Converted</option>
                <option>Lost</option>
              </select>

              <input
                name="owner"
                placeholder="Owner"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="followUpDate"
                className="w-full border px-3 py-2 rounded"
                onChange={handleChange}
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                Save Lead
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
