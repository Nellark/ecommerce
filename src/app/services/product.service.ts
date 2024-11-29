import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { ProductsResponseInterface, ProductInterface, Order } from '../model/model.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cartKey = 'cart';
  private currentUrl: string | null = null;
  private orders: Order[] = []; 
  products: ProductInterface[] = [];
  filteredProductsSubject = new BehaviorSubject<ProductInterface[]>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.orders = this.getFromLocalStorage('orders') || [];
  }

  getAllProducts(): Observable<ProductsResponseInterface> {
    return this.http.get<ProductsResponseInterface>(environment.SERVER);
  }

  getOrdersFromLocalStorage(): Observable<Order[]> {
    return of(this.getFromLocalStorage('orders') || []);
  }

  submitOrder(orderData: any): Observable<Order> {
    return of(orderData).pipe(
      tap(newOrder => {
        this.orders.push(newOrder); 
        this.saveToLocalStorage('orders', this.orders); 
      })
    );
  }

  private saveToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private getFromLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setProducts(products: ProductInterface[]) {
    this.products = products;
    this.filteredProductsSubject.next(products);
  }

  getProduct(productId: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${environment.SERVER}/${productId}`);
  }

  getFilteredProducts(): Observable<ProductInterface[]> {
    return this.filteredProductsSubject.asObservable();
  }

  searchProducts(query: string) {
    const filtered = query
      ? this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
    this.filteredProductsSubject.next(filtered);
  }

  getCart(): any[] {
    return this.getFromLocalStorage(this.cartKey) || [];
  }

  private saveCart(cart: any[]) {
    this.saveToLocalStorage(this.cartKey, cart);
  }

  addToCart(product: ProductInterface, quantity = 1) {
    const cart = this.getCart();
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      product.quantity = quantity;
      cart.push(product);
    }
    this.saveCart(cart);
    if (this.currentUrl) {
      this.router.navigateByUrl(this.currentUrl);
    }
  }

  setCurrentUrl(url: string) {
    this.currentUrl = url;
  }

  getCurrentUrl(): string | null {
    return this.currentUrl;
  }

  updateCartItemQuantity(productId: string, newQuantity: number) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      if (newQuantity > 0) {
        cart[itemIndex].quantity = newQuantity;
      } else {
        cart.splice(itemIndex, 1);
      }
      this.saveCart(cart);
    }
  }

  removeFromCart(productId: string) {
    const cart = this.getCart().filter(item => item.id !== productId);
    this.saveCart(cart);
  }

  getCartTotal(): number {
    return this.getCart().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getCartItemCount(): number {
    return this.getCart().reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }

  isCartEmpty(): boolean {
    return this.getCart().length === 0;
  }
}
