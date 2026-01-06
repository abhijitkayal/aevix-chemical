import React, { useState } from "react";
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
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Package,
} from "lucide-react";

// Production variance data
const productionVariance = [
  {
    id: 1,
    batchNumber: "BATCH-2026-001",
    productName: "Industrial Cleaner X-200",
    plannedDate: "2026-01-03",
    actualDate: "2026-01-03",
    plannedQuantity: 500,
    actualQuantity: 485,
    unit: "Liters",
    quantityVariance: -15,
    quantityVariancePercent: -3.0,
    plannedCost: 125000,
    actualCost: 128500,
    costVariance: 3500,
    costVariancePercent: 2.8,
    status: "Unfavorable",
    reason: "Material wastage higher than expected",
  },
  {
    id: 2,
    batchNumber: "BATCH-2026-002",
    productName: "Acid Neutralizer Pro",
    plannedDate: "2026-01-04",
    actualDate: "2026-01-04",
    plannedQuantity: 800,
    actualQuantity: 820,
    unit: "Kg",
    quantityVariance: 20,
    quantityVariancePercent: 2.5,
    plannedCost: 240000,
    actualCost: 235000,
    costVariance: -5000,
    costVariancePercent: -2.1,
    status: "Favorable",
    reason: "Better material utilization",
  },
  {
    id: 3,
    batchNumber: "BATCH-2026-003",
    productName: "Premium Coating Solution",
    plannedDate: "2026-01-05",
    actualDate: "2026-01-06",
    plannedQuantity: 600,
    actualQuantity: 580,
    unit: "Liters",
    quantityVariance: -20,
    quantityVariancePercent: -3.3,
    plannedCost: 360000,
    actualCost: 375000,
    costVariance: 15000,
    costVariancePercent: 4.2,
    status: "Unfavorable",
    reason: "Equipment downtime and material shortage",
  },
  {
    id: 4,
    batchNumber: "BATCH-2026-004",
    productName: "Metal Surface Treatment",
    plannedDate: "2026-01-04",
    actualDate: "2026-01-04",
    plannedQuantity: 350,
    actualQuantity: 350,
    unit: "Liters",
    quantityVariance: 0,
    quantityVariancePercent: 0,
    plannedCost: 175000,
    actualCost: 172000,
    costVariance: -3000,
    costVariancePercent: -1.7,
    status: "Favorable",
    reason: "On target production with cost savings",
  },
  {
    id: 5,
    batchNumber: "BATCH-2026-005",
    productName: "Rust Prevention Compound",
    plannedDate: "2026-01-05",
    actualDate: "2026-01-05",
    plannedQuantity: 450,
    actualQuantity: 430,
    unit: "Kg",
    quantityVariance: -20,
    quantityVariancePercent: -4.4,
    plannedCost: 202500,
    actualCost: 210000,
    costVariance: 7500,
    costVariancePercent: 3.7,
    status: "Unfavorable",
    reason: "Raw material quality issues",
  },
  {
    id: 6,
    batchNumber: "BATCH-2025-998",
    productName: "Eco-Friendly Solvent",
    plannedDate: "2025-12-30",
    actualDate: "2025-12-30",
    plannedQuantity: 700,
    actualQuantity: 715,
    unit: "Liters",
    quantityVariance: 15,
    quantityVariancePercent: 2.1,
    plannedCost: 280000,
    actualCost: 275000,
    costVariance: -5000,
    costVariancePercent: -1.8,
    status: "Favorable",
    reason: "Improved process efficiency",
  },
];

// Material variance data
const materialVariance = [
  {
    material: "Sulfuric Acid",
    standardQty: 250,
    actualQty: 265,
    variance: 15,
    standardCost: 212500,
    actualCost: 225250,
    costVariance: 12750,
  },
  {
    material: "Sodium Hydroxide",
    standardQty: 180,
    actualQty: 175,
    variance: -5,
    standardCost: 75600,
    actualCost: 73500,
    costVariance: -2100,
  },
  {
    material: "Titanium Dioxide",
    standardQty: 120,
    actualQty: 128,
    variance: 8,
    standardCost: 114000,
    actualCost: 121600,
    costVariance: 7600,
  },
  {
    material: "Acetic Acid",
    standardQty: 95,
    actualQty: 92,
    variance: -3,
    standardCost: 64600,
    actualCost: 62560,
    costVariance: -2040,
  },
  {
    material: "Calcium Carbonate",
    standardQty: 200,
    actualQty: 205,
    variance: 5,
    standardCost: 76000,
    actualCost: 77900,
    costVariance: 1900,
  },
];

