import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


      private readonly products: Product[] = [
        {
          id: 1,
          name: 'Wireless Headphones',
          price: 299.99,
          originalPrice: 399.99,
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/42408/pexels-photo-42408.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
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
          images: [
            'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/277394/pexels-photo-277394.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
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
          images: [
            'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/374574/pexels-photo-374574.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
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
          images: [
            'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/972533/pexels-photo-972533.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/894693/pexels-photo-894693.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
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
          images: [
            'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/809243/pexels-photo-809243.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/389818/pexels-photo-389818.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
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
          name: 'Gaming Mechanical Keyboard',
          price: 149.99,
          originalPrice: 199.99,
          image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Electronics',
          rating: 4.8,
          reviews: 223,
          description: 'RGB mechanical keyboard with custom switches and ergonomic design for gaming enthusiasts.',
          features: ['RGB Backlighting', 'Hot-swappable switches', 'Ergonomic wrist rest', 'Programmable keys'],
          inStock: true,
          isSale: true
        },
        {
          id: 7,
          name: 'Luxury Leather Wallet',
          price: 59.99,
          image: 'https://images.pexels.com/photos/179934/pexels-photo-179934.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/179934/pexels-photo-179934.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/273166/pexels-photo-273166.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/276563/pexels-photo-276563.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Fashion',
          rating: 4.6,
          reviews: 145,
          description: 'Handcrafted wallet made from genuine leather with multiple compartments.',
          features: ['100% Genuine Leather', 'RFID Protection', 'Slim Design', 'Multiple compartments'],
          inStock: true,
          isNew: true
        },
        {
          id: 8,
          name: '4K Ultra HD TV',
          price: 799.99,
          originalPrice: 999.99,
          image: 'https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3757059/pexels-photo-3757059.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/2796145/pexels-photo-2796145.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Electronics',
          rating: 4.9,
          reviews: 512,
          description: 'Immersive 4K Ultra HD smart TV with HDR and voice control support.',
          features: ['4K UHD', 'HDR10+', 'Smart TV apps', 'Voice Assistant'],
          inStock: true,
          isSale: true
        },
        {
          id: 9,
          name: 'Running Shoes',
          price: 120.00,
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/999267/pexels-photo-999267.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3757373/pexels-photo-3757373.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Fashion',
          rating: 4.7,
          reviews: 340,
          description: 'Lightweight and breathable running shoes designed for maximum comfort and durability.',
          features: ['Breathable mesh', 'Cushioned sole', 'Lightweight', 'Slip-resistant'],
          inStock: true,
          isNew: true
        },
        {
          id: 10,
          name: 'Stainless Steel Cookware Set',
          price: 249.99,
          originalPrice: 349.99,
          image: 'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg?auto=compress&cs=tinysrgb&w=500',
          images: [
            'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/410988/pexels-photo-410988.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.pexels.com/photos/460537/pexels-photo-460537.jpeg?auto=compress&cs=tinysrgb&w=500'
          ],
          category: 'Home',
          rating: 4.8,
          reviews: 275,
          description: 'Complete set of premium stainless steel cookware for all your kitchen needs.',
          features: ['Non-stick surface', 'Oven safe', 'Dishwasher safe', '10-piece set'],
          inStock: true,
          isSale: true
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
