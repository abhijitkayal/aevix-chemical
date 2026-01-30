// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import InvoiceSummary from './Invoicegraph';
// import Salesandpurchase from './Salesandpurchase';

// /* ======================
//    Safe Number Formatter
// ====================== */
// const formatNumber = (val) => {
//   const num = isNaN(Number(val)) ? 0 : Number(val);
//   return num.toLocaleString('en-IN');
// };

// const formatAmount = (val) => {
//   const num = isNaN(Number(val)) ? 0 : Number(val);
//   return `₹ ${num.toLocaleString('en-IN', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   })}`;
// };

// /* ======================
//    Row Component
// ====================== */
// const Row = ({ label, value, color }) => (
//   <div className="flex items-center gap-2">
//     <span className={`w-3 h-3 rounded-full ${color}`} />
//     <span className="text-sm">{label}</span>
//     <span className="ml-auto font-medium">{value}</span>
//   </div>
// );

// /* ======================
//    Payment Card
// ====================== */
// const PaymentCard = ({ title, data }) => (
//   <div className="bg-white rounded-xl shadow-md p-6 flex gap-6">
//     {/* <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center text-gray-400">
//       Chart
//     </div> */}

//     <div className="flex-1">
//       <h2 className="text-lg font-semibold">{title}</h2>
//       <p className="text-2xl font-bold mt-1">
//         {formatAmount(data.total)}
//       </p>

//       <div className="mt-4 space-y-2 text-sm">
//         <div className="flex justify-between">
//           <span>Cash</span>
//           <span>{formatAmount(data.cash)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Online</span>
//           <span>{formatAmount(data.online)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Cheque</span>
//           <span>{formatAmount(data.cheque)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Bank</span>
//           <span>{formatAmount(data.bank)}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// /* ======================
//    Inventory Card
// ====================== */
// const InventoryCard = ({ data }) => (
//   <div className="bg-white rounded-xl shadow-md p-6">
//     <h2 className="text-lg font-semibold mb-4">Inventory</h2>

//     <div className="flex justify-between mb-6">
//       <div>
//         <p className="text-sm text-gray-500">Total Product</p>
//         <p className="text-2xl font-bold">{data.totalProducts}</p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Total Quantity</p>
//         <p className="text-2xl font-bold text-red-500">
//           {formatNumber(data.totalQuantity)}
//         </p>
//       </div>
//     </div>

//     <div className="space-y-3">
//       <Row label="In Stock" value={data.inStock} color="bg-green-400" />
//       <Row label="Low Stock" value={data.lowStock} color="bg-purple-400" />
//       <Row label="Zero Stock" value={data.zeroStock} color="bg-orange-400" />
//       <Row label="Negative Stock" value={data.negativeStock} color="bg-red-400" />
//     </div>
//   </div>
// );

// /* ======================
//    Overview Page
// ====================== */
// const Overview = () => {
//   const [inward, setInward] = useState(null);
//   const [outward, setOutward] = useState(null);
//   const [inventory, setInventory] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* ======================
//      Calculate payment totals
//   ====================== */
//   const calculatePaymentTotals = (payments = []) =>
//     payments.reduce(
//       (acc, curr) => {
//         const amount = Number(curr.amount) || 0;
//         const type = curr.paymentType?.toLowerCase();

//         acc.total += amount;
//         if (type === 'cash') acc.cash += amount;
//         else if (type === 'online payment') acc.online += amount;
//         else if (type === 'cheque') acc.cheque += amount;
//         else if (type === 'bank transfer') acc.bank += amount;

//         return acc;
//       },
//       { total: 0, cash: 0, online: 0, cheque: 0, bank: 0 }
//     );

//   /* ======================
//      Calculate inventory stats
//   ====================== */
//   const calculateInventory = (items = []) =>
//     items.reduce(
//       (acc, item) => {
//         const qty = Number(item.currentStock) || 0;

