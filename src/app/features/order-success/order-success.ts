import { Component, inject, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderingService } from '../../core/services/ordering.service';

@Component({
  selector: 'app-order-success',
  imports: [
    AsyncPipe,
    DatePipe,
    CurrencyPipe,
    RouterModule,
    HeaderComponent,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export class OrderSuccess implements OnInit {
  private route = inject(ActivatedRoute);
  private orderingService = inject(OrderingService);
  order$ = this.orderingService.currentOrderDetails$;

  constructor() {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.queryParamMap.get('orderId') ?? '';
    this.orderingService.getOrderById(orderId);
  }
}
