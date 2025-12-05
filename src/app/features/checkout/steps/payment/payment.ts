import { AfterViewInit, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CheckoutStore } from '../../../../core/store/checkout.store';
import { loadStripe, Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { environment } from './../../../../../enviroments/enviroment'
import { MatIconModule } from '@angular/material/icon';
import { StripeService } from '../../../../core/services/stripe.service';
import { PaymentService } from '../../../../core/services/payment.service';
import { PaymentIntentModel } from '../../../../models/payment-intent.model';

@Component({
  selector: 'app-payment',
  imports: [MatIconModule],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment implements OnInit, AfterViewInit, OnDestroy {
  private paymentService = inject(PaymentService);
  private stripeService = inject(StripeService);
  private clientSecret!: string;
  private stripePromise = this.stripeService.getStripe();  
  public checkout = inject(CheckoutStore);
  @Input() userData: any;
  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();

  total = 3325000;
  private elements: any;
  private paymentElement: any;
  stripe!: Stripe | null;
  paymentIntent!: PaymentIntentModel;

    ngOnInit(): void {
    this.initPaymentIntent();
  }

  async ngAfterViewInit() {
     this.stripe = await this.stripeService.getStripe();
     this.createPaymentIntent();
  }

  ngOnDestroy() {
    if (this.paymentElement) this.paymentElement.unmount();
  }

  configurePayment(clientSecret: string){
    this.elements = this.stripe!.elements({ clientSecret });

    this.paymentElement = this.elements.create('payment');
    this.paymentElement.mount('#payment-element');
  }

  createPaymentIntent() {
   this.paymentService.createPaymentIntent(this.paymentIntent).subscribe({
    next: (paymentIntent) => this.configurePayment(paymentIntent.clientSecret)
  })
}

 pay() {
const stripe = this.stripeService.getStripe();

    const result = this.stripe!.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: 'https://localhost:4200/checkout/success',
      },
    });

  //   if (result.error) {
  //     alert(result.error.message);
  //   }
   }

   initPaymentIntent(){
    this.paymentIntent = {
  "items": [
    {
      "quantity": 2,
      "priceData": {
        "currency": "eur",
        "unitAmount": 2500,
        "productData": {
          "name": "Cool T-Shirt",
          "images": ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
        }
      }
    },
    {
      "quantity": 1,
      "priceData": {
        "currency": "eur",
        "unitAmount": 35500,
        "productData": {
          "name": "Omega Planet Ocean 600M Co-Axial Chronograph 45.5 mm",
          "images": ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
        }
      }
    },
    {
      "quantity": 1,
      "priceData": {
        "currency": "eur",
        "unitAmount": 5000,
        "productData": {
          "name": "Warm Hoodie",
          "images": ["https://images.unsplash.com/photo-1680292783974-a9a336c10366?q=80&w=694&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"]
        }
      }
    }
  ]
}
   }
}
