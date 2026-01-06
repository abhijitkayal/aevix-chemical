import React from "react";
import {
  ShieldCheck,
  Lock,
  Key,
  UserCheck,
  Activity,
  AlertTriangle,
} from "lucide-react";

export default function Security() {
  return (
    <div className="p-6 mt-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-black">
          Security & Access Control
        </h1>
        <p className="text-gray-600">
          System security settings, access control, and audit overview
        </p>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="text-emerald-600" />
            <h3 className="font-semibold text-black">System Status</h3>
          </div>
          <p className="text-sm text-gray-600">
            All security protocols are active and functioning normally.
          </p>
          <p className="mt-2 text-emerald-600 font-medium">
            ✔ Secure
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3 mb-3">
            <UserCheck className="text-blue-600" />
            <h3 className="font-semibold text-black">Active Users</h3>
          </div>
          <p className="text-sm text-gray-600">
            Users currently authenticated in the system.
          </p>
          <p className="mt-2 text-black font-bold text-xl">
            14 Active Sessions
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="text-yellow-600" />
            <h3 className="font-semibold text-black">Security Alerts</h3>
          </div>
          <p className="text-sm text-gray-600">
            No critical alerts detected in the last 24 hours.
          </p>
          <p className="mt-2 text-yellow-600 font-medium">
            ⚠ 1 Warning
          </p>
        </div>
      </div>

      {/* Access Control Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="text-purple-600" />
          <h2 className="text-lg font-semibold text-black">
            Role-Based Access Control
          </h2>
        </div>

        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Admin: Full access to all modules and settings</li>
          <li>• HR: Employee data, payroll, attendance, CRM</li>
          <li>• Sales: Leads, invoices, payments, customer data</li>
          <li>• Inventory Manager: Stock, warehouse, movement reports</li>
          <li>• Viewer: Read-only access to reports</li>
        </ul>
      </div>

      {/* Authentication Settings */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Key className="text-indigo-600" />
          <h2 className="text-lg font-semibold text-black">
            Authentication Settings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <p className="font-medium text-black">Password Policy</p>
            <ul className="mt-2 space-y-1">
              <li>• Minimum 8 characters</li>
              <li>• Must include numbers & symbols</li>
              <li>• Password expiry: 90 days</li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-black">Session Control</p>
            <ul className="mt-2 space-y-1">
              <li>• Auto logout after 15 minutes of inactivity</li>
              <li>• Single-device login enforcement</li>
              <li>• IP-based session tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Activity & Audit Logs */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="text-red-600" />
          <h2 className="text-lg font-semibold text-black">
            Recent Security Activity
          </h2>
        </div>

        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Admin logged in from IP 192.168.1.12</li>
          <li>• Password changed for user “Rahul”</li>
          <li>• Failed login attempt detected (2 times)</li>
          <li>• Role permissions updated for HR user</li>
        </ul>
      </div>
    </div>
  );
}
