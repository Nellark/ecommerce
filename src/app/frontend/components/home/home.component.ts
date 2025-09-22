import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  selectedSize: any;
  selectedColor: any;
  selectedStyle: any;
  product: Product | undefined;
  quantity = 1; 

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
      this.featuredProducts = this.productService.getFeaturedProducts();
      this.weeklyDeals = this.productService.getWeeklyDeals();

      // Set default variants if available
      if (this.product) {
        this.selectedSize = this.product.sizes?.[0] || '';
        this.selectedColor = this.product.colors?.[0] || '';
        this.selectedStyle = this.product.styles?.[0] || '';
      }
    });
  }

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
  
}


