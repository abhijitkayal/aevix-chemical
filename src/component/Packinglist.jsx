// import React from 'react';
// import { Package, Download, Printer, CheckSquare, Box, Weight, Ruler } from 'lucide-react';

// const Packinglist = () => {
//   // Hardcoded packing list data
//   const packingData = {
//     packingListNo: 'PL-2026-0067',
//     date: '2026-01-06',
//     invoiceNo: 'INV-2026-0158',
//     challanNo: 'DC-2026-0042',
//     customerPO: 'PO/2026/0125',
//     shipmentDate: '2026-01-06',
//     transportMode: 'Road Transport',
//     vehicleNo: 'MH-02-AB-1234',
//     company: {
//       name: 'Aevix Chemical Pvt. Ltd.',
//       address: 'Plot No. 1, Industrial Park, Taloja MIDC, Navi Mumbai - 410208',
//       phone: '+91-22-4000-0000',
//       email: 'logistics@aevixchemical.com',
//       gstin: '27AAAAA0000A1Z5'
//     },
//     customer: {
//       name: 'ChemTrade Solutions Pvt. Ltd.',
//       address: 'Plot No. 12, Industrial Estate, MIDC Phase III, Andheri East, Mumbai - 400093',
//       phone: '+91-22-5555-0101',
//       contactPerson: 'Mr. Anil Sharma',
//       gstin: '27ABCDE1234F1Z5'
//     },
//     shippingAddress: {
//       name: 'ChemTrade Solutions - Warehouse 3',
//       address: 'Port Road, Nhava Sheva, Navi Mumbai - 400707',
//       landmark: 'Near Container Freight Station'
//     },
//     packages: [
//       {
//         id: 1,
//         packageNo: 'PKG-001',
//         description: 'Hydrochloric Acid 35%',
//         hsn: '2806',
//         batchNo: 'HCL-2026-001',
//         qty: 500,
//         unit: 'Liters',
//         packagingType: 'HDPE Drums',
//         noOfPackages: 10,
//         packSize: '50L each',
//         grossWeight: 530,
//         netWeight: 500,
//         dimensions: '58×58×90 cm',
//         volumetricWeight: 303,
//         handlingInstructions: 'Corrosive - Handle with care'
//       },
//       {
//         id: 2,
//         packageNo: 'PKG-002',
//         description: 'Sulfuric Acid 98%',
//         hsn: '2807',
//         batchNo: 'H2SO4-2026-018',
//         qty: 300,
//         unit: 'Liters',
//         packagingType: 'MS Drums',
//         noOfPackages: 6,
//         packSize: '50L each',
//         grossWeight: 340,
//         netWeight: 300,
//         dimensions: '58×58×90 cm',
//         volumetricWeight: 182,
//         handlingInstructions: 'Extremely corrosive'
//       },
//       {
//         id: 3,
//         packageNo: 'PKG-003',
//         description: 'Sodium Hydroxide Solution 50%',
//         hsn: '2815',
//         batchNo: 'NAOH-2026-022',
//         qty: 200,
//         unit: 'Kilograms',
//         packagingType: 'HDPE Drums',
//         noOfPackages: 4,
//         packSize: '50kg each',
//         grossWeight: 220,
//         netWeight: 200,
//         dimensions: '58×58×90 cm',
//         volumetricWeight: 121,
//         handlingInstructions: 'Caustic - Wear PPE'
//       }
//     ],
//     safetyInstructions: [
//       'All chemicals are hazardous - Wear appropriate PPE during handling',
//       'Keep packages upright at all times',
//       'Avoid exposure to heat, sparks, and open flames',
//       'Store in well-ventilated area away from incompatible materials',
//       'In case of spillage, follow emergency procedures on MSDS'
//     ],
//     packingNotes: 'All packages are sealed and labeled as per Hazardous Chemicals Rules. MSDS and COA enclosed with shipment.',
//     preparedBy: 'Suresh Patil',
//     checkedBy: 'Ramesh Gupta',
//     approvedBy: 'Vijay Mehta'
//   };

//   // Calculate totals
//   const totalPackages = packingData.packages.reduce((sum, pkg) => sum + pkg.noOfPackages, 0);
//   const totalGrossWeight = packingData.packages.reduce((sum, pkg) => sum + pkg.grossWeight, 0);
//   const totalNetWeight = packingData.packages.reduce((sum, pkg) => sum + pkg.netWeight, 0);
//   const totalVolumetricWeight = packingData.packages.reduce((sum, pkg) => sum + pkg.volumetricWeight, 0);

