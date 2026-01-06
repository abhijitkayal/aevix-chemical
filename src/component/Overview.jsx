import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Factory, Users, AlertCircle, CheckCircle, Clock, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Overview = ({ darkMode }) => {
  // Summary metrics
  const metrics = {
    totalRevenue: {
      value: '₹8,45,60,000',
      change: '+12.5%',
      trend: 'up',
      label: 'Total Revenue',
      subtext: 'This month'
    },
    totalOrders: {
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      label: 'Total Orders',
      subtext: 'This month'
    },
    productionOutput: {
      value: '45,680 L',
      change: '+15.3%',
      trend: 'up',
      label: 'Production Output',
      subtext: 'This month'
    },
    activeCustomers: {
      value: '342',
      change: '+5.8%',
      trend: 'up',
      label: 'Active Customers',
      subtext: 'This month'
    },
    pendingOrders: {
      value: '87',
      change: '-3.2%',
      trend: 'down',
      label: 'Pending Orders',
      subtext: 'In queue'
    },
    lowStockItems: {
      value: '23',
      change: '+2',
      trend: 'up',
      label: 'Low Stock Alerts',
      subtext: 'Requires attention'
    }
  };

  // Monthly revenue trend
  const monthlyRevenue = [
    { month: 'Jul', revenue: 6500000, target: 6000000 },
    { month: 'Aug', revenue: 7200000, target: 6500000 },
    { month: 'Sep', revenue: 6800000, target: 7000000 },
    { month: 'Oct', revenue: 7500000, target: 7200000 },
    { month: 'Nov', revenue: 8100000, target: 7500000 },
    { month: 'Dec', revenue: 7900000, target: 8000000 },
    { month: 'Jan', revenue: 8456000, target: 8200000 }
  ];

  // Production by category
  const productionByCategory = [
    { category: 'Acids', quantity: 18500, percentage: 40.5 },
    { category: 'Solvents', quantity: 12300, percentage: 26.9 },
    { category: 'Pigments', quantity: 7800, percentage: 17.1 },
    { category: 'Alkalis', quantity: 4200, percentage: 9.2 },
    { category: 'Others', quantity: 2880, percentage: 6.3 }
  ];

  // Order status distribution
  const orderStatus = [
    { status: 'Completed', count: 856, color: '#10b981' },
    { status: 'In Progress', count: 234, color: '#3b82f6' },
    { status: 'Pending', count: 87, color: '#f59e0b' },
    { status: 'Cancelled', count: 70, color: '#ef4444' }
  ];

  // Top selling products
  const topProducts = [
    { product: 'Hydrochloric Acid 35%', sales: 1850000, quantity: '12,500 L', trend: 'up', growth: '+18%' },
    { product: 'Sulfuric Acid 98%', sales: 1620000, quantity: '10,800 L', trend: 'up', growth: '+12%' },
    { product: 'Ethanol 95%', sales: 1420000, quantity: '9,500 L', trend: 'up', growth: '+8%' },
    { product: 'Titanium Dioxide', sales: 1280000, quantity: '3,200 kg', trend: 'down', growth: '-3%' },
    { product: 'Acetic Acid 99%', sales: 1150000, quantity: '7,600 L', trend: 'up', growth: '+15%' }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      description: 'Order #ORD-2026-1245 from ChemTrade Solutions - ₹2,85,000',
      time: '15 minutes ago',
      icon: ShoppingCart,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      type: 'production',
      title: 'Production Completed',
      description: 'Batch PRD-B-2026-045 - Hydrochloric Acid 35% (500L)',
      time: '1 hour ago',
      icon: Factory,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Low Stock Alert',
      description: 'Caustic Soda Pellets - Current: 580kg, Required: 600kg',
      time: '2 hours ago',
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Received',
      description: 'Invoice #INV-2026-0152 - TechChem Solutions (₹1,50,000)',
      time: '3 hours ago',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Dispatched',
      description: 'Order #ORD-2026-1238 to Industrial Polymers Ltd',
      time: '4 hours ago',
      icon: CheckCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 6,
      type: 'production',
      title: 'Work Order Started',
      description: 'WO-2026-015 - Acetic Acid 99% production initiated',
      time: '5 hours ago',
      icon: Factory,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  // Top customers
  const topCustomers = [
    { name: 'ChemTrade Solutions', revenue: 1850000, orders: 45, status: 'Active' },
    { name: 'Industrial Polymers Ltd', revenue: 1620000, orders: 38, status: 'Active' },
    { name: 'PharmaChem Industries', revenue: 1420000, orders: 32, status: 'Active' },
    { name: 'TechChem Solutions', revenue: 1280000, orders: 28, status: 'Active' },
    { name: 'BioTech Research Ltd', revenue: 980000, orders: 22, status: 'Active' }
  ];

  // Daily production trend (last 7 days)
  const dailyProduction = [
    { day: 'Mon', production: 6200, target: 6000 },
    { day: 'Tue', production: 6500, target: 6000 },
    { day: 'Wed', production: 6800, target: 6000 },
    { day: 'Thu', production: 6400, target: 6000 },
    { day: 'Fri', production: 7100, target: 6000 },
    { day: 'Sat', production: 6900, target: 6000 },
    { day: 'Sun', production: 5780, target: 6000 }
  ];

  // Inventory status
  const inventoryStatus = [
    { category: 'Raw Materials', value: 85, status: 'Good' },
    { category: 'Finished Goods', value: 72, status: 'Good' },
    { category: 'Packaging', value: 45, status: 'Low' },
    { category: 'Work in Progress', value: 68, status: 'Good' }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const formatCurrency = (value) => {
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  return (
    <div className={`p-6 mt-10 min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-black text-white' : 'bg-cyan-50 text-black'
    }`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Dashboard Overview</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={32} />
            <span className={`flex items-center text-sm font-semibold ${metrics.totalRevenue.trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
              {metrics.totalRevenue.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              {metrics.totalRevenue.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{metrics.totalRevenue.value}</h3>
          <p className="text-blue-100 text-sm">{metrics.totalRevenue.label}</p>
          <p className="text-blue-200 text-xs mt-1">{metrics.totalRevenue.subtext}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <ShoppingCart size={32} />
            <span className={`flex items-center text-sm font-semibold ${metrics.totalOrders.trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
              {metrics.totalOrders.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              {metrics.totalOrders.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{metrics.totalOrders.value}</h3>
          <p className="text-green-100 text-sm">{metrics.totalOrders.label}</p>
          <p className="text-green-200 text-xs mt-1">{metrics.totalOrders.subtext}</p>
        </div>

        {/* Production Output */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Factory size={32} />
            <span className={`flex items-center text-sm font-semibold ${metrics.productionOutput.trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
              {metrics.productionOutput.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              {metrics.productionOutput.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{metrics.productionOutput.value}</h3>
          <p className="text-purple-100 text-sm">{metrics.productionOutput.label}</p>
          <p className="text-purple-200 text-xs mt-1">{metrics.productionOutput.subtext}</p>
        </div>

        {/* Active Customers */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-indigo-500" size={32} />
            <span className={`flex items-center text-sm font-semibold ${metrics.activeCustomers.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.activeCustomers.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              {metrics.activeCustomers.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-black mb-1">{metrics.activeCustomers.value}</h3>
          <p className="text-gray-600 text-sm">{metrics.activeCustomers.label}</p>
          <p className="text-gray-500 text-xs mt-1">{metrics.activeCustomers.subtext}</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-orange-500" size={32} />
            <span className={`flex items-center text-sm font-semibold ${metrics.pendingOrders.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.pendingOrders.trend === 'down' ? <TrendingDown size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1" />}
              {metrics.pendingOrders.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-black mb-1">{metrics.pendingOrders.value}</h3>
          <p className="text-gray-600 text-sm">{metrics.pendingOrders.label}</p>
          <p className="text-gray-500 text-xs mt-1">{metrics.pendingOrders.subtext}</p>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="text-red-500" size={32} />
            <span className={`flex items-center text-sm font-semibold ${metrics.lowStockItems.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.lowStockItems.trend === 'down' ? <TrendingDown size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1" />}
              {metrics.lowStockItems.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-black mb-1">{metrics.lowStockItems.value}</h3>
          <p className="text-gray-600 text-sm">{metrics.lowStockItems.label}</p>
          <p className="text-gray-500 text-xs mt-1">{metrics.lowStockItems.subtext}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Monthly Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
              <Line type="monotone" dataKey="target" stroke="#10b981" strokeDasharray="5 5" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Production Trend */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Daily Production (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyProduction}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="production" fill="#8b5cf6" name="Production (L)" />
              <Line type="monotone" dataKey="target" stroke="#10b981" strokeDasharray="5 5" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Production by Category & Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Production by Category */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Production by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productionByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="quantity"
              >
                {productionByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Order Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Orders">
                {orderStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Selling Products */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{product.product}</h3>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">{formatCurrency(product.sales)}</p>
                  <span className={`flex items-center justify-end text-sm font-semibold ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {product.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {product.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Recent Activities</h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`${activity.bgColor} p-2 rounded-lg`}>
                  <activity.icon className={activity.color} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-black text-sm">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers & Inventory Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Top Customers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-3 text-sm text-black font-medium">{customer.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatCurrency(customer.revenue)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{customer.orders}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Inventory Status</h2>
          <div className="space-y-4">
            {inventoryStatus.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black">{item.category}</span>
                  <span className={`text-sm font-semibold ${item.status === 'Good' ? 'text-green-600' : 'text-orange-600'}`}>
                    {item.value}% - {item.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${item.status === 'Good' ? 'bg-green-500' : 'bg-orange-500'}`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Activity className="text-blue-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-blue-900 text-sm">Quick Insight</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Overall inventory health is good. Packaging materials need restocking within 2 weeks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
