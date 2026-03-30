;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { API_URL } from "../config/api";

const formatDateForInput = (dateValue) => {
  if (!dateValue) return "";
  if (typeof dateValue === "string") {
    return dateValue.includes("T") ? dateValue.slice(0, 10) : dateValue;
  }

  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 10);
};

export default function OrderAckForm({ onClose, onSuccess }) {
  const [leadSuggestions, setLeadSuggestions] = useState([]);
  const [showLeadSuggestions, setShowLeadSuggestions] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseProducts, setWarehouseProducts] = useState([]);

  const [form, setForm] = useState({
    supplier: { name: "", address: "", shipFrom: "" },
    shippingDetails: { netWeight: "", grossWeight: "", orderDate: "", dispatchDate: "" },
    buyer: { name: "", address: "", gst: "" },
    warehouseId: "",
    warehouseName: "",
    shippingAddress: "",

    // product: {
    //   productName: "",
    //   hsn: "",
    //   quantity: 0,
    //   unitPrice: 0,
    //   gstAmount: 0,
    //   totalAmount: 0,
    // },

    products: [
  {
    productName: "",
    hsn: "",
    quantity: 0,
    unitPrice: 0,
    gstAmount: 0,
    totalAmount: 0,
  },
],


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

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/warehouses`);
        setWarehouses(res.data || []);
      } catch (error) {
        console.error("Failed to fetch warehouses", error);
      }
    };

    fetchWarehouses();
  }, []);

  const addProduct = () => {
  setForm((prev) => ({
    ...prev,
    products: [
      ...prev.products,
      {
        productName: "",
        hsn: "",
        quantity: 0,
        unitPrice: 0,
        gstAmount: 0,
        totalAmount: 0,
      },
    ],
  }));
};

const removeProduct = (index) => {
  setForm((prev) => ({
    ...prev,
    products: prev.products.filter((_, i) => i !== index),
  }));
};

const updateProduct = (index, key, value) => {
  const products = [...form.products];
  const product = { ...products[index], [key]: value };

  if (key === "productName") {
    const selectedProduct = warehouseProducts.find((p) => p.productName === value);
    if (selectedProduct) {
      product.hsn = selectedProduct.hsnCode || selectedProduct.hsn || "";
    }
  }

  product.totalAmount =
    Number(product.quantity) * Number(product.unitPrice) + Number(product.gstAmount);

  products[index] = product;

  setForm({ ...form, products });
};

const grandTotal = form.products.reduce(
  (sum, p) => sum + (Number(p.totalAmount) || 0),
  0
);


  const update = (path, value) => {
    const copy = structuredClone(form);
    path.split(".").reduce((o, k, i, arr) => {
      if (i === arr.length - 1) o[k] = value;
      return o[k];
    }, copy);
    setForm(copy);
  };

  const handleBuyerNameChange = async (value) => {
    update("buyer.name", value);

    if (value.trim().length < 2) {
      setLeadSuggestions([]);
      setShowLeadSuggestions(false);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/leads?search=${encodeURIComponent(value)}`);
      setLeadSuggestions(res.data || []);
      setShowLeadSuggestions(true);
    } catch (error) {
      console.error("Failed to fetch lead suggestions", error);
      setLeadSuggestions([]);
      setShowLeadSuggestions(false);
    }
  };

  const handleLeadSelect = (lead) => {
    const leadBillingDate = formatDateForInput(lead.billingDate);
    const leadShippingDate = formatDateForInput(lead.reminderDate);

    setForm((prev) => ({
      ...prev,
      buyer: {
        ...prev.buyer,
        name: lead.customerName || lead.companyName || "",
        address: lead.address || "",
        gst: lead.gstin || "",
      },
      shippingDetails: {
        ...prev.shippingDetails,
        orderDate: leadBillingDate || prev.shippingDetails.orderDate,
        dispatchDate: leadShippingDate || prev.shippingDetails.dispatchDate,
      },
      shippingAddress: lead.shippingAddress || prev.shippingAddress || "",
    }));
    setLeadSuggestions([]);
    setShowLeadSuggestions(false);
  };

  const handleWarehouseChange = async (warehouseId) => {
    const selectedWarehouse = warehouses.find((w) => w._id === warehouseId);

    setForm((prev) => ({
      ...prev,
      warehouseId,
      warehouseName: selectedWarehouse?.warehouse || "",
      products: prev.products.map((p) => ({ ...p, productName: "", hsn: "" })),
    }));

    if (!warehouseId) {
      setWarehouseProducts([]);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/products/${warehouseId}`);
      setWarehouseProducts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch warehouse products", error);
      setWarehouseProducts([]);
    }
  };

  /* Auto calculate total */
  // const updateProduct = (key, value) => {
  //   const product = { ...form.product, [key]: value };
  //   product.totalAmount =
  //     product.quantity * product.unitPrice + product.gstAmount;
  //   setForm({ ...form, product });
  // };

//   const submit = async () => {
//     try {
//       // Convert product object to items array
//       // const dataToSend = {
//       //   ...form,
//       //   items: [form.product],
//       //   totalAmount: form.product.totalAmount
//       // };
//       const dataToSend = {
//   ...form,
//   items: [form.product],
//   totalAmount: form.product.totalAmount,
// };

//       delete dataToSend.product; // Remove product field
      
//       console.log("Sending data:", dataToSend);
//       const response = await axios.post("https://aevix-chemical-mpbw.vercel.app/api/order-acknowledgements", dataToSend);
//       console.log("Response:", response.data);
//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error("Error details:", error.response?.data);
//       alert(`Error: ${error.response?.data?.message || error.message}`);
//     }
//   };


const submit = async () => {
  try {
    const dataToSend = {
      ...form,
      items: form.products,
      totalAmount: grandTotal,
    };

    delete dataToSend.products;

    console.log("Sending data:", dataToSend);

    const response = await axios.post(`${API_URL}/api/order-acknowledgements`, dataToSend);

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
          <Input
            type="date"
            label="Order Date"
            value={form.shippingDetails.orderDate}
            onChange={(v) => update("shippingDetails.orderDate", v)}
          />
          <Input
            type="date"
            label="Dispatch Date"
            value={form.shippingDetails.dispatchDate}
            onChange={(v) => update("shippingDetails.dispatchDate", v)}
          />
        </Section>

        {/* BUYER */}
        <Section title="Buyer Details">
          <div className="col-span-3 relative">
            <Input
              label="Buyer Name"
              value={form.buyer.name}
              onChange={handleBuyerNameChange}
            />

            {showLeadSuggestions && leadSuggestions.length > 0 && (
              <div className="absolute bg-white border w-full z-20 mt-1 max-h-44 overflow-y-auto shadow rounded">
                {leadSuggestions.map((lead) => (
                  <div
                    key={lead._id}
                    className="px-3 py-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLeadSelect(lead)}
                  >
                    <p className="font-medium text-sm">{lead.customerName || lead.companyName}</p>
                    <p className="text-xs text-gray-600">{lead.customerId || ""} {lead.phone ? `• ${lead.phone}` : ""}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Input label="Address" value={form.buyer.address} onChange={(v) => update("buyer.address", v)} />
          <Input label="GST" value={form.buyer.gst} onChange={(v) => update("buyer.gst", v)} />
        </Section>

        <Section title="Warehouse Details">
          <div className="col-span-3">
            <select
              className="border px-3 py-2 rounded w-full"
              value={form.warehouseId}
              onChange={(e) => handleWarehouseChange(e.target.value)}
            >
              <option value="">Select Warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.warehouse}
                </option>
              ))}
            </select>
          </div>
        </Section>

        {/* SHIPPING ADDRESS */}
        <Section title="Shipping Address">
          <textarea
            className="border px-3 py-2 rounded col-span-3"
            value={form.shippingAddress}
            onChange={(e) => update("shippingAddress", e.target.value)}
          />
        </Section>

        {/* PRODUCT SECTION */}
       {/* PRODUCT SECTION */}
<Section title="Product Details">
  <div className="col-span-3 flex justify-between items-center mb-3">
    <p className="font-semibold">Add multiple products</p>

    <button
      type="button"
      onClick={addProduct}
      className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
    >
      + Add Product
    </button>
  </div>

  {form.products.map((product, index) => (
    <div key={index} className="col-span-3 border rounded p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">Product {index + 1}</h4>

        {form.products.length > 1 && (
          <button
            type="button"
            onClick={() => removeProduct(index)}
            className="text-red-600 text-sm font-semibold"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <select
          className="border px-3 py-2 rounded"
          value={product.productName}
          onChange={(e) => updateProduct(index, "productName", e.target.value)}
          disabled={!form.warehouseId}
        >
          <option value="">
            {form.warehouseId ? "Select Product" : "Select Warehouse First"}
          </option>
          {warehouseProducts.map((p) => (
            <option key={p._id} value={p.productName}>
              {p.productName}
            </option>
          ))}
        </select>

        <Input label="HSN" value={product.hsn} onChange={(v) => updateProduct(index, "hsn", v)} />

        <Input
          type="number"
          label="Quantity"
          value={product.quantity}
          onChange={(v) => updateProduct(index, "quantity", +v)}
        />

        <Input
          type="number"
          label="Unit Price"
          value={product.unitPrice}
          onChange={(v) => updateProduct(index, "unitPrice", +v)}
        />

        <Input
          type="number"
          label="GST Amount"
          value={product.gstAmount}
          onChange={(v) => updateProduct(index, "gstAmount", +v)}
        />

        <div className="font-bold text-lg col-span-3">
          Product Total: ₹ {product.totalAmount}
        </div>
      </div>
    </div>
  ))}

  <div className="font-bold text-xl col-span-3 text-right">
    Grand Total: ₹ {grandTotal}
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

const Input = ({ label, type="text", onChange, value }) => (
  <input
    type={type}
    placeholder={label}
    className="border px-3 py-2 rounded"
    value={value ?? ""}
    onChange={(e)=>onChange?.(e.target.value)}
  />
);

const Select = ({ options, onChange }) => (
  <select className="border px-3 py-2 rounded" onChange={(e)=>onChange(e.target.value)}>
    <option value="">Select</option>
    {options.map(o=> <option key={o}>{o}</option>)}
  </select>
);
