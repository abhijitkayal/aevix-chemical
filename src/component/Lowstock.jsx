// import React from "react";
// import { AlertTriangle, TrendingDown, PackageX, Clock, Package } from "lucide-react";

// // Low stock items requiring immediate attention
// const lowStockItems = [
//   { 
//     id: 1,
//     itemCode: "CHM-001", 
//     itemName: "Sulfuric Acid 98%", 
//     category: "Chemicals",
//     currentStock: 45, 
//     reorderLevel: 100,
//     minStock: 50,
//     unit: "Liters",
//     warehouse: "Main Warehouse A",
//     location: "Mumbai",
//     supplier: "ChemSupply India",
//     unitPrice: "₹850",
//     totalValue: "₹38,250",
//     status: "Critical",
//     daysUntilStockout: 3,
//     lastOrdered: "2025-12-20",
//     avgConsumption: "15 L/day"
//   },
//   { 
//     id: 2,
//     itemCode: "CHM-089", 
//     itemName: "Sodium Hydroxide (Caustic Soda)", 
//     category: "Chemicals",
//     currentStock: 65, 
//     reorderLevel: 150,
//     minStock: 100,
//     unit: "Kg",
//     warehouse: "Warehouse C",
//     location: "Bangalore",
//     supplier: "Alkali Industries",
//     unitPrice: "₹420",
//     totalValue: "₹27,300",
//     status: "Critical",
//     daysUntilStockout: 5,
//     lastOrdered: "2025-12-22",
//     avgConsumption: "13 Kg/day"
//   },
//   { 
//     id: 3,
//     itemCode: "RAW-067", 
//     itemName: "Acetic Acid", 
//     category: "Raw Materials",
//     currentStock: 38, 
//     reorderLevel: 120,
//     minStock: 80,
//     unit: "Liters",
//     warehouse: "Warehouse B",
//     location: "Delhi",
//     supplier: "Organic Chemicals Ltd",
//     unitPrice: "₹680",
//     totalValue: "₹25,840",
//     status: "Critical",
//     daysUntilStockout: 4,
//     lastOrdered: "2025-12-18",
//     avgConsumption: "9.5 L/day"
//   },
//   { 
//     id: 4,
//     itemCode: "PKG-045", 
//     itemName: "HDPE Containers 5L", 
//     category: "Packaging",
//     currentStock: 120, 
//     reorderLevel: 200,
//     minStock: 150,
//     unit: "Pieces",
//     warehouse: "Warehouse B",
//     location: "Delhi",
//     supplier: "PackPro Solutions",
//     unitPrice: "₹45",
//     totalValue: "₹5,400",
//     status: "Low",
//     daysUntilStockout: 8,
//     lastOrdered: "2025-12-28",
//     avgConsumption: "15 pcs/day"
//   },
//   { 
//     id: 5,
//     itemCode: "RAW-112", 
//     itemName: "Titanium Dioxide", 
//     category: "Raw Materials",
//     currentStock: 180, 
//     reorderLevel: 300,
//     minStock: 250,
//     unit: "Kg",
//     warehouse: "Main Warehouse A",
//     location: "Mumbai",
//     supplier: "TiO2 Suppliers",
//     unitPrice: "₹950",
//     totalValue: "₹1,71,000",
//     status: "Low",
//     daysUntilStockout: 12,
//     lastOrdered: "2025-12-15",
//     avgConsumption: "15 Kg/day"
//   },
//   { 
//     id: 6,
//     itemCode: "PKG-023", 
//     itemName: "Glass Bottles 1L", 
//     category: "Packaging",
//     currentStock: 280, 
//     reorderLevel: 400,
//     minStock: 350,
//     unit: "Pieces",
//     warehouse: "Distribution Center",
//     location: "Chennai",
//     supplier: "GlassTech India",
//     unitPrice: "₹28",
//     totalValue: "₹7,840",
//     status: "Low",
//     daysUntilStockout: 10,
//     lastOrdered: "2026-01-02",
//     avgConsumption: "28 pcs/day"
//   },
//   { 
//     id: 7,
//     itemCode: "EQP-034", 
//     itemName: "Safety Gloves (Box of 100)", 
//     category: "Equipment",
//     currentStock: 95, 
//     reorderLevel: 150,
//     minStock: 120,
//     unit: "Boxes",
//     warehouse: "Main Warehouse A",
//     location: "Mumbai",
//     supplier: "SafetyFirst Corp",
//     unitPrice: "₹1,200",
//     totalValue: "₹1,14,000",
//     status: "Low",
//     daysUntilStockout: 15,
//     lastOrdered: "2025-12-30",
//     avgConsumption: "6.3 boxes/day"
//   },
//   { 
//     id: 8,
//     itemCode: "CHM-145", 
//     itemName: "Hydrochloric Acid 35%", 
//     category: "Chemicals",
//     currentStock: 52, 
//     reorderLevel: 110,
//     minStock: 75,
//     unit: "Liters",
//     warehouse: "Warehouse C",
//     location: "Bangalore",
//     supplier: "ChemSupply India",
//     unitPrice: "₹720",
//     totalValue: "₹37,440",
//     status: "Critical",
//     daysUntilStockout: 6,
//     lastOrdered: "2025-12-24",
//     avgConsumption: "8.7 L/day"
//   },
//   { 
//     id: 9,
//     itemCode: "RAW-201", 
//     itemName: "Calcium Carbonate", 
//     category: "Raw Materials",
//     currentStock: 210, 
//     reorderLevel: 350,
//     minStock: 280,
//     unit: "Kg",
//     warehouse: "Warehouse B",
//     location: "Delhi",
//     supplier: "Minerals & More",
//     unitPrice: "₹380",
//     totalValue: "₹79,800",
//     status: "Low",
//     daysUntilStockout: 14,
//     lastOrdered: "2025-12-27",
//     avgConsumption: "15 Kg/day"
//   },
//   { 
//     id: 10,
//     itemCode: "PKG-078", 
//     itemName: "Plastic Caps & Seals", 
//     category: "Packaging",
//     currentStock: 340, 
//     reorderLevel: 500,
//     minStock: 450,
//     unit: "Pieces",
//     warehouse: "Distribution Center",
//     location: "Chennai",
//     supplier: "PackPro Solutions",
//     unitPrice: "₹12",
//     totalValue: "₹4,080",
//     status: "Low",
//     daysUntilStockout: 11,
//     lastOrdered: "2025-12-29",
//     avgConsumption: "31 pcs/day"
//   },
// ];

