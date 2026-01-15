import React, { forwardRef } from "react";

const InvoicePDF = forwardRef(({ invoice }, ref) => {
  return (
    <div ref={ref} className="pdf-page">
      {/* HEADER */}
      <div className="header">
        <div>
          <img src="/aevix-logo.png" width="120" />
          <p className="company-name">AEVIX CHEMICAL INDIA LIMITED</p>
          <p>115, Jojra North, Rohanda GP, Madhyamgram</p>
          <p>Kolkata, West Bengal – 700135</p>
          <p>GSTIN: 19ABBCA1860B1Z4</p>
        </div>

        <div className="invoice-title">
          <h1>TAX INVOICE</h1>
          <table>
            <tbody>
              <tr><td>Date</td><td>{invoice.date}</td></tr>
              <tr><td>Due Date</td><td>{invoice.dueDate}</td></tr>
              <tr><td>Invoice No</td><td>{invoice.invoiceNo}</td></tr>
              <tr><td>PI Number</td><td>{invoice.piNumber}</td></tr>
              <tr><td>PI Date</td><td>{invoice.piDate}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BILL TO / SHIP TO / SHIPPING */}
      <div className="three-col">
        <div>
          <h4>BILL TO / CUSTOMER</h4>
          <p>{invoice.customer}</p>
          <p>{invoice.address}</p>
          <p>GSTIN: {invoice.gstin}</p>
        </div>

        <div>
          <h4>SHIP TO</h4>
          <p>{invoice.customer}</p>
          <p>{invoice.shippingAddress}</p>
        </div>

        <div>
          <h4>SHIPPING DETAILS</h4>
          <p>Shipping Date: {invoice.shippingDetails?.shippingDate}</p>
          <p>Est Gross Weight: {invoice.shippingDetails?.grossWeight}</p>
          <p>Est Net Weight: {invoice.shippingDetails?.netWeight}</p>
          <p>Total Packages: {invoice.shippingDetails?.totalPackages}</p>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <table className="items">
        <thead>
          <tr>
            <th>PRODUCT NAME</th>
            <th>UOM</th>
            <th>DESCRIPTION</th>
            <th>HSN</th>
            <th>QTY</th>
            <th>UNIT PRICE</th>
            <th>GST</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invoice.productName}</td>
            <td>{invoice.unit}</td>
            <td>{invoice.description}</td>
            <td>{invoice.hsn}</td>
            <td>{invoice.quantity}</td>
            <td>{invoice.rate}</td>
            <td>18%</td>
            <td>{invoice.totalAmount}</td>
          </tr>
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="totals">
        <table>
          <tbody>
            <tr><td>Subtotal</td><td>{invoice.totalAmount}</td></tr>
            <tr><td>GST (18%)</td><td>{invoice.totalAmount * 0.18}</td></tr>
            <tr className="grand"><td>TOTAL</td><td>₹ {invoice.totalAmount * 1.18}</td></tr>
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <p><b>Account Name:</b> Aevix Chemical India Limited</p>
        <p><b>Bank:</b> State Bank of India</p>
        <p><b>IFSC:</b> SBIN0015197</p>
        <p><b>In Words:</b> Rupees One Lakh Fifty Nine Thousand Three Hundred Only</p>
      </div>
    </div>
  );
});

InvoicePDF.displayName = "InvoicePDF";

export default InvoicePDF;
