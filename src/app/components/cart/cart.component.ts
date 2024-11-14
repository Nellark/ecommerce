import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';  // Import DecimalPipe
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, NgFor, NgIf, FormsModule, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DecimalPipe]  
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;
  cartItemCount: number = 0;

  constructor(
    private productService: ProductService,
    private decimalPipe: DecimalPipe  
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.productService.getCart();
    this.updateCartTotal();
  }

  removeItem(productId: string) {
    this.productService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart() {
    this.productService.clearCart();
    this.loadCart();
  }

  // Update the quantity of a product
  updateQuantity(item: any, index: number) {
    if (item.quantity < 1) {
      item.quantity = 1;  // Ensure quantity is at least 1
    }

    // Update the cart in localStorage
    this.cartItems[index].quantity = item.quantity;
    this.productService.updateCart(this.cartItems);

    // Recalculate the cart total
    this.updateCartTotal();
  }

  // Calculate the total price and format it to 2 decimal places
  updateCartTotal() {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Format the total to 2 decimal places using DecimalPipe
    this.cartTotal = parseFloat(this.decimalPipe.transform(this.cartTotal, '1.2-2') || '0');  // Ensures 2 decimal places
  }

  // Implement the goBack method for navigation
  goBack() {
    window.history.back();  // This will take the user back to the previous page in their history
  }
}
