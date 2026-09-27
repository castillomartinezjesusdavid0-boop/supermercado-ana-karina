import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Trust badges */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🚚", title: "Domicilio rápido", desc: "Recibe en tu puerta" },
              { icon: "✅", title: "Productos frescos", desc: "Calidad garantizada" },
              { icon: "💬", title: "Pide por WhatsApp", desc: "Fácil y directo" },
              { icon: "⭐", title: "Tu confianza", desc: "Años de servicio" },
            ].map((badge) => (
              <div key={badge.title} className="flex items-center gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{badge.title}</p>
                  <p className="text-gray-400 text-xs">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center text-white font-black text-lg">
                AK
              </div>
              <div>
                <h3 className="text-white font-bold">Ana Karina</h3>
                <p className="text-emerald-400 text-[10px] font-semibold tracking-widest uppercase">Exprés</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tu supermercado de confianza. Productos frescos y de calidad con entrega a domicilio.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-4">Categorías</h4>
            <ul className="space-y-2">
              {[
                { href: "/categoria/frutas-y-verduras", name: "Frutas y Verduras" },
                { href: "/categoria/carnes-y-pollo", name: "Carnes y Pollo" },
                { href: "/categoria/lacteos-y-huevos", name: "Lácteos y Huevos" },
                { href: "/categoria/bebidas", name: "Bebidas" },
                { href: "/categoria/despensa", name: "Despensa" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Información</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-400">Quiénes somos</span></li>
              <li><span className="text-sm text-gray-400">Preguntas frecuentes</span></li>
              <li><span className="text-sm text-gray-400">Términos y condiciones</span></li>
              <li><span className="text-sm text-gray-400">Política de privacidad</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contáctanos</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-lg">📍</span>
                <p className="text-sm text-gray-400">Dirección del supermercado</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">📞</span>
                <p className="text-sm text-gray-400">+57 300 123 4567</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lg">🕐</span>
                <div className="text-sm text-gray-400">
                  <p>Lunes a Sábado</p>
                  <p>7:00 AM - 9:00 PM</p>
                  <p>Domingos y Festivos</p>
                  <p>8:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © 2026 Ana Karina Exprés. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 hover:text-white cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </span>
            <span className="text-gray-500 hover:text-white cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z"/></svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
