

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';

/* ======================
   Helpers
====================== */
const formatMonthKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}`;
};

const formatMonthLabel = (date) =>
  new Date(date).toLocaleString('en-IN', {
    month: 'short',
    year: 'numeric',
  });

const getLastMonths = (count = 6) => {
  const arr = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    arr.push({
      key: formatMonthKey(d),
      label: formatMonthLabel(d),
    });
  }
  return arr;
};

/* ======================
   Mini Bar Chart
====================== */
const MiniBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={60}>
    <BarChart data={data}>
      <Bar
        dataKey="value"
        fill="#10b981"
        radius={[4, 4, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
);

/* ======================
   Sale / Purchase Card
====================== */
const InvoiceAmountCard = ({ title, monthLabel, amount, chartData }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-lg font-semibold">{title}</h2>

    <p className="text-sm text-gray-500 mt-2">
      {monthLabel}
    </p>

    <p className="text-2xl font-bold mt-1">
      ₹ {amount.toLocaleString('en-IN')}
    </p>

    <div className="mt-4">
      <MiniBarChart data={chartData} />
    </div>
  </div>
);

/* ======================
   Main Overview
====================== */
const Overview = () => {
  const [saleCard, setSaleCard] = useState(null);
  const [purchaseCard, setPurchaseCard] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ======================
     Calculation Logic
  ====================== */
  const calculateInvoiceCardData = (invoices = []) => {
    const months = getLastMonths(6);
    const map = {};

    months.forEach((m) => {
      map[m.key] = {
        label: m.label,
        value: 0,
      };
    });

    invoices.forEach((inv) => {
      if (!inv.createdAt) return;

      const key = formatMonthKey(inv.createdAt);
      if (!map[key]) return;

      const amount =
        Number(inv.totalAmount) ||
        Number(inv.grandTotal) ||
        Number(inv.amount) ||
        0;

      map[key].value += amount;
    });

    const currentKey = formatMonthKey(new Date());

    return {
      amount: map[currentKey]?.value || 0,
      monthLabel: formatMonthLabel(new Date()),
      chartData: Object.values(map),
    };
  };

  /* ======================
     Fetch Data
  ====================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          salesRes,
          purchaseRes,
        ] = await Promise.all([
          axios.get('http://localhost:5000/api/invoices'), // SALE
          axios.get('http://localhost:5000/api/purchase-invoices'), // PURCHASE
        ]);

        setSaleCard(
          calculateInvoiceCardData(salesRes.data)
        );

        setPurchaseCard(
          calculateInvoiceCardData(purchaseRes.data)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-2 bg-cyan-50 ">

      {/* ======================
          SALE & PURCHASE CARDS
      ====================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {saleCard && (
          <InvoiceAmountCard
            title="Sale"
            monthLabel={saleCard.monthLabel}
            amount={saleCard.amount}
            chartData={saleCard.chartData}
          />
        )}

        {purchaseCard && (
          <InvoiceAmountCard
            title="Purchase"
            monthLabel={purchaseCard.monthLabel}
            amount={purchaseCard.amount}
            chartData={purchaseCard.chartData}
          />
        )}
      </div>
    </div>
  );
};

export default Overview;
