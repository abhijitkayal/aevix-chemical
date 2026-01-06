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

export default function App() {
const [openTabs, setOpenTabs] = useState([]); // 👈 controls accordion
const [activeTab, setActiveTab] = useState(0);
const [activeSubTab, setActiveSubTab] = useState(0);
const toggleTab = (index) => {
  setOpenTabs((prev) =>
    prev.includes(index)
      ? prev.filter((i) => i !== index) // close tab
      : [...prev, index] // open tab
  );
};



  return (
    <div className="flex h-screen w-screen bg-transparent overflow-hidden">
      {/* Sidebar */}
      {/* Sidebar */}
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
          onClick={() => {
            toggleTab(i);          // ✅ multiple open
            setActiveTab(i);
            setActiveSubTab(0);
          }}
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
                onClick={() => {
                  setActiveTab(i);
                  setActiveSubTab(j);
                }}
                className={`block w-full text-left px-3 py-1 rounded-md text-sm font-semibold transition-all duration-200
                  ${
                    activeTab === i && activeSubTab === j
                      ? "bg-gradient-to-r from-gray-600 to-gray-600 text-white shadow-md"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }
                `}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  })}
</aside>




      {/* Main Content */}
     {/* Main Content Area */}
<main className={`flex-1 p-6 overflow-y-auto transition-colors duration-300 ${
 'bg-cyan-50 text-black'
}`}>
  {/* <h2 className="text-2xl font-semibold mb-4 text-black">
    {tabs[activeTab].name} / {tabs[activeTab].subtabs[activeSubTab]}
  </h2> */}

  {/* DASHBOARD → OVERVIEW */}
  {tabs[activeTab].name === "Dashboard" &&
   tabs[activeTab].subtabs[activeSubTab] === "Overview" && (
    <>
     <Header />
    <Overview />
    </>
  )}

  {/* DASHBOARD → SALES ANALYTICS */}
  {tabs[activeTab].name === "Dashboard" &&
   tabs[activeTab].subtabs[activeSubTab] === "Sales Analytics" && (
    // <SalesTeamPieChart />
    <>
    <Header />
    <SalesTeamPieChart  />
    </>
  )}

  {/* DASHBOARD → STOCK ANALYTICS */}
  {tabs[activeTab].name === "Dashboard" &&
   tabs[activeTab].subtabs[activeSubTab] === "Stock Analytics" && (
    <>
    <Header />
    <StockAnalytics  />
    
    </>
  )}

  {/* BILLING & ACCOUNTING → INVOICES */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Invoices" && (
    <>
    <Header />
    <Invoice  />
    </>
    
  )}

  {/* BILLING & ACCOUNTING → QUOTATIONS */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Quotations" && (
    <>
    
    <Header />
    <Quotation  />
    </>
    
  )}

  {/* BILLING & ACCOUNTING → LEDGERS */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Ledgers" && (
    <>
    <Header />
    <Ledger  />
    </>
    
  )}

  {/* BILLING & ACCOUNTING → REPORTS */}
  {tabs[activeTab].name === "Billing & Accounting" &&
   tabs[activeTab].subtabs[activeSubTab] === "Reports" && (
    <>
    <Header />
    <Report  />
    </>
    // <Report />
  )}

  {/* INVENTORY → STOCK VIEW */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Stock View" && (
    // <StockOverview />
    <>
    <Header />
    <StockOverview  />
    </>
  )}

  {/* inventory */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Warehouses" && (
    <>
    <Header />
    <Warehouse  />
    </>
  )}

  {/* INVENTORY → LOW STOCK */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Low Stock" && (
    <>
    <Header />
    <LowStock  />
    </>
    // <LowStock/>
  )}
  {/* INVENTORY → MOVEMENT */}
  {tabs[activeTab].name === "Inventory" &&
   tabs[activeTab].subtabs[activeSubTab] === "Movement" && (
    <>
    <Header />
    <Movement  />
    </>
    // <Movement />
  )}

  {/* PRODUCTION → VARIANCE */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "Variance" && (
    <>
    <Header />
    <Variance  />
    </>
    
  )}

  {/* PRODUCTION → BOM */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "BOM" && (
    <>
    <Header />
    <BOM  />
    </>
    // <BOM />
  )}

  {/* PRODUCTION → JOB WORK */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "Job Work" && (
    <>
    <Header />
    <Jobwork  />
    </>
  )}

  {/* PRODUCTION → PLANNING */}
  {tabs[activeTab].name === "Production" &&
   tabs[activeTab].subtabs[activeSubTab] === "Planning" && (
    <>
    <Header />
    <Planning  />
    </>
    // <Planning />
  )}

  {/* USERS & CRM → USERS */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Users" && (
    <>
    <Header />
    <User  />
    </>
    // <User />
  )}

  {/* USERS & CRM → ROLES */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Roles" && (
    <>
    <Header />
    <Role  />
    </>
    // <Role />
  )}

    {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Leads" && (
    <>
    <Header />
    <Leads  />
    </>
    // <Leads />
  )}

  {/* USERS & CRM → ACTIVITY LOGS */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Activity Logs" && (
    <>
    <Header />
    <Activitylogs  />
    </>
    // <Activitylogs />
  )}

  {/* USERS & CRM → SECURITY */}
  {tabs[activeTab].name === "Users & CRM" &&
   tabs[activeTab].subtabs[activeSubTab] === "Security" && (
    <>
    <Header />
    <Security  />
    </>
    
  )}
  
  {/* DEFAULT CONTENT */}
  
