import { CartItem } from "@/context/CartContext";

import { SITE_CONFIG } from "@/config";

const WHATSAPP_NUMBER = SITE_CONFIG.whatsappNumber;

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

interface OrderInfo {
  customer: { fullName: string; phone: string };
  address: { addressLine1: string; addressLine2: string; city: string; state: string; pincode: string };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export const buildWhatsAppURL = (order: OrderInfo): string => {
  const itemLines = order.items
    .map(
      (it, i) =>
        `${i + 1}. ${it.product.name} x${it.quantity} — ${formatINR(it.product.price * it.quantity)}`
    )
    .join("\n");

  const addr = [
    order.address.addressLine1,
    order.address.addressLine2,
    `${order.address.city}, ${order.address.state} – ${order.address.pincode}`,
  ]
    .filter(Boolean)
    .join(", ");

  const message = `🛍️ *New Order – Dwarika Naari*

*Customer:* ${order.customer.fullName}
*Phone:* ${order.customer.phone}

*Shipping Address:*
${addr}

*Items:*
${itemLines}

*Subtotal:* ${formatINR(order.subtotal)}
*Shipping:* ${order.shipping === 0 ? "Free" : formatINR(order.shipping)}
*Total:* ${formatINR(order.total)}

Thank you for shopping with Dwarika Naari! ✨`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
