;
import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function OrderAckForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    supplier: { name: "", address: "", shipFrom: "" },
    shippingDetails: { netWeight: "", grossWeight: "", orderDate: "", dispatchDate: "" },
    buyer: { name: "", address: "", gst: "" },
    shippingAddress: "",

    product: {
      productName: "",
      hsn: "",
      quantity: 0,
      unitPrice: 0,
      gstAmount: 0,
      totalAmount: 0,
    },

    quotation: {
      quotationNumber: "",
      quotationDate: "",
      piNumber: "",
      piDate: "",
      poNumber: "",
      poDate: "",
      paymentTerms: "",
    },

    packingDetails: {
      packSize: "",
      packingType: "",
      color: "",
      label: "",
    },

    transportDetails: {
      transportName: "",
      bookingPoint: "",
      bookingPersonName: "",
      bookingPersonContact: "",
    },
    paymentDetails: {
  paymentType: "",
  referenceNumber: "",
  additionalDocuments: "",
  additionalNotes: "",
},

  });

  const update = (path, value) => {
    const copy = structuredClone(form);
    path.split(".").reduce((o, k, i, arr) => {
      if (i === arr.length - 1) o[k] = value;
      return o[k];
    }, copy);
    setForm(copy);
  };

  /* Auto calculate total */
  const updateProduct = (key, value) => {
    const product = { ...form.product, [key]: value };
    product.totalAmount =
      product.quantity * product.unitPrice + product.gstAmount;
    setForm({ ...form, product });
  };

  const submit = async () => {
    try {
      // Convert product object to items array
      // const dataToSend = {
      //   ...form,
      //   items: [form.product],
      //   totalAmount: form.product.totalAmount
      // };
      const dataToSend = {
  ...form,
  items: [form.product],
  totalAmount: form.product.totalAmount,
};

      delete dataToSend.product; // Remove product field
      
      console.log("Sending data:", dataToSend);
      const response = await axios.post("http://localhost:5000/api/order-acknowledgements", dataToSend);
      console.log("Response:", response.data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error details:", error.response?.data);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-6xl p-6 rounded-xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Create Order Acknowledgement</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        {/* SUPPLIER */}
        <Section title="Supplier Details">
          <Input label="Supplier Name" onChange={(v) => update("supplier.name", v)} />
          <Input label="Address" onChange={(v) => update("supplier.address", v)} />
          <Input label="Ship From" onChange={(v) => update("supplier.shipFrom", v)} />
        </Section>

        {/* SHIPPING */}
        <Section title="Shipping Details">
          <Input label="Net Weight" onChange={(v) => update("shippingDetails.netWeight", v)} />
          <Input label="Gross Weight" onChange={(v) => update("shippingDetails.grossWeight", v)} />
          <Input type="date" label="Order Date" onChange={(v) => update("shippingDetails.orderDate", v)} />
          <Input type="date" label="Dispatch Date" onChange={(v) => update("shippingDetails.dispatchDate", v)} />
        </Section>

        {/* BUYER */}
        <Section title="Buyer Details">
          <Input label="Buyer Name" onChange={(v) => update("buyer.name", v)} />
          <Input label="Address" onChange={(v) => update("buyer.address", v)} />
          <Input label="GST" onChange={(v) => update("buyer.gst", v)} />
        </Section>

        {/* SHIPPING ADDRESS */}
        <Section title="Shipping Address">
          <textarea
            className="border px-3 py-2 rounded col-span-3"
            onChange={(e) => update("shippingAddress", e.target.value)}
          />
        </Section>

        {/* PRODUCT SECTION */}
        <Section title="Product Details">
          <Input label="Product Name" onChange={(v) => updateProduct("productName", v)} />
          <Input label="HSN" onChange={(v) => updateProduct("hsn", v)} />
          <Input type="number" label="Quantity" onChange={(v) => updateProduct("quantity", +v)} />
          <Input type="number" label="Unit Price" onChange={(v) => updateProduct("unitPrice", +v)} />
          <Input type="number" label="GST Amount" onChange={(v) => updateProduct("gstAmount", +v)} />

          <div className="font-bold text-lg col-span-3">
            Total Amount: ₹ {form.product.totalAmount}
          </div>
        </Section>

        {/* QUOTATION */}
        <Section title="Quotation / PO Details">
          <Input label="Quotation Number" onChange={(v) => update("quotation.quotationNumber", v)} />
          <Input type="date" label="Quotation Date" onChange={(v) => update("quotation.quotationDate", v)} />
          <Input label="PI Number" onChange={(v) => update("quotation.piNumber", v)} />
          <Input type="date" label="PI Date" onChange={(v) => update("quotation.piDate", v)} />
          <Input label="PO Number" onChange={(v) => update("quotation.poNumber", v)} />
          <Input type="date" label="PO Date" onChange={(v) => update("quotation.poDate", v)} />
          <Input label="Payment Terms" onChange={(v) => update("quotation.paymentTerms", v)} />
        </Section>

        {/* PACKING */}
        <Section title="Packing Details">
          <Input label="Pack Size" onChange={(v)=>update("packingDetails.packSize",v)} />
          <Select options={["Paper Bag","PP Bag","Blue Drum","White Jerry Can"]} onChange={(v)=>update("packingDetails.packingType",v)} />
          <Select options={["White","Brown"]} onChange={(v)=>update("packingDetails.color",v)} />
          <Input label="Label" onChange={(v)=>update("packingDetails.label",v)} />
        </Section>

        {/* TRANSPORT */}
        <Section title="Transport Details">
          <Input label="Transport Name" onChange={(v)=>update("transportDetails.transportName",v)} />
          <Input label="Booking Point" onChange={(v)=>update("transportDetails.bookingPoint",v)} />
          <Input label="Booking Person Name" onChange={(v)=>update("transportDetails.bookingPersonName",v)} />
          <Input label="Booking Person Contact" onChange={(v)=>update("transportDetails.bookingPersonContact",v)} />
        </Section>
        {/* PAYMENT DETAILS */}
<Section title="Payment & Additional Details">
  <Select
    options={["UPI", "Cash", "Cheque", "NEFT", "RTGS"]}
    onChange={(v) => update("paymentDetails.paymentType", v)}
  />

  <Input
    label="Payment Reference Number"
    onChange={(v) => update("paymentDetails.referenceNumber", v)}
  />

  <Input
    label="Additional Documents (Invoice No / LR No etc.)"
    onChange={(v) => update("paymentDetails.additionalDocuments", v)}
  />

  <textarea
    placeholder="Additional Notes"
    className="border px-3 py-2 rounded col-span-3"
    onChange={(e) => update("paymentDetails.additionalNotes", e.target.value)}
  />
</Section>


        <button onClick={submit} className="bg-green-600 text-white w-full py-2 rounded mt-6">
          Save Order Acknowledgement
        </button>
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

const Section = ({ title, children }) => (
  <div className="border p-4 rounded mb-4">
    <h3 className="font-semibold mb-3">{title}</h3>
    <div className="grid grid-cols-3 gap-3">{children}</div>
  </div>
);

const Input = ({ label, type="text", onChange }) => (
  <input
    type={type}
    placeholder={label}
    className="border px-3 py-2 rounded"
    onChange={(e)=>onChange?.(e.target.value)}
  />
);

const Select = ({ options, onChange }) => (
  <select className="border px-3 py-2 rounded" onChange={(e)=>onChange(e.target.value)}>
    <option value="">Select</option>
    {options.map(o=> <option key={o}>{o}</option>)}
  </select>
);
