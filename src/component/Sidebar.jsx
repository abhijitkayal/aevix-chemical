// App.jsx (Pure JavaScript – NO TypeScript)
// React + Tailwind ERP Dashboard

import React, { useState } from "react";
import {
  LayoutDashboard,
  PieChart,
  Package,
  Factory,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Overview from "./Overview.jsx";
import SalesTeamPieChart from "./Salesteampiechart.jsx";
import StockAnalytics from "./Stockanalytics.jsx";
import Invoice from "./Invoice.jsx";
import Quotation from "./Quotation.jsx";
import Report from "./Report.jsx";
import Ledger from "./Ledger.jsx";
import Warehouse from "./Warehouse.jsx";
import Movement from "./Movement.jsx";
import LowStock from "./Lowstock.jsx";
import StockOverview from "./Stockoverview.jsx";
import Variance from "./Variance.jsx";
import BOM from "./BOM.jsx";
import Jobwork from "./Jobwork.jsx";
import Planning from "./Planning.jsx";
import User from "./User.jsx";
import Role from "./Role.jsx";
import Leads from "./Leads.jsx";
import Activitylogs from "./Activitylogs.jsx";
import Security from "./Security.jsx";
import Header from "./Header.jsx";

// Sidebar configuration (from ERP PDF modules)
const tabs = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    subtabs: ["Overview", "Sales Analytics", "Stock Analytics"],
  },
  {
    name: "Billing & Accounting",
    icon: PieChart,
    subtabs: ["Invoices", "Quotations", "Ledgers", "Reports"],
  },
  {
    name: "Inventory",
    icon: Package,
    subtabs: ["Stock View", "Warehouses", "Low Stock", "Movement"],
  },
  {
    name: "Production",
    icon: Factory,
    subtabs: ["BOM", "Job Work", "Planning", "Variance"],
  },
  {
    name: "Users & CRM",
    icon: Users,
    subtabs: ["Users", "Roles", "Leads", "Activity Logs","Security"],
  },
];

export default function App({ darkMode, setDarkMode }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen bg-transparent overflow-hidden">
      {/* Sidebar */}
      <aside className={`w-80 p-4 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'
      }`}>
        <h2 className="text-3xl font-bold mb-6 text-emerald-400">
          Aevix Chemical
        </h2>

        {tabs.map((tab, i) => (
          <div key={i} className="mb-4">
            <button
              onClick={() => {
                setActiveTab(i);
                setActiveSubTab(0);
              }}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded border font-bold transition-colors duration-300 ${
                activeTab === i
                  ? `bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 border-emerald-400 ${
                    darkMode ? 'text-white' : 'text-black'
                  }`
                  : darkMode 
                    ? "bg-gray-100 text-white border-gray-300 hover:bg-gray-200" 
                    : "bg-transparent border-slate-600 text-white hover:bg-slate-800"
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
             {activeTab === i ? (
  <ChevronUp className="ml-auto" size={16} />
) : (
  <ChevronDown className="ml-auto" size={16} />
)}

            </button>

            {/* Sub Tabs */}
            {activeTab === i && (
              <div className={`ml-8 mt-2 border-l space-y-1 text-sm border-l-2 ${
                darkMode ? 'border-gray-400' : 'border-black'
              }`}>
                {tab.subtabs.map((sub, j) => (
                  <button
                    key={j}
                    onClick={() => setActiveSubTab(j)}
                    className={`block w-full text-left px-2 py-1 ml-1 rounded border font-semibold transition-colors duration-300 ${
                      activeSubTab === j
                        ? `bg-gradient-to-r from-emerald-400 to-teal-400 border-emerald-300 ${
                          darkMode ? 'text-white' : 'text-white'
                        }`
                        : darkMode
                          ? "bg-gray-100 text-white border-gray-300 hover:bg-gray-200"
                          : "bg-transparent text-white border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* Main Content */}
     {/* Main Content Area */}
<main className={`flex-1 p-6 overflow-y-auto transition-colors duration-300 ${
  darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'
}`}>
  {/* <h2 className="text-2xl font-semibold mb-4 text-black">
    {tabs[activeTab].name} / {tabs[activeTab].subtabs[activeSubTab]}
  </h2> */}

  {/* DASHBOARD → OVERVIEW */}
  {tabs[activeTab].name === "Dashboard" &&
   tabs[activeTab].subtabs[activeSubTab] === "Overview" && (
    <>
     <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Overview darkMode={darkMode} />
    </>
  )}

  {/* DASHBOARD → SALES ANALYTICS */}
  {tabs[activeTab].name === "Dashboard" &&
   tabs[activeTab].subtabs[activeSubTab] === "Sales Analytics" && (
    // <SalesTeamPieChart />
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <SalesTeamPieChart darkMode={darkMode} />
    </>
  )}

  {/* DASHBOARD → STOCK ANALYTICS */}
  {tabs[activeTab].name === "Dashboard" &&
   tabs[activeTab].subtabs[activeSubTab] === "Stock Analytics" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <StockAnalytics darkMode={darkMode} />
    
    </>
  )}

  {/* BILLING & ACCOUNTING → INVOICES */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Invoices" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Invoice darkMode={darkMode} />
    </>
    
  )}

  {/* BILLING & ACCOUNTING → QUOTATIONS */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Quotations" && (
    <>
    
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Quotation darkMode={darkMode} />
    </>
    
  )}

  {/* BILLING & ACCOUNTING → LEDGERS */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Ledgers" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Ledger darkMode={darkMode} />
    </>
    
  )}

  {/* BILLING & ACCOUNTING → REPORTS */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Reports" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Report darkMode={darkMode} />
    </>
    // <Report />
  )}

  {/* INVENTORY → STOCK VIEW */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Stock View" && (
    // <StockOverview />
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <StockOverview darkMode={darkMode} />
    </>
  )}

  {/* inventory */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Warehouses" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Warehouse darkMode={darkMode} />
    </>
  )}

  {/* INVENTORY → LOW STOCK */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Low Stock" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <LowStock darkMode={darkMode} />
    </>
    // <LowStock/>
  )}
  {/* INVENTORY → MOVEMENT */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Movement" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Movement darkMode={darkMode} />
    </>
    // <Movement />
  )}

  {/* PRODUCTION → VARIANCE */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "Variance" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Variance darkMode={darkMode} />
    </>
    
  )}

  {/* PRODUCTION → BOM */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "BOM" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <BOM darkMode={darkMode} />
    </>
    // <BOM />
  )}

  {/* PRODUCTION → JOB WORK */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "Job Work" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Jobwork darkMode={darkMode} />
    </>
  )}

  {/* PRODUCTION → PLANNING */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "Planning" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Planning darkMode={darkMode} />
    </>
    // <Planning />
  )}

  {/* USERS & CRM → USERS */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Users" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <User darkMode={darkMode} />
    </>
    // <User />
  )}

  {/* USERS & CRM → ROLES */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Roles" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Role darkMode={darkMode} />
    </>
    // <Role />
  )}

    {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Leads" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Leads darkMode={darkMode} />
    </>
    // <Leads />
  )}

  {/* USERS & CRM → ACTIVITY LOGS */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Activity Logs" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Activitylogs darkMode={darkMode} />
    </>
    // <Activitylogs />
  )}

  {/* USERS & CRM → SECURITY */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Security" && (
    <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    <Security darkMode={darkMode} />
    </>
    
  )}
  
  {/* DEFAULT CONTENT */}
  
</main>

    </div>
  );
}
