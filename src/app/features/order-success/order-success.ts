import { Component, inject } from '@angular/core';
import { BottomNavComponent } from "../layout/bottom-nav/bottom-nav.component";
import { HeaderComponent } from "../layout/header/header.component";
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-order-success',
  imports: [AsyncPipe, DatePipe, CurrencyPipe, RouterModule, HeaderComponent, BottomNavComponent, MatIconModule, CommonModule],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss',
})
export class OrderSuccess {
  private orderService = inject(OrderService);
order$ = this.orderService.currentOrder$;
  constructor() {}
}
