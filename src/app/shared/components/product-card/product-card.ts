import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard implements OnInit {
@Input() product!: any;
selectedProduct: any;

ngOnInit(): void {
  this.selectedProduct = this.product
}
  toggleWishlist() {
    this.product.wishlisted = !this.product.wishlisted;
    // TODO: connect to wishlist store later
  }
}
