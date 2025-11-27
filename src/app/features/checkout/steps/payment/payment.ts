import { AfterViewInit, Component, inject } from '@angular/core';
import { CheckoutStore } from '../../../../core/store/checkout.store';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment implements AfterViewInit {
public checkout = inject(CheckoutStore);
  async ngAfterViewInit() {
    const stripe = await loadStripe('pk_test_...');
    const elements = stripe!.elements();
    const card = elements.create('card', { style: { base: { color: 'white' } } });
    card.mount('#card-element');
    card.on('change', e => this.checkout.setCardComplete(e.complete));
  }
}
