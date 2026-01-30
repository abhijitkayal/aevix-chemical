// // Sidebar.jsx - Navigation component with React Router DOM

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   LayoutDashboard,
//   PieChart,
//   Package,
//   Factory,
//   Users,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// // Sidebar configuration with routes
// const baseTabs = [
//   {
//     name: "Dashboard",
//     icon: LayoutDashboard,
//     subtabs: [
//       { name: "Overview", path: "/dashboard/overview" },
//       { name: "Sales Analytics", path: "/dashboard/sales-analytics" },
//       { name: "Stock Analytics", path: "/dashboard/stock-analytics" },
//     ],
//   },
//   {
//     name: "Billing",
//     icon: PieChart,
//     subtabs: [
//       { name: "Invoices", path: "/billing/invoices" },
//       { name: "Purchases Invoice", path: "/billing/purchase-invoices" },
//       { name: "Quotations", path: "/billing/quotations" },
//       { name: "Ledgers", path: "/billing/ledgers" },
//       { name: "Selling Product", path: "/billing/reports" },
//       { name: "Proforma", path: "/billing/proforma" },
//       { name: "Delivery Challan", path: "/billing/delivery-challan" },
//       { name: "Order Acknowledgement", path: "/billing/order-acknowledgement" },
//       { name: "Packing List", path: "/billing/packing-list" },
//     ],
//   },
//   {
//     name: "Inventory",
//     icon: Package,
//     subtabs: [
//       { name: "Stock View", path: "/inventory/stock-view" },
//       { name: "Warehouses", path: "/inventory/warehouses" },
//       { name: "Low Stock", path: "/inventory/low-stock" },
//       { name: "Movement", path: "/inventory/movement" },
//     ],
//   },
//   {
//     name: "Production",
//     icon: Factory,
//     subtabs: [
//       { name: "BOM", path: "/production/bom" },
//       { name: "Job Work", path: "/production/job-work" },
//       { name: "Planning", path: "/production/planning" },
//       { name: "Product Formulation", path: "/accounting/batch" },
//     ],
//   },
//   {
//     name: "Accounting",
//     icon: Factory,
//     subtabs: [
//       { name: "Inward Payment", path: "/accounting/inward-payment" },
//       { name: "Outward Payment", path: "/accounting/outward-payment" },
//       { name: "Credit Note", path: "/accounting/credit-note" },
//       { name: "Debit Note", path: "/accounting/debit-note" },
//       {
//         name: "Agent Commission Calculation",
//         path: "/accounting/agent-commission",
//       },
//       { name: "Journal", path: "/accounting/journal" },
//       { name: "Trial Balance", path: "/accounting/trial-balance" },
//       { name: "P&L", path: "/accounting/profit-loss" },
//       { name: "Payment Reminder", path: "/accounting/payment-reminder" },
//     ],
//   },
//   {
//     name: "Users & CRM",
//     icon: Users,
//     subtabs: [
//       { name: "Users", path: "/users-crm/users" },
//       { name: "Roles", path: "/users-crm/roles" },
//       { name: "Leads", path: "/users-crm/leads" },
//       { name: "Activity Logs", path: "/users-crm/activity-logs" },
//       { name: "Security", path: "/users-crm/security" },
//     ],
//   },
// ];

// // Filter tabs based on the logged-in user's role
// function computeVisibleTabs(role) {
//   if (!role) return baseTabs;

//   const lower = String(role).toLowerCase();
//   const isAdmin = lower.includes("admin");
//   const isManager = lower.includes("accountant");

//   if (isAdmin) return baseTabs;

//   if (isManager) {
//     // Managers see only Dashboard and Billing (restricted to Invoices & Proforma)
//     return baseTabs
//       .filter((tab) => ["Dashboard", "Billing"].includes(tab.name))
//       .map((tab) => {
//         if (tab.name === "Billing") {
//           return {
//             ...tab,
//             subtabs: tab.subtabs.filter((s) =>
//               [
//                 "Invoices",
//                 "Quotations",
//                 "Proforma",
//                 "Order Acknowledgement",
//                 "Delivery Challan",
//               ].includes(s.name),
//             ),
//           };
//         }
//         return tab;
//       });
//   }

