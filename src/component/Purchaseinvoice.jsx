

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

const emptyForm = {
  vendorName: '',
  address: '',
  contactPerson: '',
  phone: '',
  gstin: '',
  reverseCharge: 'No',
  placeOfSupply: 'West Bengal',

  invoiceNo: '',
  invoiceDate: '',
  challanNo: '',
  challanDate: '',
  lrNo: '',
  eWayNo: '',
  deliveryMode: '',

  totalAmount: '', // ✅ ADDED
};

const PurchaseInvoicePage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [invoices, setInvoices] = useState([]);

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
     Submit form
  ====================== */
  const handleSubmit = async () => {
    await axios.post(
      `${API_URL}/api/purchase-invoices`,
      {
        ...form,
        totalAmount: Number(form.totalAmount), // ensure number
      }
    );

    setForm(emptyForm);
    setOpenForm(false);
    fetchInvoices();
  };

  return (
    <div className="p-6 mt-10 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Purchase Invoice
        </h1>

        <button
          onClick={() => setOpenForm(true)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Vendor Information */}
            <div className='gap-2'>
              <h2 className="font-semibold mb-4">
                Vendor Information
              </h2>

              <input name="vendorName" placeholder="M/S" className="input border-2 w-full rounded px-2 py-2" value={form.vendorName} onChange={handleChange} />
              <textarea name="address" placeholder="Address" className="input mt-2 w-full border-2 rounded px-2 py-2" value={form.address} onChange={handleChange} />
              <div className='gap-2 grid grid-cols-2'>
              <input name="contactPerson" placeholder="Contact Person" className="input mt-2 border-2 rounded px-2 py-2" value={form.contactPerson} onChange={handleChange} />
              <input name="phone" placeholder="Phone No" className="input mt-2 border-2 rounded px-2 py-2" value={form.phone} onChange={handleChange} />
              <input name="gstin" placeholder="GSTIN / PAN" className="input mt-2 border-2 rounded px-2 py-2" value={form.gstin} onChange={handleChange} />
              <input name="placeOfSupply" className="input mt-2 border-2 rounded px-2 py-2" value={form.placeOfSupply} onChange={handleChange} />
            </div>
            </div>

            {/* Purchase Invoice Detail */}
            <div>
              <h2 className="font-semibold mb-4">
                Purchase Invoice Detail
              </h2>
              <div className='grid grid-cols-2 gap-2'>
              <input name="invoiceNo" placeholder="Invoice No" className="input mt-2 border-2 rounded px-2 py-2" value={form.invoiceNo} onChange={handleChange} />
              <input type="date" name="invoiceDate" className="input mt-2 border-2 rounded px-2 py-2" value={form.invoiceDate} onChange={handleChange} />
              <input name="challanNo" placeholder="Challan No" className="input mt-2 border-2 rounded px-2 py-2" value={form.challanNo} onChange={handleChange} />
              <input type="date" name="challanDate" className="input mt-2 border-2 rounded px-2 py-2" value={form.challanDate} onChange={handleChange} />
              <input name="lrNo" placeholder="L.R. No" className="input mt-2 border-2 rounded px-2 py-2" value={form.lrNo} onChange={handleChange} />
              <input name="eWayNo" placeholder="E-Way No" className="input border-2 rounded px-2 py-2 mt-2" value={form.eWayNo} onChange={handleChange} />

              <select name="deliveryMode" className="input mt-2 border-2 rounded px-2 py-2" value={form.deliveryMode} onChange={handleChange}>
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
            <button onClick={() => setOpenForm(false)} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Save
            </button>
          </div>
        </div>
      )}

      {/* ======================
          STORED DATA
      ====================== */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2">
          Saved Purchase Invoices
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2 border">Vendor</th>
              <th className="p-2 border">Invoice No</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id}>
                <td className="p-2 border text-center">{inv.vendorName}</td>
                <td className="p-2 border text-center">{inv.invoiceNo}</td>
                <td className="p-2 border text-center">{inv.invoiceDate?.slice(0, 10)}</td>
                <td className="p-2 border text-center font-semibold">
                  ₹ {inv.totalAmount?.toLocaleString('en-IN')}
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
