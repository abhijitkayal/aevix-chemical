// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Plus, X } from "lucide-react";

// export default function App() {
//   /* -------------------- STATE -------------------- */
//   const [warehouses, setWarehouses] = useState([]);
//   const [products, setProducts] = useState([]);

//   const [showWarehouseModal, setShowWarehouseModal] = useState(false);
//   const [showProductModal, setShowProductModal] = useState(false);

//   const [selectedWarehouse, setSelectedWarehouse] = useState(null);

//   const [warehouseForm, setWarehouseForm] = useState({
//     warehouse: "",
//     location: "",
//     totalItems: "",
//     capacity: "",
//     value: "",
//   });

//   const [productForm, setProductForm] = useState({
//     productName: "",
//     quantity: "",
//     unit: "",
//     price: "",
//   });

//   const WAREHOUSE_API = "http://localhost:5000/api/warehouses";
//   const PRODUCT_API = "http://localhost:5000/api/products";

//   /* -------------------- FETCH -------------------- */
//   const fetchWarehouses = async () => {
//     const res = await axios.get(WAREHOUSE_API);
//     setWarehouses(res.data);
//   };

//   const fetchProducts = async (warehouseId) => {
//     const res = await axios.get(`${PRODUCT_API}/${warehouseId}`);
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchWarehouses();
//   }, []);

//   /* -------------------- SAVE WAREHOUSE -------------------- */
//   const saveWarehouse = async () => {
//     if (!warehouseForm.warehouse || !warehouseForm.location) return;

//     await axios.post(WAREHOUSE_API, {
//       ...warehouseForm,
//       totalItems: Number(warehouseForm.totalItems),
//       capacity: Number(warehouseForm.capacity),
//     });

//     setWarehouseForm({
//       warehouse: "",
//       location: "",
//       totalItems: "",
//       capacity: "",
//       value: "",
//     });

//     setShowWarehouseModal(false);
//     fetchWarehouses();
//   };

//   /* -------------------- SAVE PRODUCT -------------------- */
//   const saveProduct = async () => {
//     if (
//       !productForm.productName ||
//       !productForm.quantity ||
//       !productForm.unit ||
//       !productForm.price
//     ) {
//       alert("Please fill all product fields");
//       return;
//     }

//     await axios.post(PRODUCT_API, {
//       warehouseId: selectedWarehouse._id,
//       productName: productForm.productName,
//       quantity: Number(productForm.quantity),
//       unit: productForm.unit,
//       price: Number(productForm.price),
//     });

//     setProductForm({
//       productName: "",
//       quantity: "",
//       unit: "",
//       price: "",
//     });

//     fetchProducts(selectedWarehouse._id);
//   };

//   /* -------------------- UI -------------------- */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Warehouse Management</h1>
//         <button
//           onClick={() => setShowWarehouseModal(true)}
//           className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
//         >
//           <Plus size={16} /> Add Warehouse
//         </button>
//       </div>

//       {/* WAREHOUSE CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {warehouses.map((w) => {
//           const utilization = Math.round(
//             (w.totalItems / w.capacity) * 100
//           );

//           return (
//             <div
//               key={w._id}
//               onClick={() => {
//                 setSelectedWarehouse(w);
//                 setShowProductModal(true);
//                 fetchProducts(w._id);
//               }}
//               className="bg-white p-5 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
//             >
//               <h3 className="text-lg font-semibold">{w.warehouse}</h3>
//               <p className="text-sm text-gray-500">{w.location}</p>

//               <div className="mt-4 text-sm space-y-1">
//                 <p><b>Items:</b> {w.totalItems}</p>
//                 <p><b>Capacity:</b> {w.capacity}</p>
//                 <p className="text-emerald-600 font-semibold">{w.value}</p>
//               </div>

//               <div className="mt-4">
//                 <div className="flex justify-between text-xs mb-1">
//                   <span>Utilization</span>
//                   <span>{utilization}%</span>
//                 </div>
//                 <div className="h-2 bg-gray-200 rounded">
//                   <div
//                     className="h-2 bg-emerald-500 rounded"
//                     style={{ width: `${utilization}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ---------------- ADD WAREHOUSE MODAL ---------------- */}
//       {showWarehouseModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-lg p-6 rounded-xl relative">
//             <X
//               onClick={() => setShowWarehouseModal(false)}
//               className="absolute right-4 top-4 cursor-pointer"
//             />

//             <h2 className="text-xl font-semibold mb-4">Add Warehouse</h2>

//             {["warehouse", "location", "totalItems", "capacity", "value"].map(
//               (field) => (
//                 <input
//                   key={field}
//                   placeholder={field}
//                   type={
//                     field === "totalItems" || field === "capacity"
//                       ? "number"
//                       : "text"
//                   }
//                   className="w-full border p-2 rounded mb-3"
//                   value={warehouseForm[field]}
//                   onChange={(e) =>
//                     setWarehouseForm({
//                       ...warehouseForm,
//                       [field]: e.target.value,
//                     })
//                   }
//                 />
//               )
//             )}

