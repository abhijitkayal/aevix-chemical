import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function WarehouseDetails() {
  const { id } = useParams();

  const [warehouse, setWarehouse] = useState(null);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    unit: "",
    price: "",
  });

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      const wRes = await axios.get("http://localhost:5000/api/warehouses");
      const selected = wRes.data.find((x) => x._id === id);
      setWarehouse(selected);

      const pRes = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProducts(pRes.data);
    };

    fetchData();
  }, [id]);

  /* ---------------- ADD PRODUCT ---------------- */
  const addProduct = async () => {
    if (
      !form.productName ||
      !form.quantity ||
      !form.unit ||
      !form.price
    ) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/api/products", {
      warehouseId: id,
      productName: form.productName,
      quantity: Number(form.quantity),
      unit: form.unit,
      price: Number(form.price),
    });

    setForm({ productName: "", quantity: "", unit: "", price: "" });
    setShowForm(false);

    const res = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    setProducts(res.data);
  };

  if (!warehouse) {
    return <p className="p-6">Loading warehouse...</p>;
  }

  return (
    <div className="p-6 min-h-screen mt-15">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{warehouse.warehouse}</h1>
          <p className="text-gray-500">{warehouse.location}</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Products</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products available</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-right">Qty</th>
                <th className="p-2">Unit</th>
                <th className="p-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.productName}</td>
                  <td className="p-2 text-right">{p.quantity}</td>
                  <td className="p-2 text-center">{p.unit}</td>
                  <td className="p-2 text-right">₹{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ADD PRODUCT FORM (TOGGLE) */}
      {showForm && (
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">
            Add New Product
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Product Name"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
            />

            <input
              className="border p-2 rounded"
              placeholder="Unit (kg / L / pcs)"
              value={form.unit}
              onChange={(e) =>
                setForm({ ...form, unit: e.target.value })
              }
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Price ₹"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={addProduct}
              className="bg-black text-white px-6 py-2 rounded"
            >
              Save Product
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