//   return (
//     <div className="p-6 mt-10 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         {/* Action Buttons */}
//         <div className="mb-4 flex justify-end gap-2">
//           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//             <Printer size={18} />
//             Print
//           </button>
//           <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
//             <Download size={18} />
//             Download PDF
//           </button>
//         </div>

//         {/* Packing List Document */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          
//           {/* Header */}
//           <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-3xl font-bold mb-2">PACKING LIST</h1>
//                 <p className="text-purple-100">Packing List No: <span className="font-semibold">{packingData.packingListNo}</span></p>
//                 <p className="text-purple-100 text-sm">Invoice No: {packingData.invoiceNo}</p>
//               </div>
//               <div className="text-right">
//                 <Package size={48} className="mb-2 ml-auto" />
//                 <p className="text-sm">Date: {packingData.date}</p>
//                 <p className="text-sm">Shipment: {packingData.shipmentDate}</p>
//               </div>
//             </div>
//           </div>

//           {/* Company & Customer Info */}
//           <div className="grid grid-cols-2 gap-6 p-6 border-b">
//             {/* From */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500 mb-2">SHIPPER (FROM)</h3>
//               <h2 className="text-xl font-bold text-gray-800 mb-1">{packingData.company.name}</h2>
//               <p className="text-sm text-gray-600">{packingData.company.address}</p>
//               <p className="text-sm text-gray-600 mt-2">Phone: {packingData.company.phone}</p>
//               <p className="text-sm text-gray-600">Email: {packingData.company.email}</p>
//               <p className="text-sm text-gray-700 mt-1">GSTIN: <span className="font-semibold">{packingData.company.gstin}</span></p>
//             </div>

//             {/* To */}
//             <div>
//               <div className="mb-3">
//                 <h3 className="text-sm font-semibold text-gray-500 mb-2">CONSIGNEE (TO)</h3>
//                 <h2 className="text-lg font-bold text-gray-800 mb-1">{packingData.customer.name}</h2>
//                 <p className="text-sm text-gray-600">{packingData.customer.address}</p>
//                 <p className="text-sm text-gray-600 mt-1">Contact: {packingData.customer.contactPerson}</p>
//                 <p className="text-sm text-gray-600">Phone: {packingData.customer.phone}</p>
//                 <p className="text-sm text-gray-700 mt-1">GSTIN: <span className="font-semibold">{packingData.customer.gstin}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* Shipping Address */}
//           <div className="px-6 py-4 bg-purple-50 border-b">
//             <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//               <Box size={16} />
//               SHIPPING ADDRESS
//             </h3>
//             <p className="text-sm font-semibold text-gray-800">{packingData.shippingAddress.name}</p>
//             <p className="text-sm text-gray-600">{packingData.shippingAddress.address}</p>
//             <p className="text-sm text-gray-500 italic">{packingData.shippingAddress.landmark}</p>
//           </div>

//           {/* Shipment Details */}
//           <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 border-b text-sm">
//             <div>
//               <p className="text-gray-500 font-medium">Challan No</p>
//               <p className="text-gray-800 font-semibold">{packingData.challanNo}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Customer PO</p>
//               <p className="text-gray-800 font-semibold">{packingData.customerPO}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Transport Mode</p>
//               <p className="text-gray-800 font-semibold">{packingData.transportMode}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 font-medium">Vehicle No</p>
//               <p className="text-gray-800 font-semibold">{packingData.vehicleNo}</p>
//             </div>
//           </div>

