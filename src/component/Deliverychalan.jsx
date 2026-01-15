// import React from 'react';
// import { Truck, Package, Download, Printer, CheckCircle, Clock } from 'lucide-react';

// const Deliverychalan = () => {
//   // Hardcoded delivery challan data
//   const challanData = {
//     challanNo: 'DC-2026-0042',
//     date: '2026-01-06',
//     time: '10:30 AM',
//     invoiceRef: 'INV-2026-0158',
//     poNumber: 'PO/2026/0125',
//     vehicleNo: 'MH-02-AB-1234',
//     driverName: 'Rajesh Kumar',
//     driverPhone: '+91-98765-43210',
//     eWayBillNo: 'EWB-123456789012',
//     company: {
//       name: 'Aevix Chemical Pvt. Ltd.',
//       address: 'Plot No. 1, Industrial Park, Taloja MIDC, Navi Mumbai - 410208',
//       phone: '+91-22-4000-0000',
//       email: 'sales@aevixchemical.com',
//       gstin: '27AAAAA0000A1Z5'
//     },
//     customer: {
//       name: 'ChemTrade Solutions Pvt. Ltd.',
//       address: 'Plot No. 12, Industrial Estate, MIDC Phase III, Andheri East, Mumbai - 400093',
//       phone: '+91-22-5555-0101',
//       contactPerson: 'Mr. Anil Sharma',
//       gstin: '27ABCDE1234F1Z5'
//     },
//     deliveryAddress: {
//       name: 'ChemTrade Solutions - Warehouse 3',
//       address: 'Port Road, Nhava Sheva, Navi Mumbai - 400707',
//       landmark: 'Near Container Freight Station'
//     },
//     items: [
//       {
//         id: 1,
//         description: 'Hydrochloric Acid 35%',
//         hsn: '2806',
//         batchNo: 'HCL-2026-001',
//         qty: 500,
//         unit: 'Liters',
//         packaging: '10 Drums of 50L each',
//         remarks: 'Handle with care - Corrosive'
//       },
//       {
//         id: 2,
//         description: 'Sulfuric Acid 98%',
//         hsn: '2807',
//         batchNo: 'H2SO4-2026-018',
//         qty: 300,
//         unit: 'Liters',
//         packaging: '6 Drums of 50L each',
//         remarks: 'Keep away from water'
//       },
//       {
//         id: 3,
//         description: 'Sodium Hydroxide Solution 50%',
//         hsn: '2815',
//         batchNo: 'NAOH-2026-022',
//         qty: 200,
//         unit: 'Kilograms',
//         packaging: '4 Drums of 50kg each',
//         remarks: 'Store in cool place'
//       }
//     ],
//     instructions: 'Handle all items with care. Wear protective equipment during unloading. Verify seal numbers before acceptance. Contact immediately if any damage or leakage is observed.',
//     preparedBy: 'Suresh Patil',
//     approvedBy: 'Ramesh Gupta',
//     status: 'In Transit'
//   };

//   const totalPackages = challanData.items.length;

//   return (
//     <div className="p-6 mt-10 min-h-screen">
//       <div className="max-w-5xl mx-auto">
//         {/* Action Buttons */}
//         <div className="mb-4 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className={`px-4 py-2 rounded-lg font-semibold ${
//               challanData.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
//               challanData.status === 'Delivered' ? 'bg-green-100 text-green-800' :
//               'bg-yellow-100 text-yellow-800'
//             }`}>
//               <Clock size={16} className="inline mr-2" />
//               {challanData.status}
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
//           </div>
//         </div>

//         {/* Delivery Challan Document */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          
//           {/* Header */}
//           <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-3xl font-bold mb-2">DELIVERY CHALLAN</h1>
//                 <p className="text-orange-100">Challan No: <span className="font-semibold">{challanData.challanNo}</span></p>
//                 <p className="text-orange-100 text-sm">Invoice Ref: {challanData.invoiceRef}</p>
//               </div>
//               <div className="text-right">
//                 <Truck size={48} className="mb-2 ml-auto" />
//                 <p className="text-sm">Date: {challanData.date}</p>
//                 <p className="text-sm">Time: {challanData.time}</p>
//               </div>
//             </div>
//           </div>

//           {/* Company & Customer Info */}
//           <div className="grid grid-cols-2 gap-6 p-6 border-b">
//             {/* From */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500 mb-2">FROM (CONSIGNOR)</h3>
//               <h2 className="text-xl font-bold text-gray-800 mb-1">{challanData.company.name}</h2>
//               <p className="text-sm text-gray-600">{challanData.company.address}</p>
//               <p className="text-sm text-gray-600 mt-2">Phone: {challanData.company.phone}</p>
//               <p className="text-sm text-gray-600">Email: {challanData.company.email}</p>
//               <p className="text-sm text-gray-700 mt-1">GSTIN: <span className="font-semibold">{challanData.company.gstin}</span></p>
//             </div>

