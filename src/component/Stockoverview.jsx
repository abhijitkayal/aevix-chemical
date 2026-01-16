// import React, { useState } from "react";
// import {
//   Package,
//   DollarSign,
//   TrendingUp,
//   AlertCircle,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Plus,
//   X,
// } from "lucide-react";

// // Complete stock inventory
// const stockInventory = [
//   {
//     id: 1,
//     itemCode: "CHM-001",
//     itemName: "Sulfuric Acid 98%",
//     category: "Chemicals",
//     currentStock: 545,
//     unit: "Liters",
//     unitPrice: 850,
//     totalValue: 463250,
//     reorderLevel: 100,
//     maxStock: 1000,
//     warehouse: "Main Warehouse A",
//     location: "Mumbai",
//     supplier: "ChemSupply India",
//     lastRestocked: "2026-01-05",
//     expiryDate: "2027-01-05",
//     status: "Good",
//   },
//   {
//     id: 2,
//     itemCode: "CHM-089",
//     itemName: "Sodium Hydroxide (Caustic Soda)",
//     category: "Chemicals",
//     currentStock: 265,
//     unit: "Kg",
//     unitPrice: 420,
//     totalValue: 111300,
//     reorderLevel: 150,
//     maxStock: 800,
//     warehouse: "Warehouse C",
//     location: "Bangalore",
//     supplier: "Alkali Industries",
//     lastRestocked: "2026-01-05",
//     expiryDate: "2028-06-15",
//     status: "Good",
//   },
//   {
//     id: 3,
//     itemCode: "CHM-145",
//     itemName: "Hydrochloric Acid 35%",
//     category: "Chemicals",
//     currentStock: 152,
//     unit: "Liters",
//     unitPrice: 720,
//     totalValue: 109440,
//     reorderLevel: 110,
//     maxStock: 600,
//     warehouse: "Warehouse C",
//     location: "Bangalore",
//     supplier: "ChemSupply India",
//     lastRestocked: "2026-01-05",
//     expiryDate: "2027-03-20",
//     status: "Good",
//   },
//   {
//     id: 4,
//     itemCode: "RAW-067",
//     itemName: "Acetic Acid",
//     category: "Raw Materials",
//     currentStock: 38,
//     unit: "Liters",
//     unitPrice: 680,
//     totalValue: 25840,
//     reorderLevel: 120,
//     maxStock: 500,
//     warehouse: "Warehouse B",
//     location: "Delhi",
//     supplier: "Organic Chemicals Ltd",
//     lastRestocked: "2025-12-18",
//     expiryDate: "2026-12-18",
//     status: "Critical",
//   },
//   {
//     id: 5,
//     itemCode: "RAW-112",
//     itemName: "Titanium Dioxide",
//     category: "Raw Materials",
//     currentStock: 260,
//     unit: "Kg",
//     unitPrice: 950,
//     totalValue: 247000,
//     reorderLevel: 300,
//     maxStock: 1200,
//     warehouse: "Main Warehouse A",
//     location: "Mumbai",
//     supplier: "TiO2 Suppliers",
//     lastRestocked: "2026-01-03",
//     expiryDate: "N/A",
//     status: "Low",
//   },
//   {
//     id: 6,
//     itemCode: "RAW-201",
//     itemName: "Calcium Carbonate",
//     category: "Raw Materials",
//     currentStock: 560,
//     unit: "Kg",
//     unitPrice: 380,
//     totalValue: 212800,
//     reorderLevel: 350,
//     maxStock: 1500,
//     warehouse: "Warehouse B",
//     location: "Delhi",
//     supplier: "Minerals & More",
//     lastRestocked: "2026-01-03",
//     expiryDate: "N/A",
//     status: "Good",
//   },
//   {
//     id: 7,
//     itemCode: "PKG-045",
//     itemName: "HDPE Containers 5L",
//     category: "Packaging",
//     currentStock: 520,
//     unit: "Pieces",
//     unitPrice: 45,
//     totalValue: 23400,
//     reorderLevel: 200,
//     maxStock: 2000,
//     warehouse: "Warehouse B",
//     location: "Delhi",
//     supplier: "PackPro Solutions",
//     lastRestocked: "2026-01-03",
//     expiryDate: "N/A",
//     status: "Good",
//   },
//   {
//     id: 8,
//     itemCode: "PKG-023",
//     itemName: "Glass Bottles 1L",
//     category: "Packaging",
//     currentStock: 330,
//     unit: "Pieces",
//     unitPrice: 28,
//     totalValue: 9240,
//     reorderLevel: 400,
//     maxStock: 1500,
//     warehouse: "Distribution Center",
//     location: "Chennai",
//     supplier: "GlassTech India",
//     lastRestocked: "2026-01-02",
//     expiryDate: "N/A",
//     status: "Low",
//   },
//   {
//     id: 9,
//     itemCode: "PKG-078",
//     itemName: "Plastic Caps & Seals",
//     category: "Packaging",
//     currentStock: 385,
//     unit: "Pieces",
//     unitPrice: 12,
//     totalValue: 4620,
//     reorderLevel: 500,
//     maxStock: 2500,
//     warehouse: "Distribution Center",
//     location: "Chennai",
//     supplier: "PackPro Solutions",
//     lastRestocked: "2025-12-29",
//     expiryDate: "N/A",
//     status: "Low",
//   },
//   {
//     id: 10,
//     itemCode: "EQP-034",
//     itemName: "Safety Gloves (Box of 100)",
//     category: "Equipment",
//     currentStock: 145,
//     unit: "Boxes",
//     unitPrice: 1200,
//     totalValue: 174000,
//     reorderLevel: 150,
//     maxStock: 500,
//     warehouse: "Main Warehouse A",
//     location: "Mumbai",
//     supplier: "SafetyFirst Corp",
//     lastRestocked: "2026-01-04",
//     expiryDate: "2028-12-30",
//     status: "Low",
//   },
//   {
//     id: 11,
//     itemCode: "CHM-234",
//     itemName: "Nitric Acid 65%",
//     category: "Chemicals",
//     currentStock: 420,
//     unit: "Liters",
//     unitPrice: 920,
//     totalValue: 386400,
//     reorderLevel: 150,
//     maxStock: 700,
//     warehouse: "Main Warehouse A",
//     location: "Mumbai",
//     supplier: "ChemSupply India",
//     lastRestocked: "2025-12-28",
//     expiryDate: "2027-06-28",
//     status: "Good",
//   },
//   {
//     id: 12,
//     itemCode: "RAW-145",
//     itemName: "Zinc Oxide",
//     category: "Raw Materials",
//     currentStock: 780,
//     unit: "Kg",
//     unitPrice: 650,
//     totalValue: 507000,
//     reorderLevel: 250,
//     maxStock: 1000,
//     warehouse: "Warehouse C",
//     location: "Bangalore",
//     supplier: "Metal Oxides Ltd",
//     lastRestocked: "2025-12-25",
//     expiryDate: "N/A",
//     status: "Good",
//   },
//   {
//     id: 13,
//     itemCode: "PKG-112",
//     itemName: "Aluminum Cans 500ml",
//     category: "Packaging",
//     currentStock: 1250,
//     unit: "Pieces",
//     unitPrice: 35,
//     totalValue: 43750,
//     reorderLevel: 300,
//     maxStock: 3000,
//     warehouse: "Distribution Center",
//     location: "Chennai",
//     supplier: "MetalPack Industries",
//     lastRestocked: "2025-12-30",
//     expiryDate: "N/A",
//     status: "Good",
//   },
//   {
//     id: 14,
//     itemCode: "EQP-089",
//     itemName: "Safety Goggles",
//     category: "Equipment",
//     currentStock: 320,
//     unit: "Pieces",
//     unitPrice: 450,
//     totalValue: 144000,
//     reorderLevel: 100,
//     maxStock: 600,
//     warehouse: "Main Warehouse A",
//     location: "Mumbai",
//     supplier: "SafetyFirst Corp",
//     lastRestocked: "2025-12-22",
//     expiryDate: "N/A",
//     status: "Good",
//   },
//   {
//     id: 15,
//     itemCode: "RAW-298",
//     itemName: "Iron Oxide Pigment",
//     category: "Raw Materials",
//     currentStock: 540,
//     unit: "Kg",
//     unitPrice: 580,
//     totalValue: 313200,
//     reorderLevel: 200,
//     maxStock: 900,
//     warehouse: "Warehouse B",
//     location: "Delhi",
//     supplier: "ColorTech Solutions",
//     lastRestocked: "2025-12-27",
//     expiryDate: "N/A",
//     status: "Good",
//   },
// ];

