import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  weeklyDeals: Product[] = [];
  quantity = 1;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.featuredProducts = this.productService.getFeaturedProducts();
    this.weeklyDeals = this.productService.getWeeklyDeals();
  }

  /** Add product to cart */
  addToCart(product: Product): void {
    this.cartService.addToCart(
      {
        product,
        selectedSize: product.sizes?.[0] || '',
        selectedColor: product.colors?.[0] || '',
        selectedStyle: product.styles?.[0] || ''
      },
      this.quantity
    );
  }

  /** Navigate to products page optionally filtered by category or deal */
  goToProducts(filter?: { category?: string; deal?: string }): void {
    const queryParams: any = {};
    if (filter?.category) queryParams.category = filter.category;
    if (filter?.deal) queryParams.deal = filter.deal;

    this.router.navigate(['/products'], { queryParams });
  }
}
