import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars: string[] = [];
    for (let i = 0; i < fullStars; i++) stars.push('full');
    if (hasHalfStar) stars.push('half');
    while (stars.length < 5) stars.push('empty');
    return stars;
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(this.product);
  }

  getDiscount(product: Product): number | null {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return null;
  }
}
