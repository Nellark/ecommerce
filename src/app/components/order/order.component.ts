import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service'; 
import { Order } from '../../model/model.module';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, NavbarComponent, NgFor, FormsModule, NgIf],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  previousOrders: Order[] = [];
  currentUser: { username: string } | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPreviousOrders();
  }

  private getOrdersFromLocalStorage(username: string): Order[] {
    const orders = localStorage.getItem(`previousOrders_${username}`);
    return orders ? JSON.parse(orders) : [];
  }

  private saveOrdersToLocalStorage(username: string, orders: Order[]): void {
    localStorage.setItem(`previousOrders_${username}`, JSON.stringify(orders));
  }

  loadPreviousOrders(): void {
    this.currentUser = this.authService.getUserData();
  
    if (this.currentUser?.username) {
      try {
        this.previousOrders = this.getOrdersFromLocalStorage(this.currentUser.username);
      } catch (error) {
        console.error('Error loading orders:', error);
        this.previousOrders = [];
      }
    } else {
      this.previousOrders = [];
    }
  }
  

  addOrder(order: Order): void {
    if (this.currentUser?.username) {
      try {
        const previousOrders = this.getOrdersFromLocalStorage(this.currentUser.username);
        previousOrders.push(order);
        this.saveOrdersToLocalStorage(this.currentUser.username, previousOrders);
      } catch (error) {
        console.error('Error saving order:', error);
      }
    }
  }
}