// // Category summary
// const categorySummary = [
//   { category: "Chemicals", items: 4, totalValue: 1070390, stockHealth: "Good" },
//   { category: "Raw Materials", items: 5, totalValue: 1305840, stockHealth: "Moderate" },
//   { category: "Packaging", items: 4, totalValue: 81010, stockHealth: "Moderate" },
//   { category: "Equipment", items: 2, totalValue: 318000, stockHealth: "Good" },
// ];

// export default function StockOverview() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({
//     itemCode: "",
//     itemName: "",
//     category: "",
//     currentStock: "",
//     unit: "",
//     unitPrice: "",
//     reorderLevel: "",
//     warehouse: "",
//     supplier: "",
//     expiryDate: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     console.log("Stock item submitted:", form);
//     // Add your submission logic here
//     setForm({
//       itemCode: "",
//       itemName: "",
//       category: "",
//       currentStock: "",
//       unit: "",
//       unitPrice: "",
//       reorderLevel: "",
//       warehouse: "",
//       supplier: "",
//       expiryDate: ""
//     });
//     setShowModal(false);
//   };

//   const filteredStock = stockInventory.filter((item) => {
//     const matchesSearch =
//       item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       filterCategory === "All" || item.category === filterCategory;
//     const matchesStatus =
//       filterStatus === "All" || item.status === filterStatus;
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const totalItems = stockInventory.length;
//   const totalValue = stockInventory.reduce((sum, item) => sum + item.totalValue, 0);
//   const goodStock = stockInventory.filter((item) => item.status === "Good").length;
//   const lowStock = stockInventory.filter((item) => item.status === "Low").length;
//   const criticalStock = stockInventory.filter((item) => item.status === "Critical").length;