//   // Default: return all tabs
//   return baseTabs;
// }

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openTabs, setOpenTabs] = useState([0]); // Start with Dashboard open
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Track role reactively (updates on login/logout) and compute visible tabs
//   const [role, setRole] = useState("");
//   useEffect(() => {
//     // Helper to fetch role from server using saved login email
//     const fetchRoleFromServer = async (email) => {
//       if (!email) return;
//       try {
//         const res = await axios.get(`/api/profile/${email}`);
//         console.log("Sidebar: fetched profile response", res.data);
//         setRole(res.data.role || "");

//         // console.log("log",res.data);
//       } catch (err) {
//         console.log(
//           "Sidebar: failed to fetch profile, falling back to local user",
//           err?.message || err,
//         );
//         // Fallback: try reading local user object if server fails
//         try {
//           const u = JSON.parse(localStorage.getItem("user") || "null");
//           console.log("Sidebar: fallback user object", u);
//           setRole(u?.role || "");
//         } catch (e) {
//           setRole("");
//         }
//       }
//     };

//     const readAndFetch = () => {
//       const email = localStorage.getItem("loginEmail");
//       if (email) fetchRoleFromServer(email);
//       else {
//         // Fallback to user object
//         try {
//           const u = JSON.parse(localStorage.getItem("user") || "null");
//           setRole(u?.role || "");
//         } catch (e) {
//           setRole("");
//         }
//       }
//     };

//     readAndFetch();

//     // Listen for changes via localStorage events
//     const onStorage = (e) => {
//       if (e.key === "loginEmail" || e.key === "user") readAndFetch();
//     };

//     // Listen for explicit login/logout events dispatched by Login/Header
//     const onUserLogin = (e) => {
//       const u = e?.detail;
//       console.log("Sidebar: user:login event received", u);
//       if (u?.role) {
//         console.log("Sidebar: using role from login event:", u.role);
//         setRole(u.role);
//         console.log(role);
//       } else if (u?.email) {
//         console.log(
//           "Sidebar: no role in login event, fetching role for",
//           u.email,
//         );
//         fetchRoleFromServer(u.email);
//       }
//     };
//     const onUserLogout = () => {
//       console.log("Sidebar: user:logout event received");
//       setRole("");
//     };

//     window.addEventListener("storage", onStorage);
//     window.addEventListener("user:login", onUserLogin);
//     window.addEventListener("user:logout", onUserLogout);

//     return () => {
//       window.removeEventListener("storage", onStorage);
//       window.removeEventListener("user:login", onUserLogin);
//       window.removeEventListener("user:logout", onUserLogout);
//     };
//   }, []);
//   const role1 = user?.role;

//   console.log("User role:", role1);
//   const tabs = computeVisibleTabs(role1);

//   // Log role changes for debugging
//   useEffect(() => {
//     console.log("Sidebar: role state changed ->", role);
//   }, [role]);

//   const toggleTab = (index) => {
//     setOpenTabs((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
//     );
//   };

//   const handleSubTabClick = (path) => {
//     navigate(path);
//   };

//   return (
//     <aside className="w-70 h-screen bg-slate-900 text-white p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
//       <h2 className="text-3xl font-bold mb-6 text-emerald-400">
//         Aevix Chemical
//       </h2>

//       {tabs.map((tab, i) => {
//         const isOpen = openTabs.includes(i);

//         return (
//           <div key={i} className="mb-3">
//             {/* MAIN TAB */}
//             <button
//               onClick={() => toggleTab(i)}
//               className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg font-bold transition-all duration-300
//                   ${
//                     isOpen
//                       ? "bg-gradient-to-r from-gray-600 to-gray-600 text-white shadow-md"
//                       : "bg-slate-800 text-white hover:bg-slate-700"
//                   }
//                 `}
//             >
//               <tab.icon size={18} />
//               <span className="flex-1 text-left">{tab.name}</span>

