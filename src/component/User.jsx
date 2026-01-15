// import React, { useState } from 'react';
// import { Users, UserCheck, UserX, Shield, Mail, Phone, Calendar, Search, Filter } from 'lucide-react';
// import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const User = () => {
//   const [selectedRole, setSelectedRole] = useState('All');
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Summary data
//   const summary = {
//     totalUsers: 28,
//     activeUsers: 24,
//     inactiveUsers: 4,
//     adminUsers: 5
//   };

//   // Users data
//   const usersData = [
//     {
//       id: 'USR001',
//       name: 'Rajesh Kumar',
//       email: 'rajesh.kumar@aevixchem.com',
//       phone: '+91-9876543210',
//       role: 'Admin',
//       department: 'Management',
//       status: 'Active',
//       joinDate: '2022-03-15',
//       lastLogin: '2026-01-05 09:30',
//       permissions: ['All Access', 'User Management', 'System Config'],
//       avatar: 'RK'
//     },
//     {
//       id: 'USR002',
//       name: 'Priya Sharma',
//       email: 'priya.sharma@aevixchem.com',
//       phone: '+91-9876543211',
//       role: 'Production Manager',
//       department: 'Production',
//       status: 'Active',
//       joinDate: '2022-06-20',
//       lastLogin: '2026-01-05 10:15',
//       permissions: ['Production Planning', 'BOM', 'Job Work', 'Inventory View'],
//       avatar: 'PS'
//     },
//     {
//       id: 'USR003',
//       name: 'Amit Patel',
//       email: 'amit.patel@aevixchem.com',
//       phone: '+91-9876543212',
//       role: 'Inventory Manager',
//       department: 'Warehouse',
//       status: 'Active',
//       joinDate: '2022-08-10',
//       lastLogin: '2026-01-05 08:45',
//       permissions: ['Stock Management', 'Movement', 'Warehouse', 'Low Stock'],
//       avatar: 'AP'
//     },
//     {
//       id: 'USR004',
//       name: 'Sunita Reddy',
//       email: 'sunita.reddy@aevixchem.com',
//       phone: '+91-9876543213',
//       role: 'Accountant',
//       department: 'Accounts',
//       status: 'Active',
//       joinDate: '2023-01-12',
//       lastLogin: '2026-01-05 09:00',
//       permissions: ['Invoices', 'Quotations', 'Ledgers', 'Reports'],
//       avatar: 'SR'
//     },
//     {
//       id: 'USR005',
//       name: 'Vikram Singh',
//       email: 'vikram.singh@aevixchem.com',
//       phone: '+91-9876543214',
//       role: 'Sales Executive',
//       department: 'Sales',
//       status: 'Active',
//       joinDate: '2023-03-05',
//       lastLogin: '2026-01-04 18:30',
//       permissions: ['Sales Analytics', 'Leads', 'Quotations'],
//       avatar: 'VS'
//     },
//     {
//       id: 'USR006',
//       name: 'Meena Gupta',
//       email: 'meena.gupta@aevixchem.com',
//       phone: '+91-9876543215',
//       role: 'Quality Controller',
//       department: 'Quality',
//       status: 'Active',
//       joinDate: '2023-04-18',
//       lastLogin: '2026-01-05 07:30',
//       permissions: ['Production View', 'Variance', 'Reports'],
//       avatar: 'MG'
//     },
//     {
//       id: 'USR007',
//       name: 'Arjun Verma',
//       email: 'arjun.verma@aevixchem.com',
//       phone: '+91-9876543216',
//       role: 'Warehouse Supervisor',
//       department: 'Warehouse',
//       status: 'Active',
//       joinDate: '2023-05-22',
//       lastLogin: '2026-01-05 10:00',
//       permissions: ['Stock View', 'Movement', 'Warehouse'],
//       avatar: 'AV'
//     },
//     {
//       id: 'USR008',
//       name: 'Kavita Desai',
//       email: 'kavita.desai@aevixchem.com',
//       phone: '+91-9876543217',
//       role: 'Purchase Officer',
//       department: 'Purchase',
//       status: 'Active',
//       joinDate: '2023-07-10',
//       lastLogin: '2026-01-05 09:45',
//       permissions: ['Low Stock', 'Inventory View', 'Quotations'],
//       avatar: 'KD'
//     },
//     {
//       id: 'USR009',
//       name: 'Rahul Joshi',
//       email: 'rahul.joshi@aevixchem.com',
//       phone: '+91-9876543218',
//       role: 'Production Operator',
//       department: 'Production',
//       status: 'Active',
//       joinDate: '2023-08-15',
//       lastLogin: '2026-01-05 06:00',
//       permissions: ['Planning View', 'Job Work View'],
//       avatar: 'RJ'
//     },
//     {
//       id: 'USR010',
//       name: 'Neha Kapoor',
//       email: 'neha.kapoor@aevixchem.com',
//       phone: '+91-9876543219',
//       role: 'Admin',
//       department: 'IT',
//       status: 'Active',
//       joinDate: '2023-09-01',
//       lastLogin: '2026-01-05 08:00',
//       permissions: ['All Access', 'User Management', 'System Config'],
//       avatar: 'NK'
//     },
//     {
//       id: 'USR011',
//       name: 'Sanjay Mehta',
//       email: 'sanjay.mehta@aevixchem.com',
//       phone: '+91-9876543220',
//       role: 'Sales Manager',
//       department: 'Sales',
//       status: 'Active',
//       joinDate: '2023-10-12',
//       lastLogin: '2026-01-04 19:00',
//       permissions: ['Sales Analytics', 'Leads', 'Activity Logs', 'Reports'],
//       avatar: 'SM'
//     },
//     {
//       id: 'USR012',
//       name: 'Pooja Rao',
//       email: 'pooja.rao@aevixchem.com',
//       phone: '+91-9876543221',
//       role: 'HR Manager',
//       department: 'HR',
//       status: 'Active',
//       joinDate: '2023-11-08',
//       lastLogin: '2026-01-05 09:15',
//       permissions: ['User Management', 'Roles', 'Activity Logs'],
//       avatar: 'PR'
//     },
//     {
//       id: 'USR013',
//       name: 'Deepak Nair',
//       email: 'deepak.nair@aevixchem.com',
//       phone: '+91-9876543222',
//       role: 'Production Operator',
//       department: 'Production',
//       status: 'Active',
//       joinDate: '2024-01-20',
//       lastLogin: '2026-01-05 06:15',
//       permissions: ['Planning View', 'BOM View'],
//       avatar: 'DN'
//     },
//     {
//       id: 'USR014',
//       name: 'Anjali Iyer',
//       email: 'anjali.iyer@aevixchem.com',
//       phone: '+91-9876543223',
//       role: 'Accountant',
//       department: 'Accounts',
//       status: 'Active',
//       joinDate: '2024-02-14',
//       lastLogin: '2026-01-05 08:30',
//       permissions: ['Invoices', 'Ledgers', 'Reports'],
//       avatar: 'AI'
//     },
//     {
//       id: 'USR015',
//       name: 'Manish Agarwal',
//       email: 'manish.agarwal@aevixchem.com',
//       phone: '+91-9876543224',
//       role: 'Warehouse Operator',
//       department: 'Warehouse',
//       status: 'Active',
//       joinDate: '2024-03-10',
//       lastLogin: '2026-01-05 07:00',
//       permissions: ['Stock View', 'Movement'],
//       avatar: 'MA'
//     },
//     {
//       id: 'USR016',
//       name: 'Lakshmi Pillai',
//       email: 'lakshmi.pillai@aevixchem.com',
//       phone: '+91-9876543225',
//       role: 'Sales Executive',
//       department: 'Sales',
//       status: 'Inactive',
//       joinDate: '2024-04-05',
//       lastLogin: '2025-12-15 17:30',
//       permissions: ['Sales Analytics', 'Leads'],
//       avatar: 'LP'
//     },
//     {
//       id: 'USR017',
//       name: 'Karthik Menon',
//       email: 'karthik.menon@aevixchem.com',
//       phone: '+91-9876543226',
//       role: 'Quality Controller',
//       department: 'Quality',
//       status: 'Active',
//       joinDate: '2024-05-15',
//       lastLogin: '2026-01-05 07:45',
//       permissions: ['Variance', 'Production View', 'Reports'],
//       avatar: 'KM'
//     },
//     {
//       id: 'USR018',
//       name: 'Divya Krishnan',
//       email: 'divya.krishnan@aevixchem.com',
//       phone: '+91-9876543227',
//       role: 'Purchase Officer',
//       department: 'Purchase',
//       status: 'Active',
//       joinDate: '2024-06-01',
//       lastLogin: '2026-01-05 09:30',
//       permissions: ['Low Stock', 'Inventory View', 'Quotations'],
//       avatar: 'DK'
//     },
//     {
//       id: 'USR019',
//       name: 'Suresh Raman',
//       email: 'suresh.raman@aevixchem.com',
//       phone: '+91-9876543228',
//       role: 'Production Operator',
//       department: 'Production',
//       status: 'Active',
//       joinDate: '2024-07-12',
//       lastLogin: '2026-01-05 06:30',
//       permissions: ['Planning View', 'Job Work View'],
//       avatar: 'SuR'
//     },
//     {
//       id: 'USR020',
//       name: 'Anita Bhatt',
//       email: 'anita.bhatt@aevixchem.com',
//       phone: '+91-9876543229',
//       role: 'Warehouse Supervisor',
//       department: 'Warehouse',
//       status: 'Active',
//       joinDate: '2024-08-20',
//       lastLogin: '2026-01-05 08:15',
//       permissions: ['Stock Management', 'Movement', 'Warehouse'],
//       avatar: 'AB'
//     },
//     {
//       id: 'USR021',
//       name: 'Ramesh Kulkarni',
//       email: 'ramesh.kulkarni@aevixchem.com',
//       phone: '+91-9876543230',
//       role: 'Admin',
//       department: 'Management',
//       status: 'Active',
//       joinDate: '2024-09-05',
//       lastLogin: '2026-01-05 10:30',
//       permissions: ['All Access', 'User Management', 'System Config'],
//       avatar: 'RaK'
//     },
//     {
//       id: 'USR022',
//       name: 'Sneha Patil',
//       email: 'sneha.patil@aevixchem.com',
//       phone: '+91-9876543231',
//       role: 'Sales Executive',
//       department: 'Sales',
//       status: 'Inactive',
//       joinDate: '2024-10-10',
//       lastLogin: '2025-12-20 16:45',
//       permissions: ['Sales Analytics', 'Leads'],
//       avatar: 'SP'
//     },
//     {
//       id: 'USR023',
//       name: 'Ganesh Naidu',
//       email: 'ganesh.naidu@aevixchem.com',
//       phone: '+91-9876543232',
//       role: 'Production Manager',
//       department: 'Production',
//       status: 'Active',
//       joinDate: '2024-11-15',
//       lastLogin: '2026-01-05 09:00',
//       permissions: ['Production Planning', 'BOM', 'Job Work', 'Variance'],
//       avatar: 'GN'
//     },
//     {
//       id: 'USR024',
//       name: 'Rekha Shah',
//       email: 'rekha.shah@aevixchem.com',
//       phone: '+91-9876543233',
//       role: 'Accountant',
//       department: 'Accounts',
//       status: 'Active',
//       joinDate: '2024-12-01',
//       lastLogin: '2026-01-05 08:45',
//       permissions: ['Invoices', 'Quotations', 'Ledgers'],
//       avatar: 'ReS'
//     },
//     {
//       id: 'USR025',
//       name: 'Vivek Saxena',
//       email: 'vivek.saxena@aevixchem.com',
//       phone: '+91-9876543234',
//       role: 'Warehouse Operator',
//       department: 'Warehouse',
//       status: 'Inactive',
//       joinDate: '2025-01-10',
//       lastLogin: '2025-12-28 14:00',
//       permissions: ['Stock View', 'Movement'],
//       avatar: 'ViS'
//     },
//     {
//       id: 'USR026',
//       name: 'Shweta Mishra',
//       email: 'shweta.mishra@aevixchem.com',
//       phone: '+91-9876543235',
//       role: 'Quality Controller',
//       department: 'Quality',
//       status: 'Active',
//       joinDate: '2025-02-20',
//       lastLogin: '2026-01-05 07:15',
//       permissions: ['Variance', 'Production View'],
//       avatar: 'ShM'
//     },
//     {
//       id: 'USR027',
//       name: 'Manoj Tiwari',
//       email: 'manoj.tiwari@aevixchem.com',
//       phone: '+91-9876543236',
//       role: 'Purchase Officer',
//       department: 'Purchase',
//       status: 'Active',
//       joinDate: '2025-03-15',
//       lastLogin: '2026-01-05 10:15',
//       permissions: ['Low Stock', 'Inventory View', 'Quotations'],
//       avatar: 'MT'
//     },
//     {
//       id: 'USR028',
//       name: 'Geeta Pandey',
//       email: 'geeta.pandey@aevixchem.com',
//       phone: '+91-9876543237',
//       role: 'Admin',
//       department: 'IT',
//       status: 'Inactive',
//       joinDate: '2025-04-01',
//       lastLogin: '2025-12-10 11:30',
//       permissions: ['All Access', 'User Management'],
//       avatar: 'GP'
//     }
//   ];

