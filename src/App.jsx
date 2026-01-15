import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Sidebar from './component/Sidebar.jsx'
import Overview from './component/Overview.jsx'
import SalesTeamPieChart from './component/Salesteampiechart.jsx'
import StockAnalytics from './component/Stockanalytics.jsx'
import Invoice from './component/Invoice.jsx'
import Quotation from './component/Quotation.jsx'
import Report from './component/Report.jsx'
import Ledger from './component/Ledger.jsx'
import Warehouse from './component/Warehouse.jsx'
import Proforma from './component/Proforma.jsx'
import Movement from './component/Movement.jsx'
import LowStock from './component/Lowstock.jsx'
import StockOverview from './component/Stockoverview.jsx'
import Variance from './component/Variance.jsx'
import BOM from './component/BOM.jsx'
import Jobwork from './component/Jobwork.jsx'
import Planning from './component/Planning.jsx'
import User from './component/User.jsx'
import Role from './component/Role.jsx'
import Leads from './component/Leads.jsx'
import Activitylogs from './component/Activitylogs.jsx'
import Security from './component/Security.jsx'
import Header from './component/Header.jsx'
import Deliverychalan from './component/Deliverychalan.jsx'
import Orderacknowledgement from './component/Orderacknowledgement.jsx'
import Packinglist from './component/Packinglist.jsx'
import Inwardpayment from './component/Inwardpayment.jsx'
import Outwardpayment from './component/Outwardpayment.jsx'
import Creditnote from './component/Creditnote.jsx'
import DebitNote from './component/Debitnote.jsx'
import Agentcommition from './component/Agentcommition.jsx'
import Journal from './component/Journal.jsx'
import TrialBalance from './component/Trialbalance.jsx'
import PaymentReminder from './component/Payemntreminder.jsx'
import ProfitLoss from './component/P&L.jsx'
import WarehouseDetails from './component/WarehouseDetails.jsx'
import PurchaseInvoicePage from './component/Purchaseinvoice.jsx'

