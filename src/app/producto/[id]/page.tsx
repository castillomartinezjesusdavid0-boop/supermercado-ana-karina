"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/whatsapp";
import ProductCard from "@/components/ProductCard";
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

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">😕</span>
        <h1 className="text-2xl font-bold text-gray-900">Producto no encontrado</h1>
        <Link href="/" className="mt-4 inline-block text-emerald-600 hover:underline font-medium">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === product.category);
  const subcategory = category?.subcategories.find((s) => s.slug === product.subcategory);

  const currentPrice = (() => {
    let price = product.price;
    if (product.variants) {
      for (const variant of product.variants) {
        const selected = selectedVariants[variant.name];
        const option = variant.options.find((o) => o.label === selected);
        if (option?.price) price = option.price;
      }
    }
    return price;
  })();

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const handleAddToCart = () => {
    const variants: Record<string, string> = {};
    if (product.variants) {
      for (const v of product.variants) {
        variants[v.name] = selectedVariants[v.name] || v.options[0].label;
      }
    }
    addItem(product, quantity, Object.keys(variants).length > 0 ? variants : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-emerald-600 transition-colors">Inicio</Link>
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href={`/categoria/${product.category}`} className="hover:text-emerald-600 transition-colors">
          {category?.name}
        </Link>
        {subcategory && (
          <>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{subcategory.name}</span>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product image */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden">
          <span className="text-[120px] sm:text-[160px]">
            {categoryEmoji[product.category] || "📦"}
          </span>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Nuevo</span>
            )}
            {product.isOffer && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Oferta</span>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{product.brand}</p>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">{product.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{product.unit}</p>

          {/* Price */}
          <div className="mt-4 flex items-end gap-3">
            <span className="text-3xl sm:text-4xl font-black text-emerald-700">
              {formatPrice(currentPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants?.map((variant) => (
            <div key={variant.name} className="mt-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                {variant.name}: <span className="text-emerald-600">{selectedVariants[variant.name] || variant.options[0].label}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option) => {
                  const isSelected = (selectedVariants[variant.name] || variant.options[0].label) === option.label;
                  return (
                    <button
                      key={option.label}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.name]: option.label }))}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-600 ring-offset-2"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-400"
                      }`}
                    >
                      {option.label}
                      {option.price && (
                        <span className="ml-1 text-xs opacity-80">
                          {formatPrice(option.price)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-900 mb-2">Cantidad</label>
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-emerald-600 font-bold text-lg transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-emerald-600 font-bold text-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-6 w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98]"
            }`}
          >
            {added ? (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Agregado al carrito
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Agregar al carrito — {formatPrice(currentPrice * quantity)}
              </>
            )}
          </button>

          {/* Quick WhatsApp */}
          <a
            href={`https://wa.me/573001234567?text=${encodeURIComponent(`Hola, me interesa: ${product.brand} ${product.name} (${product.unit})`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full py-3 rounded-2xl font-semibold text-sm border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Preguntar por WhatsApp
          </a>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-black text-gray-900 mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
