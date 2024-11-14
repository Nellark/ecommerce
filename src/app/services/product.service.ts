import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ProductsResponseInterface, ProductInterface } from '../model/model.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cartKey: string = 'cart';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all products from the server.
   */
  getAllProducts() {
    return this.http.get<ProductsResponseInterface>(environment.SERVER);
  }

  /**
   * Fetch a single product by its ID.
   * @param product_id - The ID of the product.
   */
  getProduct(product_id: string) {
    return this.http.get<ProductInterface>(`${environment.SERVER}/${product_id}`);
  }

  /**
   * Retrieve the current cart from localStorage.
   */
  getCart(): any[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  /**
   * Save the current cart to localStorage.
   * @param cart - The updated cart array.
   */
  private saveCart(cart: any[]) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  /**
   * Add a product to the cart with a specified quantity.
   * @param product - The product to add.
   * @param quantity - The quantity to add.
   */
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

  /**
   * Update the entire cart in localStorage.
   * @param cartItems - The updated cart array.
   */
  updateCart(cartItems: any[]) {
    this.saveCart(cartItems);
  }

  /**
   * Update the quantity of a specific cart item.
   * @param productId - The ID of the product to update.
   * @param newQuantity - The new quantity to set.
   */
  updateCartItemQuantity(productId: string, newQuantity: number) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex((item: any) => item.id === productId);

    if (itemIndex !== -1 && newQuantity > 0) {
      cart[itemIndex].quantity = newQuantity;
    } else if (itemIndex !== -1 && newQuantity <= 0) {
      cart.splice(itemIndex, 1); // Remove item if quantity is 0 or less
    }

    this.saveCart(cart);
  }

  /**
   * Remove a product from the cart by its ID.
   * @param productId - The ID of the product to remove.
   */
  removeFromCart(productId: string) {
    const cart = this.getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    this.saveCart(updatedCart);
  }

  /**
   * Calculate the total price of items in the cart.
   */
  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  /**
   * Get the total number of items in the cart.
   */
  getCartItemCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Clear the entire cart.
   */
  clearCart() {
    localStorage.removeItem(this.cartKey);
  }

  /**
   * Check if the cart is empty.
   * @returns True if the cart is empty, false otherwise.
   */
  isCartEmpty(): boolean {
    return this.getCart().length === 0;
  }

  /**
   * Submit an order. This could be an API call in a real-world scenario.
   * @param orderData - The order details including cart items and shipping information.
   */
  submitOrder(orderData: any) {
    // Simulate an API request to submit the order. You can replace this with an actual HTTP POST request.
    return this.http.post(`${environment.SERVER}/orders`, orderData);
  }
}
