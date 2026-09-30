"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories.find((c) => c.slug === slug);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">😕</span>
        <h1 className="text-2xl font-bold text-gray-900">Categoría no encontrada</h1>
        <Link href="/" className="mt-4 inline-block text-red-600 hover:underline font-medium">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const categoryProducts = products.filter((p) => p.category === slug);
  const filteredProducts = selectedSub
    ? categoryProducts.filter((p) => p.subcategory === selectedSub)
    : categoryProducts;

  return (
    <>
      {/* Category header */}
      <div className={`${category.color} py-10 sm:py-14`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-red-600 transition-colors">Inicio</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-5xl sm:text-6xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900">{category.name}</h1>
              <p className="text-gray-600 mt-1">{categoryProducts.length} productos disponibles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Subcategory filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedSub(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              !selectedSub
                ? "bg-red-600 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600"
            }`}
          >
            Todos
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => setSelectedSub(sub.slug)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedSub === sub.slug
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl block mb-3">📦</span>
            <p className="text-gray-500 font-medium">No hay productos en esta subcategoría aún</p>
            <button
              onClick={() => setSelectedSub(null)}
              className="mt-3 text-red-600 hover:underline font-medium text-sm"
            >
              Ver todos los productos de {category.name}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
