import { Component, inject } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { CartStore } from '../../../../core/store/cart.store';
import { CheckoutStore } from '../../../../core/store/checkout.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.html',
  styleUrl: './review.scss',
})
export class Review {
  private orderService = inject(OrderService);
   private cart = inject(CartStore);
   private checkout = inject(CheckoutStore);
   private router = inject(Router);
placeOrder() {
  const order: any = {
    id: 'LUXE' + Date.now(),
    date: new Date(),
    total: this.cart.total$ || 0,
    items: this.cart.items$ || [],
   // shipping: this.checkout.vm$.shipping,
    status: 'processing',
    tracking: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase()
  };

  this.orderService.placeOrder(order);
   //this.cart.clear(); // optional: empty cart
  this.router.navigate(['/order', order.id]);
 this.orderService.placeOrder(order);
  this.router.navigate(['/order', order.id]);
}
}
