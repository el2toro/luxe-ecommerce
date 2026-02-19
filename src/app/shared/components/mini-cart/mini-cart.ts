import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { CartService } from '@core/services/cart.service';
import { CartStore } from '@core/store/cart.store';

@Component({
  selector: 'app-mini-cart',
  imports: [MatIconModule, CommonModule, ],
  templateUrl: './mini-cart.html',
  styleUrl: './mini-cart.scss',
})
export class MiniCart implements OnInit {
  cart = inject(CartService);
  private cartStore = inject(CartStore);

  ngOnInit(): void {
    this.cart.getCart();

    // this.cart.currentCart$.subscribe(cart => {
    //   cart.cartItems.map(item => {
    //     this.cartStore.addItem(item);
    //   });
    // });
  }

  openCart() {
    document.body.classList.add('cart-open');
  }
}
