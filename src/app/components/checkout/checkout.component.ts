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
  imports: [NgFor, NgIf, NavbarComponent, FormsModule, FooterComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
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

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.productService.getCart(); 
    this.cartTotal = this.productService.getCartTotal(); 
    
    // Format the cart total to two decimal places
    this.cartTotal = parseFloat(this.cartTotal.toFixed(2));
  }

  submitOrder() {
    if (this.cartItems.length === 0) {
      return;
    }

    // Check if all fields are filled (using required on input elements)
    if (this.shippingDetails.name && this.shippingDetails.address && this.shippingDetails.email && this.shippingDetails.phone) {
      const totalAmountFormatted = parseFloat(this.cartTotal.toFixed(2));

      const orderData = {
        cartItems: this.cartItems,
        shippingDetails: this.shippingDetails,
        totalAmount: totalAmountFormatted,
      };

      console.log('Order placed successfully:', orderData);

      // Clear the cart after successful order
      this.productService.clearCart();

      // Navigate to the success page
      this.router.navigate(['/order-success']);
    }
  }
}
