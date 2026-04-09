import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";
import PurchaseInvoicePDF, { downloadPurchaseInvoicePdf } from "./PurchaseInvoicePDF";

const ViewPurchaseInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/purchase-invoices/${id}`);
        setInvoice(res.data);
      } catch (err) {
        // Fallback for environments where GET /:id is not deployed yet.
        if (err.response?.status === 404) {
          try {
            const allRes = await axios.get(`${API_URL}/api/purchase-invoices`);
            const matched = (allRes.data || []).find((item) => item?._id === id);

            if (matched) {
              setInvoice(matched);
              return;
            }
          } catch {
            // Continue to alert below if fallback also fails.
          }
        }

        alert(err.response?.data?.message || "Failed to load purchase invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleDownload = async () => {
    if (!invoice) return;

    setDownloading(true);
    try {
      await downloadPurchaseInvoicePdf(invoice);
    } catch (err) {
      alert(err.message || "Failed to download purchase invoice");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!invoice) {
    return <div className="p-10 text-center text-red-600">Purchase invoice not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto mb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-blue-600 underline">
          ← Back
        </button>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {downloading ? "Downloading..." : "Download PDF"}
        </button>
      </div>

      <PurchaseInvoicePDF invoice={invoice} />
    </div>
  );
};

export default ViewPurchaseInvoice;