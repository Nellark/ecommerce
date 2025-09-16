import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoaderComponent } from '../../loader/loader.component';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, NgFor, NgIf, FormsModule, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ProductService] 
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  cartTotal: number = 0;
  cartItemCount: number = 0;
  cdr: any;
  Loading: boolean = true;

  isLoading: boolean = true;
  previousOrders: any;

  // Make authService public so it can be accessed in the template
  constructor(
    private productService: ProductService,
    private router: Router,
    public authService: AuthService  // <-- Change 'private' to 'public' here
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.productService.getCartObservable().subscribe(cart => {
      this.cartItems = cart;
      this.updateCartTotal();  
      setTimeout(() => {
        this.isLoading = false;  
      }, 500);  
      this.cdr.detectChanges();
    });
  }

  loadCart() {
    this.cartItems = this.productService.getCart();
    this.cartTotal = this.productService.getCartTotal(); 
    this.cartItemCount = this.productService.getCartItemCount(); 
    this.Loading = false;
  }

  removeItem(productId: string) {
    this.productService.removeFromCart(productId);  
    this.loadCart();  
  }

  clearCart() {
    this.productService.clearCart(); 
    this.loadCart(); 
  }

  updateQuantity(item: any, index: number) {
    if (item.quantity < 1) {
      item.quantity = 1;  
    }
    this.productService.updateCartItemQuantity(item.id, item.quantity);  
    this.loadCart(); 
  }

  updateCartTotal() {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.price * item.quantity; 
    }
    this.cartTotal = parseFloat(total.toFixed(2));  
  }

  goBack() {
    window.history.back(); 
  }

  proceedToHome() {
    if (this.authService.isAuthenticatedUser()) {
      const orderData = {
        orderId: Date.now(),  
        date: new Date().toLocaleString(),
        cartItems: this.cartItems,
        cartTotal: this.cartTotal,
        cartItemCount: this.cartItemCount
      };

      const previousOrders = JSON.parse(localStorage.getItem('previousOrders') || '[]');
      previousOrders.push(orderData);  
      localStorage.setItem('previousOrders', JSON.stringify(previousOrders));

      this.productService.clearCart();
      this.loadCart(); 

      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/cart']);
    }
  }
}