//           {/* Package Details Table */}
//           <div className="p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//               <CheckSquare size={20} />
//               Package Details
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="bg-purple-100 border-b-2 border-purple-300">
//                     <th className="p-2 text-left font-semibold text-gray-700">Pkg No</th>
//                     <th className="p-2 text-left font-semibold text-gray-700">Description</th>
//                     <th className="p-2 text-center font-semibold text-gray-700">HSN</th>
//                     <th className="p-2 text-center font-semibold text-gray-700">Batch No</th>
//                     <th className="p-2 text-right font-semibold text-gray-700">Qty</th>
//                     <th className="p-2 text-left font-semibold text-gray-700">Packaging</th>
//                     <th className="p-2 text-center font-semibold text-gray-700">No of Pkgs</th>
//                     <th className="p-2 text-right font-semibold text-gray-700">G.Wt (kg)</th>
//                     <th className="p-2 text-right font-semibold text-gray-700">N.Wt (kg)</th>
//                     <th className="p-2 text-left font-semibold text-gray-700">Dimensions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {packingData.packages.map((pkg) => (
//                     <tr key={pkg.id} className="border-b hover:bg-gray-50">
//                       <td className="p-2 font-mono text-purple-700 font-semibold">{pkg.packageNo}</td>
//                       <td className="p-2 text-gray-800">{pkg.description}</td>
//                       <td className="p-2 text-center text-gray-600">{pkg.hsn}</td>
//                       <td className="p-2 text-center font-mono text-gray-700">{pkg.batchNo}</td>
//                       <td className="p-2 text-right text-gray-800">
//                         <span className="font-semibold">{pkg.qty}</span> {pkg.unit}
//                       </td>
//                       <td className="p-2 text-gray-700">
//                         {pkg.packagingType}
//                         <div className="text-xs text-gray-500">{pkg.packSize}</div>
//                       </td>
//                       <td className="p-2 text-center font-semibold text-gray-800">{pkg.noOfPackages}</td>
//                       <td className="p-2 text-right text-gray-800">{pkg.grossWeight}</td>
//                       <td className="p-2 text-right text-gray-800">{pkg.netWeight}</td>
//                       <td className="p-2 text-gray-600 text-xs">{pkg.dimensions}</td>
//                     </tr>
//                   ))}
//                   {/* Totals Row */}
//                   <tr className="bg-purple-50 font-bold border-t-2 border-purple-300">
//                     <td colSpan="6" className="p-2 text-right">TOTAL:</td>
//                     <td className="p-2 text-center text-purple-900">{totalPackages}</td>
//                     <td className="p-2 text-right text-purple-900">{totalGrossWeight}</td>
//                     <td className="p-2 text-right text-purple-900">{totalNetWeight}</td>
//                     <td className="p-2"></td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Handling Instructions per Package */}
//           <div className="px-6 pb-6">
//             <h3 className="text-md font-semibold text-gray-800 mb-3">Handling Instructions by Package:</h3>
//             <div className="grid grid-cols-1 gap-2">
//               {packingData.packages.map((pkg) => (
//                 <div key={pkg.id} className="flex items-start gap-3 p-2 bg-orange-50 rounded border-l-4 border-orange-400">
//                   <span className="font-semibold text-orange-700 font-mono">{pkg.packageNo}:</span>
//                   <span className="text-sm text-gray-700">{pkg.handlingInstructions}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Weight Summary */}
//           <div className="px-6 pb-6">
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <Weight size={18} className="text-blue-600" />
//                 Weight Summary
//               </h3>
//               <div className="grid grid-cols-4 gap-4 text-sm">
//                 <div>
//                   <p className="text-gray-600">Total Packages</p>
//                   <p className="text-xl font-bold text-blue-900">{totalPackages}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Total Gross Weight</p>
//                   <p className="text-xl font-bold text-blue-900">{totalGrossWeight} kg</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Total Net Weight</p>
//                   <p className="text-xl font-bold text-blue-900">{totalNetWeight} kg</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Volumetric Weight</p>
//                   <p className="text-xl font-bold text-blue-900">{totalVolumetricWeight} kg</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Safety Instructions */}
//           <div className="px-6 pb-6">
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <span className="text-red-600 text-xl">⚠️</span>
//                 Safety & Handling Instructions
//               </h3>
//               <ul className="space-y-2">
//                 {packingData.safetyInstructions.map((instruction, index) => (
//                   <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
//                     <span className="text-red-600 font-bold">•</span>
//                     <span>{instruction}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Packing Notes */}
//           <div className="px-6 pb-6">
//             <div className="bg-gray-100 p-4 rounded">
//               <h3 className="font-semibold text-gray-800 mb-2">Packing Notes:</h3>
//               <p className="text-sm text-gray-700">{packingData.packingNotes}</p>
//             </div>
//           </div>

//           {/* Declaration */}
//           <div className="px-6 pb-6">
//             <div className="border-t pt-4">
//               <p className="text-xs text-gray-600 italic">
//                 We hereby certify that the above particulars are correct and that the packages are properly packed, marked, 
//                 labeled and in proper condition for transportation according to applicable regulations.
//               </p>
//             </div>
//           </div>

