"use client";

import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/whatsapp";
import { useState } from "react";

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

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.variants && product.variants.length > 0) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const hasVariants = product.variants && product.variants.length > 0;

  return (
    <Link
      href={`/producto/${product.id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image placeholder */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
          {categoryEmoji[product.category] || "📦"}
        </span>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Nuevo
            </span>
          )}
          {product.isOffer && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Oferta
            </span>
          )}
        </div>

        {/* Quick add button */}
        {!hasVariants && (
          <button
            onClick={handleQuickAdd}
            className={`absolute bottom-2 right-2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
              added
                ? "bg-red-600 text-white scale-110"
                : "bg-white text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:text-white"
            }`}
            aria-label="Agregar al carrito"
          >
            {added ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug line-clamp-2 group-hover:text-red-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] text-gray-400 mt-1">{product.unit}</p>

        <div className="mt-auto pt-2 flex items-end justify-between">
          <div>
            <span className="text-lg font-black text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="block text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {hasVariants && (
            <span className="text-[10px] text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full">
              Ver opciones
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
