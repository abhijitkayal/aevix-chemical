// import React, { useState } from 'react';
// import { Shield, Users, Lock, Key, CheckCircle, XCircle, Edit, Search } from 'lucide-react';
// import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const Role = () => {
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Summary data
//   const summary = {
//     totalRoles: 12,
//     activeRoles: 12,
//     totalPermissions: 45,
//     customRoles: 8
//   };

//   // Roles data with detailed permissions
//   const rolesData = [
//     {
//       id: 'ROLE001',
//       name: 'Admin',
//       description: 'Full system access with all administrative privileges',
//       userCount: 5,
//       level: 'System',
//       status: 'Active',
//       createdDate: '2022-01-15',
// permissions: {
//   dashboard: ['View Overview', 'View Sales Analytics', 'View Stock Analytics', 'Export Reports'],
//   billing: ['View Invoices', 'Create Invoices', 'Edit Invoices', 'Delete Invoices', 'View Quotations', 'Create Quotations', 'View Ledgers', 'Edit Ledgers', 'View Reports', 'Export Reports'],
//   inventory: ['View Warehouses', 'Create Warehouses', 'Edit Warehouses', 'Delete Warehouses', 'View Stock', 'Adjust Stock', 'View Movement', 'Create Movement', 'View Low Stock'],
//   production: ['View BOM', 'Create BOM', 'Edit BOM', 'Delete BOM', 'View Job Work', 'Create Job Work', 'View Planning', 'Create Planning', 'Edit Planning', 'View Variance'],
//   users: ['View Users', 'Create Users', 'Edit Users', 'Delete Users', 'View Roles', 'Create Roles', 'Edit Roles', 'Delete Roles', 'View Leads', 'Edit Leads', 'View Activity Logs'],
//   system: ['System Configuration', 'Backup & Restore', 'Security Settings', 'Audit Logs']
// }
//     },
//     {
//       id: 'ROLE002',
//       name: 'Production Manager',
//       description: 'Manages production operations, planning, and quality control',
//       userCount: 2,
//       level: 'Department',
//       status: 'Active',
//       createdDate: '2022-03-20',
//       permissions: {
//         dashboard: ['View Overview', 'View Sales Analytics', 'View Stock Analytics'],
//         inventory: ['View Stock', 'View Movement', 'View Low Stock', 'View Warehouses'],
//         production: ['View BOM', 'Create BOM', 'Edit BOM', 'View Job Work', 'Create Job Work', 'Edit Job Work', 'View Planning', 'Create Planning', 'Edit Planning', 'View Variance', 'Create Variance Reports'],
//         users: ['View Activity Logs']
//       }
//     },
//     {
//       id: 'ROLE003',
//       name: 'Production Operator',
//       description: 'Executes production tasks and updates work order status',
//       userCount: 3,
//       level: 'Operational',
//       status: 'Active',
//       createdDate: '2022-04-10',
//       permissions: {
//         dashboard: ['View Overview'],
//         inventory: ['View Stock'],
//         production: ['View BOM', 'View Job Work', 'View Planning', 'Update Work Status']
//       }
//     },
//     {
//       id: 'ROLE004',
//       name: 'Inventory Manager',
//       description: 'Oversees warehouse operations and inventory control',
//       userCount: 1,
//       level: 'Department',
//       status: 'Active',
//       createdDate: '2022-05-15',
//       permissions: {
//         dashboard: ['View Overview', 'View Stock Analytics'],
//         billing: ['View Invoices'],
//         inventory: ['View Warehouses', 'Create Warehouses', 'Edit Warehouses', 'View Stock', 'Adjust Stock', 'View Movement', 'Create Movement', 'Edit Movement', 'View Low Stock', 'Create Purchase Orders'],
//         production: ['View BOM', 'View Planning'],
//         users: ['View Activity Logs']
//       }
//     },
//     {
//       id: 'ROLE005',
//       name: 'Warehouse Supervisor',
//       description: 'Supervises warehouse staff and manages stock movements',
//       userCount: 2,
//       level: 'Operational',
//       status: 'Active',
//       createdDate: '2022-06-01',
//       permissions: {
//         dashboard: ['View Overview', 'View Stock Analytics'],
//         inventory: ['View Warehouses', 'View Stock', 'Adjust Stock', 'View Movement', 'Create Movement', 'View Low Stock'],
//         production: ['View BOM']
//       }
//     },
//     {
//       id: 'ROLE006',
//       name: 'Warehouse Operator',
//       description: 'Handles day-to-day warehouse operations and stock transfers',
//       userCount: 2,
//       level: 'Operational',
//       status: 'Active',
//       createdDate: '2022-06-15',
//       permissions: {
//         dashboard: ['View Overview'],
//         inventory: ['View Stock', 'View Movement', 'Create Movement']
//       }
//     },
//     {
//       id: 'ROLE007',
//       name: 'Accountant',
//       description: 'Manages financial transactions, invoices, and reports',
//       userCount: 3,
//       level: 'Department',
//       status: 'Active',
//       createdDate: '2022-07-01',
//       permissions: {
//         dashboard: ['View Overview', 'View Sales Analytics'],
//         billing: ['View Invoices', 'Create Invoices', 'Edit Invoices', 'View Quotations', 'Create Quotations', 'View Ledgers', 'Edit Ledgers', 'View Reports', 'Export Reports'],
//         inventory: ['View Stock'],
//         users: ['View Activity Logs']
//       }
//     },
//     {
//       id: 'ROLE008',
//       name: 'Sales Manager',
//       description: 'Leads sales team and manages customer relationships',
//       userCount: 1,
//       level: 'Department',
//       status: 'Active',
//       createdDate: '2022-08-10',
//       permissions: {
//         dashboard: ['View Overview', 'View Sales Analytics', 'View Stock Analytics'],
//         billing: ['View Invoices', 'Create Invoices', 'View Quotations', 'Create Quotations', 'Edit Quotations', 'View Reports'],
//         inventory: ['View Stock', 'View Low Stock'],
//         users: ['View Leads', 'Create Leads', 'Edit Leads', 'Delete Leads', 'View Activity Logs']
//       }
//     },
//     {
//       id: 'ROLE009',
//       name: 'Sales Executive',
//       description: 'Handles customer inquiries and processes sales orders',
//       userCount: 3,
//       level: 'Operational',
//       status: 'Active',
//       createdDate: '2022-09-05',
//       permissions: {
//         dashboard: ['View Overview', 'View Sales Analytics'],
//         billing: ['View Quotations', 'Create Quotations'],
//         inventory: ['View Stock'],
//         users: ['View Leads', 'Edit Leads']
//       }
//     },
//     {
//       id: 'ROLE010',
//       name: 'Quality Controller',
//       description: 'Monitors product quality and compliance standards',
//       userCount: 3,
//       level: 'Operational',
//       status: 'Active',
//       createdDate: '2022-10-12',
//       permissions: {
//         dashboard: ['View Overview'],
//         inventory: ['View Stock'],
//         production: ['View BOM', 'View Job Work', 'View Planning', 'View Variance', 'Create Variance Reports', 'Quality Approval'],
//         users: ['View Activity Logs']
//       }
//     },
//     {
//       id: 'ROLE011',
//       name: 'Purchase Officer',
//       description: 'Manages procurement and vendor relationships',
//       userCount: 3,
//       level: 'Department',
//       status: 'Active',
//       createdDate: '2022-11-20',
//       permissions: {
//         dashboard: ['View Overview', 'View Stock Analytics'],
//         billing: ['View Quotations', 'Create Quotations'],
//         inventory: ['View Stock', 'View Low Stock', 'Create Purchase Orders', 'View Warehouses'],
//         production: ['View BOM'],
//         users: ['View Activity Logs']
//       }
//     },
//     {
//       id: 'ROLE012',
//       name: 'HR Manager',
//       description: 'Manages employee records and access control',
//       userCount: 1,
//       level: 'Department',
//       status: 'Active',
//       createdDate: '2023-01-15',
//       permissions: {
//         dashboard: ['View Overview'],
//         users: ['View Users', 'Create Users', 'Edit Users', 'View Roles', 'View Activity Logs'],
//         system: ['User Access Management']
//       }
//     }
//   ];

