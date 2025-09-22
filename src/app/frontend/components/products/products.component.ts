import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  categories: string[] = [];
  selectedCategory = '';
  sortBy = 'name';
  searchQuery = '';

  // deal & filter selections
  selectedDeal = '';
  selectedSize = '';
  selectedColor = '';
  selectedStyle = '';

  isModalOpen = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
      this.categories = [...new Set(products.map(p => p.category))];
      this.applyFilters();
    });

    // pick up query params like ?search=...&deal=sale
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedDeal = params['deal'] || '';
      this.applyFilters();
    });
  }

  /**
   * Apply all active filters: search, deals, category, size, color, style, sort
   */
  applyFilters(): void {
    let filtered = [...this.products];

    // --- Search ---
    if (this.searchQuery) {
      const term = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    // --- Deals ---
    if (this.selectedDeal) {
      switch (this.selectedDeal) {
        case 'sale':
          filtered = filtered.filter(p => p.isSale === true);
          break;
        case 'discounts':
          filtered = filtered.filter(
            p => p.originalPrice !== undefined && p.price < p.originalPrice
          );
          break;
        case 'daily':
          // replace with your own logic/service call if you have daily deals
          filtered = filtered.filter(p => p.features?.some(f => f.toLowerCase().includes('daily')));
          break;
        case 'weekly':
          filtered = filtered.filter(p => p.features?.some(f => f.toLowerCase().includes('weekly')));
          break;
        case 'flash':
          filtered = filtered.filter(p => p.features?.some(f => f.toLowerCase().includes('flash')));
          break;
      }
    }

    // --- Other Filters ---
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    if (this.selectedSize) {
      filtered = filtered.filter(p =>
        p.sizes?.some(size => size === this.selectedSize)
      );
    }

    if (this.selectedColor) {
      const sel = this.selectedColor.toLowerCase();
      filtered = filtered.filter(p =>
        // match either the single color field or colors[]
        p.color?.toLowerCase() === sel ||
        p.colors?.some(c => c.toLowerCase() === sel)
      );
    }

    if (this.selectedStyle) {
      filtered = filtered.filter(p =>
        p.styles?.some(style => style === this.selectedStyle)
      );
    }

    // --- Sorting ---
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

  /**
   * Called from header buttons or links to apply a deal type
   */
  applyDeal(type: string): void {
    this.selectedDeal = type;
    this.router.navigate([], {
      queryParams: { deal: type },
      queryParamsHandling: 'merge'
    });
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedSize = '';
    this.selectedColor = '';
    this.selectedStyle = '';
    this.sortBy = 'name';
    this.searchQuery = '';
    this.selectedDeal = '';
    this.applyFilters();
  }

  openModal(): void {
    this.isModalOpen = true;
    document.body.classList.add('modal-open');
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.classList.remove('modal-open');
  }

  handleModalChange(isOpen: boolean): void {
    this.isModalOpen = isOpen;
  }
}
