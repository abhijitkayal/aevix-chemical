// App.jsx (Pure JavaScript – NO TypeScript)
// React + Tailwind ERP Dashboard

import React, { useState } from "react";
import {
  LayoutDashboard,
  PieChart,
  Package,
  Factory,
  Users,
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

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);

  return (
    <div className="flex h-screen w-screen bg-transparent overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-900 text-white p-4">
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
              className={`flex items-center gap-3 w-full px-3 py-2 rounded border font-bold ${
                activeTab === i
                  ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 border-emerald-400 text-black"
                  : "bg-transparent border-slate-600 text-cyan-200 hover:bg-slate-800"
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>

            {/* Sub Tabs */}
            {activeTab === i && (
              <div className="ml-8 mt-2 space-y-1 text-sm">
                {tab.subtabs.map((sub, j) => (
                  <button
                    key={j}
                    onClick={() => setActiveSubTab(j)}
                    className={`block w-full text-left px-2 py-1 rounded border font-semibold ${
                      activeSubTab === j
                        ? "bg-gradient-to-r from-emerald-400 to-teal-400 border-emerald-300 text-black"
                        : "bg-transparent text-cyan-200 border-slate-700 hover:bg-slate-800"
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
<main className="flex-1 p-6 overflow-y-auto bg-transparent">
  {/* <h2 className="text-2xl font-semibold mb-4 text-black">
    {tabs[activeTab].name} / {tabs[activeTab].subtabs[activeSubTab]}
  </h2> */}

  {/* DASHBOARD → OVERVIEW */}
  {tabs[activeTab].name === "Dashboard" &&
   tabs[activeTab].subtabs[activeSubTab] === "Overview" && (
    <>
     <Header/>
    <Overview />
    </>
  )}

  {/* DASHBOARD → SALES ANALYTICS */}
  {tabs[activeTab].name === "Dashboard" &&
   tabs[activeTab].subtabs[activeSubTab] === "Sales Analytics" && (
    // <SalesTeamPieChart />
    <>
    <Header/>
    <SalesTeamPieChart/>
    </>
  )}

  {/* DASHBOARD → STOCK ANALYTICS */}
  {tabs[activeTab].name === "Dashboard" &&
   tabs[activeTab].subtabs[activeSubTab] === "Stock Analytics" && (
    <>
    <Header/>
    <StockAnalytics />
    
    </>
  )}

  {/* BILLING & ACCOUNTING → INVOICES */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Invoices" && (
    <>
    <Header/>
    <Invoice />
    </>
    
  )}

  {/* BILLING & ACCOUNTING → QUOTATIONS */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Quotations" && (
    <>
    
    <Header/>
    <Quotation />
    </>
    
  )}

  {/* BILLING & ACCOUNTING → LEDGERS */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Ledgers" && (
    <>
    <Header/>
    <Ledger />
    </>
    
  )}

  {/* BILLING & ACCOUNTING → REPORTS */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Reports" && (
    <>
    <Header/>
    <Report/>
    </>
    // <Report />
  )}

  {/* INVENTORY → STOCK VIEW */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Stock View" && (
    // <StockOverview />
    <>
    <Header/>
    <StockOverview/>
    </>
  )}

  {/* inventory */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Warehouses" && (
    <>
    <Header/>
    <Warehouse />
    </>
  )}

  {/* INVENTORY → LOW STOCK */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Low Stock" && (
    <>
    <Header/>
    <LowStock/>
    </>
    // <LowStock/>
  )}
  {/* INVENTORY → MOVEMENT */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Movement" && (
    <>
    <Header/>
    <Movement/>
    </>
    // <Movement />
  )}

  {/* PRODUCTION → VARIANCE */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "Variance" && (
    <>
    <Header/>
    <Variance />
    </>
    
  )}

  {/* PRODUCTION → BOM */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "BOM" && (
    <>
    <Header/>
    <BOM/>
    </>
    // <BOM />
  )}

  {/* PRODUCTION → JOB WORK */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "Job Work" && (
    <>
    <Header/>
    <Jobwork />
    </>
  )}

  {/* PRODUCTION → PLANNING */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "Planning" && (
    <>
    <Header/>
    <Planning/>
    </>
    // <Planning />
  )}

  {/* USERS & CRM → USERS */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Users" && (
    <>
    <Header/>
    <User/>
    </>
    // <User />
  )}

  {/* USERS & CRM → ROLES */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Roles" && (
    <>
    <Header/>
    <Role/>
    </>
    // <Role />
  )}

    {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Leads" && (
    <>
    <Header/>
    <Leads/>
    </>
    // <Leads />
  )}

  {/* USERS & CRM → ACTIVITY LOGS */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Activity Logs" && (
    <>
    <Header/>
    <Activitylogs/>
    </>
    // <Activitylogs />
  )}

  {/* USERS & CRM → SECURITY */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Security" && (
    <>
    <Header/>
    <Security />
    </>
    
  )}
  
  {/* DEFAULT CONTENT */}
  
</main>

    </div>
  );
}