//   // Permission categories
//   const permissionCategories = [
//     {
//       category: 'Dashboard',
//       permissions: ['View Overview', 'View Sales Analytics', 'View Stock Analytics', 'Export Reports']
//     },
//     {
//       category: 'Billing & Accounting',
//       permissions: ['View Invoices', 'Create Invoices', 'Edit Invoices', 'Delete Invoices', 'View Quotations', 'Create Quotations', 'Edit Quotations', 'View Ledgers', 'Edit Ledgers', 'View Reports', 'Export Reports']
//     },
//     {
//       category: 'Inventory',
//       permissions: ['View Warehouses', 'Create Warehouses', 'Edit Warehouses', 'Delete Warehouses', 'View Stock', 'Adjust Stock', 'View Movement', 'Create Movement', 'Edit Movement', 'View Low Stock', 'Create Purchase Orders']
//     },
//     {
//       category: 'Production',
//       permissions: ['View BOM', 'Create BOM', 'Edit BOM', 'Delete BOM', 'View Job Work', 'Create Job Work', 'Edit Job Work', 'View Planning', 'Create Planning', 'Edit Planning', 'View Variance', 'Create Variance Reports', 'Quality Approval', 'Update Work Status']
//     },
//     {
//       category: 'Users & CRM',
//       permissions: ['View Users', 'Create Users', 'Edit Users', 'Delete Users', 'View Roles', 'Create Roles', 'Edit Roles', 'Delete Roles', 'View Leads', 'Create Leads', 'Edit Leads', 'Delete Leads', 'View Activity Logs']
//     },
//     {
//       category: 'System',
//       permissions: ['System Configuration', 'Backup & Restore', 'Security Settings', 'Audit Logs', 'User Access Management']
//     }
//   ];

