import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  suggestions: string[] = [];
  products: Product[] = [];
  cartItemCount = 0;
  isMenuOpen = false;
  activeDeal = ''; // track which deal is active

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Load all products for search suggestions
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });

    // Subscribe to cart changes
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });

    // Listen to query params to keep search and deal active
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.activeDeal = params['deal'] || '';
      this.updateSuggestions();
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Live search suggestions
  onSearchChange(): void {
    this.updateSuggestions();

    // Auto navigate to products page with search query
    const term = this.searchQuery.trim();
    this.router.navigate(['/products'], { queryParams: { search: term, deal: this.activeDeal } });
  }

  private updateSuggestions(): void {
    const term = this.searchQuery.toLowerCase().trim();
    if (!term) {
      this.suggestions = [];
      return;
    }
    this.suggestions = this.products
      .filter(p => p.name.toLowerCase().includes(term))
      .map(p => p.name)
      .slice(0, 5);
  }

  selectSuggestion(name: string): void {
    this.searchQuery = name;
    this.suggestions = [];
    this.router.navigate(['/products'], { queryParams: { search: name, deal: this.activeDeal } });
  }

  // Handle clicking on deals in the sub-header
  applyDeal(deal: string): void {
    this.activeDeal = deal;
    this.router.navigate(['/products'], { queryParams: { search: this.searchQuery, deal } });
  }
}
