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
    this.productService.fetchOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data || []; 
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Failed to load orders. Please try again later.';
        console.error('Error fetching orders:', error);
        this.isLoading = false;
      },
    });
  }

  onOrderPlaced() {
    this.fetchOrders(); 
  }
}
