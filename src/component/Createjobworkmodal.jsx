import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function CreateJobWorkModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    customerName: "",
    address: "",
    contactPerson: "",
    phone: "",
    gstin: "",
    placeOfSupply: "",
    jobType: "",
    jobWorkNo: "",
    jobWorkDate: "",
    challanNo: "",
    challanDate: "",
    lrNo: "",
    deliveryMode: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    await axios.post("http://localhost:5000/api/jobworks", form);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg relative">
        <X className="absolute right-4 top-4 cursor-pointer" onClick={onClose} />

        <h2 className="text-xl font-bold mb-4">Create Job Work</h2>

        {/* CUSTOMER INFO */}
        <div className="grid grid-cols-2 gap-4">
          <input name="customerName" placeholder="M/S *" onChange={handleChange} className="w-full border-2 border-black rounded py-2 px-2" />
          <input name="placeOfSupply" placeholder="Place of Supply *" onChange={handleChange} className="w-full border-2 border-black rounded py-2 px-2" />
          <textarea name="address" placeholder="Address" onChange={handleChange} className="w-full border-2 col-span-2 border-black rounded py-2 px-2" />
          <input name="contactPerson" placeholder="Contact Person" onChange={handleChange} className="w-full border-2 border-black rounded py-2 px-2" />
          <input name="phone" placeholder="Phone No" onChange={handleChange} className="w-full border-2 border-black rounded py-2 px-2" />
          <input name="gstin" placeholder="GSTIN / PAN" onChange={handleChange} className="w-full col-span-2 border-2 border-black rounded py-2 px-2" />
        </div>

        {/* JOB DETAILS */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <input name="jobType" placeholder="Job Type" onChange={handleChange} className="w-full border-2 border-black rounded py-2 px-2" />
          <input name="jobWorkNo" placeholder="Job Work No *" onChange={handleChange} className="w-full border-2 border-black rounded py-2 px-2" />
          <div className="flex flex-col">
  <label className="text-sm font-medium text-gray-700 mb-1">
    Job Work Date
  </label>
  <input
    type="date"
    name="jobWorkDate"
    value={form.jobWorkDate}
    onChange={handleChange}
    className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

          <input name="challanNo" placeholder="Challan No" onChange={handleChange} className="w-full border-2 border-black rounded py-2 px-2" />
          <div className="flex flex-col">
  <label className="text-sm font-medium text-gray-700 mb-1">
    Challan Date
  </label>
  <input
    type="date"
    name="challanDate"
    value={form.challanDate}
    onChange={handleChange}
    className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

          <input name="lrNo" placeholder="L.R No" onChange={handleChange} className="w-full border-2 border-black rounded py-2 px-2" />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={submit} className="px-4 py-2 bg-emerald-600 text-white rounded">
            Save Job Work
          </button>
        </div>
      </div>
    </div>
  );
}
