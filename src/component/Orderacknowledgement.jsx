// import React from 'react';
// import { CheckCircle, FileCheck, Download, Printer, Mail, Calendar, Clock } from 'lucide-react';

// const Orderacknowledgement = () => {
//   // Hardcoded order acknowledgement data
//   const orderData = {
//     acknowledgementNo: 'OA-2026-0089',
//     date: '2026-01-06',
//     orderDate: '2026-01-05',
//     customerPO: 'PO/2026/0125',
//     quotationRef: 'QT-2026-0142',
//     expectedDelivery: '2026-01-20',
//     paymentTerms: '50% Advance, Balance within 30 days',
//     deliveryTerms: 'Ex-Works Taloja MIDC',
//     company: {
//       name: 'Aevix Chemical Pvt. Ltd.',
//       address: 'Plot No. 1, Industrial Park, Taloja MIDC, Navi Mumbai - 410208',
//       phone: '+91-22-4000-0000',
//       email: 'sales@aevixchemical.com',
//       website: 'www.aevixchemical.com',
//       gstin: '27AAAAA0000A1Z5',
//       pan: 'AAAAA0000A'
//     },
//     customer: {
//       name: 'ChemTrade Solutions Pvt. Ltd.',
//       address: 'Plot No. 12, Industrial Estate, MIDC Phase III, Andheri East, Mumbai - 400093',
//       phone: '+91-22-5555-0101',
//       email: 'purchase@chemtrade.example.com',
//       contactPerson: 'Mr. Anil Sharma',
//       designation: 'Purchase Manager',
//       gstin: '27ABCDE1234F1Z5'
//     },
//     items: [
//       {
//         id: 1,
//         description: 'Hydrochloric Acid 35% (Technical Grade)',
//         hsn: '2806',
//         qty: 500,
//         unit: 'Liters',
//         rate: 450,
//         amount: 225000,
//         deliveryDate: '2026-01-18',
//         remarks: 'As per IS 265:2012'
//       },
//       {
//         id: 2,
//         description: 'Sulfuric Acid 98% (AR Grade)',
//         hsn: '2807',
//         qty: 300,
//         unit: 'Liters',
//         rate: 200,
//         amount: 60000,
//         deliveryDate: '2026-01-20',
//         remarks: 'With COA'
//       },
//       {
//         id: 3,
//         description: 'Sodium Hydroxide Solution 50%',
//         hsn: '2815',
//         qty: 200,
//         unit: 'Kilograms',
//         rate: 165,
//         amount: 33000,
//         deliveryDate: '2026-01-18',
//         remarks: 'In HDPE drums'
//       },
//       {
//         id: 4,
//         description: 'Ethanol 95% (Industrial Grade)',
//         hsn: '2207',
//         qty: 400,
//         unit: 'Liters',
//         rate: 180,
//         amount: 72000,
//         deliveryDate: '2026-01-20',
//         remarks: 'With MSDS'
//       }
//     ],
//     termsAndConditions: [
//       'Prices are valid for 30 days from the date of this acknowledgement.',
//       'Delivery schedule is subject to receipt of purchase order and advance payment.',
//       'GST @ 18% will be charged extra as applicable.',
//       'Transportation and insurance charges are on buyer\'s account.',
//       'All materials will be supplied with Certificate of Analysis (COA).',
//       'Payment terms: 50% advance with order, balance within 30 days of delivery.',
//       'Delivery will be made at our factory gate (Ex-Works).',
//       'Any disputes will be subject to Navi Mumbai jurisdiction only.'
//     ],
//     specialInstructions: 'Please confirm the order within 3 working days. Advance payment should be made to our bank account as mentioned below.',
//     acknowledgedBy: 'Ramesh Gupta',
//     designation: 'Sales Manager',
//     status: 'Confirmed'
//   };

//   const subtotal = orderData.items.reduce((sum, item) => sum + item.amount, 0);
//   const taxPercent = 18;
//   const taxAmount = Math.round((subtotal * taxPercent) / 100);
//   const total = subtotal + taxAmount;

//   return (
//     <div className="p-6 mt-10 min-h-screen">
//       <div className="max-w-5xl mx-auto">
//         {/* Action Buttons */}
//         <div className="mb-4 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
//               orderData.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
//               orderData.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//               'bg-blue-100 text-blue-800'
//             }`}>
//               <CheckCircle size={16} />
//               {orderData.status}
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//               <Printer size={18} />
//               Print
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
//               <Download size={18} />
//               Download
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
//               <Mail size={18} />
//               Send Email
//             </button>
//           </div>
//         </div>

//         {/* Order Acknowledgement Document */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          
//           {/* Header */}
//           <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-3xl font-bold mb-2">ORDER ACKNOWLEDGEMENT</h1>
//                 <p className="text-green-100">Acknowledgement No: <span className="font-semibold">{orderData.acknowledgementNo}</span></p>
//                 <p className="text-green-100 text-sm">Customer PO: {orderData.customerPO}</p>
//               </div>
//               <div className="text-right">
//                 <FileCheck size={48} className="mb-2 ml-auto" />
//                 <p className="text-sm">Date: {orderData.date}</p>
//                 <p className="text-sm">Order Date: {orderData.orderDate}</p>
//               </div>
//             </div>
//           </div>

