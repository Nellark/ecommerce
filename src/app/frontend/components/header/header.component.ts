import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  cartItemCount$: Observable<number>;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartItemCount$ = this.cartService.cartItems$.pipe(
      map(items => items.reduce((count, item) => count + item.quantity, 0))
    );
  }

  ngOnInit(): void {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
    }
  }
}