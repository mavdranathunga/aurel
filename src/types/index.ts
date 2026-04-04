export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  materials: string;
  care: string[];
  category: 'men' | 'women' | 'accessories';
  subcategory: string;
  sizes: Size[];
  colors: ProductColor[];
  images: string[];
  badge?: 'new' | 'sale' | 'bestseller';
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface Size {
  label: string;
  available: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