//   // Role distribution
//   const roleDistribution = [
//     { role: 'Admin', count: 5 },
//     { role: 'Production Manager', count: 2 },
//     { role: 'Production Operator', count: 3 },
//     { role: 'Inventory Manager', count: 1 },
//     { role: 'Warehouse Supervisor', count: 2 },
//     { role: 'Warehouse Operator', count: 2 },
//     { role: 'Accountant', count: 3 },
//     { role: 'Sales Manager', count: 1 },
//     { role: 'Sales Executive', count: 3 },
//     { role: 'Quality Controller', count: 3 },
//     { role: 'Purchase Officer', count: 3 },
//     { role: 'HR Manager', count: 1 }
//   ];

//   // Department distribution
//   const departmentDistribution = [
//     { department: 'Production', count: 5 },
//     { department: 'Warehouse', count: 5 },
//     { department: 'Sales', count: 5 },
//     { department: 'Accounts', count: 3 },
//     { department: 'Quality', count: 3 },
//     { department: 'Purchase', count: 3 },
//     { department: 'Management', count: 2 },
//     { department: 'IT', count: 2 },
//     { department: 'HR', count: 1 }
//   ];

//   // User activity trend (last 6 months)
//   const activityTrend = [
//     { month: 'Aug 2025', activeUsers: 22, newUsers: 0 },
//     { month: 'Sep 2025', activeUsers: 23, newUsers: 1 },
//     { month: 'Oct 2025', activeUsers: 24, newUsers: 1 },
//     { month: 'Nov 2025', activeUsers: 25, newUsers: 1 },
//     { month: 'Dec 2025', activeUsers: 23, newUsers: 0 },
//     { month: 'Jan 2026', activeUsers: 24, newUsers: 0 }
//   ];

