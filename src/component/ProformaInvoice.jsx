import { Download, X } from "lucide-react";
import logo from "../assets/azajul photo.jpeg";

export default function ProformaInvoiceView({ data, onClose, onDownload }) {
  if (!data) return null;

  const products = Array.isArray(data.products) ? data.products : [];
  const productsTotal = products.reduce((sum, product) => {
    const quantity = Number(product?.quantity) || 0;
    const price = Number(product?.price) || 0;
    return sum + quantity * price;
  }, 0);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch {
      return dateString;
    }
  };

  const toCurrency = (value) => (Number(value) || 0).toFixed(2);

  const gstPercent = Number(data?.gstPercent ?? data?.gstRate ?? 18) || 18;
  const freightAmount = Number(data?.freightAmount ?? data?.freight ?? 0) || 0;
  const subtotal = productsTotal;
  const taxableAmount = subtotal + freightAmount;

  const placeOfSupply = String(data?.placeOfSupply || "").toLowerCase().trim();
  const isWestBengal = placeOfSupply.includes("west bengal") || placeOfSupply === "wb";

  const cgstAmount = isWestBengal ? (taxableAmount * gstPercent) / 200 : 0;
  const sgstAmount = isWestBengal ? (taxableAmount * gstPercent) / 200 : 0;
  const igstAmount = isWestBengal ? 0 : (taxableAmount * gstPercent) / 100;
  const grandTotal = taxableAmount + cgstAmount + sgstAmount + igstAmount;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold">PROFORMA INVOICE</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2 text-sm"
            >
              <Download size={16} /> Download PDF
            </button>
            <button
              onClick={onClose}
              className="text-red-600 font-bold text-xl px-2"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div
            id="invoice-print"
            className="mx-auto bg-white border border-gray-200"
            style={{
              width: "100%",
              maxWidth: "794px",
              minHeight: "1123px",
              padding: "24px",
              boxSizing: "border-box",
            }}
          >
            <img
              src={logo}
              alt="Company Logo"
              style={{ height: "120px", width: "120px" }}
              className="-ml-2 sm:h-20 object-contain"
            />

            <div className="flex justify-between items-start gap-4 -mt-8 mb-6">
              <div className="text-xs sm:text-sm leading-snug text-left max-w-[62%]">
                <p className="font-bold text-sm sm:text-base">AEVIX CHEMICAL INDIA LIMITED</p>
                <p>
                  115, VILL. UTTAR JOJRA, PO. ROHANDA, PS. MADHYAMGRAM,
                  KOLKATA, WEST BENGAL - 700135
                </p>
                <p>Telephone: 033 31556300</p>
                <a href="http://www.aevixchemical.com" className="text-blue-600 underline">
                  Website: www.aevixchemical.com
                </a>
                <p>GST IN: 19ABBCA1860B1Z4</p>
              </div>

              <div className="w-72 shrink-0 text-left">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Proforma Invoice</h3>
                <table className="w-full border-collapse text-xs sm:text-sm">
                  <tbody>
                    <tr>
                      <td className="px-2 py-1 font-medium">Date</td>
                      <td className="border-b px-2 py-1 bg-gray-200">{data.proformaDate || "-"}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 font-medium">Validity</td>
                      <td className="border-b px-2 py-1 bg-gray-200">{data.validity || "-"}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1 font-medium">Proforma No</td>
                      <td className="px-2 py-1 bg-gray-200">{data.proformaNo || "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
              <div className=" rounded p-3">
                <h4 className="bg-black text-white w-full h-8 pt-1 pb-3 flex items-center">BILL TO/CUSTOMER</h4>
                <p><strong>Customer:</strong> {data.customerName || "-"}</p>
                <p><strong>Address:</strong> {data.billingAddress || "-"}</p>
                <p><strong>Phone:</strong> {data.phone || "-"}</p>
                <p><strong>GSTIN:</strong> {data.gstin || "-"}</p>
                <p><strong>Place of Supply:</strong> {data.placeOfSupply || "-"}</p>
              </div>

              <div className=" rounded p-3">
                <h4 className="bg-black text-white w-full h-8 pt-1 pb-3 flex items-center">SHIP TO</h4>
                <p><strong>Customer:</strong> {data.customerName || "-"}</p>
                <p><strong>Address:</strong> {data.shippingAddress || "-"}</p>
                <p><strong>PHONE:</strong> {data.phone || "-"}</p>
               
              </div>
               <div className=" rounded p-3">
                <h4 className="bg-black text-white w-full h-8 pt-1 pb-3 flex items-center">SHIPPING details</h4>
                <p><strong>Freight Type:</strong> {data.freightType || "-"}</p>
                <p><strong>Gross Weight:</strong> {data.grossWeight || "-"} kgs</p>
                <p><strong>Net Weight:</strong> {data.netWeight || "-"} kgs</p>
                <p><strong>Total Packages:</strong> {data.totalPackages || "-"} bags</p>
              </div>
            </div>

            <div className="overflow-x-auto border rounded mb-4">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Product Name</th>
                    <th className="p-2 text-left">Unit</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-left">HSN Code</th>
                    <th className="p-2 text-right">Qty</th>
                    <th className="p-2 text-right">Price</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500">
                        No products added
                      </td>
                    </tr>
                  )}

                  {products.map((product, index) => {
                    const quantity = Number(product?.quantity) || 0;
                    const price = Number(product?.price) || 0;

                    return (
                      <tr key={`product-preview-${index}`} className="border-t border-b">
                        <td className="p-2">{product?.productName || "-"}</td>
                        <td className="p-2">{product?.unit || "-"}</td>
                        <td className="p-2">{product?.description || "-"}</td>
                        <td className="p-2">{product?.hsnCode || "-"}</td>
                        <td className="p-2 text-right">{quantity}</td>
                        <td className="p-2 text-right">{price.toFixed(2)}</td>
                        <td className="p-2 text-right">{(quantity * price).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  {Array.from({ length: Math.max(0, 5 - products.length) }).map((_, i) => (
    <tr key={i}>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>&nbsp;</td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
      {isWestBengal ? (
        <>
          <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}></td>
          <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>-</td>
        </>
      ) : (
        <td style={{ textAlign: 'center', verticalAlign: 'middle', height: '42px', padding: '12px 5px', lineHeight: '1.4' }}>-</td>
      )}
    </tr>
  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t bg-gray-50 font-semibold">
                    <td colSpan={6} className="p-2 text-right">Products Total</td>
                    <td className="p-2 text-right">{productsTotal.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
                <div className="flex justify-between">
            <div className="border border-gray-300 rounded w-110 text-sm">
                <h2 className="bg-black text-white w-full h-8 pt-1 pb-3 flex items-center">TERMS OF SALE AND OTHER COMMENTS</h2>
              <p><b>TRANSPORT:</b> {data.deliveryMode || "-"}</p>
              <p><b>PAYMENT TERM:</b> Advanced</p>
              {/* <p><b>DELIVERY TERMS:</b> {data.deliveryMode || "-"}</p> */}
              <hr/>
              <p><b>Account Name:</b> Aevix Chemical India Limited</p>
              <div className="grid grid-cols-2">
                <p><b>Bank Name:</b> State Bank Of India</p>
                <p><b>Account no:</b>43320503750</p>
                <p><b>Branch Address:</b> SME N.S Road</p>
                <p><b>IFSC:</b> SBIN0015197</p>
              </div>
             
            </div>
            <div>
                  <table className="text-sm border border-gray-300 rounded min-w-72.5">
                    <tbody>
                      <tr>
                        <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '34px', width: '160px', padding: '4px 8px', lineHeight: '1.4' }}>Subtotal</td>
                        <td style={{ textAlign: 'right', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>{toCurrency(subtotal)}</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>Add: Freight</td>
                        <td style={{ textAlign: 'right', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>{toCurrency(freightAmount)}</td>
                      </tr>
                      <tr>
                        <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>Taxable Amount</td>
                        <td style={{ textAlign: 'right', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>{toCurrency(taxableAmount)}</td>
                      </tr>

                      {isWestBengal ? (
                        <>
                          <tr>
                            <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>CGST ({toCurrency(gstPercent / 2)}%)</td>
                            <td style={{ textAlign: 'right', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>{toCurrency(cgstAmount)}</td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>SGST ({toCurrency(gstPercent / 2)}%)</td>
                            <td style={{ textAlign: 'right', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>{toCurrency(sgstAmount)}</td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>IGST ({toCurrency(gstPercent)}%)</td>
                          <td style={{ textAlign: 'right', verticalAlign: 'middle', height: '34px', padding: '4px 8px', lineHeight: '1.4' }}>{toCurrency(igstAmount)}</td>
                        </tr>
                      )}

                      <tr className="bg-blue-100">
                        <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '38px', padding: '6px 8px', lineHeight: '1.4', fontWeight: 700, borderTop: '1px solid #d1d5db' }}>Grand Total</td>
                        <td style={{ textAlign: 'right', verticalAlign: 'middle', height: '38px', padding: '6px 8px', lineHeight: '1.4', fontWeight: 700, borderTop: '1px solid #d1d5db' }}>{toCurrency(grandTotal)}</td>
                      </tr>
                    </tbody>
                  </table>
            </div>
            
            </div>
            <div className="mt-2">
                <h2 className="bg-black text-white w-full h-8 pt-1 pb-3 flex items-center">ADDITIONAL DETAILS</h2>
                <tr>
                        <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '10px', padding: '0px 8px', lineHeight: '1.4',  borderTop: '1px solid #d1d5db' }}>Country Of Origin</td>
                        <td style={{ textAlign: 'right', verticalAlign: 'middle', height: '10px', padding: '0px 8px', lineHeight: '1.4',  borderTop: '1px solid #d1d5db' }}>INDIA</td>
                      </tr>
                      <tr>
                      <td style={{ textAlign: 'left', verticalAlign: 'middle', height: '10px', padding: '0px 8px', lineHeight: '1.4',  borderTop: '1px solid #d1d5db' }}>Sales Leader</td>
                        <td style={{ textAlign: 'right', verticalAlign: 'middle', height: '10px', padding: '0px 8px', lineHeight: '1.4',  borderTop: '1px solid #d1d5db' }}>SWARAJ MALO</td>
                      </tr>
                      <p className="p-2">I certify the above to be true and correct to the best of my knowledge</p>
            </div>
            <div className="flex justify-between">
                <div className=" w-60 px-2">
                    <hr className="mt-8"/>
                    <p className="text-sm">SWARAJ MALO</p>
                    <p className="text-sm">AEVIX CHEMICAL INDIA LIMITED</p>
                </div>
                <div className=" w-50 px-2">
                    <hr className="mt-8"/>
                    <p className="text-sm flex justify-center items-center">date</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
