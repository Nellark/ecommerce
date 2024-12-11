

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LoaderComponent } from '../../loader/loader.component';


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

 

  constructor(private productService: ProductService ,private router: Router) {}

 
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


  
    this.cartTotal = parseFloat(total.toFixed(2));  
    

  }

  goBack() {
    window.history.back(); 
  }


  
  proceedToHome() {

    this.productService.clearCart();
    
    this.router.navigate(['/order']);
  }
  }
  
  


