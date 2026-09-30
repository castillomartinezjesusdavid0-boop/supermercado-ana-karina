"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, getWhatsAppUrl } from "@/lib/whatsapp";

const categoryEmoji: Record<string, string> = {
  "frutas-y-verduras": "🥬",
  "carnes-y-pollo": "🥩",
  "lacteos-y-huevos": "🥛",
  "panaderia": "🍞",
  "bebidas": "🥤",
  "despensa": "🫘",
  "aseo-del-hogar": "🧹",
  "cuidado-personal": "🧴",
  "snacks-y-dulces": "🍿",
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-7xl block mb-4">🛒</span>
        <h1 className="text-2xl font-black text-gray-900">Tu carrito está vacío</h1>
        <p className="text-gray-500 mt-2">Agrega productos para armar tu pedido</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Explorar productos
        </Link>
      </div>
    );
  }

  const getItemPrice = (item: typeof items[0]): number => {
    let price = item.product.price;
    if (item.selectedVariants && item.product.variants) {
      for (const variant of item.product.variants) {
        const selected = item.selectedVariants[variant.name];
        const option = variant.options.find((o) => o.label === selected);
        if (option?.price) price = option.price;
      }
    }
    return price;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Tu Carrito</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} {items.length === 1 ? "producto" : "productos"}</p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Vaciar carrito
        </button>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item) => {
          const price = getItemPrice(item);
          return (
            <div
              key={`${item.product.id}-${JSON.stringify(item.selectedVariants)}`}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm"
            >
              {/* Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                {categoryEmoji[item.product.category] || "📦"}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{item.product.brand}</p>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.product.name}</h3>
                {item.selectedVariants && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {Object.entries(item.selectedVariants).map(([key, val]) => `${key}: ${val}`).join(" | ")}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">{item.product.unit}</p>

                {/* Mobile price */}
                <p className="sm:hidden text-sm font-bold text-red-700 mt-1">{formatPrice(price * item.quantity)}</p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl shrink-0">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 font-bold transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-sm text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              {/* Desktop price */}
              <div className="hidden sm:block text-right shrink-0 w-24">
                <p className="font-bold text-gray-900">{formatPrice(price * item.quantity)}</p>
                {item.quantity > 1 && (
                  <p className="text-xs text-gray-400">{formatPrice(price)} c/u</p>
                )}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.product.id)}
                className="p-1.5 text-gray-300 hover:text-red-500 transition-colors shrink-0"
                aria-label="Eliminar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 font-medium">Subtotal</span>
          <span className="text-xl font-black text-gray-900">{formatPrice(totalPrice)}</span>
        </div>
        <p className="text-xs text-gray-400 mb-6">El costo del domicilio se coordina por WhatsApp</p>

        {/* WhatsApp CTA */}
        <a
          href={getWhatsAppUrl(items)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-2xl font-bold text-lg bg-[#25D366] text-white hover:bg-[#20BD5A] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Enviar pedido por WhatsApp
        </a>

        <Link
          href="/"
          className="w-full mt-3 py-3 rounded-2xl font-semibold text-sm border-2 border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Seguir comprando
        </Link>
      </div>

      {/* How it works */}
      <div className="mt-8 bg-red-50 rounded-2xl p-6">
        <h3 className="font-bold text-red-800 text-center mb-4">Cómo funciona tu pedido</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-2xl block mb-1">1️⃣</span>
            <p className="text-sm text-red-700 font-medium">Presiona &quot;Enviar pedido&quot;</p>
            <p className="text-xs text-red-600 mt-0.5">Se abre WhatsApp con tu lista</p>
          </div>
          <div>
            <span className="text-2xl block mb-1">2️⃣</span>
            <p className="text-sm text-red-700 font-medium">Completa tu dirección</p>
            <p className="text-xs text-red-600 mt-0.5">Y envía el mensaje</p>
          </div>
          <div>
            <span className="text-2xl block mb-1">3️⃣</span>
            <p className="text-sm text-red-700 font-medium">Recibe en tu casa</p>
            <p className="text-xs text-red-600 mt-0.5">Te confirmamos y llevamos tu pedido</p>
          </div>
        </div>
      </div>
    </div>
  );
}
