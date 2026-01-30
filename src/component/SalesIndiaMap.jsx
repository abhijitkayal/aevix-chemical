'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* ======================
   Helpers
====================== */
const formatAmount = (val) =>
  `₹ ${Number(val || 0).toLocaleString('en-IN')}`;

const groupSalesByState = (sales = []) => {
  const map = {};
  sales.forEach((s) => {
    const state = s.place?.trim();
    const qty = Number(s.quantity) || 0;
    if (!state) return;
    map[state] = (map[state] || 0) + qty;
  });
  return map;
};

/* ======================
   Component
====================== */
const SalesIndiaMap = () => {
  const [top, setTop] = useState([]);
  const [least, setLeast] = useState([]);

  useEffect(() => {
    axios.get('https://aevix-chemical-mpbw.vercel.app/api/sales').then((res) => {
      const grouped = groupSalesByState(res.data);

      const sorted = Object.entries(grouped)
        .map(([state, qty]) => ({ state, qty }))
        .sort((a, b) => b.qty - a.qty);

      setTop(sorted.slice(0, 5));
      setLeast(sorted.slice(-5));
    });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* MAP IMAGE */}
      <div className="md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Total Sale</h2>

        <div className="w-full h-[520px] bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src="/images/india-sales-map.png"
            alt="India Sales Map"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="space-y-6">

        {/* Legend */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Sale</h3>
          <ul className="space-y-1 text-sm">
            <li><span className="inline-block w-3 h-3 bg-[#26a69a] mr-2" /> High</li>
            <li><span className="inline-block w-3 h-3 bg-[#fb8c00] mr-2" /> Medium</li>
            <li><span className="inline-block w-3 h-3 bg-[#fdd835] mr-2" /> Low</li>
            <li><span className="inline-block w-3 h-3 bg-[#1e88e5] mr-2" /> Very Low</li>
          </ul>
        </div>

        {/* Top Sale */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Top Sale State list</h3>
          {top.length === 0 && (
            <p className="text-sm text-gray-500">No data</p>
          )}
          {top.map((s, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{i + 1}. {s.state}</span>
              <span>{formatAmount(s.qty)}</span>
            </div>
          ))}
        </div>

        {/* Least Sale */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Least Sale State list</h3>
          {least.length === 0 && (
            <p className="text-sm text-gray-500">No data</p>
          )}
          {least.map((s, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{i + 1}. {s.state}</span>
              <span>{formatAmount(s.qty)}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SalesIndiaMap;
