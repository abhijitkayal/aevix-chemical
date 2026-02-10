
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus } from "lucide-react";

// const API = "https://aevix-chemical-mpbw.vercel.app/api/debit-notes";

// export default function CreditNote() {
//   const [notes, setNotes] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   const [form, setForm] = useState({
//     ms: "",
//     address: "",
//     contactPerson: "",
//     phone: "",
//     gstin: "",
//     placeOfSupply: "",
//     docType: "",
//     dnType: "",
//     dnNo: "",
//     dnDate: "",
//     invoiceNo: "",
//     invoiceDate: "",
//     challanNo: "",
//     challanDate: "",
//     lrNo: "",
//     eWayNo: "",
//     deliveryMode: "",
//     amount: "",
//   });

//   const fetchNotes = async () => {
//     const res = await axios.get(API);
//     setNotes(res.data);
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     if (!form.ms || !form.dnNo || !form.invoiceNo || !form.amount) {
//       alert("Required fields missing");
//       return;
//     }
//     await axios.post(API, form);
//     setShowForm(false);
//     setForm({});
//     fetchNotes();
//   };

//   return (
//     <div className="p-6 mt-15 min-h-screen">
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <h1 className="text-3xl font-bold flex items-center gap-2">
//           Debit Notes
//         </h1>

//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 w-full sm:w-auto justify-center"
//         >
//           <Plus size={18} /> Add New
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white shadow rounded-lg overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-orange-600 text-white">
//             <tr>
//               <th className="p-3 text-left">DN No</th>
//               <th className="p-3 text-left">Customer</th>
//               <th className="p-3 text-left">Invoice</th>
//               <th className="p-3 text-right">Amount</th>
//               <th className="p-3 text-left">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {notes.map((n) => (
//               <tr key={n._id} className="border-b">
//                 <td className="p-3 font-mono">{n.dnNo}</td>
//                 <td className="p-3">{n.ms}</td>
//                 <td className="p-3">{n.invoiceNo}</td>
//                 <td className="p-3 text-right">₹{n.amount}</td>
//                 <td className="p-3">{n.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* FORM MODAL */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
//             <h2 className="text-xl font-bold mb-4">Create Debit Note</h2>

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 name="ms"
//                 placeholder="M/S *"
//                 onChange={handleChange}
//                 className="border p-2"
//               />
//               <input
//                 name="dnNo"
//                 placeholder="D.N. No *"
//                 onChange={handleChange}
//                 className="border p-2"
//               />
//               <input
//                 type="date"
//                 name="dnDate"
//                 onChange={handleChange}
//                 className="border p-2"
//               />
//               <input
//                 name="invoiceNo"
//                 placeholder="Invoice No *"
//                 onChange={handleChange}
//                 className="border p-2"
//               />
//               <input
//                 type="date"
//                 name="invoiceDate"
//                 onChange={handleChange}
//                 className="border p-2"
//               />
//               <input
//                 name="placeOfSupply"
//                 placeholder="Place of Supply *"
//                 onChange={handleChange}
//                 className="border p-2"
//               />
//               <input
//                 name="amount"
//                 placeholder="Amount *"
//                 onChange={handleChange}
//                 className="border p-2"
//               />
//               <input
//                 name="deliveryMode"
//                 placeholder="Delivery Mode"
//                 onChange={handleChange}
//                 className="border p-2"
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="px-4 py-2 bg-gray-200 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 bg-orange-600 text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const API = "https://aevix-chemical-mpbw.vercel.app/api/debit-notes";

// ✅ local backend invoice search
const INVOICE_SEARCH_API = "https://aevix-chemical-mpbw.vercel.app/api/invoices/search";

export default function CreditNote() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // ✅ suggestion states
  const [invoiceSuggestions, setInvoiceSuggestions] = useState([]);
  const [loadingInvoice, setLoadingInvoice] = useState(false);

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

  // ✅ search invoices by MongoDB id
  const searchInvoice = async (q) => {
    if (!q || q.length < 3) {
      setInvoiceSuggestions([]);
      return;
    }

    try {
      setLoadingInvoice(true);
      const res = await axios.get(`${INVOICE_SEARCH_API}?q=${q}`);
      setInvoiceSuggestions(res.data || []);
    } catch (err) {
      console.log("Invoice search error:", err);
      setInvoiceSuggestions([]);
    } finally {
      setLoadingInvoice(false);
    }
  };

  // ✅ updated handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "invoiceNo") {
      searchInvoice(value);
    }
  };

  // ✅ select invoice and auto fill
  const selectInvoice = (invoice) => {
    setForm((prev) => ({
      ...prev,

      // invoiceNo: invoice._id,
      // invoiceDate: invoice.invoiceDate || "",

      // ms: invoice.ms || invoice.customerName || "",
      // address: invoice.address || "",
      // contactPerson: invoice.contactPerson || "",
      // phone: invoice.phone || "",
      // gstin: invoice.gstin || "",

      // placeOfSupply: invoice.placeOfSupply || "",

      // challanNo: invoice.challanNo || "",
      // challanDate: invoice.challanDate || "",

      // lrNo: invoice.lrNo || "",
      // eWayNo: invoice.eWayNo || "",

      // deliveryMode: invoice.deliveryMode || "",

      // amount: invoice.totalAmount || invoice.amount || "",

       invoiceNo: invoice._id,
      invoiceDate: invoice.date ? new Date(invoice.date).toISOString().split('T')[0] : "",

      ms: invoice.customer || "",
      address: invoice.address || "",
      contactPerson: "", // Not available in invoice
      phone: invoice.phone || "",
      gstin: invoice.gstin || "",

      placeOfSupply: invoice.placeOfSupply || "",

      challanNo: "", // Not available in invoice, could add later
      challanDate: "", // Not available in invoice

      lrNo: "", // Not available in invoice
      eWayNo: "", // Not available in invoice

      deliveryMode: invoice.driverDetails?.transportMode || "",

      amount: invoice.totalAmount || "",
    }));

    setInvoiceSuggestions([]);
  };

  // clear suggestions when modal closes
  useEffect(() => {
    if (!showForm) {
      setInvoiceSuggestions([]);
      setLoadingInvoice(false);
    }
  }, [showForm]);

  const handleSubmit = async () => {
    if (!form.ms || !form.dnNo || !form.invoiceNo || !form.amount) {
      alert("Required fields missing");
      return;
    }

    await axios.post(API, form);

    setShowForm(false);

    setForm({
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

    fetchNotes();
  };

  return (
    <div className="p-6 mt-15 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Debit Notes
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={18} /> Add New
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
        <div className="fixed inset-0 b flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Create Debit Note</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="ms"
                placeholder="M/S *"
                value={form.ms}
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="dnNo"
                placeholder="D.N. No *"
                value={form.dnNo}
                onChange={handleChange}
                className="border p-2"
              />

              <input
                type="date"
                name="dnDate"
                value={form.dnDate}
                onChange={handleChange}
                className="border p-2"
              />

              {/* ✅ invoice suggestions */}
              <div className="relative">
                <input
                  name="invoiceNo"
                  placeholder="Invoice No *"
                  value={form.invoiceNo}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />

                {loadingInvoice && (
                  <div className="absolute left-0 top-full w-full bg-white border p-2 text-sm z-50">
                    Searching...
                  </div>
                )}

                {invoiceSuggestions.length > 0 && (
                  <div className="absolute left-0 top-full w-full bg-white border shadow-lg z-50 max-h-56 overflow-y-auto rounded">
                    {invoiceSuggestions.map((inv) => (
                      <button
                        key={inv._id}
                        type="button"
                        onClick={() => selectInvoice(inv)}
                        className="w-full text-left px-3 py-2 bg-white hover:bg-orange-50 text-sm"
                      >
                        <div className="font-mono text-xs text-white">
                          {inv._id}
                        </div>
                        <div className="font-semibold text-white">
                          {inv.ms || inv.customerName || "Unknown Customer"}
                        </div>
                        <div className="text-xs text-white">
                          Amount: ₹{inv.totalAmount || inv.amount || 0}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="date"
                name="invoiceDate"
                value={form.invoiceDate}
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="placeOfSupply"
                placeholder="Place of Supply *"
                value={form.placeOfSupply}
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="amount"
                placeholder="Amount *"
                value={form.amount}
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="deliveryMode"
                placeholder="Delivery Mode"
                value={form.deliveryMode}
                onChange={handleChange}
                className="border p-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-orange-600 text-white rounded"
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
