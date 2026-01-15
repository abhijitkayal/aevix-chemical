// import React, { useState } from "react";
// import {
//   ArrowDownCircle,
//   ArrowUpCircle,
//   ArrowRightLeft,
//   PackagePlus,
//   PackageMinus,
//   Filter,
//   Download,
// } from "lucide-react";

// // Stock movement transactions
// const movementTransactions = [
//   {
//     id: "MOV-2026-001",
//     date: "2026-01-05",
//     time: "14:30",
//     type: "Stock In",
//     itemCode: "CHM-089",
//     itemName: "Sodium Hydroxide",
//     quantity: 200,
//     unit: "Kg",
//     from: "Alkali Industries",
//     to: "Warehouse C",
//     warehouse: "Warehouse C - Bangalore",
//     reference: "PO-2026-045",
//     performedBy: "Rajesh Kumar",
//     remarks: "Monthly replenishment",
//   },
//   {
//     id: "MOV-2026-002",
//     date: "2026-01-05",
//     time: "13:15",
//     type: "Stock Out",
//     itemCode: "PKG-045",
//     itemName: "HDPE Containers 5L",
//     quantity: 150,
//     unit: "Pieces",
//     from: "Warehouse B",
//     to: "Production Unit A",
//     warehouse: "Warehouse B - Delhi",
//     reference: "REQ-789",
//     performedBy: "Priya Sharma",
//     remarks: "Production requirement",
//   },
//   {
//     id: "MOV-2026-003",
//     date: "2026-01-05",
//     time: "11:45",
//     type: "Transfer",
//     itemCode: "RAW-112",
//     itemName: "Titanium Dioxide",
//     quantity: 80,
//     unit: "Kg",
//     from: "Warehouse B",
//     to: "Main Warehouse A",
//     warehouse: "Multiple",
//     reference: "TRF-156",
//     performedBy: "Amit Patel",
//     remarks: "Stock rebalancing",
//   },
//   {
//     id: "MOV-2026-004",
//     date: "2026-01-05",
//     time: "10:20",
//     type: "Stock In",
//     itemCode: "CHM-001",
//     itemName: "Sulfuric Acid 98%",
//     quantity: 500,
//     unit: "Liters",
//     from: "ChemSupply India",
//     to: "Main Warehouse A",
//     warehouse: "Main Warehouse A - Mumbai",
//     reference: "PO-2026-042",
//     performedBy: "Vikram Singh",
//     remarks: "Emergency order",
//   },
//   {
//     id: "MOV-2026-005",
//     date: "2026-01-04",
//     time: "16:00",
//     type: "Stock Out",
//     itemCode: "PKG-023",
//     itemName: "Glass Bottles 1L",
//     quantity: 300,
//     unit: "Pieces",
//     from: "Distribution Center",
//     to: "Customer Order #4521",
//     warehouse: "Distribution Center - Chennai",
//     reference: "SO-8821",
//     performedBy: "Neha Desai",
//     remarks: "Customer shipment",
//   },
//   {
//     id: "MOV-2026-006",
//     date: "2026-01-04",
//     time: "15:30",
//     type: "Adjustment",
//     itemCode: "RAW-067",
//     itemName: "Acetic Acid",
//     quantity: -15,
//     unit: "Liters",
//     from: "Warehouse B",
//     to: "System Adjustment",
//     warehouse: "Warehouse B - Delhi",
//     reference: "ADJ-034",
//     performedBy: "System",
//     remarks: "Stock count correction",
//   },
//   {
//     id: "MOV-2026-007",
//     date: "2026-01-04",
//     time: "14:10",
//     type: "Stock In",
//     itemCode: "EQP-034",
//     itemName: "Safety Gloves (Box)",
//     quantity: 50,
//     unit: "Boxes",
//     from: "SafetyFirst Corp",
//     to: "Main Warehouse A",
//     warehouse: "Main Warehouse A - Mumbai",
//     reference: "PO-2026-038",
//     performedBy: "Rajesh Kumar",
//     remarks: "Safety stock replenishment",
//   },
//   {
//     id: "MOV-2026-008",
//     date: "2026-01-04",
//     time: "12:50",
//     type: "Transfer",
//     itemCode: "CHM-145",
//     itemName: "Hydrochloric Acid 35%",
//     quantity: 100,
//     unit: "Liters",
//     from: "Main Warehouse A",
//     to: "Warehouse C",
//     warehouse: "Multiple",
//     reference: "TRF-155",
//     performedBy: "Amit Patel",
//     remarks: "Warehouse reallocation",
//   },
//   {
//     id: "MOV-2026-009",
//     date: "2026-01-04",
//     time: "11:25",
//     type: "Stock Out",
//     itemCode: "RAW-201",
//     itemName: "Calcium Carbonate",
//     quantity: 180,
//     unit: "Kg",
//     from: "Warehouse B",
//     to: "Production Unit B",
//     warehouse: "Warehouse B - Delhi",
//     reference: "REQ-785",
//     performedBy: "Priya Sharma",
//     remarks: "Production batch #455",
//   },
//   {
//     id: "MOV-2026-010",
//     date: "2026-01-04",
//     time: "10:00",
//     type: "Return",
//     itemCode: "PKG-078",
//     itemName: "Plastic Caps & Seals",
//     quantity: 45,
//     unit: "Pieces",
//     from: "Production Unit A",
//     to: "Distribution Center",
//     warehouse: "Distribution Center - Chennai",
//     reference: "RET-089",
//     performedBy: "Vikram Singh",
//     remarks: "Excess from production",
//   },
//   {
//     id: "MOV-2026-011",
//     date: "2026-01-03",
//     time: "16:45",
//     type: "Stock In",
//     itemCode: "PKG-045",
//     itemName: "HDPE Containers 5L",
//     quantity: 400,
//     unit: "Pieces",
//     from: "PackPro Solutions",
//     to: "Warehouse B",
//     warehouse: "Warehouse B - Delhi",
//     reference: "PO-2026-040",
//     performedBy: "Neha Desai",
//     remarks: "Regular order",
//   },
//   {
//     id: "MOV-2026-012",
//     date: "2026-01-03",
//     time: "15:20",
//     type: "Stock Out",
//     itemCode: "CHM-089",
//     itemName: "Sodium Hydroxide",
//     quantity: 120,
//     unit: "Kg",
//     from: "Warehouse C",
//     to: "Production Unit C",
//     warehouse: "Warehouse C - Bangalore",
//     reference: "REQ-782",
//     performedBy: "Amit Patel",
//     remarks: "Chemical processing",
//   },
//   {
//     id: "MOV-2026-013",
//     date: "2026-01-03",
//     time: "14:00",
//     type: "Transfer",
//     itemCode: "RAW-112",
//     itemName: "Titanium Dioxide",
//     quantity: 60,
//     unit: "Kg",
//     from: "Main Warehouse A",
//     to: "Warehouse C",
//     warehouse: "Multiple",
//     reference: "TRF-154",
//     performedBy: "Rajesh Kumar",
//     remarks: "Demand balancing",
//   },
//   {
//     id: "MOV-2026-014",
//     date: "2026-01-03",
//     time: "12:30",
//     type: "Stock In",
//     itemCode: "RAW-201",
//     itemName: "Calcium Carbonate",
//     quantity: 350,
//     unit: "Kg",
//     from: "Minerals & More",
//     to: "Warehouse B",
//     warehouse: "Warehouse B - Delhi",
//     reference: "PO-2026-037",
//     performedBy: "Priya Sharma",
//     remarks: "Bulk order",
//   },
//   {
//     id: "MOV-2026-015",
//     date: "2026-01-03",
//     time: "11:10",
//     type: "Stock Out",
//     itemCode: "PKG-023",
//     itemName: "Glass Bottles 1L",
//     quantity: 250,
//     unit: "Pieces",
//     from: "Distribution Center",
//     to: "Customer Order #4518",
//     warehouse: "Distribution Center - Chennai",
//     reference: "SO-8815",
//     performedBy: "Vikram Singh",
//     remarks: "Export shipment",
//   },
// ];

