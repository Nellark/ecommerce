import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';  

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  searching: string = '';

  constructor(
    public productService: ProductService,
    public authService: AuthService  
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response && response.products) {
          this.productService.setProducts(response.products);
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  onSearch(): void {
    this.searchEvent.emit(this.searching.trim());
  }

  getCartCount(): number {
    return this.productService.getCartItemCount() || 0;
  }

  logout(): void {
    this.authService.logout();  
  }
}
