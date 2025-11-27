import { Component, inject } from '@angular/core';
import { BottomNavComponent } from "../layout/bottom-nav/bottom-nav.component";
import { HeaderComponent } from "../layout/header/header.component";
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { CheckoutStore } from '../../core/store/checkout.store';
import { CartStore } from '../../core/store/cart.store';
import { MatIconModule } from '@angular/material/icon';
import { Shipping } from "./steps/shipping/shipping";
import { Review } from "./steps/review/review";
import { Payment } from "./steps/payment/payment";

@Component({
  selector: 'app-checkout',
  imports: [BottomNavComponent, HeaderComponent, AsyncPipe, CurrencyPipe, MatIconModule, CommonModule, Shipping, Review, Payment],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  public checkout = inject(CheckoutStore);
  public cart = inject(CartStore);
  vm$ = this.checkout.vm$;
  showSummary = false;
  constructor() {}
}
