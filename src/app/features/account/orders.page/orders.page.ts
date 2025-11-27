import { Component } from '@angular/core';
import { BottomNavComponent } from "../../layout/bottom-nav/bottom-nav.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders.page',
  imports: [BottomNavComponent, HeaderComponent, CommonModule],
  templateUrl: './orders.page.html',
  styleUrl: './orders.page.scss',
})
export class OrdersPage {
orders = [
    { id: 'LUXE249871', date: new Date(), total: 1280, status: 'delivered', items: [{ image: 'https://images.unsplash.com/photo-1596755092358-87e503d79f3c?w=600' }] }
  ];
}
