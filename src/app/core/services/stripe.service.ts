import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from './../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise = loadStripe(environment.stripe.publishableKey);
  getStripe() {
    return this.stripePromise;
  }
}