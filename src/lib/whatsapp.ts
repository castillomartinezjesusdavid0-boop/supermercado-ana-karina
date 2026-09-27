import { CartItem } from "@/types";

const WHATSAPP_NUMBER = "573001234567"; // Placeholder — reemplazar con número real

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function getItemPrice(item: CartItem): number {
  let price = item.product.price;
  if (item.selectedVariants && item.product.variants) {
    for (const variant of item.product.variants) {
      const selected = item.selectedVariants[variant.name];
      const option = variant.options.find((o) => o.label === selected);
      if (option?.price) price = option.price;
    }
  }
  return price;
}

function getItemDescription(item: CartItem): string {
  let desc = `${item.product.brand} ${item.product.name}`;
  if (item.selectedVariants) {
    const variants = Object.entries(item.selectedVariants)
      .map(([, value]) => value)
      .join(", ");
    if (variants) desc += ` (${variants})`;
  }
  return desc;
}

export function generateWhatsAppMessage(items: CartItem[]): string {
  const lines = items.map((item) => {
    const price = getItemPrice(item);
    const desc = getItemDescription(item);
    return `${item.quantity}x ${desc} - ${formatPrice(price * item.quantity)}`;
  });

  const total = items.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);

  const message = [
    "🛒 *Nuevo Pedido - Ana Karina Exprés*",
    "",
    ...lines,
    "",
    `*Total: ${formatPrice(total)}*`,
    "",
    "📍 *Dirección de entrega:* ",
    "📞 *Teléfono:* ",
    "📝 *Notas:* ",
  ].join("\n");

  return message;
}

export function getWhatsAppUrl(items: CartItem[]): string {
  const message = generateWhatsAppMessage(items);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
