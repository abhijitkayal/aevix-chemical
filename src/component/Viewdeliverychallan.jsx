import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../assets/AEVIX LOGO BLACK.png';
import { Mail, X } from 'lucide-react';
import { API_URL } from '../config/api';

const ViewDeliveryChallan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dc, setDc] = useState(null);
  
  // Email Modal State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    message: ""
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchChallan();
  }, []);
const handleDownloadPDF = () => {
  // Give browser a hint that this is for download
  document.title = `Delivery-Challan-${dc?.challanNo || "AEVIX"}`;

  // Trigger native print → Save as PDF
  window.print();
};

  const fetchChallan = async () => {
    const res = await axios.get(
      `https://aevix-chemical-mpbw.vercel.app/api/delivery-challan/${id}`
    );
    setDc(res.data);
    console.log(res.data);
  };

  const handleEmailSend = async () => {
    if (!emailForm.to) {
      alert("❌ Please enter recipient email address");
      return;
    }

    try {
      setSending(true);
      const challanNumber = `${dc?.challanPrefix || ""}${dc?.challanNo || ""}${dc?.challanPostfix || ""}`;
      
      await axios.post(
        `https://aevix-chemical-mpbw.vercel.app/api/delivery-challan/${id}/send-email`,
        {
          to: emailForm.to,
          cc: emailForm.cc,
          bcc: emailForm.bcc,
          subject: emailForm.subject || `Delivery Challan ${challanNumber} from Aevix Chemical`,
          message: emailForm.message || 'Please find attached your delivery challan.'
        }
      );

      alert("✅ Email sent successfully with PDF attachment!");
      setShowEmailModal(false);
      setEmailForm({ to: "", cc: "", bcc: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email send error:", error);
      alert("❌ Failed to send email: " + (error.response?.data?.message || error.message));
    } finally {
      setSending(false);
    }
  };

  if (!dc) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6  mt-10 min-h-screen">
      {/* ACTIONS */}
     <div className="flex justify-end gap-3 mb-4">
  <button
    onClick={handleDownloadPDF}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Download PDF
  </button>

  <button
    onClick={() => setShowEmailModal(true)}
    className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
  >
    <Mail size={18} />
    Send Email
  </button>

  {/* <button
    onClick={() => window.print()}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Print / Save PDF
  </button> */}

  <button
    onClick={() => navigate(-1)}
    className="bg-gray-500 text-white px-4 py-2 rounded"
  >
    Back
  </button>
</div>


      {/* PRINT AREA */}
      <div className="bg-white p-6 max-w-5xl mx-auto print-area">
       
        {/* HEADER */}
        <div className="flex justify-between items-start border-b pb-3">
             <img
              src={logo}
              alt="Company Logo"
              className="w-[120px] object-contain"
            />
          <div>
            <h2 className="text-lg font-bold">AEVIX CHEMICAL</h2>
           <p>
        115, VILL. UTTAR JOJRA, PO. ROHANDA, 
      </p>
      <p>PS. MADHYAMGRAM,
        KOLKATA, WEST BENGAL - 700135</p>
      <p>Telephone: 033 31556300</p>
      <p>Kolkata, West Bengal - 700013</p>
      <a
        href="http://www.aevixchemical.com"
        className="text-blue-600 underline"
      >
        Website: www.aevixchemical.com
      </a>
          </div>

          <div className="text-left text-sm">
            <p><b>Name:</b> Manab Roy</p>
            <p><b>Phone:</b> 9330324989</p>
            <p><b>Email:</b> manab.roy.ind@gmail.com</p>
            <p><b>PAN:</b> BQJPR8561B</p>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-center my-4">
          DELIVERY CHALLAN
        </h2>

        {/* BUYER / CONSIGNEE */}
        <div className="grid grid-cols-3 border text-sm">
          <div className="border-r p-3">
            <h3 className="font-bold mb-1">Details of Buyer | Billed To</h3>
            <p>Name:{dc.customerName}</p>
            <p>Address{dc.address}</p>
            <p>State: {dc.state}</p>
            <p>GSTIN: {dc.gstin}</p>
          </div>

          <div className="border-r p-3">
            <h3 className="font-bold mb-1">Details of Consignee | Shipped To</h3>
            <p>Name:{dc.customerName}</p>
            <p>Address:{dc.shippingAddress}</p>
            <p>State: {dc.state}</p>
          </div>

          <div className="p-3">
            <p><b>Challan No:</b> {dc.challanPrefix}{dc.challanNo}{dc.challanPostfix}</p>
            <p><b>Date:</b> {dc.challanDate?.slice(0,10)}</p>
            <p><b>Vehicle / LR:</b> {dc.lrNo}</p>
          </div>
        </div>

        {/* PRODUCT TABLE */}
        <table className="w-full border mt-4 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Sr</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center">1</td>
              <td className="border p-2">{dc.productName}</td>
              <td className="border p-2 text-center">{dc.quantity}</td>
            </tr>
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="footer-section grid grid-cols-2 gap-8 mt-6 items-start">
  {/* BANK DETAILS (CENTERED) */}
  <div className="bank-details border-2 p-4 text-sm ">
    <h4 className="font-bold mb-3 text-center">Bank Details</h4>
    <hr className="mt-2 border-t font-bold border-gray-400" />

    <div className="space-y-1">
      <p>
        <strong>Bank :</strong>
        <span className="ml-20">State Bank Of India</span>
      </p>

      <p>
        <strong>Branch :</strong>
        <span className="ml-17">SME N.S Road</span>
      </p>

      <p>
        <strong>Account No :</strong>
        <span className="ml-9">43320503750</span>
      </p>

      <p>
        <strong>IFSC :</strong>
        <span className="ml-21">SBIN0015197</span>
      </p>
    </div>

    {/* HORIZONTAL LINE BELOW BANK DETAILS */}
    
  </div>

  {/* SIGNATURE */}
  <div className="signature border-2 p-4 text-sm text-left">
    <p>
      Certified that the particulars given above are true and correct.
    </p>

    <p className="mt-4 font-semibold">
      For AEVIX CHEMICAL
    </p>

    <p className="mt-12">
      Authorised Signatory
    </p>
  </div>
</div>

      </div>

      {/* EMAIL MODAL */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 pb-4 border-b">
              <h3 className="text-lg font-bold">Send Delivery Challan via Email</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4 p-6 overflow-y-auto flex-1">
              {/* To Field */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  To: <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={emailForm.to}
                  onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                  placeholder="recipient@example.com"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              {/* CC Field */}
              <div>
                <label className="block text-sm font-medium mb-1">CC:</label>
                <input
                  type="email"
                  value={emailForm.cc}
                  onChange={(e) => setEmailForm({ ...emailForm, cc: e.target.value })}
                  placeholder="cc@example.com (optional)"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* BCC Field */}
              <div>
                <label className="block text-sm font-medium mb-1">BCC:</label>
                <input
                  type="email"
                  value={emailForm.bcc}
                  onChange={(e) => setEmailForm({ ...emailForm, bcc: e.target.value })}
                  placeholder="bcc@example.com (optional)"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium mb-1">Subject:</label>
                <input
                  type="text"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  placeholder={`Delivery Challan ${dc?.challanPrefix || ""}${dc?.challanNo || ""}${dc?.challanPostfix || ""} from Aevix Chemical`}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium mb-1">Message:</label>
                <textarea
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  placeholder="Please find attached your delivery challan."
                  rows="4"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              {/* Info */}
              <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
                📎 The Delivery Challan PDF will be automatically attached to this email.
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end p-6 pt-4 border-t bg-white">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  disabled={sending}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmailSend}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Email"}
                  {!sending && <Mail size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDeliveryChallan;
