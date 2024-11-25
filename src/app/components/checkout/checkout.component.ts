import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';


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
    if (this.cartItems.length === 0) {
   
    }

    if (this.shippingDetails.name && this.shippingDetails.address && this.shippingDetails.email && this.shippingDetails.phone && this.paymentMethod) {
      const totalAmountFormatted = parseFloat(this.cartTotal.toFixed(2));

      const orderData = {
        cartItems: this.cartItems,
        shippingDetails: this.shippingDetails,
        totalAmount: totalAmountFormatted,
        paymentMethod: this.paymentMethod, 
      };

      console.log('Order placed successfully:', orderData);

      this.productService.clearCart();
      this.router.navigate(['/order']);
    } 
}}
