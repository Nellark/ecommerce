import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, NgIf, NavbarComponent, FormsModule, CommonModule],
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
  }
  

  loadCart() {
    this.cartItems = this.productService.getCart();
    this.cartTotal = this.productService.getCartTotal();
    this.cartTotal = parseFloat(this.cartTotal.toFixed(2));
  }

  submitOrder() {
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

    const totalAmountFormatted = parseFloat(this.cartTotal.toFixed(2));

    const orderData = {
      cartItems: this.cartItems,
      shippingMethod: this.shippingMethod,
      shippingDetails: this.shippingMethod === 'delivery' ? this.shippingDetails : null,
      totalAmount: totalAmountFormatted,
      paymentMethod: this.paymentMethod,
    };

    console.log('Order placed successfully:', orderData);

  
    this.productService.clearCart();
    this.router.navigate(['/order']);
  }
}