// // Category summary
// const categorySummary = [
//   { category: "Chemicals", critical: 3, low: 0, total: 3, value: "₹1,02,990" },
//   { category: "Raw Materials", critical: 1, low: 2, total: 3, value: "₹2,76,640" },
//   { category: "Packaging", critical: 0, low: 3, total: 3, value: "₹17,320" },
//   { category: "Equipment", critical: 0, low: 1, total: 1, value: "₹1,14,000" },
// ];

// export default function LowStock() {
//   const criticalCount = lowStockItems.filter(item => item.status === "Critical").length;
//   const lowCount = lowStockItems.filter(item => item.status === "Low").length;
//   const totalValue = lowStockItems.reduce((sum, item) => {
//     const value = parseInt(item.totalValue.replace(/[₹,]/g, ''));
//     return sum + value;
//   }, 0);

//   return (
//     <div className="space-y-6 mt-20">
//       {/* Alert Banner */}
//       <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
//         <div className="flex items-start gap-3">
//           <AlertTriangle className="text-red-600 mt-0.5" size={24} />
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold text-red-800">Low Stock Alert!</h3>
//             <p className="text-red-700 mt-1">
//               You have <span className="font-bold">{criticalCount} critical items</span> and{" "}
//               <span className="font-bold">{lowCount} low stock items</span> requiring immediate attention.
//               Total affected inventory value: <span className="font-bold">₹{totalValue.toLocaleString()}</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Critical Items</h4>
//               <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
//               <p className="text-sm text-red-600 mt-1">Order immediately</p>
//             </div>
//             <PackageX className="text-red-500" size={40} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Low Stock Items</h4>
//               <p className="text-3xl font-bold text-amber-600">{lowCount}</p>
//               <p className="text-sm text-amber-600 mt-1">Action needed</p>
//             </div>
//             <TrendingDown className="text-amber-500" size={40} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Total Items</h4>
//               <p className="text-3xl font-bold text-black">{lowStockItems.length}</p>
//               <p className="text-sm text-purple-600 mt-1">Below reorder level</p>
//             </div>
//             <Package className="text-purple-500" size={40} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Inventory Value</h4>
//               <p className="text-2xl font-bold text-black">₹{(totalValue/1000).toFixed(1)}K</p>
//               <p className="text-sm text-blue-600 mt-1">Affected value</p>
//             </div>
//             <TrendingDown className="text-blue-500" size={40} />
//           </div>
//         </div>
//       </div>

