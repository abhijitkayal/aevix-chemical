import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { downloadPurchaseInvoicePdf } from "./PurchaseInvoicePDF";

const emptyForm = {
  vendorName: "",
  address: "",
  billingAddress: "",
  contactPerson: "",
  phone: "",
  gstin: "",
  placeOfSupply: "West Bengal",

  invoiceNo: "",
  invoiceDate: "",
  challanNo: "",
  challanDate: "",
  lrNo: "",
  deliveryMode: "",
  piNo: "",
  poNo: "",
  piDate: "",
  validity: "",
  paymentTerm: "",
  deliveryTerm: "",
  freight: "",
  warehouseId: "",

  product: {
    productName: "",
    description: "",
    hsnCode: "",
    quantity: "",
    unitPrice: "",
  },

  shippingDetails: {
    shippingDate: "",
    grossWeight: "",
    netWeight: "",
    shippingAddress: "",
    shippingNote: "",
  },

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
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);

  /* ======================
     Fetch invoices
  ====================== */
  const fetchInvoices = async () => {
    const res = await axios.get(`${API_URL}/api/purchase-invoices`);
    setInvoices(res.data);
  };

  useEffect(() => {
    fetchInvoices();
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/warehouses`);
      setWarehouses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch warehouses", err);
      setWarehouses([]);
    }
  };

  const fetchProductsByWarehouse = async (warehouseId) => {
    if (!warehouseId) {
      setProducts([]);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/products/${warehouseId}`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    }
  };

  /* ======================
     Handle form change
  ====================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("product.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        product: {
          ...prev.product,
          [field]: value,
        },
      }));
      return;
    }

    if (name.startsWith("shippingDetails.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        shippingDetails: {
          ...prev.shippingDetails,
          [field]: value,
        },
      }));
      return;
    }

    if (name === "warehouseId") {
      fetchProductsByWarehouse(value);
      setForm((prev) => ({
        ...prev,
        warehouseId: value,
        product: {
          ...prev.product,
          productName: "",
        },
      }));
      return;
    }

    if (name === "product.productName") {
      const selectedProduct = products.find((p) => p.productName === value);

      setForm((prev) => ({
        ...prev,
        product: {
          ...prev.product,
          productName: value,
          unitPrice:
            selectedProduct?.price !== undefined && selectedProduct?.price !== null
              ? String(selectedProduct.price)
              : prev.product.unitPrice,
        },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ======================
     Open form for EDIT
  ====================== */
  const handleEdit = (inv) => {
    const mappedForm = {
      vendorName: inv.vendorName || "",
      address: inv.address || "",
      billingAddress: inv.billingAddress || "",
      contactPerson: inv.contactPerson || "",
      phone: inv.phone || "",
      gstin: inv.gstin || "",
      placeOfSupply: inv.placeOfSupply || "West Bengal",
      invoiceNo: inv.invoiceNo || "",
      invoiceDate: inv.invoiceDate?.slice(0, 10) || "",
      challanNo: inv.challanNo || "",
      challanDate: inv.challanDate?.slice(0, 10) || "",
      lrNo: inv.lrNo || "",
      deliveryMode: inv.deliveryMode || "",
      piNo: inv.piNo || "",
      poNo: inv.poNo || "",
      piDate: inv.piDate?.slice(0, 10) || "",
      validity: inv.validity || "",
      paymentTerm: inv.paymentTerm || "",
      deliveryTerm: inv.deliveryTerm || "",
      freight: inv.freight ?? "",
      warehouseId: inv.warehouseId?._id || inv.warehouseId || "",
      product: {
        productName: inv.product?.productName || "",
        description: inv.product?.description || "",
        hsnCode: inv.product?.hsnCode || "",
        quantity: inv.product?.quantity ?? "",
        unitPrice: inv.product?.unitPrice ?? "",
      },
      shippingDetails: {
        shippingDate: inv.shippingDetails?.shippingDate?.slice(0, 10) || "",
        grossWeight: inv.shippingDetails?.grossWeight ?? "",
        netWeight: inv.shippingDetails?.netWeight ?? "",
        shippingAddress: inv.shippingDetails?.shippingAddress || "",
        shippingNote: inv.shippingDetails?.shippingNote || "",
      },
      totalAmount: inv.totalAmount ?? "",
    };

    if (mappedForm.warehouseId) {
      fetchProductsByWarehouse(mappedForm.warehouseId);
    }

    setForm(mappedForm);
    setEditingId(inv._id);
    setOpenForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ======================
     Submit form (CREATE or UPDATE)
  ====================== */
  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        freight: Number(form.freight) || 0,
        totalAmount: Number(form.totalAmount) || 0,
        product: {
          ...form.product,
          quantity: Number(form.product.quantity) || 0,
          unitPrice: Number(form.product.unitPrice) || 0,
        },
        shippingDetails: {
          ...form.shippingDetails,
          grossWeight: Number(form.shippingDetails.grossWeight) || 0,
          netWeight: Number(form.shippingDetails.netWeight) || 0,
        },
      };

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
  const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this invoice?")) return;

  try {
    await axios.delete(`${API_URL}/api/purchase-invoices/${id}`);
    fetchInvoices();
  } catch {
    alert("Delete failed");
  }
};
const handleView = (inv) => {
  window.open(`/purchase-invoices/view/${inv._id}`, "_blank");
};