// // Movement summary by type
// const movementSummary = {
//   today: {
//     stockIn: 700,
//     stockOut: 450,
//     transfers: 180,
//     adjustments: 15,
//   },
//   thisWeek: {
//     stockIn: 2850,
//     stockOut: 1920,
//     transfers: 640,
//     adjustments: 45,
//   },
// };

// // Top moving items
// const topMovingItems = [
//   { itemName: "Sodium Hydroxide", movements: 15, quantity: 1850, trend: "up" },
//   { itemName: "HDPE Containers 5L", movements: 12, quantity: 1200, trend: "up" },
//   { itemName: "Titanium Dioxide", movements: 10, quantity: 980, trend: "stable" },
//   { itemName: "Glass Bottles 1L", movements: 9, quantity: 850, trend: "up" },
//   { itemName: "Calcium Carbonate", movements: 8, quantity: 720, trend: "stable" },
// ];

// export default function Movement() {
//   const [filterType, setFilterType] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredTransactions = movementTransactions.filter((txn) => {
//     const matchesType = filterType === "All" || txn.type === filterType;
//     const matchesSearch =
//       txn.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       txn.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       txn.id.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesType && matchesSearch;
//   });

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case "Stock In":
//         return <ArrowDownCircle className="text-emerald-600" size={20} />;
//       case "Stock Out":
//         return <ArrowUpCircle className="text-blue-600" size={20} />;
//       case "Transfer":
//         return <ArrowRightLeft className="text-purple-600" size={20} />;
//       case "Return":
//         return <PackagePlus className="text-amber-600" size={20} />;
//       case "Adjustment":
//         return <PackageMinus className="text-red-600" size={20} />;
//       default:
//         return null;
//     }
//   };

