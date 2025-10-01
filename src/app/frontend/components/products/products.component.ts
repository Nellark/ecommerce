import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

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
      this.categories = [...new Set(products.map(p => p.category))];

      // Read query params
      this.route.queryParams.subscribe(params => {
        this.selectedCategory = params['category'] || '';
        this.searchQuery = params['search'] || '';
        this.selectedDeal = params['deal'] || '';
        this.applyFilters();
      });
    });
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Search filter
    if (this.searchQuery) {
      const term = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    }

    // Deal filter
    if (this.selectedDeal) {
      switch (this.selectedDeal) {
        case 'sale': filtered = filtered.filter(p => (p as any).isSale === true); break;
        case 'new': filtered = filtered.filter(p => (p as any).isNew === true); break;
      }
    }

    // Category & other filters
    if (this.selectedCategory) filtered = filtered.filter(p => p.category === this.selectedCategory);
    if (this.selectedSize) filtered = filtered.filter(p => p.sizes?.includes(this.selectedSize));
    if (this.selectedColor) filtered = filtered.filter(p => p.colors?.includes(this.selectedColor));
    if (this.selectedStyle) filtered = filtered.filter(p => p.styles?.includes(this.selectedStyle));

    // Sorting
    switch (this.sortBy) {
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    }

    this.filteredProducts = filtered;
  }

  // Sidebar category click
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.router.navigate([], { queryParams: { category }, queryParamsHandling: 'merge' });
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
    this.router.navigate([], { queryParams: {} });
    this.applyFilters();
  }

  handleModalChange(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
