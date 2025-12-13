import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-mini-cart',
  imports: [MatIconModule, CommonModule, ],
  templateUrl: './mini-cart.html',
  styleUrl: './mini-cart.scss',
})
export class MiniCart implements OnInit {
  private cart = inject(CartService);
  count$ = this.cart.currentCartItems$;

  ngOnInit(): void {
    this.cart.getCart('c9f1f7bd-7a2e-4581-96b0-e017069c895e');
  }

  openCart() {
    document.body.classList.add('cart-open');
  }
}
