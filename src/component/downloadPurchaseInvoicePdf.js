import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PurchaseInvoicePDF from "./PurchaseInvoicePDF";

export const downloadPurchaseInvoicePdf = async (invoice) => {
  if (!invoice) {
    throw new Error("Purchase invoice data is required");
  }

  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "0";
  tempDiv.style.width = "794px";
  tempDiv.style.backgroundColor = "#ffffff";
  document.body.appendChild(tempDiv);

  const { createRoot } = await import("react-dom/client");
  const root = createRoot(tempDiv);

  try {
    root.render(React.createElement(PurchaseInvoicePDF, { invoice }));
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(tempDiv, {
      scale: 1.2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: tempDiv.scrollWidth,
      windowHeight: tempDiv.scrollHeight,
      onclone: (clonedDoc) => {
        const allElements = clonedDoc.querySelectorAll("*");

        allElements.forEach((el) => {
          const computedStyle = window.getComputedStyle(el);

          ["color", "backgroundColor", "borderColor", "fill", "stroke"].forEach((prop) => {
            const value = computedStyle[prop];

            if (value && value.includes("oklch")) {
              el.style[prop] =
                prop === "color"
                  ? "#000000"
                  : prop === "backgroundColor"
                    ? "#ffffff"
                    : "transparent";
            }
          });

          if (el.style.cssText && el.style.cssText.includes("oklch")) {
            el.style.cssText = el.style.cssText.replace(/oklch\([^)]+\)/g, "#000000");
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.9);
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;

    pdf.addImage(
      imgData,
      "JPEG",
      imgX,
      0,
      imgWidth * ratio,
      imgHeight * ratio,
      undefined,
      "FAST",
    );

    pdf.save(`Purchase-Invoice-${invoice.invoiceNo || invoice._id || "document"}.pdf`);
  } finally {
    root.unmount();
    document.body.removeChild(tempDiv);
  }
};
