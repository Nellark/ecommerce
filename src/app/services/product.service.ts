import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { ProductsResponseInterface, ProductInterface } from '../model/model.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cartKey: string = 'cart';
  private currentUrl: string | null = null;  // Store the current URL

  products: ProductInterface[] = [];
  filteredProductsSubject: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<ProductInterface[]>([]);

  constructor(private http: HttpClient, private router: Router) {}

  // Get all products
  getAllProducts() {
    return this.http.get<ProductsResponseInterface>(environment.SERVER);
  }

  // Set the products
  setProducts(products: ProductInterface[]) {
    this.products = products;
    this.filteredProductsSubject.next(products);
  }

  // Get a single product by ID
  getProduct(productId: string) {
    return this.http.get<ProductInterface>(`${environment.SERVER}/${productId}`);
  }

  // Get the filtered products (e.g., after a search)
  getFilteredProducts() {
    return this.filteredProductsSubject.asObservable();
  }

  // Search products
  searchProducts(query: string) {
    const filtered = query
      ? this.products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.filteredProductsSubject.next(filtered);
  }

  // Get the cart from local storage
  getCart(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  // Save the cart to local storage
  private saveCart(cart: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  // Add an item to the cart
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

    // Navigate back to the previously saved URL after adding to the cart
    const returnUrl = this.getCurrentUrl();
    if (returnUrl) {
      this.router.navigateByUrl(returnUrl);
    }
  }

  // Set the current URL (to navigate back to after adding to the cart)
  setCurrentUrl(url: string) {
    this.currentUrl = url;
  }

  // Get the current URL
  getCurrentUrl(): string | null {
    return this.currentUrl;
  }

  // Update cart item quantity
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

  // Remove an item from the cart
  removeFromCart(productId: string) {
    const cart = this.getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    this.saveCart(updatedCart);
  }

  // Get the total price of the cart
  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Get the total count of items in the cart
  getCartItemCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  // Clear the cart
  clearCart() {
    localStorage.removeItem(this.cartKey);
  }

  // Check if the cart is empty
  isCartEmpty(): boolean {
    return this.getCart().length === 0;
  }

  // Submit an order (post request to the server)
  submitOrder(orderData: any) {
    return this.http.post(`${environment.SERVER}/orders`, orderData);
  }
}