//   const getStatusBadge = (status) => {
//     const styles = {
//       Good: "bg-emerald-100 text-emerald-700",
//       Low: "bg-amber-100 text-amber-700",
//       Critical: "bg-red-100 text-red-700",
//     };
//     return styles[status] || "bg-gray-100 text-gray-700";
//   };

//   const getStockPercentage = (current, max) => {
//     return ((current / max) * 100).toFixed(0);
//   };

//   return (
//     <div className="space-y-6 mt-15 mt-15">
//       {/* Header with Add Button */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Stock Inventory
//         </h2>
//         <p
//           onClick={() => setShowModal(true)}
//           className=" flex border-2  p-2 mt-0.5 bg-black text-white cursor-pointer">
//           <Plus size={20} className="mt-0.5"/>
//           Add Stock Item
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Total Items</h4>
//               <p className="text-3xl font-bold text-black">{totalItems}</p>
//               <p className="text-sm text-blue-600 mt-1">Unique SKUs</p>
//             </div>
//             <Package className="text-blue-500" size={40} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Total Value</h4>
//               <p className="text-2xl font-bold text-black">
//                 ₹{(totalValue / 100000).toFixed(2)}L
//               </p>
//               <p className="text-sm text-emerald-600 mt-1">Inventory worth</p>
//             </div>
//             <DollarSign className="text-emerald-500" size={40} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Good Stock</h4>
//               <p className="text-3xl font-bold text-black">{goodStock}</p>
//               <p className="text-sm text-green-600 mt-1">
//                 {((goodStock / totalItems) * 100).toFixed(0)}% of inventory
//               </p>
//             </div>
//             <TrendingUp className="text-green-500" size={40} />
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-sm text-gray-600 mb-1">Needs Attention</h4>
//               <p className="text-3xl font-bold text-black">
//                 {lowStock + criticalStock}
//               </p>
//               <p className="text-sm text-amber-600 mt-1">
//                 {criticalStock} critical, {lowStock} low
//               </p>
//             </div>
//             <AlertCircle className="text-amber-500" size={40} />
//           </div>
//         </div>
//       </div>

