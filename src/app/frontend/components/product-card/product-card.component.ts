import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  currentImageIndex = 0;
  selectedSize = '';
  selectedColor = '';
  selectedStyle = '';
  isModalOpen = false;

  touchStartX = 0;
  touchEndX = 0;

  constructor(private cartService: CartService) {}

  get allImages(): string[] {
    return [this.product.image, ...(this.product.images || [])];
  }

  getStars(rating: number): string[] {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return [...Array(full).fill('full'), ...Array(half).fill('half'), ...Array(empty).fill('empty')];
  }

  getDiscount(product: Product): number | null {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return null;
  }

  openModal() {
    this.isModalOpen = true;
    this.currentImageIndex = 0;
    this.selectedSize = this.product.sizes?.[0] || '';
    this.selectedColor = this.product.colors?.[0] || '';
    this.selectedStyle = this.product.styles?.[0] || '';
  }

  closeModal() {
    this.isModalOpen = false;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.allImages.length) % this.allImages.length;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.allImages.length;
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
  }

  addToCart(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.cartService.addToCart({ product: this.product });
  }

  addToCartWithVariants() {
    this.cartService.addToCart({
      product: this.product,
      selectedSize: this.selectedSize,
      selectedColor: this.selectedColor,
      selectedStyle: this.selectedStyle
    });
    this.closeModal();
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
  }

  handleSwipeGesture() {
    const deltaX = this.touchEndX - this.touchStartX;
    if (deltaX > 50) this.prevImage();
    else if (deltaX < -50) this.nextImage();
  }
}
