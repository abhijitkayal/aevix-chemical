import React, { useEffect, useState } from "react";
import axios from "axios";

const Batch = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    batchNo: "",
    productName: "",
    warehouseId: "",
    materials: [],
  });

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchWarehouses();
    fetchBatches();
  }, []);

  const fetchWarehouses = async () => {
    const res = await axios.get("https://aevix-chemical-mpbw.vercel.app/api/warehouses");
    setWarehouses(res.data);
  };

  const fetchBatches = async () => {
    const res = await axios.get("https://aevix-chemical-mpbw.vercel.app/api/batches");
    setBatches(res.data);
  };

  /* ================= ADD MATERIAL ================= */
  const addMaterial = () => {
    setForm({
      ...form,
      materials: [
        ...form.materials,
        { materialName: "", quantity: "", bags: "" },
      ],
    });
  };

  const updateMaterial = (index, field, value) => {
    const updated = [...form.materials];
    updated[index][field] = value;
    setForm({ ...form, materials: updated });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      await axios.post("https://aevix-chemical-mpbw.vercel.app/api/batches", form);
      alert("Batch created & stock updated");

      setForm({
        batchNo: "",
        productName: "",
        warehouseId: "",
        materials: [],
      });

      setShowForm(false);
      fetchBatches();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="flex  mt-10 min-h-screen">
      {/* LEFT SIDE – LATEST BATCHES */}
      <div className="flex-1  p-6">
        <h2 className="text-xl font-bold mb-4">Latest Batches</h2>

        <div className="space-y-3">
          {batches.map((b) => (
            <div
              key={b._id}
              className="bg-white p-4 rounded shadow"
            >
              <p className="font-semibold">
                Batch: {b.batchNo}
              </p>
              <p className="text-sm text-gray-600">
                Product: {b.productName}
              </p>
              <p className="text-sm">
                Warehouse: {b.warehouseId?.warehouse}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

          {batches.length === 0 && (
            <p className="text-gray-500">No batches found</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[420px] mt-10 border-l p-6 relative">
        {/* {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-black mt-10 text-white w-full py-3 rounded text-lg"
          >
            + Create Batch
          </button>
        )} */}

        { (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Batch</h2>
              {/* <button
                onClick={() => setShowForm(false)}
                className="text-red-500 font-bold"
              >
                ✕
              </button> */}
            </div>

            <input
              placeholder="Batch No"
              className="border p-2 w-full mb-3"
              value={form.batchNo}
              onChange={(e) =>
                setForm({ ...form, batchNo: e.target.value })
              }
            />

            <input
              placeholder="Product Name"
              className="border p-2 w-full mb-3"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
            />

            <select
              className="border p-2 w-full mb-4"
              value={form.warehouseId}
              onChange={(e) =>
                setForm({ ...form, warehouseId: e.target.value })
              }
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.warehouse}
                </option>
              ))}
            </select>

            {/* MATERIALS */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">Materials</h4>
                <button
                  onClick={addMaterial}
                  className="text-sm bg-black text-white px-2 py-1 rounded"
                >
                  + Add
                </button>
              </div>

              {form.materials.map((m, i) => (
                <div key={i} className="border p-2 mb-2 rounded">
                  <input
                    placeholder="Material Name"
                    className="border p-1 w-full mb-1"
                    value={m.materialName}
                    onChange={(e) =>
                      updateMaterial(i, "materialName", e.target.value)
                    }
                  />

                  <input
                    placeholder="Quantity"
                    type="number"
                    className="border p-1 w-full mb-1"
                    value={m.quantity}
                    onChange={(e) =>
                      updateMaterial(i, "quantity", e.target.value)
                    }
                  />

                  <input
                    placeholder="No of Bags"
                    type="number"
                    className="border p-1 w-full"
                    value={m.bags}
                    onChange={(e) =>
                      updateMaterial(i, "bags", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="bg-black text-white w-full py-2 rounded"
            >
              Save Batch
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Batch;
