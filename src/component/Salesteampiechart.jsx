import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Hardcoded sales data for graphs
const salesLineData = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Feb", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 2000, revenue: 9800 },
  { month: "Apr", sales: 2780, revenue: 3908 },
  { month: "May", sales: 1890, revenue: 4800 },
  { month: "Jun", sales: 2390, revenue: 3800 },
  { month: "Jul", sales: 3490, revenue: 4300 },
];

const salesBarData = [
  { product: "Product A", sales: 4000 },
  { product: "Product B", sales: 3000 },
  { product: "Product C", sales: 2000 },
  { product: "Product D", sales: 2780 },
  { product: "Product E", sales: 1890 },
];

export default function SalesTeamPieChart() {
  return (
    <div className="space-y-6 mt-15 mt-15">
      {/* Line Chart - Sales Trend with Data Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Sales & Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Data Table for Line Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold mb-3 text-black">Monthly Data</h4>
          <div className="overflow-auto max-h-[300px]">
            <table className="w-full text-sm text-black">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">Month</th>
                  <th className="p-2 text-right">Sales</th>
                  <th className="p-2 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {salesLineData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="p-2">{item.month}</td>
                    <td className="p-2 text-right">{item.sales.toLocaleString()}</td>
                    <td className="p-2 text-right">{item.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bar Chart - Product Sales with Data Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-black">Product Sales Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Data Table for Bar Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold mb-3 text-black">Product Data</h4>
          <div className="overflow-auto max-h-[300px]">
            <table className="w-full text-sm text-black">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-right">Sales</th>
                </tr>
              </thead>
              <tbody>
                {salesBarData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="p-2">{item.product}</td>
                    <td className="p-2 text-right">{item.sales.toLocaleString()}</td>
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
 
