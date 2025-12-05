import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaymentIntentModel } from "../../models/payment-intent.model";

@Injectable({ providedIn: 'root' })
export class PaymentService {
    private httpClient = inject(HttpClient);
    private baseUrl = 'https://localhost:7163/api';

  createPaymentIntent(paymentIntent: PaymentIntentModel): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}/create-payment-intent`, paymentIntent);
  }
}