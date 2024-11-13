
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsResponseInterface } from '../../model/model.module';



@Component({
  selector: 'app-home',
  standalone: true,

  imports: [NgFor, RouterLink, HttpClientModule, CommonModule, NavbarComponent],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit  {

  private http = inject(HttpClient);

  products: any[] = [];
  paginatedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  product: any;
isLoading: any;
selectedProduct: any;
 


  constructor(private productService: ProductService) {
  

  }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe((serverData: ProductsResponseInterface) => {
      console.log(serverData);
      this.products = serverData.products;
      this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
      this.updateProducts();
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
  );
}


  updateProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateProducts();
    }
  }

}




