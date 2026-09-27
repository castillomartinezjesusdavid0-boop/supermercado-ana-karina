"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/whatsapp";

export default function SearchBar({ onSelect }: { onSelect?: () => void }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Buscar productos... ej: leche, pan, arroz"
          className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setIsFocused(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isFocused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/producto/${product.id}`}
              onClick={() => {
                setQuery("");
                setIsFocused(false);
                onSelect?.();
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl shrink-0">
                {product.category === "frutas-y-verduras" ? "🥬" :
                 product.category === "carnes-y-pollo" ? "🥩" :
                 product.category === "lacteos-y-huevos" ? "🥛" :
                 product.category === "panaderia" ? "🍞" :
                 product.category === "bebidas" ? "🥤" :
                 product.category === "despensa" ? "🫘" :
                 product.category === "aseo-del-hogar" ? "🧹" :
                 product.category === "cuidado-personal" ? "🧴" : "🍿"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.brand} {product.name}
                </p>
                <p className="text-xs text-gray-500">{product.unit}</p>
              </div>
              <span className="text-sm font-bold text-emerald-700 shrink-0">
                {formatPrice(product.price)}
              </span>
            </Link>
          ))}
        </div>
      )}

      {isFocused && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 text-center z-50">
          <p className="text-gray-500 text-sm">No encontramos &quot;{query}&quot;</p>
          <p className="text-gray-400 text-xs mt-1">Intenta con otra palabra o navega por categorías</p>
        </div>
      )}
    </div>
  );
}