//           {/* Company & Customer Info */}
//           <div className="grid grid-cols-2 gap-6 p-6 border-b">
//             {/* From */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500 mb-2">FROM (VENDOR)</h3>
//               <h2 className="text-xl font-bold text-gray-800 mb-1">{orderData.company.name}</h2>
//               <p className="text-sm text-gray-600">{orderData.company.address}</p>
//               <p className="text-sm text-gray-600 mt-2">Phone: {orderData.company.phone}</p>
//               <p className="text-sm text-gray-600">Email: {orderData.company.email}</p>
//               <p className="text-sm text-gray-600">Website: {orderData.company.website}</p>
//               <div className="mt-2 pt-2 border-t">
//                 <p className="text-sm text-gray-700">GSTIN: <span className="font-semibold">{orderData.company.gstin}</span></p>
//                 <p className="text-sm text-gray-700">PAN: <span className="font-semibold">{orderData.company.pan}</span></p>
//               </div>
//             </div>

//             {/* To */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500 mb-2">TO (CUSTOMER)</h3>
//               <h2 className="text-lg font-bold text-gray-800 mb-1">{orderData.customer.name}</h2>
//               <p className="text-sm text-gray-600">{orderData.customer.address}</p>
//               <p className="text-sm text-gray-600 mt-2">Contact Person: {orderData.customer.contactPerson}</p>
//               <p className="text-sm text-gray-600">Designation: {orderData.customer.designation}</p>
//               <p className="text-sm text-gray-600">Phone: {orderData.customer.phone}</p>
//               <p className="text-sm text-gray-600">Email: {orderData.customer.email}</p>
//               <p className="text-sm text-gray-700 mt-1">GSTIN: <span className="font-semibold">{orderData.customer.gstin}</span></p>
//             </div>
//           </div>

//           {/* Order Details */}
//           <div className="grid grid-cols-4 gap-4 p-6 bg-green-50 border-b text-sm">
//             <div>
//               <p className="text-gray-500 font-medium flex items-center gap-1">
//                 <Calendar size={14} />
//                 Expected Delivery
//               </p>
//               <p className="text-gray-800 font-semibold">{orderData.expectedDelivery}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Payment Terms</p>
//               <p className="text-gray-800 font-semibold text-xs">{orderData.paymentTerms}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Delivery Terms</p>
//               <p className="text-gray-800 font-semibold">{orderData.deliveryTerms}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Quotation Ref</p>
//               <p className="text-gray-800 font-semibold">{orderData.quotationRef}</p>
//             </div>
//           </div>

//           {/* Confirmation Message */}
//           <div className="p-6 bg-green-100 border-l-4 border-green-500">
//             <div className="flex items-start gap-3">
//               <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-semibold text-gray-800 text-lg">Thank you for your order!</h3>
//                 <p className="text-sm text-gray-700 mt-1">
//                   We are pleased to acknowledge your purchase order referenced above. This acknowledgement confirms our acceptance of your order under the terms and conditions specified below.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Items Table */}
//           <div className="p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-green-100 border-b-2 border-green-300">
//                   <th className="p-3 text-left text-sm font-semibold text-gray-700">#</th>
//                   <th className="p-3 text-left text-sm font-semibold text-gray-700">Description</th>
//                   <th className="p-3 text-center text-sm font-semibold text-gray-700">HSN</th>
//                   <th className="p-3 text-right text-sm font-semibold text-gray-700">Qty</th>
//                   <th className="p-3 text-right text-sm font-semibold text-gray-700">Rate (₹)</th>
//                   <th className="p-3 text-right text-sm font-semibold text-gray-700">Amount (₹)</th>
//                   <th className="p-3 text-center text-sm font-semibold text-gray-700">Delivery Date</th>
//                   <th className="p-3 text-left text-sm font-semibold text-gray-700">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderData.items.map((item) => (
//                   <tr key={item.id} className="border-b hover:bg-gray-50">
//                     <td className="p-3 text-sm text-gray-600">{item.id}</td>
//                     <td className="p-3 text-sm text-gray-800">{item.description}</td>
//                     <td className="p-3 text-sm text-gray-600 text-center">{item.hsn}</td>
//                     <td className="p-3 text-sm text-gray-800 text-right">
//                       <span className="font-semibold">{item.qty}</span> {item.unit}
//                     </td>
//                     <td className="p-3 text-sm text-gray-800 text-right">{item.rate.toLocaleString('en-IN')}</td>
//                     <td className="p-3 text-sm text-gray-800 text-right font-semibold">{item.amount.toLocaleString('en-IN')}</td>
//                     <td className="p-3 text-sm text-gray-700 text-center">{item.deliveryDate}</td>
//                     <td className="p-3 text-sm text-blue-700 italic">{item.remarks}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Totals */}
//             <div className="mt-6 flex justify-end">
//               <div className="w-80">
//                 <div className="flex justify-between py-2 text-sm border-b">
//                   <span className="text-gray-700">Subtotal</span>
//                   <span className="font-semibold">₹ {subtotal.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div className="flex justify-between py-2 text-sm border-b">
//                   <span className="text-gray-700">GST ({taxPercent}%)</span>
//                   <span className="font-semibold">₹ {taxAmount.toLocaleString('en-IN')}</span>
//                 </div>
//                 <div className="flex justify-between py-3 text-lg font-bold bg-green-50 px-3 rounded mt-2">
//                   <span className="text-green-900">Total Order Value</span>
//                   <span className="text-green-900">₹ {total.toLocaleString('en-IN')}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Special Instructions */}
//           {orderData.specialInstructions && (
//             <div className="px-6 pb-4">
//               <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
//                 <h3 className="font-semibold text-gray-800 mb-2">📌 Special Instructions:</h3>
//                 <p className="text-sm text-gray-700">{orderData.specialInstructions}</p>
//               </div>
//             </div>
//           )}