//   const getTypeBadge = (type) => {
//     const styles = {
//       "Stock In": "bg-emerald-100 text-emerald-700",
//       "Stock Out": "bg-blue-100 text-blue-700",
//       "Transfer": "bg-purple-100 text-purple-700",
//       "Return": "bg-amber-100 text-amber-700",
//       "Adjustment": "bg-red-100 text-red-700",
//     };
//     return styles[type] || "bg-gray-100 text-gray-700";
//   };

//   return (
//     <div className="space-y-6 mt-20">
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Stock In (Today)</h4>
//               <p className="text-3xl font-bold text-black">
//                 {movementSummary.today.stockIn}
//               </p>
//               <p className="text-sm text-emerald-600 mt-1">
//                 {movementSummary.thisWeek.stockIn} this week
//               </p>
//             </div>
//             <ArrowDownCircle className="text-emerald-500" size={40} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Stock Out (Today)</h4>
//               <p className="text-3xl font-bold text-black">
//                 {movementSummary.today.stockOut}
//               </p>
//               <p className="text-sm text-blue-600 mt-1">
//                 {movementSummary.thisWeek.stockOut} this week
//               </p>
//             </div>
//             <ArrowUpCircle className="text-blue-500" size={40} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Transfers (Today)</h4>
//               <p className="text-3xl font-bold text-black">
//                 {movementSummary.today.transfers}
//               </p>
//               <p className="text-sm text-purple-600 mt-1">
//                 {movementSummary.thisWeek.transfers} this week
//               </p>
//             </div>
//             <ArrowRightLeft className="text-purple-500" size={40} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Net Movement</h4>
//               <p className="text-3xl font-bold text-black">
//                 +{movementSummary.today.stockIn - movementSummary.today.stockOut}
//               </p>
//               <p className="text-sm text-amber-600 mt-1">Today's balance</p>
//             </div>
//             <PackagePlus className="text-amber-500" size={40} />
//           </div>
//         </div>
//       </div>

