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
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  loading: boolean = false; // Add the loading state

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true; // Start loading

    // Subscribe to filtered products from ProductService
    this.productService.getFilteredProducts().subscribe((products) => {
      this.filteredProducts = products;
      this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      this.updateProducts();
      this.loading = false; // Stop loading when products are fetched
    });

    // Fetch all products initially
    this.productService.getAllProducts().subscribe(
      (serverData: ProductsResponseInterface) => {
        this.products = serverData.products;
        this.filteredProducts = this.products;
        this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        this.updateProducts();
        this.loading = false; // Stop loading
      },
      (error: any) => {
        console.error('Error fetching products:', error);
        this.loading = false; // Stop loading in case of error
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

  onSearchQueryChanged(searchQuery: string) {
    this.loading = true; // Start loading when searching
    this.productService.searchProducts(searchQuery);
    this.currentPage = 1;
    this.updateQueryParams();
    this.loading = false; // Stop loading after search is complete
  }
}
