import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
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

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedDeal = params['deal'] || '';
      this.applyFilters();
    });
  }


  // Handle header deal clicks
  applyDeal(type: string): void {
    this.selectedDeal = type;
    this.router.navigate([], { queryParams: { deal: type }, queryParamsHandling: 'merge' });
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Search
    if (this.searchQuery) {
      const term = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    }

    // Deal filter using existing fields
    if (this.selectedDeal) {
      switch (this.selectedDeal) {
        case 'sale':
          filtered = filtered.filter(p => p.category.toLowerCase().includes('sale'));
          break;
        case 'discounts':
          filtered = filtered.filter(p => (p.originalPrice || p.price) > p.price);
          break;
        case 'daily':
          filtered = filtered.filter(p => p.category.toLowerCase().includes('daily'));
          break;
        case 'weekly':
          filtered = filtered.filter(p => p.category.toLowerCase().includes('weekly'));
          break;
        case 'flash':
          filtered = filtered.filter(p => p.category.toLowerCase().includes('flash'));
          break;
      }
    }

    // Other filters
    if (this.selectedCategory) filtered = filtered.filter(p => p.category === this.selectedCategory);
    if (this.selectedSize) filtered = filtered.filter(p => p.sizes?.includes(this.selectedSize));
    if (this.selectedColor) filtered = filtered.filter(p => p.colors?.includes(this.selectedColor));
    if (this.selectedStyle) filtered = filtered.filter(p => p.styles?.includes(this.selectedStyle));

    // Sorting
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
  handleModalChange(isOpen: boolean) {
    this.isModalOpen = isOpen;
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

  openModal() {
    this.isModalOpen = true;
    document.body.classList.add('modal-open');
  }
  
  closeModal() {
    this.isModalOpen = false;
    document.body.classList.remove('modal-open');
  }
  
}
