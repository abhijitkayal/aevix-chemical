

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Delete, Edit } from 'lucide-react';

const emptyForm = {
  _id: null,
  clientName: '',
  phone: '',
  email: '',
  location: '',
  totalQuantity: '',
  unit: '',
};

const Ledger = () => {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format

  /* ======================
     Fetch clients
  ====================== */
  const fetchClients = async () => {
    const res = await axios.get('http://localhost:5000/api/clients');
    setClients(res.data);
  };

  /* ======================
     Fetch invoices
  ====================== */
  const fetchInvoices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/invoices');
      setInvoices(res.data);
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchInvoices();
  }, []);

  /* ======================
     Handle input
  ====================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ======================
     Save / Update client
  ====================== */
  const handleSave = async () => {
    if (!form.clientName || !form.phone) {
      alert('Client name & phone required');
      return;
    }

    setLoading(true);

    try {
      if (form._id) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/clients/${form._id}`,
          form
        );
      } else {
        // CREATE
        await axios.post(
          'http://localhost:5000/api/clients',
          form
        );
      }

      setShowForm(false);
      setForm(emptyForm);
      fetchClients();
    } catch (err) {
      alert('Operation failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     Edit client
  ====================== */
  const handleEdit = (client) => {
    setForm(client);
    setShowForm(true);
  };

  /* ======================
     Delete client
  ====================== */
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/clients/${id}`
      );
      fetchClients();
    } catch (err) {
      alert('Delete failed');
      console.error(err);
    }
  };

  /* ======================
     Calculate monthly invoice quantity for a client
  ====================== */
  const getMonthlyInvoiceQuantity = (clientName, month) => {
    // Filter invoices by client name and month
    const [year, monthNum] = month.split('-');
    
    const monthlyInvoices = invoices.filter(invoice => {
      if (!invoice.date) return false;
      
      const invoiceDate = new Date(invoice.date);
      const invoiceYear = invoiceDate.getFullYear();
      const invoiceMonth = String(invoiceDate.getMonth() + 1).padStart(2, '0');
      
      return (
        invoice.customer === clientName &&
        String(invoiceYear) === year &&
        invoiceMonth === monthNum
      );
    });

    // Sum up quantities
    const totalQuantity = monthlyInvoices.reduce((sum, inv) => {
      return sum + (parseFloat(inv.quantity) || 0);
    }, 0);

    return {
      totalQuantity,
      invoiceCount: monthlyInvoices.length,
      invoices: monthlyInvoices
    };
  };

  /* ======================
     Check monthly invoice quantities against ledger
  ====================== */
  const checkMonthlyQuantities = () => {
    const newAlerts = [];

    clients.forEach(client => {
      const monthlyData = getMonthlyInvoiceQuantity(client.clientName, selectedMonth);
      const ledgerQuantity = parseFloat(client.totalQuantity) || 0;
      const invoiceQuantity = monthlyData.totalQuantity;

      if (monthlyData.invoiceCount > 0) {
        if (invoiceQuantity > ledgerQuantity) {
          // Exceeded
          newAlerts.push({
            type: 'exceeded',
            client: client.clientName,
            ledgerQuantity,
            invoiceQuantity,
            difference: invoiceQuantity - ledgerQuantity,
            unit: client.unit || '',
            invoiceCount: monthlyData.invoiceCount,
            month: selectedMonth
          });
        } else {
          // Not exceeded
          newAlerts.push({
            type: 'safe',
            client: client.clientName,
            ledgerQuantity,
            invoiceQuantity,
            remaining: ledgerQuantity - invoiceQuantity,
            unit: client.unit || '',
            invoiceCount: monthlyData.invoiceCount,
            month: selectedMonth
          });
        }
      }
    });

    setAlerts(newAlerts);
    setShowAlerts(true);
  };

  /* ======================
     Get status for display in table
  ====================== */
  const getClientMonthlyStatus = (client) => {
    const monthlyData = getMonthlyInvoiceQuantity(client.clientName, selectedMonth);
    const ledgerQuantity = parseFloat(client.totalQuantity) || 0;
    const invoiceQuantity = monthlyData.totalQuantity;

    if (monthlyData.invoiceCount === 0) {
      return { type: 'none', text: 'No invoices' };
    }

    if (invoiceQuantity > ledgerQuantity) {
      const percentage = ledgerQuantity > 0 
        ? ((invoiceQuantity - ledgerQuantity) / ledgerQuantity * 100).toFixed(1)
        : 0;
      return { 
        type: 'exceeded', 
        text: `Exceeded by ${(invoiceQuantity - ledgerQuantity).toFixed(2)}`,
        percentage,
        invoiceQuantity
      };
    } else {
      const percentage = ledgerQuantity > 0 
        ? ((invoiceQuantity / ledgerQuantity) * 100).toFixed(1)
        : 0;
      return { 
        type: 'safe', 
        text: `${percentage}% used`,
        percentage,
        invoiceQuantity,
        remaining: ledgerQuantity - invoiceQuantity
      };
    }
  };

  return (
    <div className="p-6 min-h-screen mt-15">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Ledger</h1>

        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Month:</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            />
          </div>
          <button
            onClick={checkMonthlyQuantities}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Monthly Status
          </button>
          <button
            onClick={() => {
              setForm(emptyForm);
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Client
          </button>
        </div>
      </div>

      {/* ALERTS MODAL */}
      {showAlerts && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowAlerts(false)}
              className="absolute top-3 right-3 text-red-500 text-xl font-bold hover:text-red-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-2">Monthly Quantity Report</h2>
            <p className="text-sm text-gray-600 mb-4">
              Comparing invoice quantities vs ledger quantities for {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>

            {alerts.length === 0 ? (
              <p className="text-center p-8 text-gray-500">No invoices found for this month.</p>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.type === 'exceeded'
                        ? 'bg-red-50 border-red-500'
                        : 'bg-green-50 border-green-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{alert.client}</h3>
                        <div className="mt-2 space-y-1 text-sm">
                          <p className="text-gray-700">
                            <strong>Ledger Quantity:</strong> {alert.ledgerQuantity} {alert.unit}
                          </p>
                          <p className="text-gray-700">
                            <strong>Invoice Quantity (Month):</strong> {alert.invoiceQuantity.toFixed(2)} {alert.unit}
                          </p>
                          <p className="text-gray-700">
                            <strong>Total Invoices:</strong> {alert.invoiceCount}
                          </p>
                          
                          {alert.type === 'exceeded' ? (
                            <p className="text-red-700 font-semibold mt-2">
                              ⚠️ EXCEEDED by {alert.difference.toFixed(2)} {alert.unit}
                            </p>
                          ) : (
                            <p className="text-green-700 font-semibold mt-2">
                              ✓ Within limit. Remaining: {alert.remaining.toFixed(2)} {alert.unit}
                            </p>
                          )}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          alert.type === 'exceeded'
                            ? 'bg-red-200 text-red-800'
                            : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {alert.type === 'exceeded' ? 'EXCEEDED' : 'SAFE'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowAlerts(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-red-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {form._id ? 'Edit Client' : 'Add Client'}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              <input name="clientName" placeholder="Client Name" className="input border-2 rounded px-2 py-2" value={form.clientName} onChange={handleChange} />
              <input name="phone" placeholder="Phone" className="input border-2 rounded px-2 py-2" value={form.phone} onChange={handleChange} />
              <input name="email" placeholder="Email" className="input border-2 rounded px-2 py-2" value={form.email} onChange={handleChange} />
              <input name="location" placeholder="Location" className="input border-2 rounded px-2 py-2" value={form.location} onChange={handleChange} />

              <div className="flex gap-2">
                <input
                  type="number"
                  name="totalQuantity"
                  placeholder="Total Quantity"
                  className="input border-2 rounded px-2 py-2 w-full"
                  value={form.totalQuantity}
                  onChange={handleChange}
                />

                <select name="unit" className="input border-2 rounded px-2 py-2 w-full" value={form.unit} onChange={handleChange}>
                  <option value="">Unit</option>
                  <option>Kg</option>
                  <option>Litre</option>
                  <option>Ton</option>
                  <option>Pieces</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowForm(false)} className="border px-4 py-2 rounded">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLIENT TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Client</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Ledger Qty</th>
              <th className="p-2 border">Monthly Invoice Qty</th>
              <th className="p-2 border ">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => {
              const status = getClientMonthlyStatus(c);
              return (
                <tr 
                  key={c._id}
                  className={status.type === 'exceeded' ? 'bg-red-50' : status.type === 'safe' ? 'bg-green-50' : ''}
                >
                  <td className="p-2 border font-medium">{c.clientName}</td>
                  <td className="p-2 border">{c.phone}</td>
                  <td className="p-2 border">{c.email}</td>
                  <td className="p-2 border">{c.location}</td>
                  <td className="p-2 border">
                    {c.totalQuantity} {c.unit}
                  </td>
                  <td className="p-2 border font-medium">
                    {status.type !== 'none' ? (
                      <span className="font-medium">
                        {status.invoiceQuantity.toFixed(2)} {c.unit}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="p-2 border w-10">
                    {status.type === 'exceeded' && (
                      <span className="px-1 py-1 rounded-full text-xs font-bold bg-red-200 text-red-800">
                        ⚠️ {status.text}
                      </span>
                    )}
                    {status.type === 'safe' && (
                      <span className="px-1 py-1 rounded-full text-xs font-bold bg-green-200 text-green-800">
                        ✓ {status.text}
                      </span>
                    )}
                    {status.type === 'none' && (
                      <span className="text-gray-400 text-xs">{status.text}</span>
                    )}
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(c)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        <Edit/>
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        <Delete/>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {clients.length === 0 && (
          <p className="text-center p-6 text-gray-500">
            No clients added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Ledger;
