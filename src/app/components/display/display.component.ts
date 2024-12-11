import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location, NgIf } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
import { ProductInterface } from '../../model/model.module';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule, NgIf, HttpClientModule, FooterComponent, NavbarComponent, FormsModule, LoaderComponent],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  selectedProduct: ProductInterface | null = null;
  product_id: string | null = null;
  isLoading: boolean = true;
  showNotification: boolean = false;
  cartItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product_id = this.route.snapshot.params['id'];
    this.getProduct();
  }

  getProduct(): void {
    if (this.product_id) {
      this.productService.getProduct(this.product_id).subscribe(
        (product) => {
          this.selectedProduct = product;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching product:', error);
          this.isLoading = false;
        }
      );
    }
  }

  addToCart(product: ProductInterface): void {
    this.productService.addToCart(product);
    this.showNotificationMessage();
  }

  showNotificationMessage(): void {
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']); 
    }
  }
}
