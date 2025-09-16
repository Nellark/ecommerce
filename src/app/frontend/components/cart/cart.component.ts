import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [] 
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  ngOnInit(): void {}

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  increaseQuantity(productId: number): void {
    // Get current quantity and increase by 1
    this.cartService.cartItems$.subscribe(items => {
      const item = items.find(i => i.product.id === productId);
      if (item) {
        this.cartService.updateQuantity(productId, item.quantity + 1);
      }
    }).unsubscribe();
  }

  decreaseQuantity(productId: number): void {
    // Get current quantity and decrease by 1
    this.cartService.cartItems$.subscribe(items => {
      const item = items.find(i => i.product.id === productId);
      if (item) {
        this.cartService.updateQuantity(productId, item.quantity - 1);
      }
    }).unsubscribe();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}