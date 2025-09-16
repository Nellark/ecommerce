import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartItemsValue: CartItem[] = [];

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItemsValue.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItemsValue.push({ product, quantity });
    }
    
    this.cartItems.next([...this.cartItemsValue]);
  }

  removeFromCart(productId: number): void {
    this.cartItemsValue = this.cartItemsValue.filter(item => item.product.id !== productId);
    this.cartItems.next([...this.cartItemsValue]);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItemsValue.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.cartItems.next([...this.cartItemsValue]);
      }
    }
  }

  getCartTotal(): number {
    return this.cartItemsValue.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    return this.cartItemsValue.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItemsValue = [];
    this.cartItems.next([]);
  }
}