//       {/* Category Summary */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h3 className="text-xl font-semibold mb-4 text-black">Stock by Category</h3>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {categorySummary.map((cat, idx) => (
//             <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition">
//               <div className="flex items-center justify-between mb-3">
//                 <h4 className="font-semibold text-gray-800">{cat.category}</h4>
//                 <span
//                   className={`px-2 py-1 rounded text-xs font-semibold ${
//                     cat.stockHealth === "Good"
//                       ? "bg-emerald-100 text-emerald-700"
//                       : "bg-amber-100 text-amber-700"
//                   }`}
//                 >
//                   {cat.stockHealth}
//                 </span>
//               </div>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Items:</span>
//                   <span className="font-bold">{cat.items}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Value:</span>
//                   <span className="font-bold text-emerald-600">
//                     ₹{(cat.totalValue / 100000).toFixed(2)}L
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
//               Search Items
//             </label>
//             <div className="relative">
//               <Search
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by item name or code..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Category
//             </label>
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
//             >
//               <option>All</option>
//               <option>Chemicals</option>
//               <option>Raw Materials</option>
//               <option>Packaging</option>
//               <option>Equipment</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Status
//             </label>
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
//             >
//               <option>All</option>
//               <option>Good</option>
//               <option>Low</option>
//               <option>Critical</option>
//             </select>
//           </div>
//           <p className=" flex border-2  p-2 mt-0.5 bg-black text-white cursor-pointer">
//             <Download size={18} className="mt-0.5"/>
//             Export
//           </p>
//         </div>
//       </div>

