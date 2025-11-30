// src/app/core/store/checkout.store.ts
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface CheckoutState {
  step: 1 | 2 | 3 | 4;
  shipping: {
    name: string;
    address: string;
    city: string;
    country: string;
    zip: string;
    phone: string;
  };
  payment: {
    method: 'card' | 'apple' | 'google';
    cardComplete: boolean;
  };
  promo: string;
}

const initialState: CheckoutState = {
  step: 1,
  shipping: { name: '', address: '', city: '', country: 'United States', zip: '', phone: '' },
  payment: { method: 'card', cardComplete: false },
  promo: ''
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

  // Selectors
  readonly vm$ = this.select({
    step: this.select(s => s.step),
    shipping: this.select(s => s.shipping),
    payment: this.select(s => s.payment),
    promo: this.select(s => s.promo),
    canNext: this.select(
      this.select(s => s.step),
      this.select(s => s.shipping),
      this.select(s => s.payment),
      (step, shipping, payment) => {
        if (step === 1) return !!shipping.name && !!shipping.address && !!shipping.zip;
        if (step === 2) return payment.cardComplete;
        return true;
      }
    )
  });
}