//   // Role level distribution
//   const roleLevelData = [
//     { level: 'System', count: 1 },
//     { level: 'Department', count: 6 },
//     { level: 'Operational', count: 5 }
//   ];

//   // User distribution by role
//   const userDistributionData = rolesData.map(role => ({
//     role: role.name,
//     users: role.userCount
//   }));

//   // Permission usage
//   const permissionUsageData = [
//     { permission: 'View Stock', roles: 12 },
//     { permission: 'View Overview', roles: 11 },
//     { permission: 'View Activity Logs', roles: 9 },
//     { permission: 'View BOM', roles: 8 },
//     { permission: 'View Planning', roles: 7 },
//     { permission: 'View Quotations', roles: 6 },
//     { permission: 'Create Quotations', roles: 5 }
//   ];

//   const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

//   // Filter roles
//   const filteredRoles = rolesData.filter(role => {
//     const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          role.id.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   const getLevelColor = (level) => {
//     switch (level) {
//       case 'System': return 'bg-purple-100 text-purple-800';
//       case 'Department': return 'bg-blue-100 text-blue-800';
//       case 'Operational': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getAllPermissions = (role) => {
//     const allPerms = [];
//     Object.values(role.permissions).forEach(perms => {
//       allPerms.push(...perms);
//     });
//     return allPerms;
//   };