// Labor variance data
const laborVariance = [
  {
    department: "Production Unit A",
    standardHours: 160,
    actualHours: 175,
    variance: 15,
    standardCost: 80000,
    actualCost: 87500,
    costVariance: 7500,
  },
  {
    department: "Production Unit B",
    standardHours: 140,
    actualHours: 135,
    variance: -5,
    standardCost: 70000,
    actualCost: 67500,
    costVariance: -2500,
  },
  {
    department: "Quality Control",
    standardHours: 80,
    actualHours: 85,
    variance: 5,
    standardCost: 48000,
    actualCost: 51000,
    costVariance: 3000,
  },
  {
    department: "Packaging Unit",
    standardHours: 100,
    actualHours: 98,
    variance: -2,
    standardCost: 40000,
    actualCost: 39200,
    costVariance: -800,
  },
];

// Monthly variance trend
const monthlyVarianceTrend = [
  { month: "Aug", favorable: 45000, unfavorable: 28000, net: 17000 },
  { month: "Sep", favorable: 52000, unfavorable: 35000, net: 17000 },
  { month: "Oct", favorable: 38000, unfavorable: 42000, net: -4000 },
  { month: "Nov", favorable: 61000, unfavorable: 31000, net: 30000 },
  { month: "Dec", favorable: 48000, unfavorable: 39000, net: 9000 },
  { month: "Jan", favorable: 56000, unfavorable: 44000, net: 12000 },
];

