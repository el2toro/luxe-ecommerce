import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaymentIntentModel } from "../../models/payment-intent.model";

@Injectable({ providedIn: 'root' })
export class PaymentService {
    private httpClient = inject(HttpClient);
    private baseUrl = 'http://localhost:5144/api';

  createPaymentIntent(paymentIntent: PaymentIntentModel): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}/create-payment-intent`, paymentIntent);
  }

  confirmPayment(orderId: string, customerId: string, amount: number, paymentMethod: string): Observable<any> {
    const payload = {
      orderId: orderId,
      customerId: customerId,
      amount: amount,
      paymentMethod: paymentMethod
    };
    return this.httpClient.post<any>(`${this.baseUrl}/payment/confirm`, payload);
  }
}