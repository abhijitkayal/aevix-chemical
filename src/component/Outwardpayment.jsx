import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpCircle, Plus, Eye } from "lucide-react";

const API_URL = "http://localhost:5000/api/outward-payments";

const OutwardPayment = () => {
  const [payments, setPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [formData, setFormData] = useState({
    paymentNo: "",
    companyName: "",
    address: "",
    paymentDate: "",
    amount: "",
    paymentType: "",
    attachment: null,
  });

  /* ================= FETCH PAYMENTS ================= */
  const fetchPayments = async () => {
    try {
      const res = await axios.get(API_URL);
      setPayments(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  /* ================= FORM CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowForm(false);
      setFormData({
        paymentNo: "",
        companyName: "",
        address: "",
        paymentDate: "",
        amount: "",
        paymentType: "",
        attachment: null,
      });

      fetchPayments();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save outward payment");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ArrowUpCircle className="text-red-600" />
          Outward Payments
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3 text-left">Payment No</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Payment Date</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-left">Payment Type</th>
              <th className="p-3 text-left">Attachment</th>
              <th className="p-3 text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono">{p.paymentNo}</td>
                <td className="p-3">
                  <div className="font-medium">{p.companyName}</div>
                  <div className="text-xs text-gray-500">{p.address}</div>
                </td>
                <td className="p-3">
                  {new Date(p.paymentDate).toLocaleDateString()}
                </td>
                <td className="p-3 text-right font-semibold text-red-700">
                  ₹{Number(p.amount).toLocaleString("en-IN")}
                </td>
                <td className="p-3">{p.paymentType}</td>
                <td className="p-3">
                  {p.attachment ? (
                    <a
                      href={`http://localhost:5000/uploads/${p.attachment}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">—</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedPayment(p)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No outward payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 space-y-4">

            <h2 className="text-xl font-bold">Add Outward Payment</h2>

            <input
              name="paymentNo"
              placeholder="Payment No"
              className="w-full border p-2 rounded-lg"
              value={formData.paymentNo}
              onChange={handleChange}
            />

            <input
              name="companyName"
              placeholder="Company Name"
              className="w-full border p-2 rounded-lg"
              value={formData.companyName}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Company Address"
              className="w-full border p-2 rounded-lg"
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="date"
              name="paymentDate"
              className="w-full border p-2 rounded-lg"
              value={formData.paymentDate}
              onChange={handleChange}
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="w-full border p-2 rounded-lg"
              value={formData.amount}
              onChange={handleChange}
            />

            <select
              name="paymentType"
              className="w-full border p-2 rounded-lg"
              value={formData.paymentType}
              onChange={handleChange}
            >
              <option value="">Select Payment Type</option>
              <option>Bank Transfer</option>
              <option>NEFT</option>
              <option>RTGS</option>
              <option>Cheque</option>
              <option>Cash</option>
              <option>Online Payment</option>
            </select>

            <input
              type="file"
              name="attachment"
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full rounded-lg p-6 space-y-2">
            <h2 className="text-xl font-bold">Payment Details</h2>
            <p><b>Payment No:</b> {selectedPayment.paymentNo}</p>
            <p><b>Company:</b> {selectedPayment.companyName}</p>
            <p><b>Address:</b> {selectedPayment.address}</p>
            <p><b>Date:</b> {new Date(selectedPayment.paymentDate).toLocaleDateString()}</p>
            <p><b>Amount:</b> ₹{selectedPayment.amount}</p>
            <p><b>Payment Type:</b> {selectedPayment.paymentType}</p>

            <div className="text-right pt-4">
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OutwardPayment;
