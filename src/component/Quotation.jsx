// import React, { useState } from 'react';
// import { FileText, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, Search, Filter, Download, Eye, Send, Calendar, Copy, Edit } from 'lucide-react';
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const Quotation = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('All');
//   const [selectedQuotation, setSelectedQuotation] = useState(null);

//   // Summary data
//   const summary = {
//     totalQuotations: 235,
//     activeQuotations: 58,
//     convertedQuotations: 142,
//     totalValue: 15680000,
//     conversionRate: 60.4
//   };

//   // Quotation data
//   const quotations = [
//     {
//       id: 'QUO-2026-0235',
//       quotationNo: 'QUO-2026-0235',
//       date: '2026-01-05',
//       validUntil: '2026-02-04',
//       customer: 'PharmaChem Industries',
//       customerId: 'CUST-1003',
//       contactPerson: 'Dr. Rajesh Kumar',
//       email: 'rajesh@pharmachem.com',
//       phone: '+91 98765 43210',
//       items: [
//         { product: 'Ethanol 95%', quantity: '1000 L', rate: 180, amount: 180000, taxRate: 18 },
//         { product: 'Isopropyl Alcohol 99%', quantity: '500 L', rate: 220, amount: 110000, taxRate: 18 }
//       ],
//       subtotal: 290000,
//       tax: 52200,
//       totalAmount: 342200,
//       status: 'Sent',
//       sentDate: '2026-01-05',
//       remarks: 'Regular customer - Priority delivery available',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 7 days. Prices valid for 30 days.'
//     },
//     {
//       id: 'QUO-2026-0234',
//       quotationNo: 'QUO-2026-0234',
//       date: '2026-01-04',
//       validUntil: '2026-02-03',
//       customer: 'TechChem Solutions',
//       customerId: 'CUST-1004',
//       contactPerson: 'Ms. Priya Sharma',
//       email: 'priya@techchem.com',
//       phone: '+91 98765 43211',
//       items: [
//         { product: 'Hydrochloric Acid 35%', quantity: '800 L', rate: 450, amount: 360000, taxRate: 18 },
//         { product: 'Sulfuric Acid 98%', quantity: '600 L', rate: 200, amount: 120000, taxRate: 18 }
//       ],
//       subtotal: 480000,
//       tax: 86400,
//       totalAmount: 566400,
//       status: 'Accepted',
//       sentDate: '2026-01-04',
//       acceptedDate: '2026-01-05',
//       remarks: 'Bulk order discount applied - 5%',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 5 days. Free delivery for orders above ₹500,000.'
//     },
//     {
//       id: 'QUO-2026-0233',
//       quotationNo: 'QUO-2026-0233',
//       date: '2026-01-03',
//       validUntil: '2026-02-02',
//       customer: 'Industrial Polymers Ltd',
//       customerId: 'CUST-1002',
//       contactPerson: 'Mr. Amit Patel',
//       email: 'amit@indpoly.com',
//       phone: '+91 98765 43212',
//       items: [
//         { product: 'Acetic Acid 99%', quantity: '1200 L', rate: 150, amount: 180000, taxRate: 18 },
//         { product: 'Formaldehyde 37%', quantity: '400 L', rate: 195, amount: 78000, taxRate: 18 }
//       ],
//       subtotal: 258000,
//       tax: 46440,
//       totalAmount: 304440,
//       status: 'Sent',
//       sentDate: '2026-01-03',
//       remarks: 'Long-term customer - Special pricing',
//       termsAndConditions: 'Payment: 45 days credit. Delivery: Within 10 days.'
//     },
//     {
//       id: 'QUO-2026-0232',
//       quotationNo: 'QUO-2026-0232',
//       date: '2026-01-02',
//       validUntil: '2026-02-01',
//       customer: 'BioTech Research Ltd',
//       customerId: 'CUST-1005',
//       contactPerson: 'Dr. Sunita Reddy',
//       email: 'sunita@biotech.com',
//       phone: '+91 98765 43213',
//       items: [
//         { product: 'Titanium Dioxide Pigment', quantity: '200 kg', rate: 680, amount: 136000, taxRate: 18 },
//         { product: 'Iron Oxide Red', quantity: '100 kg', rate: 450, amount: 45000, taxRate: 18 }
//       ],
//       subtotal: 181000,
//       tax: 32580,
//       totalAmount: 213580,
//       status: 'Draft',
//       remarks: 'Awaiting technical specifications',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 15 days.'
//     },
//     {
//       id: 'QUO-2026-0231',
//       quotationNo: 'QUO-2026-0231',
//       date: '2026-01-01',
//       validUntil: '2026-01-31',
//       customer: 'Green Chemicals Ltd',
//       customerId: 'CUST-1008',
//       contactPerson: 'Mr. Vikram Singh',
//       email: 'vikram@greenchem.com',
//       phone: '+91 98765 43214',
//       items: [
//         { product: 'Citric Acid Anhydrous', quantity: '300 kg', rate: 320, amount: 96000, taxRate: 18 },
//         { product: 'Tartaric Acid', quantity: '150 kg', rate: 580, amount: 87000, taxRate: 18 }
//       ],
//       subtotal: 183000,
//       tax: 32940,
//       totalAmount: 215940,
//       status: 'Rejected',
//       sentDate: '2026-01-01',
//       rejectedDate: '2026-01-03',
//       remarks: 'Customer requested lower pricing',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 7 days.'
//     },
//     {
//       id: 'QUO-2025-0230',
//       quotationNo: 'QUO-2025-0230',
//       date: '2025-12-28',
//       validUntil: '2026-01-27',
//       customer: 'ChemTrade Solutions',
//       customerId: 'CUST-1001',
//       contactPerson: 'Ms. Meena Gupta',
//       email: 'meena@chemtrade.com',
//       phone: '+91 98765 43215',
//       items: [
//         { product: 'Ammonia Solution 25%', quantity: '600 L', rate: 165, amount: 99000, taxRate: 18 },
//         { product: 'Caustic Soda Pellets', quantity: '300 kg', rate: 420, amount: 126000, taxRate: 18 }
//       ],
//       subtotal: 225000,
//       tax: 40500,
//       totalAmount: 265500,
//       status: 'Converted',
//       sentDate: '2025-12-28',
//       acceptedDate: '2025-12-30',
//       convertedDate: '2026-01-02',
//       invoiceNo: 'INV-2026-0155',
//       remarks: 'Converted to invoice successfully',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 5 days.'
//     },
//     {
//       id: 'QUO-2025-0229',
//       quotationNo: 'QUO-2025-0229',
//       date: '2025-12-26',
//       validUntil: '2026-01-25',
//       customer: 'Polymer Solutions Inc',
//       customerId: 'CUST-1007',
//       contactPerson: 'Mr. Arjun Verma',
//       email: 'arjun@polysol.com',
//       phone: '+91 98765 43216',
//       items: [
//         { product: 'Methanol 99%', quantity: '500 L', rate: 175, amount: 87500, taxRate: 18 },
//         { product: 'Toluene 99%', quantity: '400 L', rate: 245, amount: 98000, taxRate: 18 }
//       ],
//       subtotal: 185500,
//       tax: 33390,
//       totalAmount: 218890,
//       status: 'Sent',
//       sentDate: '2025-12-26',
//       remarks: 'Follow-up required',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 7 days.'
//     },
//     {
//       id: 'QUO-2025-0228',
//       quotationNo: 'QUO-2025-0228',
//       date: '2025-12-24',
//       validUntil: '2026-01-23',
//       customer: 'Apex Chemical Works',
//       customerId: 'CUST-1009',
//       contactPerson: 'Ms. Kavita Desai',
//       email: 'kavita@apexchem.com',
//       phone: '+91 98765 43217',
//       items: [
//         { product: 'Glycerol 99%', quantity: '400 L', rate: 385, amount: 154000, taxRate: 18 },
//         { product: 'Propylene Glycol', quantity: '250 L', rate: 290, amount: 72500, taxRate: 18 }
//       ],
//       subtotal: 226500,
//       tax: 40770,
//       totalAmount: 267270,
//       status: 'Accepted',
//       sentDate: '2025-12-24',
//       acceptedDate: '2025-12-26',
//       remarks: 'Waiting for purchase order',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 7 days.'
//     },
//     {
//       id: 'QUO-2025-0227',
//       quotationNo: 'QUO-2025-0227',
//       date: '2025-12-22',
//       validUntil: '2026-01-21',
//       customer: 'Crystal Pharma Ltd',
//       customerId: 'CUST-1010',
//       contactPerson: 'Dr. Rahul Joshi',
//       email: 'rahul@crystalpharma.com',
//       phone: '+91 98765 43218',
//       items: [
//         { product: 'Benzyl Alcohol', quantity: '200 L', rate: 520, amount: 104000, taxRate: 18 },
//         { product: 'Phenol 99%', quantity: '120 kg', rate: 680, amount: 81600, taxRate: 18 }
//       ],
//       subtotal: 185600,
//       tax: 33408,
//       totalAmount: 219008,
//       status: 'Converted',
//       sentDate: '2025-12-22',
//       acceptedDate: '2025-12-24',
//       convertedDate: '2025-12-26',
//       invoiceNo: 'INV-2025-0149',
//       remarks: 'Converted to invoice - Payment pending',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 10 days.'
//     },
//     {
//       id: 'QUO-2025-0226',
//       quotationNo: 'QUO-2025-0226',
//       date: '2025-12-20',
//       validUntil: '2026-01-19',
//       customer: 'United Chemicals Corp',
//       customerId: 'CUST-1011',
//       contactPerson: 'Mr. Deepak Nair',
//       email: 'deepak@unitedchem.com',
//       phone: '+91 98765 43219',
//       items: [
//         { product: 'Xylene Mixed Isomers', quantity: '500 L', rate: 265, amount: 132500, taxRate: 18 },
//         { product: 'Acetone 99%', quantity: '400 L', rate: 195, amount: 78000, taxRate: 18 }
//       ],
//       subtotal: 210500,
//       tax: 37890,
//       totalAmount: 248390,
//       status: 'Expired',
//       sentDate: '2025-12-20',
//       remarks: 'Quotation expired - No response from customer',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 7 days.'
//     },
//     {
//       id: 'QUO-2025-0225',
//       quotationNo: 'QUO-2025-0225',
//       date: '2025-12-18',
//       validUntil: '2026-01-17',
//       customer: 'Metro Paints & Coatings',
//       customerId: 'CUST-1012',
//       contactPerson: 'Ms. Neha Kapoor',
//       email: 'neha@metropaints.com',
//       phone: '+91 98765 43220',
//       items: [
//         { product: 'Titanium Dioxide Anatase', quantity: '300 kg', rate: 720, amount: 216000, taxRate: 18 },
//         { product: 'Carbon Black', quantity: '200 kg', rate: 380, amount: 76000, taxRate: 18 }
//       ],
//       subtotal: 292000,
//       tax: 52560,
//       totalAmount: 344560,
//       status: 'Converted',
//       sentDate: '2025-12-18',
//       acceptedDate: '2025-12-20',
//       convertedDate: '2025-12-22',
//       invoiceNo: 'INV-2025-0147',
//       remarks: 'Long-term customer - Regular order',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 5 days. Bulk discount applied.'
//     },
//     {
//       id: 'QUO-2025-0224',
//       quotationNo: 'QUO-2025-0224',
//       date: '2025-12-16',
//       validUntil: '2026-01-15',
//       customer: 'Prime Solvents Ltd',
//       customerId: 'CUST-1013',
//       contactPerson: 'Mr. Sanjay Mehta',
//       email: 'sanjay@primesolvents.com',
//       phone: '+91 98765 43221',
//       items: [
//         { product: 'MEK (Methyl Ethyl Ketone)', quantity: '600 L', rate: 225, amount: 135000, taxRate: 18 },
//         { product: 'Ethyl Acetate', quantity: '400 L', rate: 210, amount: 84000, taxRate: 18 }
//       ],
//       subtotal: 219000,
//       tax: 39420,
//       totalAmount: 258420,
//       status: 'Sent',
//       sentDate: '2025-12-16',
//       remarks: 'New customer - Credit check pending',
//       termsAndConditions: 'Payment: Advance payment for first order. Delivery: Within 10 days.'
//     },
//     {
//       id: 'QUO-2025-0223',
//       quotationNo: 'QUO-2025-0223',
//       date: '2025-12-14',
//       validUntil: '2026-01-13',
//       customer: 'Synergy Chemicals',
//       customerId: 'CUST-1014',
//       contactPerson: 'Ms. Pooja Rao',
//       email: 'pooja@synergychem.com',
//       phone: '+91 98765 43222',
//       items: [
//         { product: 'Sodium Hydroxide 50%', quantity: '800 L', rate: 165, amount: 132000, taxRate: 18 },
//         { product: 'Potassium Hydroxide 45%', quantity: '300 L', rate: 280, amount: 84000, taxRate: 18 }
//       ],
//       subtotal: 216000,
//       tax: 38880,
//       totalAmount: 254880,
//       status: 'Accepted',
//       sentDate: '2025-12-14',
//       acceptedDate: '2025-12-16',
//       remarks: 'Customer confirmed - Awaiting PO',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 7 days.'
//     },
//     {
//       id: 'QUO-2025-0222',
//       quotationNo: 'QUO-2025-0222',
//       date: '2025-12-12',
//       validUntil: '2026-01-11',
//       customer: 'Spectrum Dyes & Pigments',
//       customerId: 'CUST-1015',
//       contactPerson: 'Mr. Karthik Menon',
//       email: 'karthik@spectrum.com',
//       phone: '+91 98765 43223',
//       items: [
//         { product: 'Phthalocyanine Blue', quantity: '80 kg', rate: 1280, amount: 102400, taxRate: 18 },
//         { product: 'Phthalocyanine Green', quantity: '60 kg', rate: 1350, amount: 81000, taxRate: 18 }
//       ],
//       subtotal: 183400,
//       tax: 33012,
//       totalAmount: 216412,
//       status: 'Sent',
//       sentDate: '2025-12-12',
//       remarks: 'Premium product - Special order',
//       termsAndConditions: 'Payment: 50% advance, balance on delivery. Delivery: Within 20 days.'
//     },
//     {
//       id: 'QUO-2025-0221',
//       quotationNo: 'QUO-2025-0221',
//       date: '2025-12-10',
//       validUntil: '2026-01-09',
//       customer: 'Global Reagents Inc',
//       customerId: 'CUST-1016',
//       contactPerson: 'Dr. Divya Krishnan',
//       email: 'divya@globalreagents.com',
//       phone: '+91 98765 43224',
//       items: [
//         { product: 'Sodium Chloride AR Grade', quantity: '400 kg', rate: 145, amount: 58000, taxRate: 18 },
//         { product: 'Potassium Chloride AR', quantity: '300 kg', rate: 185, amount: 55500, taxRate: 18 }
//       ],
//       subtotal: 113500,
//       tax: 20430,
//       totalAmount: 133930,
//       status: 'Converted',
//       sentDate: '2025-12-10',
//       acceptedDate: '2025-12-12',
//       convertedDate: '2025-12-14',
//       invoiceNo: 'INV-2025-0143',
//       remarks: 'Analytical grade chemicals - Quality certified',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 7 days.'
//     },
//     {
//       id: 'QUO-2025-0220',
//       quotationNo: 'QUO-2025-0220',
//       date: '2025-12-08',
//       validUntil: '2026-01-07',
//       customer: 'Nova Chemicals Ltd',
//       customerId: 'CUST-1017',
//       contactPerson: 'Mr. Suresh Raman',
//       email: 'suresh@novachem.com',
//       phone: '+91 98765 43225',
//       items: [
//         { product: 'Nitric Acid 68%', quantity: '400 L', rate: 285, amount: 114000, taxRate: 18 },
//         { product: 'Phosphoric Acid 85%', quantity: '300 L', rate: 195, amount: 58500, taxRate: 18 }
//       ],
//       subtotal: 172500,
//       tax: 31050,
//       totalAmount: 203550,
//       status: 'Draft',
//       remarks: 'Pending approval from management',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 7 days.'
//     },
//     {
//       id: 'QUO-2025-0219',
//       quotationNo: 'QUO-2025-0219',
//       date: '2025-12-06',
//       validUntil: '2026-01-05',
//       customer: 'Sterling Chemicals',
//       customerId: 'CUST-1019',
//       contactPerson: 'Ms. Anita Bhatt',
//       email: 'anita@sterlingchem.com',
//       phone: '+91 98765 43226',
//       items: [
//         { product: 'Diethylene Glycol', quantity: '600 L', rate: 245, amount: 147000, taxRate: 18 },
//         { product: 'Triethylene Glycol', quantity: '300 L', rate: 285, amount: 85500, taxRate: 18 }
//       ],
//       subtotal: 232500,
//       tax: 41850,
//       totalAmount: 274350,
//       status: 'Converted',
//       sentDate: '2025-12-06',
//       acceptedDate: '2025-12-08',
//       convertedDate: '2025-12-10',
//       invoiceNo: 'INV-2025-0142',
//       remarks: 'Regular customer - Early payment discount',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 5 days.'
//     },
//     {
//       id: 'QUO-2025-0218',
//       quotationNo: 'QUO-2025-0218',
//       date: '2025-12-04',
//       validUntil: '2026-01-03',
//       customer: 'Diamond Specialty Chemicals',
//       customerId: 'CUST-1020',
//       contactPerson: 'Mr. Ramesh Kulkarni',
//       email: 'ramesh@diamondchem.com',
//       phone: '+91 98765 43227',
//       items: [
//         { product: 'EDTA Disodium Salt', quantity: '200 kg', rate: 580, amount: 116000, taxRate: 18 },
//         { product: 'Sodium Thiosulfate', quantity: '300 kg', rate: 165, amount: 49500, taxRate: 18 }
//       ],
//       subtotal: 165500,
//       tax: 29790,
//       totalAmount: 195290,
//       status: 'Sent',
//       sentDate: '2025-12-04',
//       remarks: 'Specialty chemicals - Custom formulation',
//       termsAndConditions: 'Payment: 45 days credit. Delivery: Within 15 days.'
//     },
//     {
//       id: 'QUO-2025-0217',
//       quotationNo: 'QUO-2025-0217',
//       date: '2025-12-02',
//       validUntil: '2026-01-01',
//       customer: 'EcoGreen Solutions',
//       customerId: 'CUST-1021',
//       contactPerson: 'Ms. Shweta Mishra',
//       email: 'shweta@ecogreen.com',
//       phone: '+91 98765 43228',
//       items: [
//         { product: 'Bio-based Ethanol 99%', quantity: '500 L', rate: 195, amount: 97500, taxRate: 18 },
//         { product: 'Green Solvent Mix', quantity: '300 L', rate: 240, amount: 72000, taxRate: 18 }
//       ],
//       subtotal: 169500,
//       tax: 30510,
//       totalAmount: 200010,
//       status: 'Rejected',
//       sentDate: '2025-12-02',
//       rejectedDate: '2025-12-05',
//       remarks: 'Customer opted for alternative supplier',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 10 days.'
//     },
//     {
//       id: 'QUO-2025-0216',
//       quotationNo: 'QUO-2025-0216',
//       date: '2025-11-28',
//       validUntil: '2025-12-28',
//       customer: 'Advanced Materials Ltd',
//       customerId: 'CUST-1022',
//       contactPerson: 'Dr. Manoj Tiwari',
//       email: 'manoj@advmaterials.com',
//       phone: '+91 98765 43229',
//       items: [
//         { product: 'Alumina Catalyst Support', quantity: '150 kg', rate: 890, amount: 133500, taxRate: 18 },
//         { product: 'Silica Gel Grade A', quantity: '200 kg', rate: 420, amount: 84000, taxRate: 18 }
//       ],
//       subtotal: 217500,
//       tax: 39150,
//       totalAmount: 256650,
//       status: 'Expired',
//       sentDate: '2025-11-28',
//       remarks: 'Quotation expired - Customer did not respond',
//       termsAndConditions: 'Payment: 30 days credit. Delivery: Within 15 days.'
//     }
//   ];

