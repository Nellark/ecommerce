import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ProductsResponseInterface, ProductInterface } from '../model/model.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cartKey: string = 'cart';
  products: ProductInterface[] = [];
  filteredProductsSubject: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<ProductInterface[]>([]);

  constructor(private http: HttpClient) {}

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

  getCart(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  private saveCart(cart: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addToCart(product: ProductInterface, quantity: number = 1) {
    const cart = this.getCart();
    const existingProductIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      product.quantity = quantity;
      cart.push(product);
    }

    this.saveCart(cart);
  }

  updateCartItemQuantity(productId: string, newQuantity: number) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex((item: any) => item.id === productId);

    if (itemIndex !== -1 && newQuantity > 0) {
      cart[itemIndex].quantity = newQuantity;
    } else if (itemIndex !== -1 && newQuantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    this.saveCart(cart);
  }

  removeFromCart(productId: string) {
    const cart = this.getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    this.saveCart(updatedCart);
  }

  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getCartItemCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }

  isCartEmpty(): boolean {
    return this.getCart().length === 0;
  }

  submitOrder(orderData: any) {
    return this.http.post(`${environment.SERVER}/orders`, orderData);
  }
}
