import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Download, Edit, Eye, Pencil, Plus, X, Mail, Send } from "lucide-react";
import { API_URL } from "../config/api";
import InvoicePDF from "./Invoicepdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const pdfRef = useRef(null);
  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });

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
        `${API_URL}/api/invoices/${selectedInvoice._id}/payment`,
        {
          paymentDate: paymentForm.paymentDate,
          paymentType: paymentForm.paymentType,
          totalAmount: paymentForm.totalAmount,
          paidAmount: Number(paymentForm.paidAmount),
          remainingAmount: remaining,
          note: paymentForm.note,
        },
      );

      setShowPaymentModal(false);
      fetchInvoices();
    } catch (err) {
      alert("Payment update failed");
      console.error(err);
    }
  };
  const filteredInvoices = invoices.filter((inv) => {
    if (!dateFilter.from && !dateFilter.to) return true;

    const invoiceDate = new Date(inv.date);
    const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
    const toDate = dateFilter.to ? new Date(dateFilter.to) : null;

    if (fromDate && invoiceDate < fromDate) return false;
    if (toDate && invoiceDate > toDate) return false;

    return true;
  });

  const fetchCustomerSuggestions = async (query) => {
    if (query.length < 2) {
      setCustomerSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/leads?search=${query}`);
      setCustomerSuggestions(res.data);
      setShowSuggestions(true);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInvoices = async () => {
    const res = await axios.get(`${API_URL}/api/invoices`);
    setInvoices(res.data);
  };

  const fetchWarehouses = async () => {
    const res = await axios.get(`${API_URL}/api/warehouses`);
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

  const [previewInvoice, setPreviewInvoice] = useState(null);

  // WhatsApp & Email modals
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [whatsappForm, setWhatsappForm] = useState({ mobile: "", message: "" });
  const [emailForm, setEmailForm] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  // Helper function to convert base64 to blob
  const base64ToBlob = (base64, type) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    const byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray], { type });
  };

  const handleWhatsAppSend = async () => {
    if (!whatsappForm.mobile || !previewInvoice) return;

    setSending(true);
    try {
      const response = await axios.post(
        `https://aevix-chemical-mpbw.vercel.app/api/invoices/${previewInvoice._id}/send-whatsapp`,
        {
          mobile: whatsappForm.mobile,
          message:
            whatsappForm.message ||
            `Invoice ${previewInvoice.invoiceNo} from Aevix Chemical`,
        },
      );

      // Download PDF automatically
      let pdfFileName = `Invoice-${previewInvoice.invoiceNo}.pdf`;
      if (response.data.pdfData) {
        const pdfBlob = base64ToBlob(response.data.pdfData, "application/pdf");
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = response.data.fileName || pdfFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }

      // Show instructions and open WhatsApp
      const proceed = window.confirm(
        `✅ PDF Downloaded: ${pdfFileName}\n\n` +
          `📱 WhatsApp will open with your message.\n\n` +
          `📎 IMPORTANT: Please attach the downloaded PDF manually:\n` +
          `   1. Click the attachment icon (📎) in WhatsApp\n` +
          `   2. Select "Document"\n` +
          `   3. Choose "${pdfFileName}"\n` +
          `   4. Send the message\n\n` +
          `Click OK to open WhatsApp now.`,
      );

      if (proceed && response.data.link) {
        window.open(response.data.link, "_blank");
      }

      setShowWhatsAppModal(false);
      setWhatsappForm({ mobile: "", message: "" });
    } catch (error) {
      alert("Failed: " + (error.response?.data?.message || error.message));
    } finally {
      setSending(false);
    }
  };

  const handleEmailSend = async () => {
    if (!emailForm.to || !previewInvoice) return;

    setSending(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/invoices/${previewInvoice._id}/send-email`,
        {
          to: emailForm.to,
          cc: emailForm.cc,
          bcc: emailForm.bcc,
          subject: emailForm.subject || `Invoice ${previewInvoice.invoiceNo}`,
          message:
            emailForm.message ||
            `Please find attached invoice ${previewInvoice.invoiceNo}.`,
        },
      );

      alert("✅ Email sent successfully with PDF attachment!");
      setShowEmailModal(false);
      setEmailForm({ to: "", cc: "", bcc: "", subject: "", message: "" });
    } catch (error) {
      alert(
        "❌ Failed to send email: " +
          (error.response?.data?.message || error.message),
      );
    } finally {
      setSending(false);
    }
  };

  // Client-side PDF Download
  const handleDownloadPDF = async (invoice) => {
    try {
      console.log("Starting PDF generation for invoice:", invoice.invoiceNo);
      
      // Create a temporary container for PDF generation
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '210mm'; // A4 width
      tempDiv.style.backgroundColor = '#ffffff';
      document.body.appendChild(tempDiv);
      
      // Render InvoicePDF component into temp div
      const { createRoot } = await import('react-dom/client');
      const root = createRoot(tempDiv);
      
      await new Promise((resolve) => {
        root.render(
          React.createElement(InvoicePDF, { invoice: invoice })
        );
        setTimeout(resolve, 500);
      });

      // Generate canvas from the rendered content
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: tempDiv.scrollWidth,
        windowHeight: tempDiv.scrollHeight,
        onclone: (clonedDoc) => {
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const computedStyle = window.getComputedStyle(el);
            
            ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke'].forEach((prop) => {
              const value = computedStyle[prop];
              if (value && value.includes('oklch')) {
                el.style[prop] = prop === 'color' ? '#000000' : 
                                 prop === 'backgroundColor' ? '#ffffff' : 
                                 'transparent';
              }
            });
            
            if (el.style.cssText && el.style.cssText.includes('oklch')) {
              el.style.cssText = el.style.cssText.replace(/oklch\([^)]+\)/g, '#000000');
            }
          });
        },
      });

      console.log("Canvas generated, creating PDF...");
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
      
      console.log("Saving PDF...");
      pdf.save(`Invoice-${invoice.invoiceNo || "document"}.pdf`);
      console.log("PDF saved successfully");

      // Cleanup
      root.unmount();
      document.body.removeChild(tempDiv);
      
    } catch (error) {
      console.error("Error in PDF generation:", error);
      alert("Failed to generate PDF: " + error.message);
    }
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
          `${API_URL}/api/invoices/${selectedInvoice._id}`,
          payload,
        );
      } else {
        // ✅ CREATE
        await axios.post(`${API_URL}/api/invoices`, payload);
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Invoice Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          <Plus size={18} /> Add Invoice
        </button>
      </div>

      {/* DATE FILTER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={dateFilter.from}
          onChange={(e) =>
            setDateFilter({ ...dateFilter, from: e.target.value })
          }
        />
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={dateFilter.to}
          onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
        />
        <button
          onClick={() => setDateFilter({ from: "", to: "" })}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 lg:w-20"
        >
          Clear
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
            {filteredInvoices.map((inv) => (
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
                    onClick={() => handleDownloadPDF(inv)}
                    className="text-blue-600 underline"
                    title="Download PDF"
                  >
                    <Download size={14} />
                  </button>
                  <button
                    onClick={() => setPreviewInvoice(inv)}
                    className="text-blue-600 underline"
                  >
                    <Eye size={14} />
                  </button>
                  {previewInvoice && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                      {/* CARD */}
                      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative">
                        {/* HEADER */}
                        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                          <h2 className="text-lg font-bold">Invoice Preview</h2>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setShowWhatsAppModal(true)}
                              className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Send size={16} /> WhatsApp
                            </button>
                            <button
                              onClick={() => setShowEmailModal(true)}
                              className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-2"
                            >
                              <Mail size={16} /> Email
                            </button>
                            <button
                              onClick={() => window.print()}
                              className="bg-black text-white px-3 py-1 rounded"
                            >
                              Print
                            </button>
                            <button
                              onClick={() => setPreviewInvoice(null)}
                              className="text-red-600 font-bold text-xl"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        {/* PDF CONTENT */}
                        <div className="p-4">
                          <InvoicePDF invoice={previewInvoice} />
                        </div>
                      </div>
                    </div>
                  )}
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
                  setPaymentForm({
                    ...paymentForm,
                    paymentDate: e.target.value,
                  })
                }
              />

              <select
                className="w-full border px-3 py-2 rounded"
                value={paymentForm.paymentType}
                onChange={(e) =>
                  setPaymentForm({
                    ...paymentForm,
                    paymentType: e.target.value,
                  })
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
                placeholder="Billing Address"
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
                className="input border-2 cursor-no-drop rounded px-2 py-2"
                onChange={handleChange}
                disabled
                value=" State Bank Of India"
              />
              <input
                name="bankAccount"
                placeholder="Account No"
                className="input border-2 cursor-no-droprounded px-2 py-2"
                onChange={handleChange}
                disabled
                value="43320503750"
              />
              <input
                name="ifsc"
                placeholder="IFSC"
                className="input border-2 cursor-no-drop rounded px-2 py-2"
                onChange={handleChange}
                disabled
                value="SBIN0015197"
              />
            </div>

            {/* INVOICE */}
            <select
              name="warehouse"
              className="input border-2 rounded mt-3 px-2 py-2 w-full"
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
              className="input mt-3 border-2 rounded px-2 py-2 w-full"
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
                  placeholder="Shipping address"
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

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Send size={20} className="text-green-600" /> Send via WhatsApp
              </h3>
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="text-red-600 font-bold text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter mobile number with country code (e.g., +911234567890)"
                  className="w-full border-2 rounded px-3 py-2"
                  value={whatsappForm.mobile}
                  onChange={(e) =>
                    setWhatsappForm({ ...whatsappForm, mobile: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter your message (invoice will be attached automatically)"
                  className="w-full border-2 rounded px-3 py-2"
                  value={whatsappForm.message}
                  onChange={(e) =>
                    setWhatsappForm({
                      ...whatsappForm,
                      message: e.target.value,
                    })
                  }
                />
              </div>

              <div className="text-sm text-gray-600">
                📄 Invoice {previewInvoice?.invoiceNo} will be attached
                automatically
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowWhatsAppModal(false)}
                  className="px-4 py-2 border-2 rounded"
                  disabled={sending}
                >
                  Cancel
                </button>
                <button
                  onClick={handleWhatsAppSend}
                  className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                  disabled={sending || !whatsappForm.mobile}
                >
                  {sending ? "Sending..." : "Send WhatsApp"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Mail size={20} className="text-blue-600" /> Send via Email
              </h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-red-600 font-bold text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">To *</label>
                <input
                  type="email"
                  placeholder="recipient@example.com"
                  className="w-full border-2 rounded px-3 py-2"
                  value={emailForm.to}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, to: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CC</label>
                <input
                  type="email"
                  placeholder="cc@example.com (optional)"
                  className="w-full border-2 rounded px-3 py-2"
                  value={emailForm.cc}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, cc: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">BCC</label>
                <input
                  type="email"
                  placeholder="bcc@example.com (optional)"
                  className="w-full border-2 rounded px-3 py-2"
                  value={emailForm.bcc}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, bcc: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Email subject"
                  className="w-full border-2 rounded px-3 py-2"
                  value={emailForm.subject}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, subject: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter your message (invoice will be attached automatically)"
                  className="w-full border-2 rounded px-3 py-2"
                  value={emailForm.message}
                  onChange={(e) =>
                    setEmailForm({ ...emailForm, message: e.target.value })
                  }
                />
              </div>

              <div className="text-sm text-gray-600">
                📄 Invoice {previewInvoice?.invoiceNo} PDF will be attached
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 border-2 rounded"
                  disabled={sending}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmailSend}
                  className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                  disabled={sending || !emailForm.to}
                >
                  {sending ? "Sending..." : "Send Email"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Download, Eye, Pencil, Plus, X, Mail, Send } from "lucide-react";
// import { API_URL } from "../config/api";
// import InvoicePDF from "./Invoicepdf";

// const Invoice = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [warehouses, setWarehouses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [previewInvoice, setPreviewInvoice] = useState(null);

//   const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

//   const [form, setForm] = useState({
//     customer: "",
//     customerId: "",
//     phone: "",
//     address: "",
//     gstin: "",
//     pan: "",
//     state: "",
//     placeOfSupply: "",
//     warehouse: "",
//     date: "",
//     product: "",
//     quantity: "",
//     unit: "",
//     rate: "",
//     notes: "",
//     shippingDetails: {
//       shippingDate: "",
//       grossWeight: "",
//       netWeight: "",
//       additionalNote: "",
//     },
//   });

//   const fetchInvoices = async () => {
//     const res = await axios.get(`${API_URL}/api/invoices`);
//     setInvoices(res.data);
//   };

//   const fetchWarehouses = async () => {
//     const res = await axios.get(`${API_URL}/api/warehouses`);
//     setWarehouses(res.data);
//   };

//   useEffect(() => {
//     fetchInvoices();
//     fetchWarehouses();
//   }, []);

//   const filteredInvoices = invoices.filter((inv) => {
//     if (!dateFilter.from && !dateFilter.to) return true;
//     const d = new Date(inv.date);
//     if (dateFilter.from && d < new Date(dateFilter.from)) return false;
//     if (dateFilter.to && d > new Date(dateFilter.to)) return false;
//     return true;
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith("shippingDetails.")) {
//       const field = name.split(".")[1];
//       setForm({
//         ...form,
//         shippingDetails: { ...form.shippingDetails, [field]: value },
//       });
//       return;
//     }

//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       ...form,
//       quantity: Number(form.quantity),
//       rate: Number(form.rate),
//       warehouseId: form.warehouse,
//       productName: form.product,
//     };

//     if (selectedInvoice) {
//       await axios.put(
//         `${API_URL}/api/invoices/${selectedInvoice._id}`,
//         payload,
//       );
//     } else {
//       await axios.post(`${API_URL}/api/invoices`, payload);
//     }

//     setShowModal(false);
//     setSelectedInvoice(null);
//     fetchInvoices();
//   };

//   return (
//     <div className="pt-20 px-4 md:px-6 min-h-screen">
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold">Invoice Management</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
//         >
//           <Plus size={18} /> Add Invoice
//         </button>
//       </div>

//       {/* DATE FILTER */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//         <input
//           type="date"
//           className="border px-3 py-2 rounded"
//           value={dateFilter.from}
//           onChange={(e) =>
//             setDateFilter({ ...dateFilter, from: e.target.value })
//           }
//         />
//         <input
//           type="date"
//           className="border px-3 py-2 rounded"
//           value={dateFilter.to}
//           onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
//         />
//         <button
//           onClick={() => setDateFilter({ from: "", to: "" })}
//           className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 lg:w-20"
//         >
//           Clear
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-lg border overflow-x-auto">
//         <table className="w-full min-w-225">
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               <th className="p-3 text-left">Date</th>
//               <th className="p-3 text-left">Customer</th>
//               <th className="p-3 text-left">Warehouse</th>
//               <th className="p-3 text-left">Product</th>
//               <th className="p-3 text-right">Amount</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInvoices.map((inv) => (
//               <tr key={inv._id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">{inv.date?.slice(0, 10)}</td>
//                 <td className="p-3">{inv.customer}</td>
//                 <td className="p-3">{inv.warehouseId?.warehouse}</td>
//                 <td className="p-3">{inv.productName}</td>
//                 <td className="p-3 text-right font-semibold">
//                   ₹{inv.totalAmount}
//                 </td>
//                 <td className="p-3 flex flex-wrap justify-end gap-2">
//                   <button
//                     onClick={() => {
//                       setSelectedInvoice(inv);
//                       setForm({
//                         ...inv,
//                         warehouse: inv.warehouseId?._id,
//                         product: inv.productName,
//                       });
//                       setShowModal(true);
//                     }}
//                     className="bg-blue-100 text-blue-700 px-2 py-1 rounded"
//                   >
//                     <Pencil size={14} />
//                   </button>
//                   <button
//                     onClick={() =>
//                       window.open(
//                         `${API_URL}/api/invoices/${inv._id}/download`,
//                         "_blank",
//                       )
//                     }
//                     className="text-blue-600"
//                   >
//                     <Download size={14} />
//                   </button>
//                   <button
//                     onClick={() => setPreviewInvoice(inv)}
//                     className="text-blue-600"
//                   >
//                     <Eye size={14} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {invoices.length === 0 && (
//           <p className="text-center p-6 text-gray-500">No invoices found</p>
//         )}
//       </div>

//       {/* PREVIEW MODAL */}
//       {previewInvoice && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white w-full sm:max-w-5xl h-[90vh] overflow-y-auto rounded-lg">
//             <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
//               <h2 className="font-bold">Invoice Preview</h2>
//               <button
//                 onClick={() => setPreviewInvoice(null)}
//                 className="text-red-600 text-xl"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="p-4">
//               <InvoicePDF invoice={previewInvoice} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CREATE / EDIT MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl">
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-bold">
//                 {selectedInvoice ? "Edit Invoice" : "Create Invoice"}
//               </h2>
//               <X
//                 onClick={() => setShowModal(false)}
//                 className="cursor-pointer"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="customer"
//                 placeholder="Customer"
//                 className="border px-3 py-2 rounded"
//                 value={form.customer}
//                 onChange={handleChange}
//               />
//               <input
//                 name="customerId"
//                 placeholder="Customer ID"
//                 className="border px-3 py-2 rounded"
//                 value={form.customerId}
//                 onChange={handleChange}
//               />
//               <input
//                 name="phone"
//                 placeholder="Phone"
//                 className="border px-3 py-2 rounded"
//                 value={form.phone}
//                 onChange={handleChange}
//               />
//               <input
//                 name="state"
//                 placeholder="State"
//                 className="border px-3 py-2 rounded"
//                 value={form.state}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//               <input
//                 name="product"
//                 placeholder="Product"
//                 className="border px-3 py-2 rounded"
//                 value={form.product}
//                 onChange={handleChange}
//               />
//               <input
//                 name="quantity"
//                 placeholder="Quantity"
//                 className="border px-3 py-2 rounded"
//                 value={form.quantity}
//                 onChange={handleChange}
//               />
//               <input
//                 name="rate"
//                 placeholder="Rate"
//                 className="border px-3 py-2 rounded"
//                 value={form.rate}
//                 onChange={handleChange}
//               />
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="mt-6 w-full bg-black text-white py-2 rounded"
//             >
//               Save Invoice
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Invoice;
