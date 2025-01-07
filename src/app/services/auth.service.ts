import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs/operators';
import { ProductInterface, ProductsResponseInterface } from '../types/Product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cartKey: string = 'cart';
  private wishlistKey: string = 'wishlist';
  private currentUrl: string | null = null;

  products: ProductInterface[] = [];
  filteredProductsSubject: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<ProductInterface[]>([]);
  private cartSubject: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<ProductInterface[]>(this.getCart());
  private wishlistSubject: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<ProductInterface[]>(this.getWishlist());

  constructor(private http: HttpClient, private router: Router) {}

  getAllProducts() {
    return this.http.get<ProductsResponseInterface>(environment.SERVER);
  }

  setProducts(products: ProductInterface[]) {
    this.products = products;
    this.filteredProductsSubject.next(products);
  }

  getProduct(productId: string) {
    return this.http.get<ProductInterface>(`${environment.SERVER}/${productId}`);
  }

  getFilteredProducts() {
    return this.filteredProductsSubject.asObservable();
  }

  searchProducts(query: string) {
    const filtered = query
      ? this.products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
    this.filteredProductsSubject.next(filtered);
  }

  // Cart related methods
  getCart(): ProductInterface[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  private saveCart(cart: ProductInterface[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addToCart(product: ProductInterface, quantity: number = 1) {
    const cart = this.getCart();
    const existingProductIndex = cart.findIndex((item: any) => String(item.id) === String(product.id));

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      product.quantity = quantity;
      cart.push(product);
    }

    this.saveCart(cart);
  }

  removeFromCart(productId: string) {
    const updatedCart = this.getCart().filter((item: any) => String(item.id) !== String(productId));
    this.saveCart(updatedCart);
  }

  updateCartItemQuantity(productId: string, newQuantity: number) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex((item: any) => String(item.id) === String(productId));

    if (itemIndex !== -1) {
      if (newQuantity > 0) {
        cart[itemIndex].quantity = newQuantity;
      } else {
        cart.splice(itemIndex, 1);
      }
    }

    this.saveCart(cart);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.cartSubject.next([]);
  }

  getCartTotal(): number {
    return this.getCart().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getCartItemCount(): number {
    return this.getCart().reduce((count, item) => count + item.quantity, 0);
  }

  isCartEmpty(): boolean {
    return this.getCart().length === 0;
  }

  getCartObservable() {
    return this.cartSubject.asObservable();
  }

  proceedToCheckout(orderData: any) {
    return this.http.post(`${environment.SERVER}/confirmed`, orderData).pipe(
      tap(() => {
        this.clearCart();
      })
    );
  }

  // Wishlist related methods
  addToWishlist(product: ProductInterface): void {
    let wishlist = this.getWishlist();
    if (!wishlist.find((item) => item.id === product.id)) {
      wishlist.push(product);
      this.saveWishlist(wishlist);
    }
  }

  removeFromWishlist(productId: number): void {
    let wishlist = this.getWishlist();
    wishlist = wishlist.filter((product) => product.id !== productId);
    this.saveWishlist(wishlist);
  }

  isInWishlist(product: ProductInterface): boolean {
    const wishlist = this.getWishlist();
    return wishlist.some((item) => item.id === product.id);
  }

  getWishlist(): ProductInterface[] {
    const wishlist = localStorage.getItem(this.wishlistKey);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  private saveWishlist(wishlist: ProductInterface[]): void {
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    this.wishlistSubject.next(wishlist);
  }

  getWishlistObservable() {
    return this.wishlistSubject.asObservable();
  }

  setCurrentUrl(url: string) {
    this.currentUrl = url;
  }

  getCurrentUrl(): string | null {
    return this.currentUrl;
  }

  getWishlistItemCount(): number {
    return this.getWishlist().length;
  }
}