//       {/* Top Moving Items */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h3 className="text-xl font-semibold mb-4 text-black">
//           Top Moving Items (This Week)
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//           {topMovingItems.map((item, idx) => (
//             <div key={idx} className="border rounded-lg p-4">
//               <div className="flex items-start justify-between mb-2">
//                 <h4 className="font-semibold text-sm text-gray-800">
//                   {item.itemName}
//                 </h4>
//                 <span
//                   className={`text-xs px-2 py-1 rounded ${
//                     item.trend === "up"
//                       ? "bg-emerald-100 text-emerald-700"
//                       : "bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {item.trend === "up" ? "↑" : "→"}
//                 </span>
//               </div>
//               <div className="space-y-1 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Movements:</span>
//                   <span className="font-bold">{item.movements}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Quantity:</span>
//                   <span className="font-bold text-emerald-600">
//                     {item.quantity}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex flex-col md:flex-row gap-4 items-end">
//           <div className="flex-1">
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Search Transactions
//             </label>
//             <input
//               type="text"
//               placeholder="Search by item name, code, or movement ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Filter by Type
//             </label>
//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
//             >
//               <option>All</option>
//               <option>Stock In</option>
//               <option>Stock Out</option>
//               <option>Transfer</option>
//               <option>Return</option>
//               <option>Adjustment</option>
//             </select>
//           </div>
//           <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2">
//             <Download size={18} />
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* Movement Transactions Table */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h3 className="text-xl font-semibold mb-4 text-black">
//           Movement Transactions ({filteredTransactions.length})
//         </h3>
//         <div className="overflow-auto">
//           <table className="w-full text-sm text-black">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">ID</th>
//                 <th className="p-3 text-left">Date & Time</th>
//                 <th className="p-3 text-center">Type</th>
//                 <th className="p-3 text-left">Item</th>
//                 <th className="p-3 text-center">Quantity</th>
//                 <th className="p-3 text-left">From</th>
//                 <th className="p-3 text-left">To</th>
//                 <th className="p-3 text-left">Reference</th>
//                 <th className="p-3 text-left">Performed By</th>
//                 <th className="p-3 text-left">Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTransactions.map((txn) => (
//                 <tr key={txn.id} className="border-b hover:bg-gray-100">
//                   <td className="p-3 font-mono text-blue-600 font-semibold">
//                     {txn.id}
//                   </td>
//                   <td className="p-3">
//                     <div className="font-semibold">{txn.date}</div>
//                     <div className="text-xs text-gray-500">{txn.time}</div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center justify-center gap-2">
//                       {getTypeIcon(txn.type)}
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeBadge(
//                           txn.type
//                         )}`}
//                       >
//                         {txn.type}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="font-semibold">{txn.itemName}</div>
//                     <div className="text-xs text-gray-500 font-mono">
//                       {txn.itemCode}
//                     </div>
//                   </td>
//                   <td className="p-3 text-center">
//                     <div
//                       className={`font-bold ${
//                         txn.quantity > 0 ? "text-emerald-600" : "text-red-600"
//                       }`}
//                     >
//                       {txn.quantity > 0 ? "+" : ""}
//                       {txn.quantity}
//                     </div>
//                     <div className="text-xs text-gray-500">{txn.unit}</div>
//                   </td>
//                   <td className="p-3 text-gray-700">{txn.from}</td>
//                   <td className="p-3 text-gray-700">{txn.to}</td>
//                   <td className="p-3 font-mono text-sm text-gray-600">
//                     {txn.reference}
//                   </td>
//                   <td className="p-3 text-gray-700">{txn.performedBy}</td>
//                   <td className="p-3 text-gray-600 text-xs">{txn.remarks}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {filteredTransactions.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             No transactions found matching your criteria.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X, ArrowRightLeft, ArrowUpCircle } from "lucide-react";

export default function Movement() {
  const [movements, setMovements] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    unit: "",
    unitPrice: "",
    fromWarehouse: "",
    toType: "",
    toClientName: "",
    toWarehouse: "",
    date: "",
    remarks: "",
  });

  /* FETCH */
  const fetchMovements = async () => {
    const res = await axios.get("http://localhost:5000/api/movements");
    setMovements(res.data);
  };

  const fetchWarehouses = async () => {
    const res = await axios.get("http://localhost:5000/api/warehouses");
    setWarehouses(res.data);
  };

  useEffect(() => {
    fetchMovements();
    fetchWarehouses();
  }, []);

  /* HANDLERS */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/movements", form);
      setShowModal(false);
      fetchMovements();
      setForm({
        productName: "",
        quantity: "",
        unit: "",
        unitPrice: "",
        fromWarehouse: "",
        toType: "",
        toClientName: "",
        toWarehouse: "",
        date: "",
        remarks: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Movement failed");
    }
  };

  return (
    <div className="mt-16 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stock Movements</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Create Movement
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow p-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m) => (
              <tr key={m._id} className="border-b">
                <td>{m.productName}</td>
                <td className="font-bold">
                  {m.quantity} {m.unit}
                </td>
                <td>{m.fromWarehouse}</td>
                <td className="flex items-center gap-2">
                  {m.toType === "Client" ? (
                    <ArrowUpCircle className="text-blue-600" />
                  ) : (
                    <ArrowRightLeft className="text-purple-600" />
                  )}
                  {m.toType === "Client" ? m.toClientName : m.toWarehouse}
                </td>
                <td>{new Date(m.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-xl relative">
            <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowModal(false)} />

            <h2 className="text-xl font-bold mb-4">Create Movement</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="productName" placeholder="Product Name" required className="w-full border border-black rounded py-2 px-2" onChange={handleChange} />

              <div className="grid grid-cols-3 gap-3">
                <input type="number" name="quantity" placeholder="Quantity" required className="w-full border border-black rounded py-2 px-2" onChange={handleChange} />
                <select name="unit" required className="w-full border border-black rounded py-2 px-2" onChange={handleChange} >
                  <option value="">Unit</option>
                  <option>Kg</option>
                  <option>Liter</option>
                  <option>Pieces</option>
                  <option>Boxes</option>
                  <option>Packets</option>
                  <option>Ton</option>
                </select>
                <input type="number" name="unitPrice" placeholder="Unit Price" className="w-full border border-black rounded py-2 px-2" onChange={handleChange} />
              </div>

              <select name="fromWarehouse" required className="w-full border border-black rounded py-2 px-2" onChange={handleChange} >
                <option value="">From Warehouse</option>
                {warehouses.map((w) => (
                  <option key={w._id} value={w.warehouse}>{w.warehouse}</option>
                ))}
              </select>

              <select name="toType" required className="w-full border border-black rounded py-2 px-2" onChange={handleChange} >
                <option value="">Destination Type</option>
                <option value="Client">Client</option>
                <option value="Warehouse">Warehouse</option>
              </select>

              {form.toType === "Client" && (
                <input name="toClientName" placeholder="Client Name" required className="w-full border border-black rounded py-2 px-2" onChange={handleChange} />
              )}

              {form.toType === "Warehouse" && (
                <select name="toWarehouse" required className="w-full border border-black rounded py-2 px-2" onChange={handleChange} >
                  <option value="">To Warehouse</option>
                  {warehouses.map((w) => (
                    <option key={w._id} value={w.warehouse}>{w.warehouse}</option>
                  ))}
                </select>
              )}

              <input type="date" name="date" required className="w-full border border-black rounded py-2 px-2" onChange={handleChange} />
              <textarea name="remarks" placeholder="Remarks" className="w-full border border-black rounded py-2 px-2" onChange={handleChange} />

              <button className="w-full bg-emerald-600 text-white py-2 rounded">
                Save Movement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
