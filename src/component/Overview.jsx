
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InvoiceSummary from './Invoicegraph';
import Salesandpurchase from './Salesandpurchase';

/* ======================
   Safe Number Formatter
====================== */
const formatNumber = (val) => {
  const num = isNaN(Number(val)) ? 0 : Number(val);
  return num.toLocaleString('en-IN');
};

const formatAmount = (val) => {
  const num = isNaN(Number(val)) ? 0 : Number(val);
  return `₹ ${num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

/* ======================
   Row Component
====================== */
const Row = ({ label, value, color }) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-sm">{label}</span>
    <span className="ml-auto font-medium">{value}</span>
  </div>
);

/* ======================
   Payment Card
====================== */
const PaymentCard = ({ title, data }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex gap-6">
    {/* <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center text-gray-400">
      Chart
    </div> */}

    <div className="flex-1">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-1">
        {formatAmount(data.total)}
      </p>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Cash</span>
          <span>{formatAmount(data.cash)}</span>
        </div>
        <div className="flex justify-between">
          <span>Online</span>
          <span>{formatAmount(data.online)}</span>
        </div>
        <div className="flex justify-between">
          <span>Cheque</span>
          <span>{formatAmount(data.cheque)}</span>
        </div>
        <div className="flex justify-between">
          <span>Bank</span>
          <span>{formatAmount(data.bank)}</span>
        </div>
      </div>
    </div>
  </div>
);

/* ======================
   Inventory Card
====================== */
const InventoryCard = ({ data }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-lg font-semibold mb-4">Inventory</h2>

    <div className="flex justify-between mb-6">
      <div>
        <p className="text-sm text-gray-500">Total Product</p>
        <p className="text-2xl font-bold">{data.totalProducts}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Total Quantity</p>
        <p className="text-2xl font-bold text-red-500">
          {formatNumber(data.totalQuantity)}
        </p>
      </div>
    </div>

    <div className="space-y-3">
      <Row label="In Stock" value={data.inStock} color="bg-green-400" />
      <Row label="Low Stock" value={data.lowStock} color="bg-purple-400" />
      <Row label="Zero Stock" value={data.zeroStock} color="bg-orange-400" />
      <Row label="Negative Stock" value={data.negativeStock} color="bg-red-400" />
    </div>
  </div>
);

/* ======================
   Overview Page
====================== */
const Overview = () => {
  const [inward, setInward] = useState(null);
  const [outward, setOutward] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ======================
     Calculate payment totals
  ====================== */
  const calculatePaymentTotals = (payments = []) =>
    payments.reduce(
      (acc, curr) => {
        const amount = Number(curr.amount) || 0;
        const type = curr.paymentType?.toLowerCase();

        acc.total += amount;
        if (type === 'cash') acc.cash += amount;
        else if (type === 'online payment') acc.online += amount;
        else if (type === 'cheque') acc.cheque += amount;
        else if (type === 'bank transfer') acc.bank += amount;

        return acc;
      },
      { total: 0, cash: 0, online: 0, cheque: 0, bank: 0 }
    );

  /* ======================
     Calculate inventory stats
  ====================== */
  const calculateInventory = (items = []) =>
    items.reduce(
      (acc, item) => {
        const qty = Number(item.currentStock) || 0;

        acc.totalProducts += 1;
        acc.totalQuantity += qty;

        if (qty > 10) acc.inStock += 1;
        else if (qty > 0) acc.lowStock += 1;
        else if (qty === 0) acc.zeroStock += 1;
        else acc.negativeStock += 1;

        return acc;
      },
      {
        totalProducts: 0,
        totalQuantity: 0,
        inStock: 0,
        lowStock: 0,
        zeroStock: 0,
        negativeStock: 0
      }
    );

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [inwardRes, outwardRes, inventoryRes] = await Promise.all([
          axios.get('http://localhost:5000/api/inward-payments'),
          axios.get('http://localhost:5000/api/outward-payments'),
          axios.get('http://localhost:5000/api/stocks')
        ]);

        setInward(calculatePaymentTotals(inwardRes.data));
        setOutward(calculatePaymentTotals(outwardRes.data));
        setInventory(calculateInventory(inventoryRes.data));
        console.log(inventoryRes.data);
      } catch (err) {
        console.error(err);
        setInward(calculatePaymentTotals([]));
        setOutward(calculatePaymentTotals([]));
        setInventory(calculateInventory([]));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6 mt-15 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <Salesandpurchase/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PaymentCard title="Inward Payment" data={inward} />
        <PaymentCard title="Outward Payment" data={outward} />
        <InventoryCard data={inventory} />
      </div>
      <InvoiceSummary/>
    </div>
  );
};

export default Overview;
