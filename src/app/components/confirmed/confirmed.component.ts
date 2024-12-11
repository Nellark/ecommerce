


import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Component } from "@angular/core";
import { NgIf } from "@angular/common";
import { LoaderComponent } from '../../loader/loader.component';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-order-confirmation',
  standalone:true,

  
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css'],
  imports: [NavbarComponent,  NgIf, LoaderComponent]
 
})
export class ConfirmedComponent {
quantity: any;
isLoading: any;
  constructor(
  private productService: ProductService,
  private router: Router
) {}


ngOnInit() {
  
  setTimeout(() => {
    this.isLoading = false;  
  }, 1000);  
}

proceedToHome() {

  this.productService.clearCart();
  
  this.router.navigate(['/home']);
}


}

