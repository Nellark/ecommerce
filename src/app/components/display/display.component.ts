
import { Component, OnInit } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductInterface } from '../../model/model.module';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-display',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule, FooterComponent, NavbarComponent],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {


  selectedProduct: ProductInterface | null = null;
  product_id: string | null = null;
  isLoading = true;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    
  }


  ngOnInit(): void {
    this.product_id = this.route.snapshot.params['id'];
    this.getProduct()
  }


  getProduct() {
    if (this.product_id) {
      this.productService.getProduct(this.product_id).subscribe(product => {
        console.log(product);
        this.selectedProduct = product
      })
    }
  }

}


