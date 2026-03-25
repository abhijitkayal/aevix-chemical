import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

export default function Deliverychalan() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });
  const navigate = useNavigate();

const currentYear = new Date().getFullYear();

const [form, setForm] = useState({
  supplyType: "Outward",
  customerName: "",
  address: "",
  shippingAddress: "",
  state: "",
  contactPerson: "",
  phone: "",
  gstin: "",
  placeOfSupply: "",

  productName: "",
  quantity: "",

  challanPrefix: "DC",   // ✅ default prefix
  challanNo: "",
  challanPostfix: currentYear.toString(), // ✅ year postfix
  challanDate: "",
  lrNo: "",
  ewayNo: "",
  ewayReason: "",
  deliveryMode: "",
  vehicleNo:"",
});

  const [supplyType, setSupplyType] = useState("Outward");
  const handleChange = async (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value });
     const { name, value } = e.target;
    if (name === "customerName") {
    if (value.length >= 2) {
      try {
        const res = await axios.get(
          `${API_URL}/api/leads?search=${encodeURIComponent(value)}`
        );
        setSuggestions(res.data);
        setShowSuggestions(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }
  }

  const saveChallan = async () => {
    await axios.post(
      "https://aevix-chemical-mpbw.vercel.app/api/delivery-challan",
      form,
    );
    setOpen(false);
    fetchData();
  };
  const [suggestions, setSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);
  const filteredData = data.filter((dc) => {
    if (!dateFilter.from && !dateFilter.to) return true;
    if (!dc.challanDate) return false;

    const challanDate = new Date(dc.challanDate);
    const from = dateFilter.from ? new Date(dateFilter.from) : null;
    const to = dateFilter.to ? new Date(dateFilter.to) : null;

    if (from && challanDate < from) return false;
    if (to && challanDate > to) return false;

    return true;
  });

const fetchData = async () => {
  const res = await axios.get(
    "https://aevix-chemical-mpbw.vercel.app/api/delivery-challan"
  );

  setData(res.data);

  // ✅ Auto generate next challan number
  if (res.data.length > 0) {
    const last = res.data[res.data.length - 1]; // last entry
    const nextNo = Number(last.challanNo || 0) + 1;

    setForm((prev) => ({
      ...prev,
      challanNo: nextNo,
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      challanNo: 1,
    }));
  }
};
const getNextNumber = async () => {
  const res = await axios.get(`${API_URL}/api/delivery-challan/next-number`);

  setForm((prev) => ({
    ...prev,
    challanNo: res.data.nextNo,
  }));
};


  


  useEffect(() => {
    fetchData();
    getNextNumber();
  }, []);

  return (
    <div className="p-6 mt-10 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Delivery Challan
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          <Plus className="mr-2" size={18} />
          Create Delivery Challan
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

      {/* MODAL FORM */}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-6xl p-4 md:p-6 rounded relative max-h-[95vh] overflow-y-auto">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LEFT */}
              <div>
                <h3 className="font-semibold mb-3">Customer Information</h3>

                <div className="flex flex-col sm:flex-row gap-4 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="supplyType"
                      value="Outward"
                      checked={supplyType === "Outward"}
                      onChange={(e) => setSupplyType(e.target.value)}
                    />
                    Outward
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="supplyType"
                      value="Inward"
                      checked={supplyType === "Inward"}
                      onChange={(e) => setSupplyType(e.target.value)}
                    />
                    Inward
                  </label>
                </div>

                {/* <input
                  name="customerName"
                  placeholder="M/S *"
                  className="w-full border-2 rounded px-2 py-2"
                  onChange={handleChange}
                /> */}
                <div className="relative">
  <input
    name="customerName"
    placeholder="M/S *"
    className="w-full border-2 rounded px-2 py-2"
    value={form.customerName}
    onChange={handleChange}
    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
  />

  {showSuggestions && suggestions.length > 0 && (
    <div className="absolute bg-white border w-full z-10 max-h-40 overflow-y-auto shadow-md rounded">
      {suggestions.map((item) => (
        <div
          key={item._id}
          className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
          onClick={() => {
            setForm((prev) => ({
              ...prev,
              customerName: item.customerName || item.companyName || "",
              address: item.address || "",
              shippingAddress: item.shippingAddress || "",
              state: item.state || "",
              contactPerson: item.customerName || item.companyName || "",
              phone: item.phone || "",
              gstin: item.gstin || "",
              placeOfSupply: item.placeOfSupply || "",
            }));
            setSuggestions([]);
            setShowSuggestions(false);
          }}
        >
          <p className="font-medium text-gray-900">{item.customerName || item.companyName}</p>
          <p className="text-xs text-gray-600">{item.customerId || ""} {item.phone ? `• ${item.phone}` : ""}</p>
        </div>
      ))}
    </div>
  )}

  {showSuggestions && form.customerName.length >= 2 && suggestions.length === 0 && (
    <div className="absolute bg-white border w-full z-10 p-2 text-sm text-gray-500 shadow-md rounded">
      No customer found
    </div>
  )}
</div>

                <textarea
                  name="address"
                  placeholder="Address"
                  className="w-full border-2 rounded px-2 py-2 mt-2"
                  onChange={handleChange}
                  value={form.address}
                />

                <input
                  name="state"
                  placeholder="State"
                  className="w-full border-2 rounded px-2 py-2 mt-2"
                  onChange={handleChange}
                  value={form.state}
                />

                <textarea
                  name="shippingAddress"
                  placeholder="Shipping Address"
                  className="w-full border-2 rounded px-2 py-2 mt-2"
                  onChange={handleChange}
                  value={form.shippingAddress}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="contactPerson"
                    placeholder="Contact Person"
                    className="border-2 rounded px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={form.contactPerson}
                  />
                  <input
                    name="phone"
                    placeholder="Phone No"
                    className="border-2 rounded px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={form.phone}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="gstin"
                    placeholder="GSTIN / PAN"
                    className="border-2 rounded px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={form.gstin}
                  />
                  <input
                    name="placeOfSupply"
                    placeholder="Place of Supply *"
                    className="border-2 rounded px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={form.placeOfSupply}
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div>
                <h3 className="font-semibold mb-3">Delivery Challan Detail</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
  name="challanPrefix"
  className="border-2 rounded px-2 py-2"
  value={form.challanPrefix}
  readOnly
/>

<input
  name="challanNo"
  className="border-2 rounded px-2 py-2"
  value={form.challanNo}
  readOnly
/>

<input
  name="challanPostfix"
  className="border-2 rounded px-2 py-2"
  value={form.challanPostfix}
  readOnly
/>
                </div>

                <input
                  name="productName"
                  placeholder="Product Name"
                  className="w-full border-2 rounded px-2 py-2 mt-2"
                  onChange={handleChange}
                  value={form.productName}
                />

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="w-full border-2 rounded px-2 py-2 mt-2"
                  onChange={handleChange}
                  value={form.quantity}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="date"
                    name="challanDate"
                    className="border-2 rounded px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={form.challanDate}
                  />
                  <input
                    name="lrNo"
                    placeholder="L.R. No"
                    className="border-2 rounded px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={form.lrNo}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="ewayNo"
                    placeholder="E-Way No"
                    className="border-2 rounded px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={form.ewayNo}
                  />
                  <input
                    name="ewayReason"
                    placeholder="Reason for E-Way"
                    className="border-2 rounded px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={form.ewayReason}
                  />
                </div>
                 <input
                    name="vehicleNo"
                    placeholder="Vehicle No"
                    className="border-2 rounded px-2 py-2 mt-2"
                    onChange={handleChange}
                    value={form.vehicleNo}
                  />

                <select
                  name="deliveryMode"
                  className="w-full border-2 rounded px-2 py-2 mt-2"
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

            {/* FOOTER */}
            <div className="flex justify-end mt-6">
              <button
                onClick={saveChallan}
                className="bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto"
              >
                Save Delivery Challan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-250 w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Customer</th>
              <th className="border p-2 text-left">Address</th>
              <th className="border p-2 text-left">Phone</th>
              <th className="border p-2 text-left">GSTIN</th>
              <th className="border p-2 text-left">Challan No</th>
              <th className="border p-2 text-left">LR No</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Delivery Mode</th>
              <th className="border p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((dc) => (
              <tr key={dc._id} className="hover:bg-gray-50">
                <td className="border p-2">{dc.customerName}</td>
                <td className="border p-2">{dc.address}</td>
                <td className="border p-2">{dc.phone}</td>
                <td className="border p-2">{dc.gstin}</td>

                <td className="border p-2 font-medium whitespace-nowrap">
                  {dc.challanPrefix}
                  {dc.challanNo}
                  {dc.challanPostfix}
                </td>

                <td className="border p-2">{dc.lrNo}</td>

                <td className="border p-2 whitespace-nowrap">
                  {dc.challanDate?.slice(0, 10)}
                </td>

                <td className="border p-2">{dc.deliveryMode}</td>

                <td className="border p-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/delivery-challan/view/${dc._id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
