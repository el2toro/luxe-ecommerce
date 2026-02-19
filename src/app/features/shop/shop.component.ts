import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../layout/header/header.component";
import { CartStore } from '../../core/store/cart.store';
import { CartService } from '@core/services/cart.service';
import { CatalogService } from '@core/services/catalog.service';
import { Router } from '@angular/router';
import { Product } from '@models/catalog/product.model';
import { CartModel } from '@models/cart.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  imports: [MatIconModule, CommonModule, FormsModule, MatButtonModule, HeaderComponent]
})
export class ShopComponent implements OnInit {
  private cartService = inject(CartService);
  private cartStore = inject(CartStore);
  private catalogService = inject(CatalogService);
  private router = inject(Router);
  private currentCart!: CartModel;
  gridView = true;
  sortBy = 'newest';
  products$ = this.catalogService.currentProducts$;
  
  filters = {
    watches: false,
    jewelry: false,
    bags: false,
    couture: false,
    brand: '',
    maxPrice: 1000000
  };

  wishlist: number[] = [];

  constructor() { }

  ngOnInit() {
    this.cartService.currentCart$.subscribe(cart => this.currentCart = cart);
    this.catalogService.getProducts();
  }

  toggleView() {
    this.gridView = !this.gridView;
  }

  sortProducts() {
    // implement sorting logic
  }

  addToCart(product: Product) {
    //this.cartItems.push(product);
    // Add animation feedback



  this.cartService.addItemToCart({
    cartId: this.currentCart.id,
    customerId: this.currentCart.customerId, 
    productId: product.id, 
    quantity: 1})
  }

  toggleWishlist(product: any) {
    product.wishlisted = !product.wishlisted;
  }

  openCart() {
    // Open cart sidebar/modal
  }

  viewProduct(productId: any) {
    // Navigate to product detail page
    this.router.navigate(['/products', productId]);
  }
}
