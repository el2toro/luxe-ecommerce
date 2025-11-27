import { Component, inject, OnInit } from '@angular/core';
import { CheckoutStore } from '../../../../core/store/checkout.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  imports: [FormsModule],
  templateUrl: './shipping.html',
  styleUrl: './shipping.scss',
})
export class Shipping implements OnInit{
  ngOnInit(): void {
    this.checkout.vm$.subscribe({next: (data) => this.shipping = data.shipping}); 
  }
  checkout = inject(CheckoutStore);
  canNext = false;
  shipping: any; 

  get name() { return this.shipping.name}
  set name(v) { this.checkout.setShipping({ name: v }); }

  get address() { return this.shipping.address}
  set address(v) { this.checkout.setShipping({ address: v }); }

  get city() { return this.shipping.city}
  set city(v) { this.checkout.setShipping({ city: v }); }

  get phone() { return this.shipping.phone}
  set phone(v) { this.checkout.setShipping({ phone: v }); }

  get country() { return this.shipping.country}
  set country(v) { this.checkout.setShipping({ country: v }); }

  get zip() { return this.shipping.zip}
  set zip(v) { this.checkout.setShipping({ zip: v }); }
}
