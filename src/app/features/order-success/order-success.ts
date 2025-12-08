import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../layout/header/header.component";
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderingService } from '../../core/services/ordering.service';
import { CheckoutStore } from '@core/store/checkout.store';

@Component({
  selector: 'app-order-success',
  imports: [AsyncPipe, DatePipe, CurrencyPipe, RouterModule, HeaderComponent, MatIconModule, CommonModule],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export class OrderSuccess implements OnInit {
  private checkoutStore = inject(CheckoutStore);
  private orderingService = inject(OrderingService);
  order$ = this.orderingService.currentOrderDetails$;

  constructor() {}

  ngOnInit(): void {
    this.getCreatedOrder();
  }

  getCreatedOrder(){
    this.checkoutStore.vm$.subscribe({
      next: (checkoutState) => {
        console.log('orderId: ', checkoutState.orderId)
        this.orderingService.getOrderById(checkoutState.orderId)
      }
    })
  }
}
