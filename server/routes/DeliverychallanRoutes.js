import express from "express";
import DeliveryChallan from "../models/Deliverychallan.js";
import sgMail from "@sendgrid/mail";
import PDFDocument from "pdfkit";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const challan = await DeliveryChallan.create(req.body);
    res.status(201).json(challan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  try {
    const challans = await DeliveryChallan.find().sort({ createdAt: -1 });
    res.json(challans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const challan = await DeliveryChallan.findById(req.params.id);
    if (!challan) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(challan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Generate Delivery Challan PDF Buffer for email attachment
const generateDeliveryChallanPDFBuffer = (dc) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Header
    doc.font("Helvetica-Bold").fontSize(18).text("AEVIX CHEMICAL", 40, 40);
    doc.font("Helvetica").fontSize(9).text(
      "115, VILL. UTTAR JOJRA, PO. ROHANDA,\nPS. MADHYAMGRAM,\nKOLKATA, WEST BENGAL - 700135",
      40,
      60
    );
    doc.text("Telephone: 033 31556300", 40, 95);
    doc.text("Website: www.aevixchemical.com", 40, 108);

    // Contact Details (Right side)
    doc.fontSize(9).text("Name: Manab Roy", 400, 40);
    doc.text("Phone: 9330324989", 400, 53);
    doc.text("Email: manab.roy.ind@gmail.com", 400, 66);
    doc.text("PAN: BQJPR8561B", 400, 79);

    // Line separator
    doc.moveTo(40, 125).lineTo(555, 125).stroke();

    // Title
    doc.fontSize(16).font("Helvetica-Bold").text("DELIVERY CHALLAN", 40, 135, { align: "center" });

    doc.moveTo(40, 160).lineTo(555, 160).stroke();

    // Details boxes
    let yPos = 170;
    
    // Buyer Details
    doc.fontSize(10).font("Helvetica-Bold").text("Details of Buyer | Billed To", 40, yPos);
    doc.font("Helvetica").fontSize(9);
    doc.text(`Name: ${dc.customerName || "N/A"}`, 40, yPos + 15);
    doc.text(`Address: ${dc.address || "N/A"}`, 40, yPos + 30, { width: 150 });
    doc.text(`State: ${dc.state || "N/A"}`, 40, yPos + 60);
    doc.text(`GSTIN: ${dc.gstin || "N/A"}`, 40, yPos + 75);

    // Consignee Details
    doc.font("Helvetica-Bold").fontSize(10).text("Details of Consignee | Shipped To", 220, yPos);
    doc.font("Helvetica").fontSize(9);
    doc.text(`Name: ${dc.customerName || "N/A"}`, 220, yPos + 15);
    doc.text(`Address: ${dc.shippingAddress || "N/A"}`, 220, yPos + 30, { width: 150 });
    doc.text(`State: ${dc.state || "N/A"}`, 220, yPos + 60);

    // Challan Info
    doc.font("Helvetica-Bold").fontSize(10).text("Challan Details", 420, yPos);
    doc.font("Helvetica").fontSize(9);
    doc.text(`Challan No: ${dc.challanPrefix || ""}${dc.challanNo || ""}${dc.challanPostfix || ""}`, 420, yPos + 15);
    doc.text(`Date: ${dc.challanDate ? new Date(dc.challanDate).toLocaleDateString() : "N/A"}`, 420, yPos + 30);
    doc.text(`Vehicle / LR: ${dc.lrNo || "N/A"}`, 420, yPos + 45);

    yPos += 105;
    doc.moveTo(40, yPos).lineTo(555, yPos).stroke();

    // Product Table
    yPos += 10;
    doc.font("Helvetica-Bold").fontSize(10).text("Product Details", 40, yPos);
    yPos += 20;

    // Table Header
    doc.rect(40, yPos, 515, 25).fill("#f0f0f0");
    doc.fillColor("#000");
    doc.font("Helvetica-Bold").fontSize(9);
    doc.text("Sr", 50, yPos + 8, { width: 30, align: "center" });
    doc.text("Product Name", 130, yPos + 8, { width: 250 });
    doc.text("Quantity", 450, yPos + 8, { width: 80, align: "center" });

    yPos += 25;

    // Table Row
    doc.rect(40, yPos, 515, 25).stroke();
    doc.font("Helvetica").fontSize(9);
    doc.text("1", 50, yPos + 8, { width: 30, align: "center" });
    doc.text(dc.productName || "N/A", 130, yPos + 8, { width: 250 });
    doc.text(dc.quantity?.toString() || "0", 450, yPos + 8, { width: 80, align: "center" });

    yPos += 40;

    // Bank Details
    doc.font("Helvetica-Bold").fontSize(10).text("Bank Details", 40, yPos);
    yPos += 20;
    doc.font("Helvetica").fontSize(9);
    doc.text("Bank: State Bank Of India", 40, yPos);
    doc.text("Branch: SME N.S Road", 40, yPos + 15);
    doc.text("Account No: 43320503750", 40, yPos + 30);
    doc.text("IFSC: SBIN0015197", 40, yPos + 45);

    // Signature
    doc.font("Helvetica").fontSize(9).text(
      "Certified that the particulars given above are true and correct.",
      320,
      yPos
    );
    doc.font("Helvetica-Bold").text("For AEVIX CHEMICAL", 320, yPos + 30);
    doc.font("Helvetica").text("Authorised Signatory", 320, yPos + 80);

    doc.end();
  });
};

// Send Email with Delivery Challan PDF
router.post("/:id/send-email", async (req, res) => {
  try {
    const { to, cc, bcc, subject, message } = req.body;
    const dc = await DeliveryChallan.findById(req.params.id);

    if (!dc) {
      return res.status(404).json({ message: "Delivery Challan not found" });
    }

    // Generate PDF buffer
    const pdfBuffer = await generateDeliveryChallanPDFBuffer(dc);

    // Prepare email using SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const challanNumber = `${dc.challanPrefix || ""}${dc.challanNo || ""}${dc.challanPostfix || ""}`;

    const emailContent = {
      to: to,
      from: process.env.EMAIL_FROM,
      subject: subject || `Delivery Challan ${challanNumber} from Aevix Chemical`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Delivery Challan ${challanNumber}</h2>
          <p>${message || 'Please find attached your delivery challan.'}</p>
          
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 5px 0;"><strong>Customer:</strong> ${dc.customerName || "N/A"}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${dc.challanDate ? new Date(dc.challanDate).toLocaleDateString() : "N/A"}</p>
            <p style="margin: 5px 0;"><strong>Product:</strong> ${dc.productName || "N/A"}</p>
            <p style="margin: 5px 0;"><strong>Quantity:</strong> ${dc.quantity || "0"}</p>
          </div>
          
          <p style="margin-top: 20px;">Thank you for your business!</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
          <p style="color: #888; font-size: 11px;">This is an automated email from Aevix Chemical Management System.</p>
        </div>
      `,
      attachments: [
        {
          content: pdfBuffer.toString('base64'),
          filename: `Delivery-Challan-${challanNumber}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };

    // Add CC and BCC if provided
    if (cc) emailContent.cc = cc;
    if (bcc) emailContent.bcc = bcc;

    await sgMail.send(emailContent);

    res.json({ 
      success: true, 
      message: "Email sent successfully to " + to + " with PDF attachment"
    });

  } catch (error) {
    console.error("Email Send Error:", error);
    res.status(500).json({ 
      message: "Failed to send email", 
      error: error.response?.body?.errors?.[0]?.message || error.message 
    });
  }
});


export default router;
