import React, { useState } from 'react';
import { Package, Layers, DollarSign, FileText, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const BOM = () => {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Summary data
  const summary = {
    totalProducts: 12,
    totalComponents: 45,
    totalValue: 2850000,
    activeBOMs: 12
  };

  // BOM data structure
  const bomData = [
    {
      id: 'BOM001',
      productCode: 'PROD-HCL-001',
      productName: 'Hydrochloric Acid 35%',
      category: 'Acids',
      unit: 'Liter',
      batchSize: 1000,
      totalCost: 45000,
      components: [
        { code: 'RAW-HCL-001', name: 'Hydrogen Chloride Gas', quantity: 350, unit: 'Kg', rate: 80, amount: 28000, supplier: 'ChemSupply Co' },
        { code: 'RAW-H2O-001', name: 'Deionized Water', quantity: 650, unit: 'Liter', rate: 5, amount: 3250, supplier: 'Pure Water Ltd' },
        { code: 'PKG-BTL-001', name: 'HDPE Bottle 1L', quantity: 1000, unit: 'Pcs', rate: 12, amount: 12000, supplier: 'PackPro Industries' },
        { code: 'PKG-CAP-001', name: 'Safety Cap', quantity: 1000, unit: 'Pcs', rate: 1.5, amount: 1500, supplier: 'PackPro Industries' },
        { code: 'PKG-LBL-001', name: 'Warning Label', quantity: 1000, unit: 'Pcs', rate: 0.25, amount: 250, supplier: 'Label Masters' }
      ]
    },
    {
      id: 'BOM002',
      productCode: 'PROD-H2SO4-001',
      productName: 'Sulfuric Acid 98%',
      category: 'Acids',
      unit: 'Liter',
      batchSize: 2000,
      totalCost: 180000,
      components: [
        { code: 'RAW-SO3-001', name: 'Sulfur Trioxide', quantity: 1960, unit: 'Kg', rate: 75, amount: 147000, supplier: 'Sulfur Corp' },
        { code: 'RAW-H2O-001', name: 'Deionized Water', quantity: 40, unit: 'Liter', rate: 5, amount: 200, supplier: 'Pure Water Ltd' },
        { code: 'PKG-DRM-001', name: 'Acid Resistant Drum 50L', quantity: 40, unit: 'Pcs', rate: 800, amount: 32000, supplier: 'DrumTech Ltd' },
        { code: 'PKG-LBL-002', name: 'Hazard Label Large', quantity: 40, unit: 'Pcs', rate: 20, amount: 800, supplier: 'Label Masters' }
      ]
    },
    {
      id: 'BOM003',
      productCode: 'PROD-NAOH-001',
      productName: 'Sodium Hydroxide 50%',
      category: 'Alkalis',
      unit: 'Kg',
      batchSize: 500,
      totalCost: 62500,
      components: [
        { code: 'RAW-NAOH-001', name: 'Caustic Soda Pellets', quantity: 250, unit: 'Kg', rate: 180, amount: 45000, supplier: 'Alkali Industries' },
        { code: 'RAW-H2O-001', name: 'Deionized Water', quantity: 250, unit: 'Liter', rate: 5, amount: 1250, supplier: 'Pure Water Ltd' },
        { code: 'PKG-BTL-002', name: 'Chemical Grade Bottle 5L', quantity: 100, unit: 'Pcs', rate: 150, amount: 15000, supplier: 'PackPro Industries' },
        { code: 'PKG-CAP-002', name: 'Tamper Proof Cap', quantity: 100, unit: 'Pcs', rate: 12.5, amount: 1250, supplier: 'PackPro Industries' }
      ]
    },
    {
      id: 'BOM004',
      productCode: 'PROD-TIO2-001',
      productName: 'Titanium Dioxide Pigment',
      category: 'Pigments',
      unit: 'Kg',
      batchSize: 1000,
      totalCost: 550000,
      components: [
        { code: 'RAW-ILMN-001', name: 'Ilmenite Ore', quantity: 1500, unit: 'Kg', rate: 150, amount: 225000, supplier: 'Mineral Traders' },
        { code: 'RAW-H2SO4-002', name: 'Sulfuric Acid 95%', quantity: 2000, unit: 'Liter', rate: 90, amount: 180000, supplier: 'AcidChem Ltd' },
        { code: 'RAW-COAL-001', name: 'Activated Carbon', quantity: 50, unit: 'Kg', rate: 800, amount: 40000, supplier: 'Carbon Solutions' },
        { code: 'PKG-BAG-001', name: 'Multi-layer Paper Bag 25Kg', quantity: 40, unit: 'Pcs', rate: 125, amount: 5000, supplier: 'PackSafe Corp' },
        { code: 'PKG-LNR-001', name: 'Plastic Liner', quantity: 40, unit: 'Pcs', rate: 50, amount: 2000, supplier: 'PackSafe Corp' },
        { code: 'PKG-LBL-003', name: 'Product Label', quantity: 40, unit: 'Pcs', rate: 50, amount: 2000, supplier: 'Label Masters' }
      ]
    },
    {
      id: 'BOM005',
      productCode: 'PROD-ACET-001',
      productName: 'Acetic Acid 99%',
      category: 'Acids',
      unit: 'Liter',
      batchSize: 1500,
      totalCost: 195000,
      components: [
        { code: 'RAW-METH-001', name: 'Methanol', quantity: 800, unit: 'Liter', rate: 120, amount: 96000, supplier: 'Methanol Corp' },
        { code: 'RAW-COCAT-001', name: 'Cobalt Catalyst', quantity: 5, unit: 'Kg', rate: 8000, amount: 40000, supplier: 'Catalyst Tech' },
        { code: 'PKG-DRM-002', name: 'Stainless Steel Drum 200L', quantity: 8, unit: 'Pcs', rate: 7000, amount: 56000, supplier: 'DrumTech Ltd' },
        { code: 'PKG-LBL-004', name: 'Corrosive Label', quantity: 8, unit: 'Pcs', rate: 25, amount: 200, supplier: 'Label Masters' },
        { code: 'PKG-SEAL-001', name: 'Safety Seal', quantity: 8, unit: 'Pcs', rate: 100, amount: 800, supplier: 'DrumTech Ltd' }
      ]
    },
    {
      id: 'BOM006',
      productCode: 'PROD-CACO3-001',
      productName: 'Calcium Carbonate Powder',
      category: 'Salts',
      unit: 'Kg',
      batchSize: 2000,
      totalCost: 140000,
      components: [
        { code: 'RAW-LIME-001', name: 'Limestone Powder', quantity: 2200, unit: 'Kg', rate: 45, amount: 99000, supplier: 'Mineral Traders' },
        { code: 'RAW-H2O-001', name: 'Deionized Water', quantity: 500, unit: 'Liter', rate: 5, amount: 2500, supplier: 'Pure Water Ltd' },
        { code: 'RAW-CO2-001', name: 'Carbon Dioxide', quantity: 100, unit: 'Kg', rate: 80, amount: 8000, supplier: 'Gas Suppliers Inc' },
        { code: 'PKG-BAG-002', name: 'PP Woven Bag 50Kg', quantity: 40, unit: 'Pcs', rate: 75, amount: 3000, supplier: 'PackSafe Corp' },
        { code: 'PKG-LBL-005', name: 'Product Sticker', quantity: 40, unit: 'Pcs', rate: 12.5, amount: 500, supplier: 'Label Masters' }
      ]
    },
    {
      id: 'BOM007',
      productCode: 'PROD-NH3-001',
      productName: 'Ammonia Solution 25%',
      category: 'Alkalis',
      unit: 'Liter',
      batchSize: 3000,
      totalCost: 270000,
      components: [
        { code: 'RAW-NH3G-001', name: 'Ammonia Gas', quantity: 750, unit: 'Kg', rate: 280, amount: 210000, supplier: 'Gas Suppliers Inc' },
        { code: 'RAW-H2O-001', name: 'Deionized Water', quantity: 2250, unit: 'Liter', rate: 5, amount: 11250, supplier: 'Pure Water Ltd' },
        { code: 'PKG-BTL-003', name: 'HDPE Jerry Can 20L', quantity: 150, unit: 'Pcs', rate: 320, amount: 48000, supplier: 'PackPro Industries' },
        { code: 'PKG-CAP-003', name: 'Vented Cap', quantity: 150, unit: 'Pcs', rate: 5, amount: 750, supplier: 'PackPro Industries' }
      ]
    },
    {
      id: 'BOM008',
      productCode: 'PROD-FECL3-001',
      productName: 'Ferric Chloride 40%',
      category: 'Salts',
      unit: 'Liter',
      batchSize: 800,
      totalCost: 96000,
      components: [
        { code: 'RAW-FE2O3-001', name: 'Iron Oxide', quantity: 280, unit: 'Kg', rate: 180, amount: 50400, supplier: 'Oxide Materials' },
        { code: 'RAW-HCL-002', name: 'Hydrochloric Acid 37%', quantity: 400, unit: 'Liter', rate: 85, amount: 34000, supplier: 'AcidChem Ltd' },
        { code: 'RAW-H2O-001', name: 'Deionized Water', quantity: 120, unit: 'Liter', rate: 5, amount: 600, supplier: 'Pure Water Ltd' },
        { code: 'PKG-BTL-004', name: 'Amber Glass Bottle 5L', quantity: 160, unit: 'Pcs', rate: 65, amount: 10400, supplier: 'GlassTech Ltd' },
        { code: 'PKG-CAP-004', name: 'Screw Cap with Dropper', quantity: 160, unit: 'Pcs', rate: 3.75, amount: 600, supplier: 'GlassTech Ltd' }
      ]
    },
    {
      id: 'BOM009',
      productCode: 'PROD-H2O2-001',
      productName: 'Hydrogen Peroxide 35%',
      category: 'Oxidizers',
      unit: 'Liter',
      batchSize: 1200,
      totalCost: 168000,
      components: [
        { code: 'RAW-H2O2C-001', name: 'H2O2 Concentrate 70%', quantity: 600, unit: 'Liter', rate: 250, amount: 150000, supplier: 'Peroxide Corp' },
        { code: 'RAW-H2O-001', name: 'Deionized Water', quantity: 600, unit: 'Liter', rate: 5, amount: 3000, supplier: 'Pure Water Ltd' },
        { code: 'PKG-BTL-005', name: 'Dark HDPE Bottle 1L', quantity: 1200, unit: 'Pcs', rate: 12, amount: 14400, supplier: 'PackPro Industries' },
        { code: 'PKG-CAP-005', name: 'Vented Safety Cap', quantity: 1200, unit: 'Pcs', rate: 0.5, amount: 600, supplier: 'PackPro Industries' }
      ]
    },
    {
      id: 'BOM010',
      productCode: 'PROD-SILICA-001',
      productName: 'Silica Gel Desiccant',
      category: 'Desiccants',
      unit: 'Kg',
      batchSize: 500,
      totalCost: 87500,
      components: [
        { code: 'RAW-SILSOL-001', name: 'Sodium Silicate Solution', quantity: 300, unit: 'Liter', rate: 120, amount: 36000, supplier: 'Silicate Industries' },
        { code: 'RAW-H2SO4-003', name: 'Sulfuric Acid 50%', quantity: 200, unit: 'Liter', rate: 60, amount: 12000, supplier: 'AcidChem Ltd' },
        { code: 'RAW-H2O-001', name: 'Deionized Water', quantity: 100, unit: 'Liter', rate: 5, amount: 500, supplier: 'Pure Water Ltd' },
        { code: 'PKG-BAG-003', name: 'Breathable Tyvek Pouch 1Kg', quantity: 500, unit: 'Pcs', rate: 75, amount: 37500, supplier: 'PackSafe Corp' },
        { code: 'PKG-LBL-006', name: 'Moisture Indicator Label', quantity: 500, unit: 'Pcs', support: 3, amount: 1500, supplier: 'Label Masters' }
      ]
    },
    {
      id: 'BOM011',
      productCode: 'PROD-PHBUF-001',
      productName: 'pH Buffer Solution 7.0',
      category: 'Solutions',
      unit: 'Liter',
      batchSize: 1000,
      totalCost: 75000,
      components: [
        { code: 'RAW-KH2PO4-001', name: 'Potassium Phosphate Monobasic', quantity: 6.8, unit: 'Kg', rate: 450, amount: 3060, supplier: 'Fine Chemicals Ltd' },
        { code: 'RAW-NA2HPO4-001', name: 'Sodium Phosphate Dibasic', quantity: 5.8, unit: 'Kg', rate: 420, amount: 2436, supplier: 'Fine Chemicals Ltd' },
        { code: 'RAW-H2O-001', name: 'Deionized Water', quantity: 1000, unit: 'Liter', rate: 5, amount: 5000, supplier: 'Pure Water Ltd' },
        { code: 'PKG-BTL-006', name: 'Amber Glass Bottle 500ml', quantity: 2000, unit: 'Pcs', rate: 32, amount: 64000, supplier: 'GlassTech Ltd' },
        { code: 'PKG-CAP-006', name: 'Precision Cap', quantity: 2000, unit: 'Pcs', rate: 0.25, amount: 500, supplier: 'GlassTech Ltd' },
        { code: 'PKG-LBL-007', name: 'pH Calibration Label', quantity: 2000, unit: 'Pcs', rate: 0.002, amount: 4, supplier: 'Label Masters' }
      ]
    },
    {
      id: 'BOM012',
      productCode: 'PROD-ETOH-001',
      productName: 'Ethanol 95% Denatured',
      category: 'Solvents',
      unit: 'Liter',
      batchSize: 2000,
      totalCost: 220000,
      components: [
        { code: 'RAW-ETOH-001', name: 'Ethanol 99.9%', quantity: 1900, unit: 'Liter', rate: 100, amount: 190000, supplier: 'Ethanol Distillers' },
        { code: 'RAW-METH-002', name: 'Methanol (Denaturant)', quantity: 100, unit: 'Liter', rate: 120, amount: 12000, supplier: 'Methanol Corp' },
        { code: 'PKG-DRM-003', name: 'UN Certified Drum 200L', quantity: 10, unit: 'Pcs', rate: 1750, amount: 17500, supplier: 'DrumTech Ltd' },
        { code: 'PKG-LBL-008', name: 'Flammable Warning Label', quantity: 10, unit: 'Pcs', rate: 50, amount: 500, supplier: 'Label Masters' }
      ]
    }
  ];

  // Cost breakdown by category
  const categoryData = [
    { category: 'Acids', value: 420000, count: 3 },
    { category: 'Alkalis', value: 332500, count: 2 },
    { category: 'Pigments', value: 550000, count: 1 },
    { category: 'Salts', value: 236000, count: 2 },
    { category: 'Oxidizers', value: 168000, count: 1 },
    { category: 'Desiccants', value: 87500, count: 1 },
    { category: 'Solutions', value: 75000, count: 1 },
    { category: 'Solvents', value: 220000, count: 1 }
  ];

  // Top components by cost
  const topComponentsData = [
    { name: 'Ethanol 99.9%', cost: 190000 },
    { name: 'Sulfur Trioxide', cost: 147000 },
    { name: 'H2O2 Concentrate', cost: 150000 },
    { name: 'Ilmenite Ore', cost: 225000 },
    { name: 'Ammonia Gas', cost: 210000 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D'];

  // Filter BOM data
  const filteredBOM = bomData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleProduct = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  return (
    <div className="p-6 min-h-screen mt-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">Bill of Materials (BOM)</h1>
        <p className="text-gray-600">Manage product compositions and component requirements</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.totalProducts}</p>
            </div>
            <Package className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Components</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.totalComponents}</p>
            </div>
            <Layers className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total BOM Value</p>
              <p className="text-2xl font-bold text-black mt-1">₹{summary.totalValue.toLocaleString()}</p>
            </div>
            <DollarSign className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active BOMs</p>
              <p className="text-2xl font-bold text-black mt-1">{summary.activeBOMs}</p>
            </div>
            <FileText className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cost by Category */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">BOM Value by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Total Value (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Components by Cost */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-black mb-4">Top 5 Most Expensive Components</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topComponentsData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="cost" fill="#82ca9d" name="Cost (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Search Product</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by product name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Acids">Acids</option>
              <option value="Alkalis">Alkalis</option>
              <option value="Pigments">Pigments</option>
              <option value="Salts">Salts</option>
              <option value="Oxidizers">Oxidizers</option>
              <option value="Desiccants">Desiccants</option>
              <option value="Solutions">Solutions</option>
              <option value="Solvents">Solvents</option>
            </select>
          </div>
        </div>
      </div>

      {/* BOM List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-black">Bill of Materials List</h2>
          <p className="text-sm text-gray-600 mt-1">Click on any product to view detailed component breakdown</p>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredBOM.map((bom) => (
            <div key={bom.id} className="bg-white">
              {/* Product Header */}
              <div
                className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleProduct(bom.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {expandedProduct === bom.id ? (
                      <ChevronDown className="text-gray-500" size={20} />
                    ) : (
                      <ChevronRight className="text-gray-500" size={20} />
                    )}
                    <div>
                      <h3 className="font-semibold text-black text-lg">{bom.productName}</h3>
                      <p className="text-sm text-gray-600">{bom.productCode} | {bom.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium text-black">{bom.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Batch Size</p>
                      <p className="font-medium text-black">{bom.batchSize} {bom.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Cost</p>
                      <p className="font-bold text-black">₹{bom.totalCost.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Details (Expanded) */}
              {expandedProduct === bom.id && (
                <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
                  <h4 className="font-semibold text-black mb-3">Component Breakdown</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Component Code</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Component Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Unit</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Rate (₹)</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Amount (₹)</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Supplier</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bom.components.map((component, idx) => (
                          <tr key={idx} className="hover:bg-gray-100">
                            <td className="px-4 py-3 text-sm text-black font-mono">{component.code}</td>
                            <td className="px-4 py-3 text-sm text-black">{component.name}</td>
                            <td className="px-4 py-3 text-sm text-black">{component.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{component.unit}</td>
                            <td className="px-4 py-3 text-sm text-black">{component.rate}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-black">{component.amount.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{component.supplier}</td>
                          </tr>
                        ))}
                        <tr className="bg-blue-50 font-semibold">
                          <td colSpan="5" className="px-4 py-3 text-sm text-right text-black">Total BOM Cost:</td>
                          <td className="px-4 py-3 text-sm text-black">₹{bom.totalCost.toLocaleString()}</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* No Results Message */}
      {filteredBOM.length === 0 && (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg mt-6">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No BOMs found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default BOM;
