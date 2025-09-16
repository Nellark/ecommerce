import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'] // ✅ fixed
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = '';
  sortBy = 'name';
  searchQuery = '';
  selectedSize = '';
  selectedColor = '';
  selectedStyle = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...products];
      this.categories = [...new Set(products.map(p => p.category))];
    });

    // Handle search query from URL params
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
        this.applyFilters();
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Size filter (check array)
    if (this.selectedSize) {
      filtered = filtered.filter(p => p.sizes?.includes(this.selectedSize));
    }

    // Color filter (check array)
    if (this.selectedColor) {
      filtered = filtered.filter(p => p.colors?.includes(this.selectedColor));
    }

    // Style filter (check array)
    if (this.selectedStyle) {
      filtered = filtered.filter(p => p.styles?.includes(this.selectedStyle));
    }

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

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedSize = '';
    this.selectedColor = '';
    this.selectedStyle = '';
    this.sortBy = 'name';
    this.applyFilters();
  }
}