//   return (
//     <div className="p-6 min-h-screen mt-10">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-black mb-2">Role Management</h1>
//         <p className="text-gray-600">Define roles and assign permissions to control system access</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Roles</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.totalRoles}</p>
//             </div>
//             <Shield className="text-blue-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Active Roles</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.activeRoles}</p>
//             </div>
//             <CheckCircle className="text-green-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Permissions</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.totalPermissions}</p>
//             </div>
//             <Lock className="text-purple-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Custom Roles</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.customRoles}</p>
//             </div>
//             <Key className="text-orange-500" size={32} />
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Role Level Distribution */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Role Level Distribution</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={roleLevelData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ level, count }) => `${level}: ${count}`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="count"
//               >
//                 {roleLevelData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* User Distribution by Role */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Users per Role</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={userDistributionData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="role" angle={-45} textAnchor="end" height={120} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="users" fill="#10b981" name="User Count" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Most Used Permissions */}
//       <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold text-black mb-4">Most Used Permissions</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={permissionUsageData} layout="horizontal">
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis type="number" />
//             <YAxis dataKey="permission" type="category" width={150} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="roles" fill="#8b5cf6" name="Number of Roles" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Search */}
//       <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
//         <div>
//           <label className="block text-sm font-medium text-black mb-2">Search Role</label>
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search by role name, description, or ID..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Roles List */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {filteredRoles.map((role) => (
//           <div key={role.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
//             {/* Role Header */}
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Shield className="text-white" size={32} />
//                   <div>
//                     <h3 className="text-xl font-bold text-white">{role.name}</h3>
//                     <p className="text-sm text-blue-100">{role.id}</p>
//                   </div>
//                 </div>
//                 <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getLevelColor(role.level)}`}>
//                   {role.level}
//                 </span>
//               </div>
//             </div>

//             {/* Role Body */}
//             <div className="p-4">
//               <p className="text-gray-600 text-sm mb-4">{role.description}</p>

//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center space-x-2">
//                   <Users className="text-gray-500" size={16} />
//                   <span className="text-sm text-gray-600">{role.userCount} users assigned</span>
//                 </div>
//                 <div className="text-sm text-gray-500">Created: {role.createdDate}</div>
//               </div>

//               <div className="mb-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="font-semibold text-black text-sm">Permissions</h4>
//                   <span className="text-xs text-gray-500">{getAllPermissions(role).length} total</span>
//                 </div>

//                 {/* Permissions by Category */}
//                 <div className="space-y-3">
//                   {Object.entries(role.permissions).map(([category, perms]) => (
//                     <div key={category} className="bg-gray-100 rounded-lg p-3">
//                       <h5 className="font-medium text-black text-xs mb-2 uppercase">{category}</h5>
//                       <div className="flex flex-wrap gap-1">
//                         {perms.map((perm, idx) => (
//                           <span key={idx} className="px-2 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded flex items-center">
//                             <CheckCircle className="mr-1 text-green-500" size={12} />
//                             {perm}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex space-x-2">
//                 <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-sm">
//                   <Edit className="mr-2" size={16} />
//                   Edit Role
//                 </button>
//                 <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
//                   Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Permission Categories Reference */}
//       <div className="bg-white border border-gray-200 rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-black mb-4">Permission Categories Reference</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {permissionCategories.map((cat, idx) => (
//             <div key={idx} className="bg-gray-100 rounded-lg p-4">
//               <h3 className="font-semibold text-black mb-3 flex items-center">
//                 <Lock className="mr-2 text-blue-500" size={18} />
//                 {cat.category}
//               </h3>
//               <div className="space-y-1">
//                 {cat.permissions.map((perm, pidx) => (
//                   <div key={pidx} className="text-xs text-gray-600 flex items-center">
//                     <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
//                     {perm}
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-3 text-xs text-gray-500">
//                 {cat.permissions.length} permissions
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* No Results Message */}
//       {filteredRoles.length === 0 && (
//         <div className="text-center py-12 bg-white border border-gray-200 rounded-lg mt-6">
//           <Shield className="mx-auto text-gray-400 mb-4" size={48} />
//           <p className="text-gray-600">No roles found matching your criteria</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Role;

;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Shield, Plus, X, Edit, CheckCircle } from "lucide-react";

const ALL_PERMISSIONS = {
  dashboard: [
    "View Overview",
    "View Sales Analytics",
    "View Stock Analytics",
    "Export Reports",
  ],
  billing: [
    "View Invoices",
    "Create Invoices",
    "Edit Invoices",
    "Delete Invoices",
    "View Quotations",
    "Create Quotations",
    "View Ledgers",
    "Edit Ledgers",
    "View Reports",
    "Export Reports",
  ],
  inventory: [
    "View Warehouses",
    "Create Warehouses",
    "Edit Warehouses",
    "Delete Warehouses",
    "View Stock",
    "Adjust Stock",
    "View Movement",
    "Create Movement",
    "View Low Stock",
  ],
  production: [
    "View BOM",
    "Create BOM",
    "Edit BOM",
    "Delete BOM",
    "View Job Work",
    "Create Job Work",
    "View Planning",
    "Create Planning",
    "Edit Planning",
    "View Variance",
  ],
  users: [
    "View Users",
    "Create Users",
    "Edit Users",
    "Delete Users",
    "View Roles",
    "Create Roles",
    "Edit Roles",
    "Delete Roles",
    "View Leads",
    "Edit Leads",
    "View Activity Logs",
  ],
  system: [
    "System Configuration",
    "Backup & Restore",
    "Security Settings",
    "Audit Logs",
  ],
};

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    roleId: "",
    name: "",
    type: "",
    permissions: [],
  });

  /* ================= FETCH ROLES ================= */
  const fetchRoles = async () => {
    const res = await axios.get("http://localhost:5000/api/roles");
    setRoles(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePermission = (perm) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const openAddModal = () => {
    setIsEdit(false);
    setEditId(null);
    setForm({ roleId: "", name: "", type: "", permissions: [] });
    setShowModal(true);
  };

  const openEditModal = (role) => {
    setIsEdit(true);
    setEditId(role._id);
    setForm({
      roleId: role.roleId,
      name: role.name,
      type: role.type,
      permissions: role.permissions,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await axios.put(`http://localhost:5000/api/roles/${editId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/roles", form);
    }

    setShowModal(false);
    fetchRoles();
  };

  const filteredRoles = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.roleId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = (permissions) => {
    const allSelected = permissions.every((p) => form.permissions.includes(p));

    setForm((prev) => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter((p) => !permissions.includes(p)) // UNSELECT ALL
        : Array.from(new Set([...prev.permissions, ...permissions])), // SELECT ALL
    }));
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 mt-10 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Role Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Role
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search role..."
        className="mb-6 w-full border px-4 py-2 rounded-lg"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ROLE LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoles.map((role) => (
          <div
            key={role._id}
            className="bg-white border rounded-lg overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between">
              <div className="flex items-center gap-3">
                <Shield className="text-white" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-white">{role.name}</h3>
                  <p className="text-xs text-blue-100">{role.roleId}</p>
                </div>
              </div>

              {/* EDIT BUTTON */}
              <button
                onClick={() => openEditModal(role)}
                className="text-white hover:text-gray-200"
              >
                <Edit size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-4">
              <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                {role.type}
              </span>

              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-green-50 border text-xs rounded flex items-center"
                    >
                      <CheckCircle size={12} className="mr-1 text-green-600" />
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl relative">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            />

            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Role" : "Create Role"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="roleId"
                placeholder="Role ID"
                className="w-full border px-3 py-2 rounded"
                value={form.roleId}
                onChange={handleChange}
                required
              />

              <input
                name="name"
                placeholder="Role Name"
                className="w-full border px-3 py-2 rounded"
                value={form.name}
                onChange={handleChange}
                required
              />

              <select
                name="type"
                className="w-full border px-3 py-2 rounded"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="System">System</option>
                <option value="Departmental">Departmental</option>
                <option value="Operational">Operational</option>
              </select>

              <div>
                <p className="font-semibold text-sm mb-2">Permissions</p>

                <div className="space-y-4 max-h-64 overflow-y-auto border rounded p-3">
                  {Object.entries(ALL_PERMISSIONS).map(
                    ([category, permissions]) => {
                      const isAllSelected = permissions.every((p) =>
                        form.permissions.includes(p)
                      );

                      return (
                        <div key={category} className="border-b pb-3">
                          {/* CATEGORY HEADER */}
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-xs uppercase text-gray-700">
                              {category}
                            </h4>

                            {/* SELECT ALL */}
                            <label className="flex items-center gap-2 text-xs cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={() => toggleSelectAll(permissions)}
                              />
                              Select All
                            </label>
                          </div>

                          {/* PERMISSIONS */}
                          <div className="grid grid-cols-2 gap-2">
                            {permissions.map((perm) => (
                              <label
                                key={perm}
                                className="flex items-center gap-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={form.permissions.includes(perm)}
                                  onChange={() => togglePermission(perm)}
                                />
                                {perm}
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                {isEdit ? "Update Role" : "Save Role"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Role;
