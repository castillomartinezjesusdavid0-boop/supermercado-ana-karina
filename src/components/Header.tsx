"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Top banner */}
      <div className="bg-red-700 text-white text-center text-xs sm:text-sm py-1.5 px-4 font-medium overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block">
          🚚 Domicilios disponibles &bull; Pide fácil por nuestra web y recibe en tu casa &bull; Ana Karina Exprés, tu supermercado de confianza 🛒
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Menu button mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-red-600"
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Ana Karina Exprés"
              width={120}
              height={89}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Search - Desktop */}
          <div className="hidden lg:block flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-red-600"
              aria-label="Buscar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              href="/carrito"
              className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce-once">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search - Mobile */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3 border-t bg-white">
            <SearchBar onSelect={() => setSearchOpen(false)} />
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden border-t bg-white shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {[
                { href: "/", label: "Inicio" },
                { href: "/categoria/frutas-y-verduras", label: "🥬 Frutas y Verduras" },
                { href: "/categoria/carnes-y-pollo", label: "🥩 Carnes y Pollo" },
                { href: "/categoria/lacteos-y-huevos", label: "🥛 Lácteos y Huevos" },
                { href: "/categoria/panaderia", label: "🍞 Panadería" },
                { href: "/categoria/bebidas", label: "🥤 Bebidas" },
                { href: "/categoria/despensa", label: "🫘 Despensa" },
                { href: "/categoria/aseo-del-hogar", label: "🧹 Aseo del Hogar" },
                { href: "/categoria/cuidado-personal", label: "🧴 Cuidado Personal" },
                { href: "/categoria/snacks-y-dulces", label: "🍿 Snacks y Dulces" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