//             {/* To */}
//             <div>
//               <div className="mb-4">
//                 <h3 className="text-sm font-semibold text-gray-500 mb-2">TO (CONSIGNEE)</h3>
//                 <h2 className="text-lg font-bold text-gray-800 mb-1">{challanData.customer.name}</h2>
//                 <p className="text-sm text-gray-600">{challanData.customer.address}</p>
//                 <p className="text-sm text-gray-600 mt-2">Contact: {challanData.customer.contactPerson}</p>
//                 <p className="text-sm text-gray-600">Phone: {challanData.customer.phone}</p>
//                 <p className="text-sm text-gray-700 mt-1">GSTIN: <span className="font-semibold">{challanData.customer.gstin}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Delivery Address */}
//           <div className="px-6 py-4 bg-orange-50 border-b">
//             <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//               <Package size={16} />
//               DELIVERY ADDRESS
//             </h3>
//             <p className="text-sm font-semibold text-gray-800">{challanData.deliveryAddress.name}</p>
//             <p className="text-sm text-gray-600">{challanData.deliveryAddress.address}</p>
//             <p className="text-sm text-gray-500 italic">{challanData.deliveryAddress.landmark}</p>
//           </div>

//           {/* Transport & Reference Details */}
//           <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b text-sm">
//             <div>
//               <p className="text-gray-500 font-medium">Vehicle Number</p>
//               <p className="text-gray-800 font-semibold">{challanData.vehicleNo}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Driver Name</p>
//               <p className="text-gray-800 font-semibold">{challanData.driverName}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Driver Phone</p>
//               <p className="text-gray-800 font-semibold">{challanData.driverPhone}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">E-Way Bill No</p>
//               <p className="text-gray-800 font-semibold">{challanData.eWayBillNo}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">PO Number</p>
//               <p className="text-gray-800 font-semibold">{challanData.poNumber}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Total Packages</p>
//               <p className="text-gray-800 font-semibold">{totalPackages} Items</p>
//             </div>
//           </div>

//           {/* Items Table */}
//           <div className="p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Material Details</h3>
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-orange-100 border-b-2 border-orange-300">
//                   <th className="p-3 text-left text-sm font-semibold text-gray-700">#</th>
//                   <th className="p-3 text-left text-sm font-semibold text-gray-700">Description</th>
//                   <th className="p-3 text-center text-sm font-semibold text-gray-700">HSN</th>
//                   <th className="p-3 text-center text-sm font-semibold text-gray-700">Batch No</th>
//                   <th className="p-3 text-right text-sm font-semibold text-gray-700">Quantity</th>
//                   <th className="p-3 text-left text-sm font-semibold text-gray-700">Packaging</th>
//                   <th className="p-3 text-left text-sm font-semibold text-gray-700">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {challanData.items.map((item) => (
//                   <tr key={item.id} className="border-b hover:bg-gray-50">
//                     <td className="p-3 text-sm text-gray-600">{item.id}</td>
//                     <td className="p-3 text-sm text-gray-800 font-medium">{item.description}</td>
//                     <td className="p-3 text-sm text-gray-600 text-center">{item.hsn}</td>
//                     <td className="p-3 text-sm text-gray-700 text-center font-mono">{item.batchNo}</td>
//                     <td className="p-3 text-sm text-gray-800 text-right">
//                       <span className="font-semibold">{item.qty}</span> {item.unit}
//                     </td>
//                     <td className="p-3 text-sm text-gray-600">{item.packaging}</td>
//                     <td className="p-3 text-sm text-orange-700 italic">{item.remarks}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Special Instructions */}
//           <div className="px-6 pb-6">
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <span className="text-yellow-600">⚠️</span>
//                 Special Handling Instructions
//               </h3>
//               <p className="text-sm text-gray-700">{challanData.instructions}</p>
//             </div>
//           </div>

//           {/* Signatures */}
//           <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 border-t">
//             <div>
//               <div className="border-t-2 border-gray-400 pt-2 mt-16">
//                 <p className="text-sm font-semibold text-gray-800">{challanData.preparedBy}</p>
//                 <p className="text-xs text-gray-600">Prepared By</p>
//               </div>
//             </div>
//             <div>
//               <div className="border-t-2 border-gray-400 pt-2 mt-16">
//                 <p className="text-sm font-semibold text-gray-800">{challanData.approvedBy}</p>
//                 <p className="text-xs text-gray-600">Authorized Signatory</p>
//               </div>
//             </div>
//             <div>
//               <div className="border-t-2 border-gray-400 pt-2 mt-16">
//                 <p className="text-sm font-semibold text-gray-800">__________________</p>
//                 <p className="text-xs text-gray-600">Receiver's Signature & Stamp</p>
//                 <p className="text-xs text-gray-500 mt-1">Date & Time: __________</p>
//               </div>
//             </div>
//           </div>

//           {/* Footer Note */}
//           <div className="bg-orange-900 text-white p-4 text-center">
//             <p className="text-sm">This is a computer-generated delivery challan and does not require signature for dispatch.</p>
//             <p className="text-xs mt-1 text-orange-200">For queries, contact: {challanData.company.phone} | {challanData.company.email}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Deliverychalan;




import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";
import React from "react";

