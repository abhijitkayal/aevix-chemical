import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import SellProductModal from "./sellProductModal";

const Report = () => {
  const [open, setOpen] = useState(false);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });

  const filteredSales = sales.filter((sale) => {
    if (!dateFilter.from && !dateFilter.to) return true;

    const saleDate = new Date(sale.createdAt);
    const from = dateFilter.from ? new Date(dateFilter.from) : null;
    const to = dateFilter.to ? new Date(dateFilter.to) : null;

    if (from && saleDate < from) return false;
    if (to && saleDate > to) return false;

    return true;
  });

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://aevix-chemical-mpbw.vercel.app/api/sales",
      );
      setSales(res.data);
    } catch (error) {
      console.error("Failed to fetch sales", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="p-6 mt-10 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Sales</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          <Plus className="mr-2" size={18} />
          Sell Product
        </button>
      </div>

      {/* DATE FILTER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={dateFilter.from}
          onChange={(e) =>
            setDateFilter({ ...dateFilter, from: e.target.value })
          }
        />
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={dateFilter.to}
          onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
        />
        <button
          onClick={() => setDateFilter({ from: "", to: "" })}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 lg:w-20"
        >
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-600">Loading sales...</p>
        ) : sales.length === 0 ? (
          <p className="p-6 text-gray-600">No sales found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">State</th>
                  <th className="px-4 py-3 text-right">Quantity</th>
                  <th className="px-4 py-3 text-left">Unit</th>
                  <th className="px-4 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {sale.productName}
                    </td>
                    <td className="px-4 py-3">{sale.companyName}</td>
                    <td className="px-4 py-3">{sale.place}</td>
                    <td className="px-4 py-3 text-right">{sale.quantity}</td>
                    <td className="px-4 py-3">{sale.unit}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(sale.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <SellProductModal
          onClose={() => {
            setOpen(false);
            fetchSales(); // 🔥 refresh list after adding
          }}
        />
      )}
    </div>
  );
};

export default Report;
