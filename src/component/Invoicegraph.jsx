
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Area,
// } from 'recharts';

// /* ======================
//    Helpers
// ====================== */

// // Format date → "Jan 2026"
// const formatMonth = (date) =>
//   new Date(date).toLocaleString('en-IN', {
//     month: 'short',
//     year: 'numeric',
//   });

// // Get last N months dynamically
// const getLastMonths = (count = 6) => {
//   const months = [];
//   const now = new Date();

//   for (let i = count - 1; i >= 0; i--) {
//     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     months.push(formatMonth(d));
//   }
//   return months;
// };

// const formatCurrencyK = (val) =>
//   `₹ ${(Number(val || 0) / 1000).toFixed(0)} K`;

// /* ======================
//    Component
// ====================== */
// const InvoiceSummary = () => {
//   const [countData, setCountData] = useState([]);
//   const [amountData, setAmountData] = useState([]);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const res = await axios.get('https://aevix-chemical-mpbw.vercel.app/api/invoices');
//         console.log(res.data);
//         const invoices = res.data || [];

//         const months = getLastMonths(6);

//         /* ======================
//            Initialize month map
//         ====================== */
//         const summary = {};
//         months.forEach((m) => {
//           summary[m] = {
//             month: m,
//             invoiceCount: 0,
//             totalAmount: 0,
//           };
//         });

//         /* ======================
//            Process invoices
//         ====================== */
//         invoices.forEach((inv) => {
//           if (!inv.createdAt) return;

//           const monthKey = formatMonth(inv.createdAt);
//           if (!summary[monthKey]) return;

//           summary[monthKey].invoiceCount += 1;

//           const amount =
//             Number(inv.totalAmount) ||
//             Number(inv.grandTotal) ||
//             0;

//           summary[monthKey].totalAmount += amount;
//         });

//         const finalData = Object.values(summary);
//         setCountData(finalData);
//         setAmountData(finalData);
//         console.log('Invoice summary data:', finalData);
//       } catch (error) {
//         console.error('Invoice fetch error:', error);
//         setCountData([]);
//         setAmountData([]);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

//       {/* ======================
//           Invoice Count Summary
//       ====================== */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-lg font-semibold mb-4">
//           Invoice Count Summary
//         </h2>

//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={countData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="invoiceCount"
//               fill="#10b981"
//               name="Invoices"
//               radius={[6, 6, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* ======================
//           Invoice Amount Summary
//       ====================== */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-lg font-semibold mb-4">
//           Invoice Amount Summary
//         </h2>

//        <ResponsiveContainer width="100%" height={300}>
//   <LineChart data={amountData}>
//     <CartesianGrid strokeDasharray="3 3" />
//     <XAxis dataKey="month" />
//     <YAxis />
//     <Tooltip formatter={(v) => `₹ ${v.toLocaleString('en-IN')}`} />
//     <Legend />

//     {/* AREA */}
//     <Area
//       type="monotone"
//       dataKey="totalAmount"
//       stroke="#10b981"
//       fill="#a7f3d0"
//       fillOpacity={0.5}
//       name="Invoice Amount"
//     />

//     {/* LINE (CRITICAL FIX) */}
//     <Line
//       type="monotone"
//       dataKey="totalAmount"
//       stroke="#047857"
//       strokeWidth={3}
//       dot={{ r: 5 }}
//       activeDot={{ r: 7 }}
//     />
//   </LineChart>
// </ResponsiveContainer>

//       </div>

//     </div>
//   );
// };

// export default InvoiceSummary;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

/* ======================
   Helper Functions
====================== */

// Convert date to "Jan 2026"
const formatMonth = (date) =>
  new Date(date).toLocaleString("en-IN", {
    month: "short",
    year: "numeric",
  });

// Get last N months (default 6)
const getLastMonths = (count = 6) => {
  const months = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(formatMonth(d));
  }
  return months;
};

const InvoiceSummary = () => {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/invoices`
        );

        // Ensure invoices is an array
        const invoices = Array.isArray(res.data) ? res.data : [];
        const months = getLastMonths(6);

        /* ======================
           Initialize summary map
        ====================== */
        const summary = {};
        months.forEach((m) => {
          summary[m] = {
            month: m,
            invoiceCount: 0,
            totalAmount: 0,
          };
        });

        /* ======================
           Process invoices
        ====================== */
        invoices.forEach((inv) => {
          const date = inv.createdAt || inv.invoiceDate;
          if (!date) return;

          const monthKey = formatMonth(date);
          if (!summary[monthKey]) return;

          summary[monthKey].invoiceCount += 1;

          const amount =
            Number(inv.totalAmount) ||
            Number(inv.grandTotal) ||
            0;

          summary[monthKey].totalAmount += amount;
        });

        setSummaryData(Object.values(summary));
        console.log("Invoice summary data:", Object.values(summary));
      } catch (error) {
        console.error("Invoice fetch error:", error);
        setSummaryData([]);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* ======================
          Invoice Count Summary
      ====================== */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          Invoice Count Summary
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="invoiceCount"
              fill="#10b981"
              name="Invoices"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ======================
          Invoice Amount Summary
      ====================== */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          Invoice Amount Summary
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `₹ ${v / 1000}K`} />
            <Tooltip formatter={(v) => `₹ ${v.toLocaleString("en-IN")}`} />
            <Legend />

            <Area
              type="monotone"
              dataKey="totalAmount"
              stroke="#10b981"
              fill="#a7f3d0"
              fillOpacity={0.6}
              name="Invoice Amount"
            />

            <Line
              type="monotone"
              dataKey="totalAmount"
              stroke="#047857"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default InvoiceSummary;