const handleDownload = async (inv) => {
  try {
    await downloadPurchaseInvoicePdf(inv);
  } catch {
    alert("Failed to download purchase invoice");
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
                              billingAddress: lead.billingAddress || "",
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

              <textarea
                name="billingAddress"
                placeholder="Billing Address"
                className="input mt-2 w-full border-2 rounded px-2 py-2"
                value={form.billingAddress}
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
                  name="piNo"
                  placeholder="PI No"
                  className="input border-2 rounded px-2 py-2 mt-2"
                  value={form.piNo}
                  onChange={handleChange}
                />

                <input
                  name="poNo"
                  placeholder="PO No"
                  className="input border-2 rounded px-2 py-2 mt-2"
                  value={form.poNo}
                  onChange={handleChange}
                />

                <input
                  type="date"
                  name="piDate"
                  className="input border-2 rounded px-2 py-2 mt-2"
                  value={form.piDate}
                  onChange={handleChange}
                />

                <input
                type="date"
                  name="validity"
                  placeholder="Validity"
                  className="input border-2 rounded px-2 py-2 mt-2"
                  value={form.validity}
                  onChange={handleChange}
                />

                <input
                  name="paymentTerm"
                  placeholder="Payment Term"
                  className="input border-2 rounded px-2 py-2 mt-2"
                  value={form.paymentTerm}
                  onChange={handleChange}
                />

                <input
                  name="deliveryTerm"
                  placeholder="Delivery Term"
                  className="input border-2 rounded px-2 py-2 mt-2"
                  value={form.deliveryTerm}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="freight"
                  placeholder="Freight"
                  className="input border-2 rounded px-2 py-2 mt-2"
                  value={form.freight}
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

              <h2 className="font-semibold mt-6 mb-4">Product</h2>
              <div className="grid grid-cols-2 gap-2">
                <select
                  name="warehouseId"
                  className="input border-2 rounded px-2 py-2"
                  value={form.warehouseId}
                  onChange={handleChange}
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map((w) => (
                    <option key={w._id} value={w._id}>
                      {w.warehouse}
                    </option>
                  ))}
                </select>

                <select
                  name="product.productName"
                  className="input border-2 rounded px-2 py-2"
                  value={form.product.productName}
                  onChange={handleChange}
                  disabled={!form.warehouseId}
                >
                  <option value="">
                    {form.warehouseId ? "Select Product" : "Select Warehouse First"}
                  </option>
                  {products.map((p) => (
                    <option key={p._id} value={p.productName}>
                      {p.productName}
                    </option>
                  ))}
                </select>

                <input
                  name="product.description"
                  placeholder="Description"
                  className="input border-2 rounded px-2 py-2"
                  value={form.product.description}
                  onChange={handleChange}
                />

                <input
                  name="product.hsnCode"
                  placeholder="HSN Code"
                  className="input border-2 rounded px-2 py-2"
                  value={form.product.hsnCode}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="product.quantity"
                  placeholder="Quantity"
                  className="input border-2 rounded px-2 py-2"
                  value={form.product.quantity}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="product.unitPrice"
                  placeholder="Unit Price"
                  className="input border-2 rounded px-2 py-2"
                  value={form.product.unitPrice}
                  onChange={handleChange}
                />
              </div>

              <h2 className="font-semibold mt-6 mb-4">Shipping Details</h2>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  name="shippingDetails.shippingDate"
                  className="input border-2 rounded px-2 py-2"
                  value={form.shippingDetails.shippingDate}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="shippingDetails.grossWeight"
                  placeholder="Gross Weight"
                  className="input border-2 rounded px-2 py-2"
                  value={form.shippingDetails.grossWeight}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="shippingDetails.netWeight"
                  placeholder="Net Weight"
                  className="input border-2 rounded px-2 py-2"
                  value={form.shippingDetails.netWeight}
                  onChange={handleChange}
                />
                <input
                  name="shippingDetails.shippingAddress"
                  placeholder="Shipping Address"
                  className="input border-2 rounded px-2 py-2"
                  value={form.shippingDetails.shippingAddress}
                  onChange={handleChange}
                />
                <textarea
                  name="shippingDetails.shippingNote"
                  placeholder="Shipping Note"
                  className="input border-2 rounded px-2 py-2 col-span-2"
                  value={form.shippingDetails.shippingNote}
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
                {/* <td className="p-2 border text-center">
                  <button
                    title="Edit invoice"
                    onClick={() => handleEdit(inv)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-100 transition"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                </td> */}
                <td className="p-2 border text-center space-x-2">

  {/* EDIT */}
  <button
    onClick={() => handleEdit(inv)}
    className="px-2 py-1 bg-blue-100 text-blue-700 rounded"
  >
    Edit
  </button>

  {/* DELETE */}
  <button
    onClick={() => handleDelete(inv._id)}
    className="px-2 py-1 bg-red-100 text-red-700 rounded"
  >
    Delete
  </button>

  {/* VIEW */}
  <button
    onClick={() => handleView(inv)}
    className="px-2 py-1 bg-green-100 text-green-700 rounded"
  >
    View
  </button>

  {/* DOWNLOAD */}
  <button
    onClick={() => handleDownload(inv)}
    className="px-2 py-1 bg-purple-100 text-purple-700 rounded"
  >
    Download
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
