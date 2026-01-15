import React, { forwardRef } from "react";

const OrderAckPDF = forwardRef(({ oa }, ref) => {
  return (
    <div ref={ref} className="p-6 text-sm text-black bg-white w-[210mm] min-h-[297mm]">

      {/* TITLE */}
      <h1 className="text-center text-xl font-bold mb-4">
        ORDER ACKNOWLEDGEMENT
      </h1>

      {/* TOP SECTION */}
      <table className="w-full border mt-10 border-black mb-3">
        <tbody>
          <tr>
            <td className="border border-black p-2 w-1/2 align-top">
              <p><b>Supplier Name</b></p>
              <p>{oa.supplier.name}</p>
              <p className="mt-2"><b>Address</b></p>
              <p>{oa.supplier.address}</p>
              <p className="mt-2"><b>Ship From</b></p>
              <p>{oa.supplier.shipFrom}</p>
            </td>

            <td className="border border-black p-2 w-1/2 align-top">
              <p><b>OA Number & Date</b></p>
              <p>{oa.oaNumber} / {oa.oaDate}</p>
              <p className="mt-1"><b>Shipping:</b> {oa.shippingDetails.type}</p>
              <p><b>Net Weight:</b> {oa.shippingDetails.netWeight}</p>
              <p><b>Gross Weight:</b> {oa.shippingDetails.grossWeight}</p>
              <p><b>Order Date:</b> {oa.shippingDetails.orderDate}</p>
              <p><b>Dispatch Date:</b> {oa.shippingDetails.dispatchDate}</p>
              <p><b>Incoterms:</b> {oa.shippingDetails.incoterms}</p>
            </td>
          </tr>

          <tr>
            <td className="border border-black p-2 align-top">
              <p><b>Buyer Name</b></p>
              <p>{oa.buyer.name}</p>
              <p className="mt-1"><b>Address</b></p>
              <p>{oa.buyer.address}</p>
              <p className="mt-1"><b>GST</b></p>
              <p>{oa.buyer.gst}</p>
            </td>

            <td className="border border-black p-2 align-top">
              <p><b>Shipping Address</b></p>
              <p>{oa.buyer.shippingAddress}</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ITEMS TABLE */}
      <table className="w-full border border-black mb-4">
        <thead>
          <tr>
            {["Sl no","Product Name & Description","HSN","Qnty","UOM","Unit Price","GST & Amt","Total Amount"]
              .map((h) => (
                <th key={h} className="border border-black p-1 text-center">
                  {h}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {oa.items.map((item, i) => (
            <tr key={i}>
              <td className="border border-black p-1 text-center mb-1">{i + 1}</td>
              <td className="border border-black p-1 mb-1 text-center">{item.productName}</td>
              <td className="border border-black p-1 mb-1 text-center">{item.hsn}</td>
              <td className="border border-black p-1 mb-1 text-center">{item.quantity}</td>
              <td className="border border-black p-1 mb-1 text-center">{item.uom}</td>
              <td className="border border-black p-1 mb-1 text-center">{item.unitPrice}</td>
              <td className="border border-black p-1 mb-1 text-center">{item.gstAmount}</td>
              <td className="border border-black p-1 mb-1 text-center">{item.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* BOTTOM SECTIONS */}
      <div className="grid grid-cols-3 gap-3">
         {/* <div className="grid grid-cols-3 gap-3"> */}
        {/* <div className="grid grid-cols-3 gap-3"> */}
  <div className="border border-black p-2 text-sm space-y-1">
    <p>
      <b>Quotation Number:</b> {oa.quotation?.quotationNumber}
    </p>

    <p>
      <b>Quotation Date:</b>{" "}
      {oa.quotation?.quotationDate
        ? new Date(oa.quotation.quotationDate).toLocaleDateString()
        : ""}
    </p>

    <p>
      <b>PI Number:</b> {oa.quotation?.piNumber}
    </p>

    <p>
      <b>PI Date:</b>{" "}
      {oa.quotation?.piDate
        ? new Date(oa.quotation.piDate).toLocaleDateString()
        : ""}
    </p>

    <p>
      <b>PO Number:</b> {oa.quotation?.poNumber}
    </p>

    <p>
      <b>PO Date:</b>{" "}
      {oa.quotation?.poDate
        ? new Date(oa.quotation.poDate).toLocaleDateString()
        : ""}
    </p>

    <p>
      <b>Payment Terms:</b> {oa.quotation?.paymentTerms}
    </p>
  </div>
{/* </div> */}


        <div className="border border-black p-2">
          <p className="font-bold">Packing Details</p>
          <p>Pack Size: {oa.packingDetails.packSize}</p>
          <p>Packing Type: {oa.packingDetails.packingType}</p>
          <p>Color: {oa.packingDetails.color}</p>
          <p>Label: {oa.packingDetails.label}</p>
        </div>

        <div className="border border-black p-2">
          <p className="font-bold">Transport Details</p>
          <p>Transport Name: {oa.transportDetails.transportName}</p>
          <p>Booking Point: {oa.transportDetails.bookingPoint}</p>
          <p>Booking Person: {oa.transportDetails.bookingPersonName}</p>
          <p>Contact: {oa.transportDetails.bookingPersonContact}</p>
        </div>
      </div>
      <div className="border-2 px-2 py-2 mt-3 ">
        <h3 className="font-bold mt-2">
          Payment Type : {oa.paymentDetails?.paymentType}
        </h3>
        <h2>Payment Reference Number : <span>{oa.paymentDetails?.referenceNumber}</span></h2>
        <h2>Additional document along with shipment : <span>{oa.paymentDetails?.additionalDocuments}</span></h2>
        <h3 className="mb-2">Note : <span>{oa.paymentDetails?.additionalNotes}</span></h3>
      </div>
    </div>
  );
});

export default OrderAckPDF;
