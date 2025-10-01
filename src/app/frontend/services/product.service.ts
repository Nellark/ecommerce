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
          image: 'https://i.pinimg.com/1200x/6b/f4/eb/6bf4eb820af3fc679c49dc8783dc049c.jpg',
          images: [
            'https://i.pinimg.com/1200x/1f/37/77/1f37771a5575b04f4a24fe3dbb869914.jpg',
            'https://i.pinimg.com/736x/86/d7/a9/86d7a9509c2a7c2c926ca1f5e49d6ad5.jpg',
            'https://i.pinimg.com/736x/00/41/64/004164c14a27adb28643330b3016e758.jpg',
            'https://i.pinimg.com/736x/53/7f/04/537f04307d1bf25ec73cea788bcf2bfc.jpg'
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
          image: 'https://i.pinimg.com/736x/6c/71/fc/6c71fc825ad5bf6b41eff81d7bc07a93.jpg',
          images: [
            'https://i.pinimg.com/736x/51/6a/43/516a43a0069cf499729c6b4e5058ea28.jpg',
            'https://i.pinimg.com/1200x/ae/c4/26/aec426a993ca7f10de6a1ae912619627.jpg',
            'https://i.pinimg.com/1200x/c1/98/63/c19863b0acabb2b4a01d760e8056350d.jpg',
            'https://i.pinimg.com/736x/23/3d/22/233d222d4ed40d9c13390d001d619eaa.jpg'
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
          image: 'https://i.pinimg.com/1200x/73/93/a5/7393a52f4bf1cd72afd14141cba9b1a3.jpg',
          images: [
            'https://i.pinimg.com/1200x/54/1e/a0/541ea0c940aa9bf17f64068df5e7c524.jpg',
            'https://i.pinimg.com/736x/be/e5/35/bee5350e38803fe962558b46ed47a998.jpg',
            'https://i.pinimg.com/736x/22/a3/e9/22a3e93b25c2b44baf58f59e51a0cb47.jpg',
            'https://i.pinimg.com/736x/6f/3e/dc/6f3edc09ef64588ebd082fc1d53a3f9d.jpg'
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
          image: 'https://i.pinimg.com/1200x/95/f6/a2/95f6a28723784c9b5e06003209232195.jpg',
          images: [
            'https://i.pinimg.com/1200x/da/ef/d6/daefd64b41014f25d5a68f9a69399423.jpg',
            'https://i.pinimg.com/1200x/b5/45/88/b545883ec399f5cf9bcdc5219e656eb4.jpg',
            'https://i.pinimg.com/1200x/9a/3c/b0/9a3cb0637685b5c68da4adeb9a1a2724.jpg',
            'https://i.pinimg.com/1200x/49/2a/cb/492acb6b1035a4442c990f2ba74d3639.jpg'
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
          image: 'https://i.pinimg.com/1200x/e3/be/23/e3be239bc0a767a24e32e5680e407500.jpg' ,
          images: [
            'https://i.pinimg.com/736x/15/cc/aa/15ccaacc59e60cbd204585acda858328.jpg',
            'https://i.pinimg.com/736x/5a/4d/88/5a4d885b743ea2b42964b6fe22fe0dd8.jpg',
            
            'https://i.pinimg.com/1200x/a2/fe/02/a2fe02c51a8bd53cc3e50d9fba258f2b.jpg',
            'https://i.pinimg.com/1200x/f8/9a/f6/f89af6cb9dbff9273c1e02c1d91d104a.jpg'
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
          name: 'Gaming Keyboard',
          price: 149.99,
          originalPrice: 199.99,
          image: 'https://i.pinimg.com/1200x/3e/b9/16/3eb916a600c0e95f52da7fc881c9bf0e.jpg',
          images: [
            'https://i.pinimg.com/1200x/b9/25/f2/b925f21922428d5305b5aca863449082.jpg',
            'https://i.pinimg.com/736x/98/43/75/9843754dde46975e5373067b2d5dc499.jpg',
            'https://i.pinimg.com/1200x/a2/53/4f/a2534fa85bb18159cfa4426a510a8fb5.jpg',
            'https://i.pinimg.com/736x/56/47/4b/56474b66a560b05fa73707689cf6a2e8.jpg'
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
          image: 'https://i.pinimg.com/736x/5b/35/54/5b3554408efa9ea58196c70de48d9200.jpg',
          images: [
            'https://i.pinimg.com/736x/62/e3/aa/62e3aac2a6c7416834ca6bc5fbcf3a0f.jpg',
            'https://i.pinimg.com/1200x/d2/54/cc/d254cc6741328a89cc1600e8ca33398b.jpg',
       
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
          image: 'https://i.pinimg.com/1200x/ad/2c/d6/ad2cd627b3c04d87ce31aa50f365f9c6.jpg',
          images: [
            'https://i.pinimg.com/736x/a4/93/1e/a4931ebbdcb6054ea8f5950749a36999.jpg',
            'https://i.pinimg.com/1200x/2c/64/16/2c64163149bf521a2f5d444aacd90edc.jpg',
            'https://i.pinimg.com/1200x/ee/0f/e5/ee0fe5cb602318ab5855c01a0b34ef72.jpg',
            'https://i.pinimg.com/736x/3d/7e/85/3d7e8511ca2ae1bbd93d8c9fc0e08d86.jpg'
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
          image: 'https://i.pinimg.com/736x/fc/24/84/fc2484e6ca0e7951307f9b58527f2f84.jpg',
          images: [
            'https://i.pinimg.com/1200x/b2/c0/41/b2c041f86e920318cfca3aa139789be2.jpg',
            'https://i.pinimg.com/1200x/81/cd/cd/81cdcdc6e88a9264143c7b0622e01044.jpg',
            'https://i.pinimg.com/1200x/f1/9b/87/f19b872f08e206240a19c322aeb7ce9e.jpg',
            'https://i.pinimg.com/1200x/76/7a/57/767a575c025cf7beba1672e7d007a103.jpg'
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
          image: 'https://i.pinimg.com/736x/20/cd/cc/20cdcca2372d19e33f9f50cbf23be5a3.jpg',
          images: [
            'https://i.pinimg.com/736x/a4/46/8e/a4468e24c371a238cd62a4e465ce0322.jpg',
            'https://i.pinimg.com/736x/27/c2/06/27c2064279c44411955e3a27f513d584.jpg',
            'https://i.pinimg.com/736x/13/03/30/1303305df7b216bd201c2fba106bd60a.jpg',
            
          ],
          category: 'Home',
          rating: 4.8,
          reviews: 275,
          description: 'Complete set of premium stainless steel cookware for all your kitchen needs.',
          features: ['Non-stick surface', 'Oven safe', 'Dishwasher safe', '10-piece set'],
          inStock: true,
          isSale: true
        },
        {
          id: 11,
          name: 'iPhone 16 Pro-max',
          price: 2049.99,
          originalPrice: 2349.99,
          image: 'https://images.unsplash.com/photo-1726587912109-3422e8f54741?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
          images: [
            'https://images.unsplash.com/photo-1709178295038-acbeec786fcf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D',
            'https://images.unsplash.com/photo-1605636808063-ba999ff935eb?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1724051017997-15c226434b57?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            
          ],
          category: 'Electronics',
          rating: 4.8,
          reviews: 275,
          description: 'The iPhone 16 Pro-Max delivers cutting-edge performance and stunning design. Crafted from aerospace-grade titanium, it features Apple’s latest A18 Pro chip, an advanced triple-camera system with 8K video, and an expansive 6.9-inch Super Retina XDR display.',
          features: ['6.9-inch Super Retina XDR OLED display with ProMotion, A18 Pro chip for blazing-fast performance', 
                    'Triple-camera system with 48MP main sensor and 8K video recording',
                    ' 5G connectivity and Wi-Fi 7 support',
                    'Up to 1TB storage options',
                    'All-day battery with fast charging and MagSafe',
                    'Titanium frame with Ceramic Shield front for enhanced durability',
                    'Face ID and iOS 26 with advanced AI features'],
          inStock: true,
          isSale: true
        
        },

        {
          id: 12,
          name: 'Lipstick',
          price: 49.99,
          originalPrice: 69.99,
          image: 'https://images.unsplash.com/photo-1600852307130-41924335e4dc?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          images: [
            'https://images.unsplash.com/photo-1621441617122-be70d6579ac9?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1600852435692-8f34756456e5?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            
          ],
          category: 'Cosmetics',
          rating: 4.7,
          reviews: 134,
          description: 'Premium lipstick set featuring long-lasting vibrant colors for all occasions.',
          features: ['Matte finish', 'Long-lasting', 'Hydrating formula', 'Vegan & cruelty-free'],
          inStock: true,
          isNew: true
        },
        {
          id: 13,
          name: 'Hydrating Face Serum',
          price: 39.99,
          originalPrice: 59.99,
          image: 'https://images.unsplash.com/photo-1643747394944-89b11e7fb616?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          images: [
            'https://images.unsplash.com/photo-1728842949422-afe84b25ad81?q=80&w=2091&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1642162229036-cc0617ea36fc?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1719132249609-ad7f1fb4abfc?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          ],
          category: 'Cosmetics',
          rating: 4.8,
          reviews: 98,
          description: 'Boost your skin’s hydration with this lightweight, fast-absorbing serum.',
          features: ['Vitamin C enriched', 'Non-greasy', 'Reduces fine lines', 'Dermatologist tested'],
          inStock: true,
          isNew: true
        },
        {
          id: 14,
          name: 'Rejuvenating Night Cream',
          price: 59.99,
          originalPrice: 79.99,
          image: 'https://images.unsplash.com/photo-1629732047847-50219e9c5aef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          images: [
            'https://images.unsplash.com/photo-1629732047847-50219e9c5aef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1630398776959-6ff31b49df55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            
          ],
          category: 'Cosmetics',
          rating: 4.9,
          reviews: 112,
          description: 'Night cream designed to rejuvenate and restore your skin while you sleep.',
          features: ['Rich in antioxidants', 'Hydrating formula', 'Reduces wrinkles', 'Suitable for all skin types'],
          inStock: true,
          isSale: true
        },
        {
          id: 15,
          name: 'Eyeshadow Palette',
          price: 69.99,
          originalPrice: 89.99,
          image: 'https://images.unsplash.com/photo-1723238221899-25b57408ac24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          images: [
            'https://images.unsplash.com/photo-1723238221828-da386ef38cc9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1723238221515-18b9cea74b75?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            
          ],
          category: 'Cosmetics',
          rating: 4.8,
          reviews: 89,
          description: 'Versatile eyeshadow palette with highly pigmented mineral colors for stunning eye looks.',
          features: ['12 vibrant shades', 'Smooth application', 'Long-lasting', 'Cruelty-free'],
          inStock: true,
          isNew: true
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