//           {/* Terms and Conditions */}
//           <div className="p-6 bg-gray-50 border-t">
//             <h3 className="font-semibold text-gray-800 mb-3">Terms and Conditions:</h3>
//             <ul className="space-y-2">
//               {orderData.termsAndConditions.map((term, index) => (
//                 <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
//                   <span className="text-green-600 font-bold mt-0.5">•</span>
//                   <span>{term}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Bank Details */}
//           <div className="p-6 bg-yellow-50 border-t">
//             <h3 className="font-semibold text-gray-800 mb-3">Bank Details for Payment:</h3>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-gray-600">Bank Name: <span className="font-medium text-gray-800">State Bank of India</span></p>
//                 <p className="text-gray-600">Branch: <span className="font-medium text-gray-800">Taloja MIDC Branch</span></p>
//                 <p className="text-gray-600">Account Name: <span className="font-medium text-gray-800">{orderData.company.name}</span></p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Account No: <span className="font-medium text-gray-800">1234567890</span></p>
//                 <p className="text-gray-600">IFSC Code: <span className="font-medium text-gray-800">SBIN0001234</span></p>
//                 <p className="text-gray-600">Account Type: <span className="font-medium text-gray-800">Current Account</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Signature */}
//           <div className="p-6 border-t">
//             <div className="flex justify-end">
//               <div className="text-center">
//                 <div className="border-t-2 border-gray-400 pt-3 mt-16 w-64">
//                   <p className="font-semibold text-gray-800">{orderData.acknowledgedBy}</p>
//                   <p className="text-sm text-gray-600">{orderData.designation}</p>
//                   <p className="text-sm text-gray-600">{orderData.company.name}</p>
//                   <p className="text-xs text-gray-500 mt-1">Authorized Signatory</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-green-900 text-white p-4 text-center">
//             <p className="text-sm font-semibold">This is a system-generated order acknowledgement.</p>
//             <p className="text-xs mt-1 text-green-200">
//               For any queries, please contact us at {orderData.company.phone} or {orderData.company.email}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orderacknowledgement;

;
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Plus, Eye, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import OrderAckPDF from "./Orderackpdf";
import OrderAckForm from "./OrderackForm";

export default function OrderAcknowledgement() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedOA, setSelectedOA] = useState(null);
  const printRef = useRef();

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/order-acknowledgements");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleView = (oa) => {
    setSelectedOA(oa);
    setTimeout(() => handlePrint(), 300);
  };

  const handleDownload = (oa) => {
    const el = document.getElementById(`oa-${oa._id}`);
    html2pdf()
      .set({
        filename: `OA-${oa.oaNumber}.pdf`,
        jsPDF: { format: "a4", orientation: "portrait" },
        html2canvas: { scale: 2 },
      })
      .from(el)
      .save();
  };

  return (
    <div className="p-6 mt-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Order Acknowledgements</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded flex gap-2"
        >
          <Plus /> Create OA
        </button>
      </div>

      <table className="w-full bg-white border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">OA No</th>
            <th className="p-3">Buyer</th>
            <th className="p-3">Date</th>
            <th className="p-3">Total</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((oa) => (
            <tr key={oa._id} className="border-t">
              <td className="p-3">{oa.oaNumber}</td>
              <td className="p-3">{oa.buyer.name}</td>
              <td className="p-3">
                {new Date(oa.oaDate).toLocaleDateString()}
              </td>
              <td className="p-3">₹ {oa.totalAmount}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleView(oa)}>
                  <Eye />
                </button>
                <button onClick={() => handleDownload(oa)}>
                  <Download />
                </button>
              </td>

              {/* Hidden PDF */}
              <td className="hidden">
                <div id={`oa-${oa._id}`}>
                  <OrderAckPDF oa={oa} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOA && (
        <div className="hidden">
          <div ref={printRef}>
            <OrderAckPDF oa={selectedOA} />
          </div>
        </div>
      )}

      {showForm && (
        <OrderAckForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}
