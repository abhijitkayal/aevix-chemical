// Sidebar.jsx - Navigation component with React Router DOM

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  Package,
  Factory,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Sidebar configuration with routes
const tabs = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    subtabs: [
      { name: "Overview", path: "/dashboard/overview" },
      { name: "Sales Analytics", path: "/dashboard/sales-analytics" },
      { name: "Stock Analytics", path: "/dashboard/stock-analytics" },
    ],
  },
  {
    name: "Billing",
    icon: PieChart,
    subtabs: [
      { name: "Invoices", path: "/billing/invoices" },
      { name: "Purchases Invoice", path: "/billing/purchase-invoices" },
      { name: "Quotations", path: "/billing/quotations" },
      { name: "Ledgers", path: "/billing/ledgers" },
      { name: "Reports", path: "/billing/reports" },
      { name: "Proforma", path: "/billing/proforma" },
      { name: "Delivery Challan", path: "/billing/delivery-challan" },
      { name: "Order Acknowledgement", path: "/billing/order-acknowledgement" },
      { name: "Packing List", path: "/billing/packing-list" },
    ],
  },
  {
    name: "Inventory",
    icon: Package,
    subtabs: [
      { name: "Stock View", path: "/inventory/stock-view" },
      { name: "Warehouses", path: "/inventory/warehouses" },
      { name: "Low Stock", path: "/inventory/low-stock" },
      { name: "Movement", path: "/inventory/movement" },
    ],
  },
  {
    name: "Production",
    icon: Factory,
    subtabs: [
      { name: "BOM", path: "/production/bom" },
      { name: "Job Work", path: "/production/job-work" },
      { name: "Planning", path: "/production/planning" },
      { name: "Variance", path: "/production/variance" },
    ],
  },
  {
    name: "Accounting",
    icon: Factory,
    subtabs: [
      { name: "Inward Payment", path: "/accounting/inward-payment" },
      { name: "Outward Payment", path: "/accounting/outward-payment" },
      { name: "Credit Note", path: "/accounting/credit-note" },
      { name: "Debit Note", path: "/accounting/debit-note" },
      { name: "Agent Commission Calculation", path: "/accounting/agent-commission" },
      { name: "Journal", path: "/accounting/journal" },
      { name: "Trial Balance", path: "/accounting/trial-balance" },
      { name: "P&L", path: "/accounting/profit-loss" },
      { name: "Payment Reminder", path: "/accounting/payment-reminder" },
    ],
  },
  {
    name: "Users & CRM",
    icon: Users,
    subtabs: [
      { name: "Users", path: "/users-crm/users" },
      { name: "Roles", path: "/users-crm/roles" },
      { name: "Leads", path: "/users-crm/leads" },
      { name: "Activity Logs", path: "/users-crm/activity-logs" },
      { name: "Security", path: "/users-crm/security" },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openTabs, setOpenTabs] = useState([0]); // Start with Dashboard open

  const toggleTab = (index) => {
    setOpenTabs((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleSubTabClick = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-70 h-screen bg-slate-900 text-white p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
      <h2 className="text-3xl font-bold mb-6 text-emerald-400">
        Aevix Chemical
      </h2>

      {tabs.map((tab, i) => {
        const isOpen = openTabs.includes(i);

        return (
          <div key={i} className="mb-3">
            {/* MAIN TAB */}
            <button
              onClick={() => toggleTab(i)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg font-bold transition-all duration-300
                ${
                  isOpen
                    ? "bg-gradient-to-r from-gray-600 to-gray-600 text-white shadow-md"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                }
              `}
            >
              <tab.icon size={18} />
              <span className="flex-1 text-left">{tab.name}</span>

              {isOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {/* SUB TABS */}
            {isOpen && (
              <div className="ml-6 mt-2 border-l-2 border-slate-300 pl-2 space-y-1">
                {tab.subtabs.map((sub, j) => (
                  <button
                    key={j}
                    onClick={() => handleSubTabClick(sub.path)}
                    className={`block w-full text-left px-3 py-1 rounded-md text-sm font-semibold transition-all duration-200
                      ${
                        location.pathname === sub.path
                          ? "bg-gradient-to-r from-gray-600 to-gray-600 text-white shadow-md"
                          : "bg-slate-800 text-white hover:bg-slate-700"
                      }
                    `}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>

  );
}

