export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  inventory: number;
  created_at: string;
}

export interface Variant {
  id: string;
  product_id: string;
  name: string;
  value: string;
  price_override?: number;
  inventory: number;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface Order {
  id: string;
  customer_id?: string;
  status: 'pending' | 'paid' | 'shipped';
  total: number;
  stripe_session_id?: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  quantity: number;
  price: number;
}

export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  expiration?: string;
  active: boolean;
}

export interface CartItem {
  product: Product;
  variant?: Variant;
  quantity: number;
}