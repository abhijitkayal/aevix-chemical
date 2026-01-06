import React, { useState } from "react";
import { Bell, Mail, Phone, AlertTriangle } from "lucide-react";

const PaymentReminder = () => {
  const [reminders] = useState([
    {
      id: 1,
      customerName: "ChemTrade Solutions",
      customerId: "CUST-1001",
      invoiceNo: "INV-2026-0158",
      invoiceDate: "2026-01-05",
      dueDate: "2026-02-04",
      invoiceAmount: 336300,
      paidAmount: 0,
      outstandingAmount: 336300,
      daysOverdue: 12,
      reminderLevel: "1st Reminder",
      reminderMethod: ["Email"],
      lastReminderDate: "2026-02-16",
      nextReminderDate: "2026-02-20",
      contactPerson: "Ramesh Gupta",
      contactEmail: "accounts@chemtrade.com",
      contactPhone: "+91 98765 43210",
      status: "Pending",
      remarks: "Customer acknowledged invoice, payment promised by month end",
    },
    {
      id: 2,
      customerName: "Industrial Polymers Ltd",
      customerId: "CUST-1002",
      invoiceNo: "INV-2026-0157",
      invoiceDate: "2026-01-04",
      dueDate: "2026-02-03",
      invoiceAmount: 205320,
      paidAmount: 100000,
      outstandingAmount: 105320,
      daysOverdue: 15,
      reminderLevel: "2nd Reminder",
      reminderMethod: ["Email", "Call"],
      lastReminderDate: "2026-02-14",
      nextReminderDate: "2026-02-18",
      contactPerson: "Vijay Mehta",
      contactEmail: "finance@indpolymers.com",
      contactPhone: "+91 98111 22334",
      status: "Partially Paid",
      remarks: "Balance amount pending approval from finance head",
    },
    {
      id: 3,
      customerName: "PharmaChem Industries",
      customerId: "CUST-1003",
      invoiceNo: "INV-2026-0156",
      invoiceDate: "2026-01-03",
      dueDate: "2026-02-02",
      invoiceAmount: 205320,
      paidAmount: 0,
      outstandingAmount: 205320,
      daysOverdue: 18,
      reminderLevel: "Final Reminder",
      reminderMethod: ["Email", "Call", "WhatsApp"],
      lastReminderDate: "2026-02-15",
      nextReminderDate: "2026-02-17",
      contactPerson: "Amit Verma",
      contactEmail: "accounts@pharmachem.com",
      contactPhone: "+91 99988 77665",
      status: "Overdue",
      remarks: "Escalated to management, legal notice under review",
    },
    {
      id: 4,
      customerName: "TechChem Solutions",
      customerId: "CUST-1004",
      invoiceNo: "INV-2026-0155",
      invoiceDate: "2026-01-02",
      dueDate: "2026-02-01",
      invoiceAmount: 177000,
      paidAmount: 177000,
      outstandingAmount: 0,
      daysOverdue: 0,
      reminderLevel: "—",
      reminderMethod: [],
      lastReminderDate: null,
      nextReminderDate: null,
      contactPerson: "Nikhil Jain",
      contactEmail: "accounts@techchem.com",
      contactPhone: "+91 91234 56789",
      status: "Paid",
      remarks: "Payment received on time",
    },
    {
      id: 5,
      customerName: "BioTech Research Ltd",
      customerId: "CUST-1005",
      invoiceNo: "INV-2026-0154",
      invoiceDate: "2026-01-01",
      dueDate: "2026-01-31",
      invoiceAmount: 162840,
      paidAmount: 0,
      outstandingAmount: 162840,
      daysOverdue: 22,
      reminderLevel: "2nd Reminder",
      reminderMethod: ["Email"],
      lastReminderDate: "2026-02-12",
      nextReminderDate: "2026-02-19",
      contactPerson: "Sneha Iyer",
      contactEmail: "payments@biotechresearch.com",
      contactPhone: "+91 97654 32109",
      status: "Overdue",
      remarks: "Invoice under internal verification",
    },
    {
      id: 6,
      customerName: "Green Chemicals Ltd",
      customerId: "CUST-1008",
      invoiceNo: "INV-2025-0151",
      invoiceDate: "2025-12-24",
      dueDate: "2026-01-23",
      invoiceAmount: 136408,
      paidAmount: 0,
      outstandingAmount: 136408,
      daysOverdue: 30,
      reminderLevel: "Final Reminder",
      reminderMethod: ["Email", "Call"],
      lastReminderDate: "2026-02-10",
      nextReminderDate: "2026-02-16",
      contactPerson: "Rahul Sharma",
      contactEmail: "finance@greenchem.com",
      contactPhone: "+91 98700 11223",
      status: "Critical",
      remarks: "Account flagged for credit hold",
    },
    {
      id: 7,
      customerName: "Apex Chemical Works",
      customerId: "CUST-1009",
      invoiceNo: "INV-2025-0150",
      invoiceDate: "2025-12-22",
      dueDate: "2026-01-21",
      invoiceAmount: 175171,
      paidAmount: 175171,
      outstandingAmount: 0,
      daysOverdue: 0,
      reminderLevel: "—",
      reminderMethod: [],
      lastReminderDate: null,
      nextReminderDate: null,
      contactPerson: "Kunal Shah",
      contactEmail: "accounts@apexchem.com",
      contactPhone: "+91 98123 45678",
      status: "Paid",
      remarks: "Advance payment customer",
    },
    {
      id: 8,
      customerName: "Metro Paints & Coatings",
      customerId: "CUST-1012",
      invoiceNo: "INV-2025-0147",
      invoiceDate: "2025-12-16",
      dueDate: "2026-01-15",
      invoiceAmount: 237180,
      paidAmount: 0,
      outstandingAmount: 237180,
      daysOverdue: 35,
      reminderLevel: "Final Reminder",
      reminderMethod: ["Email", "Call", "Legal Notice"],
      lastReminderDate: "2026-02-14",
      nextReminderDate: "2026-02-17",
      contactPerson: "Suresh Patel",
      contactEmail: "accounts@metropaints.com",
      contactPhone: "+91 98222 33445",
      status: "Legal",
      remarks: "Legal notice sent – awaiting response",
    },
    {
      id: 9,
      customerName: "Synergy Chemicals",
      customerId: "CUST-1014",
      invoiceNo: "INV-2025-0145",
      invoiceDate: "2025-12-12",
      dueDate: "2026-01-11",
      invoiceAmount: 182900,
      paidAmount: 182900,
      outstandingAmount: 0,
      daysOverdue: 0,
      reminderLevel: "—",
      reminderMethod: [],
      lastReminderDate: null,
      nextReminderDate: null,
      contactPerson: "Manoj Kulkarni",
      contactEmail: "billing@synergychem.com",
      contactPhone: "+91 99321 44556",
      status: "Paid",
      remarks: "Prompt payment – discount applied",
    },
    {
      id: 10,
      customerName: "United Chemicals Corp",
      customerId: "CUST-1011",
      invoiceNo: "INV-2025-0144",
      invoiceDate: "2025-12-10",
      dueDate: "2026-01-09",
      invoiceAmount: 139240,
      paidAmount: 50000,
      outstandingAmount: 89240,
      daysOverdue: 37,
      reminderLevel: "2nd Reminder",
      reminderMethod: ["Email", "Call"],
      lastReminderDate: "2026-02-13",
      nextReminderDate: "2026-02-18",
      contactPerson: "Anil Deshmukh",
      contactEmail: "accounts@unitedchem.com",
      contactPhone: "+91 98877 66554",
      status: "Partially Paid",
      remarks: "Balance payment committed next week",
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-10 bg-transparent">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-6">
        <Bell className="text-orange-600" />
        Payment Reminders
      </h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-right">Outstanding (₹)</th>
              <th className="p-3 text-center">Days Overdue</th>
              <th className="p-3 text-center">Reminder Level</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{r.customerName}</td>
                <td className="p-3 font-mono">{r.invoiceNo}</td>
                <td className="p-3 text-right text-red-600 font-semibold">
                  {r.outstandingAmount.toLocaleString("en-IN")}
                </td>
                <td className="p-3 text-center">{r.daysOverdue}</td>
                <td className="p-3 text-center">{r.reminderLevel}</td>
                <td className="p-3 text-center">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentReminder;
