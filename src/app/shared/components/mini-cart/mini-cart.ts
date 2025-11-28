import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe } from '@angular/common';
import { CartStore } from '../../../core/store/cart.store';

@Component({
  selector: 'app-mini-cart',
  imports: [MatIconModule, CommonModule, AsyncPipe],
  templateUrl: './mini-cart.html',
  styleUrl: './mini-cart.scss',
})
export class MiniCart {
  private cart = inject(CartStore);
count$ = this.cart.totalItems$;

  constructor() {}
  openCart() {
    document.body.classList.add('cart-open');
  }
}
