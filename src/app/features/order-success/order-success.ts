import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    const orderId = this.route.snapshot.queryParamMap.get('orderId') ?? '';
    
    this.confirmOrder(orderId);
  }

  confirmOrder(orderId: string) {
    this.orderingService.confirmOrder(orderId);
  }
}
