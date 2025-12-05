import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
  imports: [MatIconModule, RouterModule]
})
export class CheckoutSuccessComponent implements OnInit {
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    if (params['payment_intent']) {
      //this.verifyPayment(params['payment_intent']);
    }
  });
}

// async verifyPayment(paymentIntentId: string) {
//   const result = await this.stripe.retrievePaymentIntent(paymentIntentId);
//   if (result.paymentIntent?.status === 'succeeded') {
//     this.paymentAmount = result.paymentIntent.amount;
//     this.orderId = 'LUXE-' + Date.now().toString().slice(-6);
//   }
// }
}
