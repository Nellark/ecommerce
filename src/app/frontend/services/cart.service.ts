import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem, Product } from '../models/product.model';
export type { CartItem };


@Injectable({
    providedIn: 'root'
  })
  export class CartService {
    private cartItemsValue: CartItem[] = [];
    private cartItems = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItems.asObservable();
  
    //message subject for success notifications
    private messageSource = new Subject<string>();
    message$ = this.messageSource.asObservable();
  
    constructor() {
      const saved = localStorage.getItem('cart');
      if (saved) {
        try {
          const parsed: CartItem[] = JSON.parse(saved);
          this.cartItemsValue = parsed.filter(
            item => item && item.product && typeof item.product.id !== 'undefined'
          );
          this.cartItems.next([...this.cartItemsValue]);
        } catch {
          this.cartItemsValue = [];
        }
      }
    }
  
    private saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItemsValue));
      this.cartItems.next([...this.cartItemsValue]);
    }
  
    private notify(message: string) {
      this.messageSource.next(message);
    }
  
    addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
      if (!item || !item.product) return;
  
      const existingIndex = this.cartItemsValue.findIndex(ci =>
        ci.product.id === item.product.id &&
        ci.selectedSize === item.selectedSize &&
        ci.selectedColor === item.selectedColor &&
        ci.selectedStyle === item.selectedStyle
      );
  
      if (existingIndex > -1) {
        this.cartItemsValue[existingIndex].quantity += quantity;
        this.notify('Item quantity updated in cart ✅');
      } else {
        this.cartItemsValue.push({ ...item, quantity });
        this.notify('Item added to cart ✅');
      }
  
      this.saveCart();
    }
  
    changeQuantity(productId: number, delta: number, selectedSize?: string, selectedColor?: string, selectedStyle?: string): void {
      const item = this.cartItemsValue.find(i =>
        i.product?.id === productId &&
        i.selectedSize === selectedSize &&
        i.selectedColor === selectedColor &&
        i.selectedStyle === selectedStyle
      );
      if (item) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
          this.removeFromCart(productId, selectedSize, selectedColor, selectedStyle);
          this.notify('Item removed from cart ❌');
        } else {
          item.quantity = newQty;
          this.saveCart();
          this.notify('Item quantity updated ✅');
        }
      }
    }
  
    removeFromCart(productId: number, selectedSize?: string, selectedColor?: string, selectedStyle?: string): void {
      this.cartItemsValue = this.cartItemsValue.filter(item =>
        !(item.product?.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor &&
          item.selectedStyle === selectedStyle)
      );
      this.saveCart();
      this.notify('Item removed from cart ❌');
    }
  
    getCartTotal(): number {
      return this.cartItemsValue.reduce(
        (total, item) => total + ((item?.product?.price || 0) * (item?.quantity || 0)),
        0
      );
    }
  
    getCartItems(): CartItem[] {
      return [...this.cartItemsValue];
    }
    clearCart(): void {
      this.cartItemsValue = [];
      this.cartItems.next([]);
  }

  }