function App() {
  return (
    <div className="flex h-screen w-screen bg-transparent overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto transition-colors duration-300 bg-cyan-50 text-black">
        <Header />
        <Routes>
          {/* Dashboard Routes */}
          <Route path="/" element={<Overview />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/sales-analytics" element={<SalesTeamPieChart />} />
          <Route path="/dashboard/stock-analytics" element={<StockAnalytics />} />
          
          {/* Billing Routes */}
          <Route path="/billing/invoices" element={<Invoice />} />
          <Route path='/billing/purchase-invoices' element={<PurchaseInvoicePage/>}/>
          <Route path="/billing/quotations" element={<Quotation />} />
          <Route path="/billing/ledgers" element={<Ledger />} />
          <Route path="/billing/reports" element={<Report />} />
          <Route path="/billing/proforma" element={<Proforma />} />
          <Route path="/billing/delivery-challan" element={<Deliverychalan />} />
          <Route path="/billing/order-acknowledgement" element={<Orderacknowledgement />} />
          <Route path="/billing/packing-list" element={<Packinglist />} />
          
          {/* Inventory Routes */}
          <Route path="/inventory/stock-view" element={<StockOverview />} />
          <Route path="/inventory/warehouses" element={<Warehouse />} />
          <Route path="/warehouse/:id" element={<WarehouseDetails />} />
          <Route path="/inventory/low-stock" element={<LowStock />} />
          <Route path="/inventory/movement" element={<Movement />} />
          
          {/* Production Routes */}
          <Route path="/production/bom" element={<BOM />} />
          <Route path="/production/job-work" element={<Jobwork />} />
          <Route path="/production/planning" element={<Planning />} />
          <Route path="/production/variance" element={<Variance />} />
          
          {/* Accounting Routes */}
          <Route path="/accounting/inward-payment" element={<Inwardpayment />} />
          <Route path="/accounting/outward-payment" element={<Outwardpayment />} />
          <Route path="/accounting/credit-note" element={<Creditnote />} />
          <Route path="/accounting/debit-note" element={<DebitNote />} />
          <Route path="/accounting/agent-commission" element={<Agentcommition />} />
          <Route path="/accounting/journal" element={<Journal />} />
          <Route path="/accounting/trial-balance" element={<TrialBalance />} />
          <Route path="/accounting/profit-loss" element={<ProfitLoss />} />
          <Route path="/accounting/payment-reminder" element={<PaymentReminder />} />
          
          {/* Users & CRM Routes */}
          <Route path="/users-crm/users" element={<User />} />
          <Route path="/users-crm/roles" element={<Role />} />
          <Route path="/users-crm/leads" element={<Leads />} />
          <Route path="/users-crm/activity-logs" element={<Activitylogs />} />
          <Route path="/users-crm/security" element={<Security />} />
        </Routes>
      </main>
    </div>
  )
}

export default App






// import React from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';

// import Sidebar from './component/Sidebar.jsx';
// import Header from './component/Header.jsx';
// import ProtectedRoute from './component/ProtectedRoute.jsx';
// import Authuser from './component/Authuser.jsx';

// import Overview from './component/Overview.jsx';
// import SalesTeamPieChart from './component/Salesteampiechart.jsx';
// import StockAnalytics from './component/Stockanalytics.jsx';
// import Invoice from './component/Invoice.jsx';
// import Quotation from './component/Quotation.jsx';
// import Report from './component/Report.jsx';
// import Ledger from './component/Ledger.jsx';
// import Warehouse from './component/Warehouse.jsx';
// import Proforma from './component/Proforma.jsx';
// import Movement from './component/Movement.jsx';
// import LowStock from './component/Lowstock.jsx';
// import StockOverview from './component/Stockoverview.jsx';
// import Variance from './component/Variance.jsx';
// import BOM from './component/BOM.jsx';
// import Jobwork from './component/Jobwork.jsx';
// import Planning from './component/Planning.jsx';
// import User from './component/User.jsx';
// import Role from './component/Role.jsx';
// import Leads from './component/Leads.jsx';
// import Activitylogs from './component/Activitylogs.jsx';
// import Security from './component/Security.jsx';
// import Deliverychalan from './component/Deliverychalan.jsx';
// import Orderacknowledgement from './component/Orderacknowledgement.jsx';
// import Packinglist from './component/Packinglist.jsx';
// import Inwardpayment from './component/Inwardpayment.jsx';
// import Outwardpayment from './component/Outwardpayment.jsx';
// import Creditnote from './component/Creditnote.jsx';
// import DebitNote from './component/Debitnote.jsx';
// import Agentcommition from './component/Agentcommition.jsx';
// import Journal from './component/Journal.jsx';
// import TrialBalance from './component/Trialbalance.jsx';
// import PaymentReminder from './component/Payemntreminder.jsx';
// import ProfitLoss from './component/P&L.jsx';
// import WarehouseDetails from './component/WarehouseDetails.jsx';
// import PurchaseInvoicePage from './component/Purchaseinvoice.jsx';

// function App() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === '/';

//   return (
//     <>
//       {/* LOGIN PAGE (NO SIDEBAR, NO HEADER) */}
//       {isLoginPage ? (
//         <Routes>
//           <Route path="/" element={<Authuser />} />
//         </Routes>
//       ) : (
//         /* PROTECTED APP LAYOUT */
//         <ProtectedRoute>
//           <div className="flex h-screen w-screen overflow-hidden bg-transparent">
//             <Sidebar />

//             <main className="flex-1 p-6 overflow-y-auto bg-cyan-50 text-black">
//               <Header />

//               <Routes>
//                 {/* Dashboard */}
//                 <Route path="/dashboard/overview" element={<Overview />} />
//                 <Route path="/dashboard/sales-analytics" element={<SalesTeamPieChart />} />
//                 <Route path="/dashboard/stock-analytics" element={<StockAnalytics />} />

//                 {/* Billing */}
//                 <Route path="/billing/invoices" element={<Invoice />} />
//                 <Route path="/billing/purchase-invoices" element={<PurchaseInvoicePage />} />
//                 <Route path="/billing/quotations" element={<Quotation />} />
//                 <Route path="/billing/ledgers" element={<Ledger />} />
//                 <Route path="/billing/reports" element={<Report />} />
//                 <Route path="/billing/proforma" element={<Proforma />} />
//                 <Route path="/billing/delivery-challan" element={<Deliverychalan />} />
//                 <Route path="/billing/order-acknowledgement" element={<Orderacknowledgement />} />
//                 <Route path="/billing/packing-list" element={<Packinglist />} />

//                 {/* Inventory */}
//                 <Route path="/inventory/stock-view" element={<StockOverview />} />
//                 <Route path="/inventory/warehouses" element={<Warehouse />} />
//                 <Route path="/warehouse/:id" element={<WarehouseDetails />} />
//                 <Route path="/inventory/low-stock" element={<LowStock />} />
//                 <Route path="/inventory/movement" element={<Movement />} />

//                 {/* Production */}
//                 <Route path="/production/bom" element={<BOM />} />
//                 <Route path="/production/job-work" element={<Jobwork />} />
//                 <Route path="/production/planning" element={<Planning />} />
//                 <Route path="/production/variance" element={<Variance />} />

//                 {/* Accounting */}
//                 <Route path="/accounting/inward-payment" element={<Inwardpayment />} />
//                 <Route path="/accounting/outward-payment" element={<Outwardpayment />} />
//                 <Route path="/accounting/credit-note" element={<Creditnote />} />
//                 <Route path="/accounting/debit-note" element={<DebitNote />} />
//                 <Route path="/accounting/agent-commission" element={<Agentcommition />} />
//                 <Route path="/accounting/journal" element={<Journal />} />
//                 <Route path="/accounting/trial-balance" element={<TrialBalance />} />
//                 <Route path="/accounting/profit-loss" element={<ProfitLoss />} />
//                 <Route path="/accounting/payment-reminder" element={<PaymentReminder />} />

//                 {/* Users & CRM */}
//                 <Route path="/users-crm/users" element={<User />} />
//                 <Route path="/users-crm/roles" element={<Role />} />
//                 <Route path="/users-crm/leads" element={<Leads />} />
//                 <Route path="/users-crm/activity-logs" element={<Activitylogs />} />
//                 <Route path="/users-crm/security" element={<Security />} />
//               </Routes>
//             </main>
//           </div>
//         </ProtectedRoute>
//       )}
//     </>
//   );
// }

// export default App;
