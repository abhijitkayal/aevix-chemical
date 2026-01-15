// import React, { useState } from 'react';
// import { Factory, TrendingUp, Clock, DollarSign, Package, AlertCircle, CheckCircle, Search } from 'lucide-react';
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const Jobwork = () => {
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Summary data
//   const summary = {
//     totalJobWorks: 18,
//     activeOrders: 12,
//     pendingDeliveries: 5,
//     totalValue: 3250000
//   };

//   // Job work orders data
//   const jobWorkOrders = [
//     {
//       id: 'JW001',
//       orderNo: 'JW-2026-001',
//       jobWorker: 'ChemProcess Industries',
//       location: 'Mumbai, Maharashtra',
//       processType: 'Granulation',
//       product: 'Calcium Carbonate Granules',
//       orderDate: '2025-12-15',
//       deliveryDate: '2026-01-20',
//       status: 'In Progress',
//       materialsSent: [
//         { material: 'Calcium Carbonate Powder', quantity: 2000, unit: 'Kg', rate: 45 },
//         { material: 'Binder Solution', quantity: 100, unit: 'Liter', rate: 150 }
//       ],
//       materialsReceived: [
//         { material: 'Calcium Carbonate Granules', quantity: 1800, unit: 'Kg', rate: 0 }
//       ],
//       jobWorkCost: 50000,
//       totalCost: 155000,
//       paymentStatus: 'Partial',
//       paidAmount: 75000,
//       remarks: 'First batch received, quality approved'
//     },
//     {
//       id: 'JW002',
//       orderNo: 'JW-2026-002',
//       jobWorker: 'Precision Mixing Co',
//       location: 'Pune, Maharashtra',
//       processType: 'Blending',
//       product: 'Custom Acid Blend',
//       orderDate: '2025-12-20',
//       deliveryDate: '2026-01-15',
//       status: 'Completed',
//       materialsSent: [
//         { material: 'Sulfuric Acid 98%', quantity: 500, unit: 'Liter', rate: 90 },
//         { material: 'Hydrochloric Acid 35%', quantity: 300, unit: 'Liter', rate: 45 },
//         { material: 'Deionized Water', quantity: 200, unit: 'Liter', rate: 5 }
//       ],
//       materialsReceived: [
//         { material: 'Custom Acid Blend', quantity: 1000, unit: 'Liter', rate: 0 }
//       ],
//       jobWorkCost: 35000,
//       totalCost: 97500,
//       paymentStatus: 'Paid',
//       paidAmount: 97500,
//       remarks: 'Completed on time, excellent quality'
//     },
//     {
//       id: 'JW003',
//       orderNo: 'JW-2026-003',
//       jobWorker: 'PackMaster Solutions',
//       location: 'Ahmedabad, Gujarat',
//       processType: 'Repackaging',
//       product: 'Sodium Hydroxide 50% (Small Pack)',
//       orderDate: '2026-01-02',
//       deliveryDate: '2026-01-18',
//       status: 'In Progress',
//       materialsSent: [
//         { material: 'Sodium Hydroxide 50%', quantity: 1000, unit: 'Kg', rate: 180 },
//         { material: 'HDPE Bottles 500ml', quantity: 2000, unit: 'Pcs', rate: 15 },
//         { material: 'Safety Labels', quantity: 2000, unit: 'Pcs', rate: 2 }
//       ],
//       materialsReceived: [
//         { material: 'Sodium Hydroxide 50% Packed', quantity: 800, unit: 'Kg', rate: 0 }
//       ],
//       jobWorkCost: 25000,
//       totalCost: 239000,
//       paymentStatus: 'Pending',
//       paidAmount: 0,
//       remarks: '40% packaging completed'
//     },
//     {
//       id: 'JW004',
//       orderNo: 'JW-2025-045',
//       jobWorker: 'FilterTech Labs',
//       location: 'Vadodara, Gujarat',
//       processType: 'Filtration & Purification',
//       product: 'Titanium Dioxide Ultra Pure',
//       orderDate: '2025-11-25',
//       deliveryDate: '2025-12-28',
//       status: 'Completed',
//       materialsSent: [
//         { material: 'Titanium Dioxide Standard', quantity: 500, unit: 'Kg', rate: 450 }
//       ],
//       materialsReceived: [
//         { material: 'Titanium Dioxide Ultra Pure', quantity: 480, unit: 'Kg', rate: 0 }
//       ],
//       jobWorkCost: 75000,
//       totalCost: 300000,
//       paymentStatus: 'Paid',
//       paidAmount: 300000,
//       remarks: 'High purity achieved 99.9%'
//     },
//     {
//       id: 'JW005',
//       orderNo: 'JW-2026-005',
//       jobWorker: 'Coating Specialists Ltd',
//       location: 'Surat, Gujarat',
//       processType: 'Surface Coating',
//       product: 'Coated Silica Gel',
//       orderDate: '2026-01-05',
//       deliveryDate: '2026-01-25',
//       status: 'Pending',
//       materialsSent: [
//         { material: 'Silica Gel Beads', quantity: 300, unit: 'Kg', rate: 120 },
//         { material: 'Polymer Coating Solution', quantity: 50, unit: 'Liter', rate: 500 }
//       ],
//       materialsReceived: [],
//       jobWorkCost: 40000,
//       totalCost: 101000,
//       paymentStatus: 'Pending',
//       paidAmount: 0,
//       remarks: 'Materials dispatched on 2026-01-05'
//     },
//     {
//       id: 'JW006',
//       orderNo: 'JW-2025-042',
//       jobWorker: 'DryTech Industries',
//       location: 'Nashik, Maharashtra',
//       processType: 'Drying & Grinding',
//       product: 'Dried Ferric Chloride Powder',
//       orderDate: '2025-12-01',
//       deliveryDate: '2026-01-10',
//       status: 'In Progress',
//       materialsSent: [
//         { material: 'Ferric Chloride Solution 40%', quantity: 1000, unit: 'Liter', rate: 85 }
//       ],
//       materialsReceived: [
//         { material: 'Ferric Chloride Powder', quantity: 250, unit: 'Kg', rate: 0 }
//       ],
//       jobWorkCost: 55000,
//       totalCost: 140000,
//       paymentStatus: 'Partial',
//       paidAmount: 70000,
//       remarks: '62% drying completed'
//     },
//     {
//       id: 'JW007',
//       orderNo: 'JW-2025-038',
//       jobWorker: 'Quality Testing Labs',
//       location: 'Hyderabad, Telangana',
//       processType: 'Quality Analysis',
//       product: 'pH Buffer Quality Certification',
//       orderDate: '2025-11-15',
//       deliveryDate: '2025-12-20',
//       status: 'Completed',
//       materialsSent: [
//         { material: 'pH Buffer Solution 7.0', quantity: 50, unit: 'Liter', rate: 75 }
//       ],
//       materialsReceived: [
//         { material: 'pH Buffer Solution 7.0 Certified', quantity: 50, unit: 'Liter', rate: 0 }
//       ],
//       jobWorkCost: 15000,
//       totalCost: 18750,
//       paymentStatus: 'Paid',
//       paidAmount: 18750,
//       remarks: 'ISO certified, all parameters passed'
//     },
//     {
//       id: 'JW008',
//       orderNo: 'JW-2026-008',
//       jobWorker: 'ChemProcess Industries',
//       location: 'Mumbai, Maharashtra',
//       processType: 'Concentration',
//       product: 'Hydrogen Peroxide 70%',
//       orderDate: '2026-01-03',
//       deliveryDate: '2026-01-22',
//       status: 'In Progress',
//       materialsSent: [
//         { material: 'Hydrogen Peroxide 35%', quantity: 2000, unit: 'Liter', rate: 140 }
//       ],
//       materialsReceived: [],
//       jobWorkCost: 85000,
//       totalCost: 365000,
//       paymentStatus: 'Pending',
//       paidAmount: 0,
//       remarks: 'Concentration process started'
//     },
//     {
//       id: 'JW009',
//       orderNo: 'JW-2025-040',
//       jobWorker: 'Precision Mixing Co',
//       location: 'Pune, Maharashtra',
//       processType: 'Formulation',
//       product: 'Multi-Purpose Cleaner',
//       orderDate: '2025-12-10',
//       deliveryDate: '2026-01-12',
//       status: 'Completed',
//       materialsSent: [
//         { material: 'Sodium Hydroxide 50%', quantity: 100, unit: 'Kg', rate: 180 },
//         { material: 'Surfactant Base', quantity: 200, unit: 'Liter', rate: 250 },
//         { material: 'Fragrance Oil', quantity: 20, unit: 'Liter', rate: 800 },
//         { material: 'Deionized Water', quantity: 680, unit: 'Liter', rate: 5 }
//       ],
//       materialsReceived: [
//         { material: 'Multi-Purpose Cleaner', quantity: 1000, unit: 'Liter', rate: 0 }
//       ],
//       jobWorkCost: 45000,
//       totalCost: 116400,
//       paymentStatus: 'Paid',
//       paidAmount: 116400,
//       remarks: 'Formula as per specification'
//     },
//     {
//       id: 'JW010',
//       orderNo: 'JW-2026-010',
//       jobWorker: 'PackMaster Solutions',
//       location: 'Ahmedabad, Gujarat',
//       processType: 'Labeling',
//       product: 'Labeled Ethanol Bottles',
//       orderDate: '2026-01-04',
//       deliveryDate: '2026-01-16',
//       status: 'Pending',
//       materialsSent: [
//         { material: 'Ethanol 95% in Drums', quantity: 1000, unit: 'Liter', rate: 110 },
//         { material: 'Glass Bottles 1L', quantity: 1000, unit: 'Pcs', rate: 25 },
//         { material: 'Custom Labels', quantity: 1000, unit: 'Pcs', rate: 5 }
//       ],
//       materialsReceived: [],
//       jobWorkCost: 20000,
//       totalCost: 165000,
//       paymentStatus: 'Pending',
//       paidAmount: 0,
//       remarks: 'Awaiting job work start'
//     },
//     {
//       id: 'JW011',
//       orderNo: 'JW-2025-036',
//       jobWorker: 'FilterTech Labs',
//       location: 'Vadodara, Gujarat',
//       processType: 'Distillation',
//       product: 'Acetic Acid 99.9%',
//       orderDate: '2025-11-10',
//       deliveryDate: '2025-12-15',
//       status: 'Completed',
//       materialsSent: [
//         { material: 'Acetic Acid 99%', quantity: 500, unit: 'Liter', rate: 130 }
//       ],
//       materialsReceived: [
//         { material: 'Acetic Acid 99.9%', quantity: 480, unit: 'Liter', rate: 0 }
//       ],
//       jobWorkCost: 60000,
//       totalCost: 125000,
//       paymentStatus: 'Paid',
//       paidAmount: 125000,
//       remarks: 'Ultra-pure grade achieved'
//     },
//     {
//       id: 'JW012',
//       orderNo: 'JW-2026-012',
//       jobWorker: 'Coating Specialists Ltd',
//       location: 'Surat, Gujarat',
//       processType: 'Pelletization',
//       product: 'Calcium Carbonate Pellets',
//       orderDate: '2026-01-01',
//       deliveryDate: '2026-01-19',
//       status: 'In Progress',
//       materialsSent: [
//         { material: 'Calcium Carbonate Powder', quantity: 1500, unit: 'Kg', rate: 45 },
//         { material: 'Binding Agent', quantity: 75, unit: 'Kg', rate: 200 }
//       ],
//       materialsReceived: [
//         { material: 'Calcium Carbonate Pellets', quantity: 600, unit: 'Kg', rate: 0 }
//       ],
//       jobWorkCost: 48000,
//       totalCost: 130500,
//       paymentStatus: 'Partial',
//       paidAmount: 50000,
//       remarks: '40% pelletization done'
//     },
//     {
//       id: 'JW013',
//       orderNo: 'JW-2025-044',
//       jobWorker: 'DryTech Industries',
//       location: 'Nashik, Maharashtra',
//       processType: 'Spray Drying',
//       product: 'Sodium Silicate Powder',
//       orderDate: '2025-12-05',
//       deliveryDate: '2026-01-08',
//       status: 'Completed',
//       materialsSent: [
//         { material: 'Sodium Silicate Solution', quantity: 800, unit: 'Liter', rate: 120 }
//       ],
//       materialsReceived: [
//         { material: 'Sodium Silicate Powder', quantity: 320, unit: 'Kg', rate: 0 }
//       ],
//       jobWorkCost: 52000,
//       totalCost: 148000,
//       paymentStatus: 'Paid',
//       paidAmount: 148000,
//       remarks: 'Powder quality excellent'
//     },
//     {
//       id: 'JW014',
//       orderNo: 'JW-2026-014',
//       jobWorker: 'Quality Testing Labs',
//       location: 'Hyderabad, Telangana',
//       processType: 'Stability Testing',
//       product: 'Hydrogen Peroxide Stability Report',
//       orderDate: '2025-12-28',
//       deliveryDate: '2026-01-30',
//       status: 'In Progress',
//       materialsSent: [
//         { material: 'Hydrogen Peroxide 35%', quantity: 10, unit: 'Liter', rate: 140 }
//       ],
//       materialsReceived: [],
//       jobWorkCost: 25000,
//       totalCost: 26400,
//       paymentStatus: 'Pending',
//       paidAmount: 0,
//       remarks: 'Testing in progress'
//     },
//     {
//       id: 'JW015',
//       orderNo: 'JW-2025-039',
//       jobWorker: 'ChemProcess Industries',
//       location: 'Mumbai, Maharashtra',
//       processType: 'Neutralization',
//       product: 'Neutral Salt Solution',
//       orderDate: '2025-11-20',
//       deliveryDate: '2025-12-25',
//       status: 'Completed',
//       materialsSent: [
//         { material: 'Hydrochloric Acid 35%', quantity: 200, unit: 'Liter', rate: 45 },
//         { material: 'Sodium Hydroxide 50%', quantity: 140, unit: 'Kg', rate: 180 }
//       ],
//       materialsReceived: [
//         { material: 'Sodium Chloride Solution', quantity: 340, unit: 'Liter', rate: 0 }
//       ],
//       jobWorkCost: 18000,
//       totalCost: 52200,
//       paymentStatus: 'Paid',
//       paidAmount: 52200,
//       remarks: 'pH balanced perfectly'
//     },
//     {
//       id: 'JW016',
//       orderNo: 'JW-2026-016',
//       jobWorker: 'Precision Mixing Co',
//       location: 'Pune, Maharashtra',
//       processType: 'Emulsification',
//       product: 'Emulsified Wax Solution',
//       orderDate: '2025-12-30',
//       deliveryDate: '2026-01-28',
//       status: 'Pending',
//       materialsSent: [
//         { material: 'Paraffin Wax', quantity: 150, unit: 'Kg', rate: 180 },
//         { material: 'Emulsifier', quantity: 30, unit: 'Kg', rate: 650 },
//         { material: 'Deionized Water', quantity: 320, unit: 'Liter', rate: 5 }
//       ],
//       materialsReceived: [],
//       jobWorkCost: 35000,
//       totalCost: 88100,
//       paymentStatus: 'Pending',
//       paidAmount: 0,
//       remarks: 'Materials sent on 2025-12-30'
//     },
//     {
//       id: 'JW017',
//       orderNo: 'JW-2025-041',
//       jobWorker: 'PackMaster Solutions',
//       location: 'Ahmedabad, Gujarat',
//       processType: 'Bottling',
//       product: 'Ammonia Solution Bottled',
//       orderDate: '2025-12-12',
//       deliveryDate: '2026-01-14',
//       status: 'Completed',
//       materialsSent: [
//         { material: 'Ammonia Solution 25%', quantity: 500, unit: 'Liter', rate: 90 },
//         { material: 'HDPE Bottles 1L', quantity: 500, unit: 'Pcs', rate: 12 }
//       ],
//       materialsReceived: [
//         { material: 'Ammonia Solution Bottled', quantity: 500, unit: 'Bottles', rate: 0 }
//       ],
//       jobWorkCost: 12000,
//       totalCost: 63000,
//       paymentStatus: 'Paid',
//       paidAmount: 63000,
//       remarks: 'Proper sealing verified'
//     },
//     {
//       id: 'JW018',
//       orderNo: 'JW-2026-018',
//       jobWorker: 'Coating Specialists Ltd',
//       location: 'Surat, Gujarat',
//       processType: 'Micro-encapsulation',
//       product: 'Encapsulated Enzymes',
//       orderDate: '2026-01-02',
//       deliveryDate: '2026-02-05',
//       status: 'In Progress',
//       materialsSent: [
//         { material: 'Enzyme Concentrate', quantity: 50, unit: 'Kg', rate: 2500 },
//         { material: 'Coating Polymer', quantity: 25, unit: 'Kg', rate: 800 }
//       ],
//       materialsReceived: [],
//       jobWorkCost: 95000,
//       totalCost: 240000,
//       paymentStatus: 'Partial',
//       paidAmount: 120000,
//       remarks: 'Encapsulation 20% complete'
//     }
//   ];

//   // Status distribution data
//   const statusData = [
//     { status: 'Completed', count: 8, value: 1250000 },
//     { status: 'In Progress', count: 7, value: 1450000 },
//     { status: 'Pending', count: 3, value: 354100 }
//   ];

//   // Monthly job work trend
//   const monthlyTrend = [
//     { month: 'Aug 2025', orders: 12, cost: 450000 },
//     { month: 'Sep 2025', orders: 15, cost: 520000 },
//     { month: 'Oct 2025', orders: 18, cost: 580000 },
//     { month: 'Nov 2025', orders: 14, cost: 480000 },
//     { month: 'Dec 2025', orders: 20, cost: 650000 },
//     { month: 'Jan 2026', orders: 12, cost: 570000 }
//   ];

//   // Job worker performance
//   const jobWorkerPerformance = [
//     { name: 'ChemProcess Industries', orders: 4, totalCost: 560000, rating: 4.5 },
//     { name: 'Precision Mixing Co', orders: 3, totalCost: 202000, rating: 4.8 },
//     { name: 'PackMaster Solutions', orders: 3, totalCost: 467000, rating: 4.2 },
//     { name: 'FilterTech Labs', orders: 2, totalCost: 425000, rating: 4.9 },
//     { name: 'Coating Specialists Ltd', orders: 3, totalCost: 471500, rating: 4.3 },
//     { name: 'DryTech Industries', orders: 2, totalCost: 288000, rating: 4.6 },
//     { name: 'Quality Testing Labs', orders: 2, totalCost: 45150, rating: 5.0 }
//   ];

//   const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

//   // Filter job works
//   const filteredJobWorks = jobWorkOrders.filter(job => {
//     const matchesStatus = selectedStatus === 'All' || job.status === selectedStatus;
//     const matchesSearch = job.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.jobWorker.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.product.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesStatus && matchesSearch;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Completed': return 'bg-green-100 text-green-800';
//       case 'In Progress': return 'bg-yellow-100 text-yellow-800';
//       case 'Pending': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPaymentStatusColor = (status) => {
//     switch (status) {
//       case 'Paid': return 'bg-green-100 text-green-800';
//       case 'Partial': return 'bg-yellow-100 text-yellow-800';
//       case 'Pending': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen mt-10">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-black mb-2">Job Work Management</h1>
//         <p className="text-gray-600">Track outsourced manufacturing and processing operations</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Job Works</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.totalJobWorks}</p>
//             </div>
//             <Factory className="text-blue-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Active Orders</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.activeOrders}</p>
//             </div>
//             <TrendingUp className="text-green-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Pending Deliveries</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.pendingDeliveries}</p>
//             </div>
//             <Clock className="text-orange-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Value</p>
//               <p className="text-2xl font-bold text-black mt-1">₹{summary.totalValue.toLocaleString()}</p>
//             </div>
//             <DollarSign className="text-purple-500" size={32} />
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Status Distribution */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Job Work Status Distribution</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={statusData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ status, count }) => `${status}: ${count}`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="count"
//               >
//                 {statusData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Monthly Trend */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Monthly Job Work Trend</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={monthlyTrend}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis yAxisId="left" />
//               <YAxis yAxisId="right" orientation="right" />
//               <Tooltip />
//               <Legend />
//               <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} name="Orders" />
//               <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#82ca9d" strokeWidth={2} name="Cost (₹)" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Job Worker Performance */}
//       <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold text-black mb-4">Job Worker Performance</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={jobWorkerPerformance}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="orders" fill="#8884d8" name="Total Orders" />
//             <Bar dataKey="totalCost" fill="#82ca9d" name="Total Cost (₹)" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Filters */}
//       <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-black mb-2">Search Job Work</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search by order no, job worker, or product..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-black mb-2">Filter by Status</label>
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="All">All Status</option>
//               <option value="Completed">Completed</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Pending">Pending</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Job Work Orders Table */}
//       <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//         <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-black">Job Work Orders</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Order Details</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Job Worker</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Process Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Delivery Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cost</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Payment</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredJobWorks.map((job) => (
//                 <tr key={job.id} className="hover:bg-gray-100">
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-semibold text-black">{job.orderNo}</div>
//                     <div className="text-sm text-gray-600">{job.orderDate}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-medium text-black">{job.jobWorker}</div>
//                     <div className="text-sm text-gray-600">{job.location}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-black">{job.processType}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-black max-w-xs">{job.product}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-black">{job.deliveryDate}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-semibold text-black">₹{job.totalCost.toLocaleString()}</div>
//                     <div className="text-xs text-gray-600">Job: ₹{job.jobWorkCost.toLocaleString()}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(job.status)}`}>
//                       {job.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(job.paymentStatus)}`}>
//                       {job.paymentStatus}
//                     </span>
//                     <div className="text-xs text-gray-600 mt-1">₹{job.paidAmount.toLocaleString()}</div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* No Results Message */}
//       {filteredJobWorks.length === 0 && (
//         <div className="text-center py-12 bg-white border border-gray-200 rounded-lg mt-6">
//           <Package className="mx-auto text-gray-400 mb-4" size={48} />
//           <p className="text-gray-600">No job works found matching your criteria</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Jobwork;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Search, Package } from "lucide-react";
import CreateJobWorkModal from "./Createjobworkmodal";

export default function Jobwork() {
  const [jobWorks, setJobWorks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobworks");
    setJobWorks(res.data.data || []);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobWorks.filter(
    (j) =>
      j.jobWorkNo?.toLowerCase().includes(search.toLowerCase()) ||
      j.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mt-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Work Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Create Job Work
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          className="pl-10 border rounded-lg px-3 py-2 w-full"
          placeholder="Search job work..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Job No</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">GSTIN / PAN</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">{job.jobWorkNo}</td>
                <td className="p-3">{job.customerName}</td>
                <td className="p-3">{job.gstin}</td>
                <td className="p-3">
                  {new Date(job.jobWorkDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredJobs.length === 0 && (
          <div className="text-center p-6 text-gray-500">
            <Package className="mx-auto mb-2" /> No Job Work Found
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <CreateJobWorkModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchJobs}
        />
      )}
    </div>
  );
}
