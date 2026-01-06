import React from 'react';
import { Truck, Package, Download, Printer, CheckCircle, Clock } from 'lucide-react';

const Deliverychalan = () => {
  // Hardcoded delivery challan data
  const challanData = {
    challanNo: 'DC-2026-0042',
    date: '2026-01-06',
    time: '10:30 AM',
    invoiceRef: 'INV-2026-0158',
    poNumber: 'PO/2026/0125',
    vehicleNo: 'MH-02-AB-1234',
    driverName: 'Rajesh Kumar',
    driverPhone: '+91-98765-43210',
    eWayBillNo: 'EWB-123456789012',
    company: {
      name: 'Aevix Chemical Pvt. Ltd.',
      address: 'Plot No. 1, Industrial Park, Taloja MIDC, Navi Mumbai - 410208',
      phone: '+91-22-4000-0000',
      email: 'sales@aevixchemical.com',
      gstin: '27AAAAA0000A1Z5'
    },
    customer: {
      name: 'ChemTrade Solutions Pvt. Ltd.',
      address: 'Plot No. 12, Industrial Estate, MIDC Phase III, Andheri East, Mumbai - 400093',
      phone: '+91-22-5555-0101',
      contactPerson: 'Mr. Anil Sharma',
      gstin: '27ABCDE1234F1Z5'
    },
    deliveryAddress: {
      name: 'ChemTrade Solutions - Warehouse 3',
      address: 'Port Road, Nhava Sheva, Navi Mumbai - 400707',
      landmark: 'Near Container Freight Station'
    },
    items: [
      {
        id: 1,
        description: 'Hydrochloric Acid 35%',
        hsn: '2806',
        batchNo: 'HCL-2026-001',
        qty: 500,
        unit: 'Liters',
        packaging: '10 Drums of 50L each',
        remarks: 'Handle with care - Corrosive'
      },
      {
        id: 2,
        description: 'Sulfuric Acid 98%',
        hsn: '2807',
        batchNo: 'H2SO4-2026-018',
        qty: 300,
        unit: 'Liters',
        packaging: '6 Drums of 50L each',
        remarks: 'Keep away from water'
      },
      {
        id: 3,
        description: 'Sodium Hydroxide Solution 50%',
        hsn: '2815',
        batchNo: 'NAOH-2026-022',
        qty: 200,
        unit: 'Kilograms',
        packaging: '4 Drums of 50kg each',
        remarks: 'Store in cool place'
      }
    ],
    instructions: 'Handle all items with care. Wear protective equipment during unloading. Verify seal numbers before acceptance. Contact immediately if any damage or leakage is observed.',
    preparedBy: 'Suresh Patil',
    approvedBy: 'Ramesh Gupta',
    status: 'In Transit'
  };

  const totalPackages = challanData.items.length;

  return (
    <div className="p-6 mt-10 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Action Buttons */}
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-lg font-semibold ${
              challanData.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
              challanData.status === 'Delivered' ? 'bg-green-100 text-green-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              <Clock size={16} className="inline mr-2" />
              {challanData.status}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Printer size={18} />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <Download size={18} />
              Download
            </button>
          </div>
        </div>

        {/* Delivery Challan Document */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">DELIVERY CHALLAN</h1>
                <p className="text-orange-100">Challan No: <span className="font-semibold">{challanData.challanNo}</span></p>
                <p className="text-orange-100 text-sm">Invoice Ref: {challanData.invoiceRef}</p>
              </div>
              <div className="text-right">
                <Truck size={48} className="mb-2 ml-auto" />
                <p className="text-sm">Date: {challanData.date}</p>
                <p className="text-sm">Time: {challanData.time}</p>
              </div>
            </div>
          </div>

          {/* Company & Customer Info */}
          <div className="grid grid-cols-2 gap-6 p-6 border-b">
            {/* From */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">FROM (CONSIGNOR)</h3>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{challanData.company.name}</h2>
              <p className="text-sm text-gray-600">{challanData.company.address}</p>
              <p className="text-sm text-gray-600 mt-2">Phone: {challanData.company.phone}</p>
              <p className="text-sm text-gray-600">Email: {challanData.company.email}</p>
              <p className="text-sm text-gray-700 mt-1">GSTIN: <span className="font-semibold">{challanData.company.gstin}</span></p>
            </div>

            {/* To */}
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">TO (CONSIGNEE)</h3>
                <h2 className="text-lg font-bold text-gray-800 mb-1">{challanData.customer.name}</h2>
                <p className="text-sm text-gray-600">{challanData.customer.address}</p>
                <p className="text-sm text-gray-600 mt-2">Contact: {challanData.customer.contactPerson}</p>
                <p className="text-sm text-gray-600">Phone: {challanData.customer.phone}</p>
                <p className="text-sm text-gray-700 mt-1">GSTIN: <span className="font-semibold">{challanData.customer.gstin}</span></p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="px-6 py-4 bg-orange-50 border-b">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Package size={16} />
              DELIVERY ADDRESS
            </h3>
            <p className="text-sm font-semibold text-gray-800">{challanData.deliveryAddress.name}</p>
            <p className="text-sm text-gray-600">{challanData.deliveryAddress.address}</p>
            <p className="text-sm text-gray-500 italic">{challanData.deliveryAddress.landmark}</p>
          </div>

          {/* Transport & Reference Details */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b text-sm">
            <div>
              <p className="text-gray-500 font-medium">Vehicle Number</p>
              <p className="text-gray-800 font-semibold">{challanData.vehicleNo}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Driver Name</p>
              <p className="text-gray-800 font-semibold">{challanData.driverName}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Driver Phone</p>
              <p className="text-gray-800 font-semibold">{challanData.driverPhone}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">E-Way Bill No</p>
              <p className="text-gray-800 font-semibold">{challanData.eWayBillNo}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">PO Number</p>
              <p className="text-gray-800 font-semibold">{challanData.poNumber}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Total Packages</p>
              <p className="text-gray-800 font-semibold">{totalPackages} Items</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Material Details</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-orange-100 border-b-2 border-orange-300">
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">HSN</th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">Batch No</th>
                  <th className="p-3 text-right text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Packaging</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {challanData.items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-600">{item.id}</td>
                    <td className="p-3 text-sm text-gray-800 font-medium">{item.description}</td>
                    <td className="p-3 text-sm text-gray-600 text-center">{item.hsn}</td>
                    <td className="p-3 text-sm text-gray-700 text-center font-mono">{item.batchNo}</td>
                    <td className="p-3 text-sm text-gray-800 text-right">
                      <span className="font-semibold">{item.qty}</span> {item.unit}
                    </td>
                    <td className="p-3 text-sm text-gray-600">{item.packaging}</td>
                    <td className="p-3 text-sm text-orange-700 italic">{item.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Special Instructions */}
          <div className="px-6 pb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                Special Handling Instructions
              </h3>
              <p className="text-sm text-gray-700">{challanData.instructions}</p>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 border-t">
            <div>
              <div className="border-t-2 border-gray-400 pt-2 mt-16">
                <p className="text-sm font-semibold text-gray-800">{challanData.preparedBy}</p>
                <p className="text-xs text-gray-600">Prepared By</p>
              </div>
            </div>
            <div>
              <div className="border-t-2 border-gray-400 pt-2 mt-16">
                <p className="text-sm font-semibold text-gray-800">{challanData.approvedBy}</p>
                <p className="text-xs text-gray-600">Authorized Signatory</p>
              </div>
            </div>
            <div>
              <div className="border-t-2 border-gray-400 pt-2 mt-16">
                <p className="text-sm font-semibold text-gray-800">__________________</p>
                <p className="text-xs text-gray-600">Receiver's Signature & Stamp</p>
                <p className="text-xs text-gray-500 mt-1">Date & Time: __________</p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-orange-900 text-white p-4 text-center">
            <p className="text-sm">This is a computer-generated delivery challan and does not require signature for dispatch.</p>
            <p className="text-xs mt-1 text-orange-200">For queries, contact: {challanData.company.phone} | {challanData.company.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliverychalan;
