import React, { forwardRef } from "react";
import logo from "../assets/image.png";

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
  const products = Array.isArray(invoice?.products) && invoice.products.length > 0
    ? invoice.products
    : invoice?.product
      ? [invoice.product]
      : [];

  const productTotal = products.reduce((sum, product) => {
    const quantity = Number(product.quantity) || 0;
    const unitPrice = Number(product.unitPrice ?? product.rate) || 0;
    return sum + quantity * unitPrice;
  }, 0);

  const isWestBengal = (invoice.state || "")
    .toLowerCase()
    .includes("west bengal");
    const totalTaxable = productTotal + invoice.freight;
  const totalCgst = isWestBengal ? totalTaxable * 0.09 : 0;
  const totalSgst = isWestBengal ? totalTaxable * 0.09 : 0;
  const totalIgst = !isWestBengal ? totalTaxable * 0.18 : 0;
  const grandTotal = totalTaxable + totalCgst + totalSgst + totalIgst+ invoice.freight;

  return (
    <div
      ref={ref}
      className="pdf-page mx-auto bg-white mt-10"
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
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
                <p>GST IN:19ABBCA1860B1Z4</p>
              </div>
            </div>
    
            {/* RIGHT SIDE (TAX INVOICE) */}
            <div className="w-[40%] -mt-15 text-left">
              <h2 className="text-3xl font-bold mb-2">Purchase Order</h2>
    
              <table className="w-full border border-black border-collapse text-sm">
                <tbody>
                  <tr>
                    <td className="border border-black px-1 pb-3 pt-0 font-medium">
                      Po No
                    </td>
                    <td className="border border-black px-2 pb-3 pt-0">
                      {invoice.poNo || invoice._id}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-1 pb-3 pt-0 ">
                      Date
                    </td>
                    <td className="border border-black px-2 pb-3 pt-0">
                      {new Date(invoice.invoiceDate).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black px-1 pb-3 pt-0 ">
                      validity
                    </td>
                    <td className="border border-black px-2 pb-3 pt-0">
                      {new Date(invoice.validity).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                    <tr>
                    <td className="border border-black px-1 pb-3 pt-0 font-medium">
                      PI NO:
                    </td>
                    <td className="border border-black px-2 pb-3 pt-0">
                      {invoice.piNo}
                    </td>
                  </tr>
                    <tr>
                    <td className="border border-black px-1 pb-3 pt-0 font-medium">
                      PI Date:
                    </td>
                    <td className="border border-black px-2 pb-3 pt-0">
                      {new Date(invoice.piDate).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

      {/* <div className="grid grid-cols-2 gap-4 mb-6">
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
      </div> */}
      <div className="grid grid-cols-3 gap-2">
        <div className="buyer-section">
          <h4 className="bg-black text-white w-55 pt-1 pb-3 h-8 flex items-center px-3">BILL TO : /CUSTOMER</h4>
          <p>
            <strong>Name:</strong> {invoice.vendorName}
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
          {/* <p>
            <strong>PAN:</strong> {invoice.pan}
          </p>
          <p>
            <strong>State:</strong> {invoice.state}
          </p>
          <p>
            <strong>Place of Supply:</strong> {invoice.placeOfSupply}
          </p> */}
        </div>
         <div className="consignee-section">
          <h4 className="bg-black text-white w-55 h-8 pt-1 pb-3 flex items-center px-3">SHIP TO :</h4>
          <p>
            <strong>Name:</strong> {invoice.vendorName}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            { invoice.shippingDetails?.shippingAddress}
          </p>
          <p>
            <strong>Phone:</strong> {invoice.phone}
          </p>
          {/* <p>
            <strong>GSTIN:</strong> {invoice.gstin}
          </p>
          <p>
            <strong>State:</strong> { invoice.state}
          </p> */}
        </div>

        <div className="consignee-section">
          <h4 className="bg-black text-white w-55 h-8 pt-1 pb-3 flex items-center px-3">SHIPPING DETAILS :</h4>
          <p>
            <strong>Freight Type:</strong> {invoice.deliveryMode || ""}
          </p>
          <p>
            <strong>Shipping Date:</strong>{" "}
            {formatDate(invoice.shippingDetails?.shippingDate)}
          </p>
          <p>
            <strong>Est Gross Weight:</strong> {invoice.shippingDetails?.grossWeight}
          </p>
           <p>
            <strong>Est Net Weight:</strong> {invoice.shippingDetails?.netWeight}
          </p>
           {/* <p>
            <strong>Total Packages:</strong> {invoice.shippingDetails?.grossWeight}
          </p> */}
          {/* <p>
            <strong>Freight:</strong>{" "}
            {invoiceFreight.toFixed(2)}
          </p> */}
         
        </div>
      </div>


      {/* <h4 className="bg-black text-white w-fit px-3 py-1 mb-3">PRODUCT DETAILS</h4> */}
      {/* <table className="w-full border border-black border-collapse text-sm mb-6">
        <thead className="bg-black text-white">
          <tr>
            <th className="border border-black px-2 py-2 text-left">#</th>
            <th className="border border-black px-2 py-2 text-left">Product Name</th>
            <th className="border border-black px-2 py-2 text-left">Description</th>
            <th className="border border-black px-2 py-2 text-left">HSN</th>
            <th className="border border-black px-2 py-2 text-right">Qty</th>
            <th className="border border-black px-2 py-2 text-right">Unit Price</th>
            <th className="border border-black px-2 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? products.map((product, index) => {
            const quantity = Number(product.quantity) || 0;
            const unitPrice = Number(product.unitPrice ?? product.rate) || 0;
            const lineAmount = quantity * unitPrice;

            return (
              <tr key={`${product.productName || "product"}-${index}`}>
                <td className="border border-black px-2 py-2">{index + 1}</td>
                <td className="border border-black px-2 py-2">{product.productName || "-"}</td>
                <td className="border border-black px-2 py-2">{product.description || "-"}</td>
                <td className="border border-black px-2 py-2">{product.hsnCode || "-"}</td>
                <td className="border border-black px-2 py-2 text-right">{quantity || "-"}</td>
                <td className="border border-black px-2 py-2 text-right">₹{unitPrice.toFixed(2)}</td>
                <td className="border border-black px-2 py-2 text-right">₹{lineAmount.toFixed(2)}</td>
              </tr>
            );
          }) : (
            <tr>
              <td className="border border-black px-2 py-2 text-center" colSpan={7}>No products added</td>
            </tr>
          )}
        </tbody>
      </table> */}

 <table className="items">
        <thead className="bg-black text-white">
          <tr className="bg-black">
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Sr</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Product / Service</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Product Description</th>
            {/* <th style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Unit</th> */}
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
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>{product.description}</td>
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
         <div className="bottom-section">
        <div className="amount-words">
          <h4 className="bg-black text-white flex items-center px-3 pt-1 pb-1">Total in Words</h4>
          <p className="px-6">{amountInWords(grandTotal)}</p>
          <hr/>
          <h4 className="bg-black text-white flex items-center px-3 pt-1 pb-3">Terms of Sale and Other Comments</h4>
          <p className="px-6"><strong>Transport: </strong>{invoice.deliveryMode || " Not specified"}</p>
          <p className="px-6"><strong>Payment Term: </strong>{invoice.paymentTerm || " Not specified"}</p>
          <p className="px-6"><strong>Delivery Term: </strong>{invoice.deliveryTerm || " Not specified"}</p>
          <hr/>
          <p className="px-3">please send the following documents along with the consignment :
Invoice (3 Copies - Original, Duplicate and Triplicate) / Waybill (2 Copies) / Certificate of 
Analysis / LR Copy (if any).</p>
          {/* <h4 className="bg-black text-white flex items-center px-3 pt-1 pb-3">Payment Method</h4>
          <p className="px-6"><strong>Payment Date:</strong>{invoice.payment?.paymentDate || " Till not payment"}</p>
          <p className="px-6"><strong>Payment Type:</strong> {invoice.payment?.paymentType || " Till not payment"}</p>
          <p className="px-6"><strong>Paid Amount:</strong> {invoice.payment?.paidAmount || " Till not payment"}</p>
          <p className="px-6"><strong>Remaining Amount:</strong> {remainingAmount || "till not payment"}</p> */}
        </div>

        <div className="tax-summary">
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '42px', width: '100px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>Products Total</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '0px 0px 8px 8px', lineHeight: '1.4' }}>{productTotal.toFixed(2)}</td>
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
     
     
      

      
<h4 className="w-full bg-black text-white">TERMS AND CONDITION</h4>
      <div className="grid grid-cols-2">
        {/* <h4 className="bg-black text-white w-fit px-3 py-1 mb-3">TERMS</h4> */}
        <div className="">
          
          <p>1. If the details of the supply of Goods/Services or both are not uploaded on the GST portal by 11th day of the 
next month and taxes are not paid for the same by 20th day of the next month, the GST (Tax) amount will be put 
on hold by the AEVIX CHEMICAL INDIA LIMITED.</p>
<p>2. . Please arrange and dispatch ordered material as per given delivery schedule.  Material should be dispatched 
on/before the given timeline.</p>
<p>3. . COA & Package : In Certificate of Analysis and in Package of Material the following information must be mentioned 
Batch No., Manufacturing Date, Expiry Date, Pack Size, Net Weight and Gross Weight.</p>
<p>4.  Quality : Material should supply as per AEVIX Standard Specification norms.</p>
<p>5. Jurisdiction : Any suit or other proceedings to enforce the rights of either party shall only be instituted in and 
tried by the Courts of ordinary civil Jurisdiction in the city (KOLKATA)from where this order Is issued. </p>
          
        </div>

        <div className="mt-10 p-3 text-right flex flex-col justify-between">
          <div>
            <p className="mb-1">Certified that the particulars given above are true and correct.</p>
            <p><strong>For AEVIX CHEMICAL INDIA LIMITED</strong></p>
          </div>
          <p className="mt-8">Authorised Signatory</p>
        </div>
      </div>
    </div>
  );
});

PurchaseInvoicePDF.displayName = "PurchaseInvoicePDF";

export default PurchaseInvoicePDF;