import React from 'react';
import { FileText, Download, Printer, Send, Calendar } from 'lucide-react';

const Proforma = () => {
  // Hardcoded proforma data
  const proformaData = {
    documentNo: 'PF-2026-001',
    date: '2026-01-06',
    validUntil: '2026-02-05',
    customer: {
      name: 'ChemTrade Solutions Pvt. Ltd.',
      address: 'Plot No. 12, Industrial Estate, MIDC Phase III, Andheri East, Mumbai - 400093',
      phone: '+91-22-5555-0101',
      email: 'purchase@chemtrade.example.com',
      gstin: '27ABCDE1234F1Z5'
    },
    shipTo: {
      name: 'ChemTrade Solutions - Warehouse 3',
      address: 'Port Road, Nhava Sheva, Navi Mumbai - 400707'
    },
    company: {
      name: 'Aevix Chemical Pvt. Ltd.',
      address: 'Plot No. 1, Industrial Park, Taloja MIDC, Navi Mumbai - 410208',
      phone: '+91-22-4000-0000',
      email: 'sales@aevixchemical.com',
      gstin: '27AAAAA0000A1Z5',
      pan: 'AAAAA0000A'
    },
    items: [
      { 
        id: 1, 
        description: 'Hydrochloric Acid 35%', 
        hsn: '2806', 
        qty: 500, 
        unit: 'Liters', 
        unitPrice: 450, 
        amount: 225000 
      },
      { 
        id: 2, 
        description: 'Sulfuric Acid 98%', 
        hsn: '2807', 
        qty: 300, 
        unit: 'Liters', 
        unitPrice: 200, 
        amount: 60000 
      },
      { 
        id: 3, 
        description: 'Sodium Hydroxide Solution 50%', 
        hsn: '2815', 
        qty: 200, 
        unit: 'Kilograms', 
        unitPrice: 165, 
        amount: 33000 
      },
      { 
        id: 4, 
        description: 'Ethanol 95% (Industrial Grade)', 
        hsn: '2207', 
        qty: 400, 
        unit: 'Liters', 
        unitPrice: 180, 
        amount: 72000 
      }
    ],
    taxPercent: 18,
    notes: 'Delivery within 7-10 working days from confirmation. Prices are exclusive of GST and transportation charges. This is a proforma invoice for quotation purposes only.',
    paymentTerms: 'Payment Terms: 50% advance, balance within 30 days of delivery',
    bankDetails: {
      bankName: 'State Bank of India',
      branch: 'Taloja MIDC Branch',
      accountNo: '1234567890',
      ifsc: 'SBIN0001234',
      accountName: 'Aevix Chemical Pvt. Ltd.'
    }
  };

  // Calculations
  const subtotal = proformaData.items.reduce((sum, item) => sum + item.amount, 0);
  const taxAmount = Math.round((subtotal * proformaData.taxPercent) / 100);
  const total = subtotal + taxAmount;

  return (
    <div className="p-6 mt-10 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Action Buttons */}
        <div className="mb-4 flex justify-end gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Printer size={18} />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download size={18} />
            Download PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            <Send size={18} />
            Send Email
          </button>
        </div>

        {/* Proforma Invoice Document */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">PROFORMA INVOICE</h1>
                <p className="text-blue-100">Document No: <span className="font-semibold">{proformaData.documentNo}</span></p>
              </div>
              <div className="text-right">
                <FileText size={48} className="mb-2 ml-auto" />
                <p className="text-sm">Date: {proformaData.date}</p>
                <p className="text-sm">Valid Until: {proformaData.validUntil}</p>
              </div>
            </div>
          </div>

          {/* Company & Customer Info */}
          <div className="grid grid-cols-2 gap-6 p-6 border-b">
            {/* From */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">FROM</h3>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{proformaData.company.name}</h2>
              <p className="text-sm text-gray-600">{proformaData.company.address}</p>
              <p className="text-sm text-gray-600 mt-2">Phone: {proformaData.company.phone}</p>
              <p className="text-sm text-gray-600">Email: {proformaData.company.email}</p>
              <div className="mt-2 pt-2 border-t">
                <p className="text-sm text-gray-700">GSTIN: <span className="font-semibold">{proformaData.company.gstin}</span></p>
                <p className="text-sm text-gray-700">PAN: <span className="font-semibold">{proformaData.company.pan}</span></p>
              </div>
            </div>

            {/* To */}
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">BILL TO</h3>
                <h2 className="text-lg font-bold text-gray-800 mb-1">{proformaData.customer.name}</h2>
                <p className="text-sm text-gray-600">{proformaData.customer.address}</p>
                <p className="text-sm text-gray-600 mt-2">Phone: {proformaData.customer.phone}</p>
                <p className="text-sm text-gray-600">Email: {proformaData.customer.email}</p>
                <p className="text-sm text-gray-700 mt-1">GSTIN: <span className="font-semibold">{proformaData.customer.gstin}</span></p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">SHIP TO</h3>
                <p className="text-sm font-semibold text-gray-800">{proformaData.shipTo.name}</p>
                <p className="text-sm text-gray-600">{proformaData.shipTo.address}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">HSN</th>
                  <th className="p-3 text-right text-sm font-semibold text-gray-700">Qty</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">Unit</th>
                  <th className="p-3 text-right text-sm font-semibold text-gray-700">Rate (₹)</th>
                  <th className="p-3 text-right text-sm font-semibold text-gray-700">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {proformaData.items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-600">{item.id}</td>
                    <td className="p-3 text-sm text-gray-800">{item.description}</td>
                    <td className="p-3 text-sm text-gray-600 text-center">{item.hsn}</td>
                    <td className="p-3 text-sm text-gray-800 text-right font-medium">{item.qty}</td>
                    <td className="p-3 text-sm text-gray-600">{item.unit}</td>
                    <td className="p-3 text-sm text-gray-800 text-right">{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-sm text-gray-800 text-right font-semibold">{item.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-6 flex justify-end">
              <div className="w-80">
                <div className="flex justify-between py-2 text-sm border-b">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">₹ {subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-2 text-sm border-b">
                  <span className="text-gray-700">GST ({proformaData.taxPercent}%)</span>
                  <span className="font-semibold">₹ {taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-3 text-lg font-bold bg-blue-50 px-3 rounded mt-2">
                  <span className="text-blue-900">Total Amount</span>
                  <span className="text-blue-900">₹ {total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Bank Details */}
          <div className="bg-gray-50 p-6 border-t space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Payment Terms:</h3>
              <p className="text-sm text-gray-700">{proformaData.paymentTerms}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Bank Details:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Bank Name: <span className="font-medium text-gray-800">{proformaData.bankDetails.bankName}</span></p>
                  <p className="text-gray-600">Branch: <span className="font-medium text-gray-800">{proformaData.bankDetails.branch}</span></p>
                  <p className="text-gray-600">Account Name: <span className="font-medium text-gray-800">{proformaData.bankDetails.accountName}</span></p>
                </div>
                <div>
                  <p className="text-gray-600">Account No: <span className="font-medium text-gray-800">{proformaData.bankDetails.accountNo}</span></p>
                  <p className="text-gray-600">IFSC Code: <span className="font-medium text-gray-800">{proformaData.bankDetails.ifsc}</span></p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Notes:</h3>
              <p className="text-sm text-gray-700">{proformaData.notes}</p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500 italic">
                This is a proforma invoice and does not constitute a tax invoice. 
                Final tax invoice will be issued upon order confirmation and payment receipt.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-blue-900 text-white p-4 text-center">
            <p className="text-sm">Thank you for your business!</p>
            <p className="text-xs mt-1 text-blue-200">For queries, contact us at {proformaData.company.email} or {proformaData.company.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proforma;
