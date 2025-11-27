import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CartStore } from '../../../core/store/cart.store';

@Component({
  selector: 'app-cart-drawer',
  imports: [AsyncPipe, CurrencyPipe, MatIconModule, FormsModule, CommonModule],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawer {
 cart = inject(CartStore);
items$ = this.cart.items$;
  totalItems$ = this.cart.totalItems$;
  subtotal$ = this.cart.subtotal$;
  discount$ = this.cart.discount$;
  total$ = this.cart.total$;

  code = '';

  constructor() {
    // Auto-close drawer when route changes
    effect(() => {
      if (!document.body.classList.contains('cart-open')) return;
      // close logic here if needed
    });
}

apply() {
    this.cart.applyPromo(this.code.toUpperCase());
  }

  close() {
    document.body.classList.remove('cart-open');
  }
}
