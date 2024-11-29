import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ProductService]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;
  cartItemCount: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.productService.getCart();  
    this.updateCartTotal();  
    this.cartItemCount = this.productService.getCartItemCount(); 
  }

  removeItem(productId: string) {
    this.productService.removeFromCart(productId);  
    this.loadCart();  
  }

  clearCart() {
    this.productService.clearCart(); 
    this.loadCart(); 
  }

  updateQuantity(item: any, index: number) {
    if (item.quantity < 1) {
      item.quantity = 1;  
    }
    this.productService.updateCartItemQuantity(item.id, item.quantity);  
    this.loadCart(); 
  }

  updateCartTotal() {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price * item.quantity; 
    }
    this.cartTotal = parseFloat(total.toFixed(2));  
  }

  goBack() {
    window.history.back(); 
  }
}
