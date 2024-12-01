import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

interface Order {
  id: string;
  date: string;
  status: 'Cancelled' | 'Out for Delivery' | 'Delivered';
  items: { name: string; quantity: number }[];
  total: number;
}

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
})
export class OrderTrackingComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';
  isLoading: boolean = true; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.isLoading = true;
    this.productService.getOrdersFromLocalStorage().subscribe({
      next: (data: Order[]) => {
        this.orders = data || []; 
        if (this.orders.length === 0) {
          this.errorMessage = 'No orders found.';
        } else {
          this.errorMessage = ''; // Clear error message if orders are found
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load orders. Please try again later.';
        console.error('Error fetching orders:', error);
        this.isLoading = false;
      },
    });
  }

  onOrderPlaced(orderData: any): void {
    this.productService.submitOrder(orderData).subscribe({
      next: () => {
        this.fetchOrders(); 
      },
      error: (error: any) => {
        console.error('Error submitting order:', error);
        this.errorMessage = 'Failed to place order. Please try again later.';
      }
    });
  }
}
