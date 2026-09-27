import { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "frutas-y-verduras",
    name: "Frutas y Verduras",
    icon: "🥬",
    color: "bg-green-100",
    subcategories: [
      { slug: "frutas", name: "Frutas" },
      { slug: "verduras", name: "Verduras" },
    ],
  },
  {
    slug: "carnes-y-pollo",
    name: "Carnes y Pollo",
    icon: "🥩",
    color: "bg-red-100",
    subcategories: [
      { slug: "res", name: "Res" },
      { slug: "cerdo", name: "Cerdo" },
      { slug: "pollo", name: "Pollo" },
      { slug: "embutidos", name: "Embutidos" },
    ],
  },
  {
    slug: "lacteos-y-huevos",
    name: "Lácteos y Huevos",
    icon: "🥛",
    color: "bg-blue-100",
    subcategories: [
      { slug: "leches", name: "Leches" },
      { slug: "quesos", name: "Quesos" },
      { slug: "yogures", name: "Yogures" },
      { slug: "huevos", name: "Huevos" },
    ],
  },
  {
    slug: "panaderia",
    name: "Panadería",
    icon: "🍞",
    color: "bg-amber-100",
    subcategories: [
      { slug: "panes", name: "Panes" },
      { slug: "ponques-y-pasteles", name: "Ponqués y Pasteles" },
      { slug: "galletas", name: "Galletas" },
    ],
  },
  {
    slug: "bebidas",
    name: "Bebidas",
    icon: "🥤",
    color: "bg-cyan-100",
    subcategories: [
      { slug: "gaseosas", name: "Gaseosas" },
      { slug: "jugos", name: "Jugos" },
      { slug: "agua", name: "Agua" },
      { slug: "cervezas", name: "Cervezas" },
    ],
  },
  {
    slug: "despensa",
    name: "Despensa",
    icon: "🫘",
    color: "bg-orange-100",
    subcategories: [
      { slug: "arroz-y-granos", name: "Arroz y Granos" },
      { slug: "aceites", name: "Aceites" },
      { slug: "enlatados", name: "Enlatados" },
      { slug: "pastas", name: "Pastas" },
      { slug: "salsas-y-condimentos", name: "Salsas y Condimentos" },
    ],
  },
  {
    slug: "aseo-del-hogar",
    name: "Aseo del Hogar",
    icon: "🧹",
    color: "bg-purple-100",
    subcategories: [
      { slug: "detergentes", name: "Detergentes" },
      { slug: "limpiadores", name: "Limpiadores" },
      { slug: "papel-higienico", name: "Papel Higiénico" },
    ],
  },
  {
    slug: "cuidado-personal",
    name: "Cuidado Personal",
    icon: "🧴",
    color: "bg-pink-100",
    subcategories: [
      { slug: "jabones", name: "Jabones" },
      { slug: "shampoo", name: "Shampoo" },
      { slug: "cremas", name: "Cremas" },
    ],
  },
  {
    slug: "snacks-y-dulces",
    name: "Snacks y Dulces",
    icon: "🍿",
    color: "bg-yellow-100",
    subcategories: [
      { slug: "papas-y-snacks", name: "Papas y Snacks" },
      { slug: "chocolates-y-dulces", name: "Chocolates y Dulces" },
    ],
  },
];
