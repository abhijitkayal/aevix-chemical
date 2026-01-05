import React from "react";
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
} from "recharts";
import { Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

// Warehouse movement data (daily/weekly tracking)
const warehouseMovementData = [
  { date: "Week 1", received: 450, dispatched: 320, transferred: 80, returns: 20 },
  { date: "Week 2", received: 520, dispatched: 380, transferred: 95, returns: 15 },
  { date: "Week 3", received: 480, dispatched: 420, transferred: 70, returns: 25 },
  { date: "Week 4", received: 610, dispatched: 390, transferred: 110, returns: 18 },
];

// Stock overview by warehouse location
const stockOverviewData = [
  { 
    warehouse: "Main Warehouse A", 
    location: "Mumbai",
    totalItems: 2850, 
    capacity: 5000,
    utilizationPercent: 57,
    value: "₹45,00,000"
  },
  { 
    warehouse: "Warehouse B", 
    location: "Delhi",
    totalItems: 2100, 
    capacity: 3500,
    utilizationPercent: 60,
    value: "₹32,50,000"
  },
  { 
    warehouse: "Warehouse C", 
    location: "Bangalore",
    totalItems: 1650, 
    capacity: 3000,
    utilizationPercent: 55,
    value: "₹28,00,000"
  },
  { 
    warehouse: "Distribution Center", 
    location: "Chennai",
    totalItems: 980, 
    capacity: 2000,
    utilizationPercent: 49,
    value: "₹18,50,000"
  },
];

// Low stock items requiring attention
const lowStockItems = [
  { 
    itemCode: "CHM-001", 
    itemName: "Sulfuric Acid 98%", 
    currentStock: 45, 
    reorderLevel: 100,
    minStock: 50,
    warehouse: "Warehouse A",
    status: "Critical",
    lastOrdered: "2025-12-20"
  },
  { 
    itemCode: "PKG-045", 
    itemName: "HDPE Containers 5L", 
    currentStock: 120, 
    reorderLevel: 200,
    minStock: 150,
    warehouse: "Warehouse B",
    status: "Low",
    lastOrdered: "2025-12-28"
  },
  { 
    itemCode: "RAW-112", 
    itemName: "Titanium Dioxide", 
    currentStock: 180, 
    reorderLevel: 300,
    minStock: 250,
    warehouse: "Warehouse A",
    status: "Low",
    lastOrdered: "2025-12-15"
  },
  { 
    itemCode: "CHM-089", 
    itemName: "Sodium Hydroxide", 
    currentStock: 65, 
    reorderLevel: 150,
    minStock: 100,
    warehouse: "Warehouse C",
    status: "Critical",
    lastOrdered: "2025-12-22"
  },
  { 
    itemCode: "PKG-023", 
    itemName: "Glass Bottles 1L", 
    currentStock: 280, 
    reorderLevel: 400,
    minStock: 350,
    warehouse: "Distribution Center",
    status: "Low",
    lastOrdered: "2026-01-02"
  },
  { 
    itemCode: "RAW-067", 
    itemName: "Acetic Acid", 
    currentStock: 38, 
    reorderLevel: 120,
    minStock: 80,
    warehouse: "Warehouse B",
    status: "Critical",
    lastOrdered: "2025-12-18"
  },
  { 
    itemCode: "EQP-034", 
    itemName: "Safety Gloves (Box)", 
    currentStock: 95, 
    reorderLevel: 150,
    minStock: 120,
    warehouse: "Warehouse A",
    status: "Low",
    lastOrdered: "2025-12-30"
  },
];

// Monthly stock trends
const monthlyStockTrend = [
  { month: "Aug", stock: 6200 },
  { month: "Sep", stock: 6580 },
  { month: "Oct", stock: 6320 },
  { month: "Nov", stock: 6890 },
  { month: "Dec", stock: 7100 },
  { month: "Jan", stock: 7580 },
];

export default function Warehouse() {
  const totalStock = stockOverviewData.reduce((sum, wh) => sum + wh.totalItems, 0);
  const criticalItems = lowStockItems.filter(item => item.status === "Critical").length;
  const lowItems = lowStockItems.filter(item => item.status === "Low").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Total Stock</h4>
              <p className="text-3xl font-bold text-black">{totalStock.toLocaleString()}</p>
              <p className="text-sm text-blue-600 mt-1">Across 4 warehouses</p>
            </div>
            <Package className="text-blue-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Received (This Week)</h4>
              <p className="text-3xl font-bold text-black">610</p>
              <p className="text-sm text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp size={14} /> +12% increase
              </p>
            </div>
            <TrendingUp className="text-emerald-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Low Stock Items</h4>
              <p className="text-3xl font-bold text-black">{lowItems}</p>
              <p className="text-sm text-amber-600 mt-1">Needs reorder soon</p>
            </div>
            <AlertTriangle className="text-amber-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Critical Stock</h4>
              <p className="text-3xl font-bold text-black">{criticalItems}</p>
              <p className="text-sm text-red-600 mt-1">Immediate action!</p>
            </div>
            <AlertTriangle className="text-red-500" size={40} />
          </div>
        </div>
      </div>

      {/* Warehouse Movement Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-black">Warehouse Movement (Last 4 Weeks)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={warehouseMovementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip />
            <Legend />
            <Bar dataKey="received" fill="#10b981" name="Received" />
            <Bar dataKey="dispatched" fill="#3b82f6" name="Dispatched" />
            <Bar dataKey="transferred" fill="#f59e0b" name="Transferred" />
            <Bar dataKey="returns" fill="#ef4444" name="Returns" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Overview by Warehouse */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Stock Overview by Warehouse</h3>
          <div className="overflow-auto">
            <table className="w-full text-sm text-black">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Warehouse</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-right">Items</th>
                  <th className="p-3 text-right">Capacity</th>
                  <th className="p-3 text-center">Utilization</th>
                  <th className="p-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {stockOverviewData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{item.warehouse}</td>
                    <td className="p-3 text-gray-600">{item.location}</td>
                    <td className="p-3 text-right">{item.totalItems.toLocaleString()}</td>
                    <td className="p-3 text-right text-gray-600">{item.capacity.toLocaleString()}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.utilizationPercent > 70 ? 'bg-red-500' : 
                              item.utilizationPercent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${item.utilizationPercent}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold">{item.utilizationPercent}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-right font-semibold text-emerald-600">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Trend */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Stock Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyStockTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip />
              <Line type="monotone" dataKey="stock" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Items - Critical Attention Required */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-black">Low Stock Items - Action Required</h3>
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
              {criticalItems} Critical
            </span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
              {lowItems} Low
            </span>
          </div>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm text-black">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Item Code</th>
                <th className="p-3 text-left">Item Name</th>
                <th className="p-3 text-center">Current Stock</th>
                <th className="p-3 text-center">Reorder Level</th>
                <th className="p-3 text-left">Warehouse</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-left">Last Ordered</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono font-semibold">{item.itemCode}</td>
                  <td className="p-3">{item.itemName}</td>
                  <td className="p-3 text-center">
                    <span className={`font-bold ${
                      item.currentStock < item.minStock ? 'text-red-600' : 'text-amber-600'
                    }`}>
                      {item.currentStock}
                    </span>
                  </td>
                  <td className="p-3 text-center text-gray-600">{item.reorderLevel}</td>
                  <td className="p-3 text-gray-600">{item.warehouse}</td>
                  <td className="p-3 text-center">
                    {item.status === "Critical" ? (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center justify-center gap-1">
                        <AlertTriangle size={12} /> Critical
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                        Low
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-gray-600 text-xs">{item.lastOrdered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
