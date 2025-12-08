import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface CheckoutState {
  step: 1 | 2 | 3 | 4;
  shipping: {
    customerFullName: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
    phoneNumber: string;
  };
  payment: {
    method: 'card' | 'apple' | 'google';
    cardComplete: boolean;
  };
  promo: string;
  orderId: string;
  customerId: string;
}

const initialState: CheckoutState = {
  step: 1,
  shipping: { customerFullName: '', street: '', city: '', country: '', zipCode: '', phoneNumber: '' },
  payment: { method: 'card', cardComplete: false },
  promo: '',
  orderId: '',
  customerId: ''
};

@Injectable({ providedIn: 'root' })
export class CheckoutStore extends ComponentStore<CheckoutState> {
  constructor() { super(initialState); }

  readonly nextStep = this.updater(state => ({ ...state, step: state.step + 1 as any }));
  readonly prevStep = this.updater(state => ({ ...state, step: Math.max(1, state.step - 1) as any }));
  readonly setShipping = this.updater((state, shipping: Partial<CheckoutState['shipping']>) => ({
    ...state, shipping: { ...state.shipping, ...shipping }
  }));
  readonly setPaymentMethod = this.updater((state, method: 'card' | 'apple' | 'google') => ({
    ...state, payment: { ...state.payment, method }
  }));
  readonly setCardComplete = this.updater((state, complete: boolean) => ({
    ...state, payment: { ...state.payment, cardComplete: complete }
  }));
  readonly applyPromo = this.updater((state, code: string) => ({ ...state, promo: code }));

  readonly setCreatedOrderId = this.updater((state, orderId: string) => ({ ...state, orderId: orderId }));
  readonly setCustomerId = this.updater((state, customerId: string) => ({ ...state, customerId: customerId }));


  // Selectors
  readonly vm$ = this.select({
    step: this.select(s => s.step),
    shipping: this.select(s => s.shipping),
    payment: this.select(s => s.payment),
    promo: this.select(s => s.promo),
    orderId: this.select(s => s.orderId),
    customerId: this.select(s => s.customerId),
    canNext: this.select(
      this.select(s => s.step),
      this.select(s => s.shipping),
      this.select(s => s.payment),
      (step, shipping, payment) => {
        if (step === 1) return !!shipping.customerFullName && !!shipping.street && !!shipping.zipCode;
        if (step === 2) return payment.cardComplete;
        return true;
      }
    )
  });
}