//         acc.totalProducts += 1;
//         acc.totalQuantity += qty;

//         if (qty > 10) acc.inStock += 1;
//         else if (qty > 0) acc.lowStock += 1;
//         else if (qty === 0) acc.zeroStock += 1;
//         else acc.negativeStock += 1;

//         return acc;
//       },
//       {
//         totalProducts: 0,
//         totalQuantity: 0,
//         inStock: 0,
//         lowStock: 0,
//         zeroStock: 0,
//         negativeStock: 0
//       }
//     );

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [inwardRes, outwardRes, inventoryRes] = await Promise.all([
//           axios.get('https://aevix-chemical-mpbw.vercel.app/api/inward-payments'),
//           axios.get('https://aevix-chemical-mpbw.vercel.app/api/outward-payments'),
//           axios.get('https://aevix-chemical-mpbw.vercel.app/api/stocks')
//         ]);

//         setInward(calculatePaymentTotals(inwardRes.data));
//         setOutward(calculatePaymentTotals(outwardRes.data));
//         setInventory(calculateInventory(inventoryRes.data));
//         console.log(inventoryRes.data);
//       } catch (err) {
//         console.error(err);
//         setInward(calculatePaymentTotals([]));
//         setOutward(calculatePaymentTotals([]));
//         setInventory(calculateInventory([]));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   if (loading) return <div className="p-6">Loading dashboard...</div>;

//   return (
//     <div className="p-6 mt-15 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
//       <Salesandpurchase/>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <PaymentCard title="Inward Payment" data={inward} />
//         <PaymentCard title="Outward Payment" data={outward} />
//         <InventoryCard data={inventory} />
//       </div>
//       <InvoiceSummary/>
//     </div>
//   );
// };

// export default Overview;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import InvoiceSummary from "./Invoicegraph";
// import Salesandpurchase from "./Salesandpurchase";

// import StateWiseCharts from "./Statewisecharts";

// /* ======================
//    Safe Number Formatter
// ====================== */
// const formatNumber = (val) => {
//   const num = isNaN(Number(val)) ? 0 : Number(val);
//   return num.toLocaleString("en-IN");
// };

// const formatAmount = (val) => {
//   const num = isNaN(Number(val)) ? 0 : Number(val);
//   return `₹ ${num.toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// };

// /* ======================
//    Row Component
// ====================== */
// const Row = ({ label, value, color }) => (
//   <div className="flex items-center gap-2">
//     <span className={`w-3 h-3 rounded-full ${color}`} />
//     <span className="text-sm">{label}</span>
//     <span className="ml-auto font-medium">{value}</span>
//   </div>
// );

// /* ======================
//    Payment Card
// ====================== */
// const PaymentCard = ({ title, data }) => (
//   <div className="bg-white rounded-xl shadow-md p-6">
//     <h2 className="text-lg font-semibold">{title}</h2>
//     <p className="text-2xl font-bold mt-1">{formatAmount(data.total)}</p>

//     <div className="mt-4 space-y-2 text-sm">
//       <div className="flex justify-between">
//         <span>Cash</span>
//         <span>{formatAmount(data.cash)}</span>
//       </div>
//       <div className="flex justify-between">
//         <span>Online</span>
//         <span>{formatAmount(data.online)}</span>
//       </div>
//       <div className="flex justify-between">
//         <span>Cheque</span>
//         <span>{formatAmount(data.cheque)}</span>
//       </div>
//       <div className="flex justify-between">
//         <span>Bank</span>
//         <span>{formatAmount(data.bank)}</span>
//       </div>
//     </div>
//   </div>
// );

// /* ======================
//    Inventory Card
// ====================== */
// const InventoryCard = ({ data }) => (
//   <div className="bg-white rounded-xl shadow-md p-6">
//     <h2 className="text-lg font-semibold mb-4">Inventory</h2>

//     <div className="flex justify-between mb-6">
//       <div>
//         <p className="text-sm text-gray-500">Total Product</p>
//         <p className="text-2xl font-bold">{data.totalProducts}</p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Total Quantity</p>
//         <p className="text-2xl font-bold text-red-500">
//           {formatNumber(data.totalQuantity)}
//         </p>
//       </div>
//     </div>

//     <div className="space-y-3">
//       <Row label="In Stock" value={data.inStock} color="bg-green-400" />
//       <Row label="Low Stock" value={data.lowStock} color="bg-purple-400" />
//       <Row label="Zero Stock" value={data.zeroStock} color="bg-orange-400" />
//       <Row
//         label="Negative Stock"
//         value={data.negativeStock}
//         color="bg-red-400"
//       />
//     </div>
//   </div>
// );

// /* ======================
//    Selling Products Card
// ====================== */
// const SellingProductsCard = ({ title, products }) => (
//   <div className="bg-white rounded-xl shadow-md p-6">
//     <div className="flex justify-between items-center mb-4">
//       <h2 className="text-lg font-semibold">{title}</h2>
//       <span className="text-green-600 text-sm cursor-pointer">View All</span>
//     </div>

//     <div className="space-y-4">
//       <div className="flex text-sm font-semibold text-gray-500 border-b pb-2">
//         <span>Product Name</span>
//         <span className="ml-auto">Qty</span>
//       </div>

//       {products.map((item, index) => (
//         <div
//           key={index}
//           className="flex items-center text-sm border-b last:border-b-0 pb-2"
//         >
//           <span className="max-w-[220px] truncate">{item.productName}</span>
//           <span className="ml-auto font-medium text-gray-800">
//             {formatNumber(item.quantity)}
//           </span>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// /* ======================
//    Helpers
// ====================== */
// const calculatePaymentTotals = (payments = []) =>
//   payments.reduce(
//     (acc, curr) => {
//       const amount = Number(curr.amount) || 0;
//       const type = curr.paymentType?.toLowerCase();

//       acc.total += amount;
//       if (type === "cash") acc.cash += amount;
//       else if (type === "online payment") acc.online += amount;
//       else if (type === "cheque") acc.cheque += amount;
//       else if (type === "bank transfer") acc.bank += amount;

//       return acc;
//     },
//     { total: 0, cash: 0, online: 0, cheque: 0, bank: 0 },
//   );

// const calculateInventory = (items = []) =>
//   items.reduce(
//     (acc, item) => {
//       const qty = Number(item.currentStock) || 0;

//       acc.totalProducts += 1;
//       acc.totalQuantity += qty;

//       if (qty > 10) acc.inStock += 1;
//       else if (qty > 0) acc.lowStock += 1;
//       else if (qty === 0) acc.zeroStock += 1;
//       else acc.negativeStock += 1;

//       return acc;
//     },
//     {
//       totalProducts: 0,
//       totalQuantity: 0,
//       inStock: 0,
//       lowStock: 0,
//       zeroStock: 0,
//       negativeStock: 0,
//     },
//   );

// const getTopAndLeastSelling = (sales = []) => {
//   const map = {};

//   sales.forEach((sale) => {
//     const name = sale.productName;
//     const qty = Number(sale.quantity) || 0;
//     map[name] = (map[name] || 0) + qty;
//   });

//   const result = Object.entries(map).map(([productName, quantity]) => ({
//     productName,
//     quantity,
//   }));

//   return {
//     bestSelling: [...result]
//       .sort((a, b) => b.quantity - a.quantity)
//       .slice(0, 5),
//     leastSelling: [...result]
//       .sort((a, b) => a.quantity - b.quantity)
//       .slice(0, 5),
//   };
// };

// /* ======================
//    Overview Page
// ====================== */
// const Overview = () => {
//   const [inward, setInward] = useState(null);
//   const [outward, setOutward] = useState(null);
//   const [inventory, setInventory] = useState(null);
//   const [bestSelling, setBestSelling] = useState([]);
//   const [leastSelling, setLeastSelling] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [inwardRes, outwardRes, inventoryRes, salesRes] =
//           await Promise.all([
//             axios.get(
//               "https://aevix-chemical-mpbw.vercel.app/api/inward-payments",
//             ),
//             axios.get(
//               "https://aevix-chemical-mpbw.vercel.app/api/outward-payments",
//             ),
//             axios.get("https://aevix-chemical-mpbw.vercel.app/api/stocks"),
//             axios.get("https://aevix-chemical-mpbw.vercel.app/api/sales"),
//           ]);

//         setInward(calculatePaymentTotals(inwardRes.data));
//         setOutward(calculatePaymentTotals(outwardRes.data));
//         setInventory(calculateInventory(inventoryRes.data));

//         const { bestSelling, leastSelling } = getTopAndLeastSelling(
//           salesRes.data,
//         );

//         setBestSelling(bestSelling);
//         setLeastSelling(leastSelling);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   if (loading) return <div className="p-6">Loading dashboard...</div>;

//   return (
//     <div className="p-6 mt-15 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

//       <Salesandpurchase />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <PaymentCard title="Inward Payment" data={inward} />
//         <PaymentCard title="Outward Payment" data={outward} />
//         <InventoryCard data={inventory} />
//       </div>
//       <InvoiceSummary />
//       {/* <SalesIndiaMap/> */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <SellingProductsCard
//           title="Best Selling Products"
//           products={bestSelling}
//         />
//         <SellingProductsCard
//           title="Least Selling Products"
//           products={leastSelling}
//         />
//       </div>
//       <StateWiseCharts />
//     </div>
//   );
// };

// export default Overview;

import React, { useEffect, useState } from "react";
import axios from "axios";
import InvoiceSummary from "./Invoicegraph";
import Salesandpurchase from "./Salesandpurchase";
import StateWiseCharts from "./Statewisecharts";

/* ======================
   Formatters
====================== */
const formatNumber = (val) => {
  const num = isNaN(Number(val)) ? 0 : Number(val);
  return num.toLocaleString("en-IN");
};

const formatAmount = (val) => {
  const num = isNaN(Number(val)) ? 0 : Number(val);
  return `₹ ${num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/* ======================
   Small Row
====================== */
const Row = ({ label, value, color }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className={`w-3 h-3 rounded-full ${color}`} />
    <span className="truncate">{label}</span>
    <span className="ml-auto font-medium">{value}</span>
  </div>
);

/* ======================
   Payment Card
====================== */
const PaymentCard = ({ title, data }) => (
  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
    <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
    <p className="text-xl sm:text-2xl font-bold mt-1">
      {formatAmount(data.total)}
    </p>

    <div className="mt-4 space-y-2 text-sm">
      {["cash", "online", "cheque", "bank"].map((key) => (
        <div key={key} className="flex justify-between">
          <span className="capitalize">{key}</span>
          <span>{formatAmount(data[key])}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ======================
   Inventory Card
====================== */
const InventoryCard = ({ data }) => (
  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
    <h2 className="text-base sm:text-lg font-semibold mb-4">Inventory</h2>

    <div className="flex justify-between mb-6">
      <div>
        <p className="text-xs sm:text-sm text-gray-500">Total Product</p>
        <p className="text-xl sm:text-2xl font-bold">{data.totalProducts}</p>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-500">Total Quantity</p>
        <p className="text-xl sm:text-2xl font-bold text-red-500">
          {formatNumber(data.totalQuantity)}
        </p>
      </div>
    </div>

    <div className="space-y-3">
      <Row label="In Stock" value={data.inStock} color="bg-green-400" />
      <Row label="Low Stock" value={data.lowStock} color="bg-purple-400" />
      <Row label="Zero Stock" value={data.zeroStock} color="bg-orange-400" />
      <Row
        label="Negative Stock"
        value={data.negativeStock}
        color="bg-red-400"
      />
    </div>
  </div>
);

/* ======================
   Selling Products
====================== */
const SellingProductsCard = ({ title, products }) => (
  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
      <span className="text-green-600 text-xs sm:text-sm cursor-pointer">
        View All
      </span>
    </div>

    <div className="space-y-3">
      <div className="flex text-xs sm:text-sm font-semibold text-gray-500 border-b pb-2">
        <span>Product</span>
        <span className="ml-auto">Qty</span>
      </div>

      {products.map((item, index) => (
        <div
          key={index}
          className="flex items-center text-xs sm:text-sm border-b last:border-0 pb-2"
        >
          <span className="max-w-40 sm:max-w-60 truncate">
            {item.productName}
          </span>
          <span className="ml-auto font-medium">
            {formatNumber(item.quantity)}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ======================
   Helpers
====================== */
const calculatePaymentTotals = (payments = []) =>
  payments.reduce(
    (acc, curr) => {
      const amount = Number(curr.amount) || 0;
      const type = curr.paymentType?.toLowerCase();

      acc.total += amount;
      if (type === "cash") acc.cash += amount;
      else if (type === "online payment") acc.online += amount;
      else if (type === "cheque") acc.cheque += amount;
      else if (type === "bank transfer") acc.bank += amount;

      return acc;
    },
    { total: 0, cash: 0, online: 0, cheque: 0, bank: 0 },
  );

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
      negativeStock: 0,
    },
  );

const getTopAndLeastSelling = (sales = []) => {
  const map = {};
  sales.forEach((s) => {
    map[s.productName] = (map[s.productName] || 0) + Number(s.quantity || 0);
  });

  const list = Object.entries(map).map(([productName, quantity]) => ({
    productName,
    quantity,
  }));

  return {
    bestSelling: [...list].sort((a, b) => b.quantity - a.quantity).slice(0, 5),
    leastSelling: [...list].sort((a, b) => a.quantity - b.quantity).slice(0, 5),
  };
};

/* ======================
   Overview Page
====================== */
const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [inward, setInward] = useState(null);
  const [outward, setOutward] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [bestSelling, setBestSelling] = useState([]);
  const [leastSelling, setLeastSelling] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [inwardRes, outwardRes, inventoryRes, salesRes] =
          await Promise.all([
            axios.get(
              "https://aevix-chemical-mpbw.vercel.app/api/inward-payments",
            ),
            axios.get(
              "https://aevix-chemical-mpbw.vercel.app/api/outward-payments",
            ),
            axios.get("https://aevix-chemical-mpbw.vercel.app/api/stocks"),
            axios.get("https://aevix-chemical-mpbw.vercel.app/api/sales"),
          ]);

        setInward(calculatePaymentTotals(inwardRes.data));
        setOutward(calculatePaymentTotals(outwardRes.data));
        setInventory(calculateInventory(inventoryRes.data));

        const { bestSelling, leastSelling } = getTopAndLeastSelling(
          salesRes.data,
        );

        setBestSelling(bestSelling);
        setLeastSelling(leastSelling);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div className="p-4">Loading dashboard...</div>;

  return (
    <div className="p-4 sm:p-6 min-h-screen mt-7">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
        Dashboard Overview
      </h1>

      <Salesandpurchase />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
        <PaymentCard title="Inward Payment" data={inward} />
        <PaymentCard title="Outward Payment" data={outward} />
        <InventoryCard data={inventory} />
      </div>

      <InvoiceSummary />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
        <SellingProductsCard
          title="Best Selling Products"
          products={bestSelling}
        />
        <SellingProductsCard
          title="Least Selling Products"
          products={leastSelling}
        />
      </div>

      <StateWiseCharts />
    </div>
  );
};

export default Overview;
