import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, NgIf, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
isOrderValid(arg0: any) {
throw new Error('Method not implemented.');
}
  cartItems: any[] = [];
  cartTotal: number = 0;
  shippingDetails: any = {
    name: '',
    address: '',
    email: '',
    phone: '',
  };
  paymentDetails: any = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  };
  paymentMethod: string | null = null;
  shippingMethod: string | null = null;
  formErrors: any = {
    cardNumber: false,
    expiryDate: false,
    cvv: false,
    cardHolderName: false,
    shippingMethod: false,
    address: false,
  };
currentOrder: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

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

  validateForm(): boolean {
    let isValid = true;
    this.formErrors = {
      cardNumber: false,
      expiryDate: false,
      cvv: false,
      cardHolderName: false,
      shippingMethod: false,
      address: false,
    };

    if (!this.shippingMethod) {
      this.formErrors.shippingMethod = true;
      isValid = false;
    }

    if (this.shippingMethod === 'delivery' && !this.shippingDetails.address) {
      this.formErrors.address = true;
      isValid = false;
    }

    if (this.paymentMethod === 'creditCard') {
      const { cardNumber, expiryDate, cvv, cardHolderName } = this.paymentDetails;

      if (!cardNumber || cardNumber.length !== 16) {
        this.formErrors.cardNumber = true;
        isValid = false;
      }

      if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
        this.formErrors.expiryDate = true;
        isValid = false;
      }

      if (!cvv || cvv.length !== 3) {
        this.formErrors.cvv = true;
        isValid = false;
      }

      if (!cardHolderName || cardHolderName.trim() === '') {
        this.formErrors.cardHolderName = true;
        isValid = false;
      }
    }

    return isValid;
  }

  saveOrder(order: any): void {
    const currentUser = this.authService.getUserData();
    if (!currentUser?.username) {
      console.error('User is not logged in.');
      return;
    }

    const previousOrders = JSON.parse(localStorage.getItem(`previousOrders_${currentUser.username}`) || '[]');
    previousOrders.push(order);
    localStorage.setItem(`previousOrders_${currentUser.username}`, JSON.stringify(previousOrders));
  }

  submitOrder(): void {
    if (!this.validateForm()) {
      return;
    }

    const orderData = {
      cartItems: this.cartItems,
      shippingMethod: this.shippingMethod,
      shippingDetails: this.shippingDetails,
      paymentDetails: this.paymentDetails,
      paymentMethod: this.paymentMethod,
      totalAmount: this.cartTotal,
      date: new Date().toISOString(),
      orderId: Math.random().toString(36).substr(2, 9),
    };

    this.saveOrder(orderData);

    console.log('Order placed:', orderData);
    this.productService.clearCart();
    this.router.navigate(['/confirmed']);
  }
}
