import React, { useEffect, useState } from "react";
import axios from "axios";
import { Download, Pencil, Plus, X } from "lucide-react";

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

  const [showPaymentModal, setShowPaymentModal] = useState(false);
const [selectedInvoice, setSelectedInvoice] = useState(null);

const [paymentForm, setPaymentForm] = useState({
  paymentDate: "",
  paymentType: "",
  totalAmount: 0,
  paidAmount: "",
  remainingAmount: 0,
  note: "",
});

  const [customerSuggestions, setCustomerSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);


  /* ================= FETCH DATA ================= */

const openPaymentModal = (invoice) => {
  const paid = invoice.payment?.paidAmount || 0;
  const total = invoice.totalAmount;

  setSelectedInvoice(invoice);
  setPaymentForm({
    paymentDate: invoice.payment?.paymentDate || "",
    paymentType: invoice.payment?.paymentType || "",
    totalAmount: total,
    paidAmount: paid,
    remainingAmount: total - paid,
    note: invoice.payment?.note || "",
  });

  setShowPaymentModal(true);
};

const handlePaymentSave = async () => {
  const remaining =
    Number(paymentForm.totalAmount) - Number(paymentForm.paidAmount);

  try {
    await axios.put(
      `http://localhost:5000/api/invoices/${selectedInvoice._id}/payment`,
      {
        paymentDate: paymentForm.paymentDate,
        paymentType: paymentForm.paymentType,
        totalAmount: paymentForm.totalAmount,
        paidAmount: Number(paymentForm.paidAmount),
        remainingAmount: remaining,
        note: paymentForm.note,
      }
    );

    setShowPaymentModal(false);
    fetchInvoices();
  } catch (err) {
    alert("Payment update failed");
    console.error(err);
  }
};


  const fetchCustomerSuggestions = async (query) => {
  if (query.length < 2) {
    setCustomerSuggestions([]);
    setShowSuggestions(false);
    return;
  }

  try {
    const res = await axios.get(
      `http://localhost:5000/api/leads?search=${query}`
    );
    setCustomerSuggestions(res.data);
    setShowSuggestions(true);
  } catch (err) {
    console.error(err);
  }
};



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
  const { name, value } = e.target;

  // Handle nested shipping fields
  if (name.startsWith("shippingDetails.")) {
    const field = name.split(".")[1];
    setForm({
      ...form,
      shippingDetails: {
        ...form.shippingDetails,
        [field]: value,
      },
    });
    return;
  }

  setForm({ ...form, [name]: value });

  // Trigger customer suggestion
  if (name === "customer") {
    fetchCustomerSuggestions(value);
  }
};


const handleCustomerSelect = (customer) => {
  setForm({
    ...form,
    customer: customer.customerName,
    customerId: customer.customerId,
    phone: customer.phone,
    // address: customer.address || "",
    state: customer.state || "",
    gstin: customer.gstin || "",
    pan: customer.pan || "",
    placeOfSupply: customer.placeOfSupply || "",
    address: customer.address || "",
  });

  setCustomerSuggestions([]);
  setShowSuggestions(false);
};


