export interface ProductsResponseInterface {
  total: number;
  skip: number;
  limit: number;
  products: ProductInterface[];
}

export interface ProductInterface {
  quantity: number;
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export enum OrderStatus {
  Cancelled = 'Cancelled',
  OutForDelivery = 'Out for Delivery',
  Delivered = 'Delivered',
}

export interface OrderItem {
  name: string;
  quantity: number;
}

export interface Order {
orderId: any;
cartItems: any;
cartTotal: any;
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}

export interface FetchOrdersResponse {
  orders: Order[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Optional for scenarios like token-based auth
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface UserInterface {
  email?: string;
  username: string;
  password: string;
}
