import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  increaseQuantity(productId: number): void {
    this.cartService.changeQuantity(productId, 1);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.changeQuantity(productId, -1);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
