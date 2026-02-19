import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from "@angular/router";
import { CartService } from '@core/services/cart.service';
import { CatalogService } from '@core/services/catalog.service';
import { CartItemModel } from '@models/cart-item.model';
import { CartModel } from '@models/cart.model';
import { Product } from '@models/catalog/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutStore } from '@core/store/checkout.store';

interface CartItemUpdateRequest {
  productId: string;
  quantity: number;
  customerId: string;
  cartId: string;
  price: number;
  currency: number;
}

@Component({
  selector: 'app-cart-drawer',
  imports: [CurrencyPipe, MatIconModule, FormsModule, CommonModule],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})

export class CartDrawer implements OnInit {
  private router = inject(Router);
  private catalogService = inject(CatalogService);
  private cart = inject(CartService);
  private checkoutStore = inject(CheckoutStore);
  private items = new BehaviorSubject<Product[]>([]);
  private currentCart!: CartModel;
  currentItems$ = this.items.asObservable();

  subtotal: any;
  total: any

  promoCode = '';

  constructor() {
    // Auto-close drawer when route changes
    effect(() => {
      if (!document.body.classList.contains('cart-open')) return;
      // close logic here if needed
    });
}
  ngOnInit(): void {
    this.initCart();
    this.cart.currentCart$.subscribe({
      next: (cart) => {
        this.currentCart = cart;
      }
    });
  }

  initCart() {
    this.cart.currentCart$.subscribe({
      next: (cartModel) => {
        this.subtotal = cartModel.subtotal
        this.total = cartModel.total

        this.getProductsById(cartModel.cartItems);
      }
    })
  }


  getProductsById(cartItems: CartItemModel[]) {
    const productIds = cartItems.map((item: any) => item.productId) as string[];
    this.catalogService.getProductsById(productIds).subscribe({
      next: (products) => {

        products.map(product => {
          const cartItem = cartItems.find(item => item.productId === product.id);
          if (cartItem) {
            product.quantity = cartItem.quantity;
          }
        });

        this.items.next(products)
      }
    });
  }
apply() {
    //this.cart.applyPromo(this.code.toUpperCase());
  }

  close() {
    document.body.classList.remove('cart-open');
  }

  continueShooping(){
    this.close();
  }

  proceedToCheckout(){
    this.checkoutStore.setCustomerId(this.currentCart.customerId);
    
     this.close();
     this.router.navigate(['/checkout']);
  }

  addItem(item: any) {
     const cartRequest: CartItemUpdateRequest = {
      productId: item.id,
      quantity: 1,
      customerId: this.currentCart.customerId,
      cartId: this.currentCart.id,
      price: item.price,
      currency: 2
    };
    this.cart.addItemToCart(cartRequest);
  }

  removeItem(item: any) {
    const cartRequest: CartItemUpdateRequest = {
      productId: item.id,
      quantity: 1,
      customerId: this.currentCart.customerId,
      cartId: this.currentCart.id,
      price: item.price,
      currency: 2
    };
    this.cart.removeFromCart(cartRequest);
  }

  removeItemFromCart(item: any){
    const cartRequest: CartItemUpdateRequest = {
      productId: item.id,
      quantity: item.quantity,
      customerId: this.currentCart.customerId,
      cartId: this.currentCart.id,
      price: item.price,
      currency: 2
    };
    this.cart.removeFromCart(cartRequest);
  }
}
