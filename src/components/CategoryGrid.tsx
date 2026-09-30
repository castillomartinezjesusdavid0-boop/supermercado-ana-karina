import Link from "next/link";
import { categories } from "@/data/categories";

export default function CategoryGrid() {
  return (
    <section id="categorias" className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <p className="text-red-600 font-semibold text-sm uppercase tracking-wider">Explora nuestro catálogo</p>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
          Elige una categoría
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categoria/${cat.slug}`}
            className="group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${cat.color} rounded-2xl flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
              {cat.icon}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight group-hover:text-red-700 transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
