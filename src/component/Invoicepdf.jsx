import React, { forwardRef } from "react";
import logo from "../assets/image.png";

const InvoicePDF = forwardRef(({ invoice }, ref) => {
  const isWestBengal = (invoice.state || "")
    .toLowerCase()
    .includes("west bengal");

  // Handle both old (single product) and new (products array) format
  const products = invoice.products && invoice.products.length > 0 
    ? invoice.products 
    : [{
        productName: invoice.productName,
        description: invoice.description,
        quantity: invoice.quantity,
        unit: invoice.unit,
        rate: invoice.rate,
      }];

  const legacyFreight = products.reduce(
    (sum, product) => sum + (Number(product.freight) || 0),
    0,
  );
  const invoiceFreight = Number(invoice.freight ?? legacyFreight) || 0;
  const productSubtotal = products.reduce((sum, product) => {
    const qty = Number(product.quantity) || 0;
    const rate = Number(product.rate) || 0;
    return sum + qty * rate;
  }, 0);
  const totalTaxable = productSubtotal;
  const totalCgst = isWestBengal ? totalTaxable * 0.09 : 0;
  const totalSgst = isWestBengal ? totalTaxable * 0.09 : 0;
  const totalIgst = !isWestBengal ? totalTaxable * 0.18 : 0;
  const grandTotal = totalTaxable + totalCgst + totalSgst + totalIgst+ invoiceFreight;
  const remainingAmount = invoice.payment?.remainingAmount + totalCgst + totalSgst + totalIgst + invoiceFreight;
  // console.log(remainingAmount);

  const amountInWords = (num) => {
    const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
    const teens = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
    const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];

    // Round to nearest integer
    num = Math.round(num);

    if (num === 0) return 'ZERO RUPEES ONLY';

    const convertToWords = (n) => {
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
      if (n < 1000) return ones[Math.floor(n / 100)] + ' HUNDRED' + (n % 100 !== 0 ? ' AND ' + convertToWords(n % 100) : '');
      return '';
    };

    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const hundred = Math.floor(num % 1000);

    let words = '';

    if (crore > 0) {
      words += convertToWords(crore) + ' CRORE ';
    }
    if (lakh > 0) {
      words += convertToWords(lakh) + ' LAKH ';
    }
    if (thousand > 0) {
      words += convertToWords(thousand) + ' THOUSAND ';
    }
    if (hundred > 0) {
      words += convertToWords(hundred);
    }

    return 'RUPEES ' + words.trim() + ' ONLY';
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
            className="h-20 w-30 object-contain"
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
            {/* <p>Kolkata, West Bengal - 700013</p> */}
            <a
              href="http://www.aevixchemical.com"
              className="text-blue-600 underline"
            >
              Website: www.aevixchemical.com
            </a>
          </div>
        </div>

        {/* RIGHT SIDE (TAX INVOICE) */}
        <div className="w-[40%] -mt-15 text-left">
          <h2 className="text-3xl font-bold mb-2">TAX INVOICE</h2>

          <table className="w-full border border-black border-collapse text-sm">
            <tbody>
              <tr>
                <td className="border border-black px-1 pb-3 pt-0 font-medium">
                  Invoice No
                </td>
                <td className="border border-black px-2 pb-3 pt-0">
                  {invoice.invoiceNo || invoice._id}
                </td>
              </tr>
              <tr>
                <td className="border border-black pb-3 pt-0 ">
                  Invoice Date
                </td>
                <td className="border border-black px-2 pb-3 pt-0">
                  {new Date(invoice.date).toLocaleDateString("en-IN")}
                </td>
              </tr>
                <tr>
                <td className="border border-black px-2 pb-3 pt-0 font-medium">
                  PI NO:
                </td>
                <td className="border border-black px-2 pb-3 pt-0">
                  {invoice.piNumber}
                </td>
              </tr>
                <tr>
                <td className="border border-black px-2 pb-3 pt-0 font-medium">
                  PO NO:
                </td>
                <td className="border border-black px-2 pb-3 pt-0">
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
          <h4 className="bg-black text-white w-55 pt-1 pb-3 h-8 flex items-center px-3">BILL TO : /CUSTOMER</h4>
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
          <h4 className="bg-black text-white w-55 h-8 pt-1 pb-3 flex items-center px-3">SHIP TO :</h4>
          <p>
            <strong>Name:</strong> {consignee.name || invoice.customer}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {consignee.address || invoice.shippingDetails?.shippingAddress}
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
          <h4 className="bg-black text-white w-55 h-8 pt-1 pb-3 flex items-center px-3">SHIPPING DETAILS :</h4>
          <p>
            <strong>Gross Weight:</strong> {invoice.shippingDetails?.grossWeight}
          </p>
          <p>
            <strong>Shipping Date:</strong>{" "}
            {formatDate(invoice.shippingDetails?.shippingDate)}
          </p>
          <p>
            <strong>Freight:</strong>{" "}
            {invoiceFreight.toFixed(2)}
          </p>
         
        </div>
      </div>

      {/* ITEMS TABLE */}
      <table className="items">
        <thead className="bg-black text-white">
          <tr className="bg-black">
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Sr</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Product / Service</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>HSN</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Qty</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Rate</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Taxable</th>
            {isWestBengal ? (
              <>
                <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>CGST</th>
                <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>SGST</th>
              </>
            ) : (
              <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>IGST</th>
            )}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const qty = product.quantity || 0;
            const rate = product.rate || 0;
            const taxable = qty * rate;
            const cgst = isWestBengal ? taxable * 0.09 : 0;
            const sgst = isWestBengal ? taxable * 0.09 : 0;
            const igst = !isWestBengal ? taxable * 0.18 : 0;

            return (
              <tr key={index}>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{index + 1}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>
                  <div>{product.productName}</div>
                  {product.description ? (
                    <div style={{ fontSize: '10px', color: '#555', marginTop: '4px' }}>{product.description}</div>
                  ) : null}
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{product.hsnCode || invoice.hsn || "-"}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>
                  {qty} {product.unit}
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
            );
          })}
         
          {Array.from({ length: Math.max(0, 5 - products.length) }).map((_, i) => (
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
          <h4 className="bg-black text-white flex items-center px-3 pt-1 pb-3">Total in Words</h4>
          <p className="px-6">{amountInWords(grandTotal)}</p>
          <hr/>
          <h4 className="bg-black text-white flex items-center px-3 pt-1 pb-3">Terms of Sale and Other Comments</h4>
          <p className="px-6"><strong>Transport Mode: </strong>{invoice.driverDetails?.transportMode || " Not specified"}</p>
          <p className="px-6"><strong>Driver call: </strong>{invoice.driverDetails?.driverPhone || " Not specified"}</p>
          <p className="px-6"><strong>Vehicle No: </strong>{invoice.driverDetails?.vehicleNo || " Not specified"}</p>
          <hr/>
          <h4 className="bg-black text-white flex items-center px-3 pt-1 pb-3">Payment Method</h4>
          <p className="px-6"><strong>Payment Date:</strong>{invoice.payment?.paymentDate || " Till not payment"}</p>
          <p className="px-6"><strong>Payment Type:</strong> {invoice.payment?.paymentType || " Till not payment"}</p>
          <p className="px-6"><strong>Paid Amount:</strong> {invoice.payment?.paidAmount || " Till not payment"}</p>
          <p className="px-6"><strong>Remaining Amount:</strong> {remainingAmount || "till not payment"}</p>
        </div>

        <div className="tax-summary">
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', width: '100px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Products Total</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>{productSubtotal.toFixed(2)}</td>
              </tr>
              
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', width: '100px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Taxable Amount</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>{totalTaxable.toFixed(2)}</td>
              </tr>

              {isWestBengal ? (
                <>
                  <tr>
                    <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>CGST(9%)</td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>{totalCgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>SGST(9%)</td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>{totalSgst.toFixed(2)}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>IGST(18%)</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>{totalIgst.toFixed(2)}</td>
                </tr>
              )}
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>
                  <strong>GST Amount</strong>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>
                  <strong>{(totalCgst + totalSgst + totalIgst).toFixed(2)}</strong>
                </td>
              </tr>
            
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', width: '100px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Freight</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>{invoiceFreight.toFixed(2)}</td>
              </tr>
              <tr className="grand">
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>
                  <strong>Total Amount</strong>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>
                  <strong>{grandTotal.toFixed(2)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BANK DETAILS & SIGNATURE */}
      <div className="footer-section">
        <div className="bank-details">
          <h4 className="bg-black text-white flex items-center px-3 pt-1 pb-3">Bank Details</h4>
          {/* <p className="px-6"><strong>Account No:</strong>Aevix Chemical India Limited</p> */}
          
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
            <strong>IFSC:</strong> SBIN0015197
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
