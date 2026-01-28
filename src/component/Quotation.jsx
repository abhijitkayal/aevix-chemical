import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";

export default function Quotation() {
  const [open, setOpen] = useState(false);
  const [quotations, setQuotations] = useState([]);

  const [customerSuggestions, setCustomerSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dateFilter, setDateFilter] = useState({
  from: "",
  to: "",
});

  const [form, setForm] = useState({
    supplyType: "Outward",
    customerName: "",
    phone: "",
    gstin: "",
    placeOfSupply: "",

    billingAddress: "",
    shippingAddress: "",

    quotationNo: "",
    quotationDate: "",
    challanNo: "",
    challanDate: "",
    lrNo: "",
    deliveryMode: "",
  });

  /* ================= FETCH QUOTATIONS ================= */

  const fetchQuotations = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/quotations"
    );
    setQuotations(res.data);
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  /* ================= AUTO QUOTATION NO ================= */

  const generateQuotationNo = (list) => {
    if (!list || list.length === 0) return "001";

    const last = list
      .map((q) => parseInt(q.quotationNo))
      .filter((n) => !isNaN(n))
      .sort((a, b) => b - a)[0];

    return String((last || 0) + 1).padStart(3, "0");
  };

  /* ================= CUSTOMER SEARCH ================= */

  const fetchCustomerSuggestions = async (query) => {
    if (query.length < 2) {
      setCustomerSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/leads?search=${query}`
    );

    setCustomerSuggestions(res.data);
    setShowSuggestions(true);
  };

  const handleCustomerSelect = (cust) => {
    setForm({
      ...form,
      customerName: cust.customerName,
      phone: cust.phone || "",
      gstin: cust.gstin || "",
      placeOfSupply: cust.placeOfSupply || "",
      billingAddress: cust.address || "",
      shippingAddress: cust.address || "",
    });

    setShowSuggestions(false);
    setCustomerSuggestions([]);
  };


  const filteredQuotations = quotations.filter((q) => {
  if (!dateFilter.from && !dateFilter.to) return true;

  if (!q.quotationDate) return false;

  const qDate = new Date(q.quotationDate);
  const from = dateFilter.from ? new Date(dateFilter.from) : null;
  const to = dateFilter.to ? new Date(dateFilter.to) : null;

  if (from && qDate < from) return false;
  if (to && qDate > to) return false;

  return true;
});


  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name === "customerName") {
      fetchCustomerSuggestions(value);
    }
  };

  /* ================= SUBMIT ================= */

  const submitQuotation = async () => {
    await axios.post(
      "http://localhost:5000/api/quotations",
      form
    );

    setOpen(false);
    setForm({
      supplyType: "Outward",
      customerName: "",
      phone: "",
      gstin: "",
      placeOfSupply: "",
      billingAddress: "",
      shippingAddress: "",
      quotationNo: "",
      quotationDate: "",
      challanNo: "",
      challanDate: "",
      lrNo: "",
      deliveryMode: "",
    });

    fetchQuotations();
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 mt-10 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-2xl font-bold">Quotation</h1> */}
        {/* DATE FILTER */}
<div className="flex flex-wrap gap-2 mb-6 items-end">
  <div>
    <label className="text-sm font-medium">From Date</label>
    <input
      type="date"
      className="border px-3 py-2 rounded w-full"
      value={dateFilter.from}
      onChange={(e) =>
        setDateFilter({ ...dateFilter, from: e.target.value })
      }
    />
  </div>

  <div>
    <label className="text-sm font-medium">To Date</label>
    <input
      type="date"
      className="border px-3 py-2 rounded w-full"
      value={dateFilter.to}
      onChange={(e) =>
        setDateFilter({ ...dateFilter, to: e.target.value })
      }
    />
  </div>

  <button
    onClick={() => setDateFilter({ from: "", to: "" })}
    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
  >
    Clear
  </button>
</div>

        <button
          onClick={() => {
            setForm((prev) => ({
              ...prev,
              quotationNo: generateQuotationNo(quotations),
            }));
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Create Quotation
        </button>
      </div>

      {/* LIST */}
      {filteredQuotations.map((q) => (
        <div key={q._id} className="bg-white grid grid-cols-2 p-4 rounded shadow mb-4">
          <div>
            <h2 className="font-bold underline">Customer Details</h2>
            <p><b>Customer:</b> {q.customerName}</p>
            <p><b>Phone:</b> {q.phone}</p>
            <p><b>GSTIN:</b> {q.gstin}</p>
            <p><b>Billing Address:</b> {q.billingAddress}</p>
            <p><b>Shipping Address:</b> {q.shippingAddress}</p>
          </div>

          <div>
            <h2 className="font-bold underline">Quotation Details</h2>
            <p><b>Quotation No:</b> {q.quotationNo}</p>
            <p><b>Date:</b> {q.quotationDate}</p>
            <p><b>LR No:</b> {q.lrNo}</p>
            <p><b>Delivery Mode:</b> {q.deliveryMode}</p>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-6xl rounded-xl p-6 relative">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="grid grid-cols-2 gap-8">

              {/* CUSTOMER INFO */}
              <div>
                <h2 className="font-semibold text-lg mb-4">
                  Customer Information
                </h2>

                <div className="flex gap-4 mb-3">
                  <label>
                    <input
                      type="radio"
                      name="supplyType"
                      value="Outward"
                      checked={form.supplyType === "Outward"}
                      onChange={handleChange}
                    /> Outward
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="supplyType"
                      value="Inward"
                      checked={form.supplyType === "Inward"}
                      onChange={handleChange}
                    /> Inward
                  </label>
                </div>

                {/* CUSTOMER AUTOCOMPLETE */}
                <div className="relative">
                  <input
                    name="customerName"
                    placeholder="Customer Name"
                    className="border-2 rounded px-2 py-2 w-full"
                    value={form.customerName}
                    onChange={handleChange}
                    autoComplete="off"
                  />

                  {showSuggestions && customerSuggestions.length > 0 && (
                    <ul className="absolute z-50 bg-white border w-full rounded shadow mt-1 max-h-48 overflow-y-auto">
                      {customerSuggestions.map((cust) => (
                        <li
                          key={cust._id}
                          onClick={() => handleCustomerSelect(cust)}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          <p className="font-medium">{cust.customerName}</p>
                          <p className="text-xs text-gray-500">
                            {cust.phone} • {cust.placeOfSupply}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <textarea
                  name="billingAddress"
                  placeholder="Billing Address"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.billingAddress}
                  onChange={handleChange}
                />

                <textarea
                  name="shippingAddress"
                  placeholder="Shipping Address"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.shippingAddress}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <input
                    name="phone"
                    placeholder="Phone"
                    className="border-2 rounded px-2 py-2"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  <input
                    name="gstin"
                    placeholder="GSTIN / PAN"
                    className="border-2 rounded px-2 py-2"
                    value={form.gstin}
                    onChange={handleChange}
                  />
                </div>

                <input
                  name="placeOfSupply"
                  placeholder="Place of Supply"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.placeOfSupply}
                  onChange={handleChange}
                />
              </div>

              {/* QUOTATION INFO */}
              <div>
                <h2 className="font-semibold text-lg mb-4">Quotation Details</h2>

                <input
                  className="border-2 rounded px-2 py-2 w-full bg-gray-100"
                  value={form.quotationNo}
                  readOnly
                />

                <input
                  type="date"
                  name="quotationDate"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.quotationDate}
                  onChange={handleChange}
                />

                <input
                  name="challanNo"
                  placeholder="Challan No"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.challanNo}
                  onChange={handleChange}
                />

                <input
                  type="date"
                  name="challanDate"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.challanDate}
                  onChange={handleChange}
                />

                <input
                  name="lrNo"
                  placeholder="LR No"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.lrNo}
                  onChange={handleChange}
                />

                <select
                  name="deliveryMode"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.deliveryMode}
                  onChange={handleChange}
                >
                  <option value="">Select Delivery Mode</option>
                  <option>Road</option>
                  <option>Courier</option>
                  <option>Transport</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitQuotation}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
