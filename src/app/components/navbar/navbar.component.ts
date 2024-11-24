import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(public productService: ProductService) {}

  ngOnInit() {

    this.productService.getAllProducts().subscribe((response) => {
      this.productService.setProducts(response.products);
    });
  }

  onSearchQueryChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim();
    this.productService.searchProducts(query);
  }
}

