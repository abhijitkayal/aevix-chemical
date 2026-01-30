'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand',
  'Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  'Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir'
];

const SellProductModal = ({ onClose }) => {
  const [form, setForm] = useState({
    productName: '',
    companyName: '',
    place: '',
    quantity: '',
    unit: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axios.post('https://aevix-chemical-mpbw.vercel.app/api/sales', {
        ...form,
        quantity: Number(form.quantity)
      });

      setSuccess('Product sold successfully');

      // reset form
      setForm({
        productName: '',
        companyName: '',
        place: '',
        quantity: '',
        unit: ''
      });

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Sell Product</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
              {success}
            </p>
          )}

          <input
            name="productName"
            placeholder="Product Name"
            value={form.productName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="place"
            value={form.place}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            {STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              min="1"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Unit</option>
              <option value="Kg">Kg</option>
              <option value="Litre">Litre</option>
              <option value="Piece">Piece</option>
              <option value="Ton">Ton</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Saving...' : 'Submit Sale'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellProductModal;