export default function Variance() {
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredVariance = productionVariance.filter((item) => {
    if (filterStatus === "All") return true;
    return item.status === filterStatus;
  });

  const totalFavorable = productionVariance.filter(
    (v) => v.status === "Favorable"
  ).length;
  const totalUnfavorable = productionVariance.filter(
    (v) => v.status === "Unfavorable"
  ).length;
  const totalCostVariance = productionVariance.reduce(
    (sum, v) => sum + v.costVariance,
    0
  );
  const totalQuantityVariance = productionVariance.reduce(
    (sum, v) => sum + v.quantityVariance,
    0
  );

  return (
    <div className="space-y-6 mt-15">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Favorable Variance</h4>
              <p className="text-3xl font-bold text-emerald-600">
                {totalFavorable}
              </p>
              <p className="text-sm text-emerald-600 mt-1">Batches</p>
            </div>
            <CheckCircle className="text-emerald-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">
                Unfavorable Variance
              </h4>
              <p className="text-3xl font-bold text-red-600">
                {totalUnfavorable}
              </p>
              <p className="text-sm text-red-600 mt-1">Batches</p>
            </div>
            <AlertTriangle className="text-red-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Cost Variance</h4>
              <p
                className={`text-2xl font-bold ${
                  totalCostVariance >= 0 ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {totalCostVariance >= 0 ? "+" : ""}₹
                {(totalCostVariance / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-blue-600 mt-1">Overall impact</p>
            </div>
            <DollarSign className="text-blue-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Quantity Variance</h4>
              <p
                className={`text-2xl font-bold ${
                  totalQuantityVariance >= 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {totalQuantityVariance >= 0 ? "+" : ""}
                {totalQuantityVariance}
              </p>
              <p className="text-sm text-purple-600 mt-1">Units</p>
            </div>
            <Package className="text-purple-500" size={40} />
          </div>
        </div>
      </div>

      {/* Variance Trend Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Monthly Variance Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyVarianceTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip />
            <Legend />
            <Bar dataKey="favorable" fill="#10b981" name="Favorable" />
            <Bar dataKey="unfavorable" fill="#ef4444" name="Unfavorable" />
            <Line
              type="monotone"
              dataKey="net"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Net Variance"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Material Variance */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Material Variance (This Week)
        </h3>
        <div className="overflow-auto">
          <table className="w-full text-sm text-black">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Material</th>
                <th className="p-3 text-center">Standard Qty</th>
                <th className="p-3 text-center">Actual Qty</th>
                <th className="p-3 text-center">Variance</th>
                <th className="p-3 text-right">Standard Cost</th>
                <th className="p-3 text-right">Actual Cost</th>
                <th className="p-3 text-right">Cost Variance</th>
              </tr>
            </thead>
            <tbody>
              {materialVariance.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100">
                  <td className="p-3 font-semibold">{item.material}</td>
                  <td className="p-3 text-center text-gray-700">
                    {item.standardQty}
                  </td>
                  <td className="p-3 text-center text-gray-700">
                    {item.actualQty}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`font-bold ${
                        item.variance >= 0 ? "text-red-600" : "text-emerald-600"
                      }`}
                    >
                      {item.variance >= 0 ? "+" : ""}
                      {item.variance}
                    </span>
                  </td>
                  <td className="p-3 text-right text-gray-700">
                    ₹{item.standardCost.toLocaleString()}
                  </td>
                  <td className="p-3 text-right text-gray-700">
                    ₹{item.actualCost.toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`font-bold ${
                        item.costVariance >= 0
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {item.costVariance >= 0 ? "+" : ""}₹
                      {item.costVariance.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Labor Variance */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Labor Variance (This Week)
        </h3>
        <div className="overflow-auto">
          <table className="w-full text-sm text-black">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-center">Standard Hours</th>
                <th className="p-3 text-center">Actual Hours</th>
                <th className="p-3 text-center">Variance</th>
                <th className="p-3 text-right">Standard Cost</th>
                <th className="p-3 text-right">Actual Cost</th>
                <th className="p-3 text-right">Cost Variance</th>
              </tr>
            </thead>
            <tbody>
              {laborVariance.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100">
                  <td className="p-3 font-semibold">{item.department}</td>
                  <td className="p-3 text-center text-gray-700">
                    {item.standardHours}h
                  </td>
                  <td className="p-3 text-center text-gray-700">
                    {item.actualHours}h
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`font-bold ${
                        item.variance >= 0 ? "text-red-600" : "text-emerald-600"
                      }`}
                    >
                      {item.variance >= 0 ? "+" : ""}
                      {item.variance}h
                    </span>
                  </td>
                  <td className="p-3 text-right text-gray-700">
                    ₹{item.standardCost.toLocaleString()}
                  </td>
                  <td className="p-3 text-right text-gray-700">
                    ₹{item.actualCost.toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`font-bold ${
                        item.costVariance >= 0
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {item.costVariance >= 0 ? "+" : ""}₹
                      {item.costVariance.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Production Variance Details */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-black">
            Production Variance Details
          </h3>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
          >
            <option>All</option>
            <option>Favorable</option>
            <option>Unfavorable</option>
          </select>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm text-black">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Batch Number</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-center">Planned Date</th>
                <th className="p-3 text-center">Actual Date</th>
                <th className="p-3 text-center">Quantity Variance</th>
                <th className="p-3 text-right">Cost Variance</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredVariance.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b hover:bg-gray-100 ${
                    item.status === "Unfavorable" ? "bg-red-50" : "bg-green-50"
                  }`}
                >
                  <td className="p-3 font-mono font-semibold text-blue-600">
                    {item.batchNumber}
                  </td>
                  <td className="p-3">{item.productName}</td>
                  <td className="p-3 text-center text-gray-600">
                    {item.plannedDate}
                  </td>
                  <td className="p-3 text-center text-gray-600">
                    {item.actualDate}
                  </td>
                  <td className="p-3 text-center">
                    <div
                      className={`font-bold ${
                        item.quantityVariance >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.quantityVariance >= 0 ? "+" : ""}
                      {item.quantityVariance} {item.unit}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({item.quantityVariancePercent >= 0 ? "+" : ""}
                      {item.quantityVariancePercent}%)
                    </div>
                  </td>
                  <td className="p-3 text-right">
                    <div
                      className={`font-bold ${
                        item.costVariance >= 0
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {item.costVariance >= 0 ? "+" : ""}₹
                      {item.costVariance.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      ({item.costVariancePercent >= 0 ? "+" : ""}
                      {item.costVariancePercent}%)
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    {item.status === "Favorable" ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <CheckCircle size={12} /> Favorable
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold inline-flex items-center gap-1">
                        <AlertTriangle size={12} /> Unfavorable
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-gray-600 text-xs">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
