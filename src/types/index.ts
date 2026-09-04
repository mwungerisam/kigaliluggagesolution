export type ProductCategory =
  | 'All'
  | 'Suitcases'
  | 'Carry-On Luggage'
  | 'Large Suitcases'
  | 'Travel Bags'
  | 'Luggage Sets'
  | 'Travel Accessories'
  | 'Pillows'
  | 'Other';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number; // in RWF
  originalPrice?: number; // optional comparison price in RWF
  currency: 'RWF';
  category: ProductCategory;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  specifications: ProductSpec[];
  inStock: boolean;
  stockCount?: number;
  featured: boolean;
  isNewArrival?: boolean;
  bestSeller?: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string; // e.g. "Kigali, Kimironko", "Kigali, Nyarugenge"
  rating: number;
  comment: string;
  productName?: string;
  productPurchased?: string;
  date: string;
  verified: boolean;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  district: string;
  sector: string;
  addressDetails: string;
  orderNotes: string;
  paymentMethod: 'cash_on_delivery' | 'momo_on_delivery' | 'whatsapp_confirmation';
}

export interface OrderRecord {
  id: string;
  items: CartItem[];
  customer: CheckoutFormData;
  subtotal: number;
  deliveryFee: number; // 0 for Kigali
  total: number;
  status: 'Pending Confirmation' | 'Confirmed' | 'Dispatched' | 'Delivered';
  createdAt: string;
}
