import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';   // ✅ ensure this exists
import { Product } from '../../models/product.model';              // ✅ ensure this interface exists

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = '';
  sortBy = 'name';
  searchQuery = '';
  cartItemCount = 0;
  isMenuOpen = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // cart counter
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });

    // load products and categories
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
      this.categories = [...new Set(products.map(p => p.category))];
    });

    // apply search from query param if present
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.products];
  
    // category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
  
    // search filter (real-time)
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
  
    // sorting
    switch (this.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
  
    this.filteredProducts = filtered;
  }
  

  clearFilters(): void {
    this.selectedCategory = '';
    this.searchQuery = '';
    this.sortBy = 'name';
    this.applyFilters();
  }

  onSearch(): void {
    const term = this.searchQuery.trim();
    if (term) {
      this.router.navigate(['/products'], { queryParams: { search: term } });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
