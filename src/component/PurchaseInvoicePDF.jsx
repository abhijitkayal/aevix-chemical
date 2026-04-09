import React, { forwardRef } from "react";
import logo from "../assets/image.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const formatDate = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } catch {
    return dateString;
  }
};

const amountInWords = (value) => {
  const num = Math.round(Number(value) || 0);
  const ones = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
  const teens = ["TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
  const tens = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];

  if (num === 0) return "ZERO RUPEES ONLY";

  const convertToWords = (n) => {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return `${tens[Math.floor(n / 10)]}${n % 10 !== 0 ? ` ${ones[n % 10]}` : ""}`;
    if (n < 1000) {
      return `${ones[Math.floor(n / 100)]} HUNDRED${n % 100 !== 0 ? ` AND ${convertToWords(n % 100)}` : ""}`;
    }
    return "";
  };

  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const hundred = Math.floor(num % 1000);

  let words = "";

  if (crore > 0) words += `${convertToWords(crore)} CRORE `;
  if (lakh > 0) words += `${convertToWords(lakh)} LAKH `;
  if (thousand > 0) words += `${convertToWords(thousand)} THOUSAND `;
  if (hundred > 0) words += convertToWords(hundred);

  return `RUPEES ${words.trim()} ONLY`;
};

const PurchaseInvoicePDF = forwardRef(({ invoice }, ref) => {
  const quantity = Number(invoice?.product?.quantity) || 0;
  const unitPrice = Number(invoice?.product?.unitPrice) || 0;
  const productTotal = quantity * unitPrice;
  const freight = Number(invoice?.freight) || 0;
  const totalAmount = Number(invoice?.totalAmount) || productTotal + freight;

  return (
    <div
      ref={ref}
      className="pdf-page mx-auto bg-white"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start gap-4 w-[65%]">
          <img src={logo} alt="Company Logo" className="h-20 w-30 object-contain" />

          <div className="text-sm leading-snug text-left mr-10">
            <p className="font-bold text-base">AEVIX CHEMICAL INDIA LIMITED</p>
            <p>
              115, VILL. UTTAR JOJRA, PO. ROHANDA, PS. MADHYAMGRAM, KOLKATA,
              WEST BENGAL - 700135
            </p>
            <p>Telephone: 033 31556300</p>
            <a
              href="http://www.aevixchemical.com"
              className="text-blue-600 underline"
            >
              Website: www.aevixchemical.com
            </a>
          </div>
        </div>

        <div className="w-[40%] -mt-15 text-left">
          <h2 className="text-3xl font-bold mb-2">PURCHASE INVOICE</h2>

          <table className="w-full border border-black border-collapse text-sm">
            <tbody>
              <tr>
                <td className="border border-black px-1 pb-3 pt-0 font-medium">Invoice No</td>
                <td className="border border-black px-2 pb-3 pt-0">{invoice?.invoiceNo || invoice?._id}</td>
              </tr>
              <tr>
                <td className="border border-black pb-3 pt-0">Invoice Date</td>
                <td className="border border-black px-2 pb-3 pt-0">{formatDate(invoice?.invoiceDate)}</td>
              </tr>
              <tr>
                <td className="border border-black px-2 pb-3 pt-0 font-medium">Challan No</td>
                <td className="border border-black px-2 pb-3 pt-0">{invoice?.challanNo || "-"}</td>
              </tr>
              <tr>
                <td className="border border-black px-2 pb-3 pt-0 font-medium">Challan Date</td>
                <td className="border border-black px-2 pb-3 pt-0">{formatDate(invoice?.challanDate) || "-"}</td>
              </tr>
              <tr>
                <td className="border border-black px-2 pb-3 pt-0 font-medium">PI No</td>
                <td className="border border-black px-2 pb-3 pt-0">{invoice?.piNo || "-"}</td>
              </tr>
              <tr>
                <td className="border border-black px-2 pb-3 pt-0 font-medium">PO No</td>
                <td className="border border-black px-2 pb-3 pt-0">{invoice?.poNo || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-black p-3">
          <h4 className="bg-black text-white w-fit px-3 py-1 mb-3">VENDOR DETAILS</h4>
          <p><strong>Vendor:</strong> {invoice?.vendorName || "-"}</p>
          <p><strong>Address:</strong> {invoice?.address || "-"}</p>
          <p><strong>Billing Address:</strong> {invoice?.billingAddress || "-"}</p>
          <p><strong>Contact Person:</strong> {invoice?.contactPerson || "-"}</p>
          <p><strong>Phone:</strong> {invoice?.phone || "-"}</p>
          <p><strong>GSTIN:</strong> {invoice?.gstin || "-"}</p>
          <p><strong>Place of Supply:</strong> {invoice?.placeOfSupply || "-"}</p>
        </div>

        <div className="border border-black p-3">
          <h4 className="bg-black text-white w-fit px-3 py-1 mb-3">DISPATCH DETAILS</h4>
          <p><strong>L.R. No:</strong> {invoice?.lrNo || "-"}</p>
          <p><strong>Delivery Mode:</strong> {invoice?.deliveryMode || "-"}</p>
          <p><strong>Payment Term:</strong> {invoice?.paymentTerm || "-"}</p>
          <p><strong>Delivery Term:</strong> {invoice?.deliveryTerm || "-"}</p>
          <p><strong>Validity:</strong> {invoice?.validity || "-"}</p>
          <p><strong>PI Date:</strong> {formatDate(invoice?.piDate) || "-"}</p>
          <p><strong>Freight:</strong> ₹{freight.toFixed(2)}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <h4 className="bg-black text-white w-fit px-3 py-1 mb-3">PRODUCT</h4>
      <table className="w-full border border-black border-collapse text-sm mb-6">
        <thead className="bg-black text-white">
          <tr>
            <th className="border border-black px-2 py-2 text-left">Product Name</th>
            <th className="border border-black px-2 py-2 text-left">Description</th>
            <th className="border border-black px-2 py-2 text-left">HSN</th>
            <th className="border border-black px-2 py-2 text-right">Qty</th>
            <th className="border border-black px-2 py-2 text-right">Unit Price</th>
            <th className="border border-black px-2 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black px-2 py-2">{invoice?.product?.productName || "-"}</td>
            <td className="border border-black px-2 py-2">{invoice?.product?.description || "-"}</td>
            <td className="border border-black px-2 py-2">{invoice?.product?.hsnCode || "-"}</td>
            <td className="border border-black px-2 py-2 text-right">{quantity || "-"}</td>
            <td className="border border-black px-2 py-2 text-right">₹{unitPrice.toFixed(2)}</td>
            <td className="border border-black px-2 py-2 text-right">₹{productTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <h4 className="bg-black text-white w-fit px-3 py-1 mb-3">SHIPPING DETAILS</h4>
      <div className="grid grid-cols-2 gap-4 mb-6 border border-black p-3">
        <p><strong>Date:</strong> {formatDate(invoice?.shippingDetails?.shippingDate) || "-"}</p>
        <p><strong>Gross Weight:</strong> {invoice?.shippingDetails?.grossWeight ?? "-"}</p>
        <p><strong>Net Weight:</strong> {invoice?.shippingDetails?.netWeight ?? "-"}</p>
        <p><strong>Shipping Address:</strong> {invoice?.shippingDetails?.shippingAddress || "-"}</p>
        <p className="col-span-2"><strong>Shipping Note:</strong> {invoice?.shippingDetails?.shippingNote || "-"}</p>
      </div>

      <table className="w-full border border-black border-collapse text-sm mb-6">
        <thead className="bg-black text-white">
          <tr>
            <th className="border border-black px-2 py-2 text-left">Description</th>
            <th className="border border-black px-2 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black px-2 py-2">Product Amount</td>
            <td className="border border-black px-2 py-2 text-right">₹{productTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-2">Freight</td>
            <td className="border border-black px-2 py-2 text-right">₹{freight.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border border-black px-2 py-2 font-semibold">Grand Total</td>
            <td className="border border-black px-2 py-2 text-right font-semibold">₹{totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="border border-black p-3 mb-4">
        <h4 className="bg-black text-white w-fit px-3 py-1 mb-3">AMOUNT IN WORDS</h4>
        <p>{amountInWords(totalAmount)}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border border-black p-3">
          <h4 className="bg-black text-white w-fit px-3 py-1 mb-3">TERMS</h4>
          <p>Goods received in good condition unless otherwise noted.</p>
          <p>Payment subject to reconciliation with the purchase order and challan.</p>
        </div>

        <div className="border border-black p-3 text-right flex flex-col justify-between">
          <div>
            <p className="mb-12">Certified that the particulars given above are true and correct.</p>
            <p><strong>For AEVIX CHEMICAL INDIA LIMITED</strong></p>
          </div>
          <p className="mt-8">Authorised Signatory</p>
        </div>
      </div>
    </div>
  );
});

PurchaseInvoicePDF.displayName = "PurchaseInvoicePDF";

export const downloadPurchaseInvoicePdf = async (invoice) => {
  if (!invoice) {
    throw new Error("Purchase invoice data is required");
  }

  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "0";
  tempDiv.style.width = "794px";
  tempDiv.style.backgroundColor = "#ffffff";
  document.body.appendChild(tempDiv);

  const { createRoot } = await import("react-dom/client");
  const root = createRoot(tempDiv);

  try {
    root.render(<PurchaseInvoicePDF invoice={invoice} />);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(tempDiv, {
      scale: 1.2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: tempDiv.scrollWidth,
      windowHeight: tempDiv.scrollHeight,
      onclone: (clonedDoc) => {
        const allElements = clonedDoc.querySelectorAll("*");

        allElements.forEach((el) => {
          const computedStyle = window.getComputedStyle(el);

          ["color", "backgroundColor", "borderColor", "fill", "stroke"].forEach((prop) => {
            const value = computedStyle[prop];

            if (value && value.includes("oklch")) {
              el.style[prop] =
                prop === "color"
                  ? "#000000"
                  : prop === "backgroundColor"
                    ? "#ffffff"
                    : "transparent";
            }
          });

          if (el.style.cssText && el.style.cssText.includes("oklch")) {
            el.style.cssText = el.style.cssText.replace(/oklch\([^)]+\)/g, "#000000");
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.9);
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;

    pdf.addImage(
      imgData,
      "JPEG",
      imgX,
      0,
      imgWidth * ratio,
      imgHeight * ratio,
      undefined,
      "FAST",
    );

    pdf.save(`Purchase-Invoice-${invoice.invoiceNo || invoice._id || "document"}.pdf`);
  } finally {
    root.unmount();
    document.body.removeChild(tempDiv);
  }
};

export default PurchaseInvoicePDF;