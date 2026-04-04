import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartItem } from '@/types';

export interface OrderData {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  secondaryPhone?: string;
  address?: string;
  method: 'store' | 'cod' | 'online';
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
}

export const generateInvoicePDF = (order: OrderData, items: CartItem[]): string => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Colors
  const primaryColor = '#1A1A1A';
  const secondaryColor = '#666666';

  // 1. Header Segment
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(primaryColor);
  doc.text('AUREL.', 14, 25);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor);
  doc.text('Invoice #:', pageWidth - 60, 20);
  doc.text('Date:', pageWidth - 60, 26);
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  doc.text(order.orderId, pageWidth - 14, 20, { align: 'right' });
  doc.text(order.date, pageWidth - 14, 26, { align: 'right' });

  // Add line separator
  doc.setDrawColor(230, 230, 230);
  doc.line(14, 35, pageWidth - 14, 35);

  // 2. Customer & Order Info
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Billed To:', 14, 45);
  doc.text('Delivery Info:', pageWidth / 2, 45);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor);
  
  // Left Column (Customer)
  doc.text(order.name, 14, 52);
  doc.text(order.email, 14, 58);
  doc.text(`Ph: ${order.phone}`, 14, 64);
  if (order.secondaryPhone) {
    doc.text(`Alt Ph: ${order.secondaryPhone}`, 14, 70);
  }

  // Right Column (Delivery)
  let methodStr = 'Unknown';
  if (order.method === 'store') methodStr = 'Collect from Store';
  if (order.method === 'cod') methodStr = 'Cash on Delivery';
  
  doc.text(`Method: ${methodStr}`, pageWidth / 2, 52);
  if (order.method === 'cod' && order.address) {
    // Split address across lines if too long
    const addressLines = doc.splitTextToSize(order.address, 80);
    doc.text(addressLines, pageWidth / 2, 58);
  }

  // 3. Items Table
  const tableData = items.map(item => [
    item.product.name,
    `Size: ${item.selectedSize} | Color: ${item.selectedColor}`,
    item.quantity.toString(),
    `Rs ${item.product.price.toLocaleString()}`,
    `Rs ${(item.product.price * item.quantity).toLocaleString()}`
  ]);

  autoTable(doc, {
    startY: 85,
    head: [['Product', 'Details', 'Qty', 'Price', 'Total']],
    body: tableData,
    theme: 'plain',
    headStyles: {
      fillColor: [245, 245, 245],
      textColor: [26, 26, 26],
      fontStyle: 'bold',
    },
    bodyStyles: {
      textColor: [102, 102, 102],
    },
    alternateRowStyles: {
      fillColor: [252, 252, 252],
    },
    columnStyles: {
      2: { halign: 'center' },
      3: { halign: 'right' },
      4: { halign: 'right' },
    },
  });

  // 4. Totals Calculation
  const finalY = (doc as any).lastAutoTable.finalY + 15;

  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', pageWidth - 60, finalY);
  doc.text('Shipping:', pageWidth - 60, finalY + 8);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', pageWidth - 60, finalY + 18);

  doc.setFont('helvetica', 'normal');
  doc.text(`Rs ${order.subtotal.toLocaleString()}`, pageWidth - 14, finalY, { align: 'right' });
  doc.text(`Rs ${order.shipping.toLocaleString()}`, pageWidth - 14, finalY + 8, { align: 'right' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor);
  doc.text(`Rs ${order.total.toLocaleString()}`, pageWidth - 14, finalY + 18, { align: 'right' });

  // 5. Footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text('Thank you for shopping with AUREL.', pageWidth / 2, 280, { align: 'center' });

  // Output as standard Data URI string
  return doc.output('datauristring');
};
