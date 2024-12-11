import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,FormsModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(public productService: ProductService) {}

  ngOnInit() {

    this.productService.getAllProducts().subscribe((response) => {
      this.productService.setProducts(response.products);
    });
  }

  @Output() searchEvent = new EventEmitter<string>();
  searching: string = '';


  onSearch(): void {
    this.searchEvent.emit(this.searching);
  }
}
