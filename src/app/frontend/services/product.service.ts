import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /** Master list of products */
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Electronics',
      rating: 4.8,
      reviews: 245,
      description: 'Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation.',
      features: ['Active Noise Cancellation', '30-hour battery life', 'Wireless charging', 'Premium leather'],
      inStock: true,
      isSale: true
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Electronics',
      rating: 4.6,
      reviews: 189,
      description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
      features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day battery'],
      inStock: true,
      isNew: true
    },
    {
      id: 3,
      name: 'Designer Backpack',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Fashion',
      rating: 4.7,
      reviews: 156,
      description: 'Stylish and functional backpack perfect for work, travel, or everyday use.',
      features: ['Water-resistant fabric', 'Laptop compartment', 'Multiple pockets', 'Ergonomic design'],
      inStock: true,
      isSale: true
    },
    {
      id: 4,
      name: 'Organic Coffee Beans',
      price: 24.99,
      image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Food',
      rating: 4.9,
      reviews: 312,
      description: 'Premium organic coffee beans sourced from sustainable farms around the world.',
      features: ['100% Organic', 'Fair Trade', 'Medium Roast', 'Freshly roasted'],
      inStock: true
    },
    {
      id: 5,
      name: 'Minimalist Table Lamp',
      price: 79.99,
      image: 'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Home',
      rating: 4.5,
      reviews: 98,
      description: 'Elegant minimalist lamp that adds warmth and style to any room.',
      features: ['LED bulb included', 'Adjustable brightness', 'Touch control', 'Modern design'],
      inStock: true,
      isNew: true
    },
    {
      id: 6,
      name: 'Professional Camera',
      price: 899.99,
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Electronics',
      rating: 4.8,
      reviews: 167,
      description: 'Capture stunning photos with this professional-grade camera featuring advanced autofocus.',
      features: ['24MP sensor', '4K video recording', 'Weather sealed', 'Fast autofocus'],
      inStock: true
    },
    {
      id: 7,
      name: 'Luxury Skincare Set',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Beauty',
      rating: 4.7,
      reviews: 203,
      description: 'Complete skincare routine with premium natural ingredients for glowing skin.',
      features: ['Natural ingredients', 'Anti-aging formula', 'Suitable for all skin types', 'Cruelty-free'],
      inStock: true,
      isSale: true
    },
    {
      id: 8,
      name: 'Wireless Charging Pad',
      price: 49.99,
      image: 'https://images.pexels.com/photos/4498450/pexels-photo-4498450.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'Electronics',
      rating: 4.4,
      reviews: 134,
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
      features: ['Fast charging', 'Universal compatibility', 'LED indicator', 'Non-slip surface'],
      inStock: true
    }
  ];

  /** Reactive stream of all products */
  private readonly productsSubject = new BehaviorSubject<Product[]>(this.products);
  readonly products$: Observable<Product[]> = this.productsSubject.asObservable();

  /** Return observable of all products */
  getAllProducts(): Observable<Product[]> {
    return this.products$;
  }

  /** Get a single product by its id */
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  /** Filter products by category */
  getProductsByCategory(category: string): Product[] {
    return this.products.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  /** First 4 products for a “featured” section */
  getFeaturedProducts(): Product[] {
    return this.products.slice(0, 4);
  }

  /** Text search across name, category and description */
  searchProducts(query: string): Product[] {
    if (!query?.trim()) return [];
    const searchTerm = query.toLowerCase();
    return this.products.filter(p =>
      [p.name, p.category, p.description]
        .some(field => field.toLowerCase().includes(searchTerm))
    );
  }
  getWeeklyDeals(): Product[] {
    return this.products.filter(
      p => (p as any).isSale === true || (p as any).isNew === true
    );
  }
}
