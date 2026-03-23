import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Plus, X, Edit, Trash } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import InvoiceView from "./ProformaInvoice";
import { API_URL } from "../config/api";

const createEmptyProduct = () => ({
  productName: "",
  unit: "",
  description: "",
  hsnCode: "",
  quantity: "",
  price: "",
});

const createEmptyForm = () => ({
  customerName: "",
  billingAddress: "",
  shippingAddress: "",
  phone: "",
  gstin: "",
  placeOfSupply: "",
  proformaNo: "",
  proformaDate: "",
  validity: "",
  quotationNo: "",
  purchaseOrderNo: "",
  purchaseOrderDate: "",
  salesAccountName: "",
  challanNo: "",
  challanDate: "",
  lrNo: "",
  deliveryMode: "",
  freightType: "",
  grossWeight: "",
  netWeight: "",
  totalPackages: "",
  products: [createEmptyProduct()],
});

const normalizeProducts = (products = []) => {
  if (!Array.isArray(products) || products.length === 0) {
    return [createEmptyProduct()];
  }

  return products.map((product) => ({
    productName: product?.productName || "",
    unit: product?.unit || "",
    description: product?.description || "",
    hsnCode: product?.hsnCode || "",
    quantity: product?.quantity ?? "",
    price: product?.price ?? "",
  }));
};

const normalizeFormForEdit = (proforma) => ({
  ...createEmptyForm(),
  ...proforma,
  products: normalizeProducts(proforma?.products),
});

