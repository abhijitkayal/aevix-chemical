import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#D65DB1",
  "#FF6F91",
  "#4D96FF",
];

const StateWiseCharts = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/invoices");

      const invoices = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : [];

      const stateMap = {};

      invoices.forEach((inv) => {
        const state = inv.state || "Unknown";

        if (!stateMap[state]) {
          stateMap[state] = {
            state,
            totalProducts: 0,
            totalAmount: 0,
            invoiceCount: 0,
          };
        }

        stateMap[state].totalProducts += Number(inv.quantity || 0);
        stateMap[state].totalAmount += Number(inv.totalAmount || 0);
        stateMap[state].invoiceCount += 1;
      });

      setChartData(Object.values(stateMap));
    } catch (err) {
      console.error("Invoice fetch error", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>
        📊 State-wise Sales Overview
      </h2>

      {/* ================= STATES COUNT PIE ================= */}
      <div className="flex">
      <div style={{ width: "100%", height: 350 }}>
        <h4>🗺️ total buy product</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="invoiceCount"
              nameKey="state"
              outerRadius={120}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
        <div style={{ width: "100%", height: 350, marginTop: 40 }}>
        <h4>💰 Amount Collected Per State</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="totalAmount"
              nameKey="state"
              outerRadius={120}
              label={({ state, totalAmount }) =>
                `${state}: ₹${totalAmount} `
              }
            >
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      </div>

      {/* ================= PRODUCT COUNT BAR ================= */}
      <div style={{ width: "100%", height: 350, marginTop: 40 }}>
        <h4>📦 Products Sold Per State</h4>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="totalProducts"
              fill="#00C49F"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= AMOUNT PIE ================= */}
    
    </div>
  );
};

export default StateWiseCharts;