//       {/* Stock Inventory Table */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h3 className="text-xl font-semibold mb-4 text-black">
//           Stock Inventory ({filteredStock.length} items)
//         </h3>
//         <div className="overflow-auto">
//           <table className="w-full text-sm text-black">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Item Code</th>
//                 <th className="p-3 text-left">Item Name</th>
//                 <th className="p-3 text-left">Category</th>
//                 <th className="p-3 text-center">Stock</th>
//                 <th className="p-3 text-center">Stock Level</th>
//                 <th className="p-3 text-right">Unit Price</th>
//                 <th className="p-3 text-right">Total Value</th>
//                 <th className="p-3 text-left">Warehouse</th>
//                 <th className="p-3 text-center">Status</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStock.map((item) => {
//                 const stockPercent = getStockPercentage(
//                   item.currentStock,
//                   item.maxStock
//                 );
//                 return (
//                   <tr key={item.id} className="border-b hover:bg-gray-100">
//                     <td className="p-3 font-mono text-blue-600 font-semibold">
//                       {item.itemCode}
//                     </td>
//                     <td className="p-3">
//                       <div className="font-semibold">{item.itemName}</div>
//                       <div className="text-xs text-gray-500">
//                         Expires: {item.expiryDate}
//                       </div>
//                     </td>
//                     <td className="p-3 text-gray-600">{item.category}</td>
//                     <td className="p-3 text-center">
//                       <div className="font-bold text-gray-800">
//                         {item.currentStock}
//                       </div>
//                       <div className="text-xs text-gray-500">{item.unit}</div>
//                     </td>
//                     <td className="p-3">
//                       <div className="flex flex-col items-center gap-1">
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div
//                             className={`h-2 rounded-full ${
//                               stockPercent > 50
//                                 ? "bg-emerald-500"
//                                 : stockPercent > 25
//                                 ? "bg-amber-500"
//                                 : "bg-red-500"
//                             }`}
//                             style={{ width: `${stockPercent}%` }}
//                           ></div>
//                         </div>
//                         <span className="text-xs font-semibold">
//                           {stockPercent}%
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-3 text-right text-gray-700">
//                       ₹{item.unitPrice.toLocaleString()}
//                     </td>
//                     <td className="p-3 text-right font-semibold text-emerald-600">
//                       ₹{item.totalValue.toLocaleString()}
//                     </td>
//                     <td className="p-3">
//                       <div className="text-gray-700">{item.warehouse}</div>
//                       <div className="text-xs text-gray-500">{item.location}</div>
//                     </td>
//                     <td className="p-3 text-center">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
//                           item.status
//                         )}`}
//                       >
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="p-3 text-center">
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <Eye size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         {filteredStock.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             No items found matching your criteria.
//           </div>
//         )}
//       </div>

//       {/* Add Stock Item Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X size={24} />
//             </button>

//             <h3 className="text-2xl font-bold mb-6 text-gray-900">
//               Add New Stock Item
//             </h3>

//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Item Code *
//                   </label>
//                   <input
//                     name="itemCode"
//                     placeholder="e.g., CHM-001"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.itemCode}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Item Name *
//                   </label>
//                   <input
//                     name="itemName"
//                     placeholder="Enter item name"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.itemName}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Category *
//                   </label>
//                   <select
//                     name="category"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.category}
//                   >
//                     <option value="">Select category</option>
//                     <option value="Chemicals">Chemicals</option>
//                     <option value="Raw Materials">Raw Materials</option>
//                     <option value="Packaging">Packaging</option>
//                     <option value="Equipment">Equipment</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Warehouse *
//                   </label>
//                   <select
//                     name="warehouse"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.warehouse}
//                   >
//                     <option value="">Select warehouse</option>
//                     <option value="Main Warehouse A">Main Warehouse A</option>
//                     <option value="Warehouse B">Warehouse B</option>
//                     <option value="Warehouse C">Warehouse C</option>
//                     <option value="Distribution Center">Distribution Center</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Current Stock *
//                   </label>
//                   <input
//                     name="currentStock"
//                     type="number"
//                     placeholder="Enter quantity"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.currentStock}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Unit *
//                   </label>
//                   <select
//                     name="unit"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.unit}
//                   >
//                     <option value="">Select unit</option>
//                     <option value="Liters">Liters</option>
//                     <option value="Kg">Kg</option>
//                     <option value="Pieces">Pieces</option>
//                     <option value="Boxes">Boxes</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Reorder Level *
//                   </label>
//                   <input
//                     name="reorderLevel"
//                     type="number"
//                     placeholder="Min stock"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.reorderLevel}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Unit Price (₹) *
//                   </label>
//                   <input
//                     name="unitPrice"
//                     type="number"
//                     placeholder="Price per unit"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.unitPrice}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Supplier *
//                   </label>
//                   <input
//                     name="supplier"
//                     placeholder="Supplier name"
//                     className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                     onChange={handleChange}
//                     value={form.supplier}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Expiry Date
//                 </label>
//                 <input
//                   name="expiryDate"
//                   type="date"
//                   className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
//                   onChange={handleChange}
//                   value={form.expiryDate}
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={handleSubmit}
//                 className=" flex border-2  p-2 mt-0.5 bg-black text-white cursor-pointer"
//               >
//                 Add Stock Item
//               </button>
//               <p
//                 onClick={() => setShowModal(false)}
//                 className="px-6 bg-gray-200 cursor-pointer text-gray-700 py-2.5 rounded-lg hover:bg-gray-300 font-medium transition-colors"
//               >
//                 Cancel
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus,Pencil, Eye, X } from "lucide-react";

