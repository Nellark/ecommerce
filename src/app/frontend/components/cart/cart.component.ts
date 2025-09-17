import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

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
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items.filter(i => i?.product);
    });
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.changeQuantity(
      item.product.id,
      1,
      item.selectedSize,
      item.selectedColor,
      item.selectedStyle
    );
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.changeQuantity(
      item.product.id,
      -1,
      item.selectedSize,
      item.selectedColor,
      item.selectedStyle
    );
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(
      item.product.id,
      item.selectedSize,
      item.selectedColor,
      item.selectedStyle
    );
  }
}
