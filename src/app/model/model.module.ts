
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

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Cancelled' | 'Out for Delivery' | 'Delivered';
  items: { name: string; quantity: number }[];
  total: number;
}

export interface FetchOrdersResponse {
  orders: Order[];
}

export interface User {
  id: number; 
  username: string;
  email: string;
  password?: string; 
  createdAt: string; 
  updatedAt: string;
}

export interface AuthResponse {
  user: User;         
  token: string;      
}
export interface UserInterface {
  email: string;
  password: string;

}
