import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import { API_URL } from "../config/api";

const emptyForm = {
  vendorName: "",
  address: "",
  contactPerson: "",
  phone: "",
  gstin: "",
  reverseCharge: "No",
  placeOfSupply: "West Bengal",

  invoiceNo: "",
  invoiceDate: "",
  challanNo: "",
  challanDate: "",
  lrNo: "",
  eWayNo: "",
  deliveryMode: "",

  totalAmount: "",
};

const PurchaseInvoicePage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); // null = create mode
  const [invoices, setInvoices] = useState([]);
  const [leadSuggestions, setLeadSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);

  /* ======================
     Fetch invoices
  ====================== */
  const fetchInvoices = async () => {
    const res = await axios.get(`${API_URL}/api/purchase-invoices`);
    setInvoices(res.data);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  /* ======================
     Handle form change
  ====================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ======================
     Open form for EDIT
  ====================== */
  const handleEdit = (inv) => {
    setForm({
      vendorName: inv.vendorName || "",
      address: inv.address || "",
      contactPerson: inv.contactPerson || "",
      phone: inv.phone || "",
      gstin: inv.gstin || "",
      reverseCharge: inv.reverseCharge || "No",
      placeOfSupply: inv.placeOfSupply || "West Bengal",
      invoiceNo: inv.invoiceNo || "",
      invoiceDate: inv.invoiceDate?.slice(0, 10) || "",
      challanNo: inv.challanNo || "",
      challanDate: inv.challanDate?.slice(0, 10) || "",
      lrNo: inv.lrNo || "",
      eWayNo: inv.eWayNo || "",
      deliveryMode: inv.deliveryMode || "",
      totalAmount: inv.totalAmount ?? "",
    });
    setEditingId(inv._id);
    setOpenForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ======================
     Submit form (CREATE or UPDATE)
  ====================== */
  const handleSubmit = async () => {
    try {
      const payload = { ...form, totalAmount: Number(form.totalAmount) };

      if (editingId) {
        await axios.put(`${API_URL}/api/purchase-invoices/${editingId}`, payload);
      } else {
        await axios.post(`${API_URL}/api/purchase-invoices`, payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      setOpenForm(false);
      fetchInvoices();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save purchase invoice");
    }
  };

  /* ======================
     Cancel form
  ====================== */
  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setOpenForm(false);
  };
  const fetchLeads = async (searchText) => {
    try {
      setLoadingLeads(true);

      const res = await axios.get(`${API_URL}/api/leads?search=${searchText}`);

      setLeadSuggestions(res.data);
      setShowSuggestions(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingLeads(false);
    }
  };

  return (
    <div className="p-6 mt-10 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Purchase Invoice</h1>

        <button
          onClick={() => { setForm(emptyForm); setEditingId(null); setOpenForm(true); }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg"
        >
          ＋
        </button>
      </div>

      {/* ======================
          FORM
      ====================== */}
      {openForm && (
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <h2 className="text-lg font-bold mb-4">
            {editingId ? "Edit Purchase Invoice" : "New Purchase Invoice"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vendor Information */}
            <div className="gap-2">
              <h2 className="font-semibold mb-4">Vendor Information</h2>

              {/* <input name="vendorName" placeholder="M/S" className="input border-2 w-full rounded px-2 py-2" value={form.vendorName} onChange={handleChange} />
              <textarea name="address" placeholder="Address" className="input mt-2 w-full border-2 rounded px-2 py-2" value={form.address} onChange={handleChange} /> */}
              <div className="relative">
                <input
                  name="vendorName"
                  placeholder="M/S"
                  className="input border-2 w-full rounded px-2 py-2"
                  value={form.vendorName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm({ ...form, vendorName: value });

                    if (value.trim().length >= 2) {
                      fetchLeads(value.trim());
                    } else {
                      setLeadSuggestions([]);
                      setShowSuggestions(false);
                    }
                  }}
                  onFocus={() => {
                    if (leadSuggestions.length > 0) setShowSuggestions(true);
                  }}
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute z-50 bg-white border w-full rounded shadow mt-1 max-h-48 overflow-y-auto">
                    {loadingLeads && (
                      <div className="p-2 text-sm text-gray-500">
                        Loading...
                      </div>
                    )}

                    {!loadingLeads && leadSuggestions.length === 0 && (
                      <div className="p-2 text-sm text-gray-500">
                        No leads found
                      </div>
                    )}

                    {!loadingLeads &&
                      leadSuggestions.map((lead) => (
                        <div
                          key={lead._id}
                          className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
                          onClick={() => {
                            // Fill form from lead
                            setForm({
                              ...form,
                              vendorName: lead.customerName || "",
                              address: lead.address || "",
                              contactPerson:
                                lead.contactPerson || lead.name || "",
                              phone: lead.phone || "",
                              gstin: lead.gstin || "",
                              placeOfSupply: lead.placeOfSupply || "",
                            });

                            setShowSuggestions(false);
                          }}
                        >
                          <p className="font-semibold">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.phone}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <textarea
                name="address"
                placeholder="Address"
                className="input mt-2 w-full border-2 rounded px-2 py-2"
                value={form.address}
                onChange={handleChange}
              />

              <div className="gap-2 grid grid-cols-2">
                <input
                  name="contactPerson"
                  placeholder="Contact Person"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.contactPerson}
                  onChange={handleChange}
                />
                <input
                  name="phone"
                  placeholder="Phone No"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.phone}
                  onChange={handleChange}
                />
                <input
                  name="gstin"
                  placeholder="GSTIN / PAN"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.gstin}
                  onChange={handleChange}
                />
                <input
                  name="placeOfSupply"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.placeOfSupply}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Purchase Invoice Detail */}
            <div>
              <h2 className="font-semibold mb-4">Purchase Invoice Detail</h2>
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="invoiceNo"
                  placeholder="Invoice No"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.invoiceNo}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="invoiceDate"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.invoiceDate}
                  onChange={handleChange}
                />
                <input
                  name="challanNo"
                  placeholder="Challan No"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.challanNo}
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="challanDate"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.challanDate}
                  onChange={handleChange}
                />
                <input
                  name="lrNo"
                  placeholder="L.R. No"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.lrNo}
                  onChange={handleChange}
                />
                <input
                  name="eWayNo"
                  placeholder="E-Way No"
                  className="input border-2 rounded px-2 py-2 mt-2"
                  value={form.eWayNo}
                  onChange={handleChange}
                />

                <select
                  name="deliveryMode"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.deliveryMode}
                  onChange={handleChange}
                >
                  <option value="">Select Delivery Mode</option>
                  <option>Road</option>
                  <option>Courier</option>
                </select>

                {/* ✅ TOTAL AMOUNT FIELD */}
                <input
                  type="number"
                  name="totalAmount"
                  placeholder="Total Amount"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  value={form.totalAmount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* ======================
          STORED DATA
      ====================== */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2">Saved Purchase Invoices</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2 border">Vendor</th>
              <th className="p-2 border">Invoice No</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id} className="hover:bg-gray-50">
                <td className="p-2 border text-center">{inv.vendorName}</td>
                <td className="p-2 border text-center">{inv.invoiceNo}</td>
                <td className="p-2 border text-center">
                  {inv.invoiceDate?.slice(0, 10)}
                </td>
                <td className="p-2 border text-center font-semibold">
                  ₹ {inv.totalAmount?.toLocaleString("en-IN")}
                </td>
                <td className="p-2 border text-center">
                  <button
                    title="Edit invoice"
                    onClick={() => handleEdit(inv)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100 transition"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseInvoicePage;
