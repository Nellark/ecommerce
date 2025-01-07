import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, NgIf, NavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;
  shippingDetails: any = {
    name: '',
    address: '',
    email: '',
    phone: '',
  };
  paymentMethod: string | null = null;
  shippingMethod: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
    this.productService.getCartObservable().subscribe(cart => {
      this.cartItems = cart;
      this.calculateCartTotal();
    });
  }

  loadCart(): void {
    this.cartItems = this.productService.getCart();
    this.calculateCartTotal();
  }

  calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    this.cartTotal = parseFloat(this.cartTotal.toFixed(2));
  }

  submitOrder(): void {
    if (this.cartItems.length === 0) {
      return;
    }

    if (!this.shippingMethod) {
      return;
    }

    if (this.shippingMethod === 'delivery' && !this.shippingDetails.address) {
      return;
    }

    if (!this.paymentMethod) {
      return;
    }

    const orderData = {
      cartItems: this.cartItems,
      shippingMethod: this.shippingMethod,
      shippingDetails: this.shippingMethod === 'delivery' ? this.shippingDetails : null,
      totalAmount: this.cartTotal,
      paymentMethod: this.paymentMethod,
    };

    console.log('Order placed successfully:', orderData);

    this.productService.clearCart();
    this.router.navigate(['/confirmed']);
  }
}