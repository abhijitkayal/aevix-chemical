import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ================= HELPERS ================= */

const drawLine = (doc, x1, y1, x2, y2) => {
  doc.moveTo(x1, y1).lineTo(x2, y2).stroke();
};

const drawBox = (doc, x, y, w, h) => {
  doc.rect(x, y, w, h).stroke();
};

const amountInWords = (num) => {
  // simple formatter (can be replaced with advanced one later)
  return `RUPEES ${num.toLocaleString("en-IN")} ONLY`;
};

/* ================= MAIN PDF ================= */

export const generateInvoicePDF = (invoice, res) => {
  const doc = new PDFDocument({ size: "A4", margin: 40 });

  /* ---------- RESPONSE ---------- */
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Invoice-${invoice.invoiceNo || invoice._id}.pdf`
  );
  doc.pipe(res);

  /* ---------- WATERMARK ---------- */
  const logoPath = path.join(__dirname, "../../src/assets/logo.png");
  if (fs.existsSync(logoPath)) {
    doc.save();
    doc.opacity(0.06);
    doc.image(logoPath, 120, 230, { width: 350 });
    doc.restore();
  }

  /* ---------- HEADER ---------- */
  doc.font("Helvetica-Bold").fontSize(18).text("AEVIX CHEMICAL", 40, 40);
  doc.font("Helvetica").fontSize(9).text(
    "158 Lenin Sarani, 2nd Floor\nRoom No. 6/2B\nKolkata, West Bengal - 700013",
    40,
    65
  );

  doc
    .text("GSTIN : 19BQJPR8561B1ZG", 380, 40)
    .text(`Invoice No : ${invoice.invoiceNo || invoice._id}`, 380, 55)
    .text(
      `Invoice Date : ${new Date(invoice.date).toLocaleDateString("en-IN")}`,
      380,
      70
    );

  drawLine(doc, 40, 115, 555, 115);

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("TAX INVOICE", 0, 125, { align: "center" });

  drawLine(doc, 40, 150, 555, 150);

  /* ---------- BUYER & CONSIGNEE BOX ---------- */
  const boxTop = 160;
  const boxHeight = 155;

  drawBox(doc, 40, boxTop, 515, boxHeight);
  drawLine(doc, 297, boxTop, 297, boxTop + boxHeight); // vertical separator

  doc.fontSize(10).font("Helvetica-Bold");
  doc.text("Details of Buyer | Billed to :", 45, boxTop + 5);
  doc.text("Details of Consignee | Shipped to :", 302, boxTop + 5);

  doc.font("Helvetica").fontSize(9);

  // Buyer
  doc.text(`Name : ${invoice.customer}`, 45, boxTop + 25);
  doc.text(`Address : ${invoice.address}`, 45, boxTop + 40, { width: 240 });
  doc.text(`Phone : ${invoice.phone}`, 45, boxTop + 75);
  doc.text(`GSTIN : ${invoice.gstin}`, 45, boxTop + 90);
  doc.text(`PAN : ${invoice.pan}`, 45, boxTop + 105);
  doc.text(`State : ${invoice.state}`, 45, boxTop + 120);
  doc.text(`Place of Supply : ${invoice.placeOfSupply}`, 45, boxTop + 135);

  // Consignee
  const c = invoice.consignee || {};
  doc.text(`Name : ${c.name || invoice.customer}`, 302, boxTop + 25);
  doc.text(
    `Address : ${c.address || invoice.address}`,
    302,
    boxTop + 40,
    { width: 240 }
  );
  doc.text(`Phone : ${c.phone || invoice.phone}`, 302, boxTop + 75);
  doc.text(`GSTIN : ${c.gstin || invoice.gstin}`, 302, boxTop + 90);
  doc.text(`State : ${c.state || invoice.state}`, 302, boxTop + 105);

  /* ---------- PRODUCT TABLE ---------- */
  const tableTop = boxTop + boxHeight + 10;
  const rowHeight = 28;

  const cols = [
    { x: 40, w: 30, label: "Sr" },
    { x: 70, w: 140, label: "Product / Service" },
    { x: 210, w: 60, label: "HSN" },
    { x: 270, w: 50, label: "Qty" },
    { x: 320, w: 60, label: "Rate" },
    { x: 380, w: 70, label: "Taxable" },
    { x: 450, w: 50, label: "CGST" },
    { x: 500, w: 55, label: "SGST" },
  ];

  // Header Row
  drawBox(doc, 40, tableTop, 515, rowHeight);
  cols.forEach((c) => drawLine(doc, c.x, tableTop, c.x, tableTop + rowHeight));
  doc.font("Helvetica-Bold").fontSize(9);
  cols.forEach((c) =>
    doc.text(c.label, c.x + 3, tableTop + 8)
  );

  // Data Row
  const dataTop = tableTop + rowHeight;
  drawBox(doc, 40, dataTop, 515, rowHeight * 2);
  cols.forEach((c) =>
    drawLine(doc, c.x, dataTop, c.x, dataTop + rowHeight * 2)
  );

  const qty = invoice.quantity;
  const rate = invoice.rate;
  const taxable = qty * rate;
  const cgst = taxable * 0.09;
  const sgst = taxable * 0.09;
  const total = taxable + cgst + sgst;

  doc.font("Helvetica").fontSize(9);
  doc.text("1", 45, dataTop + 10);
  doc.text(invoice.productName, 73, dataTop + 10, { width: 135 });
  doc.text(invoice.hsn || "-", 215, dataTop + 10);
  doc.text(`${qty} ${invoice.unit}`, 273, dataTop + 10);
  doc.text(rate.toFixed(2), 323, dataTop + 10);
  doc.text(taxable.toFixed(2), 383, dataTop + 10);
  doc.text(cgst.toFixed(2), 453, dataTop + 10);
  doc.text(sgst.toFixed(2), 503, dataTop + 10);

  /* ---------- TOTALS SECTION ---------- */
  const summaryTop = dataTop + rowHeight * 2 + 10;

  // Amount in words box
  drawBox(doc, 40, summaryTop, 300, 60);
  doc.font("Helvetica-Bold").text("Total in Words", 45, summaryTop + 5);
  drawLine(doc, 40,summaryTop+15, 340, summaryTop+15);
  doc.font("Helvetica").fontSize(9).text(
    amountInWords(total),
    45,
    summaryTop + 25,
    { width: 290 }
  );

  // Tax summary box
  drawBox(doc, 350, summaryTop, 205, 100);
  doc.font("Helvetica").fontSize(9);
  doc.text("Taxable Amount", 355, summaryTop + 10);
  doc.text(` ${taxable.toFixed(2)}`,480, summaryTop + 10, { align: "right" });
  doc
  .moveTo(350, summaryTop + 25)   // start X, Y
  .lineTo(555, summaryTop + 25)   // end X, Y
  .stroke();
  doc.text("Add : CGST", 355, summaryTop + 30);
  doc.text(` ${cgst.toFixed(2)}`, 480, summaryTop + 30, { align: "right" });
  doc  
  .moveTo(350, summaryTop + 45)
  .lineTo(555, summaryTop + 45)
  .stroke();

 
  doc.text("Add : SGST", 355, summaryTop + 50);
  doc.text(` ${sgst.toFixed(2)}`, 480, summaryTop + 50, { align: "right" });
 doc  
 .moveTo(350, summaryTop + 65)
  .lineTo(555, summaryTop + 65)
  .stroke();

  doc.font("Helvetica-Bold");
  doc.text("Total Amount", 355, summaryTop + 75);
  doc.text(` ${total.toFixed(2)}`, 480, summaryTop + 75, { align: "right" });

  /* ---------- BANK DETAILS ---------- */
  const bankTop = summaryTop + 110;
  drawBox(doc, 40, bankTop, 300, 85);

  doc.font("Helvetica-Bold").text("Bank Details", 45, bankTop + 5);
  drawLine(doc, 40, 545, 340, 545);
  doc.font("Helvetica").fontSize(9);
  doc.text(`Bank : ${invoice.bankDetails?.bankName}`, 45, bankTop + 25);
  doc.text(`Account No : ${invoice.bankDetails?.accountNo}`, 45, bankTop + 40);
  doc.text(`IFSC : ${invoice.bankDetails?.ifsc}`, 45, bankTop + 55);

  /* ---------- FOOTER ---------- */
  drawLine(doc, 40, bankTop + 100, 555, bankTop + 100);

  doc
    .fontSize(9)
    .text(
      "Certified that the particulars given above are true and correct.",
      350,
      bankTop + 20
    );

  doc.font("Helvetica-Bold").text("For AEVIX CHEMICAL", 350, bankTop + 50);
  doc.fontSize(8).text("Authorised Signatory", 350, bankTop + 70);

  doc.end();
};

/* ================= GENERATE PDF AS BUFFER ================= */
export const generateInvoicePDFBuffer = (invoice) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const chunks = [];

    // Collect PDF data into chunks
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    /* ---------- WATERMARK ---------- */
    const logoPath = path.join(__dirname, "../../src/assets/logo.png");
    if (fs.existsSync(logoPath)) {
      doc.save();
      doc.opacity(0.06);
      doc.image(logoPath, 120, 230, { width: 350 });
      doc.restore();
    }

    /* ---------- HEADER ---------- */
    doc.font("Helvetica-Bold").fontSize(18).text("AEVIX CHEMICAL", 40, 40);
    doc.font("Helvetica").fontSize(9).text(
      "158 Lenin Sarani, 2nd Floor\nRoom No. 6/2B\nKolkata, West Bengal - 700013",
      40,
      60
    );
    doc.text("GSTIN: 19AKSPK1555C1ZC", 40, 90);
    doc.fontSize(16).font("Helvetica-Bold").text("TAX INVOICE", 420, 45);

    drawLine(doc, 40, 105, 555, 105);

    /* ---------- BILL TO / SHIP TO ---------- */
    let yPos = 115;

    doc.fontSize(10).font("Helvetica-Bold").text("Bill To:", 40, yPos);
    doc.font("Helvetica").text(invoice.customer || "N/A", 40, yPos + 15);
    doc.text(invoice.address || "", 40, yPos + 30, { width: 250 });
    doc.text(`GSTIN: ${invoice.gstin || "N/A"}`, 40, yPos + 60);
    doc.text(`PAN: ${invoice.pan || "N/A"}`, 40, yPos + 75);
    doc.text(`State: ${invoice.state || "N/A"}`, 40, yPos + 90);

    doc.font("Helvetica-Bold").text("Ship To:", 320, yPos);
    doc.font("Helvetica").text(invoice.customer || "N/A", 320, yPos + 15);
    doc.text(invoice.address || "", 320, yPos + 30, { width: 230 });
    doc.text(`Place of Supply: ${invoice.placeOfSupply || "N/A"}`, 320, yPos + 60);

    yPos += 120;
    drawLine(doc, 40, yPos, 555, yPos);

    /* ---------- INVOICE DETAILS ---------- */
    yPos += 10;
    doc.fontSize(9);
    doc.font("Helvetica-Bold").text("Invoice No:", 40, yPos);
    doc.font("Helvetica").text(invoice.invoiceNo || "N/A", 120, yPos);

    doc.font("Helvetica-Bold").text("Date:", 320, yPos);
    doc.font("Helvetica").text(
      invoice.date ? new Date(invoice.date).toLocaleDateString("en-GB") : "N/A",
      360,
      yPos
    );

    yPos += 15;
    doc.font("Helvetica-Bold").text("Customer ID:", 40, yPos);
    doc.font("Helvetica").text(invoice.customerId || "N/A", 120, yPos);

    doc.font("Helvetica-Bold").text("Due Date:", 320, yPos);
    doc.font("Helvetica").text(
      invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("en-GB") : "N/A",
      360,
      yPos
    );

    yPos += 20;
    drawLine(doc, 40, yPos, 555, yPos);

    /* ---------- ITEMS TABLE ---------- */
    const tableTop = yPos + 10;
    doc.font("Helvetica-Bold").fontSize(9);

    doc.text("S.No", 45, tableTop);
    doc.text("Product Name", 80, tableTop);
    doc.text("HSN", 220, tableTop);
    doc.text("Qty", 270, tableTop);
    doc.text("Unit", 310, tableTop);
    doc.text("Rate", 350, tableTop);
    doc.text("Tax", 410, tableTop);
    doc.text("Amt", 460, tableTop);

    drawLine(doc, 40, tableTop + 15, 555, tableTop + 15);

    let itemY = tableTop + 25;
    doc.font("Helvetica").fontSize(9);

    const taxRate = 0.18;
    const baseAmount = (invoice.quantity || 0) * (invoice.rate || 0);
    const taxAmount = baseAmount * taxRate;
    const totalAmount = baseAmount + taxAmount;

    doc.text("1", 45, itemY);
    doc.text(invoice.productName || "N/A", 80, itemY, { width: 130 });
    doc.text(invoice.hsnCode || "N/A", 220, itemY);
    doc.text(`${invoice.quantity || 0}`, 270, itemY);
    doc.text(invoice.unit || "Kg", 310, itemY);
    doc.text(`${(invoice.rate || 0).toFixed(2)}`, 350, itemY);
    doc.text(`${(taxRate * 100).toFixed(0)}%`, 410, itemY);
    doc.text(`${totalAmount.toFixed(2)}`, 460, itemY);

    itemY += 20;
    drawLine(doc, 40, itemY, 555, itemY);

    /* ---------- AMOUNTS ---------- */
    const amountTop = itemY + 10;
    doc.font("Helvetica").fontSize(9);
    doc.text("Sub Total", 350, amountTop);
    doc.text(`${baseAmount.toFixed(2)}`, 460, amountTop);

    const cgst = taxAmount / 2;
    const sgst = taxAmount / 2;

    doc.text("CGST (9%)", 350, amountTop + 15);
    doc.text(`${cgst.toFixed(2)}`, 460, amountTop + 15);

    doc.text("SGST (9%)", 350, amountTop + 30);
    doc.text(`${sgst.toFixed(2)}`, 460, amountTop + 30);

    drawLine(doc, 340, amountTop + 45, 555, amountTop + 45);

    doc.font("Helvetica-Bold").fontSize(10);
    doc.text("Total", 350, amountTop + 50);
    doc.text(`${totalAmount.toFixed(2)}`, 460, amountTop + 50);

    /* ---------- AMOUNT IN WORDS ---------- */
    const wordTop = amountTop + 70;
    doc.fontSize(9).font("Helvetica-Bold").text("Amount in Words:", 40, wordTop);
    doc.font("Helvetica").text(amountInWords(totalAmount), 40, wordTop + 15, {
      width: 500,
    });

    /* ---------- BANK DETAILS ---------- */
    const bankTop = wordTop + 50;
    drawBox(doc, 40, bankTop, 250, 80);
    doc.fontSize(9).font("Helvetica-Bold").text("Bank Details", 45, bankTop + 5);
    doc.font("Helvetica").fontSize(8);
    doc.text(`Bank: state bank of india`, 45, bankTop + 20);
    doc.text(`Branch: SME N.S Road`, 45, bankTop + 35);
    doc.text(`Account No:  43320503750`, 45, bankTop + 42);
    doc.text(`IFSC:SBIN0015197`, 45, bankTop + 50);

    /* ---------- SIGNATURE ---------- */
    doc.fontSize(9).font("Helvetica-Bold").text("For AEVIX CHEMICAL", 350, bankTop + 30);
    doc.fontSize(8).text("Authorised Signatory", 350, bankTop + 70);

    doc.end();
  });
};
