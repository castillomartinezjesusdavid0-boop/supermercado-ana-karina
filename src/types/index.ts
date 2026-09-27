export interface ProductVariant {
  label: string;
  price?: number;
}

export interface ProductVariantGroup {
  name: string;
  options: ProductVariant[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  variants?: ProductVariantGroup[];
  unit: string;
  inStock: boolean;
  isNew?: boolean;
  isOffer?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  color: string;
  subcategories: { slug: string; name: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}
