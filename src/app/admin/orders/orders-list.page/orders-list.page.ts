import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

interface Order {
  id: string;
  customer: string;
  email: string;
  date: Date;
  total: number;
  status: OrderStatus;
  items: number;
  payment: 'paid' | 'pending';
}

@Component({
  selector: 'app-orders-list.page',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './orders-list.page.html',
  styleUrl: './orders-list.page.scss',
})
export class OrdersListPage {
orders = signal<Order[]>([
    { id: 'LUXE249871', customer: 'Alexander Voss', email: 'alexander@luxe.com', date: new Date(), total: 12840, status: 'delivered', items: 2, payment: 'paid' },
    { id: 'LUXE249870', customer: 'Emma Laurent', email: 'emma@paris.fr', date: new Date(Date.now() - 86400000), total: 18500, status: 'shipped', items: 1, payment: 'paid' },
    { id: 'LUXE249869', customer: 'James Chen', email: 'james@nyc.com', date: new Date(Date.now() - 172800000), total: 4800, status: 'processing', items: 1, payment: 'paid' },
  ]);

  filterStatus = 'all';
  dateFilter = '';
  selectedOrder = signal<Order | null>(null);

  filteredOrders = computed(() => {
    let list = this.orders();
    if (this.filterStatus !== 'all') {
      list = list.filter(o => o.status === this.filterStatus);
    }
    return list;
  });

  todayCount = computed(() => {
    const today = new Date().toDateString();
    return this.orders().filter(o => o.date.toDateString() === today).length;
  });

  mockItems = [
    { name: 'Cashmere Wool Coat', size: 'M', color: 'Black', qty: 1, price: 4800, image: 'https://images.unsplash.com/photo-1543508282-6313a1d3e1d4?w=600' },
    { name: 'Diamond Tennis Bracelet', size: 'One Size', color: 'White Gold', qty: 1, price: 18500, image: 'https://images.unsplash.com/photo-1605100804761-9a47a9e49c5c?w=600' }
  ];

  applyFilter() { /* reactive */ }
  updateStatus(id: string, event: any) {
    const newStatus = event.target.value;
    this.orders.update(orders =>
      orders.map(o => o.id === id ? { ...o, status: newStatus } : o)
    );
  }
  openOrder(id: string) {
    this.selectedOrder.set(this.orders().find(o => o.id === id) || null);
  }
}
