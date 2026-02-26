import React, { forwardRef } from "react";
import logo from "../assets/AEVIX LOGO BLACK (1).png";

const InvoicePDF = forwardRef(({ invoice }, ref) => {
  const isWestBengal = (invoice.state || "")
    .toLowerCase()
    .includes("west bengal");

  // Calculate amounts matching server-side logic
  // const qty = invoice.quantity || 0;
  // const rate = invoice.rate || 0;
  // const taxable = qty * rate;
  // const cgst = taxable * 0.09;
  // const sgst = taxable * 0.09;
  // const total = taxable + cgst + sgst;

  const qty = invoice.quantity || 0;
  const rate = invoice.rate || 0;
  const taxable = qty * rate;

  const cgst = isWestBengal ? taxable * 0.09 : 0;
  const sgst = isWestBengal ? taxable * 0.09 : 0;
  const igst = !isWestBengal ? taxable * 0.18 : 0;

  const total = taxable + cgst + sgst + igst;

  const amountInWords = (num) => {
    return `RUPEES ${num.toLocaleString("en-IN")} ONLY`;
  };

  // Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch {
      return dateString;
    }
  };

  const consignee = invoice.consignee || {};

  return (
    <div
      ref={ref}
      className="pdf-page mx-auto bg-white"
      style={{
        width: "794px", // A4 width at 96 DPI
        minHeight: "1123px", // A4 height
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
        <img
            src={logo}
            alt="Company Logo"
            className="h-10 object-contain"
          />
      <div className="flex justify-between items-start mb-6">
        {/* LEFT SIDE (LOGO + DETAILS) */}
        <div className="flex items-start gap-4 w-[65%]">
          {/* LOGO */}
        

          {/* COMPANY DETAILS */}
          <div className="text-sm leading-snug text-left mr-10">
            {/* <img src={logo} /> */}
            <p className="font-bold text-base">AEVIX CHEMICAL INDIA LIMITED</p>
            <p>
              115, VILL. UTTAR JOJRA, PO. ROHANDA, PS. MADHYAMGRAM, KOLKATA,
              WEST BENGAL - 700135
            </p>
            <p>Telephone: 033 31556300</p>
            <p>Kolkata, West Bengal - 700013</p>
            <a
              href="http://www.aevixchemical.com"
              className="text-blue-600 underline"
            >
              Website: www.aevixchemical.com
            </a>
          </div>
        </div>

        {/* RIGHT SIDE (TAX INVOICE) */}
        <div className="w-[40%] -mt-10 text-left">
          <h2 className="text-lg font-bold mb-2">TAX INVOICE</h2>

          <table className="w-full border border-black border-collapse text-sm">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 font-medium">
                  Invoice No
                </td>
                <td className="border border-black px-2 py-1">
                  {invoice.invoiceNo || invoice._id}
                </td>
              </tr>
              <tr>
                <td className="border border-black py-1 font-medium">
                  Invoice Date
                </td>
                <td className="border border-black px-2 py-1">
                  {new Date(invoice.date).toLocaleDateString("en-IN")}
                </td>
              </tr>
                <tr>
                <td className="border border-black px-2 py-1 font-medium">
                  PI NO:
                </td>
                <td className="border border-black px-2 py-1">
                  {invoice.piNumber}
                </td>
              </tr>
                <tr>
                <td className="border border-black px-2 py-1 font-medium">
                  PO NO:
                </td>
                <td className="border border-black px-2 py-1">
                  {invoice.poNumber}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BUYER & CONSIGNEE */}
      <div className="grid grid-cols-3 gap-2">
        <div className="buyer-section">
          <h4 className="bg-black text-white w-55 mb-3 h-8 flex items-center px-3">BILL TO : /CUSTOMER</h4>
          <p>
            <strong>Name:</strong> {invoice.customer}
          </p>
          <p>
            <strong>Address:</strong> {invoice.address}
          </p>
          <p>
            <strong>Phone:</strong> {invoice.phone}
          </p>
          <p>
            <strong>GSTIN:</strong> {invoice.gstin}
          </p>
          <p>
            <strong>PAN:</strong> {invoice.pan}
          </p>
          <p>
            <strong>State:</strong> {invoice.state}
          </p>
          <p>
            <strong>Place of Supply:</strong> {invoice.placeOfSupply}
          </p>
        </div>
         <div className="consignee-section">
          <h4 className="bg-black text-white w-55 h-8 mb-3 flex items-center px-3">SHIP TO :</h4>
          <p>
            <strong>Name:</strong> {consignee.name || invoice.customer}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {consignee.address || invoice.shippingDetails?.netWeight}
          </p>
          <p>
            <strong>Phone:</strong> {consignee.phone || invoice.phone}
          </p>
          <p>
            <strong>GSTIN:</strong> {consignee.gstin || invoice.gstin}
          </p>
          <p>
            <strong>State:</strong> {consignee.state || invoice.state}
          </p>
        </div>

        <div className="consignee-section">
          <h4 className="bg-black text-white w-55 h-8 mb-3 flex items-center px-3">SHIPPING DETAILS :</h4>
          <p><strong>Freight: </strong>{invoice.driverDetails?.transportMode || "-"}</p>
          <p>
            <strong>Gross Weight:</strong> {invoice.shippingDetails?.grossWeight}
          </p>
          <p>
            <strong>Shipping Date:</strong>{" "}
            {formatDate(invoice.shippingDetails?.shippingDate)}
          </p>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <table className="items">
        <thead className="bg-black text-white">
          <tr className="bg-black">
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>Sr</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>Product / Service</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>HSN</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>Qty</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>Rate</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>Taxable</th>
            {isWestBengal ? (
              <>
                <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>CGST</th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>SGST</th>
              </>
            ) : (
              <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>IGST</th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>1</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{invoice.productName}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{invoice.hsn || "-"}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>
              {qty} {invoice.unit}
            </td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{rate.toFixed(2)}</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{taxable.toFixed(2)}</td>
            {isWestBengal ? (
              <>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{cgst.toFixed(2)}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{sgst.toFixed(2)}</td>
              </>
            ) : (
              <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{igst.toFixed(2)}</td>
            )}
          </tr>
         
          {Array.from({ length: 5 }).map((_, i) => (
    <tr key={i}>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>&nbsp;</td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      {isWestBengal ? (
        <>
          <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
          <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>-</td>
        </>
      ) : (
        <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>-</td>
      )}
    </tr>
  ))}
          {/* <div className="h-30"></div> */}
        </tbody>
      </table>

      {/* TOTALS & BANK */}
      <div className="bottom-section">
        <div className="amount-words">
          <h4 className="bg-black text-white flex items-center px-3">Total in Words</h4>
          <p className="px-6">{amountInWords(total)}</p>
          <hr/>
          <h4 className="bg-black text-white flex items-center px-3">Terms of Sale and Other Comments</h4>
          <p className="px-6"><strong>transportMode: </strong>{invoice.driverDetails?.transportMode || " Not specified"}</p>
          <p className="px-6"><strong>Driver call: </strong>{invoice.driverDetails?.driverPhone || " Not specified"}</p>
          <p className="px-6"><strong>Vehicle No: </strong>{invoice.driverDetails?.vehicleNo || " Not specified"}</p>
          <hr/>
          <h4 className="bg-black text-white flex items-center px-3">Payment Method</h4>
          <p className="px-6"><strong>Payment Date:</strong>{invoice.payment?.paymentDate || " Till not payment"}</p>
          <p className="px-6"><strong>Payment Type:</strong> {invoice.payment?.paymentType || " Till not payment"}</p>
          <p className="px-6"><strong>Paid Amount:</strong> {invoice.payment?.paidAmount || " Till not payment"}</p>
          <p className="px-6"><strong>Remaining Amount:</strong>{invoice.payment?.remainingAmount || " Till not payment"}</p>
        </div>

        <div className="tax-summary">
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>Taxable Amount</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>{taxable.toFixed(2)}</td>
              </tr>

              {isWestBengal ? (
                <>
                  <tr>
                    <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>Add : CGST (9%)</td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>{cgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>Add : SGST (9%)</td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>{sgst.toFixed(2)}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>Add : IGST (18%)</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>{igst.toFixed(2)}</td>
                </tr>
              )}
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>
                  <strong>GST Amount</strong>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>
                  <strong>{(cgst + sgst + igst).toFixed(2)}</strong>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>
                  <strong>Freight</strong>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>
                  <strong>{invoice.driverDetails?.transportMode || "-"}</strong>
                </td>
              </tr>
              <tr className="grand">
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>
                  <strong>Total Amount</strong>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 8px', lineHeight: '1.4' }}>
                  <strong>{total.toFixed(2)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BANK DETAILS & SIGNATURE */}
      <div className="footer-section">
        <div className="bank-details">
          <h4 className="text-white bg-black flex">Bank Details</h4>
          <p className="px-6"><strong>Account No:</strong>Aevix Chemical India Limited</p>
          
          <div className="grid grid-cols-2 px-6">
            <p>
            <strong>Bank:</strong> State Bank Of India{" "}
          </p>
          <p>
            <strong>Branch:</strong>SME N.S Road
          </p>
          <p>
            <strong>Account No:</strong>43320503750
          </p>
          <p>
            <strong>IFSC:</strong> IFSC- SBIN0015197
          </p>
          </div>
        </div>

        <div className="signature">
          <p>
            Certified that the particulars given above are true and correct.
          </p>
          <p>
            <strong>For AEVIX CHEMICAL</strong>
          </p>
          <p style={{ marginTop: "40px" }}>Authorised Signatory</p>
        </div>
      </div>
    </div>
  );
});

InvoicePDF.displayName = "InvoicePDF";

export default InvoicePDF;
