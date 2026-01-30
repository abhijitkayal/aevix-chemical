import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";

const ViewInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      const res = await axios.get(`https://aevix-chemical-mpbw.vercel.app/api/invoices/${id}`);
      setInvoice(res.data);
    } catch (err) {
      alert("Failed to load invoice");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!invoice) {
    return <div className="p-10 text-center text-red-600">Invoice not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 underline"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center">
          Invoice Details
        </h1>

        {/* CUSTOMER */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <p><b>Customer:</b> {invoice.customer}</p>
          <p><b>Customer ID:</b> {invoice.customerId}</p>
          <p><b>Phone:</b> {invoice.phone}</p>
          <p><b>State:</b> {invoice.state}</p>
          <p><b>GSTIN:</b> {invoice.gstin}</p>
          <p><b>PAN:</b> {invoice.pan}</p>
        </div>

        <hr className="my-4" />

        {/* INVOICE */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <p><b>Invoice Date:</b> {invoice.date?.slice(0, 10)}</p>
          <p><b>Warehouse:</b> {invoice.warehouseId?.warehouse}</p>
          <p><b>Product:</b> {invoice.productName}</p>
          <p><b>Quantity:</b> {invoice.quantity}</p>
          <p><b>Rate:</b> ₹{invoice.rate}</p>
          <p className="font-semibold">
            Total Amount: ₹{invoice.totalAmount}
          </p>
        </div>

        <hr className="my-4" />

        {/* SHIPPING */}
        {invoice.shippingDetails && (
          <>
            <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <p>
                <b>Shipping Date:</b>{" "}
                {invoice.shippingDetails.shippingDate}
              </p>
              <p>
                <b>Gross Weight:</b>{" "}
                {invoice.shippingDetails.grossWeight}
              </p>
              <p>
                <b>Net Weight:</b>{" "}
                {invoice.shippingDetails.netWeight}
              </p>
              <p className="col-span-2">
                <b>Note:</b>{" "}
                {invoice.shippingDetails.additionalNote}
              </p>
            </div>
            <hr className="my-4" />
          </>
        )}

        {/* PAYMENT */}
        <h3 className="text-lg font-semibold mb-2">Payment Details</h3>

        {invoice.payment ? (
          <div className="grid grid-cols-2 gap-4">
            <p><b>Payment Date:</b> {invoice.payment.paymentDate}</p>
            <p><b>Payment Type:</b> {invoice.payment.paymentType}</p>
            <p><b>Paid Amount:</b> ₹{invoice.payment.paidAmount}</p>
            <p><b>Remaining:</b> ₹{invoice.payment.remainingAmount}</p>
            <p className="col-span-2">
              <b>Note:</b> {invoice.payment.note}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No payment recorded</p>
        )}
      </div>
    </div>
  );
};

export default ViewInvoice;

