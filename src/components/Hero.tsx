"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Tu supermercado\nen la palma de tu mano",
    subtitle: "Pide fácil, recibe rápido",
    cta: "Empezar a comprar",
    href: "#categorias",
    gradient: "from-emerald-600 via-emerald-500 to-teal-400",
    emoji: "🛒",
  },
  {
    title: "Frutas y verduras\nsiempre frescas",
    subtitle: "Seleccionadas del campo a tu mesa",
    cta: "Ver productos",
    href: "/categoria/frutas-y-verduras",
    gradient: "from-green-600 via-green-500 to-lime-400",
    emoji: "🥑",
  },
  {
    title: "Las mejores ofertas\nde la semana",
    subtitle: "Ahorra en tus productos favoritos",
    cta: "Ver ofertas",
    href: "#ofertas",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    emoji: "🔥",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className={`relative bg-gradient-to-r ${slide.gradient} transition-all duration-700 overflow-hidden`}>
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20 relative">
        <div className="flex items-center justify-between">
          <div className="max-w-lg">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight whitespace-pre-line drop-shadow-sm">
              {slide.title}
            </h2>
            <p className="mt-3 text-lg sm:text-xl text-white/90 font-medium">
              {slide.subtitle}
            </p>
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-white text-emerald-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              {slide.cta}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <span className="text-[120px] lg:text-[160px] drop-shadow-lg animate-float">
              {slide.emoji}
            </span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
