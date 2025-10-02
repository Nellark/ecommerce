import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';
import { Observable } from 'rxjs';

interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple' | 'google';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  currentStep = 1;
  isProcessing = false;

  // User info from login
  shippingAddress: Address = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa'
  };

  billingAddress: Address = { ...this.shippingAddress };
  sameAsShipping = true;

  paymentMethod: PaymentMethod = {
    type: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  };

  selectedShipping = 'standard';
  promoCode = '';
  promoDiscount = 0;

  shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 50, days: '3-5 working days' },
    { id: 'express', name: 'Express Shipping', price: 120, days: '1-2 working days' }
  ];

  provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
    'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  ngOnInit(): void {
    // Example: populate shippingAddress from logged-in user
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.shippingAddress.firstName = user.firstName || '';
      this.shippingAddress.lastName = user.lastName || '';
      this.shippingAddress.email = user.email || '';
      this.shippingAddress.phone = user.phone || '';
      this.shippingAddress.address = user.address || '';
      this.shippingAddress.city = user.city || '';
      this.shippingAddress.province = user.province || '';
      this.shippingAddress.postalCode = user.postalCode || '';
    }
    if (this.sameAsShipping) this.billingAddress = { ...this.shippingAddress };
  }

  getSubtotal(): number {
    return this.cartService.getCartTotal();
  }

  getShippingCost(): number {
    const option = this.shippingOptions.find(opt => opt.id === this.selectedShipping);
    return option ? option.price : 0;
  }

  getTax(): number {
    return (this.getSubtotal() + this.getShippingCost()) * 0.15; // 15% VAT
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShippingCost() + this.getTax() - this.promoDiscount;
  }

  nextStep(): void { if (this.currentStep < 4) this.currentStep++; }
  prevStep(): void { if (this.currentStep > 1) this.currentStep--; }
  goToStep(step: number): void { this.currentStep = step; }

  applyPromoCode(): void {
    const code = this.promoCode.toLowerCase();
    if (code === 'save10') this.promoDiscount = this.getSubtotal() * 0.1;
    else if (code === 'freeship') this.promoDiscount = this.getShippingCost();
    else this.promoDiscount = 0;
  }

  onSameAsShippingChange(): void {
    if (this.sameAsShipping) this.billingAddress = { ...this.shippingAddress };
  }

  selectPaymentMethod(type: 'card' | 'paypal' | 'apple' | 'google'): void {
    this.paymentMethod.type = type;
  }
  getSelectedShippingName(): string {
    const selected = this.shippingOptions.find(opt => opt.id === this.selectedShipping);
    return selected ? selected.name : '';
  }
  

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    this.paymentMethod.cardNumber = value.replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
  }

  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
    this.paymentMethod.expiryDate = value;
  }

  async processOrder(): Promise<void> {
    this.isProcessing = true;
    await new Promise(resolve => setTimeout(resolve, 3000));
    this.cartService.clearCart();
    this.router.navigate(['/order-success']);
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return !!(
          this.shippingAddress.firstName &&
          this.shippingAddress.lastName &&
          this.shippingAddress.address
        );
        
      case 2:
        return !!this.selectedShipping;
  
      case 3:
        return !!(
          this.paymentMethod.cardNumber &&
          this.paymentMethod.expiryDate &&
          this.paymentMethod.cvv
        );
  
      default:
        return true; // For any other step, return true
    }
  }
  
}