//               {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//             </button>

//             {/* SUB TABS */}
//             {isOpen && (
//               <div className="ml-6 mt-2 border-l-2 border-slate-300 pl-2 space-y-1">
//                 {tab.subtabs.map((sub, j) => (
//                   <button
//                     key={j}
//                     onClick={() => handleSubTabClick(sub.path)}
//                     className={`block w-full text-left px-3 py-1 rounded-md text-sm font-semibold transition-all duration-200
//                         ${
//                           location.pathname === sub.path
//                             ? "bg-gradient-to-r from-gray-600 to-gray-600 text-white shadow-md"
//                             : "bg-slate-800 text-white hover:bg-slate-700"
//                         }
//                       `}
//                   >
//                     {sub.name}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </aside>
//   );
// }

// Sidebar.jsx - Responsive Navigation component with React Router DOM

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard,
  PieChart,
  Package,
  Factory,
  Users,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";

// Sidebar configuration with routes
const baseTabs = [
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
      { name: "Selling Product", path: "/billing/reports" },
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
      { name: "Product Formulation", path: "/accounting/batch" },
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
      {
        name: "Agent Commission Calculation",
        path: "/accounting/agent-commission",
      },
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

// Role-based tab filtering
function computeVisibleTabs(role) {
  if (!role) return baseTabs;

  const lower = role.toLowerCase();
  const isAdmin = lower.includes("admin");
  const isAccountant = lower.includes("accountant");

  if (isAdmin) return baseTabs;

  if (isAccountant) {
    return baseTabs
      .filter((tab) => ["Dashboard", "Billing"].includes(tab.name))
      .map((tab) =>
        tab.name === "Billing"
          ? {
              ...tab,
              subtabs: tab.subtabs.filter((s) =>
                [
                  "Invoices",
                  "Quotations",
                  "Proforma",
                  "Order Acknowledgement",
                  "Delivery Challan",
                ].includes(s.name),
              ),
            }
          : tab,
      );
  }

  return baseTabs;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openTabs, setOpenTabs] = useState([0]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [role, setRole] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const role1 = user?.role;

  // Fetch role
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const email = localStorage.getItem("loginEmail");
        if (!email) return;
        const res = await axios.get(`/api/profile/${email}`);
        setRole(res.data.role || "");
      } catch {
        setRole(role1 || "");
      }
    };

    fetchRole();
  }, []);

  const tabs = computeVisibleTabs(role1 || role);

  const toggleTab = (index) => {
    setOpenTabs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleSubTabClick = (path) => {
    navigate(path);
    setIsMobileOpen(false); // close on mobile
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-md"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu size={18} />
      </button>

      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-80 lg:w-70 h-screen
          bg-slate-900 text-white p-4
          overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800
          transform transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* MOBILE CLOSE */}
        <button
          className="lg:hidden absolute top-4 right-4 text-white"
          onClick={() => setIsMobileOpen(false)}
        >
          <X size={18} />
        </button>

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
                      ? "bg-linear-to-r from-gray-600 to-gray-600"
                      : "bg-slate-800 hover:bg-slate-700"
                  }
                `}
              >
                <tab.icon size={18} />
                <span className="flex-1 text-left">{tab.name}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* SUBTABS */}
              {isOpen && (
                <div className="ml-6 mt-2 border-l-2 border-slate-300 pl-2 space-y-1">
                  {tab.subtabs.map((sub, j) => (
                    <button
                      key={j}
                      onClick={() => handleSubTabClick(sub.path)}
                      className={`block w-full text-left px-3 py-1 rounded-md text-sm font-semibold transition-all
                        ${
                          location.pathname === sub.path
                            ? "bg-linear-to-r from-gray-600 to-gray-600"
                            : "bg-slate-800 hover:bg-slate-700"
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
    </>
  );
}
