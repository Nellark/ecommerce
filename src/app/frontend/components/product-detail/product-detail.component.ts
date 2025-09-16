import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'] 
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity = 1;

  // Variant selections
  selectedSize = '';
  selectedColor = '';
  selectedStyle = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.product = this.productService.getProductById(id);

      // Set default variants if available
      if (this.product) {
        this.selectedSize = this.product.sizes?.[0] || '';
        this.selectedColor = this.product.colors?.[0] || '';
        this.selectedStyle = this.product.styles?.[0] || '';
      }
    });
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars: string[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }

    if (hasHalfStar) {
      stars.push('half');
    }

    while (stars.length < 5) {
      stars.push('empty');
    }

    return stars;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product) return;

    this.cartService.addToCart(
      {
        product: this.product,
        selectedSize: this.selectedSize,
        selectedColor: this.selectedColor,
        selectedStyle: this.selectedStyle
      },
      this.quantity
    );

    // Optional: reset quantity
    this.quantity = 1;
    alert('Product added to cart!');
  }
}
