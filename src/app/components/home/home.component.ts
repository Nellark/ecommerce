import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

import { ProductsResponseInterface, ProductInterface } from '../../model/model.module';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, HttpClientModule, CommonModule, NavbarComponent, FormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: ProductInterface[] = [];
  paginatedProducts: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  loading: boolean = false;
  sortOrder: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // Fetch products and categories
    this.productService.getAllProducts().subscribe(
      (serverData: ProductsResponseInterface) => {
        this.products = serverData.products;
        this.filteredProducts = [...this.products];
        this.categories = [...new Set(this.products.map((product) => product.category))];
        this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        this.updateProducts();
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    );
  }

  updateProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateProducts();
      this.updateQueryParams();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateProducts();
      this.updateQueryParams();
    }
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }

  // Filter by category
  onCategoryChanged(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
    this.currentPage = 1;
    this.updateQueryParams();
  }

  // Sort functionality
  onSortOrderChanged(order: string) {
    this.sortOrder = order;
    this.applyFilters();
    this.currentPage = 1;
    this.updateQueryParams();
  }

  // Apply filters (category and sort)
  applyFilters() {
    let filtered = [...this.products];

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter((product) => product.category === this.selectedCategory);
    }

    // Sort products
    if (this.sortOrder === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortOrder === 'titleAsc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortOrder === 'titleDesc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    this.filteredProducts = filtered;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updateProducts();
  }
}
