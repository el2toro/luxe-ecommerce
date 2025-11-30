// src/app/core/services/order.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Order {
  id: string;
  date: Date;
  total: number;
  items: any[];
  shipping: any;
  status: 'processing' | 'shipped' | 'delivered';
  tracking?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private order = new BehaviorSubject<Order | null>(null);
  currentOrder$ = this.order.asObservable();

  placeOrder(order: Order) {
    this.order.next(order);
    // In real app: POST to backend
  }
}