//       {/* Category Summary */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h3 className="text-xl font-semibold mb-4 text-black">Low Stock by Category</h3>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {categorySummary.map((cat, idx) => (
//             <div key={idx} className="border rounded-lg p-4">
//               <h4 className="font-semibold text-gray-700 mb-2">{cat.category}</h4>
//               <div className="space-y-1 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Critical:</span>
//                   <span className="font-bold text-red-600">{cat.critical}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Low:</span>
//                   <span className="font-bold text-amber-600">{cat.low}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total:</span>
//                   <span className="font-bold">{cat.total}</span>
//                 </div>
//                 <div className="flex justify-between pt-2 border-t">
//                   <span className="text-gray-600">Value:</span>
//                   <span className="font-bold text-emerald-600">{cat.value}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Detailed Low Stock Items Table */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold text-black">Low Stock Items - Detailed View</h3>
//           <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
//             Generate Purchase Orders
//           </button>
//         </div>
//         <div className="overflow-auto">
//           <table className="w-full text-sm text-black">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Item Code</th>
//                 <th className="p-3 text-left">Item Name</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-center">Current</th>
//                 <th className="p-3 text-center">Reorder Level</th>
//                 <th className="p-3 text-center">Days Left</th>
//                 <th className="p-3 text-left">Warehouse</th>
//                 <th className="p-3 text-left">Supplier</th>
//                 <th className="p-3 text-right">Value</th>
//                 <th className="p-3 text-center">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {lowStockItems.map((item) => (
//                 <tr key={item.id} className={`border-b hover:bg-gray-100 ${
//                   item.status === 'Critical' ? 'bg-red-50' : ''
//                 }`}>
//                   <td className="p-3 font-mono font-semibold text-blue-600">{item.itemCode}</td>
//                   <td className="p-3">
//                     <div className="font-semibold">{item.itemName}</div>
//                     <div className="text-xs text-gray-500">{item.avgConsumption}</div>
//                   </td>
//                   <td className="p-3 text-gray-600">{item.category}</td>
//                   <td className="p-3 text-center">
//                     <div className={`font-bold ${
//                       item.status === 'Critical' ? 'text-red-600' : 'text-amber-600'
//                     }`}>
//                       {item.currentStock}
//                     </div>
//                     <div className="text-xs text-gray-500">{item.unit}</div>
//                   </td>
//                   <td className="p-3 text-center text-gray-600">{item.reorderLevel}</td>
//                   <td className="p-3 text-center">
//                     <div className="flex items-center justify-center gap-1">
//                       <Clock size={14} className={item.daysUntilStockout <= 5 ? 'text-red-600' : 'text-amber-600'} />
//                       <span className={`font-semibold ${
//                         item.daysUntilStockout <= 5 ? 'text-red-600' : 'text-amber-600'
//                       }`}>
//                         {item.daysUntilStockout}d
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="text-gray-700">{item.warehouse}</div>
//                     <div className="text-xs text-gray-500">{item.location}</div>
//                   </td>
//                   <td className="p-3 text-gray-600">{item.supplier}</td>
//                   <td className="p-3 text-right font-semibold text-emerald-600">{item.totalValue}</td>
//                   <td className="p-3 text-center">
//                     {item.status === "Critical" ? (
//                       <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold inline-flex items-center gap-1">
//                         <AlertTriangle size={12} /> Critical
//                       </span>
//                     ) : (
//                       <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
//                         Low
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Action Recommendations */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
//             <AlertTriangle className="text-red-600" size={20} />
//             Immediate Actions Required
//           </h3>
//           <ul className="space-y-2 text-sm">
//             <li className="flex items-start gap-2">
//               <span className="text-red-600 font-bold">•</span>
//               <span>Place urgent orders for <strong>{criticalCount} critical items</strong> (estimated stockout in 3-6 days)</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-amber-600 font-bold">•</span>
//               <span>Review and approve purchase requisitions for <strong>{lowCount} low stock items</strong></span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-blue-600 font-bold">•</span>
//               <span>Contact suppliers for expedited delivery on critical chemicals</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-purple-600 font-bold">•</span>
//               <span>Check alternative suppliers for items with longer lead times</span>
//             </li>
//           </ul>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="text-lg font-semibold text-black mb-3">Quick Stats</h3>
//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between pb-2 border-b">
//               <span className="text-gray-600">Most Critical Category:</span>
//               <span className="font-bold text-red-600">Chemicals (3 items)</span>
//             </div>
//             <div className="flex justify-between pb-2 border-b">
//               <span className="text-gray-600">Highest Value at Risk:</span>
//               <span className="font-bold text-emerald-600">₹2,76,640</span>
//             </div>
//             <div className="flex justify-between pb-2 border-b">
//               <span className="text-gray-600">Average Days Until Stockout:</span>
//               <span className="font-bold text-amber-600">9.1 days</span>
//             </div>
//             <div className="flex justify-between pb-2 border-b">
//               <span className="text-gray-600">Primary Supplier:</span>
//               <span className="font-bold">ChemSupply India</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertTriangle,
  TrendingDown,
  PackageX,
  Clock,
  Package,
} from "lucide-react";