//   // Monthly quotation trend
//   const monthlyTrend = [
//     { month: 'Jul', quotations: 32, value: 12500000, converted: 18 },
//     { month: 'Aug', quotations: 38, value: 13200000, converted: 22 },
//     { month: 'Sep', quotations: 35, value: 12800000, converted: 20 },
//     { month: 'Oct', quotations: 42, value: 14100000, converted: 25 },
//     { month: 'Nov', quotations: 45, value: 14800000, converted: 28 },
//     { month: 'Dec', quotations: 43, value: 15200000, converted: 26 },
//     { month: 'Jan', quotations: 58, value: 15680000, converted: 35 }
//   ];

//   // Status distribution
//   const statusDistribution = [
//     { status: 'Converted', count: 142, value: 9420000 },
//     { status: 'Accepted', count: 38, value: 2850000 },
//     { status: 'Sent', count: 28, value: 2120000 },
//     { status: 'Draft', count: 12, value: 680000 },
//     { status: 'Rejected', count: 10, value: 450000 },
//     { status: 'Expired', count: 5, value: 160000 }
//   ];

//   // Conversion funnel
//   const conversionFunnel = [
//     { stage: 'Created', count: 235, percentage: 100 },
//     { stage: 'Sent', count: 210, percentage: 89.4 },
//     { stage: 'Accepted', count: 180, percentage: 76.6 },
//     { stage: 'Converted', count: 142, percentage: 60.4 }
//   ];

