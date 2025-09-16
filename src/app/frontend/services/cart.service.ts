import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedStyle?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsValue: CartItem[] = [];
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Load cart from localStorage if available
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItemsValue = JSON.parse(saved);
      this.cartItems.next([...this.cartItemsValue]);
    }
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsValue));
    this.cartItems.next([...this.cartItemsValue]);
  }

  addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
    const existingIndex = this.cartItemsValue.findIndex(ci =>
      ci.product.id === item.product.id &&
      ci.selectedSize === item.selectedSize &&
      ci.selectedColor === item.selectedColor &&
      ci.selectedStyle === item.selectedStyle
    );

    if (existingIndex > -1) {
      this.cartItemsValue[existingIndex].quantity += quantity;
    } else {
      this.cartItemsValue.push({ ...item, quantity });
    }

    this.saveCart();
  }

  removeFromCart(productId: number, selectedSize?: string, selectedColor?: string, selectedStyle?: string): void {
    this.cartItemsValue = this.cartItemsValue.filter(item =>
      !(item.product.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor &&
        item.selectedStyle === selectedStyle)
    );
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number, selectedSize?: string, selectedColor?: string, selectedStyle?: string): void {
    const item = this.cartItemsValue.find(i =>
      i.product.id === productId &&
      i.selectedSize === selectedSize &&
      i.selectedColor === selectedColor &&
      i.selectedStyle === selectedStyle
    );

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId, selectedSize, selectedColor, selectedStyle);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  changeQuantity(productId: number, delta: number, selectedSize?: string, selectedColor?: string, selectedStyle?: string): void {
    const item = this.cartItemsValue.find(i =>
      i.product.id === productId &&
      i.selectedSize === selectedSize &&
      i.selectedColor === selectedColor &&
      i.selectedStyle === selectedStyle
    );
    if (item) {
      this.updateQuantity(productId, item.quantity + delta, selectedSize, selectedColor, selectedStyle);
    }
  }

  getCartTotal(): number {
    return this.cartItemsValue.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
  }

  getCartItemCount(): number {
    return this.cartItemsValue.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }

  clearCart(): void {
    this.cartItemsValue = [];
    this.saveCart();
  }

  getCartItems(): CartItem[] {
    return [...this.cartItemsValue];
  }
}