export default function LowStock() {
  const [lowStocks, setLowStocks] = useState([]);

  /* ================= FETCH LOW STOCK ================= */
  const fetchLowStock = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stocks");
      const filtered = res.data.filter(
        (item) => item.status === "Low" || item.status === "Critical"
      );
      setLowStocks(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  /* ================= CALCULATIONS ================= */
  const criticalCount = lowStocks.filter(
    (item) => item.status === "Critical"
  ).length;

  const lowCount = lowStocks.filter(
    (item) => item.status === "Low"
  ).length;

  const totalValue = lowStocks.reduce(
    (sum, item) => sum + item.currentStock * item.unitPrice,
    0
  );

  return (
    <div className="space-y-6 mt-20">
      {/* ALERT BANNER */}
      {lowStocks.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 mt-0.5" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-red-800">
                Low Stock Alert!
              </h3>
              <p className="text-red-700 mt-1">
                {criticalCount} critical & {lowCount} low stock items.
                Total affected value:{" "}
                <strong>₹{totalValue.toLocaleString()}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Critical Items"
          value={criticalCount}
          color="red"
          icon={<PackageX size={40} />}
        />
        <SummaryCard
          title="Low Stock Items"
          value={lowCount}
          color="amber"
          icon={<TrendingDown size={40} />}
        />
        <SummaryCard
          title="Total Items"
          value={lowStocks.length}
          color="purple"
          icon={<Package size={40} />}
        />
        <SummaryCard
          title="Inventory Value"
          value={`₹${(totalValue / 1000).toFixed(1)}K`}
          color="blue"
          icon={<TrendingDown size={40} />}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">
          Low Stock Items
        </h3>

        {lowStocks.length === 0 ? (
          <p className="text-center text-gray-500">
            🎉 All stocks are healthy
          </p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3 text-center">Stock</th>
                  <th className="p-3 text-center">Reorder</th>
                  <th className="p-3 text-left">Warehouse</th>
                  <th className="p-3 text-right">Value</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStocks.map((item) => (
                  <tr
                    key={item._id}
                    className={`border-b ${
                      item.status === "Critical" ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="p-3 font-semibold">
                      {item.itemName}
                      <div className="text-xs text-gray-500">
                        {item.itemCode}
                      </div>
                    </td>

                    <td className="p-3 text-center font-bold">
                      {item.currentStock} {item.unit}
                    </td>

                    <td className="p-3 text-center">
                      {item.reorderLevel}
                    </td>

                    <td className="p-3">
                      {item.warehouse}
                    </td>

                    <td className="p-3 text-right font-semibold text-emerald-600">
                      ₹{(item.currentStock * item.unitPrice).toLocaleString()}
                    </td>

                    <td className="p-3 text-center">
                      {item.status === "Critical" ? (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold inline-flex gap-1">
                          <AlertTriangle size={12} /> Critical
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                          Low
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= REUSABLE CARD ================= */

function SummaryCard({ title, value, color, icon }) {
  const colors = {
    red: "border-red-500 text-red-600",
    amber: "border-amber-500 text-amber-600",
    purple: "border-purple-500 text-purple-600",
    blue: "border-blue-500 text-blue-600",
  };

  return (
    <div className={`bg-white rounded-xl shadow p-6 border-l-4 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm text-gray-600 mb-1">{title}</h4>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
