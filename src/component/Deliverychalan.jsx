import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";



export default function Deliverychalan() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
  from: "",
  to: "",
});
const navigate = useNavigate();


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

  challanPrefix: "",
  challanNo: "",
  challanPostfix: "",
  challanDate: "",
  lrNo: "",
  ewayNo: "",
  ewayReason: "",
  deliveryMode: "",
});

const [supplyType, setSupplyType] = useState("Outward");
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveChallan = async () => {
    await axios.post("https://aevix-chemical-mpbw.vercel.app/api/delivery-challan", form);
    setOpen(false);
    fetchData();
  };
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
    const res = await axios.get("https://aevix-chemical-mpbw.vercel.app/api/delivery-challan");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 mt-15 min-h-screen">
      {/* RIGHT BUTTON */}
      <div className="flex justify-end mb-4">
        {/* DATE FILTER */}
<div className="flex flex-wrap gap-4 mb-6 items-end">
  <div>
    <label className="text-sm font-medium">From Date</label>
    <input
      type="date"
      className="border px-3 py-2 rounded w-full"
      value={dateFilter.from}
      onChange={(e) =>
        setDateFilter({ ...dateFilter, from: e.target.value })
      }
    />
  </div>

  <div>
    <label className="text-sm font-medium">To Date</label>
    <input
      type="date"
      className="border px-3 py-2 rounded w-full"
      value={dateFilter.to}
      onChange={(e) =>
        setDateFilter({ ...dateFilter, to: e.target.value })
      }
    />
  </div>

  <button
    onClick={() => setDateFilter({ from: "", to: "" })}
    className="bg-gray-200 px-4 py-2 rounded h-10 flex items-center justify-center text-sm hover:bg-gray-300"
  >
    Clear
  </button>
</div>

        <button
          onClick={() => setOpen(true)}
          className="text-white px-4 py-2 mt-6 ml-5 rounded h-10 flex items-center gap-2 text-sm"
        >
          <Plus size={18} /> Create Delivery Challan
        </button>
      </div>

      {/* MODAL FORM */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-6xl p-6 rounded relative">
            <X
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="grid grid-cols-2 gap-6">
              {/* LEFT */}
              <div>
                <h3 className="font-semibold mb-3">Customer Information</h3>

                <div className="flex gap-4 mb-2">
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


                <input name="customerName" placeholder="M/S *" className="input w-full border-2 rounded px-2 py-2" onChange={handleChange} />
                <textarea name="address" placeholder="Address" className="input w-full border-2 rounded px-2 py-2 mt-2" onChange={handleChange} />
                <input
  name="state"
  placeholder="State"
  className="input w-full border-2 rounded px-2 py-2 mt-2"
  onChange={handleChange}
/>

<textarea
  name="shippingAddress"
  placeholder="Shipping Address"
  className="input w-full border-2 rounded px-2 py-2 mt-2"
  onChange={handleChange}
/>

                <div className="flex gap-3">
                <input name="contactPerson" placeholder="Contact Person" className=" border-2 w-100 rounded px-2 py-2 input mt-2" onChange={handleChange} />
                <input name="phone" placeholder="Phone No" className="  border-2 rounded px-2 w-100 py-2input mt-2" onChange={handleChange} />
                </div>
                <div className="flex gap-3">
                <input name="gstin" placeholder="GSTIN / PAN" className=" border-2 rounded w-100 px-2 py-2 input mt-2" onChange={handleChange} />

                {/* <select name="reverseCharge" className="input mt-2  border-2 rounded px-2 py-2" onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                </select> */}

                <input name="placeOfSupply" placeholder="Place of Supply *" className="input w-100 border-2 rounded px-2 py-2 mt-2" onChange={handleChange} />
              </div>
              </div>

              {/* RIGHT */}
              <div>
                <h3 className="font-semibold mb-3">Delivery Challan Detail</h3>

                 {/* <select name="type" className="input" onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option>Job Work</option>
                  <option>Supply</option>
                  <option>Return</option>
                </select>  */}

                <div className="flex gap-2 mt-2">
                  <input name="challanPrefix" placeholder="Prefix" className="input w-1/3 border-2 rounded px-2 py-2" onChange={handleChange} />
                  <input name="challanNo" placeholder="Challan No *" className="input w-1/3 border-2 rounded px-2 py-2" onChange={handleChange} />
                  <input
  name="productName"
  placeholder="Product Name"
  className="input w-full border-2 rounded px-2 py-2 mt-2"
  onChange={handleChange}
/>

<input
  type="number"
  name="quantity"
  placeholder="Quantity"
  className="input w-full border-2 rounded px-2 py-2 mt-2"
  onChange={handleChange}
/>

                  <input name="challanPostfix" placeholder="Postfix" className="input w-1/3 border-2 rounded px-2 py-2" onChange={handleChange} />
                </div>
                  <div className="grid grid-cols-2 gap-3">
                <input type="date" name="challanDate" className="input mt-2  border-2 rounded px-2 py-2" onChange={handleChange} />
                <input name="lrNo" placeholder="L.R. No" className="input mt-2 border-2 rounded px-2 py-2" onChange={handleChange} />
                </div>
                <div className="grid grid-col-2 gap-3">
                <input name="ewayNo" placeholder="E-Way No" className="input mt-2 border-2 rounded px-2 py-2" onChange={handleChange} />
                <input name="ewayReason" placeholder="Reason for E-Way" className="input border-2 rounded px-2 py-2 mt-2" onChange={handleChange} />
                  </div>
                <select name="deliveryMode" className="input mt-2 w-full border-2 rounded px-2 py-2" onChange={handleChange}>
                  <option value="">Select Delivery Mode</option>
                  <option>Road</option>
                  <option>Courier</option>
                  <option>Transport</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={saveChallan}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Save Delivery Challan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      <table className="w-full border border-gray-300 rounded">
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

        <td className="border p-2 font-medium">
          {dc.challanPrefix}
          {dc.challanNo}
          {dc.challanPostfix}
        </td>

        <td className="border p-2">{dc.lrNo}</td>

        <td className="border p-2">
          {dc.challanDate?.slice(0, 10)}
        </td>

        <td className="border p-2">{dc.deliveryMode}</td>

        {/* ACTION COLUMN */}
        <td className="border p-2 text-center">
          <button
            onClick={() =>
              navigate(`/delivery-challan/view/${dc._id}`)
            }
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
  );
}
