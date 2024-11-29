import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductInterface } from '../../model/model.module';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule, FooterComponent, NavbarComponent, FormsModule],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})


export class DisplayComponent implements OnInit {
  selectedProduct: ProductInterface | null = null;
  product_id: string | null = null;
  showNotification: boolean = false;

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

  getProduct() {
    if (this.product_id) {
      this.productService.getProduct(this.product_id).subscribe(product => {
        this.selectedProduct = product;
      });
    }
  }

  addToCart(product: ProductInterface) {
    this.productService.addToCart(product);
    this.showNotificationMessage();
  }

  showNotificationMessage() {
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 2000); 
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back(); 
    } else {
      this.router.navigate(['/']); 
    }
  }
}