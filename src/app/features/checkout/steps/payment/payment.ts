import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CheckoutStore } from '@core/store/checkout.store';
import { Stripe } from '@stripe/stripe-js';
import { MatIconModule } from '@angular/material/icon';
import { StripeService } from '@core/services/stripe.service';
import { PaymentService } from '@core/services/payment.service';
import { PaymentIntentModel } from '@models/payment-intent.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [MatIconModule, CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment implements AfterViewInit, OnDestroy {
  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();
  private paymentService = inject(PaymentService);
  private stripeService = inject(StripeService);
  public checkout = inject(CheckoutStore);
  private elements: any;
  private paymentElement: any;
  stripe!: Stripe | null;
  orderId!: string;

  async ngAfterViewInit() {
    this.stripe = await this.stripeService.getStripe();
    
     this.checkout.vm$.subscribe({
      next: (checkoutState) => {
        this.orderId = '81e7f729-f4d0-4e49-be99-c72376423abb' //checkoutState.orderId;
        this.createPaymentIntent('c4a9d8e3-21f7-4b6a-8d0e-5f9a3c7b2e61', this.orderId)
      },
    });
  }

  ngOnDestroy() {
    if (this.paymentElement) this.paymentElement.unmount();
  }

  createPaymentIntent(customerId: string, orderId: string) {
    const paymentIntent: PaymentIntentModel = {
      amount: 6500,
      currency: 'eur',
      customerId: customerId,
      orderId: orderId
    };

    this.paymentService.createPaymentIntent(paymentIntent).subscribe({
      next: (paymentIntent) => this.configurePayment(paymentIntent.clientSecret),
    });
  }

   configurePayment(clientSecret: string) {
    this.elements = this.stripe!.elements({ clientSecret });

    this.paymentElement = this.elements.create('payment');
    this.paymentElement.mount('#payment-element');
  }

  pay() {
    this.stripe!.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: `http://localhost:4200/checkout/success?orderId=${this.orderId}`,
      },
    });

    //   if (result.error) {
    //     alert(result.error.message);
    //   }
  }
}