</main>

    </div>
  );
}

// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   PieChart,
//   Package,
//   Factory,
//   Users,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// // Sidebar config
// const tabs = [
//   {
//     name: "Dashboard",
//     icon: LayoutDashboard,
//     subtabs: ["Overview", "Sales Analytics", "Stock Analytics"],
//   },
//   {
//     name: "Billing & Accounting",
//     icon: PieChart,
//     subtabs: ["Invoices", "Quotations", "Ledgers", "Reports"],
//   },
//   {
//     name: "Inventory",
//     icon: Package,
//     subtabs: ["Stock View", "Warehouses", "Low Stock", "Movement"],
//   },
//   {
//     name: "Production",
//     icon: Factory,
//     subtabs: ["BOM", "Job Work", "Planning", "Variance"],
//   },
//   {
//     name: "Users & CRM",
//     icon: Users,
//     subtabs: ["Users", "Roles", "Leads", "Activity Logs", "Security"],
//   },
// ];

// export default function Sidebar({
//   activeTab,
//   setActiveTab,
//   activeSubTab,
//   setActiveSubTab,
// }) {
//   const [openTab, setOpenTab] = useState(activeTab);

//   return (
//     <aside className="w-72 bg-slate-900 text-white h-screen p-4 overflow-y-auto">
//       {/* Logo */}
//       <h2 className="text-3xl font-bold mb-8 text-emerald-400">
//         Aevix Chemical
//       </h2>

//       {/* Tabs */}
//       {tabs.map((tab, i) => (
//         <div key={i} className="mb-3">
//           {/* Main Tab */}
//           <button
//             onClick={() => {
//               setActiveTab(i);
//               setActiveSubTab(0);
//               setOpenTab(openTab === i ? null : i);
//             }}
//             className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg font-semibold transition-all duration-300
//               ${
//                 activeTab === i
//                   ? "bg-gradient-to-r from-slate-500 to-slate-500 text-black shadow-md"
//                   : "bg-slate-800 text-white hover:bg-slate-700"
//               }
//             `}
//           >
//             <tab.icon size={18} />
//             <span className="flex-1 text-left">{tab.name}</span>

//             {openTab === i ? (
//               <ChevronUp size={16} />
//             ) : (
//               <ChevronDown size={16} />
//             )}
//           </button>

//           {/* Sub Tabs */}
//           {openTab === i && (
//             <div className="ml-6 mt-2 space-y-1 border-l-2 border-slate-700 pl-3">
//               {tab.subtabs.map((sub, j) => (
//                 <button
//                   key={j}
//                   onClick={() => {
//                     setActiveTab(i);
//                     setActiveSubTab(j);
//                   }}
//                   className={`block w-full text-left px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
//                     ${
//                       activeSubTab === j && activeTab === i
//                         ? "bg-emerald-400 text-black"
//                         : "text-slate-300 hover:bg-slate-700"
//                     }
//                   `}
//                 >
//                   {sub}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </aside>
//   );
// }
