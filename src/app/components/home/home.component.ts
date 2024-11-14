import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

import { ProductsResponseInterface } from '../../model/model.module';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, HttpClientModule, CommonModule, NavbarComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  paginatedProducts: any[] = [];
  filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   
    this.route.queryParams.subscribe((params) => {
      if (params['page']) {
        this.currentPage = +params['page']; 
      }
    });

    this.productService.getAllProducts().subscribe(
      (serverData: ProductsResponseInterface) => {
        this.products = serverData.products;
        this.filteredProducts = this.products;
        this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        this.updateProducts();
      },
      (error: any) => {
        console.error('Error fetching products:', error);
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
    if (searchQuery.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

   
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.updateProducts();
    this.updateQueryParams(); 
  }
}
