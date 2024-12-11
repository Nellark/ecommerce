

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, NavbarComponent, NgFor, FormsModule, NgIf],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent implements OnInit {

  previousOrders: any[] = [];
  
  constructor() {}

  ngOnInit(): void {
    this.loadPreviousOrders();
  }

  loadPreviousOrders() {
    const orders = localStorage.getItem('previousOrders');
    if (orders) {
      this.previousOrders = JSON.parse(orders);
    } else {
      this.previousOrders = [];
    }
  }

 clearPreviousOrders() {
    localStorage.removeItem('previousOrders');
    this.previousOrders = [];
  }
}