//   const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

//   // Filter users
//   const filteredUsers = usersData.filter(user => {
//     const matchesRole = selectedRole === 'All' || user.role === selectedRole;
//     const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.department.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesRole && matchesStatus && matchesSearch;
//   });

//   const getStatusColor = (status) => {
//     return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
//   };

//   const getRoleBadgeColor = (role) => {
//     if (role === 'Admin') return 'bg-purple-100 text-purple-800';
//     if (role.includes('Manager')) return 'bg-blue-100 text-blue-800';
//     if (role.includes('Supervisor')) return 'bg-cyan-100 text-cyan-800';
//     return 'bg-gray-100 text-gray-800';
//   };

//   return (
//     <div className="p-6 min-h-screen mt-10">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-black mb-2">User Management</h1>
//         <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Users</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.totalUsers}</p>
//             </div>
//             <Users className="text-blue-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Active Users</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.activeUsers}</p>
//             </div>
//             <UserCheck className="text-green-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Inactive Users</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.inactiveUsers}</p>
//             </div>
//             <UserX className="text-red-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Admin Users</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.adminUsers}</p>
//             </div>
//             <Shield className="text-purple-500" size={32} />
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Role Distribution */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Users by Role</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={roleDistribution}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="role" angle={-45} textAnchor="end" height={120} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#3b82f6" name="User Count" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Department Distribution */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Users by Department</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={departmentDistribution}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ department, count }) => `${department}: ${count}`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="count"
//               >
//                 {departmentDistribution.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* User Activity Trend */}
//       <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold text-black mb-4">User Activity Trend (Last 6 Months)</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={activityTrend}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="activeUsers" stroke="#10b981" strokeWidth={2} name="Active Users" />
//             <Line type="monotone" dataKey="newUsers" stroke="#3b82f6" strokeWidth={2} name="New Users" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Filters */}
//       <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-black mb-2">Search User</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search by name, email, ID, or department..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-black mb-2">Filter by Role</label>
//             <select
//               value={selectedRole}
//               onChange={(e) => setSelectedRole(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="All">All Roles</option>
//               <option value="Admin">Admin</option>
//               <option value="Production Manager">Production Manager</option>
//               <option value="Production Operator">Production Operator</option>
//               <option value="Inventory Manager">Inventory Manager</option>
//               <option value="Warehouse Supervisor">Warehouse Supervisor</option>
//               <option value="Warehouse Operator">Warehouse Operator</option>
//               <option value="Accountant">Accountant</option>
//               <option value="Sales Manager">Sales Manager</option>
//               <option value="Sales Executive">Sales Executive</option>
//               <option value="Quality Controller">Quality Controller</option>
//               <option value="Purchase Officer">Purchase Officer</option>
//               <option value="HR Manager">HR Manager</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-black mb-2">Filter by Status</label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="All">All Status</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Users List */}
//       <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//         <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-black">All Users ({filteredUsers.length})</h2>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
//           {filteredUsers.map((user) => (
//             <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                     {user.avatar}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-black text-lg">{user.name}</h3>
//                     <p className="text-sm text-gray-600">{user.id}</p>
//                   </div>
//                 </div>
//                 <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
//                   {user.status}
//                 </span>
//               </div>

