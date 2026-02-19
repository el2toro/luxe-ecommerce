import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CheckoutStore } from '@core/store/checkout.store';
import { Stripe } from '@stripe/stripe-js';
import { MatIconModule } from '@angular/material/icon';
import { StripeService } from '@core/services/stripe.service';
import { PaymentService } from '@core/services/payment.service';
import { PaymentIntentModel } from '@models/payment-intent.model';
import { CommonModule } from '@angular/common';
import { OrderingService } from '@core/services/ordering.service';
import { OrderDetailsModel } from '@models/order-details.model';

@Component({
  selector: 'app-payment',
  imports: [MatIconModule, CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment implements OnInit,  AfterViewInit, OnDestroy {
  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();
  private paymentService = inject(PaymentService);
  private stripeService = inject(StripeService);
  public checkout = inject(CheckoutStore);
  private orderingService = inject(OrderingService);
  currentOrderDetails!: OrderDetailsModel;
  private elements: any;
  private paymentElement: any;
  stripe!: Stripe | null;
  orderId!: string;


   ngOnInit(): void {
      this.orderingService.currentOrderDetails$.subscribe({
      next: (currentOrderDetails) => {
        this.currentOrderDetails = currentOrderDetails as OrderDetailsModel;
        this.createPaymentIntent();
      },
    });
  }

  async ngAfterViewInit() {
    this.stripe = await this.stripeService.getStripe();
  }

  ngOnDestroy() {
    if (this.paymentElement) this.paymentElement.unmount();
  }

  createPaymentIntent() {
    const paymentIntent: PaymentIntentModel = {
      amount: this.currentOrderDetails.totalAmount,
      currency: this.currentOrderDetails.currency,
      customerId: this.currentOrderDetails.customerId,
      orderId: this.currentOrderDetails.id
    };

    console.log('Creating Payment Intent with:', paymentIntent);

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
        return_url: `http://localhost:4200/checkout/success?orderId=${this.currentOrderDetails.id}`,
      },
    })
  }
}
