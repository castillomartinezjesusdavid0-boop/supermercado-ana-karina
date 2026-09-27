import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  const newProducts = products.filter((p) => p.isNew);
  const offerProducts = products.filter((p) => p.isOffer);

  return (
    <>
      <Hero />
      <CategoryGrid />

      {/* New products */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Recién llegados</p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">Productos Nuevos</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Delivery banner */}
      <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-5xl sm:text-6xl block mb-4">🏍️</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Domicilios a tu puerta
          </h2>
          <p className="text-white/80 mt-2 max-w-md mx-auto">
            Arma tu pedido, elige tus productos y te los llevamos. Así de fácil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-white/90">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span className="text-sm font-medium">Elige tus productos</span>
            </div>
            <svg className="hidden sm:block w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span className="text-sm font-medium">Agrega al carrito</span>
            </div>
            <svg className="hidden sm:block w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span className="text-sm font-medium">Pide por WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="ofertas" className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider">Los mejores precios</p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">Ofertas de la Semana</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All products preview */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Nuestro catálogo</p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">Todos los Productos</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {products.slice(0, 15).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
