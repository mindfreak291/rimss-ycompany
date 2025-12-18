// Product Types
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    category: string;
    colors: string[];
    sizes: string[];
    images: string[];
    inStock: boolean;
    featured: boolean;
    rating: number;
    reviews: number;
  }
  
  export interface ProductFilter {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    discountOnly?: boolean;
    searchQuery?: string;
  }
  
  // Cart Types
  export interface CartItem {
    product: Product;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
  }
  
  export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
  }
  
  // User Types
  export interface User {
    id: string;
    email: string;
    name: string;
    isAuthenticated: boolean;
  }
  
  // Order Types
  export interface ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  }
  
  export interface PaymentInfo {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  }
  
  export interface Order {
    id: string;
    items: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: 'credit_card' | 'paypal' | 'cod';
    total: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    createdAt: string;
  }
  
  // Plugin Types
  export interface PluginConfig {
    enabled: boolean;
    position?: 'top' | 'middle' | 'bottom';
    theme?: 'light' | 'dark';
    [key: string]: any;
  }
  
  export interface Plugin {
    id: string;
    name: string;
    component: React.ComponentType<any>;
    config: PluginConfig;
  }
  
  // UI State Types
  export interface UIState {
    isLoading: boolean;
    error: string | null;
    notification: {
      show: boolean;
      message: string;
      type: 'success' | 'error' | 'info' | 'warning';
    } | null;
    modalOpen: boolean;
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }