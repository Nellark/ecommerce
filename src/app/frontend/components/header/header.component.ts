// header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';   
import { Product } from '../../models/product.model';             

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  products: Product[] = [];
  searchQuery = '';
  cartItemCount = 0;
  isMenuOpen = false;
  activeDeal = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}



  ngOnInit(): void {
    // cart counter
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });

    // load products (optional here, products page will filter instead)
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });


    this.route.queryParams.subscribe(params => {
      this.activeDeal = params['deal'] || '';
    });
  }

  applyDeal(type: string) {
    this.router.navigate(['/products'], { queryParams: { deal: type } });
  }
  
  

  onSearch(): void {
    const term = this.searchQuery.trim();
    this.router.navigate(['/products'], { queryParams: { search: term } });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