//               <div className="space-y-2 mb-3">
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Mail className="mr-2" size={16} />
//                   {user.email}
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Phone className="mr-2" size={16} />
//                   {user.phone}
//                 </div>
//                 <div className="flex items-center text-sm text-gray-600">
//                   <Calendar className="mr-2" size={16} />
//                   Joined: {user.joinDate}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between mb-3">
//                 <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
//                   {user.role}
//                 </span>
//                 <span className="text-sm text-gray-600">{user.department}</span>
//               </div>

//               <div className="mb-3">
//                 <p className="text-xs text-gray-500 mb-1">Last Login: {user.lastLogin}</p>
//               </div>

//               <div>
//                 <p className="text-xs font-semibold text-gray-700 mb-1">Permissions:</p>
//                 <div className="flex flex-wrap gap-1">
//                   {user.permissions.slice(0, 3).map((permission, idx) => (
//                     <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
//                       {permission}
//                     </span>
//                   ))}
//                   {user.permissions.length > 3 && (
//                     <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//                       +{user.permissions.length - 3} more
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* No Results Message */}
//       {filteredUsers.length === 0 && (
//         <div className="text-center py-12 bg-white border border-gray-200 rounded-lg mt-6">
//           <Users className="mx-auto text-gray-400 mb-4" size={48} />
//           <p className="text-gray-600">No users found matching your criteria</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default User;