export default function StockOverview() {
  const [stocks, setStocks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    itemCode: "",
    itemName: "",
    category: "",
    currentStock: "",
    unit: "",
    unitPrice: "",
    reorderLevel: "",
    warehouse: "",
    supplier: "",
    expiryDate: "",
  });
  const [warehouses, setWarehouses] = useState([]);
  const [editingId, setEditingId] = useState(null);



  /* ================= FETCH STOCK ================= */
  const fetchStocks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stocks");
      setStocks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleEdit = (item) => {
  setForm({
    itemCode: item.itemCode,
    itemName: item.itemName,
    category: item.category,
    currentStock: item.currentStock,
    unit: item.unit,
    unitPrice: item.unitPrice,
    reorderLevel: item.reorderLevel,
    warehouse: item.warehouse,
    supplier: item.supplier,
    expiryDate: item.expiryDate || "",
  });

  setEditingId(item._id);
  setShowModal(true);
};


  /* ================= SUBMIT ================= */
const handleSubmit = async () => {
  try {
    const payload = {
      ...form,
      status:
        Number(form.currentStock) <= Number(form.reorderLevel) * 0.5
          ? "Critical"
          : Number(form.currentStock) <= Number(form.reorderLevel)
          ? "Low"
          : "Good",
    };

    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/stocks/${editingId}`,
        payload
      );
    } else {
      await axios.post("http://localhost:5000/api/stocks", payload);
    }

    setShowModal(false);
    setEditingId(null);
    fetchStocks();

    setForm({
      itemCode: "",
      itemName: "",
      category: "",
      currentStock: "",
      unit: "",
      unitPrice: "",
      reorderLevel: "",
      warehouse: "",
      supplier: "",
      expiryDate: "",
    });
  } catch (err) {
    alert(err.response?.data?.message || "Error saving stock");
  }
};

  const fetchWarehouses = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/warehouses");
    setWarehouses(res.data);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  // fetchStocks();
  fetchWarehouses();
}, []);


  return (
    <div className="p-6 mt-10 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stock Inventory</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          <Plus size={18} /> Add Stock Item
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Item Code</th>
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Stock</th>
              <th className="p-3 text-right">Unit Price</th>
              <th className="p-3 text-right">Warehouse</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono text-blue-600">
                  {item.itemCode}
                </td>
                <td className="p-3 font-semibold">{item.itemName}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3 text-center">
                  {item.currentStock} {item.unit}
                </td>
                <td className="p-3 text-right">₹{item.unitPrice}</td>
                <td className="p-3 text-right">{item.warehouse}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "Good"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-center">
  <button
    onClick={() => handleEdit(item)}
    className="text-blue-600 hover:text-blue-800"
  >
    <Pencil size={18} />
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>

        {stocks.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            No stock items found
          </p>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            />

            <h2 className="text-xl font-bold mb-4">Add Stock Item</h2>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Item Code" name="itemCode" value={form.itemCode} onChange={handleChange} />
              <Input label="Item Name" name="itemName" value={form.itemName} onChange={handleChange} />
              <Select label="Category" name="category" value={form.category} onChange={handleChange}
                options={["Chemicals","Raw Materials","Packaging","Equipment"]}
              />
              <div>
  <label className="block text-sm font-medium mb-1">
    Warehouse
  </label>
  <select
    name="warehouse"
    value={form.warehouse}
    onChange={handleChange}
    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black"
  >
    <option value="">Select Warehouse</option>
    {warehouses.map((wh) => (
      <option key={wh._id} value={wh.warehouse} className="text-black">
        {wh.warehouse}
      </option>
    ))}
  </select>
</div>

              <Input label="Current Stock" name="currentStock" type="number" value={form.currentStock} onChange={handleChange} />
              <Select label="Unit" name="unit" value={form.unit} onChange={handleChange}
                options={["Liters","Kg","Pieces","Boxes"]}
              />
              <Input label="Reorder Level" name="reorderLevel" type="number" value={form.reorderLevel} onChange={handleChange} />
              <Input label="Unit Price (₹)" name="unitPrice" type="number" value={form.unitPrice} onChange={handleChange} />
              <Input label="Supplier" name="supplier" value={form.supplier} onChange={handleChange} />
              <Input label="Expiry Date" name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= REUSABLE INPUTS ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        {...props}
        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-black"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
