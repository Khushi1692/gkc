import PDFDocument from "pdfkit";
import { PrintableOrder } from "../types/order.types";

const LINE_WIDTH = 60; // better width for 72mm printers

function lineSeparator(doc: PDFKit.PDFDocument, char = "-") {
  const usableWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;

  const charWidth = doc.widthOfString(char);
  const count = Math.floor(usableWidth / charWidth);

  return char.repeat(count);
}

function leftRight(left: string, right: string) {
  const space = LINE_WIDTH - left.length - right.length - 2;
  return left + " ".repeat(Math.max(space, 1)) + right;
}

function wrapText(text: string, width = LINE_WIDTH) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + word).length > width) {
      lines.push(current.trim());
      current = word + " ";
    } else {
      current += word + " ";
    }
  }

  if (current.trim()) lines.push(current.trim());
  return lines;
}

export async function generateReceiptBase64(
  order: PrintableOrder,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: [204, 1000], // 72mm printable width
      margin: 4,
    });

    doc.registerFont("regular", "Helvetica");
    doc.registerFont("bold", "Helvetica-Bold");

    doc.font("regular");

    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks).toString("base64")));
    doc.on("error", reject);

    const printLine = (text = "", size = 10, options?: { bold?: boolean }) => {
      doc.font(options?.bold ? "bold" : "regular");
      doc.fontSize(size).text(text);
    };

    const printCentered = (
      text: string,
      size = 11,
      options?: { bold?: boolean },
    ) => {
      doc.font(options?.bold ? "bold" : "regular");
      doc.fontSize(size).text(text, { align: "center" });
    };

    // HEADER
    printCentered(order.branchId.name, 13, { bold: true });
    printCentered(order.branchId.address || "", 10);

    printLine(lineSeparator(doc));

    // ORDER INFO
    printLine(`Order : ${order.orderId}`, 10, { bold: true });
    printLine(`Customer : ${order.userId?.name || "Unknown"}`, 10, { bold: true });

    // Contact info
    const email = order.customerEmail || order.userId?.email || "";
    const phone = order.customerPhone || "";
    if (email) printLine(`Email   : ${email}`, 10);
    if (phone) printLine(`Phone   : ${phone}`, 10);

    printLine(`Date    : ${new Date(order.createdAt).toLocaleString()}`);

    printLine(lineSeparator(doc));
    printLine(leftRight("Item", "Total"), 10, { bold: true });
    printLine(lineSeparator(doc));

    // ITEMS
    order.items.forEach((item) => {
      const name = item.productId?.name || "Item";

      const priceUsed =
        item.discountPercentage && item.discountPercentage > 0
          ? item.discountedPrice
          : item.price;

      // Item name (wrapped if long)
      wrapText(name).forEach((l) => printLine(l, 11));

      // Quantity line
      const qtyLine = `  ${item.quantity} x ${priceUsed.toFixed(2)}`;
      const total = `$${item.subtotal.toFixed(2)}`;
      printLine(leftRight(qtyLine, total), 10);

      // CUSTOMIZATIONS (your schema)
      if (item.customizations?.length) {
        item.customizations.forEach((group: any) => {
          const indent = "    ";

          group.selectedOptions?.forEach((opt: any) => {
            let text = opt.name;

            if (opt.priceModifier > 0) {
              text += ` ($${opt.priceModifier.toFixed(2)})`;
            }

            wrapText(text, LINE_WIDTH - indent.length - 2).forEach(
              (l, index) => {
                // first line gets "+"
                if (index === 0) {
                  printLine(indent + "+ " + l, 10);
                } else {
                  // wrapped lines align under text
                  printLine(indent + "  " + l, 10);
                }
              },
            );
          });
        });
      }

      doc.moveDown(0.4);
    });

    // TOTAL
    printLine(lineSeparator(doc), 10, { bold: true });
    printLine(leftRight("TOTAL", `$${order.totalAmount.toFixed(2)}`), 10, {
      bold: true,
    });
    printLine(lineSeparator(doc), 10, { bold: true });

    // PAYMENT INFO
    printLine("Payment Info:", 11, {
      bold: true,
    });
    printLine(`Status : ${order.paymentStatus.toUpperCase()}`, 10);
    if (order.paymentIntentId) {
      // shorten long stripe ids for readability
      const shortId = order.paymentIntentId;
      printLine(`Ref : ${shortId}`, 10);
    }
    printLine(lineSeparator(doc));

    // SPECIAL INSTRUCTIONS
    if (
      order.specialInstructions &&
      order.specialInstructions.trim().length > 0
    ) {
      printLine("Special Instructions:", 11, { bold: true });

      const indent = "  ";

      wrapText(order.specialInstructions, LINE_WIDTH - indent.length).forEach(
        (l) => {
          printLine(indent + l, 10);
        },
      );
      printLine(lineSeparator(doc));
    }

    doc.moveDown(0.3);

    // FOOTER
    printCentered("Thank you for your order!", 10);
    printCentered("Gopi ka Chatka", 10);

    doc.end();
  });
}
