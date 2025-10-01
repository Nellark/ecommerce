export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;          
  images?: string[];       // additional images for carousel
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  sizes?: string[];
  colors?: string[];
  styles?: string[];
  discountedPrice?: number; 
  discount?: number;  
}




export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedStyle?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}