//           {/* Signatures */}
//           <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 border-t">
//             <div>
//               <div className="border-t-2 border-gray-400 pt-2 mt-16">
//                 <p className="text-sm font-semibold text-gray-800">{packingData.preparedBy}</p>
//                 <p className="text-xs text-gray-600">Prepared By</p>
//                 <p className="text-xs text-gray-500">Packing Supervisor</p>
//               </div>
//             </div>
//             <div>
//               <div className="border-t-2 border-gray-400 pt-2 mt-16">
//                 <p className="text-sm font-semibold text-gray-800">{packingData.checkedBy}</p>
//                 <p className="text-xs text-gray-600">Checked By</p>
//                 <p className="text-xs text-gray-500">Quality Control</p>
//               </div>
//             </div>
//             <div>
//               <div className="border-t-2 border-gray-400 pt-2 mt-16">
//                 <p className="text-sm font-semibold text-gray-800">{packingData.approvedBy}</p>
//                 <p className="text-xs text-gray-600">Approved By</p>
//                 <p className="text-xs text-gray-500">Logistics Manager</p>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-purple-900 text-white p-4 text-center">
//             <p className="text-sm font-semibold">This packing list is for identification purposes only and does not constitute title to goods.</p>
//             <p className="text-xs mt-1 text-purple-200">
//               For queries: {packingData.company.phone} | {packingData.company.email}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Packinglist;



;
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Plus, X } from "lucide-react";

export default function Packinglist() {
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([]);

  const [form, setForm] = useState({
    customerName: "",
    address: "",
    contactPerson: "",
    phone: "",
    gstin: "",
    dispatchFrom: "",
    dispatchAddress: "",
    shippingSame: true,
    placeOfSupply: "",

    packingNo: "",
    invoiceNo: "",
    invoiceDate: "",
    challanDate: "",
    poNo: "",
    poDate: "",
    lrNo: "",
    ewayNo: "",
    deliveryMode: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const savePacking = async () => {
    await axios.post("http://localhost:5000/api/packing-list", form);
    setOpen(false);
    fetchData();
  };

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/packing-list");
    setLists(res.data);
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
          <Plus /> Create Packing List
        </button>
      </div>

      {/* MODAL FORM */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-6xl p-6 rounded relative">
            <X className="absolute right-4 top-4 cursor-pointer" onClick={() => setOpen(false)} />

            <h2 className="text-xl font-bold mb-4">Create Packing List</h2>

            <div className="grid grid-cols-2 gap-6">
              {/* LEFT */}
              <div>
                <h3 className="font-semibold">Customer Information</h3>
                <input name="customerName" placeholder="M/S *" className="input w-full border-2 rounded py-2 mt-2 px-2" onChange={handleChange} />
                <textarea name="address" placeholder="Address" className="input w-full border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <div className="grid grid-cols-2 gap-3">
                <input name="contactPerson" placeholder="Contact Person" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <input name="phone" placeholder="Phone No" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <input name="gstin" placeholder="GSTIN / PAN" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <input name="placeOfSupply" placeholder="Place of Supply *" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                </div>
              </div>

              {/* RIGHT */}
              <div>
                <h3 className="font-semibold mb-2">Packing List Detail</h3>
                <div className="grid grid-cols-2 gap-3">
                <input name="packingNo" placeholder="Packing No *" className="input border-2 rounded py-2 px-2" onChange={handleChange} />
                <input name="invoiceNo" placeholder="Invoice No *" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <input type="date" name="invoiceDate" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <input type="date" name="challanDate" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <input name="poNo" placeholder="P.O. No" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <input type="date" name="poDate" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <input name="lrNo" placeholder="L.R. No" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <input name="ewayNo" placeholder="E-Way No" className="input border-2 rounded py-2 px-2 mt-2" onChange={handleChange} />
                <select name="deliveryMode" className="input border-2 w-full rounded py-2 px-2 mt-2" onChange={handleChange}>
                  <option value="">Select Delivery Mode</option>
                  <option>Road</option>
                  <option>Courier</option>
                  <option>Transport</option>
                </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={savePacking} className="bg-blue-600 text-white px-6 py-2 rounded">
                Save Packing List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {lists.map((pl) => (
        <div key={pl._id} className="bg-white grid grid-cols-2 p-4 rounded shadow mb-4 justify-between">
         <div className="mb-3 text-left">
          <h2 className="text-lg font-bold underline">Customer Details</h2>
          <p><b>Address:</b> {pl.address}</p>
          <p><b>Customer:</b> {pl.customerName}</p>
          <p><b>Contact:</b> {pl.phone}</p>
          <p><b>GST No:</b> {pl.gstin}</p>
        </div>
        {/* <hr/> */}
        <div className="text-left ml-10">
          <h2 className="text-lg font-bold underline">Packing Details</h2>
          <p><b>Packing No:</b> {pl.packingNo}</p>
          {/* <p><b>Customer:</b> {pl.customerName}</p> */}
          <p><b>Invoice:</b> {pl.invoiceNo}</p>
          <p><b>Place of Suply:</b>{pl.placeOfSupply}</p>
          <p><b>Delivery:</b> {pl.deliveryMode}</p>
        </div>
        </div>
      ))}
    </div>
  );
}
