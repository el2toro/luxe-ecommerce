import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from "@angular/router";
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [CurrencyPipe, MatIconModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawer implements OnInit {
  private router = inject(Router);
  cart = inject(CartService);
  items: any;
  totalItems: any
  subtotal: any;
  discount = 20;
  total: any

  code = '';

  constructor() {
    // Auto-close drawer when route changes
    effect(() => {
      if (!document.body.classList.contains('cart-open')) return;
      // close logic here if needed
    });
}
  ngOnInit(): void {
    this.cart.currentCart$.subscribe({
      next: (cartModel) => {
        this.subtotal = cartModel.subtotal
        this.items = cartModel.cartItems;
        this.total = cartModel.total;
      }
    })
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
     this.close();
     this.router.navigate(['/checkout']);
  }
}
