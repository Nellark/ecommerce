import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductInterface } from '../../model/model.module';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { LoaderComponent } from "../../loader/loader.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, NavbarComponent, LoaderComponent, NgIf, NgFor],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
onSearch($event: string) {
throw new Error('Method not implemented.');
}
  wishlist: ProductInterface[] = [];
  loading: boolean = false;
  message: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadWishlist();
  }

  loadWishlist() {

    this.wishlist = this.productService.getWishlist();
    this.loading = false;
  }

  removeFromWishlist(product: ProductInterface) {
    this.productService.removeFromWishlist(product.id);
    this.loadWishlist(); 
    this.message = `${product.title} has been removed from your wishlist.`;
    setTimeout(() => {
      this.message = null; 
    }, 3000);
  }


  viewProductDetails(product: ProductInterface) {
    this.router.navigate(['/display', product.id]);
  }
}