//             <button
//               onClick={saveWarehouse}
//               className="w-full bg-black text-white py-2 rounded"
//             >
//               Save Warehouse
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ---------------- PRODUCT MODAL ---------------- */}
//       {showProductModal && selectedWarehouse && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-3xl p-6 rounded-xl relative max-h-[90vh] overflow-y-auto">

//             <X
//               onClick={() => setShowProductModal(false)}
//               className="absolute right-4 top-4 cursor-pointer"
//             />

//             <h2 className="text-xl font-bold mb-2">
//               Products – {selectedWarehouse.warehouse}
//             </h2>

//             {/* PRODUCT LIST */}
//             <div className="mb-6">
//               {products.length === 0 ? (
//                 <p className="text-gray-500">No products added yet</p>
//               ) : (
//                 <table className="w-full border text-sm">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="p-2 text-left">Product</th>
//                       <th className="p-2 text-right">Qty</th>
//                       <th className="p-2">Unit</th>
//                       <th className="p-2 text-right">Price</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {products.map((p) => (
//                       <tr key={p._id} className="border-t">
//                         <td className="p-2">{p.productName}</td>
//                         <td className="p-2 text-right">{p.quantity}</td>
//                         <td className="p-2">{p.unit}</td>
//                         <td className="p-2 text-right">₹{p.price}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             {/* ADD PRODUCT */}
//             <h3 className="text-lg font-semibold mb-2">Add Product</h3>

//             <div className="grid grid-cols-2 gap-3">
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Product Name"
//                 value={productForm.productName}
//                 onChange={(e) =>
//                   setProductForm({
//                     ...productForm,
//                     productName: e.target.value,
//                   })
//                 }
//               />

//               <input
//                 type="number"
//                 className="border p-2 rounded"
//                 placeholder="Quantity"
//                 value={productForm.quantity}
//                 onChange={(e) =>
//                   setProductForm({
//                     ...productForm,
//                     quantity: e.target.value,
//                   })
//                 }
//               />

//               <input
//                 className="border p-2 rounded"
//                 placeholder="Unit (kg / L / pcs)"
//                 value={productForm.unit}
//                 onChange={(e) =>
//                   setProductForm({
//                     ...productForm,
//                     unit: e.target.value,
//                   })
//                 }
//               />

//               <input
//                 type="number"
//                 className="border p-2 rounded"
//                 placeholder="Price ₹"
//                 value={productForm.price}
//                 onChange={(e) =>
//                   setProductForm({
//                     ...productForm,
//                     price: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <button
//               onClick={saveProduct}
//               className="mt-4 bg-black text-white px-6 py-2 rounded"
//             >
//               Add Product
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    warehouse: "",
    location: "",
    totalItems: "",
    capacity: "",
  });

  const navigate = useNavigate();

  /* ---------------- FETCH WAREHOUSES ---------------- */
  const fetchWarehouses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/warehouses");
      setWarehouses(res.data);
    } catch (err) {
      console.error("Failed to fetch warehouses", err);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.warehouse ||
      !form.location ||
      !form.capacity ||
      !form.totalItems
    ) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/warehouses", {
        warehouse: form.warehouse,
        location: form.location,
        totalItems: Number(form.totalItems),
        capacity: Number(form.capacity),
      });

      setForm({
        warehouse: "",
        location: "",
        totalItems: "",
        capacity: "",
      });

      setShowModal(false);
      fetchWarehouses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create warehouse");
      console.error(err);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 mt-15 min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Warehouses</h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} /> Add Warehouse
        </button>
      </div>

      {/* WAREHOUSE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warehouses.map((w) => (
          <div
            key={w._id}
            onClick={() => navigate(`/warehouse/${w._id}`)}
            className="bg-white p-5 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">Warehouse Name - {w.warehouse}</h3>
            <p className="text-gray-500">Location - {w.location}</p>

            <p className="text-sm mt-1">
              Total Items: <b>{w.totalItems}</b>
            </p>

            <p className="text-sm mt-1">
              Capacity: <b>{w.capacity}</b>
            </p>

            {/* OPTIONAL UTILIZATION */}
            {w.capacity > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Utilization</span>
                  <span>
                    {Math.round((w.totalItems / w.capacity) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{
                      width: `${Math.min(
                        (w.totalItems / w.capacity) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ADD WAREHOUSE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl relative">

            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowModal(false)}
            />

            <h2 className="text-xl font-bold mb-4">
              Add Warehouse
            </h2>

            <div className="space-y-3">
              <input
                name="warehouse"
                placeholder="Warehouse Name"
                className="w-full border p-2 rounded"
                value={form.warehouse}
                onChange={handleChange}
              />

              <input
                name="location"
                placeholder="Location"
                className="w-full border p-2 rounded"
                value={form.location}
                onChange={handleChange}
              />

              <input
                name="totalItems"
                type="number"
                placeholder="Total Items"
                className="w-full border p-2 rounded"
                value={form.totalItems}
                onChange={handleChange}
              />

              <input
                name="capacity"
                type="number"
                placeholder="Capacity"
                className="w-full border p-2 rounded"
                value={form.capacity}
                onChange={handleChange}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="mt-5 w-full bg-black text-white py-2 rounded-lg"
            >
              Save Warehouse
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
