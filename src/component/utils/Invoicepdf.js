import PDFDocument from "pdfkit";

export const generateInvoicePDF = (invoice, res) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Invoice-${invoice._id}.pdf`
  );

  doc.pipe(res);

  /* ================= HEADER ================= */
  doc
    .fontSize(18)
    .text("VERTEX EXPORTS", { align: "left" })
    .fontSize(10)
    .text("158 Lenin Sarani, 2nd Floor")
    .text("Kolkata, West Bengal - 700013")
    .moveDown();

  doc
    .fontSize(14)
    .text("TAX INVOICE", { align: "center" })
    .moveDown();

  /* ================= CUSTOMER ================= */
  doc.fontSize(10);
  doc.text(`Invoice Date: ${invoice.date?.slice(0, 10)}`);
  doc.text(`Customer: ${invoice.customer}`);
  doc.text(`Address: ${invoice.address}`);
  doc.text(`Phone: ${invoice.phone}`);
  doc.text(`GSTIN: ${invoice.gstin}`);
  doc.text(`PAN: ${invoice.pan}`);
  doc.text(`State: ${invoice.state}`);
  doc.text(`Place of Supply: ${invoice.placeOfSupply}`);
  doc.moveDown();

  /* ================= TABLE HEADER ================= */
  const tableTop = doc.y;
  doc.font("Helvetica-Bold");
  doc.text("Product", 40, tableTop);
  doc.text("Qty", 250, tableTop);
  doc.text("Rate", 300, tableTop);
  doc.text("Amount", 380, tableTop);
  doc.moveDown();

  doc.font("Helvetica");
  const amount = invoice.quantity * invoice.rate;

  doc.text(invoice.productName, 40);
  doc.text(invoice.quantity, 250);
  doc.text(invoice.rate.toFixed(2), 300);
  doc.text(amount.toFixed(2), 380);

  doc.moveDown();

  /* ================= TAX ================= */
  const cgst = amount * 0.09;
  const sgst = amount * 0.09;
  const total = amount + cgst + sgst;

  doc.text(`Taxable Amount: ₹${amount.toFixed(2)}`);
  doc.text(`CGST (9%): ₹${cgst.toFixed(2)}`);
  doc.text(`SGST (9%): ₹${sgst.toFixed(2)}`);
  doc.moveDown();

  doc
    .font("Helvetica-Bold")
    .text(`TOTAL AMOUNT: ₹${total.toFixed(2)}`);

  doc.moveDown();

  /* ================= BANK ================= */
  doc.font("Helvetica");
  doc.text("Bank Details:");
  doc.text(`Bank: ${invoice.bankDetails?.bankName || "-"}`);
  doc.text(`Account No: ${invoice.bankDetails?.accountNo || "-"}`);
  doc.text(`IFSC: ${invoice.bankDetails?.ifsc || "-"}`);

  doc.moveDown();
  doc.text("For VERTEX EXPORTS", { align: "right" });
  doc.text("Authorised Signatory", { align: "right" });

  doc.end();
};