const handleSubmit = async () => {
  try {
    const payload = {
      customer: form.customer,
      customerId: form.customerId,
      phone: form.phone,
      address: form.address,
      gstin: form.gstin,
      pan: form.pan,
      state: form.state,
      placeOfSupply: form.placeOfSupply,
      warehouseId: form.warehouse,
      productName: form.product,
      quantity: Number(form.quantity),
      unit: form.unit,
      rate: Number(form.rate),
      date: form.date,
      notes: form.notes,
      shippingDetails: form.shippingDetails,
    };

    if (selectedInvoice) {
      // ✅ UPDATE
      await axios.put(
        `http://localhost:5000/api/invoices/${selectedInvoice._id}`,
        payload
      );
    } else {
      // ✅ CREATE
      await axios.post("http://localhost:5000/api/invoices", payload);
    }

    setShowModal(false);
    setSelectedInvoice(null);
    fetchInvoices();
  } catch (error) {
    alert(error.response?.data?.message || "Invoice save failed");
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
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Warehouse</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-right">Payment Type</th>
              <th className="p-3 text-center">Actions</th>
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
                  <td className="p-3 text-center">
  {inv.payment?.remainingAmount === 0 ? (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
      {inv.payment?.paymentType || "Paid"}
    </span>
  ) : (
    <button
      onClick={() => openPaymentModal(inv)}
      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold hover:bg-yellow-200"
    >
      {inv.payment ? "Edit Payment" : "Add Payment"}
    </button>
  )}
</td>

                  {/* <td className="p-3 text-center">{inv.bankDetails?.ifsc}</td> */}
                {/* </th> */}
               
                
                <td className="p-3 text-right flex justify-end gap-3">
  {/* EDIT BUTTON */}
  <button
    onClick={() => {
      setForm({
        customer: inv.customer,
        customerId: inv.customerId,
        phone: inv.phone,
        address: inv.address,
        gstin: inv.gstin,
        pan: inv.pan,
        state: inv.state,
        placeOfSupply: inv.placeOfSupply,
        warehouse: inv.warehouseId?._id || "",
        date: inv.date?.slice(0, 10),
        product: inv.productName,
        quantity: inv.quantity,
        unit: inv.unit,
        rate: inv.rate,
        notes: inv.notes,
        shippingDetails: inv.shippingDetails || {
          shippingDate: "",
          grossWeight: "",
          netWeight: "",
          additionalNote: "",
        },
      });

      setSelectedInvoice(inv);
      setShowModal(true);
    }}
    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200"
  >
    <Pencil size={14} /> 
  </button>

  {/* DOWNLOAD */}
  <button
    onClick={() =>
      window.open(
        `http://localhost:5000/api/invoices/${inv._id}/download`,
        "_blank"
      )
    }
    className="text-blue-600 underline"
  >
    <Download size={14} />
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

      {showPaymentModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md p-6 rounded-xl relative">
      <X
        className="absolute right-4 top-4 cursor-pointer"
        onClick={() => setShowPaymentModal(false)}
      />

      <h2 className="text-xl font-bold mb-4">Payment Details</h2>

      <div className="space-y-3">
        <input
          type="date"
          className="w-full border px-3 py-2 rounded"
          value={paymentForm.paymentDate}
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, paymentDate: e.target.value })
          }
        />

        <select
          className="w-full border px-3 py-2 rounded"
          value={paymentForm.paymentType}
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, paymentType: e.target.value })
          }
        >
          <option value="">Payment Type</option>
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank Transfer</option>
          <option>Cheque</option>
        </select>

        <input
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100"
          value={`Total Amount: ₹${paymentForm.totalAmount}`}
        />

        <input
          type="number"
          placeholder="Paid Amount"
          className="w-full border px-3 py-2 rounded"
          value={paymentForm.paidAmount}
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, paidAmount: e.target.value })
          }
        />

        <input
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100"
          value={`Remaining: ₹${
            paymentForm.totalAmount - (paymentForm.paidAmount || 0)
          }`}
        />

        <textarea
          placeholder="Payment Note"
          rows={3}
          className="w-full border px-3 py-2 rounded"
          value={paymentForm.note}
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, note: e.target.value })
          }
        />

        <button
          onClick={handlePaymentSave}
          className="w-full bg-black text-white py-2 rounded"
        >
          Save Payment
        </button>
      </div>
    </div>
  </div>
)}


      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-xl relative overflow-y-auto max-h-[90vh]">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            />

            <h2 className="text-2xl font-bold mb-4">
  {selectedInvoice ? "Edit Invoice" : "Create Invoice"}
</h2>


            {/* CUSTOMER DETAILS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
  <input
    name="customer"
    placeholder="Customer Name *"
    className="border-2 rounded px-3 py-2 w-full"
    value={form.customer}
    onChange={handleChange}
    autoComplete="off"
  />

  {showSuggestions && customerSuggestions.length > 0 && (
    <ul className="absolute z-50 bg-white border w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
      {customerSuggestions.map((cust) => (
        <li
          key={cust._id}
          onClick={() => handleCustomerSelect(cust)}
          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
        >
          <p className="font-medium">{cust.customerName}</p>
          <p className="text-xs text-gray-500">
            {cust.customerId} • {cust.phone}
          </p>
        </li>
      ))}
    </ul>
  )}
</div>

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