// ;
// ;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X, Edit, Trash2, Mail, Phone } from "lucide-react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    employeeId: "",
  });

  /* FETCH USERS */
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* HANDLERS */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await axios.put(
        `http://localhost:5000/api/users/${editId}`,
        form
      );
    } else {
      await axios.post("http://localhost:5000/api/users", form);
    }

    resetForm();
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user._id);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "",
      employeeId: "",
    });
    setIsEdit(false);
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 min-h-screen mt-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">User Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* USERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white border rounded-lg p-4 hover:shadow"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-lg">{u.name}</h3>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                {u.role}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Mail size={14} /> {u.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} /> {u.phone}
              </div>
              <p>Employee ID: {u.employeeId}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(u)}
                className="flex items-center gap-1 text-blue-600 text-sm"
              >
                <Edit size={14} /> Edit
              </button>

              <button
                onClick={() => handleDelete(u._id)}
                className="flex items-center gap-1 text-red-600 text-sm"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl relative">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={resetForm}
            />

            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit User" : "Create User"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                className="w-full border px-3 py-2 rounded"
                value={form.phone}
                onChange={handleChange}
              />

              <select
                name="role"
                className="w-full border px-3 py-2 rounded"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Sales">Sales</option>
                <option value="Stock Manager">Stock Manager</option>
                <option value="Employee">Employee</option>
              </select>

              <input
                name="employeeId"
                placeholder="Employee ID"
                className="w-full border px-3 py-2 rounded"
                value={form.employeeId}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                {isEdit ? "Update User" : "Save User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