//   const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

//   // Filter quotations
//   const filteredQuotations = quotations.filter(quotation => {
//     const matchesSearch = quotation.quotationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          quotation.customer.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = selectedStatus === 'All' || quotation.status === selectedStatus;
    
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Converted': return 'bg-green-100 text-green-800';
//       case 'Accepted': return 'bg-blue-100 text-blue-800';
//       case 'Sent': return 'bg-purple-100 text-purple-800';
//       case 'Draft': return 'bg-gray-100 text-gray-800';
//       case 'Rejected': return 'bg-red-100 text-red-800';
//       case 'Expired': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatCurrency = (value) => {
//     return `₹${value.toLocaleString('en-IN')}`;
//   };

//   return (
//     <div className="p-6 min-h-screen mt-10">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-black mb-2">Quotation Management</h1>
//         <p className="text-gray-600">Create, track and manage customer quotations efficiently</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Quotations</p>
//               <p className="text-2xl font-bold text-black mt-1">{summary.totalQuotations}</p>
//             </div>
//             <FileText className="text-blue-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Active Quotations</p>
//               <p className="text-2xl font-bold text-purple-600 mt-1">{summary.activeQuotations}</p>
//             </div>
//             <Clock className="text-purple-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Converted</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">{summary.convertedQuotations}</p>
//             </div>
//             <CheckCircle className="text-green-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Total Value</p>
//               <p className="text-2xl font-bold text-black mt-1">{formatCurrency(summary.totalValue)}</p>
//             </div>
//             <DollarSign className="text-orange-500" size={32} />
//           </div>
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Conversion Rate</p>
//               <p className="text-2xl font-bold text-green-600 mt-1">{summary.conversionRate}%</p>
//             </div>
//             <TrendingUp className="text-green-500" size={32} />
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Monthly Quotation Trend */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Monthly Quotation Trend</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={monthlyTrend}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis yAxisId="left" />
//               <YAxis yAxisId="right" orientation="right" />
//               <Tooltip formatter={(value, name) => name === 'value' ? formatCurrency(value) : value} />
//               <Legend />
//               <Line yAxisId="left" type="monotone" dataKey="quotations" stroke="#3b82f6" strokeWidth={2} name="Quotations" />
//               <Line yAxisId="left" type="monotone" dataKey="converted" stroke="#10b981" strokeWidth={2} name="Converted" />
//               <Line yAxisId="right" type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="Value" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Status Distribution */}
//         <div className="bg-white border border-gray-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-black mb-4">Status Distribution</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={statusDistribution}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ status, count }) => `${status}: ${count}`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="count"
//               >
//                 {statusDistribution.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Conversion Funnel */}
//       <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold text-black mb-4">Conversion Funnel</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={conversionFunnel}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="stage" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#3b82f6" name="Quotations">
//               {conversionFunnel.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Filters */}
//       <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-black mb-2">Search Quotation</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search by quotation no or customer..."
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
//               <option value="Draft">Draft</option>
//               <option value="Sent">Sent</option>
//               <option value="Accepted">Accepted</option>
//               <option value="Converted">Converted</option>
//               <option value="Rejected">Rejected</option>
//               <option value="Expired">Expired</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Quotations List */}
//       <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//         <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-black">Quotation List ({filteredQuotations.length} quotations)</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-100 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quotation No</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Valid Until</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredQuotations.map((quotation) => (
//                 <tr key={quotation.id} className="hover:bg-gray-100">
//                   <td className="px-6 py-4 text-sm font-semibold text-black">{quotation.quotationNo}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{quotation.date}</td>
//                   <td className="px-6 py-4">
//                     <div>
//                       <p className="text-sm font-medium text-black">{quotation.customer}</p>
//                       <p className="text-xs text-gray-500">{quotation.customerId}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div>
//                       <p className="text-sm text-gray-700">{quotation.contactPerson}</p>
//                       <p className="text-xs text-gray-500">{quotation.phone}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-black">{formatCurrency(quotation.totalAmount)}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{quotation.validUntil}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quotation.status)}`}>
//                       {quotation.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => setSelectedQuotation(quotation)}
//                         className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                         title="View Details"
//                       >
//                         <Eye size={18} />
//                       </button>
//                       <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="Download PDF">
//                         <Download size={18} />
//                       </button>
//                       <button className="p-1 text-purple-600 hover:bg-purple-50 rounded" title="Send Quotation">
//                         <Send size={18} />
//                       </button>
//                       {quotation.status === 'Draft' && (
//                         <button className="p-1 text-orange-600 hover:bg-orange-50 rounded" title="Edit">
//                           <Edit size={18} />
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Quotation Details Modal */}
//       {selectedQuotation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold text-black">Quotation Details</h2>
//                 <button
//                   onClick={() => setSelectedQuotation(null)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <XCircle size={24} />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               {/* Quotation Header */}
//               <div className="grid grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <h3 className="text-lg font-semibold text-black mb-2">Quotation Information</h3>
//                   <p className="text-sm text-gray-600">Quotation No: <span className="font-semibold text-black">{selectedQuotation.quotationNo}</span></p>
//                   <p className="text-sm text-gray-600">Date: <span className="font-semibold text-black">{selectedQuotation.date}</span></p>
//                   <p className="text-sm text-gray-600">Valid Until: <span className="font-semibold text-black">{selectedQuotation.validUntil}</span></p>
//                   <p className="text-sm text-gray-600 mt-2">
//                     Status: <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedQuotation.status)}`}>{selectedQuotation.status}</span>
//                   </p>
//                   {selectedQuotation.invoiceNo && (
//                     <p className="text-sm text-gray-600 mt-2">Converted to: <span className="font-semibold text-green-600">{selectedQuotation.invoiceNo}</span></p>
//                   )}
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold text-black mb-2">Customer Information</h3>
//                   <p className="text-sm text-gray-600">Name: <span className="font-semibold text-black">{selectedQuotation.customer}</span></p>
//                   <p className="text-sm text-gray-600">Customer ID: <span className="font-semibold text-black">{selectedQuotation.customerId}</span></p>
//                   <p className="text-sm text-gray-600">Contact Person: <span className="font-semibold text-black">{selectedQuotation.contactPerson}</span></p>
//                   <p className="text-sm text-gray-600">Email: <span className="font-semibold text-black">{selectedQuotation.email}</span></p>
//                   <p className="text-sm text-gray-600">Phone: <span className="font-semibold text-black">{selectedQuotation.phone}</span></p>
//                 </div>
//               </div>

