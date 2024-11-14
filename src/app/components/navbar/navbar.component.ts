import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() searchQueryChanged = new EventEmitter<string>();


  constructor(public productService: ProductService) {}

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQueryChanged.emit(inputElement.value);
  }
}

