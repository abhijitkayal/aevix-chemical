import React, { useState } from 'react';
import { Users, DollarSign, TrendingUp, Award, Search, Filter, Calendar, Download, Plus, Eye, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Agentcommition = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Summary data
  const summary = {
    totalAgents: 12,
    totalCommission: 1245000,
    thisMonth: 385000,
    pendingPayment: 125000
  };

  // Commission by agent
  const agentCommissionData = [
    { name: 'Rajesh Kumar', value: 285000, sales: 5700000 },
    { name: 'Amit Sharma', value: 245000, sales: 4900000 },
    { name: 'Priya Desai', value: 210000, sales: 4200000 },
    { name: 'Vijay Patel', value: 185000, sales: 3700000 },
    { name: 'Others', value: 320000, sales: 6400000 }
  ];

  // Monthly trend
  const monthlyTrend = [
    { month: 'Aug', commission: 285000 },
    { month: 'Sep', commission: 315000 },
    { month: 'Oct', commission: 340000 },
    { month: 'Nov', commission: 365000 },
    { month: 'Dec', commission: 425000 },
    { month: 'Jan', commission: 385000 }
  ];

  // Hardcoded agent commission data
  const commissions = [
    {
      id: 1,
      agentId: 'AGT-001',
      agentName: 'Rajesh Kumar',
      region: 'Mumbai',
      phone: '+91-98765-12345',
      email: 'rajesh.kumar@example.com',
      period: 'January 2026',
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      totalSales: 1250000,
      commissionRate: 5,
      commissionAmount: 62500,
      tds: 6250,
      netPayable: 56250,
      salesCount: 15,
      status: 'Pending',
      paymentDate: null,
      deals: [
        { customer: 'ChemTrade Solutions', invoiceNo: 'INV-2026-0158', amount: 336300, commission: 16815 },
        { customer: 'Industrial Polymers Ltd', invoiceNo: 'INV-2026-0157', amount: 205320, commission: 10266 },
        { customer: 'PharmaChem Industries', invoiceNo: 'INV-2026-0156', amount: 205320, commission: 10266 },
        { customer: 'TechChem Solutions', invoiceNo: 'INV-2026-0155', amount: 177000, commission: 8850 },
        { customer: 'Green Chemicals Ltd', invoiceNo: 'INV-2025-0151', amount: 136408, commission: 6820 },
        { customer: 'Other Sales', invoiceNo: 'Multiple', amount: 189652, commission: 9483 }
      ],
      remarks: 'Outstanding performance in January'
    },
    {
      id: 2,
      agentId: 'AGT-002',
      agentName: 'Amit Sharma',
      region: 'Delhi',
      phone: '+91-98765-23456',
      email: 'amit.sharma@example.com',
      period: 'January 2026',
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      totalSales: 980000,
      commissionRate: 4.5,
      commissionAmount: 44100,
      tds: 4410,
      netPayable: 39690,
      salesCount: 12,
      status: 'Pending',
      paymentDate: null,
      deals: [
        { customer: 'BioTech Research Ltd', invoiceNo: 'INV-2025-0154', amount: 162840, commission: 7328 },
        { customer: 'ChemCore Industries', invoiceNo: 'INV-2025-0153', amount: 100890, commission: 4540 },
        { customer: 'Polymer Solutions Inc', invoiceNo: 'INV-2025-0152', amount: 121835, commission: 5483 },
        { customer: 'Apex Chemical Works', invoiceNo: 'INV-2025-0150', amount: 175171, commission: 7883 },
        { customer: 'Crystal Pharma Ltd', invoiceNo: 'INV-2025-0149', amount: 145848, commission: 6563 },
        { customer: 'Other Sales', invoiceNo: 'Multiple', amount: 273416, commission: 12304 }
      ],
      remarks: 'Good performance in Delhi region'
    },
    {
      id: 3,
      agentId: 'AGT-003',
      agentName: 'Priya Desai',
      region: 'Pune',
      phone: '+91-98765-34567',
      email: 'priya.desai@example.com',
      period: 'January 2026',
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      totalSales: 1150000,
      commissionRate: 5.5,
      commissionAmount: 63250,
      tds: 6325,
      netPayable: 56925,
      salesCount: 18,
      status: 'Pending',
      paymentDate: null,
      deals: [
        { customer: 'United Chemicals Corp', invoiceNo: 'INV-2025-0148', amount: 209450, commission: 11520 },
        { customer: 'Metro Paints & Coatings', invoiceNo: 'INV-2025-0147', amount: 237180, commission: 13045 },
        { customer: 'Prime Solvents Ltd', invoiceNo: 'INV-2025-0146', amount: 207975, commission: 11439 },
        { customer: 'Synergy Chemicals', invoiceNo: 'INV-2025-0145', amount: 182900, commission: 10060 },
        { customer: 'Spectrum Dyes & Pigments', invoiceNo: 'INV-2025-0144', amount: 139240, commission: 7658 },
        { customer: 'Other Sales', invoiceNo: 'Multiple', amount: 173255, commission: 9529 }
      ],
      remarks: 'Highest commission rate - Top performer'
    },
    {
      id: 4,
      agentId: 'AGT-004',
      agentName: 'Vijay Patel',
      region: 'Ahmedabad',
      phone: '+91-98765-45678',
      email: 'vijay.patel@example.com',
      period: 'December 2025',
      startDate: '2025-12-01',
      endDate: '2025-12-31',
      totalSales: 1580000,
      commissionRate: 5,
      commissionAmount: 79000,
      tds: 7900,
      netPayable: 71100,
      salesCount: 22,
      status: 'Paid',
      paymentDate: '2026-01-02',
      deals: [
        { customer: 'Global Reagents Inc', invoiceNo: 'INV-2025-0143', amount: 94990, commission: 4750 },
        { customer: 'Gujarat Chemical Hub', invoiceNo: 'INV-2025-0135', amount: 285000, commission: 14250 },
        { customer: 'Rajasthan Minerals', invoiceNo: 'INV-2025-0128', amount: 385000, commission: 19250 },
        { customer: 'Vadodara Polymers', invoiceNo: 'INV-2025-0122', amount: 245000, commission: 12250 },
        { customer: 'Surat Chemical Traders', invoiceNo: 'INV-2025-0118', amount: 325000, commission: 16250 },
        { customer: 'Other Sales', invoiceNo: 'Multiple', amount: 245010, commission: 12250 }
      ],
      remarks: 'December commission paid on time'
    },
    {
      id: 5,
      agentId: 'AGT-005',
      agentName: 'Sneha Kulkarni',
      region: 'Bangalore',
      phone: '+91-98765-56789',
      email: 'sneha.kulkarni@example.com',
      period: 'December 2025',
      startDate: '2025-12-01',
      endDate: '2025-12-31',
      totalSales: 925000,
      commissionRate: 4,
      commissionAmount: 37000,
      tds: 3700,
      netPayable: 33300,
      salesCount: 14,
      status: 'Paid',
      paymentDate: '2026-01-02',
      deals: [
        { customer: 'Bangalore Pharma Ltd', invoiceNo: 'INV-2025-0142', amount: 185000, commission: 7400 },
        { customer: 'Karnataka Chemicals', invoiceNo: 'INV-2025-0138', amount: 225000, commission: 9000 },
        { customer: 'Silicon City Solutions', invoiceNo: 'INV-2025-0132', amount: 165000, commission: 6600 },
        { customer: 'Mysore Industries', invoiceNo: 'INV-2025-0125', amount: 145000, commission: 5800 },
        { customer: 'Hubli Traders', invoiceNo: 'INV-2025-0119', amount: 105000, commission: 4200 },
        { customer: 'Other Sales', invoiceNo: 'Multiple', amount: 100000, commission: 4000 }
      ],
      remarks: 'Steady performance in South region'
    },
    {
      id: 6,
      agentId: 'AGT-006',
      agentName: 'Arun Singh',
      region: 'Kolkata',
      phone: '+91-98765-67890',
      email: 'arun.singh@example.com',
      period: 'December 2025',
      startDate: '2025-12-01',
      endDate: '2025-12-31',
      totalSales: 1280000,
      commissionRate: 4.5,
      commissionAmount: 57600,
      tds: 5760,
      netPayable: 51840,
      salesCount: 16,
      status: 'Paid',
      paymentDate: '2026-01-02',
      deals: [
        { customer: 'Bengal Chemical Works', invoiceNo: 'INV-2025-0141', amount: 265000, commission: 11925 },
        { customer: 'Howrah Industries', invoiceNo: 'INV-2025-0136', amount: 325000, commission: 14625 },
        { customer: 'Durgapur Steel Plant', invoiceNo: 'INV-2025-0130', amount: 285000, commission: 12825 },
        { customer: 'Asansol Traders', invoiceNo: 'INV-2025-0124', amount: 165000, commission: 7425 },
        { customer: 'Siliguri Chemicals', invoiceNo: 'INV-2025-0117', amount: 125000, commission: 5625 },
        { customer: 'Other Sales', invoiceNo: 'Multiple', amount: 115000, commission: 5175 }
      ],
      remarks: 'East region expansion successful'
    },
    {
      id: 7,
      agentId: 'AGT-007',
      agentName: 'Neha Reddy',
      region: 'Hyderabad',
      phone: '+91-98765-78901',
      email: 'neha.reddy@example.com',
      period: 'November 2025',
      startDate: '2025-11-01',
      endDate: '2025-11-30',
      totalSales: 1450000,
      commissionRate: 5,
      commissionAmount: 72500,
      tds: 7250,
      netPayable: 65250,
      salesCount: 20,
      status: 'Paid',
      paymentDate: '2025-12-05',
      deals: [
        { customer: 'Telangana Pharmaceuticals', invoiceNo: 'INV-2025-0115', amount: 385000, commission: 19250 },
        { customer: 'Secunderabad Chemicals', invoiceNo: 'INV-2025-0110', amount: 295000, commission: 14750 },
        { customer: 'Nizamabad Industries', invoiceNo: 'INV-2025-0105', amount: 245000, commission: 12250 },
        { customer: 'Warangal Traders', invoiceNo: 'INV-2025-0098', amount: 185000, commission: 9250 },
        { customer: 'Karimnagar Solutions', invoiceNo: 'INV-2025-0092', amount: 165000, commission: 8250 },
        { customer: 'Other Sales', invoiceNo: 'Multiple', amount: 175000, commission: 8750 }
      ],
      remarks: 'November commission settled'
    },
    {
      id: 8,
      agentId: 'AGT-008',
      agentName: 'Karan Mehta',
      region: 'Surat',
      phone: '+91-98765-89012',
      email: 'karan.mehta@example.com',
      period: 'November 2025',
      startDate: '2025-11-01',
      endDate: '2025-11-30',
      totalSales: 780000,
      commissionRate: 4,
      commissionAmount: 31200,
      tds: 3120,
      netPayable: 28080,
      salesCount: 10,
      status: 'Paid',
      paymentDate: '2025-12-05',
      deals: [
        { customer: 'Surat Textile Chemicals', invoiceNo: 'INV-2025-0114', amount: 185000, commission: 7400 },
        { customer: 'Diamond City Traders', invoiceNo: 'INV-2025-0108', amount: 165000, commission: 6600 },
        { customer: 'Navsari Industries', invoiceNo: 'INV-2025-0102', amount: 145000, commission: 5800 },
        { customer: 'Valsad Chemicals', invoiceNo: 'INV-2025-0096', amount: 125000, commission: 5000 },
        { customer: 'Bardoli Solutions', invoiceNo: 'INV-2025-0089', amount: 85000, commission: 3400 },
        { customer: 'Other Sales', invoiceNo: 'Multiple', amount: 75000, commission: 3000 }
      ],
      remarks: 'Consistent performance'
    }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  // Filter commissions
  const filteredCommissions = commissions.filter(comm => {
    const matchesSearch = comm.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPeriod === 'All' || comm.period === filterPeriod;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  return (
    <div className="p-6 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Award className="text-indigo-600" size={36} />
            Agent Commission Calculation
          </h1>
          <p className="text-gray-600 mt-1">Calculate and track sales agent commissions based on performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-gray-800">{summary.totalAgents}</p>
              </div>
              <Users className="text-indigo-600" size={40} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Commission</p>
                <p className="text-2xl font-bold text-indigo-600">₹{(summary.totalCommission / 100000).toFixed(2)}L</p>
              </div>
              <DollarSign className="text-indigo-600" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-blue-600">₹{(summary.thisMonth / 100000).toFixed(2)}L</p>
              </div>
              <TrendingUp className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payment</p>
                <p className="text-2xl font-bold text-yellow-600">₹{(summary.pendingPayment / 100000).toFixed(2)}L</p>
              </div>
              <Clock className="text-yellow-600" size={40} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Agent Commission Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Top Agents by Commission</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={agentCommissionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {agentCommissionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Commission Trend */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Monthly Commission Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)}L`} />
                <Legend />
                <Line type="monotone" dataKey="commission" stroke="#6366f1" strokeWidth={2} name="Commission" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by agent name, ID, or region..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterPeriod('All')}
                className={`px-4 py-2 rounded-lg font-medium ${filterPeriod === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterPeriod('January 2026')}
                className={`px-4 py-2 rounded-lg font-medium ${filterPeriod === 'January 2026' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Jan 2026
              </button>
              <button
                onClick={() => setFilterPeriod('December 2025')}
                className={`px-4 py-2 rounded-lg font-medium ${filterPeriod === 'December 2025' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Dec 2025
              </button>
              <button
                onClick={() => setFilterPeriod('November 2025')}
                className={`px-4 py-2 rounded-lg font-medium ${filterPeriod === 'November 2025' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Nov 2025
              </button>
            </div>

            {/* <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <Plus size={20} />
              Calculate Commission
            </button> */}
          </div>
        </div>

        {/* Commission Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left">Agent ID</th>
                  <th className="p-3 text-left">Agent Name</th>
                  <th className="p-3 text-left">Region</th>
                  <th className="p-3 text-left">Period</th>
                  <th className="p-3 text-right">Total Sales</th>
                  <th className="p-3 text-center">Rate %</th>
                  <th className="p-3 text-right">Commission</th>
                  <th className="p-3 text-right">Net Payable</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommissions.map((comm) => (
                  <tr key={comm.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm font-semibold text-indigo-700">{comm.agentId}</td>
                    <td className="p-3">
                      <div className="font-medium">{comm.agentName}</div>
                      <div className="text-xs text-gray-500">{comm.salesCount} deals</div>
                    </td>
                    <td className="p-3 text-sm">{comm.region}</td>
                    <td className="p-3 text-sm">{comm.period}</td>
                    <td className="p-3 text-right font-semibold">₹{comm.totalSales.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-semibold text-sm">{comm.commissionRate}%</span>
                    </td>
                    <td className="p-3 text-right font-semibold text-indigo-700">₹{comm.commissionAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-bold text-green-700">₹{comm.netPayable.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        comm.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {comm.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleViewDetails(comm)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commission Details Modal */}
        {showModal && selectedAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b bg-indigo-600 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">Commission Statement</h2>
                    <p className="text-indigo-100">{selectedAgent.agentName} - {selectedAgent.period}</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white hover:text-gray-200"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Agent Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm text-gray-600">Agent ID</label>
                    <p className="font-semibold">{selectedAgent.agentId}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Region</label>
                    <p className="font-semibold">{selectedAgent.region}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="font-medium">{selectedAgent.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <p className="font-medium">{selectedAgent.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Period</label>
                    <p className="font-semibold">{selectedAgent.startDate} to {selectedAgent.endDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <p className={`font-semibold ${selectedAgent.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {selectedAgent.status}
                    </p>
                  </div>
                </div>

                {/* Sales Breakdown */}
                <div className="border-t pt-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Sales Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left">Customer</th>
                          <th className="p-2 text-left">Invoice No</th>
                          <th className="p-2 text-right">Sale Amount</th>
                          <th className="p-2 text-right">Commission</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedAgent.deals.map((deal, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{deal.customer}</td>
                            <td className="p-2 font-mono text-xs">{deal.invoiceNo}</td>
                            <td className="p-2 text-right">₹{deal.amount.toLocaleString('en-IN')}</td>
                            <td className="p-2 text-right font-semibold text-indigo-700">₹{deal.commission.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Commission Calculation */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Commission Calculation</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm text-gray-600">Total Sales</label>
                        <p className="text-xl font-bold">₹{selectedAgent.totalSales.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Commission Rate</label>
                        <p className="text-xl font-bold text-blue-600">{selectedAgent.commissionRate}%</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between py-2 text-sm">
                        <span className="text-gray-700">Gross Commission</span>
                        <span className="font-semibold">₹{selectedAgent.commissionAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between py-2 text-sm">
                        <span className="text-gray-700">TDS (10%)</span>
                        <span className="font-semibold text-red-600">- ₹{selectedAgent.tds.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between py-3 text-lg font-bold bg-indigo-50 px-3 rounded mt-2">
                        <span className="text-indigo-900">Net Payable</span>
                        <span className="text-green-700">₹{selectedAgent.netPayable.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                {selectedAgent.remarks && (
                  <div className="border-t pt-4 mt-4">
                    <label className="text-sm text-gray-600">Remarks</label>
                    <p className="font-medium bg-blue-50 p-3 rounded border-l-4 border-blue-400">{selectedAgent.remarks}</p>
                  </div>
                )}

                {/* Payment Info */}
                {selectedAgent.paymentDate && (
                  <div className="border-t pt-4 mt-4">
                    <label className="text-sm text-gray-600">Payment Date</label>
                    <p className="font-semibold text-green-600">{selectedAgent.paymentDate}</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Download size={18} />
                  Download Statement
                </button>
                {selectedAgent.status === 'Pending' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                    <CheckCircle size={18} />
                    Mark as Paid
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agentcommition;
