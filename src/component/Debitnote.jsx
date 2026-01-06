import React, { useState } from "react";
import {
  FileMinus,
  Download,
  Printer,
  Search,
  Plus,
  Eye,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Debitnote = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterReason, setFilterReason] = useState("All");
  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* ================= SUMMARY ================= */
  const summary = {
    totalDebitNotes: 18,
    totalAmount: 365000,
    thisMonth: 98000,
    pending: 42000,
  };

  /* ================= REASON DISTRIBUTION ================= */
  const reasonData = [
    { name: "Short Payment", value: 145000 },
    { name: "Excess Credit Given", value: 82000 },
    { name: "Tax Adjustment", value: 68000 },
    { name: "Penalty / Charges", value: 70000 },
  ];

  /* ================= MONTHLY TREND ================= */
  const monthlyTrend = [
    { month: "Aug", amount: 45000 },
    { month: "Sep", amount: 52000 },
    { month: "Oct", amount: 61000 },
    { month: "Nov", amount: 73000 },
    { month: "Dec", amount: 86000 },
    { month: "Jan", amount: 98000 },
  ];

  /* ================= HARD CODED DEBIT NOTES ================= */
  const debitNotes = [
    {
      id: 1,
      debitNoteNo: "DN-2026-0018",
      date: "2026-01-06",
      invoiceRef: "INV-2026-0152",
      customerName: "ChemTrade Solutions",
      customerId: "CUST-1001",
      gstin: "27ABCDE1234F1Z5",
      reason: "Short Payment",
      items: [
        {
          description: "Outstanding balance adjustment",
          hsn: "N/A",
          qty: 1,
          rate: 42000,
          amount: 42000,
        },
      ],
      subtotal: 42000,
      tax: 7560,
      totalAmount: 49560,
      status: "Pending",
      remarks: "Customer paid partial amount against invoice",
    },
    {
      id: 2,
      debitNoteNo: "DN-2026-0017",
      date: "2026-01-04",
      invoiceRef: "INV-2025-0148",
      customerName: "Industrial Polymers Ltd",
      customerId: "CUST-1002",
      gstin: "27GHIJK5678L2M6",
      reason: "Tax Adjustment",
      items: [
        {
          description: "GST differential charged",
          hsn: "GST",
          qty: 1,
          rate: 18000,
          amount: 18000,
        },
      ],
      subtotal: 18000,
      tax: 3240,
      totalAmount: 21240,
      status: "Approved",
      remarks: "Incorrect tax rate applied earlier",
    },
    {
      id: 3,
      debitNoteNo: "DN-2026-0016",
      date: "2026-01-02",
      invoiceRef: "INV-2025-0139",
      customerName: "PharmaChem Industries",
      customerId: "CUST-1003",
      gstin: "27NOPQR9012S3T7",
      reason: "Penalty / Charges",
      items: [
        {
          description: "Late payment penalty",
          hsn: "N/A",
          qty: 1,
          rate: 25000,
          amount: 25000,
        },
      ],
      subtotal: 25000,
      tax: 4500,
      totalAmount: 29500,
      status: "Approved",
      remarks: "Late payment beyond credit period",
    },
  ];

  const COLORS = ["#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

  /* ================= FILTER ================= */
  const filteredNotes = debitNotes.filter((note) => {
    const matchesSearch =
      note.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.debitNoteNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesReason =
      filterReason === "All" || note.reason === filterReason;

    return matchesSearch && matchesReason;
  });

  const openModal = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };
   const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [formData, setFormData] = useState({
    date: "",
    customer: "",
    invoiceRef: "",
    reason: "",
    amount: "",
    status: "Pending",
  });

  return (
    <div className="p-6 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileMinus className="text-red-600" size={36} />
            Debit Notes
          </h1>
          <p className="text-gray-600 mt-1">
            Debit notes raised for additional charges, short payments, or tax
            adjustments
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Debit Notes", value: summary.totalDebitNotes },
            { label: "Total Amount", value: `₹${summary.totalAmount}` },
            { label: "This Month", value: `₹${summary.thisMonth}` },
            { label: "Pending", value: `₹${summary.pending}` },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow">
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-2xl font-bold text-red-600">{item.value}</p>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Debit Note Reasons</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={reasonData}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {reasonData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Monthly Debit Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SEARCH & ACTION */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              placeholder="Search debit note or customer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg">
            <Plus size={18} />
            Create Debit Note
          </button>
        </div>

        {showCreateForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
      
      {/* Header */}
      <div className="p-4 bg-orange-600 text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">Create Credit Note</h2>
        <button
          onClick={() => setShowCreateForm(false)}
          className="text-2xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Form */}
      <form className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-gray-600">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Customer */}
        <div>
          <label className="text-sm font-medium text-gray-600">Customer</label>
          <input
            type="text"
            placeholder="Customer Name"
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Invoice Ref */}
        <div>
          <label className="text-sm font-medium text-gray-600">Invoice Ref</label>
          <input
            type="text"
            placeholder="INV-2026-XXXX"
            value={formData.invoiceRef}
            onChange={(e) => setFormData({ ...formData, invoiceRef: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="text-sm font-medium text-gray-600">Reason</label>
          <select
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Reason</option>
            <option value="Product Return">Product Return</option>
            <option value="Price Adjustment">Price Adjustment</option>
            <option value="Damaged Goods">Damaged Goods</option>
            <option value="Discount Given">Discount Given</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-gray-600">Amount (₹)</label>
          <input
            type="number"
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-gray-600">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
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
              console.log("New Credit Note:", formData);
              alert("Credit Note Created (Mock)");
              setShowCreateForm(false);
            }}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-3 text-left">Debit No</th>
                <th className="p-3">Date</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Invoice</th>
                <th className="p-3">Reason</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.map((note) => (
                <tr key={note.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-red-700">
                    {note.debitNoteNo}
                  </td>
                  <td className="p-3">{note.date}</td>
                  <td className="p-3">{note.customerName}</td>
                  <td className="p-3 text-blue-600">{note.invoiceRef}</td>
                  <td className="p-3">{note.reason}</td>
                  <td className="p-3 text-right font-semibold">
                    ₹{note.totalAmount}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        note.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {note.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button onClick={() => openModal(note)}>
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && selectedNote && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedNote.debitNoteNo}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {selectedNote.remarks}
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
                  <Printer size={16} /> Print
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                  <Download size={16} /> Download
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded"
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

export default Debitnote;
