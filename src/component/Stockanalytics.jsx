import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Stock level data by category
const stockLevelData = [
  { category: "Raw Materials", inStock: 1200, lowStock: 300, outOfStock: 50 },
  { category: "Chemicals", inStock: 850, lowStock: 200, outOfStock: 30 },
  { category: "Packaging", inStock: 600, lowStock: 150, outOfStock: 20 },
  { category: "Finished Goods", inStock: 450, lowStock: 100, outOfStock: 15 },
  { category: "Equipment", inStock: 320, lowStock: 80, outOfStock: 10 },
];

// Stock movement trend
const stockMovementData = [
  { month: "Jan", incoming: 2400, outgoing: 1800, current: 3200 },
  { month: "Feb", incoming: 2100, outgoing: 2200, current: 3100 },
  { month: "Mar", incoming: 2800, outgoing: 2000, current: 3900 },
  { month: "Apr", incoming: 2500, outgoing: 2400, current: 4000 },
  { month: "May", incoming: 3000, outgoing: 2100, current: 4900 },
  { month: "Jun", incoming: 2700, outgoing: 2500, current: 5100 },
  { month: "Jul", incoming: 2900, outgoing: 2300, current: 5700 },
];

// Warehouse distribution
const warehouseData = [
  { name: "Warehouse A", value: 3500 },
  { name: "Warehouse B", value: 2800 },
  { name: "Warehouse C", value: 2100 },
  { name: "Warehouse D", value: 1600 },
];

// Top selling products stock
const topProductsStock = [
  { product: "Product Alpha", stock: 450, sold: 320, reorderPoint: 200 },
  { product: "Product Beta", stock: 380, sold: 280, reorderPoint: 150 },
  { product: "Product Gamma", stock: 290, sold: 250, reorderPoint: 180 },
  { product: "Product Delta", stock: 210, sold: 190, reorderPoint: 120 },
  { product: "Product Epsilon", stock: 180, sold: 160, reorderPoint: 100 },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];

export default function StockAnalytics() {
  return (
    <div className="space-y-6 mt-15 mt-15">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
          <h4 className="text-sm text-gray-600 mb-1">Total Items</h4>
          <p className="text-3xl font-bold text-black">4,820</p>
          <p className="text-sm text-emerald-600 mt-1">↑ 12% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
          <h4 className="text-sm text-gray-600 mb-1">In Stock</h4>
          <p className="text-3xl font-bold text-black">3,420</p>
          <p className="text-sm text-blue-600 mt-1">71% of inventory</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
          <h4 className="text-sm text-gray-600 mb-1">Low Stock</h4>
          <p className="text-3xl font-bold text-black">830</p>
          <p className="text-sm text-amber-600 mt-1">Needs reorder</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
          <h4 className="text-sm text-gray-600 mb-1">Out of Stock</h4>
          <p className="text-3xl font-bold text-black">125</p>
          <p className="text-sm text-red-600 mt-1">Urgent action needed</p>
        </div>
      </div>

      {/* Stock Levels by Category - Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Stock Levels by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockLevelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" stroke="#000" angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="#000" />
              <Tooltip />
              <Legend />
              <Bar dataKey="inStock" fill="#10b981" name="In Stock" />
              <Bar dataKey="lowStock" fill="#f59e0b" name="Low Stock" />
              <Bar dataKey="outOfStock" fill="#ef4444" name="Out of Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Summary Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold mb-3 text-black">Category Summary</h4>
          <div className="overflow-auto max-h-[300px]">
            <table className="w-full text-sm text-black">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {stockLevelData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="p-2">{item.category}</td>
                    <td className="p-2 text-right font-semibold">
                      {(item.inStock + item.lowStock + item.outOfStock).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stock Movement Trend - Line Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Stock Movement Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockMovementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="incoming" stroke="#10b981" strokeWidth={2} name="Incoming" />
              <Line type="monotone" dataKey="outgoing" stroke="#ef4444" strokeWidth={2} name="Outgoing" />
              <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={2} name="Current Stock" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Movement Data Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold mb-3 text-black">Movement Data</h4>
          <div className="overflow-auto max-h-[300px]">
            <table className="w-full text-sm text-black">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">Month</th>
                  <th className="p-2 text-right">In</th>
                  <th className="p-2 text-right">Out</th>
                </tr>
              </thead>
              <tbody>
                {stockMovementData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="p-2">{item.month}</td>
                    <td className="p-2 text-right text-emerald-600">{item.incoming.toLocaleString()}</td>
                    <td className="p-2 text-right text-red-600">{item.outgoing.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Warehouse Distribution & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart - Warehouse Distribution */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Warehouse Distribution</h3>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={warehouseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {warehouseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <table className="w-full text-sm text-black">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Warehouse</th>
                    <th className="p-2 text-right">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {warehouseData.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-100">
                      <td className="p-2 flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        ></span>
                        {item.name}
                      </td>
                      <td className="p-2 text-right font-semibold">{item.value.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products Stock Status */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Top Products Stock Status</h3>
          <div className="overflow-auto max-h-[330px]">
            <table className="w-full text-sm text-black">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-right">Stock</th>
                  <th className="p-2 text-right">Sold</th>
                  <th className="p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {topProductsStock.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="p-2">{item.product}</td>
                    <td className="p-2 text-right font-semibold">{item.stock}</td>
                    <td className="p-2 text-right text-gray-600">{item.sold}</td>
                    <td className="p-2 text-center">
                      {item.stock > item.reorderPoint ? (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">Good</span>
                      ) : item.stock > item.reorderPoint * 0.5 ? (
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">Low</span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Critical</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
