import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Plus, X, View, Pencil, Trash2, Download } from "lucide-react";
import QuotationInvoiceView from "./Quotationinvoiceview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Quotation() {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [downloadQuotation, setDownloadQuotation] = useState(null);
  const pdfRef = useRef();

  const [quotations, setQuotations] = useState([]);
  const [customerSuggestions, setCustomerSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

  const [form, setForm] = useState({
    supplyType: "Outward",
    customerName: "",
    phone: "",
    gstin: "",
    placeOfSupply: "",
    billingAddress: "",
    shippingAddress: "",
    quotationNo: "",
    quotationDate: "",
    challanNo: "",
    challanDate: "",
    lrNo: "",
    deliveryMode: "",
    items: [],
  });

  const [currentItem, setCurrentItem] = useState({
    productName: "",
    quantity: "",
    rate: "",
    state: "",
  });

  /* ================= FETCH QUOTATIONS ================= */

  const fetchQuotations = async () => {
    const res = await axios.get(
      "https://aevix-chemical-mpbw.vercel.app/api/quotations",
    );
    setQuotations(res.data);
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  /* ================= AUTO QUOTATION NO ================= */

  const generateQuotationNo = (list) => {
    if (!list || list.length === 0) return "001";
    const last = list
      .map((q) => parseInt(q.quotationNo))
      .filter((n) => !isNaN(n))
      .sort((a, b) => b - a)[0];
    return String((last || 0) + 1).padStart(3, "0");
  };

  /* ================= CUSTOMER SEARCH ================= */

  const fetchCustomerSuggestions = async (query) => {
    if (query.length < 2) {
      setShowSuggestions(false);
      return;
    }

    const res = await axios.get(
      `https://aevix-chemical-mpbw.vercel.app/api/leads?search=${query}`,
    );

    setCustomerSuggestions(res.data);
    setShowSuggestions(true);
  };

  const handleCustomerSelect = (cust) => {
    setForm({
      ...form,
      customerName: cust.customerName,
      phone: cust.phone || "",
      gstin: cust.gstin || "",
      placeOfSupply: cust.placeOfSupply || "",
      billingAddress: cust.address || "",
      shippingAddress: cust.address || "",
    });

    setShowSuggestions(false);
  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "customerName") {
      fetchCustomerSuggestions(value);
    }
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const addItem = () => {
    if (
      !currentItem.productName ||
      !currentItem.quantity ||
      !currentItem.rate
    ) {
      alert("Please fill product name, quantity, and rate");
      return;
    }
    setForm({ ...form, items: [...form.items, currentItem] });
    setCurrentItem({ productName: "", quantity: "", rate: "", state: "" });
  };

  const removeItem = (index) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updatedItems });
  };

  /* ================= SUBMIT ================= */

  // const submitQuotation = async () => {
  //   await axios.post("https://aevix-chemical-mpbw.vercel.app/api/quotations", form);
  //   setOpen(false);
  //   fetchQuotations();
  // };

  const submitQuotation = async () => {
    if (selectedQuotation) {
      await axios.put(
        `https://aevix-chemical-mpbw.vercel.app/api/quotations/${selectedQuotation._id}`,
        form,
      );
    } else {
      await axios.post(
        "https://aevix-chemical-mpbw.vercel.app/api/quotations",
        form,
      );
    }

    setOpen(false);
    setSelectedQuotation(null);
    fetchQuotations();
  };

  /* ================= EDIT ================= */

  const handleEdit = (quotation) => {
    setForm({
      supplyType: quotation.supplyType || "Outward",
      customerName: quotation.customerName || "",
      phone: quotation.phone || "",
      gstin: quotation.gstin || "",
      placeOfSupply: quotation.placeOfSupply || "",
      billingAddress: quotation.billingAddress || "",
      shippingAddress: quotation.shippingAddress || "",
      quotationNo: quotation.quotationNo || "",
      quotationDate: quotation.quotationDate || "",
      challanNo: quotation.challanNo || "",
      challanDate: quotation.challanDate || "",
      lrNo: quotation.lrNo || "",
      deliveryMode: quotation.deliveryMode || "",
      items: quotation.items || [],
    });

    setSelectedQuotation(quotation);
    setOpen(true);
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quotation?"))
      return;

    await axios.delete(
      `https://aevix-chemical-mpbw.vercel.app/api/quotations/${id}`,
    );
    fetchQuotations();
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = async (quotation) => {
    try {
      console.log("Starting download for:", quotation);
      setDownloadQuotation(quotation);

      // Wait for the component to render with the new quotation data
      setTimeout(async () => {
        try {
          const element = pdfRef.current;
          console.log("PDF Ref element:", element);

          if (!element) {
            console.error("PDF ref element not found");
            alert("Error: Unable to generate PDF. Please try again.");
            setDownloadQuotation(null);
            return;
          }

          console.log("Generating canvas...");
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            onclone: (clonedDoc) => {
              // Convert all oklch colors to supported formats
              const allElements = clonedDoc.querySelectorAll('*');
              allElements.forEach((el) => {
                const computedStyle = window.getComputedStyle(el);
                
                // Check and replace oklch colors in all color properties
                ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke'].forEach((prop) => {
                  const value = computedStyle[prop];
                  if (value && value.includes('oklch')) {
                    // Replace oklch with a safe color or transparent
                    el.style[prop] = prop === 'color' ? '#000000' : 
                                     prop === 'backgroundColor' ? '#ffffff' : 
                                     'transparent';
                  }
                });
                
                // Force inline styles to not use oklch
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
          pdf.save(`Quotation-${quotation.quotationNo || "document"}.pdf`);
          console.log("PDF saved successfully");

          // Reset download quotation after download
          setDownloadQuotation(null);
        } catch (error) {
          console.error("Error in PDF generation:", error);
          alert("Error generating PDF: " + error.message);
          setDownloadQuotation(null);
        }
      }, 1000);
    } catch (error) {
      console.error("Error in handleDownload:", error);
      alert("Error: " + error.message);
    }
  };

  /* ================= FILTER ================= */

  const filteredQuotations = quotations.filter((q) => {
    if (!dateFilter.from && !dateFilter.to) return true;
    if (!q.quotationDate) return false;

    const d = new Date(q.quotationDate);
    if (dateFilter.from && d < new Date(dateFilter.from)) return false;
    if (dateFilter.to && d > new Date(dateFilter.to)) return false;
    return true;
  });

  /* ================= UI ================= */

  return (
    <div className="p-6 mt-10 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Invoice Management</h1>
        <button
          onClick={() => {
            setSelectedQuotation(null); // 🔥 IMPORTANT
            setForm({
              supplyType: "Outward",
              customerName: "",
              phone: "",
              gstin: "",
              placeOfSupply: "",
              billingAddress: "",
              shippingAddress: "",
              quotationNo: generateQuotationNo(quotations),
              quotationDate: "",
              challanNo: "",
              challanDate: "",
              lrNo: "",
              deliveryMode: "",
              items: [],
            });
            setCurrentItem({
              productName: "",
              quantity: "",
              rate: "",
              state: "",
            });
            setOpen(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          <Plus size={18} /> Create Quotation
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

      {/* ================= TABLE ================= */}
      {/* <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white sticky top-0">
            <tr>
              <th className="border p-2">Quotation No</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">GSTIN</th>
              <th className="border p-2">Delivery</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotations.map((q) => (
              <tr key={q._id} className="hover:bg-gray-50">
                <td className="border p-2">{q.quotationNo}</td>
                <td className="border p-2">{q.quotationDate}</td>
                <td className="border p-2">{q.customerName}</td>
                <td className="border p-2">{q.phone}</td>
                <td className="border p-2">{q.deliveryMode}</td>
                <td className="border p-2">
                  <div className="flex gap-3 justify-center">
                    <View
                      className="cursor-pointer text-blue-600"
                      onClick={() => {
                        setSelectedQuotation(q);
                        setViewOpen(true);
                      }}
                    />
                    <Pencil
                      className="cursor-pointer text-green-600"
                      onClick={() => handleEdit(q)}
                    />
                    <Trash2
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDelete(q._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {!filteredQuotations.length && (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No quotations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}

      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-sm whitespace-nowrap">
          <thead className="bg-indigo-600 text-white sticky top-0 z-10">
            <tr>
              <th className="border p-2">Quotation No</th>
              <th className="border p-2">Quotation Date</th>
              <th className="border p-2">Supply Type</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">GSTIN</th>
              <th className="border p-2">Place of Supply</th>
              <th className="border p-2">Billing Address</th>
              <th className="border p-2">Shipping Address</th>
              <th className="border p-2">Challan No</th>
              <th className="border p-2">Challan Date</th>
              <th className="border p-2">LR No</th>
              <th className="border p-2">Delivery Mode</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredQuotations.map((q) => (
              <tr key={q._id} className="hover:bg-gray-50 align-top">
                <td className="border p-2">{q.quotationNo}</td>
                <td className="border p-2">{q.quotationDate}</td>
                <td className="border p-2">{q.deliveryMode}</td>
                <td className="border p-2">{q.customerName}</td>
                <td className="border p-2">{q.phone}</td>
                <td className="border p-2">{q.gstin}</td>
                <td className="border p-2">{q.placeOfSupply}</td>
                <td className="border p-2 max-w-50 truncate">
                  {q.billingAddress}
                </td>
                <td className="border p-2 max-w-50 truncate">
                  {q.shippingAddress}
                </td>
                <td className="border p-2">{q.challanNo}</td>
                <td className="border p-2">{q.challanDate}</td>
                <td className="border p-2">{q.lrNo}</td>
                <td className="border p-2">{q.deliveryMode}</td>

                <td className="border p-2">
                  <div className="flex gap-3 justify-center">
                    <View
                      className="cursor-pointer text-blue-600"
                      onClick={() => {
                        setSelectedQuotation(q);
                        setViewOpen(true);
                      }}
                    />
                    <Download
                      className="cursor-pointer text-purple-600"
                      onClick={() => handleDownload(q)}
                    />
                    <Pencil
                      className="cursor-pointer text-green-600"
                      onClick={() => handleEdit(q)}
                    />
                    <Trash2
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDelete(q._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {!filteredQuotations.length && (
              <tr>
                <td colSpan="14" className="text-center p-4 text-gray-500">
                  No quotations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= CREATE MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white w-full max-w-6xl rounded-xl p-6 relative my-8 max-h-[90vh] overflow-y-auto">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="grid grid-cols-2 gap-8">
              {/* CUSTOMER INFO */}
              <div>
                <h2 className="font-semibold text-lg mb-4">
                  Customer Information
                </h2>

                <div className="flex gap-4 mb-3">
                  <label>
                    <input
                      type="radio"
                      name="supplyType"
                      value="Outward"
                      checked={form.supplyType === "Outward"}
                      onChange={handleChange}
                    />{" "}
                    Outward
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="supplyType"
                      value="Inward"
                      checked={form.supplyType === "Inward"}
                      onChange={handleChange}
                    />{" "}
                    Inward
                  </label>
                </div>

                {/* CUSTOMER AUTOCOMPLETE */}
                <div className="relative">
                  <input
                    name="customerName"
                    placeholder="Customer Name"
                    className="border-2 rounded px-2 py-2 w-full"
                    value={form.customerName}
                    onChange={handleChange}
                    autoComplete="off"
                  />

                  {showSuggestions && customerSuggestions.length > 0 && (
                    <ul className="absolute z-50 bg-white border w-full rounded shadow mt-1 max-h-48 overflow-y-auto">
                      {customerSuggestions.map((cust) => (
                        <li
                          key={cust._id}
                          onClick={() => handleCustomerSelect(cust)}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          <p className="font-medium">{cust.customerName}</p>
                          <p className="text-xs text-gray-500">
                            {cust.phone} • {cust.placeOfSupply}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <textarea
                  name="billingAddress"
                  placeholder="Billing Address"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.billingAddress}
                  onChange={handleChange}
                />

                <textarea
                  name="shippingAddress"
                  placeholder="Shipping Address"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.shippingAddress}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <input
                    name="phone"
                    placeholder="Phone"
                    className="border-2 rounded px-2 py-2"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  <input
                    name="gstin"
                    placeholder="GSTIN / PAN"
                    className="border-2 rounded px-2 py-2"
                    value={form.gstin}
                    onChange={handleChange}
                  />
                </div>

                <input
                  name="placeOfSupply"
                  placeholder="Place of Supply"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.placeOfSupply}
                  onChange={handleChange}
                />
              </div>

              {/* QUOTATION INFO */}
              <div>
                <h2 className="font-semibold text-lg mb-4">
                  Quotation Details
                </h2>

                <input
                  className="border-2 rounded px-2 py-2 w-full bg-gray-100"
                  value={form.quotationNo}
                  readOnly
                />

                <input
                  type="date"
                  name="quotationDate"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.quotationDate}
                  onChange={handleChange}
                />

                <input
                  name="challanNo"
                  placeholder="Challan No"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.challanNo}
                  onChange={handleChange}
                />

                <input
                  type="date"
                  name="challanDate"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.challanDate}
                  onChange={handleChange}
                />

                <input
                  name="lrNo"
                  placeholder="LR No"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.lrNo}
                  onChange={handleChange}
                />

                <select
                  name="deliveryMode"
                  className="border-2 rounded px-2 py-2 w-full mt-2"
                  value={form.deliveryMode}
                  onChange={handleChange}
                >
                  <option value="">Select Delivery Mode</option>
                  <option>Road</option>
                  <option>Courier</option>
                  <option>Transport</option>
                </select>
              </div>
            </div>

            {/* ================= PRODUCTS SECTION ================= */}
            <div className="mt-8">
              <h2 className="font-semibold text-lg mb-4">Products</h2>

              <div className="grid grid-cols-5 gap-3 mb-3">
                <input
                  name="productName"
                  placeholder="Product Name"
                  className="border-2 rounded px-2 py-2"
                  value={currentItem.productName}
                  onChange={handleItemChange}
                />
                <input
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  className="border-2 rounded px-2 py-2"
                  value={currentItem.quantity}
                  onChange={handleItemChange}
                />
                <input
                  name="rate"
                  type="number"
                  placeholder="Rate"
                  className="border-2 rounded px-2 py-2"
                  value={currentItem.rate}
                  onChange={handleItemChange}
                />
                <input
                  name="state"
                  placeholder="State"
                  className="border-2 rounded px-2 py-2"
                  value={currentItem.state}
                  onChange={handleItemChange}
                />
                <button
                  onClick={addItem}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>

              {form.items.length > 0 && (
                <div className="border rounded overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-2 text-left">Product Name</th>
                        <th className="border p-2 text-left">Quantity</th>
                        <th className="border p-2 text-left">Rate</th>
                        <th className="border p-2 text-left">State</th>
                        <th className="border p-2 text-left">Amount</th>
                        <th className="border p-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border p-2">{item.productName}</td>
                          <td className="border p-2">{item.quantity}</td>
                          <td className="border p-2">₹{item.rate}</td>
                          <td className="border p-2">{item.state}</td>
                          <td className="border p-2">
                            ₹{(item.quantity * item.rate).toFixed(2)}
                          </td>
                          <td className="border p-2 text-center">
                            <Trash2
                              className="cursor-pointer text-red-600 inline"
                              size={16}
                              onClick={() => removeItem(index)}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr className="font-semibold bg-gray-50">
                        <td colSpan="4" className="border p-2 text-right">
                          Total:
                        </td>
                        <td className="border p-2">
                          ₹
                          {form.items
                            .reduce(
                              (sum, item) => sum + item.quantity * item.rate,
                              0,
                            )
                            .toFixed(2)}
                        </td>
                        <td className="border p-2"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitQuotation}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Quotation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW MODAL (TABLE FORMAT) ================= */}
      {viewOpen && selectedQuotation && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-6xl p-4 rounded relative overflow-auto max-h-[95vh]">
            <X
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setViewOpen(false)}
            />

            {/* SAME AS INVOICE */}
            <QuotationInvoiceView quotation={selectedQuotation} />
          </div>
        </div>
      )}

      {/* ================= HIDDEN PDF COMPONENT FOR DOWNLOAD ================= */}
      {downloadQuotation && (
        <div
          style={{
            position: "fixed",
            left: "-9999px",
            top: 0,
            width: "210mm",
            background: "white",
            colorScheme: "light",
          }}
        >
          <div
            ref={pdfRef}
            style={{
              width: "100%",
              minHeight: "297mm",
              backgroundColor: "#ffffff",
              color: "#000000",
            }}
          >
            <style>
              {`
                * {
                  color-scheme: light !important;
                }
              `}
            </style>
            <QuotationInvoiceView quotation={downloadQuotation} />
          </div>
        </div>
      )}
    </div>
  );
}
