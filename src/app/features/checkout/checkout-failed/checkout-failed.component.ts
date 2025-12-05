import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkout-failed',
  templateUrl: './checkout-failed.component.html',
  styleUrls: ['./checkout-failed.component.scss'],
  imports: [MatIconModule]
})
export class CheckoutFailedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