//               {/* Quotation Items */}
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-black mb-3">Items</h3>
//                 <table className="w-full border border-gray-200">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 border-b">Product</th>
//                       <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Quantity</th>
//                       <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Rate</th>
//                       <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Tax %</th>
//                       <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 border-b">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedQuotation.items.map((item, index) => (
//                       <tr key={index} className="border-b">
//                         <td className="px-4 py-2 text-sm text-black">{item.product}</td>
//                         <td className="px-4 py-2 text-sm text-gray-700 text-right">{item.quantity}</td>
//                         <td className="px-4 py-2 text-sm text-gray-700 text-right">{formatCurrency(item.rate)}</td>
//                         <td className="px-4 py-2 text-sm text-gray-700 text-right">{item.taxRate}%</td>
//                         <td className="px-4 py-2 text-sm font-medium text-black text-right">{formatCurrency(item.amount)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Quotation Summary */}
//               <div className="bg-gray-100 p-4 rounded-lg mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Subtotal:</span>
//                   <span className="text-sm font-medium text-black">{formatCurrency(selectedQuotation.subtotal)}</span>
//                 </div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-sm text-gray-600">Tax (18%):</span>
//                   <span className="text-sm font-medium text-black">{formatCurrency(selectedQuotation.tax)}</span>
//                 </div>
//                 <div className="flex justify-between items-center py-2 border-t border-gray-300">
//                   <span className="text-lg font-semibold text-black">Total Amount:</span>
//                   <span className="text-lg font-bold text-black">{formatCurrency(selectedQuotation.totalAmount)}</span>
//                 </div>
//               </div>

