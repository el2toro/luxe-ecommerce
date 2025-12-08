import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderDetailsModel } from '@models/order-details.model';
import { CreateOrderRequestModel } from '@models/requests/create-order-request.model';
import { BehaviorSubject, map, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class OrderingService {
  private baseUrl = 'https://localhost:7195/orders';
  private httpClient = inject(HttpClient);
  private orderDetails = new BehaviorSubject<OrderDetailsModel | null>(null);
  currentOrderDetails$ = this.orderDetails.asObservable();

  placeOrder(createOrderRequest: CreateOrderRequestModel) {
   return this.httpClient.post<OrderDetailsModel>(this.baseUrl, createOrderRequest);
  }

  getOrderById(orderId: string){
    this.httpClient.get<OrderDetailsModel>(`${this.baseUrl}/${orderId}`)
   .pipe(map(orderDetailsModel => this.orderDetails.next(orderDetailsModel)))
   .subscribe();
  }
}