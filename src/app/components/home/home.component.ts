import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { LoaderComponent } from '../../loader/loader.component';
import { ProductInterface, ProductsResponseInterface } from '../../model/model.module';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, HttpClientModule, CommonModule, NavbarComponent, FormsModule, NgIf, LoaderComponent],
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
  notFound: string | null = null;
  isLoading: boolean = true;
  wishlistMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
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

    // Check for query params for pagination on reload
    this.route.queryParams.subscribe(params => {
      const page = params['page'];
      if (page) {
        this.currentPage = parseInt(page, 10);
        this.updateProducts();
      }
    });
  }

  onSearch(searching: string): void {
    if (searching.trim()) {
      this.filteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(searching.toLowerCase())
      );
      if (this.filteredProducts.length === 0) {
        this.notFound = 'Item not found! ☹️';
      } else {
        this.notFound = null;
      }
    } else {
      this.filteredProducts = [...this.products];
    }
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updateProducts();
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

  onCategoryChanged(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
    this.currentPage = 1;
    this.updateQueryParams();
  }

  onSortOrderChanged(order: string) {
    this.sortOrder = order;
    this.applyFilters();
    this.currentPage = 1;
    this.updateQueryParams();
  }

  applyFilters() {
    let filtered = [...this.products];
    if (this.selectedCategory) {
      filtered = filtered.filter((product) => product.category === this.selectedCategory);
    }
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

  // Add or remove a product from the wishlist
  toggleWishlist(product: ProductInterface) {
    if (this.isInWishlist(product)) {
      this.productService.removeFromWishlist(product.id);
      this.wishlistMessage = `${product.title} removed from wishlist!`;
    } else {
      this.productService.addToWishlist(product);
      this.wishlistMessage = `${product.title} added to wishlist!`;
    }

    setTimeout(() => {
      this.wishlistMessage = null;
    }, 2000);
  }

  isInWishlist(product: ProductInterface): boolean {
    const wishlist = this.productService.getWishlist();
    return wishlist.some(item => item.id === product.id);
  }
}