//               {/* Terms and Conditions */}
//               {selectedQuotation.termsAndConditions && (
//                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
//                   <h4 className="text-sm font-semibold text-blue-900 mb-1">Terms & Conditions:</h4>
//                   <p className="text-sm text-blue-700">{selectedQuotation.termsAndConditions}</p>
//                 </div>
//               )}

//               {/* Remarks */}
//               {selectedQuotation.remarks && (
//                 <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//                   <h4 className="text-sm font-semibold text-yellow-900 mb-1">Remarks:</h4>
//                   <p className="text-sm text-yellow-700">{selectedQuotation.remarks}</p>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center">
//                   <Copy size={18} className="mr-2" />
//                   Duplicate
//                 </button>
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
//                   <Download size={18} className="mr-2" />
//                   Download PDF
//                 </button>
//                 <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
//                   <Send size={18} className="mr-2" />
//                   Send to Customer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* No Results Message */}
//       {filteredQuotations.length === 0 && (
//         <div className="text-center py-12 bg-white border border-gray-200 rounded-lg mt-6">
//           <FileText className="mx-auto text-gray-400 mb-4" size={48} />
//           <p className="text-gray-600">No quotations found matching your criteria</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quotation;


;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";

export default function Quotation() {
  const [open, setOpen] = useState(false);
  const [quotations, setQuotations] = useState([]);

  const [form, setForm] = useState({
    supplyType: "Outward",
    customerName: "",
    address: "",
    contactPerson: "",
    phone: "",
    gstin: "",
    revCharge: "No",
    placeOfSupply: "",
    quotationType: "",
    quotationNo: "",
    quotationDate: "",
    challanNo: "",
    challanDate: "",
    lrNo: "",
    deliveryMode: "",
  });

  /* -------------------- FETCH DATA -------------------- */
  const fetchQuotations = async () => {
    const res = await axios.get("http://localhost:5000/api/quotations");
    setQuotations(res.data);
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  /* -------------------- HANDLE CHANGE -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /* -------------------- SUBMIT -------------------- */
  const submitQuotation = async () => {
    await axios.post("http://localhost:5000/api/quotations", form);
    setOpen(false);
    setForm({
      supplyType: "Outward",
      customerName: "",
      address: "",
      contactPerson: "",
      phone: "",
      gstin: "",
      revCharge: "No",
      placeOfSupply: "",
      quotationType: "",
      quotationNo: "",
      quotationDate: "",
      challanNo: "",
      challanDate: "",
      lrNo: "",
      deliveryMode: "",
    });
    fetchQuotations();
  };

  return (
    <div className="p-6 mt-10 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quotation</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Create Quotation
        </button>
      </div>

      {/* TABLE */}
      {/* <div className="rounded-lg shadow overflow-x-auto"> */}
        {/* <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Quotation No</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Supply Type</th>
              <th className="p-3 text-left">Delivery</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => (
              <tr key={q._id} className="border-t">
                <td className="p-3">{q.quotationNo}</td>
                <td className="p-3">{q.customerName}</td>
                <td className="p-3">{q.quotationDate}</td>
                <td className="p-3">{q.supplyType}</td>
                <td className="p-3">{q.deliveryMode}</td>
              </tr>
            ))}
            {quotations.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No quotations found
                </td>
              </tr>
            )}
          </tbody>
        </table> */}

        {quotations.map((q) => (
        <div key={q._id} className="bg-white grid grid-cols-2 p-4 rounded shadow mb-4">
          <div>
            <h2 className="text-lg font-bold underline">Customer Details</h2>
          <p><b>Address:</b>{q.address}</p>
          <p><b>Customer:</b> {q.customerName}</p>
          <p><b>Phone:</b> {q.phone}</p>
          <p><b>GST In:</b> {q.gstin}</p>
          </div>
          <div>
            <h2 className="text-lg underline font-bold">Quotation Details</h2>
          <p><b>Quotation No:</b> {q.quotationNo}</p>
          <p><b>LR No:</b> {q.lrNo}</p>
          <p><b>Date:</b> {q.quotationDate}</p>
          <p><b>Delivery Mode:</b> {q.deliveryMode}</p>
          </div>
        </div>
      ))}
      {/* </div> */}

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-6xl rounded-xl p-6 relative">

            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="grid grid-cols-2 gap-8">

              {/* CUSTOMER INFO */}
              <div>
                <h2 className="font-semibold text-lg mb-4">
                  Customer Information
                </h2>

                {/* SUPPLY TYPE */}
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="supplyType"
                      value="Outward"
                      checked={form.supplyType === "Outward"}
                      onChange={handleChange}
                    />
                    Outward
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="supplyType"
                      value="Inward"
                      checked={form.supplyType === "Inward"}
                      onChange={handleChange}
                    />
                    Inward
                  </label>
                </div>
              <div className="grid grid-cols-1 gap-3">
                <input
                  name="customerName"
                  placeholder="M/S *"
                  className="input border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.customerName}
                />

                <textarea
                  name="address"
                  placeholder="Address"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.address}
                />
                </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="contactPerson"
                  placeholder="Contact Person"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.contactPerson}
                />

                <input
                  name="phone"
                  placeholder="Phone No"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.phone}
                />
              </div>
              <div className="grid grid-cols-2">
                <input
                  name="gstin"
                  placeholder="GSTIN / PAN"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.gstin}
                />

                {/* <select
                  name="revCharge"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.revCharge}
                >
                  <option>No</option>
                  <option>Yes</option>
                </select> */}

                <input
                  name="placeOfSupply"
                  placeholder="Place of Supply"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.placeOfSupply}
                />
                </div>
              </div>

              {/* QUOTATION DETAILS */}
              <div>
                <h2 className="font-semibold text-lg mb-4">
                  Quotation Detail
                </h2>
{/* 
                <select
                  name="quotationType"
                  className="input border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.quotationType}
                >
                  <option value="">Select Type</option>
                  <option>Local</option>
                  <option>Interstate</option>
                </select> */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                <input
                  name="quotationNo"
                  placeholder="Quotation No"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.quotationNo}
                />

                <div className="flex flex-col mt-2">
  <label className="text-sm font-medium text-gray-700 mb-1">
    Quotation Date <span className="text-red-500">*</span>
  </label>

  <input
    type="date"
    name="quotationDate"
    className="border-2 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={handleChange}
    value={form.quotationDate}
  />
</div>

              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="challanNo"
                  placeholder="Challan No"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.challanNo}
                />
              <div className="flex flex-col mt-2">
                <label className="text-sm font-medium text-gray-700 mb-1">
   Challan Date <span className="text-red-500">*</span>
  </label>
                <input
                  type="date"
                  name="challanDate"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.challanDate}
                />
                </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                <input
                  name="lrNo"
                  placeholder="L.R. No"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.lrNo}
                />

                <select
                  name="deliveryMode"
                  className="input mt-2 border-2 rounded px-2 py-2"
                  onChange={handleChange}
                  value={form.deliveryMode}
                >
                  <option value="">Select Delivery Mode</option>
                  <option>Road</option>
                  <option>Courier</option>
                  <option>Transport</option>
                </select>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitQuotation}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save Quotation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
