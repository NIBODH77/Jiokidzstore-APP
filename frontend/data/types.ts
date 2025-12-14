export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  mrp?: number;
  discount?: number;
  rating: number;
  reviews?: number;
  reviewCount?: number;
  image?: string;
  images?: string[];
  description: string;
  category: string;
  subcategory?: string;
  sizes?: string[];
  colors?: string[];
  ageGroup?: string;
  inStock?: boolean;
  stock?: number;
  isWishlisted?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  itemCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  landmark?: string;
  pincode: string;
  city: string;
  state: string;
  type: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Placed' | 'Confirmed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  placedAt: Date;
  deliveryAddress: Address;
  estimatedDelivery: Date;
  trackingId?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  date: Date;
  helpful: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'general';
  date: Date;
  read: boolean;
  actionUrl?: string;
}
