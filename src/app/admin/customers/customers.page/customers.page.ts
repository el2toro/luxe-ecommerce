import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
  imports: [CommonModule]
})
export class CustomersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  totalCustomers = signal(12482);
  vipCount = signal(842);
  newThisMonth = signal(1278);
  lifetimeValue = signal(18420);

  customers = signal([
    { name: 'Alexander Voss', email: 'alexander@voss.com', orders: 42, spent: 128420, status: 'Active', lastSeen: '2h ago', vip: true },
    { name: 'Emma Laurent', email: 'emma@paris.fr', orders: 28, spent: 98500, status: 'Active', lastSeen: '5h ago', vip: true },
    { name: 'Sofia Al Maktoum', email: 'sofia@dubai.ae', orders: 19, spent: 142000, status: 'Active', lastSeen: '1d ago', vip: true },
  ]);
}
