export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string | null;
  gallery?: string[];
  description: string | null;
  category?: Category;
  category_id: number;
  is_active: number | boolean;
  is_best_seller: number | boolean;
  weight: number;
  created_at: string;
  updated_at: string;
}

export interface ShippingLocation {
  id: string | number;
  name: string;
}

export interface ShippingOption {
  courier_code: string;
  service: string;
  cost: number;
  etd: string;
  description?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  product?: {
    image_url: string;
  };
}

export interface Order {
  id: number;
  order_id: string;
  customer_name: string;
  email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_courier?: string;
  shipping_service?: string;
  tracking_number?: string;
  gross_amount: number;
  payment_status: 'pending' | 'success' | 'failed' | 'expired' | 'cancel' | string;
  order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
  snap_token?: string;
  order_items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User | null;
  };
  ziggy: {
    location: string;
    url: string;
    port: number | null;
    defaults: Record<string, unknown>;
    routes: Record<string, unknown>;
  };
  flash: {
    message: string | null;
    success: string | null;
    error: string | null;
  };
};