export default function Deliverychalan() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    supplyType: "Outward",
    customerName: "",
    address: "",
    contactPerson: "",
    phone: "",
    gstin: "",
    reverseCharge: "No",
    shippingSame: true,
    placeOfSupply: "",

    type: "",
    challanPrefix: "",
    challanNo: "",
    challanPostfix: "",
    challanDate: "",
    lrNo: "",
    ewayNo: "",
    ewayReason: "",
    deliveryMode: "",
  });
const [supplyType, setSupplyType] = useState("Outward");
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveChallan = async () => {
    await axios.post("http://localhost:5000/api/delivery-challan", form);
    setOpen(false);
    fetchData();
  };

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/delivery-challan");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 mt-15 min-h-screen">
      {/* RIGHT BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded flex gap-2"
        >
          <Plus size={18} /> Create Delivery Challan
        </button>
      </div>

      {/* MODAL FORM */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-6xl p-6 rounded relative">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="grid grid-cols-2 gap-6">
              {/* LEFT */}
              <div>
                <h3 className="font-semibold mb-3">Customer Information</h3>

                <div className="flex gap-4 mb-2">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="supplyType"
      value="Outward"
      checked={supplyType === "Outward"}
      onChange={(e) => setSupplyType(e.target.value)}
    />
    Outward
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="supplyType"
      value="Inward"
      checked={supplyType === "Inward"}
      onChange={(e) => setSupplyType(e.target.value)}
    />
    Inward
  </label>
</div>


                <input name="customerName" placeholder="M/S *" className="input w-full border-2 rounded px-2 py-2" onChange={handleChange} />
                <textarea name="address" placeholder="Address" className="input w-full border-2 rounded px-2 py-2 mt-2" onChange={handleChange} />
                <div className="flex gap-3">
                <input name="contactPerson" placeholder="Contact Person" className=" border-2 w-100 rounded px-2 py-2 input mt-2" onChange={handleChange} />
                <input name="phone" placeholder="Phone No" className="  border-2 rounded px-2 w-100 py-2input mt-2" onChange={handleChange} />
                </div>
                <div className="flex gap-3">
                <input name="gstin" placeholder="GSTIN / PAN" className=" border-2 rounded w-100 px-2 py-2 input mt-2" onChange={handleChange} />

                {/* <select name="reverseCharge" className="input mt-2  border-2 rounded px-2 py-2" onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                </select> */}

                <input name="placeOfSupply" placeholder="Place of Supply *" className="input w-100 border-2 rounded px-2 py-2 mt-2" onChange={handleChange} />
              </div>
              </div>

              {/* RIGHT */}
              <div>
                <h3 className="font-semibold mb-3">Delivery Challan Detail</h3>

                 {/* <select name="type" className="input" onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option>Job Work</option>
                  <option>Supply</option>
                  <option>Return</option>
                </select>  */}

                <div className="flex gap-2 mt-2">
                  <input name="challanPrefix" placeholder="Prefix" className="input w-1/3 border-2 rounded px-2 py-2" onChange={handleChange} />
                  <input name="challanNo" placeholder="Challan No *" className="input w-1/3 border-2 rounded px-2 py-2" onChange={handleChange} />
                  <input name="challanPostfix" placeholder="Postfix" className="input w-1/3 border-2 rounded px-2 py-2" onChange={handleChange} />
                </div>
                  <div className="grid grid-cols-2 gap-3">
                <input type="date" name="challanDate" className="input mt-2  border-2 rounded px-2 py-2" onChange={handleChange} />
                <input name="lrNo" placeholder="L.R. No" className="input mt-2 border-2 rounded px-2 py-2" onChange={handleChange} />
                </div>
                <div className="grid grid-col-2 gap-3">
                <input name="ewayNo" placeholder="E-Way No" className="input mt-2 border-2 rounded px-2 py-2" onChange={handleChange} />
                <input name="ewayReason" placeholder="Reason for E-Way" className="input border-2 rounded px-2 py-2 mt-2" onChange={handleChange} />
                  </div>
                <select name="deliveryMode" className="input mt-2 w-full border-2 rounded px-2 py-2" onChange={handleChange}>
                  <option value="">Select Delivery Mode</option>
                  <option>Road</option>
                  <option>Courier</option>
                  <option>Transport</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={saveChallan}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Save Delivery Challan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {data.map((dc) => (
        <div key={dc._id} className="bg-white grid grid-cols-2 p-4 rounded shadow mb-4">
          <div>
            <h2 className="text-lg font-bold underline">Customer Details</h2>
          <p><b>Address:</b>{dc.address}</p>
          <p><b>Customer:</b> {dc.customerName}</p>
          <p><b>Phone:</b> {dc.phone}</p>
          <p><b>GST In:</b> {dc.gstin}</p>
          </div>
          <div>
            <h2 className="text-lg underline font-bold">Delivery Challan Details</h2>
          <p><b>Challan No:</b> {dc.challanPrefix}{dc.challanNo}{dc.challanPostfix}</p>
          <p><b>LR No:</b> {dc.lrNo}</p>
          <p><b>Date:</b> {dc.challanDate}</p>
          <p><b>Delivery Mode:</b> {dc.deliveryMode}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
