import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
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
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() modalChange = new EventEmitter<boolean>();

  currentImageIndex = 0;
  selectedSize = '';
  selectedColor = '';
  selectedStyle = '';
  isModalOpen = false;

  successMessage = ''; // ✅ message for toast

  touchStartX = 0;
  touchEndX = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // ✅ listen for messages from CartService
    this.cartService.message$.subscribe(msg => {
      this.successMessage = msg;
      setTimeout(() => (this.successMessage = ''), 2000);
    });
  }

  get allImages(): string[] {
    return this.product
      ? [this.product.image, ...(this.product.images || [])]
      : [];
  }

  getStars(rating: number): string[] {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return [
      ...Array(full).fill('full'),
      ...Array(half).fill('half'),
      ...Array(empty).fill('empty')
    ];
  }

  getDiscount(): number | null {
    if (this.product?.originalPrice && this.product.originalPrice > this.product.price) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return null;
  }

  openModal() {
    if (!this.product) return;
    this.isModalOpen = true;
    this.modalChange.emit(true);
    this.currentImageIndex = 0;
    this.selectedSize = this.product.sizes?.[0] || '';
    this.selectedColor = this.product.colors?.[0] || '';
    this.selectedStyle = this.product.styles?.[0] || '';
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalChange.emit(false);
    document.body.classList.remove('modal-open');
  }

  prevImage() {
    if (!this.allImages.length) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.allImages.length) % this.allImages.length;
  }

  nextImage() {
    if (!this.allImages.length) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.allImages.length;
  }

  selectImage(index: number) {
    if (index >= 0 && index < this.allImages.length) {
      this.currentImageIndex = index;
    }
  }

  addToCart(event?: Event) {
    if (event) event.stopPropagation();
    if (!this.product) {
      console.error('Product is undefined in ProductCardComponent');
      return;
    }

    this.cartService.addToCart(
      {
        product: this.product,
        selectedSize: this.selectedSize,
        selectedColor: this.selectedColor,
        selectedStyle: this.selectedStyle
      },
      1
    );
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    const deltaX = this.touchEndX - this.touchStartX;
    if (deltaX > 50) this.prevImage();
    else if (deltaX < -50) this.nextImage();
  }
}
