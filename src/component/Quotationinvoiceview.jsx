import React from "react";
import logo from '../assets/AEVIX LOGO BLACK.png';

export default function QuotationInvoiceView({ quotation }) {
  if (!quotation) return null;

  // Check if state is West Bengal for SGST/CGST vs IGST
  const isWestBengal = quotation.placeOfSupply?.toLowerCase().includes("west bengal");
  const taxRate = 0.18; // 18% total tax

  // Calculate totals
  const items = quotation.items || [];
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  
  let sgstAmount = 0;
  let cgstAmount = 0;
  let igstAmount = 0;

  if (isWestBengal) {
    sgstAmount = subtotal * 0.09; // 9%
    cgstAmount = subtotal * 0.09; // 9%
  } else {
    igstAmount = subtotal * 0.18; // 18%
  }

  const totalTax = sgstAmount + cgstAmount + igstAmount;
  const grandTotal = subtotal + totalTax;

  return (
    <div 
      className="bg-white px-12 py-8 text-sm w-full" 
      style={{ 
        backgroundColor: '#ffffff',
        color: '#000000'
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between border-b pb-3 mb-4">
        <div className="flex gap-3">
          <img src={logo} alt="logo" className="w-20 h-20" />
          <div>
            <h2 className="text-xl font-bold">AEVIX CHEMICAL</h2>
            <p>158 Lenin Sarani, 2nd Floor</p>
            <p>Kolkata, West Bengal - 700013</p>
            <p><b>GSTIN:</b> 19BQJPR8561B1ZG</p>
          </div>
        </div>

        <div className="text-right">
          <p><b>Name:</b> Manab Roy</p>
          <p><b>Phone:</b> 9330324989</p>
          <p><b>Email:</b> manab.roy.ind@gmail.com</p>
          <p><b>PAN:</b> BQJPR8561B</p>
        </div>
      </div>

      {/* GSTIN / TITLE / ORIGINAL FOR RECIPIENT */}
      <div className="flex justify-between items-center border-y py-2 mb-4">
        <div className="font-semibold">
          <span>GSTIN : </span>19BQJPR8561B1ZG
        </div>
        <h2 className="text-xl font-bold">Quotation</h2>
        <div className="font-semibold">
          ORIGINAL FOR RECIPIENT
        </div>
      </div>

      {/* BUYER / CONSIGNEE / QUOTATION DETAILS */}
      <table className="w-full border mb-4">
        <tbody>
          <tr>
            <td className="border p-2 w-1/3" style={{ verticalAlign: 'top' }}>
              <b>Billed To</b><br />
              Name:{quotation.customerName}<br />
              Address: {quotation.billingAddress}<br />
              Phone: {quotation.phone}<br />
              GSTIN: {quotation.gstin}<br />
              State: {quotation.placeOfSupply}
            </td>

            <td className="border p-2 w-1/3" style={{ verticalAlign: 'top' }}>
              <b>Shipped To</b><br />
              Name: {quotation.customerName}<br />
              Address: {quotation.shippingAddress}<br />
              GSTIN: {quotation.gstin}
            </td>

            <td className="border p-2 w-1/3" style={{ verticalAlign: 'top' }}>
              <p><b>Quotation No: </b>{quotation.quotationNo}</p>
              
              <p className="mt-2"><b>Quotation Date: </b>{quotation.quotationDate}</p>
             
              <p className="mt-2"><b>Completion Date: </b>{quotation.challanDate || '-'}</p>
              
            </td>
          </tr>
        </tbody>
      </table>

      {/* QUOTATION INFO */}
      <table className="w-full border mb-4">
        <tbody>
          <tr>
            <td className="border p-2"><b>Quotation No</b></td>
            <td className="border p-2">{quotation.quotationNo}</td>
            <td className="border p-2"><b>Date</b></td>
            <td className="border p-2">{quotation.quotationDate}</td>
          </tr>
          <tr>
            <td className="border p-2"><b>Delivery Mode</b></td>
            <td className="border p-2">{quotation.deliveryMode}</td>
            <td className="border p-2"><b>LR No</b></td>
            <td className="border p-2">{quotation.lrNo}</td>
          </tr>
        </tbody>
      </table>

      {/* PRODUCT TABLE */}
      <table className="w-full border mb-4">
        <thead>
          <tr>
            <th className="border p-2">Sr</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">State</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Rate</th>
            <th className="border p-2">Taxable Amount</th>
            {isWestBengal ? (
              <>
                <th className="border p-2">SGST (9%)</th>
                <th className="border p-2">CGST (9%)</th>
              </>
            ) : (
              <th className="border p-2">IGST (18%)</th>
            )}
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const taxableAmount = item.quantity * item.rate;
            const itemSgst = isWestBengal ? taxableAmount * 0.09 : 0;
            const itemCgst = isWestBengal ? taxableAmount * 0.09 : 0;
            const itemIgst = !isWestBengal ? taxableAmount * 0.18 : 0;
            const itemTotal = taxableAmount + itemSgst + itemCgst + itemIgst;

            return (
              <tr key={index}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.productName}</td>
                <td className="border p-2">{item.state}</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-right">₹{item.rate.toFixed(2)}</td>
                <td className="border p-2 text-right">₹{taxableAmount.toFixed(2)}</td>
                {isWestBengal ? (
                  <>
                    <td className="border p-2 text-right">₹{itemSgst.toFixed(2)}</td>
                    <td className="border p-2 text-right">₹{itemCgst.toFixed(2)}</td>
                  </>
                ) : (
                  <td className="border p-2 text-right">₹{itemIgst.toFixed(2)}</td>
                )}
                <td className="border p-2 text-right">₹{itemTotal.toFixed(2)}</td>
              </tr>
            );
          })}

          {/* Subtotal Row */}
          <tr className="font-semibold" style={{ backgroundColor: '#f9fafb' }}>
            <td colSpan="5" className="border p-2 text-right">Subtotal:</td>
            <td className="border p-2 text-right">₹{subtotal.toFixed(2)}</td>
            {isWestBengal ? (
              <>
                <td className="border p-2 text-right">₹{sgstAmount.toFixed(2)}</td>
                <td className="border p-2 text-right">₹{cgstAmount.toFixed(2)}</td>
              </>
            ) : (
              <td className="border p-2 text-right">₹{igstAmount.toFixed(2)}</td>
            )}
            <td className="border p-2 text-right">₹{grandTotal.toFixed(2)}</td>
          </tr>

          {/* Grand Total Row */}
          <tr className="font-bold" style={{ backgroundColor: '#f3f4f6' }}>
            <td colSpan={isWestBengal ? 8 : 7} className="border p-2 text-right">
              Grand Total:
            </td>
            <td className="border p-2 text-right">₹{grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* FOOTER */}
      <div className="flex justify-between mt-6">
        <div>
          <b>Bank Details</b>
          <p>STANDARD CHARTERED BANK</p>
          <p>Acc: 33105223346</p>
          <p>IFSC: SCBL0036008</p>
        </div>

        <div className="text-right">
          <p>Certified that the particulars given above are true.</p>
          <p className="mt-10 font-semibold">For  AEVIX CHEMICAL</p>
          <p className="mt-6">Authorised Signatory</p>
        </div>
      </div>
    </div>
  );
}
