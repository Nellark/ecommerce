import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, NgIf, NavbarComponent, FormsModule],
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
  paymentMethod: any;
  errorMessage: string = ''; // To store the error message

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.productService.getCart(); 
    this.cartTotal = this.productService.getCartTotal(); 
    this.cartTotal = parseFloat(this.cartTotal.toFixed(2));
  }

  submitOrder() {
    // Clear previous error message
    this.errorMessage = '';

    // Check if the cart is empty
    if (this.cartItems.length === 0) {
      this.errorMessage = 'Your cart is empty. Please add items before proceeding.';
      return;
    }

    // Check if all shipping details and payment method are filled
    if (!this.shippingDetails.name || !this.shippingDetails.address || !this.shippingDetails.email || !this.shippingDetails.phone || !this.paymentMethod) {
      this.errorMessage = 'Please fill in all required fields and select a payment method.';
      return;
    }

    // Format the total
    const totalAmountFormatted = parseFloat(this.cartTotal.toFixed(2));

    const orderData = {
      cartItems: this.cartItems,
      shippingDetails: this.shippingDetails,
      totalAmount: totalAmountFormatted,
      paymentMethod: this.paymentMethod, // Send selected payment method
    };

    console.log('Order placed successfully:', orderData);

    // Clear the cart after order placement
    this.productService.clearCart();

    // Navigate to the order success page
    this.router.navigate(['/order']); // Navigate after placing the order
  }
}
