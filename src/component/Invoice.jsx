import React, { useEffect, useState } from "react";
import axios from "axios";
import { Download, Edit, Eye, Pencil, Plus, X, Mail, Send } from "lucide-react";
import { API_URL } from "../config/api";
import InvoicePDF from "./Invoicepdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const getLegacyFreight = (products = []) =>
  products.reduce((sum, product) => sum + (Number(product.freight) || 0), 0);

const sanitizeProducts = (products = []) =>
  products.map(({ productName, description, hsnCode, quantity, unit, rate }) => ({
    productName,
    description: String(description || "").trim(),
    hsnCode: String(hsnCode || "").trim(),
    quantity: Number(quantity) || 0,
    unit,
    rate: Number(rate) || 0,
  }));

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
    piNumber: "",
    poNumber: "",
    piDate: "",
    poDate: "",
    products: [], // Changed to array
    freight: "",
    notes: "",
    shippingDetails: {
      shippingDate: "",
      grossWeight: "",
      netWeight: "",
      additionalNote: "",
      totalPackages: "",
      shippingAddress: "",
    },
    driverDetails: {
  driverName: "",
  driverPhone: "",
  vehicleNo: "",
  transportMode: "",
},

  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [productInput, setProductInput] = useState({
    productName: "",
    description: "",
    hsnCode: "",
    quantity: "",
    unit: "",
    rate: "",
  });

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
  const invoiceFreight = Number(form.freight) || 0;
  const productsSubtotal = form.products.reduce(
    (sum, product) => sum + Number(product.quantity || 0) * Number(product.rate || 0),
    0,
  );
  const invoiceGrandTotal = productsSubtotal + invoiceFreight;

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

  const fetchProductsByWarehouse = async (warehouseId) => {
    if (!warehouseId) {
      setProducts([]);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/api/products/${warehouseId}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    }
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

    // Handle nested driver fields
    if (name.startsWith("driverDetails.")) {
      const field = name.split(".")[1];
      setForm({
        ...form,
        driverDetails: {
          ...form.driverDetails,
          [field]: value,
        },
      });
      return;
    }

    // Fetch products when warehouse changes
    if (name === "warehouse") {
      fetchProductsByWarehouse(value);
      setForm({ ...form, warehouse: value, products: [] });
      setProductInput({
        productName: "",
        description: "",
        hsnCode: "",
        quantity: "",
        unit: "",
        rate: "",
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
      state: customer.state || "",
      gstin: customer.gstin || "",
      pan: customer.pan || "",
      placeOfSupply: customer.placeOfSupply || "",
      address: customer.address || "",
      shippingDetails: {
        ...form.shippingDetails,
        shippingAddress: customer.shippingAddress || "",
      },
    });

    setCustomerSuggestions([]);
    setShowSuggestions(false);
  };

  // Reset form to initial state
  const resetForm = () => {
    setForm({
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
      piNumber: "",
      poNumber: "",
      piDate: "",
      poDate: "",
      products: [],
      freight: "",
      notes: "",
      shippingDetails: {
        shippingDate: "",
        grossWeight: "",
        netWeight: "",
        additionalNote: "",
        totalPackages: "",
        shippingAddress: "",
      },
      driverDetails: {
        driverName: "",
        driverPhone: "",
        vehicleNo: "",
        transportMode: "",
      },
    });
    setSelectedInvoice(null);
    setProductInput({
      productName: "",
      description: "",
      hsnCode: "",
      quantity: "",
      unit: "",
      rate: "",
    });
  };

  // Handle edit invoice
  const handleEdit = async (inv) => {
    // Fetch products for the warehouse first
    if (inv.warehouseId?._id) {
      await fetchProductsByWarehouse(inv.warehouseId._id);
    }

    // Populate form with invoice data
    setForm({
      customer: inv.customer || "",
      customerId: inv.customerId || "",
      phone: inv.phone || "",
      address: inv.address || "",
      gstin: inv.gstin || "",
      pan: inv.pan || "",
      state: inv.state || "",
      placeOfSupply: inv.placeOfSupply || "",
      bankName: "",
      bankAccount: "",
      ifsc: "",
      warehouse: inv.warehouseId?._id || "",
      date: inv.date?.slice(0, 10) || "",
      dueDate: inv.dueDate?.slice(0, 10) || "",
      piNumber: inv.piNumber || "",
      poNumber: inv.poNumber || "",
      piDate: inv.piDate?.slice(0, 10) || "",
      poDate: inv.poDate?.slice(0, 10) || "",
      products: sanitizeProducts(inv.products || []),
      freight: String(inv.freight ?? getLegacyFreight(inv.products || [])),
      notes: inv.notes || "",
      shippingDetails: inv.shippingDetails || {
        shippingDate: "",
        grossWeight: "",
        netWeight: "",
        additionalNote: "",
        totalPackages: "",
        shippingAddress: "",
      },
      driverDetails: inv.driverDetails || {
        driverName: "",
        driverPhone: "",
        vehicleNo: "",
        transportMode: "",
      },
    });

    setSelectedInvoice(inv);
    setShowModal(true);
  };

  // Handle product input changes
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProductInput({ ...productInput, [name]: value });
  };

  // Add product to the products array
  const handleAddProduct = () => {
    if (!productInput.productName || !productInput.hsnCode || !productInput.quantity || !productInput.unit || !productInput.rate) {
      alert("Please fill in all product fields (Product Name, HSN Code, Quantity, Unit, Rate)");
      return;
    }

    const newProduct = {
      productName: productInput.productName,
      description: productInput.description,
      hsnCode: productInput.hsnCode,
      quantity: Number(productInput.quantity),
      unit: productInput.unit,
      rate: Number(productInput.rate),
    };

    setForm({
      ...form,
      products: [...form.products, newProduct],
    });

    // Reset product input
    setProductInput({
      productName: "",
      description: "",
      hsnCode: "",
      quantity: "",
      unit: "",
      rate: "",
    });
  };

  // Remove product from array
  const handleRemoveProduct = (index) => {
    const updatedProducts = form.products.filter((_, i) => i !== index);
    setForm({ ...form, products: updatedProducts });
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
      await axios.post(
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
        scale: 1.2,
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
      
      // Use JPEG with compression for smaller file size
      const imgData = canvas.toDataURL("image/jpeg", 0.85);
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "JPEG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
        undefined,
        "FAST"
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
      // Validate products array - only required for NEW invoices
      if (!selectedInvoice && (!form.products || form.products.length === 0)) {
        alert("Please add at least one product");
        return;
      }

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
        products: sanitizeProducts(form.products),
        freight: Number(form.freight) || 0,
        date: form.date,
        notes: form.notes,
        shippingDetails: form.shippingDetails,
        driverDetails: form.driverDetails,
      };

      // Add PI/PO fields only if they have values
      if (form.piNumber) payload.piNumber = form.piNumber;
      if (form.poNumber) payload.poNumber = form.poNumber;
      if (form.piDate) payload.piDate = form.piDate;
      if (form.poDate) payload.poDate = form.poDate;

      console.log("Submitting invoice payload:", payload);

      if (selectedInvoice) {
        // ✅ UPDATE
        await axios.put(
          `${API_URL}/api/invoices/${selectedInvoice._id}`,
          payload,
        );
      } else {
        // ✅ CREATE
        await axios.post(`https://aevix-chemical-mpbw.vercel.app/api/invoices`, payload);
      }

      setShowModal(false);
      resetForm();
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
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
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
                <td className="p-3">
                  {inv.products && inv.products.length > 0 ? (
                    inv.products.length === 1 ? (
                      inv.products[0].productName
                    ) : (
                      <span className="text-sm">
                        {inv.products.length} products
                        <span className="text-xs text-gray-500 block">
                          {inv.products.map(p => p.productName).join(", ")}
                        </span>
                      </span>
                    )
                  ) : (
                    <span className="text-gray-400">No products</span>
                  )}
                </td>

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
                    onClick={() => handleEdit(inv)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200"
                    title="Edit Invoice"
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
                            {/* <button
                              onClick={() => window.print()}
                              className="bg-black text-white px-3 py-1 rounded"
                            >
                              Print
                            </button> */}
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
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
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
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                      >
                        <p className="font-medium text-gray-900">{cust.customerName}</p>
                        <p className="text-xs text-gray-600">
                          {cust.customerId} • {cust.phone}
                        </p>
                        {cust.shippingAddress && (
                          <p className="text-xs text-gray-500 mt-1">
                            📦 {cust.shippingAddress}
                          </p>
                        )}
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
              <select
                name="placeOfSupply"
                className="input mt-3 border-2 rounded px-2 py-2"
                onChange={handleChange}
                value={form.placeOfSupply}
              >
                <option value="">Select Place of Supply</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
              </select>
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
              <div>
                <label className="block text-sm font-medium mb-1">Invoice Date</label>
                <input
                  type="date"
                  name="date"
                  className="input border-2 rounded px-2 py-2 w-full"
                  onChange={handleChange}
                  value={form.date}
                />
              </div>
            </div>

            {/* PRODUCTS SECTION */}
            <div className="mt-6 border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-3">Products</h3>
              
              {/* Product Input Form */}
              <div className="bg-white p-4 rounded border mb-4">
                <select
                  name="productName"
                  className="input border-2 rounded px-2 py-2 w-full mb-3"
                  onChange={handleProductInputChange}
                  value={productInput.productName}
                  disabled={!form.warehouse}
                >
                  <option value="">{form.warehouse ? "Select Product" : "Select Warehouse First"}</option>
                  {products.map((p) => (
                    <option key={p._id} value={p.productName}>
                      {p.productName}
                    </option>
                  ))}
                </select>

                <input
                  name="description"
                  placeholder="Product Description"
                  className="input border-2 rounded px-2 py-2 w-full mb-3"
                  onChange={handleProductInputChange}
                  value={productInput.description}
                />

                <input
                  name="hsnCode"
                  placeholder="HSN Code"
                  className="input border-2 rounded px-2 py-2 w-full mb-3"
                  onChange={handleProductInputChange}
                  value={productInput.hsnCode}
                />

                <div className="grid grid-cols-4 gap-3 mb-3">
                  <input
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    className="input border-2 rounded px-2 py-2"
                    onChange={handleProductInputChange}
                    value={productInput.quantity}
                  />
                  <input
                    name="unit"
                    placeholder="Unit (e.g., Kg, L)"
                    className="input border-2 rounded px-2 py-2"
                    onChange={handleProductInputChange}
                    value={productInput.unit}
                  />
                  <input
                    name="rate"
                    type="number"
                    placeholder="Rate per Unit"
                    className="input border-2 rounded px-2 py-2"
                    onChange={handleProductInputChange}
                    value={productInput.rate}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                  disabled={!form.warehouse}
                >
                  <Plus size={16} className="inline mr-2" />
                  Add Product
                </button>
              </div>

              {/* Added Products List */}
              {form.products.length > 0 && (
                <div className="bg-white rounded border">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-left">HSN Code</th>
                        <th className="p-2 text-right">Quantity</th>
                        <th className="p-2 text-left">Unit</th>
                        <th className="p-2 text-right">Rate</th>
                        <th className="p-2 text-right">Total</th>
                        <th className="p-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.products.map((product, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">
                            <div className="font-medium">{product.productName}</div>
                            {product.description ? (
                              <div className="text-xs text-gray-500 mt-1">{product.description}</div>
                            ) : null}
                          </td>
                          <td className="p-2">{product.hsnCode || "-"}</td>
                          <td className="p-2 text-right">{product.quantity}</td>
                          <td className="p-2">{product.unit}</td>
                          <td className="p-2 text-right">₹{product.rate}</td>
                          <td className="p-2 text-right font-semibold">
                            ₹{(product.quantity * product.rate).toFixed(2)}
                          </td>
                          <td className="p-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveProduct(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t bg-gray-50">
                        <td colSpan="5" className="p-2 text-right font-medium">Products Total:</td>
                        <td className="p-2 text-right">
                          ₹{productsSubtotal.toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                      <tr className="border-t bg-gray-50">
                        <td colSpan="5" className="p-2 text-right font-medium">Invoice Freight:</td>
                        <td className="p-2 text-right">₹{invoiceFreight.toFixed(2)}</td>
                        <td></td>
                      </tr>
                      <tr className="border-t bg-gray-50 font-bold">
                        <td colSpan="5" className="p-2 text-right">Grand Total:</td>
                        <td className="p-2 text-right">₹{invoiceGrandTotal.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-4 bg-white p-4 rounded border">
                <h4 className="text-base font-semibold mb-3">Invoice Charges</h4>
                <input
                  name="freight"
                  type="number"
                  min="0"
                  placeholder="Invoice Freight"
                  className="input border-2 rounded px-2 py-2 w-full"
                  onChange={handleChange}
                  value={form.freight}
                />
              </div>

              {form.products.length === 0 && (
                <p className="text-gray-500 text-center py-4 bg-white rounded border">
                  No products added yet. Add products using the form above.
                </p>
              )}
            </div>

            {/* PI/PO Details Section */}
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">PI/PO Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">PI Number</label>
                  <input
                    name="piNumber"
                    placeholder="PI Number"
                    className="border px-3 py-2 rounded w-full"
                    onChange={handleChange}
                    value={form.piNumber}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PO Number</label>
                  <input
                    name="poNumber"
                    placeholder="PO Number"
                    className="border px-3 py-2 rounded w-full"
                    onChange={handleChange}
                    value={form.poNumber}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PI Date</label>
                  <input
                    type="date"
                    name="piDate"
                    className="border px-3 py-2 rounded w-full"
                    onChange={handleChange}
                    value={form.piDate}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PO Date</label>
                  <input
                    type="date"
                    name="poDate"
                    className="border px-3 py-2 rounded w-full"
                    onChange={handleChange}
                    value={form.poDate}
                  />
                </div>
              </div>
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
                  placeholder="Shipping Date"
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

              <div className="grid grid-cols-1 gap-4 mt-4">
                <input
                  name="shippingDetails.totalPackages"
                  placeholder="Total Packages"
                  className="border px-3 py-2 rounded"
                  onChange={handleChange}
                  value={form.shippingDetails.totalPackages}
                />
              </div>

              <textarea
                name="shippingDetails.shippingAddress"
                placeholder="Shipping Address"
                rows={3}
                className="border px-3 py-2 rounded w-full mt-4"
                onChange={handleChange}
                value={form.shippingDetails.shippingAddress}
              />

              <textarea
                name="shippingDetails.additionalNote"
                placeholder="Additional Shipping Note"
                rows={3}
                className="border px-3 py-2 rounded w-full mt-4"
                onChange={handleChange}
                value={form.shippingDetails.additionalNote}
              />
            </div>
            {/* DRIVER DETAILS */}
<div className="mt-6 border rounded-lg p-4">
  <h3 className="text-lg font-semibold mb-3">Driver & Transport Details</h3>

  <div className="grid grid-cols-2 gap-4">
    <input
      name="driverDetails.driverName"
      placeholder="Driver Name"
      className="border px-3 py-2 rounded"
      value={form.driverDetails.driverName}
      onChange={handleChange}
    />

    <input
      name="driverDetails.driverPhone"
      placeholder="Driver Phone"
      className="border px-3 py-2 rounded"
      value={form.driverDetails.driverPhone}
      onChange={handleChange}
    />

    <input
      name="driverDetails.vehicleNo"
      placeholder="Vehicle Number"
      className="border px-3 py-2 rounded"
      value={form.driverDetails.vehicleNo}
      onChange={handleChange}
    />

    <select
      name="driverDetails.transportMode"
      className="border px-3 py-2 rounded"
      value={form.driverDetails.transportMode}
      onChange={handleChange}
    >
      <option value="">Transport Mode</option>
      <option value="Road">Road</option>
      <option value="Rail">Rail</option>
      <option value="Air">Air</option>
      <option value="Sea">Sea</option>
    </select>
  </div>
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