export default function Proforma() {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [proforma, setProforma] = useState([]);
  const [leadSuggestions, setLeadSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [form, setForm] = useState(createEmptyForm);

  const fetchProforma = async () => {
    const res = await axios.get(`${API_URL}/api/proforma`);
    setProforma(res.data || []);
  };

  useEffect(() => {
    const loadInitialProforma = async () => {
      const res = await axios.get(`${API_URL}/api/proforma`);
      setProforma(res.data || []);
    };

    loadInitialProforma();
  }, []);

  const fetchLeadSuggestions = async (query) => {
    if (!query) {
      setLeadSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/leads?search=${query}`);
      setLeadSuggestions(res.data || []);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Lead search failed", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "customerName") {
      fetchLeadSuggestions(value);
    }
  };

  const handleProductChange = (index, key, value) => {
    setForm((prev) => {
      const nextProducts = [...prev.products];
      nextProducts[index] = { ...nextProducts[index], [key]: value };
      return { ...prev, products: nextProducts };
    });
  };

  const addProductRow = () => {
    setForm((prev) => ({
      ...prev,
      products: [...prev.products, createEmptyProduct()],
    }));
  };

  const removeProductRow = (index) => {
    setForm((prev) => {
      const nextProducts = prev.products.filter((_, i) => i !== index);
      return {
        ...prev,
        products: nextProducts.length ? nextProducts : [createEmptyProduct()],
      };
    });
  };

  const selectLead = (lead) => {
    setForm((prev) => ({
      ...prev,
      customerName: lead.customerName || "",
      billingAddress: lead.address || "",
      shippingAddress: lead.address || "",
      phone: lead.phone || "",
      gstin: lead.gstin || "",
      placeOfSupply: lead.placeOfSupply || "",
    }));

    setLeadSuggestions([]);
    setShowSuggestions(false);
  };

  const sanitizeProductsForSubmit = (products = []) =>
    products
      .filter((p) =>
        [p.productName, p.unit, p.description, p.hsnCode, p.quantity, p.price]
          .map((v) => String(v ?? "").trim())
          .some(Boolean)
      )
      .map((p) => ({
        productName: String(p.productName || "").trim(),
        unit: String(p.unit || "").trim(),
        description: String(p.description || "").trim(),
        hsnCode: String(p.hsnCode || "").trim(),
        quantity: Number(p.quantity) || 0,
        price: Number(p.price) || 0,
      }));

  const submit = async () => {
    const payload = {
      ...form,
      products: sanitizeProductsForSubmit(form.products),
    };

    if (!payload.customerName) {
      alert("Customer Name is required");
      return;
    }

    if (payload.products.length === 0) {
      alert("Please add at least one product row");
      return;
    }

    if (editingId) {
      await axios.put(`${API_URL}/api/proforma/${editingId}`, payload);
    } else {
      await axios.post(`${API_URL}/api/proforma`, payload);
    }

    setForm(createEmptyForm());
    setEditingId(null);
    setOpen(false);
    fetchProforma();
  };

  const editProforma = (pf) => {
    setForm(normalizeFormForEdit(pf));
    setEditingId(pf._id);
    setOpen(true);
    setShowSuggestions(false);
  };

  const deleteProforma = async (id) => {
    if (!confirm("Delete this proforma?")) return;
    await axios.delete(`${API_URL}/api/proforma/${id}`);
    fetchProforma();
  };

  const waitForInvoiceElement = async (retries = 6) => {
    for (let i = 0; i < retries; i += 1) {
      const element = document.getElementById("invoice-print");
      if (element) return element;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return null;
  };

  const downloadInvoice = async (pf) => {
    if (!pf) return;

    let element = document.getElementById("invoice-print");

    if (!element) {
      setSelectedInvoice(pf);
      element = await waitForInvoiceElement();
    }

    if (!element) {
      console.error("Invoice preview element not found for PDF download");
      return;
    }

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();

    pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
    pdf.save(`proforma-${pf.proformaNo || "invoice"}.pdf`);
  };

  const filteredProforma = useMemo(() => {
    return proforma.filter((pf) => {
      if (!dateFilter.from && !dateFilter.to) return true;
      if (!pf.proformaDate) return false;

      const pfDate = new Date(pf.proformaDate);
      const from = dateFilter.from ? new Date(dateFilter.from) : null;
      const to = dateFilter.to ? new Date(dateFilter.to) : null;

      if (from && pfDate < from) return false;
      if (to && pfDate > to) return false;

      return true;
    });
  }, [proforma, dateFilter]);

  return (
    <div className="p-6 mt-10 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Proforma</h1>
        <button
          onClick={() => {
            setForm(createEmptyForm());
            setEditingId(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          <Plus className="mr-2" size={18} />
          Create Proforma
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={dateFilter.from}
          onChange={(e) => setDateFilter((prev) => ({ ...prev, from: e.target.value }))}
        />
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={dateFilter.to}
          onChange={(e) => setDateFilter((prev) => ({ ...prev, to: e.target.value }))}
        />
        <button
          onClick={() => setDateFilter({ from: "", to: "" })}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 lg:w-20"
        >
          Clear
        </button>
      </div>

      {filteredProforma.map((pf) => (
        <div key={pf._id} className="bg-white p-5 rounded-xl shadow mb-4">
          <div className="flex justify-end">
            <div className="flex gap-2">
              <button onClick={() => editProforma(pf)}>
                <Edit size={18} />
              </button>

              <button onClick={() => deleteProforma(pf._id)}>
                <Trash size={18} className="text-red-500" />
              </button>

              <button onClick={() => setSelectedInvoice(pf)} className="text-blue-600 text-sm">
                View
              </button>

              <button onClick={() => downloadInvoice(pf)} className="text-green-600 text-sm">
                Download
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <p>
              <b>Customer:</b> {pf.customerName || "-"}
            </p>
            <p>
              <b>Proforma No:</b> {pf.proformaNo || "-"}
            </p>
            <p>
              <b>Billing:</b> {pf.billingAddress || "-"}
            </p>
            <p>
              <b>Shipping:</b> {pf.shippingAddress || "-"}
            </p>
            <p>
              <b>Date:</b> {pf.proformaDate || "-"}
            </p>
            <p>
              <b>Products:</b> {Array.isArray(pf.products) ? pf.products.length : 0}
            </p>
            <p>
              <b>Freight Type:</b> {pf.freightType || "-"}
            </p>
            <p>
              <b>Weights:</b> G {pf.grossWeight || "-"} / N {pf.netWeight || "-"}
            </p>
          </div>
        </div>
      ))}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-6xl p-6 rounded-xl relative max-h-[90vh] overflow-y-auto">
            <X className="absolute right-4 top-4 cursor-pointer" onClick={() => setOpen(false)} />

            <h2 className="font-bold text-xl mb-4">{editingId ? "Edit Proforma" : "Create Proforma"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative md:col-span-2">
                <input
                  name="customerName"
                  placeholder="Customer Name"
                  className="border-2 p-2 rounded w-full"
                  value={form.customerName}
                  onChange={handleChange}
                  autoComplete="off"
                />

                {showSuggestions && leadSuggestions.length > 0 && (
                  <ul className="absolute z-50 bg-white border w-full rounded shadow max-h-48 overflow-y-auto">
                    {leadSuggestions.map((lead) => (
                      <li
                        key={lead._id}
                        onClick={() => selectLead(lead)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        <p className="font-medium">{lead.customerName}</p>
                        <p className="text-xs text-gray-500">
                          {lead.phone} • {lead.gstin}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                name="phone"
                placeholder="Phone"
                className="border-2 p-2 rounded"
                onChange={handleChange}
                value={form.phone}
              />

              <input
                name="gstin"
                className="border-2 p-2 rounded"
                placeholder="GSTIN"
                onChange={handleChange}
                value={form.gstin}
              />

              <textarea
                name="billingAddress"
                className="border-2 p-2 rounded"
                placeholder="Billing Address"
                onChange={handleChange}
                value={form.billingAddress}
              />
              <textarea
                name="shippingAddress"
                className="border-2 p-2 rounded"
                placeholder="Shipping Address"
                onChange={handleChange}
                value={form.shippingAddress}
              />

              <input
                name="placeOfSupply"
                className="border-2 p-2 rounded"
                placeholder="Place of Supply"
                onChange={handleChange}
                value={form.placeOfSupply}
              />

              <input
                name="salesAccountName"
                className="border-2 p-2 rounded"
                placeholder="Sales Account Name"
                onChange={handleChange}
                value={form.salesAccountName}
              />

              <input
                name="proformaNo"
                className="border-2 p-2 rounded"
                placeholder="Proforma No"
                onChange={handleChange}
                value={form.proformaNo}
              />
              <input
                type="date"
                className="border-2 p-2 rounded"
                name="proformaDate"
                onChange={handleChange}
                value={form.proformaDate}
              />

              <input
                name="validity"
                className="border-2 p-2 rounded"
                placeholder="Validity (e.g. 15 days)"
                onChange={handleChange}
                value={form.validity}
              />
              <input
                name="quotationNo"
                className="border-2 p-2 rounded"
                placeholder="Quotation No"
                onChange={handleChange}
                value={form.quotationNo}
              />

              <input
                name="purchaseOrderNo"
                className="border-2 p-2 rounded"
                placeholder="PO No"
                onChange={handleChange}
                value={form.purchaseOrderNo}
              />
              <input
                type="date"
                className="border-2 p-2 rounded"
                name="purchaseOrderDate"
                onChange={handleChange}
                value={form.purchaseOrderDate}
              />

              <input
                name="challanNo"
                className="border-2 p-2 rounded"
                placeholder="Challan No"
                onChange={handleChange}
                value={form.challanNo}
              />
              <input
                type="date"
                className="border-2 p-2 rounded"
                name="challanDate"
                onChange={handleChange}
                value={form.challanDate}
              />

              <input
                name="lrNo"
                className="border-2 p-2 rounded"
                placeholder="LR No"
                onChange={handleChange}
                value={form.lrNo}
              />
              <input
                name="deliveryMode"
                className="border-2 p-2 rounded"
                placeholder="Delivery Mode"
                onChange={handleChange}
                value={form.deliveryMode}
              />

              <input
                name="freightType"
                className="border-2 p-2 rounded"
                placeholder="Freight Type"
                onChange={handleChange}
                value={form.freightType}
              />
              <input
                name="grossWeight"
                className="border-2 p-2 rounded"
                placeholder="Gross Weight"
                onChange={handleChange}
                value={form.grossWeight}
              />

              <input
                name="netWeight"
                className="border-2 p-2 rounded"
                placeholder="Net Weight"
                onChange={handleChange}
                value={form.netWeight}
              />
              <input
                name="totalPackages"
                className="border-2 p-2 rounded"
                placeholder="Total Packages"
                onChange={handleChange}
                value={form.totalPackages}
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Products</h3>
                <button
                  type="button"
                  onClick={addProductRow}
                  className="bg-black text-white px-3 py-1 rounded text-sm"
                >
                  + Add Product
                </button>
              </div>

              <div className="overflow-x-auto border rounded">
                <table className="w-full text-sm min-w-245">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Product Name</th>
                      <th className="p-2 text-left">Unit</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">HSN Code</th>
                      <th className="p-2 text-right">Quantity</th>
                      <th className="p-2 text-right">Price</th>
                      <th className="p-2 text-right">Amount</th>
                      <th className="p-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.products.map((product, index) => {
                      const amount = (Number(product.quantity) || 0) * (Number(product.price) || 0);

                      return (
                        <tr key={`product-row-${index}`} className="border-t">
                          <td className="p-2">
                            <input
                              className="w-full border rounded p-2"
                              value={product.productName}
                              onChange={(e) => handleProductChange(index, "productName", e.target.value)}
                              placeholder="Product Name"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              className="w-full border rounded p-2"
                              value={product.unit}
                              onChange={(e) => handleProductChange(index, "unit", e.target.value)}
                              placeholder="Unit"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              className="w-full border rounded p-2"
                              value={product.description}
                              onChange={(e) => handleProductChange(index, "description", e.target.value)}
                              placeholder="Description"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              className="w-full border rounded p-2"
                              value={product.hsnCode}
                              onChange={(e) => handleProductChange(index, "hsnCode", e.target.value)}
                              placeholder="HSN Code"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              min="0"
                              className="w-full border rounded p-2 text-right"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                              placeholder="0"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              min="0"
                              className="w-full border rounded p-2 text-right"
                              value={product.price}
                              onChange={(e) => handleProductChange(index, "price", e.target.value)}
                              placeholder="0"
                            />
                          </td>
                          <td className="p-2 text-right font-medium">{amount.toFixed(2)}</td>
                          <td className="p-2 text-center">
                            <button
                              type="button"
                              className="text-red-600"
                              onClick={() => removeProductRow(index)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={submit} className="bg-blue-600 text-white px-6 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <InvoiceView
        data={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onDownload={() => downloadInvoice(selectedInvoice)}
      />
    </div>
  );
}
